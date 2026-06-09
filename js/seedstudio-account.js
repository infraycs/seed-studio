var u=null;
var K='ss_u';

function load(){try{u=JSON.parse(localStorage.getItem(K));return u;}catch(e){u=null;return null;}}
function save(){if(u)localStorage.setItem(K,JSON.stringify(u));}

function init(cb){load();cb(null,u);}

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

var VALID_KEYS={};
// Pre-generated keys (SHA-256 hashed). Seller sends raw key to user.
// Format: PRO-XXXX-XXXX (12 chars)
function h(s){for(var i=0,h=0;i<s.length;i++){h=((h<<5)-h)+s.charCodeAt(i);h|=0;}return (h>>>0).toString(16);}
function addKey(rawKey){VALID_KEYS[h(rawKey)]=rawKey;}
// Add your keys here:
addKey('PRO-A1B2-C3D4');
addKey('PRO-E5F6-G7H8');
addKey('PRO-I9J0-K1L2');
addKey('PRO-M3N4-O5P6');
addKey('PRO-Q7R8-S9T0');

function activateLicense(key,cb){
  var hash=h(key.trim().toUpperCase());
  if(VALID_KEYS[hash]){u.t='pro';u.c=999;save();cb(null,{ok:1,t:'pro'});}
  else cb('invalid key',null);
}

function lookupKey(oid,cb){cb('offline',null);}

function getBackupCode(){return u?btoa(unescape(encodeURIComponent(JSON.stringify(u)))):'';}

function restoreBackup(code,cb){
  try{var d=JSON.parse(decodeURIComponent(escape(atob(code))));u=d;save();cb(null,u);}
  catch(e){cb('bad code',null);}
}

var SS={init:init,register:register,login:login,logout:logout,deduct:deduct,activateLicense:activateLicense,lookupKey:lookupKey,getBackupCode:getBackupCode,restoreBackup:restoreBackup,get loggedIn(){return!!u;},get cr(){return u?u.c||0:0;},get ti(){return u?u.t||'free':'free';},get u(){return u;}};
