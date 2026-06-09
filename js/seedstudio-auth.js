/**
 * SeedStudio GitHub OAuth (PKCE flow, no secret needed)
 * Login with GitHub → data stored in user's private Gist
 */
(function(global){
'use strict';

var CLIENT_ID='Ov23licEeJCpgh2s8XMp';
var REDIRECT='https://www.seedstudio.top/callback.html';
var GIST_ID_KEY='ss_gist_id';
var TOKEN_KEY='ss_gh_token';
var USER_KEY='ss_gh_user';

var token='';
var gistId='';
var currentUser=null;
var creditBalance=0;
var membershipTier='free';
var referralCode='';

// ═══════════════ HELPERS ═══════════════
function b64url(buf){
  return btoa(String.fromCharCode.apply(null,new Uint8Array(buf)))
    .replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
function randStr(len){
  var a=new Uint8Array(len);crypto.getRandomValues(a);
  return b64url(a);
}
async function sha256(plain){
  return crypto.subtle.digest('SHA-256',new TextEncoder().encode(plain));
}

// ═══════════════ LOGIN ═══════════════
async function login(){
  var verifier=randStr(64);
  sessionStorage.setItem('ss_verifier',verifier);
  var state=randStr(16);
  var challenge=b64url(await sha256(verifier));
  var url='https://github.com/login/oauth/authorize'+
    '?client_id='+CLIENT_ID+
    '&redirect_uri='+encodeURIComponent(REDIRECT)+
    '&scope=gist'+
    '&state='+state;
  localStorage.setItem('ss_state',state);
  window.location.href=url;
}

// ═══════════════ CALLBACK (called from callback.html) ═══════════════
async function handleCallback(code,state){
  var savedState=localStorage.getItem('ss_state');
  if(state!==savedState){return{error:'State mismatch'};}
  localStorage.removeItem('ss_state');

  var verifier=sessionStorage.getItem('ss_verifier');
  sessionStorage.removeItem('ss_verifier');
  if(!verifier)return{error:'No verifier'};

  // Exchange code for token
  var resp=await fetch('https://github.com/login/oauth/access_token',{
    method:'POST',
    headers:{'Content-Type':'application/json','Accept':'application/json'},
    body:JSON.stringify({
      client_id:CLIENT_ID,
      code:code,
      redirect_uri:REDIRECT,
      code_verifier:verifier,
    }),
  });
  var data=await resp.json();
  if(data.error)return{error:data.error_description||data.error};
  token=data.access_token;
  localStorage.setItem(TOKEN_KEY,token);

  // Get user info
  var userResp=await fetch('https://api.github.com/user',{
    headers:{'Authorization':'Bearer '+token,'Accept':'application/json'},
  });
  var ghUser=await userResp.json();
  localStorage.setItem(USER_KEY,JSON.stringify(ghUser));

  // Find or create data Gist
  gistId=localStorage.getItem(GIST_ID_KEY);
  if(!gistId){
    var gistResp=await fetch('https://api.github.com/gists',{
      method:'POST',
      headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify({
        description:'Seed Studio account data',
        public:false,
        files:{'seedstudio.json':{content:JSON.stringify({cr:3,ti:'free',rc:'S'+Date.now().toString(36).slice(-6).toUpperCase(),ct:new Date().toISOString()})}},
      }),
    });
    var gist=await gistResp.json();
    gistId=gist.id;
    localStorage.setItem(GIST_ID_KEY,gistId);
  }

  return loadUserData();
}

// ═══════════════ LOAD USER DATA ═══════════════
async function loadUserData(){
  token=localStorage.getItem(TOKEN_KEY)||'';
  gistId=localStorage.getItem(GIST_ID_KEY)||'';
  if(!token||!gistId)return null;

  try{
    var resp=await fetch('https://api.github.com/gists/'+gistId,{
      headers:{'Authorization':'Bearer '+token,'Accept':'application/json'},
    });
    var gist=await resp.json();
    if(!gist.files||!gist.files['seedstudio.json'])return null;
    var userData=JSON.parse(gist.files['seedstudio.json'].content);
    creditBalance=userData.cr||0;
    membershipTier=userData.ti||'free';
    referralCode=userData.rc||'';
    currentUser=userData;
    return userData;
  }catch(e){return null;}
}

// ═══════════════ SAVE USER DATA ═══════════════
async function saveUserData(data){
  if(!token||!gistId)return;
  await fetch('https://api.github.com/gists/'+gistId,{
    method:'PATCH',
    headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json','Accept':'application/json'},
    body:JSON.stringify({files:{'seedstudio.json':{content:JSON.stringify(data)}}}),
  });
}

// ═══════════════ INIT ═══════════════
async function init(cb){
  var u=await loadUserData();
  if(u){currentUser=u;cb(null,u);}
  else{cb(null,null);}
}

// ═══════════════ REGISTER / LOGIN ═══════════════
function register(email,password,inviteCode,cb){login();} // GitHub login IS registration
function loginGH(){login();}

function logout(cb){
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(GIST_ID_KEY);
  localStorage.removeItem(USER_KEY);
  token='';gistId='';currentUser=null;creditBalance=0;membershipTier='free';referralCode='';
  cb(null);
}

// ═══════════════ CREDITS ═══════════════
async function deductCredit(amount,reason,cb){
  if(!currentUser){cb('请先登录',null);return;}
  if(membershipTier==='pro'||membershipTier==='lifetime'){cb(null,{deducted:0,remaining:creditBalance,unlimited:true});return;}
  if(creditBalance<(amount||1)){cb('积分不足！',null);return;}
  currentUser.cr=(currentUser.cr||0)-(amount||1);
  creditBalance=currentUser.cr;
  await saveUserData(currentUser);
  cb(null,{deducted:amount||1,remaining:creditBalance});
}

function refreshCredits(cb){init(cb);}
function getReferralLink(){return referralCode?'https://www.seedstudio.top/?ref='+referralCode:'';}

global.SeedStudioAccount={
  init:init,register:register,login:loginGH,logout:logout,
  refreshCredits:refreshCredits,deductCredit:deductCredit,
  getReferralLink:getReferralLink,handleCallback:handleCallback,
  get currentUser(){return currentUser;},get creditBalance(){return creditBalance;},
  get membershipTier(){return membershipTier;},get referralCode(){return referralCode;},
  get isLoggedIn(){return!!currentUser&&!!token;},
};
})(window);
