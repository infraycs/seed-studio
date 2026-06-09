(function(global){
'use strict';
var KEY='ss_w';
var u=null;

function load(){try{u=JSON.parse(localStorage.getItem(KEY));return u;}catch(e){u=null;return null;}}
function save(){if(u)localStorage.setItem(KEY,JSON.stringify(u));}

function init(cb){load();cb(null,u);}

// Create = first-time. Login = restore.
function create(cb){
  u={id:'SS'+Math.random().toString(36).slice(2,8).toUpperCase(),cr:3,ti:'free',rc:'R'+Math.random().toString(36).slice(2,6).toUpperCase()};
  save();if(!load())return cb('存储失败',null);
  cb(null,u);
}

function loginFromCode(code,cb){
  if(code.length<=12){
    // Short code - must match localStorage on this device
    var local=load();
    if(local&&local.id===code){u=local;cb(null,u);}
    else cb('未找到账号。换设备请用完整备份码',null);
  } else {
    // Full backup code
    try{var d=JSON.parse(atob(code));u=d;save();cb(null,u);}
    catch(e){cb('备份码无效',null);}
  }
}

function getFullCode(){return u?btoa(JSON.stringify(u)):'';}
function getId(){return u?u.id:'';}

function logout(){localStorage.removeItem(KEY);u=null;}
function deduct(amt,cb){
  if(!u)return cb('请先登录',null);
  if(u.ti==='pro')return cb(null,{rm:u.cr,ul:true});
  if((u.cr||0)<(amt||1))return cb('积分不足',null);
  u.cr-=(amt||1);save();cb(null,{rm:u.cr});
}
function activatePro(){if(u){u.ti='pro';u.cr=999;save();}}

global.SS={
  init:init,create:create,login:loginFromCode,logout:logout,deduct:deduct,
  activatePro:activatePro,getFullCode:getFullCode,getId:getId,
  get u(){return u;},get cr(){return u?u.cr:0;},get ti(){return u?u.ti:'free';},
  get loggedIn(){return!!u;},
};
})(window);
