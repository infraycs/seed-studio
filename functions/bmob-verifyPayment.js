/**
 * Bmob Cloud Function: verifyPayment
 * AUTO verification via 爱发电 API
 * User enters order ID → this function checks 爱发电 → auto-upgrades Pro
 *
 * Deploy: bmob.cn → Cloud Functions → New → verifyPayment
 */

function onRequest(request, response, modules) {
  var userId = request.body.userId;
  var orderId = request.body.orderId;

  if (!userId || !orderId) {
    response.json({ verified: false, error: 'Missing userId or orderId' });
    return;
  }

  // ═══════════════ CONFIG ═══════════════
  var AFDIAN_USER_ID = '5741d9da011b11efb33152540025c377';
  var AFDIAN_TOKEN = 'WJaK3djBgPCtX8xsYmVeG5kQAn7TDfMN';

  // Call 爱发电 API to query orders
  var timestamp = Math.floor(Date.now() / 1000);
  var signStr = AFDIAN_TOKEN + 'params' + JSON.stringify({ page: 1 }) + 'ts' + timestamp + 'user_id' + AFDIAN_USER_ID;
  var sign = require('crypto').createHash('md5').update(signStr).digest('hex');

  var postData = JSON.stringify({
    user_id: AFDIAN_USER_ID,
    params: JSON.stringify({ page: 1, per_page: 50 }),
    ts: timestamp,
    sign: sign
  });

  // Use Bmob's built-in HTTP module
  Bmob.HttpRequest({
    url: 'https://afdian.net/api/open/query-order',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: postData
  }).then(function(res) {
    var data;
    try { data = JSON.parse(res.text || res.body); } catch(e) { data = {}; }

    if (data.ec !== 200 || !data.data || !data.data.list) {
      response.json({ verified: false, error: 'API error: ' + (data.em || 'unknown') });
      return;
    }

    // Search for the order
    var orders = data.data.list;
    var found = null;
    for (var i = 0; i < orders.length; i++) {
      if (orders[i].out_trade_no === orderId || orders[i].remark === orderId) {
        found = orders[i];
        break;
      }
    }

    if (!found) {
      response.json({ verified: false, error: '订单未找到，请确认订单号正确' });
      return;
    }

    if (found.status !== 2) { // 2 = paid
      response.json({ verified: false, error: '订单尚未支付或处理中' });
      return;
    }

    // Payment confirmed! Upgrade user in Bmob
    var User = Bmob.Object.extend('_User');
    var query = new Bmob.Query(User);
    query.get(userId).then(function(user) {
      var amount = parseFloat(found.total_amount || 0);

      // Determine tier based on amount
      var tier = 'pro';
      var credits = 999;
      if (amount >= 199) tier = 'lifetime';
      else if (amount >= 99) tier = 'pro'; // yearly
      else if (amount >= 19) tier = 'pro'; // monthly

      user.set('tier', tier);
      user.set('credits', credits);
      user.set('orderId', orderId);
      user.set('upgradedAt', new Date().toISOString());

      user.save().then(function() {
        response.json({
          verified: true,
          tier: tier,
          credits: credits,
          amount: amount,
          message: '🎉 支付验证成功！已自动升级为 ' + tier + ' 会员'
        });
      }).catch(function(err) {
        response.json({ verified: false, error: '升级失败: ' + err.message });
      });

    }).catch(function(err) {
      response.json({ verified: false, error: '用户查询失败: ' + err.message });
    });

  }).catch(function(err) {
    response.json({ verified: false, error: '网络请求失败: ' + (err.message || err) });
  });
}
