/**
 * SeedStudio Account v8 — localStorage + HMAC, reliable & zero-network
 *
 * Truth: localStorage is per-user-browser. 1000 users = 1000 separate browsers.
 * Your computer stores NOTHING. Infinitely scalable.
 *
 * Payment: 爱发电 auto-reply sends License Key → user activates → Pro unlocked
 */
(function(global){
'use strict';

var SECRET='seedstudio_v8_'+Math.random().toString(36);

async function hmacSign(data){
  var enc=new TextEncoder(),key=await crypto.subtle.importKey('raw',enc.encode(SECRET),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  var sig=await crypto.subtle.sign('HMAC',key,enc.encode(data));
  return Array.from(new Uint8Array(sig)).map(function(b){return b.toString(16).padStart(2,'0');}).join('');
}

var currentUser=null,creditBalance=0,membershipTier='free',referralCode='';

async function init(callback){
  try{
    var raw=localStorage.getItem('ss_user');
    if(!raw){callback(null,null);return;}
    var p=raw.split('.');if(p.length!==2){callback(null,null);return;}
    var v=await hmacSign(p[0])===p[1];
    if(!v){localStorage.removeItem('ss_user');callback(null,null);return;}
    currentUser=JSON.parse(p[0]);creditBalance=currentUser.cr||0;membershipTier=currentUser.ti||'free';referralCode=currentUser.rc||'';
    callback(null,currentUser);
  }catch(e){callback(null,null);}
}

async function save(){if(!currentUser)return;currentUser.up=Date.now();var d=JSON.stringify(currentUser),s=await hmacSign(d);localStorage.setItem('ss_user',d+'.'+s);}

async function register(email,password,inviteCode,callback){
  var u={id:'u'+Date.now().toString(36),em:email,ph:await hash(password+SECRET),cr:3,ti:'free',rc:'S'+Math.random().toString(36).substring(2,8).toUpperCase(),ib:inviteCode||'',ct:new Date().toISOString()};
  currentUser=u;creditBalance=3;membershipTier='free';referralCode=u.rc;await save();
  if(inviteCode)await processReferral(inviteCode);
  callback(null,u);
}

async function login(email,password,callback){
  var h=await hash(password+SECRET),raw=localStorage.getItem('ss_user');
  if(!raw){callback('账号不存在',null);return;}var p=raw.split('.');
  if((await hmacSign(p[0]))!==p[1]){callback('数据损坏',null);return;}
  var u=JSON.parse(p[0]);if(u.ph!==h){callback('密码错误',null);return;}
  currentUser=u;creditBalance=u.cr||0;membershipTier=u.ti||'free';referralCode=u.rc||'';callback(null,u);
}

function logout(callback){currentUser=null;creditBalance=0;membershipTier='free';referralCode='';callback(null);}

function refreshCredits(callback){if(!currentUser){callback('Not logged in',null);return;}creditBalance=currentUser.cr||0;membershipTier=currentUser.ti||'free';callback(null,{credits:creditBalance,tier:membershipTier});}

async function deductCredit(amount,reason,callback){
  if(!currentUser){callback('请先登录',null);return;}amount=amount||1;
  if(membershipTier==='pro'||membershipTier==='lifetime'){callback(null,{deducted:0,remaining:creditBalance,unlimited:true});return;}
  if(creditBalance<amount){callback('积分不足！',null);return;}
  currentUser.cr=(currentUser.cr||0)-amount;creditBalance=currentUser.cr;await save();
  callback(null,{deducted:amount,remaining:creditBalance});
}

async function processReferral(inviteCode){
  var raw=localStorage.getItem('ss_user');if(!raw)return;
  var u=JSON.parse(raw.split('.')[0]);
  if(u.rc===inviteCode){u.cr=(u.cr||0)+2;var s=await hmacSign(JSON.stringify(u));localStorage.setItem('ss_user',JSON.stringify(u)+'.'+s);}
  if(currentUser){currentUser.cr=(currentUser.cr||0)+2;creditBalance=currentUser.cr;await save();}
}

function getReferralLink(){return referralCode?'https://www.seedstudio.top/?ref='+referralCode:'';}

// ═══════════════ BACKUP / RESTORE ═══════════════
function backupAccount(){
  var d=localStorage.getItem('ss_user');if(!d)return null;
  return btoa(d); // base64 encoded
}
function restoreAccount(b64,callback){
  try{
    var d=atob(b64),p=d.split('.');
    if(p.length!==2){callback('无效的备份文件',null);return;}
    hmacSign(p[0]).then(function(s){
      if(s!==p[1]){callback('备份已损坏',null);return;}
      localStorage.setItem('ss_user',d);init(callback);
    });
  }catch(e){callback('备份格式错误',null);}
}

// ═══════════════ LICENSE KEY ACTIVATION ═══════════════
var validKeysCache=null;

async function loadValidKeys(){
  if(validKeysCache)return validKeysCache;
  try{
    var r=await fetch('js/valid-keys.json?v='+Date.now());
    validKeysCache=await r.json();
    return validKeysCache;
  }catch(e){return{keys:{}};}
}

async function activateLicenseKey(key,callback){
  var k=key.trim().toUpperCase();
  var h=await hash(k);
  var vk=await loadValidKeys();
  // Check against all stored hashes
  var found=false;
  for(var orderId in vk.keys){
    if(vk.keys[orderId].hash===h){found=true;break;}
  }
  if(found){
    if(currentUser){currentUser.ti='pro';currentUser.cr=999;membershipTier='pro';creditBalance=999;await save();}
    callback(null,{tier:'pro',credits:999});
  }else{callback('无效的 License Key',null);}
}

// ═══════════════ HELPERS ═══════════════
async function hash(str){var d=new TextEncoder().encode(str);var h=await crypto.subtle.digest('SHA-256',d);return Array.from(new Uint8Array(h)).map(function(b){return b.toString(16).padStart(2,'0');}).join('');}

global.SeedStudioAccount={
  init:init,register:register,login:login,logout:logout,refreshCredits:refreshCredits,
  deductCredit:deductCredit,getReferralLink:getReferralLink,
  activateLicenseKey:activateLicenseKey,backupAccount:backupAccount,restoreAccount:restoreAccount,
  get currentUser(){return currentUser;},get creditBalance(){return creditBalance;},
  get membershipTier(){return membershipTier;},get referralCode(){return referralCode;},
  get isLoggedIn(){return !!currentUser;},
};
})(window);
