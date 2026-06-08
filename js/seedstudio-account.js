/**
 * SeedStudio Account System v4
 * Pure localStorage + HMAC signature (zero external dependency)
 * Works even when all APIs are blocked.
 */
(function(global){
'use strict';

// Secret HMAC key (embedded in code, not user-accessible without devtools)
var SECRET = 'seedstudio_v4_hmac_' + '7e66f9f9';

// ═══════════════ HMAC ═══════════════
async function hmacSign(data){
  var enc=new TextEncoder();
  var key=await crypto.subtle.importKey('raw',enc.encode(SECRET),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  var sig=await crypto.subtle.sign('HMAC',key,enc.encode(data));
  return Array.from(new Uint8Array(sig)).map(function(b){return b.toString(16).padStart(2,'0');}).join('');
}

async function hmacVerify(data,signature){
  var expected=await hmacSign(data);
  return expected===signature;
}

// ═══════════════ STATE ═══════════════
var currentUser=null;
var creditBalance=0;
var membershipTier='free';
var referralCode='';

// ═══════════════ INIT ═══════════════
async function init(callback){
  try{
    var raw=localStorage.getItem('seedstudio_user');
    if(!raw){callback(null,null);return;}
    var parts=raw.split('.');
    if(parts.length!==2){callback(null,null);return;}
    var data=parts[0],sig=parts[1];
    var valid=await hmacVerify(data,sig);
    if(!valid){localStorage.removeItem('seedstudio_user');callback(null,null);return;}

    currentUser=JSON.parse(data);
    creditBalance=currentUser.credits||0;
    membershipTier=currentUser.tier||'free';
    referralCode=currentUser.referralCode||'';
    callback(null,currentUser);
  }catch(e){
    callback(null,null);
  }
}

// ═══════════════ SAVE ═══════════════
async function saveUser(){
  if(!currentUser)return;
  currentUser.updatedAt=Date.now();
  var data=JSON.stringify(currentUser);
  var sig=await hmacSign(data);
  localStorage.setItem('seedstudio_user',data+'.'+sig);
}

// ═══════════════ AUTH ═══════════════
async function register(email, password, inviteCode, callback){
  // Check if email already exists
  var existing=localStorage.getItem('seedstudio_user_'+email);
  if(existing){callback('该邮箱已注册，请直接登录',null);return;}

  var user={
    id: 'u'+Date.now().toString(36),
    email: email,
    passwordHash: await simpleHash(password+SECRET),
    credits: 3, // 🎁 3 free credits
    tier: 'free',
    referralCode: 'S'+Math.random().toString(36).substring(2,8).toUpperCase(),
    invitedBy: inviteCode||'',
    createdAt: new Date().toISOString(),
  };

  currentUser=user;
  creditBalance=3;
  membershipTier='free';
  referralCode=user.referralCode;

  await saveUser();
  localStorage.setItem('seedstudio_user_'+email, user.id);

  // Process referral
  if(inviteCode){
    await processReferral(inviteCode);
  }

  callback(null,user);
}

async function login(email, password, callback){
  var pHash=await simpleHash(password+SECRET);
  var raw=localStorage.getItem('seedstudio_user');

  if(!raw){callback('账号不存在，请先注册',null);return;}
  var parts=raw.split('.');
  if(parts.length!==2){callback('数据损坏，请重新注册',null);return;}

  var data=parts[0],sig=parts[1];
  var valid=await hmacVerify(data,sig);
  if(!valid){callback('数据被篡改，请重新注册',null);return;}

  var user=JSON.parse(data);
  // Check if this is the user's email by checking stored hash
  var storedId=localStorage.getItem('seedstudio_user_'+email);
  if(!storedId||storedId!==user.id){callback('账号不存在，请先注册',null);return;}
  if(user.passwordHash!==pHash){callback('密码错误',null);return;}

  currentUser=user;
  creditBalance=user.credits||0;
  membershipTier=user.tier||'free';
  referralCode=user.referralCode||'';
  callback(null,user);
}

function logout(callback){
  currentUser=null;
  creditBalance=0;
  membershipTier='free';
  referralCode='';
  callback(null);
}

// ═══════════════ CREDITS ═══════════════
function refreshCredits(callback){
  if(!currentUser){callback('Not logged in',null);return;}
  creditBalance=currentUser.credits||0;
  membershipTier=currentUser.tier||'free';
  callback(null,{credits:creditBalance,tier:membershipTier});
}

async function deductCredit(amount, reason, callback){
  if(!currentUser){callback('请先登录',null);return;}
  amount=amount||1;
  if(membershipTier==='pro'||membershipTier==='lifetime'){
    callback(null,{deducted:0,remaining:creditBalance,unlimited:true});
    return;
  }
  if(creditBalance<amount){callback('积分不足！请充值或邀请好友',null);return;}

  currentUser.credits=(currentUser.credits||0)-amount;
  creditBalance=currentUser.credits;
  await saveUser();
  callback(null,{deducted:amount,remaining:creditBalance});
}

// ═══════════════ REFERRAL ═══════════════
async function processReferral(inviteCode){
  var raw=localStorage.getItem('seedstudio_user');
  if(!raw)return;
  var data=JSON.parse(raw.split('.')[0]);
  if(data.referralCode===inviteCode){
    data.credits=(data.credits||0)+2;
    currentUser.credits=(currentUser.credits||0)+2;
    creditBalance=currentUser.credits;
    var sig=await hmacSign(JSON.stringify(data));
    localStorage.setItem('seedstudio_user',JSON.stringify(data)+'.'+sig);
    await saveUser();
  }
}

function getReferralLink(){
  if(!referralCode)return'';
  return'https://www.seedstudio.top/?ref='+referralCode;
}

// ═══════════════ HELPERS ═══════════════
async function simpleHash(str){
  var d=new TextEncoder().encode(str);
  var h=await crypto.subtle.digest('SHA-256',d);
  return Array.from(new Uint8Array(h)).map(function(b){return b.toString(16).padStart(2,'0');}).join('');
}

// ═══════════════ PRO UPGRADE ═══════════════
function upgradeToPro(tier){
  if(!currentUser)return;
  tier=tier||'pro';
  currentUser.tier=tier;
  currentUser.credits=999;
  membershipTier=tier;
  creditBalance=999;
  saveUser();
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
