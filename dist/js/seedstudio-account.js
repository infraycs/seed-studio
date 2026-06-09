var uid='',cr=0,ti='free';
var API='https://seedstudio-d6gcgy3nwa8b4e1ca-1323980712.tcloudbaseapp.com/api';

function call(a,d){return fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:a,data:d||{}})}).then(function(r){return r.json();}).then(function(v){if(v.error)throw new Error(v.error);return v;});}

function saveLocal(){localStorage.setItem('ss_id',uid);localStorage.setItem('ss_cr',cr);localStorage.setItem('ss_ti',ti);}

function init(cb){
  uid=localStorage.getItem('ss_id')||'';
  cr=parseInt(localStorage.getItem('ss_cr'))||0;
  ti=localStorage.getItem('ss_ti')||'free';
  var e=localStorage.getItem('ss_em')||'',p=localStorage.getItem('ss_pw')||'';
  if(uid&&e){call('login',{e:e,p:p}).then(function(r){cr=r.cr;ti=r.ti;saveLocal();cb(null,r);})['catch'](function(){/* API down - keep local state */cb(null,null);});}
  else cb(null,null);
}

function register(email,pw,cb){call('reg',{e:email,p:pw}).then(function(r){uid=r.id;cr=r.cr;ti=r.ti;localStorage.setItem('ss_em',email);localStorage.setItem('ss_pw',pw);saveLocal();cb(null,r);})['catch'](function(e){cb(e.message,null);});}
function login(email,pw,cb){call('login',{e:email,p:pw}).then(function(r){uid=r.id;cr=r.cr;ti=r.ti;localStorage.setItem('ss_em',email);localStorage.setItem('ss_pw',pw);saveLocal();cb(null,r);})['catch'](function(e){cb(e.message,null);});}
function logout(){localStorage.removeItem('ss_id');localStorage.removeItem('ss_em');localStorage.removeItem('ss_pw');localStorage.removeItem('ss_cr');localStorage.removeItem('ss_ti');uid='';cr=0;ti='free';}
function deduct(amt,cb){call('deduct',{id:uid,amt:amt||1}).then(function(r){if(!r.ul)cr=r.rm;saveLocal();cb(null,r);})['catch'](function(e){cb(e.message,null);});}
function lookupKey(oid,cb){call('lookup',{oid:oid}).then(function(r){cb(null,r.key);})['catch'](function(e){cb(e.message,null);});}
function activateLicense(key,cb){call('upgrade',{id:uid,tk:key}).then(function(r){ti='pro';cr=999;saveLocal();cb(null,r);})['catch'](function(e){cb(e.message,null);});}

var SS={init:init,register:register,login:login,logout:logout,deduct:deduct,lookupKey:lookupKey,activateLicense:activateLicense,get loggedIn(){return!!uid;},get cr(){return cr;},get ti(){return ti;},get u(){return{id:uid};}};
