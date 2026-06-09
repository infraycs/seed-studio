/**
 * CloudBase API client. Replace URL after deploy.
 */
(function(global){
'use strict';
var API='https://seedstudio-d6gcgy3nwa8b4e1ca-1323980712.ap-shanghai.app.tcloudbase.com/api';
var uid='',cr=0,ti='free';

function call(action,data){return fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:action,data:data||{}})}).then(function(r){return r.json();});}

function init(cb){var id=localStorage.getItem('ss_id');if(id){uid=id;call('me',{id:uid}).then(function(r){if(r.ok){cr=r.cr;ti=r.ti;cb(null,r);}else{logout();cb(null,null);}}).catch(function(){cb(null,null);});}else cb(null,null);}

function register(email,pw,cb){call('reg',{e:email,p:pw}).then(function(r){if(r.error){cb(r.error,null);return;}uid=r.id;cr=r.cr;ti=r.ti;localStorage.setItem('ss_id',uid);cb(null,r);}).catch(function(e){cb(e.message,null);});}

function login(email,pw,cb){call('login',{e:email,p:pw}).then(function(r){if(r.error){cb(r.error,null);return;}uid=r.id;cr=r.cr;ti=r.ti;localStorage.setItem('ss_id',uid);cb(null,r);}).catch(function(e){cb(e.message,null);});}

function logout(){localStorage.removeItem('ss_id');uid='';cr=0;ti='free';}

function deduct(amt,cb){call('deduct',{id:uid,amt:amt||1}).then(function(r){if(r.error){cb(r.error,null);return;}if(!r.ul)cr=r.rm;cb(null,r);}).catch(function(e){cb(e.message,null);});}

function activatePro(key,cb){call('lookup',{oid:key}).then(function(r){if(r.ok){call('upgrade',{id:uid}).then(function(){ti='pro';cr=999;cb(null,{ok:1});});}else{cb('Invalid key',null);}}).catch(function(e){cb(e.message,null);});}

global.SS={init:init,register:register,login:login,logout:logout,deduct:deduct,activatePro:activatePro,get id(){return uid;},get cr(){return cr;},get ti(){return ti;},get loggedIn(){return!!uid;}};
})(window);
