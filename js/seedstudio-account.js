/**
 * SeedStudio Account v7 — CloudBase SMS login
 * No password, no email. Just phone + verification code.
 */
(function(global){
'use strict';

var ENV_ID = 'seedstudio-d6gcgy3nwa8b4e1ca';
var app = null, db = null, auth = null;

var currentUser = null;
var creditBalance = 0;
var membershipTier = 'free';
var referralCode = '';
var phoneNumber = '';

// ═══════════════ INIT ═══════════════
async function init(callback){
  if(typeof tcb==='undefined'){callback('SDK未加载',null);return;}
  app=tcb.init({env:ENV_ID});
  auth=app.auth({persistence:'local'});
  db=app.database();

  var state=await auth.getLoginState().catch(function(){return null;});
  if(state&&state.user){
    phoneNumber=state.user.phoneNumber||'';
    currentUser=state.user;
    await loadUserDB(callback);
  } else {
    callback(null,null);
  }
}

async function loadUserDB(callback){
  try{
    var res=await db.collection('users').where({uid:currentUser.uid}).get();
    if(res.data&&res.data.length>0){
      var u=res.data[0];
      creditBalance=u.credits||0;
      membershipTier=u.tier||'free';
      referralCode=u.referralCode||'';
    } else {
      var rc='S'+Math.random().toString(36).substring(2,8).toUpperCase();
      await db.collection('users').add({uid:currentUser.uid,phone:phoneNumber,credits:3,tier:'free',referralCode:rc,createdAt:new Date().toISOString()});
      creditBalance=3; membershipTier='free'; referralCode=rc;
    }
    callback(null,{credits:creditBalance,tier:membershipTier});
  }catch(e){callback(e.message,null);}
}

// ═══════════════ SEND CODE ═══════════════
function sendCode(phone, callback){
  if(!auth){callback('系统初始化中，请稍后再试',null);return;}
  var p=phone.trim().replace(/\s/g,'');
  if(!/^1[3-9]\d{9}$/.test(p)){callback('请输入正确的手机号',null);return;}
  phoneNumber=p;
  auth.sendPhoneCode(p).then(function(){
    callback(null,{sent:true});
  }).catch(function(e){
    callback('发送失败: '+(e.message||e.code||e),null);
  });
}

// ═══════════════ LOGIN / REGISTER ═══════════════
function loginWithCode(code, inviteCode, callback){
  if(!auth){callback('系统初始化中，请稍后',null);return;}
  if(!phoneNumber){callback('请先输入手机号',null);return;}
  auth.signInWithPhoneCode(phoneNumber,code).then(function(state){
    currentUser=state.user;
    loadUserDB(function(err,data){
      if(err){callback(err,null);return;}
      if(inviteCode)processReferral(inviteCode,function(){});
      callback(null,currentUser);
    });
  }).catch(function(e){
    callback('登录失败: '+(e.message||e.code||e),null);
  });
}

function logout(callback){
  auth.signOut().then(function(){
    currentUser=null; creditBalance=0; membershipTier='free'; referralCode=''; phoneNumber='';
    callback(null);
  }).catch(function(e){callback(e.message);});
}

// ═══════════════ CREDITS ═══════════════
function refreshCredits(callback){loadUserDB(callback);}

async function deductCredit(amount, reason, callback){
  if(!currentUser){callback('请先登录',null);return;}
  amount=amount||1;
  if(membershipTier==='pro'||membershipTier==='lifetime'){callback(null,{deducted:0,remaining:creditBalance,unlimited:true});return;}
  if(creditBalance<amount){callback('积分不足！',null);return;}
  var nb=creditBalance-amount;
  try{
    var res=await db.collection('users').where({uid:currentUser.uid}).get();
    if(res.data&&res.data.length>0) await db.collection('users').doc(res.data[0]._id).update({credits:nb});
    creditBalance=nb; callback(null,{deducted:amount,remaining:creditBalance});
  }catch(e){callback(e.message,null);}
}

// ═══════════════ REFERRAL ═══════════════
async function processReferral(inviteCode, callback){
  try{
    var ref=await db.collection('users').where({referralCode:inviteCode}).get();
    if(ref.data&&ref.data.length>0){
      var inv=ref.data[0];
      await db.collection('users').doc(inv._id).update({credits:(inv.credits||0)+2});
      // +2 to current user
      var me=await db.collection('users').where({uid:currentUser.uid}).get();
      if(me.data&&me.data.length>0){var nb=creditBalance+2; await db.collection('users').doc(me.data[0]._id).update({credits:nb}); creditBalance=nb;}
    }
  }catch(e){}
  if(callback)callback(null,null);
}
function getReferralLink(){return referralCode?'https://www.seedstudio.top/?ref='+referralCode:'';}

// ═══════════════ PRO ═══════════════
async function upgradeToPro(userPhone,tier){
  try{
    var res=await db.collection('users').where({phone:userPhone}).get();
    if(res.data&&res.data.length>0){
      await db.collection('users').doc(res.data[0]._id).update({tier:tier||'pro',credits:999,upgradedAt:new Date().toISOString()});
      if(currentUser&&phoneNumber===userPhone){membershipTier=tier||'pro';creditBalance=999;if(typeof S!=='undefined')S.tier='pro';}
      return true;
    }
  }catch(e){}
  return false;
}

// ═══════════════ PASSWORD LOGIN ═══════════════
var SALT_PW='seedstudio_cb_pw_2024';
async function sha256(str){var d=new TextEncoder().encode(str);var h=await crypto.subtle.digest('SHA-256',d);return Array.from(new Uint8Array(h)).map(function(b){return b.toString(16).padStart(2,'0');}).join('');}

async function register(email,password,inviteCode,callback){
  try{
    var exist=await db.collection('users').where({email:email}).get();
    if(exist.data&&exist.data.length>0){callback('该账号已注册，请直接登录',null);return;}
    var pwHash=await sha256(password+SALT_PW);
    var rc='S'+Math.random().toString(36).substring(2,8).toUpperCase();
    var doc={email:email,passwordHash:pwHash,credits:3,tier:'free',referralCode:rc,invitedBy:inviteCode||'',createdAt:new Date().toISOString()};
    var addRes=await db.collection('users').add(doc);
    currentUser={uid:'pw_'+addRes.id,_id:addRes.id,email:email};
    creditBalance=3;membershipTier='free';referralCode=rc;
    if(inviteCode)processReferral(inviteCode,function(){});
    callback(null,currentUser);
  }catch(e){callback('注册失败: '+(e.message||e.code||e),null);}
}

async function login(email,password,callback){
  try{
    var pwHash=await sha256(password+SALT_PW);
    var res=await db.collection('users').where({email:email}).get();
    if(!res.data||res.data.length===0){callback('账号不存在，请先注册',null);return;}
    var u=res.data[0];
    if(u.passwordHash!==pwHash){callback('密码错误',null);return;}
    currentUser={uid:'pw_'+u._id,_id:u._id,email:email};
    creditBalance=u.credits||0;membershipTier=u.tier||'free';referralCode=u.referralCode||'';
    callback(null,currentUser);
  }catch(e){callback('登录失败: '+(e.message||e.code||e),null);}
}

global.SeedStudioAccount={
  init:init, sendCode:sendCode, loginWithCode:loginWithCode, login:login, register:register, logout:logout,
  refreshCredits:refreshCredits, deductCredit:deductCredit, getReferralLink:getReferralLink,
  upgradeToPro:upgradeToPro, processReferral:processReferral,
  get currentUser(){return currentUser;}, get creditBalance(){return creditBalance;},
  get membershipTier(){return membershipTier;}, get referralCode(){return referralCode;},
  get isLoggedIn(){return !!currentUser;}, get phoneNumber(){return phoneNumber;},
};
})(window);
