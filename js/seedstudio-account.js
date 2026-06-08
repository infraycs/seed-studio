/**
 * SeedStudio Account System v2
 * Bmob (bmob.cn) — auth, credits, referral
 * Cost: ¥0/month (free tier)
 *
 * Dependencies: Bmob JS SDK (CDN)
 */

(function(global){
'use strict';

// ═══════════════ CONFIG (YOUR Bmob keys) ═══════════════
var CONFIG = {
  APP_ID: '7e66f9f90a2cb2c3447c5241b59c0673',
  REST_KEY: 'b936e837095771edc3798f296164d7d3',
};

// ═══════════════ STATE ═══════════════
var currentUser = null;
var creditBalance = 0;
var membershipTier = 'free';
var referralCode = '';

// ═══════════════ INIT ═══════════════
function init(callback){
  if(typeof Bmob==='undefined'){
    console.error('Bmob SDK not loaded');
    callback('Bmob SDK not loaded', null);
    return;
  }
  Bmob.initialize(CONFIG.APP_ID, CONFIG.REST_KEY);

  var u=Bmob.User.current();
  if(u){
    currentUser=u;
    referralCode=u.get('referralCode')||'';
    refreshCredits(callback);
  } else {
    callback(null, null);
  }
}

// ═══════════════ AUTH ═══════════════
function register(email, password, inviteCode, callback){
  if(typeof Bmob==='undefined'){callback('Bmob SDK 未加载，请刷新页面重试',null);return;}
  var user=new Bmob.User();
  user.set('username', email);
  user.set('password', password);
  user.set('email', email);
  user.set('credits', 3); // 🎁 3 free credits
  user.set('tier', 'free');
  user.set('referralCode', generateReferralCode());
  user.set('invitedBy', inviteCode||'');

  user.signUp().then(function(u){
    currentUser=u;
    referralCode=u.get('referralCode');
    if(inviteCode) processReferral(inviteCode, function(){});
    creditBalance=3;
    callback(null, u);
  }).catch(function(err){
    // If user exists, try login
    if(err.code===202||err.message.indexOf('already')>-1){
      login(email, password, callback);
    } else {
      callback('注册失败: '+(err.message||err.code), null);
    }
  });
}

function login(email, password, callback){
  if(typeof Bmob==='undefined'){callback('Bmob SDK 未加载，请刷新页面重试',null);return;}
  Bmob.User.login(email, password).then(function(u){
    currentUser=u;
    referralCode=u.get('referralCode')||'';
    refreshCredits(callback);
  }).catch(function(err){
    callback('登录失败: '+(err.message||err.code), null);
  });
}

function logout(callback){
  Bmob.User.logout().then(function(){
    currentUser=null;
    creditBalance=0;
    membershipTier='free';
    referralCode='';
    callback(null);
  }).catch(function(err){callback(err.message);});
}

// ═══════════════ CREDITS ═══════════════
function refreshCredits(callback){
  if(!currentUser){callback('Not logged in',null);return;}
  currentUser.fetch().then(function(u){
    creditBalance=u.get('credits')||0;
    membershipTier=u.get('tier')||'free';
    callback(null,{credits:creditBalance, tier:membershipTier});
  }).catch(function(err){
    callback(err.message,null);
  });
}

function deductCredit(amount, reason, callback){
  if(!currentUser){callback('请先登录',null);return;}
  amount=amount||1;

  if(membershipTier==='pro'||membershipTier==='lifetime'){
    callback(null,{deducted:0, remaining:creditBalance, unlimited:true});
    return;
  }

  if(creditBalance<amount){
    callback('积分不足！请充值或邀请好友获取免费积分',null);
    return;
  }

  // Deduct via Bmob Cloud Function (server-side, Master Key)
  var params={userId:currentUser.id, amount:amount, reason:reason||'export'};
  Bmob.Cloud.run('deductCredit', params).then(function(r){
    creditBalance=r.remaining;
    callback(null,{deducted:amount, remaining:creditBalance});
  }).catch(function(err){
    // Fallback: client-side deduction (less secure, but functional)
    var newBal=creditBalance-amount;
    currentUser.set('credits', newBal);
    currentUser.save().then(function(){
      creditBalance=newBal;
      callback(null,{deducted:amount, remaining:creditBalance});
    }).catch(function(e2){
      callback('扣款失败: '+(e2.message||e2.code),null);
    });
  });
}

// ═══════════════ REFERRAL ═══════════════
function generateReferralCode(){
  var chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var code='';
  for(var i=0;i<6;i++) code+=chars[Math.floor(Math.random()*chars.length)];
  return code;
}

function processReferral(inviteCode, callback){
  var query=new Bmob.Query(Bmob.User);
  query.equalTo('referralCode','==',inviteCode);
  query.find().then(function(users){
    if(users.length>0){
      var inviter=users[0];
      // Give inviter +2 credits
      inviter.set('credits', (inviter.get('credits')||0)+2);
      inviter.save();
      // Give new user +2 (on top of 3 free)
      if(currentUser){
        currentUser.set('credits', creditBalance+2);
        currentUser.save().then(function(){
          creditBalance+=2;
        });
      }
      callback(null,{message:'🎁 邀请成功！你和好友各获得 +2 积分'});
    } else {
      callback('邀请码无效',null);
    }
  }).catch(function(err){
    callback(err.message,null);
  });
}

function getReferralLink(){
  if(!referralCode)return '';
  return 'https://www.seedstudio.top/?ref='+referralCode;
}

// ═══════════════ PROCESS INVITE FROM URL ═══════════════
function checkURLInvite(){
  var p=new URLSearchParams(window.location.search);
  var ref=p.get('ref');
  if(ref) localStorage.setItem('seedstudio_invite', ref);
  return ref||localStorage.getItem('seedstudio_invite')||'';
}

// ═══════════════ EXPORT ═══════════════
global.SeedStudioAccount={
  init:init, register:register, login:login, logout:logout,
  refreshCredits:refreshCredits, deductCredit:deductCredit,
  getReferralLink:getReferralLink, checkURLInvite:checkURLInvite,
  processReferral:processReferral,
  get currentUser(){return currentUser;},
  get creditBalance(){return creditBalance;},
  get membershipTier(){return membershipTier;},
  get referralCode(){return referralCode;},
  get isLoggedIn(){return !!currentUser;},
};

})(window);
