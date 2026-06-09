/**
 * SeedStudio Account — localStorage + Backup Codes
 * Like a crypto wallet: register, get 12-word code, restore anywhere.
 * Works: incognito, new device, new browser. Just keep your code.
 */
(function(global){
'use strict';

var currentUser=null,creditBalance=0,membershipTier='free',referralCode='';

function load(){try{return JSON.parse(localStorage.getItem('ss_u'));}catch(e){return null;}}
function save(u){localStorage.setItem('ss_u',JSON.stringify(u));}

// Encode user data to a short alphanumeric code
function toBackupCode(u){
  var json=JSON.stringify({e:u.em,p:u.pw,c:u.cr,t:u.ti,r:u.rc});
  return btoa(unescape(encodeURIComponent(json))).replace(/=/g,'');
}
// Decode backup code
function fromBackupCode(code){
  try{return JSON.parse(decodeURIComponent(escape(atob(code))));}catch(e){return null;}
}

function init(cb){
  currentUser=load();
  if(currentUser){creditBalance=currentUser.cr||0;membershipTier=currentUser.ti||'free';referralCode=currentUser.rc||'';cb(null,currentUser);}
  else cb(null,null);
}

function register(email,password,inviteCode,cb){
  var u={em:email,pw:password,cr:3,ti:'free',rc:'S'+Date.now().toString(36).slice(-6).toUpperCase(),ib:inviteCode||''};
  save(u);currentUser=u;creditBalance=3;membershipTier='free';referralCode=u.rc;
  // Referral
  if(inviteCode){var old=load();if(old&&old.rc===inviteCode){old.cr=(old.cr||0)+2;save(old);u.cr+=2;creditBalance=u.cr;save(u);}}
  cb(null,{user:u,backupCode:toBackupCode(u)});
}

function login(email,password,cb){
  var u=load();if(!u)return cb('账号不存在，请先注册',null);
  if(u.pw!==password)return cb('密码错误',null);
  currentUser=u;creditBalance=u.cr||0;membershipTier=u.ti||'free';referralCode=u.rc||'';cb(null,u);
}

function restoreAccount(code,cb){
  var u=fromBackupCode(code);if(!u)return cb('备份码无效',null);
  var user={em:u.e,pw:u.p,cr:u.c||0,ti:u.t||'free',rc:u.r||'S'+Date.now().toString(36).slice(-6).toUpperCase()};
  save(user);currentUser=user;creditBalance=user.cr;membershipTier=user.ti;referralCode=user.rc;
  cb(null,user);
}

function getBackupCode(){return currentUser?toBackupCode(currentUser):'';}

function logout(cb){localStorage.removeItem('ss_u');currentUser=null;creditBalance=0;membershipTier='free';referralCode='';cb(null);}

function deductCredit(amount,reason,cb){
  if(!currentUser)return cb('请先登录',null);
  if(membershipTier==='pro'||membershipTier==='lifetime')return cb(null,{deducted:0,remaining:creditBalance,unlimited:true});
  if(creditBalance<(amount||1))return cb('积分不足！',null);
  currentUser.cr-=(amount||1);creditBalance=currentUser.cr;save(currentUser);
  cb(null,{deducted:amount||1,remaining:creditBalance});
}

function refreshCredits(cb){init(cb);}
function getReferralLink(){return referralCode?'https://www.seedstudio.top/?ref='+referralCode:'';}

// Activation (simplified — seller confirms via email)
function activatePro(){if(currentUser){currentUser.ti='pro';currentUser.cr=999;save(currentUser);membershipTier='pro';creditBalance=999;}}

global.SeedStudioAccount={
  init:init,register:register,login:login,logout:logout,refreshCredits:refreshCredits,
  deductCredit:deductCredit,getReferralLink:getReferralLink,
  restoreAccount:restoreAccount,getBackupCode:getBackupCode,activatePro:activatePro,
  get currentUser(){return currentUser;},get creditBalance(){return creditBalance;},
  get membershipTier(){return membershipTier;},get referralCode(){return referralCode;},
  get isLoggedIn(){return!!currentUser;},
};
})(window);
