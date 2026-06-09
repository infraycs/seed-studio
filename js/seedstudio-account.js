/**
 * ONE CODE = YOUR ACCOUNT. Like a crypto wallet.
 * No email, no password, no server.
 * Save your code. Paste it on any device. Done.
 */
(function(global){
'use strict';

var currentUser=null,creditBalance=0,membershipTier='free',referralCode='';

function save(){if(!currentUser)return;localStorage.setItem('ss_wallet',JSON.stringify(currentUser));}
function load(){try{return JSON.parse(localStorage.getItem('ss_wallet'));}catch(e){return null;}}

// Encode account to transferable code
function code(){if(!currentUser)return'';return btoa(encodeURIComponent(JSON.stringify(currentUser)));}

// Decode code to account
function decode(c){try{return JSON.parse(decodeURIComponent(atob(c)));}catch(e){return null;}}

function init(cb){
  currentUser=load();
  if(currentUser){creditBalance=currentUser.cr||0;membershipTier=currentUser.ti||'free';referralCode=currentUser.rc||'';cb(null,currentUser);}
  else cb(null,null);
}

// "Register" = create a new wallet
function createAccount(cb){
  var u={id:'w'+Date.now().toString(36),cr:3,ti:'free',rc:'S'+Math.random().toString(36).slice(2,8).toUpperCase(),ct:new Date().toISOString()};
  currentUser=u;creditBalance=3;membershipTier='free';referralCode=u.rc;
  save();
  if(!load()){cb('存储失败！请检查浏览器设置',null);return;}
  cb(null,{code:code(),credits:3});
}

// "Login" = paste your code
function restoreFromCode(c,cb){
  var u=decode(c);if(!u)return cb('无效的账号码',null);
  currentUser=u;creditBalance=u.cr||0;membershipTier=u.ti||'free';referralCode=u.rc||'';
  save();cb(null,u);
}

function logout(cb){localStorage.removeItem('ss_wallet');currentUser=null;creditBalance=0;membershipTier='free';referralCode='';cb(null);}

function deductCredit(amount,reason,cb){
  if(!currentUser)return cb('请先登录',null);
  if(membershipTier==='pro'||membershipTier==='lifetime')return cb(null,{deducted:0,remaining:creditBalance,unlimited:true});
  if(creditBalance<(amount||1))return cb('积分不足！',null);
  currentUser.cr-=(amount||1);creditBalance=currentUser.cr;save();
  cb(null,{deducted:amount||1,remaining:creditBalance});
}

function getAccountCode(){return code();}
function getReferralLink(){return referralCode?'https://www.seedstudio.top/?ref='+referralCode:'';}
function activatePro(){if(currentUser){currentUser.ti='pro';currentUser.cr=999;save();membershipTier='pro';creditBalance=999;}}

global.SeedStudioAccount={init:init,createAccount:createAccount,restoreFromCode:restoreFromCode,logout:logout,deductCredit:deductCredit,getAccountCode:getAccountCode,getReferralLink:getReferralLink,activatePro:activatePro,get currentUser(){return currentUser;},get creditBalance(){return creditBalance;},get membershipTier(){return membershipTier;},get isLoggedIn(){return!!currentUser;}};
})(window);
