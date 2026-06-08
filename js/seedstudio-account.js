/**
 * SeedStudio Account System v3
 * Bmob REST API (no SDK needed, zero CDN dependency)
 * Cost: ¥0/month
 */

(function(global){
'use strict';

var CONFIG = {
  APP_ID: '7e66f9f90a2cb2c3447c5241b59c0673',
  REST_KEY: 'b936e837095771edc3798f296164d7d3',
  API_URL: 'https://api.bmob.cn/1',
};

var currentUser = null;
var creditBalance = 0;
var membershipTier = 'free';
var referralCode = '';

// ═══════════════ HELPERS ═══════════════
function api(method, path, data){
  return fetch(CONFIG.API_URL+path, {
    method: method,
    headers: {
      'X-Bmob-Application-Id': CONFIG.APP_ID,
      'X-Bmob-REST-API-Key': CONFIG.REST_KEY,
      'Content-Type': 'application/json',
      'X-Bmob-Session-Token': (currentUser||{})._sessionToken||'',
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then(function(r){ return r.json(); });
}

// ═══════════════ INIT ═══════════════
function init(callback){
  var tok=localStorage.getItem('seedstudio_session');
  if(!tok){callback(null,null);return;}
  // Validate session
  api('GET','/users/me')
    .then(function(u){
      if(u.error){callback(null,null);return;}
      currentUser=u;
      creditBalance=u.credits||0;
      membershipTier=u.tier||'free';
      referralCode=u.referralCode||'';
      currentUser._sessionToken=tok;
      callback(null,u);
    })
    .catch(function(){callback(null,null);});
}

// ═══════════════ AUTH ═══════════════
function register(email, password, inviteCode, callback){
  var data={
    username: email,
    password: password,
    email: email,
    credits: 3,
    tier: 'free',
    referralCode: 'S'+Math.random().toString(36).substring(2,8).toUpperCase(),
    invitedBy: inviteCode||'',
  };
  api('POST','/users',data).then(function(r){
    if(r.error){callback(r.error,null);return;}
    // Auto-login
    api('GET','/login?username='+encodeURIComponent(email)+'&password='+encodeURIComponent(password))
      .then(function(u){
        if(u.error){callback(u.error,null);return;}
        currentUser=u;
        creditBalance=u.credits||3;
        membershipTier=u.tier||'free';
        referralCode=data.referralCode;
        currentUser._sessionToken=u.sessionToken;
        localStorage.setItem('seedstudio_session',u.sessionToken||'');
        // Process referral
        if(inviteCode) processReferralREST(inviteCode,function(){});
        callback(null,u);
      });
  }).catch(function(e){callback('网络错误: '+e.message,null);});
}

function login(email, password, callback){
  api('GET','/login?username='+encodeURIComponent(email)+'&password='+encodeURIComponent(password))
    .then(function(u){
      if(u.error){callback(u.error,null);return;}
      currentUser=u;
      creditBalance=u.credits||0;
      membershipTier=u.tier||'free';
      referralCode=u.referralCode||'';
      currentUser._sessionToken=u.sessionToken;
      localStorage.setItem('seedstudio_session',u.sessionToken||'');
      callback(null,u);
    })
    .catch(function(e){callback('网络错误: '+e.message,null);});
}

function logout(callback){
  currentUser=null;
  creditBalance=0;
  membershipTier='free';
  referralCode='';
  localStorage.removeItem('seedstudio_session');
  callback(null);
}

// ═══════════════ CREDITS ═══════════════
function refreshCredits(callback){
  if(!currentUser){callback('Not logged in',null);return;}
  api('GET','/users/'+currentUser.objectId).then(function(u){
    if(u.error){callback(u.error,null);return;}
    creditBalance=u.credits||0;
    membershipTier=u.tier||'free';
    callback(null,{credits:creditBalance,tier:membershipTier});
  }).catch(function(e){callback(e.message,null);});
}

function deductCredit(amount, reason, callback){
  if(!currentUser){callback('请先登录',null);return;}
  amount=amount||1;
  if(membershipTier==='pro'||membershipTier==='lifetime'){
    callback(null,{deducted:0,remaining:creditBalance,unlimited:true});
    return;
  }
  if(creditBalance<amount){callback('积分不足！',null);return;}

  // Try cloud function first
  api('POST','/functions/deductCredit',{userId:currentUser.objectId,amount:amount,reason:reason||'export'})
    .then(function(r){
      if(r.result&&!r.result.error){
        creditBalance=r.result.remaining;
        callback(null,{deducted:amount,remaining:creditBalance});
      } else {
        // Fallback: client-side update
        var nb=creditBalance-amount;
        api('PUT','/users/'+currentUser.objectId,{credits:nb}).then(function(){
          creditBalance=nb;
          callback(null,{deducted:amount,remaining:creditBalance});
        }).catch(function(e){callback(e.message,null);});
      }
    }).catch(function(e){
      // Fallback client-side
      var nb=creditBalance-amount;
      api('PUT','/users/'+currentUser.objectId,{credits:nb}).then(function(){
        creditBalance=nb;
        callback(null,{deducted:amount,remaining:creditBalance});
      }).catch(function(e2){callback(e2.message,null);});
    });
}

// ═══════════════ REFERRAL ═══════════════
function processReferralREST(inviteCode, callback){
  // Find inviter by referralCode
  var query=encodeURIComponent(JSON.stringify({referralCode:inviteCode}));
  api('GET','/users?where='+query).then(function(r){
    if(r.results&&r.results.length>0){
      var inviter=r.results[0];
      // Give +2 to inviter
      api('PUT','/users/'+inviter.objectId,{credits:(inviter.credits||0)+2});
      // Give +2 to new user
      if(currentUser&&currentUser.objectId){
        var nb=(creditBalance||0)+2;
        api('PUT','/users/'+currentUser.objectId,{credits:nb}).then(function(){
          creditBalance=nb;
        });
      }
      callback(null,{message:'🎁 双方各得 +2 积分'});
    } else {
      callback('邀请码无效',null);
    }
  }).catch(function(e){callback(e.message,null);});
}

function getReferralLink(){
  if(!referralCode)return'';
  return'https://www.seedstudio.top/?ref='+referralCode;
}

function checkURLInvite(){
  var p=new URLSearchParams(window.location.search);
  var ref=p.get('ref');
  if(ref)localStorage.setItem('seedstudio_invite',ref);
  return ref||localStorage.getItem('seedstudio_invite')||'';
}

// ═══════════════ EXPORT ═══════════════
global.SeedStudioAccount={
  init:init, register:register, login:login, logout:logout,
  refreshCredits:refreshCredits, deductCredit:deductCredit,
  getReferralLink:getReferralLink, checkURLInvite:checkURLInvite,
  get currentUser(){return currentUser;},
  get creditBalance(){return creditBalance;},
  get membershipTier(){return membershipTier;},
  get referralCode(){return referralCode;},
  get isLoggedIn(){return !!currentUser;},
};

})(window);
