/**
 * Short code = account. 8-char human-readable.
 * Payment: 爱发电 note = your code → seller upgrades that code
 */
(function(global){
'use strict';

var currentUser=null,creditBalance=0,membershipTier='free',referralCode='';

function save(){if(!currentUser)return;localStorage.setItem('ss_w',JSON.stringify(currentUser));}
function load(){try{return JSON.parse(localStorage.getItem('ss_w'));}catch(e){return null;}}

// Short code: 8 chars from user ID
function shortCode(u){return(u||currentUser||{}).id||'';}
function fullCode(u){return btoa(encodeURIComponent(JSON.stringify(u||currentUser)));}
function decodeFull(c){try{return JSON.parse(decodeURIComponent(atob(c)));}catch(e){return null;}}

function init(cb){
  currentUser=load();
  if(currentUser){creditBalance=currentUser.cr||0;membershipTier=currentUser.ti||'free';referralCode=currentUser.rc||'';cb(null,currentUser);}
  else cb(null,null);
}

function createAccount(cb){
  var id='SS'+Math.random().toString(36).slice(2,8).toUpperCase(); // e.g. "SSK9X2M7"
  var u={id:id,cr:3,ti:'free',rc:'S'+Math.random().toString(36).slice(2,6).toUpperCase(),ct:new Date().toISOString()};
  currentUser=u;creditBalance=3;membershipTier='free';referralCode=u.rc;
  save();if(!load()){cb('存储失败',null);return;}
  cb(null,{id:id,fullCode:fullCode(),credits:3});
}

function restoreFromCode(c,cb){
  // Try short code first, then full code
  var u;
  if(c.length<=12){
    // Short code — search localStorage (this device only)
    var local=load();
    if(local&&local.id===c)u=local;
  }else{u=decodeFull(c);}
  if(!u)return cb('账号码无效',null);
  currentUser=u;creditBalance=u.cr||0;membershipTier=u.ti||'free';referralCode=u.rc||'';
  save();cb(null,u);
}

function logout(cb){localStorage.removeItem('ss_w');currentUser=null;creditBalance=0;membershipTier='free';referralCode='';cb(null);}
function deductCredit(amount,reason,cb){
  if(!currentUser)return cb('请先登录',null);
  if(membershipTier==='pro'||membershipTier==='lifetime')return cb(null,{deducted:0,remaining:creditBalance,unlimited:true});
  if(creditBalance<(amount||1))return cb('积分不足！',null);
  currentUser.cr-=(amount||1);creditBalance=currentUser.cr;save();
  cb(null,{deducted:amount||1,remaining:creditBalance});
}
function getReferralLink(){return referralCode?'https://www.seedstudio.top/?ref='+referralCode:'';}
function activatePro(){if(currentUser){currentUser.ti='pro';currentUser.cr=999;save();membershipTier='pro';creditBalance=999;}}

function getAccountId(){return currentUser?currentUser.id:'';}
function getFullCode(){return currentUser?fullCode():'';}

// Admin: seller uses full code to restore ANY account, then activatePro()
function adminUpgrade(fullCodeStr,cb){
  var u=decodeFull(fullCodeStr);if(!u)return cb('无效码',null);
  u.ti='pro';u.cr=999;
  // Can't save to user's localStorage — instead return a license key
  var license='PRO-'+u.id+'-'+Date.now().toString(36).slice(-4).toUpperCase();
  cb(null,{license:license,accountId:u.id});
}

global.SeedStudioAccount={init:init,createAccount:createAccount,restoreFromCode:restoreFromCode,logout:logout,deductCredit:deductCredit,getReferralLink:getReferralLink,activatePro:activatePro,getAccountId:getAccountId,getFullCode:getFullCode,adminUpgrade:adminUpgrade,get currentUser(){return currentUser;},get creditBalance(){return creditBalance;},get membershipTier(){return membershipTier;},get isLoggedIn(){return!!currentUser;}};
})(window);
