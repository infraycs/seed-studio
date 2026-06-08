/**
 * SeedStudio Account System v5
 * Tencent CloudBase (cloudbase.net) — auth, credits, referral
 * Cost: ¥0/month (free tier: 50K API/day, 2GB DB)
 */
(function(global){
'use strict';

var ENV_ID = 'seedstudio-d6gcgy3nwa8b4e1ca';
var app = null;
var db = null;
var auth = null;

var currentUser = null;
var creditBalance = 0;
var membershipTier = 'free';
var referralCode = '';

// ═══════════════ INIT ═══════════════
function init(callback){
  if(typeof tcb==='undefined'){
    callback('CloudBase SDK 未加载，请刷新',null);
    return;
  }
  app=tcb.init({env:ENV_ID});
  auth=app.auth({persistence:'local'});
  db=app.database();

  // Check existing login
  auth.getLoginState().then(function(state){
    if(state){
      currentUser=state.user;
      loadUserData(callback);
    } else {
      // Anonymous sign-in for initial state
      callback(null,null);
    }
  }).catch(function(){
    callback(null,null);
  });
}

function loadUserData(callback){
  if(!currentUser){callback('Not logged in',null);return;}
  db.collection('users').where({uid:currentUser.uid}).get().then(function(res){
    if(res.data&&res.data.length>0){
      var u=res.data[0];
      creditBalance=u.credits||0;
      membershipTier=u.tier||'free';
      referralCode=u.referralCode||'';
      callback(null,{credits:creditBalance,tier:membershipTier});
    } else {
      // First login — create user doc
      var newUser={
        uid:currentUser.uid,
        email:currentUser.email||'',
        credits:3,
        tier:'free',
        referralCode:'S'+Math.random().toString(36).substring(2,8).toUpperCase(),
        createdAt:new Date().toISOString(),
      };
      db.collection('users').add(newUser).then(function(){
        creditBalance=3;
        membershipTier='free';
        referralCode=newUser.referralCode;
        callback(null,{credits:3,tier:'free'});
      });
    }
  }).catch(function(e){callback(e.message,null);});
}

// ═══════════════ AUTH ═══════════════
function register(email, password, inviteCode, callback){
  auth.signUpWithEmailAndPassword(email,password).then(function(){
    return auth.signInWithEmailAndPassword(email,password);
  }).then(function(state){
    currentUser=state.user;
    loadUserData(function(err,data){
      if(err){callback(err,null);return;}
      if(inviteCode)processReferral(inviteCode,function(){});
      callback(null,currentUser);
    });
  }).catch(function(e){
    // If user exists, try login
    if(e.code==='USER_ALREADY_EXISTS'||e.message.indexOf('exists')>-1){
      login(email,password,callback);
    } else {
      callback('注册失败: '+(e.message||e.code),null);
    }
  });
}

function login(email, password, callback){
  auth.signInWithEmailAndPassword(email,password).then(function(state){
    currentUser=state.user;
    loadUserData(function(err,data){
      if(err)callback(err,null);
      else callback(null,currentUser);
    });
  }).catch(function(e){
    callback('登录失败: '+(e.message||e.code),null);
  });
}

function logout(callback){
  auth.signOut().then(function(){
    currentUser=null;
    creditBalance=0;
    membershipTier='free';
    referralCode='';
    callback(null);
  }).catch(function(e){callback(e.message);});
}

// ═══════════════ CREDITS ═══════════════
function refreshCredits(callback){
  loadUserData(callback);
}

function deductCredit(amount, reason, callback){
  if(!currentUser){callback('请先登录',null);return;}
  amount=amount||1;
  if(membershipTier==='pro'||membershipTier==='lifetime'){
    callback(null,{deducted:0,remaining:creditBalance,unlimited:true});
    return;
  }
  if(creditBalance<amount){callback('积分不足！请充值或邀请好友获取积分',null);return;}

  var nb=creditBalance-amount;
  db.collection('users').where({uid:currentUser.uid}).update({credits:nb}).then(function(){
    creditBalance=nb;
    callback(null,{deducted:amount,remaining:creditBalance});
  }).catch(function(e){
    callback('扣款失败: '+(e.message||e.code),null);
  });
}

// ═══════════════ REFERRAL ═══════════════
function processReferral(inviteCode, callback){
  db.collection('users').where({referralCode:inviteCode}).get().then(function(res){
    if(res.data&&res.data.length>0){
      var inviter=res.data[0];
      // +2 to inviter
      db.collection('users').doc(inviter._id).update({credits:(inviter.credits||0)+2});
      // +2 to current user
      var nb=(creditBalance||0)+2;
      db.collection('users').where({uid:currentUser.uid}).update({credits:nb}).then(function(){
        creditBalance=nb;
      });
      callback(null,{message:'🎁 双方各得 +2 积分'});
    } else {
      callback(null,{message:'邀请码已记录'});
    }
  }).catch(function(e){callback(e.message,null);});
}

function getReferralLink(){
  if(!referralCode)return'';
  return'https://www.seedstudio.top/?ref='+referralCode;
}

// ═══════════════ PRO UPGRADE ═══════════════
function upgradeToPro(tier,orderId){
  if(!currentUser)return;
  tier=tier||'pro';
  db.collection('users').where({uid:currentUser.uid}).update({
    tier:tier,
    credits:999,
    orderId:orderId||'',
    upgradedAt:new Date().toISOString(),
  }).then(function(){
    membershipTier=tier;
    creditBalance=999;
    if(typeof S!=='undefined')S.tier='pro';
  });
}

// ═══════════════ EXPORT ═══════════════
global.SeedStudioAccount={
  init:init, register:register, login:login, logout:logout,
  refreshCredits:refreshCredits, deductCredit:deductCredit,
  getReferralLink:getReferralLink, upgradeToPro:upgradeToPro,
  get currentUser(){return currentUser;},
  get creditBalance(){return creditBalance;},
  get membershipTier(){return membershipTier;},
  get referralCode(){return referralCode;},
  get isLoggedIn(){return !!currentUser;},
};

})(window);
