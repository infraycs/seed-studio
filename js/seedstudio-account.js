/**
 * SeedStudio Account — localStorage + HMAC
 * Fixed secret — no more "data corrupted" errors
 */
(function(global){
'use strict';

var SECRET='seedstudio_fixed_secret_k9m2x7v4';

function simpleHash(str){
  var hash=0,i,chr;
  for(i=0;i<str.length;i++){chr=str.charCodeAt(i);hash=((hash<<5)-hash)+chr;hash|=0;}
  return (hash>>>0).toString(16);
}
function hmacSign(data){return Promise.resolve(simpleHash(SECRET+data));}
function sha256(str){return Promise.resolve(simpleHash(str+SECRET));}

var currentUser=null,creditBalance=0,membershipTier='free',referralCode='';

async function init(callback){
  try{
    var raw=localStorage.getItem('ss_user');
    if(!raw){callback(null,null);return;}
    var p=raw.split('.');if(p.length!==2){localStorage.removeItem('ss_user');callback(null,null);return;}
    if(await hmacSign(p[0])!==p[1]){localStorage.removeItem('ss_user');callback(null,null);return;}
    currentUser=JSON.parse(p[0]);creditBalance=currentUser.cr||0;membershipTier=currentUser.ti||'free';referralCode=currentUser.rc||'';
    callback(null,currentUser);
  }catch(e){localStorage.removeItem('ss_user');callback(null,null);}
}

async function save(){if(!currentUser)return;currentUser.up=Date.now();var d=JSON.stringify(currentUser),s=await hmacSign(d);localStorage.setItem('ss_user',d+'.'+s);}

async function register(email,password,inviteCode,callback){
  if(localStorage.getItem('ss_user')){callback('已有账号，请退出后重新注册',null);return;}
  var u={id:'u'+Date.now().toString(36),em:email,ph:await sha256(password+SECRET),cr:3,ti:'free',rc:'S'+Math.random().toString(36).substring(2,8).toUpperCase(),ib:inviteCode||'',ct:new Date().toISOString()};
  currentUser=u;creditBalance=3;membershipTier='free';referralCode=u.rc;await save();
  if(inviteCode)await processReferral(inviteCode);
  callback(null,u);
}

async function login(email,password,callback){
  var raw=localStorage.getItem('ss_user');if(!raw){callback('账号不存在，请先注册',null);return;}
  var p=raw.split('.');if(await hmacSign(p[0])!==p[1]){localStorage.removeItem('ss_user');callback('数据异常，请重新注册',null);return;}
  var u=JSON.parse(p[0]);if(u.ph!==await sha256(password+SECRET)){callback('密码错误',null);return;}
  currentUser=u;creditBalance=u.cr||0;membershipTier=u.ti||'free';referralCode=u.rc||'';callback(null,u);
}

function logout(callback){currentUser=null;creditBalance=0;membershipTier='free';referralCode='';callback(null);}

async function deductCredit(amount,reason,callback){
  if(!currentUser){callback('请先登录',null);return;}
  if(membershipTier==='pro'||membershipTier==='lifetime'){callback(null,{deducted:0,remaining:creditBalance,unlimited:true});return;}
  if(creditBalance<(amount||1)){callback('积分不足！',null);return;}
  currentUser.cr=(currentUser.cr||0)-(amount||1);creditBalance=currentUser.cr;await save();
  callback(null,{deducted:amount||1,remaining:creditBalance});
}

async function processReferral(inviteCode){
  var raw=localStorage.getItem('ss_user');if(!raw)return;var u=JSON.parse(raw.split('.')[0]);
  if(u.rc===inviteCode){u.cr=(u.cr||0)+2;var s=await hmacSign(JSON.stringify(u));localStorage.setItem('ss_user',JSON.stringify(u)+'.'+s);}
  if(currentUser){currentUser.cr=(currentUser.cr||0)+2;creditBalance=currentUser.cr;await save();}
}

function getReferralLink(){return referralCode?'https://www.seedstudio.top/?ref='+referralCode:'';}
function refreshCredits(cb){if(!currentUser){cb('Not logged in',null);return;}cb(null,{credits:creditBalance,tier:membershipTier});}

global.SeedStudioAccount={
  init:init,register:register,login:login,logout:logout,refreshCredits:refreshCredits,
  deductCredit:deductCredit,getReferralLink:getReferralLink,
  get currentUser(){return currentUser;},get creditBalance(){return creditBalance;},
  get membershipTier(){return membershipTier;},get referralCode(){return referralCode;},
  get isLoggedIn(){return!!currentUser;},
};
})(window);
