/**
 * SeedStudio Account v9 — Cloudflare Worker API (backend.seedstudio.top)
 * Reliable, server-side, KV-backed, no localStorage bugs
 */
(function(global){
'use strict';

var API = 'https://backend.seedstudio.top';
var token = localStorage.getItem('ss_token') || '';

var currentUser = null, creditBalance = 0, membershipTier = 'free', referralCode = '';

function api(method, path, body){
  var opts = { method: method, headers: { 'Content-Type': 'application/json' } };
  if (token) opts.headers['Authorization'] = 'Bearer ' + token;
  if (body) opts.body = JSON.stringify(body);
  return fetch(API + path, opts).then(function(r){ return r.json(); });
}

// ═══════════════ INIT ═══════════════
function init(callback){
  if (!token) { callback(null, null); return; }
  api('GET', '/me').then(function(u){
    if (u.error) { token = ''; localStorage.removeItem('ss_token'); callback(null, null); return; }
    currentUser = u; creditBalance = u.credits || 0; membershipTier = u.tier || 'free'; referralCode = u.referralCode || '';
    callback(null, u);
  }).catch(function(){ callback(null, null); });
}

// ═══════════════ AUTH ═══════════════
function register(email, password, inviteCode, callback){
  api('POST', '/register', { email: email, password: password, inviteCode: inviteCode || '' }).then(function(r){
    if (r.error) { callback(r.error, null); return; }
    token = r.token; localStorage.setItem('ss_token', token);
    currentUser = { email: email }; creditBalance = r.credits; membershipTier = r.tier; referralCode = r.referralCode;
    callback(null, currentUser);
  }).catch(function(e){ callback('网络错误: ' + e.message, null); });
}

function login(email, password, callback){
  api('POST', '/login', { email: email, password: password }).then(function(r){
    if (r.error) { callback(r.error, null); return; }
    token = r.token; localStorage.setItem('ss_token', token);
    currentUser = { email: email }; creditBalance = r.credits; membershipTier = r.tier; referralCode = r.referralCode;
    callback(null, currentUser);
  }).catch(function(e){ callback('网络错误: ' + e.message, null); });
}

function logout(callback){
  token = ''; localStorage.removeItem('ss_token');
  currentUser = null; creditBalance = 0; membershipTier = 'free'; referralCode = '';
  callback(null);
}

// ═══════════════ CREDITS ═══════════════
function refreshCredits(callback){
  api('GET', '/me').then(function(u){
    if (u.error) { callback(u.error, null); return; }
    creditBalance = u.credits || 0; membershipTier = u.tier || 'free';
    callback(null, { credits: creditBalance, tier: membershipTier });
  }).catch(function(e){ callback(e.message, null); });
}

function deductCredit(amount, reason, callback){
  api('POST', '/deduct', { amount: amount || 1, reason: reason || 'export' }).then(function(r){
    if (r.error) { callback(r.error, null); return; }
    creditBalance = r.remaining;
    callback(null, { deducted: r.deducted, remaining: r.remaining, unlimited: r.unlimited });
  }).catch(function(e){ callback('网络错误: ' + e.message, null); });
}

// ═══════════════ REFERRAL ═══════════════
function getReferralLink(){
  return referralCode ? 'https://www.seedstudio.top/?ref=' + referralCode : '';
}

// ═══════════════ LICENSE KEY / PAYMENT ═══════════════
async function verifyPayment(orderId, callback){
  api('POST', '/verify-payment', { orderId: orderId }).then(function(r){
    if (r.error) { callback(r.error, null); return; }
    callback(null, r.key);
  }).catch(function(e){ callback(e.message, null); });
}

function upgradeUser(email, tier, callback){
  api('POST', '/upgrade', { email: email, tier: tier || 'pro' }).then(function(r){
    if (r.error) { callback(r.error, null); return; }
    if (currentUser && currentUser.email === email) {
      membershipTier = r.tier || 'pro'; creditBalance = 999;
      if (typeof S !== 'undefined') S.tier = 'pro';
    }
    callback(null, r);
  }).catch(function(e){ callback(e.message, null); });
}

// ═══════════════ EXPORT ═══════════════
global.SeedStudioAccount = {
  init: init, register: register, login: login, logout: logout,
  refreshCredits: refreshCredits, deductCredit: deductCredit,
  getReferralLink: getReferralLink, verifyPayment: verifyPayment, upgradeUser: upgradeUser,
  get currentUser(){ return currentUser; },
  get creditBalance(){ return creditBalance; },
  get membershipTier(){ return membershipTier; },
  get referralCode(){ return referralCode; },
  get isLoggedIn(){ return !!currentUser && !!token; },
};
})(window);
