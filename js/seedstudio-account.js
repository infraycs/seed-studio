var u=null;
var K='ss_u';

function load(){try{u=JSON.parse(localStorage.getItem(K));return u;}catch(e){u=null;return null;}}
function save(){if(u)localStorage.setItem(K,JSON.stringify(u));}

function init(cb){load();checkExpiry();cb(null,u);}

function register(email,pw,cb){
  u={e:email,p:pw,c:3,t:'free',r:'R'+String(Date.now()).slice(-6)};
  save();
  var check=load();
  if(!check||check.e!==email){cb('save failed',null);return;}
  cb(null,u);
}

function login(email,pw,cb){
  var d=load();
  if(!d)return cb('not found',null);
  if(d.p!==pw)return cb('wrong pw',null);
  u=d;cb(null,u);
}

function logout(){localStorage.removeItem(K);u=null;}

function deduct(amt,cb){
  if(!u)return cb('login',null);
  if(u.t==='pro')return cb(null,{rm:u.c,ul:true});
  if((u.c||0)<(amt||1))return cb('no credits',null);
  u.c-=(amt||1);save();cb(null,{rm:u.c});
}

// Hashes — only seller knows originals
var MONTHLY_HASH='6e07dc1c'; // ¥6/月 key
var YEARLY_HASH='9d32c434';  // ¥39/年 key

function h(s){for(var i=0,r=0;i<s.length;i++){r=((r<<5)-r)+s.charCodeAt(i);r|=0;}return(r>>>0).toString(16).slice(0,8);}

function checkExpiry(){
  if(u&&u.t==='pro'&&u.exp){
    if(Date.now()>u.exp){u.t='free';u.exp=null;save();return true;}
  }
  return false;
}

function activateLicense(key,cb){
  var hash=h(key.trim());
  if(hash===MONTHLY_HASH){u.t='pro';u.c=999;u.exp=Date.now()+30*86400000;save();cb(null,{ok:1,t:'pro',exp:'30 days'});}
  else if(hash===YEARLY_HASH){u.t='pro';u.c=999;u.exp=Date.now()+365*86400000;save();cb(null,{ok:1,t:'pro',exp:'365 days'});}
  else cb('invalid key',null);
}

function lookupKey(oid,cb){cb('offline',null);}

function getBackupCode(){return u?btoa(unescape(encodeURIComponent(JSON.stringify(u)))):'';}

function restoreBackup(code,cb){
  try{var d=JSON.parse(decodeURIComponent(escape(atob(code))));u=d;save();cb(null,u);}
  catch(e){cb('bad code',null);}
}

var SS={init:init,register:register,login:login,logout:logout,deduct:deduct,activateLicense:activateLicense,lookupKey:lookupKey,getBackupCode:getBackupCode,restoreBackup:restoreBackup,get loggedIn(){return!!u;},get cr(){return u?u.c||0:0;},get ti(){return u?u.t||'free':'free';},get u(){return u;}};
