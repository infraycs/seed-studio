(function(global){
'use strict';

var currentUser=null,creditBalance=0,membershipTier='free',referralCode='';

function load(){
  var r=localStorage.getItem('ss_u');if(!r)return null;
  try{return JSON.parse(r);}catch(e){return null;}
}
function save(u){localStorage.setItem('ss_u',JSON.stringify(u));}

function init(cb){
  currentUser=load();
  if(currentUser){creditBalance=currentUser.cr||0;membershipTier=currentUser.ti||'free';referralCode=currentUser.rc||'';cb(null,currentUser);}
  else cb(null,null);
}

function register(email,password,inviteCode,cb){
  var u={em:email,pw:password,cr:3,ti:'free',rc:'S'+Date.now().toString(36).slice(-6).toUpperCase(),ib:inviteCode||''};
  save(u);currentUser=u;creditBalance=3;membershipTier='free';referralCode=u.rc;
  if(inviteCode){var old=load();if(old&&old.rc===inviteCode){old.cr=(old.cr||0)+2;save(old);u.cr+=2;creditBalance=u.cr;save(u);}}
  cb(null,u);
}

function login(email,password,cb){
  var u=load();if(!u){cb('账号不存在，请先注册',null);return;}
  if(u.pw!==password){cb('密码错误',null);return;}
  currentUser=u;creditBalance=u.cr||0;membershipTier=u.ti||'free';referralCode=u.rc||'';cb(null,u);
}

function logout(cb){currentUser=null;creditBalance=0;membershipTier='free';referralCode='';cb(null);}

function deductCredit(amount,reason,cb){
  if(!currentUser){cb('请先登录',null);return;}
  if(membershipTier==='pro'||membershipTier==='lifetime'){cb(null,{deducted:0,remaining:creditBalance,unlimited:true});return;}
  if(creditBalance<(amount||1)){cb('积分不足！',null);return;}
  currentUser.cr-=(amount||1);creditBalance=currentUser.cr;save(currentUser);
  cb(null,{deducted:amount||1,remaining:creditBalance});
}

function refreshCredits(cb){init(cb);}
function getReferralLink(){return referralCode?'https://www.seedstudio.top/?ref='+referralCode:'';}

global.SeedStudioAccount={
  init:init,register:register,login:login,logout:logout,refreshCredits:refreshCredits,
  deductCredit:deductCredit,getReferralLink:getReferralLink,
  get currentUser(){return currentUser;},get creditBalance(){return creditBalance;},
  get membershipTier(){return membershipTier;},get referralCode(){return referralCode;},
  get isLoggedIn(){return!!currentUser;},
};
})(window);
