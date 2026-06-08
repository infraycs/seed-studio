/**
 * SeedStudio Account System v2
 * LeanCloud integration — auth, credits, referral
 * Cost: ¥0/month (free tier)
 *
 * Dependencies: LeanCloud JS SDK (CDN)
 * <script src="https://cdn.jsdelivr.net/npm/leancloud-storage@4/dist/av-min.js"></script>
 */

(function(global){
'use strict';

// ═══════════════ CONFIG ═══════════════
// Replace these with your LeanCloud app keys
var CONFIG = {
  APP_ID: 'YOUR_LEANCLOUD_APP_ID',
  APP_KEY: 'YOUR_LEANCLOUD_APP_KEY',
  SERVER_URL: 'https://YOUR_APP_ID.lc-cn-n1-shared.com', // LeanCloud 国内版
};

// ═══════════════ STATE ═══════════════
var currentUser = null;
var creditBalance = 0;
var membershipTier = 'free'; // 'free' | 'pro' | 'lifetime'
var referralCode = '';

// ═══════════════ INIT ═══════════════
function init(callback){
  if(typeof AV==='undefined'){
    console.error('LeanCloud SDK not loaded');
    callback('LeanCloud SDK not loaded', null);
    return;
  }
  AV.init({appId:CONFIG.APP_ID, appKey:CONFIG.APP_KEY, serverURL:CONFIG.SERVER_URL});

  // Check existing session
  var u=AV.User.current();
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
  var user=new AV.User();
  user.setUsername(email);
  user.setPassword(password);
  user.setEmail(email);
  user.set('credits', 3); // 🎁 3 free credits
  user.set('tier', 'free');
  user.set('referralCode', generateReferralCode());
  user.set('invitedBy', inviteCode||'');

  user.signUp().then(function(u){
    currentUser=u;
    referralCode=u.get('referralCode');

    // Process referral if invite code provided
    if(inviteCode){
      processReferral(inviteCode, function(){});
    }

    creditBalance=3;
    callback(null, u);
  }).catch(function(err){
    callback(err.message, null);
  });
}

function login(email, password, callback){
  AV.User.logIn(email, password).then(function(u){
    currentUser=u;
    referralCode=u.get('referralCode')||'';
    refreshCredits(callback);
  }).catch(function(err){
    callback(err.message, null);
  });
}

function logout(callback){
  AV.User.logOut().then(function(){
    currentUser=null;
    creditBalance=0;
    membershipTier='free';
    referralCode='';
    callback(null);
  }).catch(function(err){
    callback(err.message);
  });
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
  if(!currentUser){callback('Not logged in');return;}

  amount=amount||1;
  reason=reason||'export';

  // Membership check: Pro/Lifetime = unlimited (no deduction)
  if(membershipTier==='pro'||membershipTier==='lifetime'){
    callback(null,{deducted:0, remaining:creditBalance, unlimited:true});
    return;
  }

  // Free tier: check balance
  if(creditBalance<amount){
    callback('积分不足！请充值或邀请好友获取免费积分',null);
    return;
  }

  // Deduct via Cloud Function (server-authoritative)
  AV.Cloud.run('deductCredit',{amount:amount,reason:reason}).then(function(r){
    creditBalance=r.remaining;
    callback(null,{deducted:amount, remaining:creditBalance});
  }).catch(function(err){
    callback(err.message,null);
  });
}

function addCredits(amount, source, callback){
  if(!currentUser){callback('Not logged in');return;}
  AV.Cloud.run('addCredits',{amount:amount,source:source}).then(function(r){
    creditBalance=r.remaining;
    callback(null,{added:amount, remaining:creditBalance});
  }).catch(function(err){
    callback(err.message,null);
  });
}

// ═══════════════ REFERRAL ═══════════════
function generateReferralCode(){
  return 'SEED-'+Math.random().toString(36).substring(2,8).toUpperCase();
}

function processReferral(inviteCode, callback){
  AV.Cloud.run('processReferral',{inviteCode:inviteCode}).then(function(r){
    creditBalance=r.userCredits;
    callback(null,{message:'🎁 邀请成功！你和邀请人各获得 +2 积分', credits:creditBalance});
  }).catch(function(err){
    // Silently fail — referral is bonus, not critical
    callback(err.message,null);
  });
}

function getReferralLink(){
  if(!referralCode)return '';
  return 'https://www.seedstudio.top/?ref='+referralCode;
}

// ═══════════════ EXPORT ═══════════════
global.SeedStudioAccount={
  init:init, register:register, login:login, logout:logout,
  refreshCredits:refreshCredits, deductCredit:deductCredit,
  addCredits:addCredits, getReferralLink:getReferralLink,
  get currentUser(){return currentUser;},
  get creditBalance(){return creditBalance;},
  get membershipTier(){return membershipTier;},
  get referralCode(){return referralCode;},
  get isLoggedIn(){return !!currentUser;},
};

})(window);
