var API='https://odd-sky-4c45.402741165.workers.dev';
var token=localStorage.getItem('ss_token')||'';
var currentUser=null,creditBalance=0,membershipTier='free',referralCode='';

function api(method,path,body){
  var opts={method:method,headers:{'Content-Type':'application/json'}};
  if(token)opts.headers['Authorization']='Bearer '+token;
  if(body)opts.body=JSON.stringify(body);
  return fetch(API+path,opts).then(function(r){return r.json();});
}

function init(callback){
  if(!token){callback(null,null);return;}
  api('GET','/me').then(function(u){
    if(u.error){token='';localStorage.removeItem('ss_token');callback(null,null);return;}
    currentUser={email:u.email};creditBalance=u.cr||0;membershipTier=u.ti||'free';referralCode=u.rc||'';
    callback(null,u);
  }).catch(function(){callback(null,null);});
}

function register(email,password,inviteCode,callback){
  api('POST','/register',{email:email,password:password,inviteCode:inviteCode||''}).then(function(r){
    if(r.error){callback(r.error,null);return;}
    token=r.token;localStorage.setItem('ss_token',token);currentUser={email:email};creditBalance=r.cr;membershipTier=r.ti;referralCode=r.rc;
    callback(null,currentUser);
  }).catch(function(e){callback('网络错误: '+e.message,null);});
}

function login(email,password,callback){
  api('POST','/login',{email:email,password:password}).then(function(r){
    if(r.error){callback(r.error,null);return;}
    token=r.token;localStorage.setItem('ss_token',token);currentUser={email:email};creditBalance=r.cr;membershipTier=r.ti;referralCode=r.rc;
    callback(null,currentUser);
  }).catch(function(e){callback('网络错误: '+e.message,null);});
}

function logout(callback){token='';localStorage.removeItem('ss_token');currentUser=null;creditBalance=0;membershipTier='free';referralCode='';callback(null);}

function refreshCredits(callback){
  api('GET','/me').then(function(u){if(u.error){callback(u.error,null);return;}creditBalance=u.cr||0;membershipTier=u.ti||'free';callback(null,{credits:creditBalance,tier:membershipTier});}).catch(function(e){callback(e.message,null);});
}

function deductCredit(amount,reason,callback){
  api('POST','/deduct',{amount:amount||1}).then(function(r){
    if(r.error){callback(r.error,null);return;}
    creditBalance=r.rm;callback(null,{deducted:amount,remaining:r.rm,unlimited:r.ul});
  }).catch(function(e){callback('网络错误: '+e.message,null);});
}

function verifyPayment(orderId,callback){
  api('POST','/order',{orderId:orderId}).then(function(r){
    if(r.error){callback(r.error,null);return;}
    callback(null,r.key);
  }).catch(function(e){callback(e.message,null);});
}

function upgradeUser(email,tier,callback){
  api('POST','/upgrade',{email:email,tier:tier||'pro'}).then(function(r){
    if(r.error){callback(r.error,null);return;}
    if(currentUser&&currentUser.email===email){membershipTier=r.ti||'pro';creditBalance=999;if(typeof S!=='undefined')S.tier='pro';}
    callback(null,r);
  }).catch(function(e){callback(e.message,null);});
}

function getReferralLink(){return referralCode?'https://www.seedstudio.top/?ref='+referralCode:'';}

window.SeedStudioAccount={
  init:init,register:register,login:login,logout:logout,refreshCredits:refreshCredits,
  deductCredit:deductCredit,verifyPayment:verifyPayment,upgradeUser:upgradeUser,
  getReferralLink:getReferralLink,
  get currentUser(){return currentUser;},get creditBalance(){return creditBalance;},
  get membershipTier(){return membershipTier;},get referralCode(){return referralCode;},
  get isLoggedIn(){return!!currentUser&&!!token;},
};
