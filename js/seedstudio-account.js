var API='/_tcb/cloudfunctions/api';
var uid=localStorage.getItem('ss_id')||'',cr=0,ti='free';

function call(a,d){return fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:a,data:d||{}})}).then(function(r){return r.json();}).then(function(v){if(v.statusCode)v=JSON.parse(v.body);if(v.error)throw new Error(v.error);return v;});}

function init(cb){
  var e=localStorage.getItem('ss_em')||'',p=localStorage.getItem('ss_pw')||'';
  if(uid&&e){call('login',{e:e,p:p}).then(function(r){cr=r.cr;ti=r.ti;cb(null,r);})['catch'](function(){logout();cb(null,null);});}
  else cb(null,null);
}

function login(email,pw,cb){call('login',{e:email,p:pw}).then(function(r){uid=r.id;cr=r.cr;ti=r.ti;localStorage.setItem('ss_id',uid);localStorage.setItem('ss_em',email);localStorage.setItem('ss_pw',pw);cb(null,r);})['catch'](function(e){cb(e.message,null);});}
function register(email,pw,cb){call('reg',{e:email,p:pw}).then(function(r){uid=r.id;cr=r.cr;ti=r.ti;localStorage.setItem('ss_id',uid);localStorage.setItem('ss_em',email);localStorage.setItem('ss_pw',pw);cb(null,r);})['catch'](function(e){cb(e.message,null);});}
function logout(){localStorage.removeItem('ss_id');localStorage.removeItem('ss_em');localStorage.removeItem('ss_pw');uid='';cr=0;ti='free';}
function deduct(amt,cb){call('deduct',{id:uid,amt:amt||1}).then(function(r){if(!r.ul)cr=r.rm;cb(null,r);})['catch'](function(e){cb(e.message,null);});}
function lookupKey(oid,cb){call('lookup',{oid:oid}).then(function(r){cb(null,r.key);})['catch'](function(e){cb(e.message,null);});}
function activateLicense(key,cb){call('upgrade',{id:uid,tk:key}).then(function(r){ti='pro';cr=999;cb(null,r);})['catch'](function(e){cb(e.message,null);});}

var SS={init:init,login:login,register:register,logout:logout,deduct:deduct,lookupKey:lookupKey,activateLicense:activateLicense,get id(){return uid;},get cr(){return cr;},get ti(){return ti;},get loggedIn(){return!!uid;}};
