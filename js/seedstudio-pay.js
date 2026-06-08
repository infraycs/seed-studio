/**
 * SeedStudio Payment Module
 * Auto-verification via 爱发电 (afdian.net) API
 * User pays → enters order ID → system verifies → auto Pro
 */

(function(global){
'use strict';

var AFDIAN_USER_ID = 'YOUR_AFDIAN_USER_ID'; // 爱发电创作者 ID
var AFDIAN_TOKEN = 'YOUR_AFDIAN_API_TOKEN'; // 爱发电 API Token

// ═══════════════ UPGRADE FLOW ═══════════════
function openUpgrade(plan){
  var url='https://afdian.net/@'+AFDIAN_USER_ID;
  if(plan==='lifetime') url+='?plan=lifetime';
  else if(plan==='monthly') url+='?plan=monthly';
  window.open(url,'_blank');
  showVerifyPrompt(plan);
}

function showVerifyPrompt(plan){
  var orderId=prompt(
    '💰 请在爱发电完成付款后，\n'+
    '在此粘贴订单号自动激活 Pro：\n\n'+
    '（订单号在爱发电 → 我的订单 中查看）\n\n'+
    '或者输入 "skip" 稍后激活',''
  );
  if(!orderId||orderId==='skip') return;
  verifyAndUpgrade(orderId, plan);
}

// ═══════════════ AUTO VERIFICATION ═══════════════
function verifyAndUpgrade(orderId, plan){
  var acc=global.SeedStudioAccount;
  if(!acc||!acc.isLoggedIn){
    alert('请先登录账号再激活！');
    return;
  }

  var toastFn=global.toastFn||function(m){console.log(m);};

  toastFn('⏳ 正在验证订单...');

  // Call 爱发电 API via Bmob Cloud Function (hides API token)
  Bmob.Cloud.run('verifyPayment',{
    orderId:orderId,
    userId:acc.currentUser.id,
    plan:plan||'lifetime'
  }).then(function(r){
    if(r.verified){
      acc.membershipTier=r.plan||'pro';
      toastFn('🎉 支付验证成功！Pro 已激活');

      // Update UI
      if(typeof S!=='undefined') S.tier='pro';
      if(typeof updateAccountUI==='function') updateAccountUI();
      if(typeof syncAll==='function') syncAll();
      if(typeof draw==='function') draw();
    } else {
      toastFn('❌ '+ (r.error||'验证失败，请检查订单号'));
    }
  }).catch(function(err){
    toastFn('❌ 验证失败: '+(err.message||err));
  });
}

// ═══════════════ EXPORT ═══════════════
global.SeedStudioPay={ openUpgrade:openUpgrade, verifyAndUpgrade:verifyAndUpgrade };

})(window);
