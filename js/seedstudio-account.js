var u=null,K='ss_u';

function init(cb){
  try{u=JSON.parse(localStorage.getItem(K));}catch(e){u=null;}
  if(u&&u.exp&&Date.now()>u.exp){u.t='free';u.exp=null;localStorage.setItem(K,JSON.stringify(u));}
  cb(null,u);
}

function register(email,pw,cb){
  u={e:email,p:pw,c:3,t:'free',r:'R'+Math.random().toString(36).slice(2,8)};
  localStorage.setItem(K,JSON.stringify(u));
  cb(null,u);
}

function login(email,pw,cb){
  var d;try{d=JSON.parse(localStorage.getItem(K));}catch(e){d=null;}
  if(!d)return cb('not found',null);
  if(d.p!==pw)return cb('wrong pw',null);
  u=d;cb(null,u);
}

function logout(){localStorage.removeItem(K);u=null;}

function deduct(amt,cb){
  if(!u)return cb('login',null);
  if(u.t==='pro')return cb(null,{rm:u.c,ul:true});
  if((u.c||0)<(amt||1))return cb('no credits',null);
  u.c-=(amt||1);localStorage.setItem(K,JSON.stringify(u));cb(null,{rm:u.c});
}

var MONTHLY_HASH='6e07dc1c',YEARLY_HASH='9d32c434';
function h(s){for(var i=0,r=0;i<s.length;i++){r=((r<<5)-r)+s.charCodeAt(i);r|=0;}return(r>>>0).toString(16).slice(0,8);}

function activateLicense(key,cb){
  var hash=h(key.trim());
  if(hash===MONTHLY_HASH){u.t='pro';u.c=999;u.exp=Date.now()+30*86400000;}
  else if(hash===YEARLY_HASH){u.t='pro';u.c=999;u.exp=Date.now()+365*86400000;}
  else return cb('invalid key',null);
  localStorage.setItem(K,JSON.stringify(u));cb(null,{ok:1,t:'pro'});
}

function lookupKey(oid,cb){cb('offline',null);}
function getBackupCode(){return u?btoa(unescape(encodeURIComponent(JSON.stringify(u)))):'';}
function restoreBackup(code,cb){
  try{var d=JSON.parse(decodeURIComponent(escape(atob(code))));localStorage.setItem(K,JSON.stringify(d));u=d;cb(null,u);}
  catch(e){cb('bad code',null);}
}

var SS={init:init,register:register,login:login,logout:logout,deduct:deduct,activateLicense:activateLicense,lookupKey:lookupKey,getBackupCode:getBackupCode,restoreBackup:restoreBackup,get loggedIn(){return!!u;},get cr(){return u?u.c||0:0;},get ti(){return u?u.t||'free':'free';},get u(){return u;}};
