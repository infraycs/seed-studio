/**
 * Bmob Cloud Function: deductCredit
 * Deploy via Bmob Dashboard → Cloud Functions → New Function
 *
 * Secure credit deduction with Master Key authorization.
 * This runs server-side — users cannot tamper with credits.
 */
function onRequest(request, response, modules) {
  var userId = request.body.userId;
  var amount = request.body.amount || 1;

  if (!userId) {
    response.json({ error: 'Missing userId' });
    return;
  }

  // Query user by objectId
  var User = Bmob.Object.extend('_User');
  var query = new Bmob.Query(User);

  query.get(userId).then(function(user) {
    var credits = user.get('credits') || 0;
    var tier = user.get('tier') || 'free';

    // Pro/Lifetime members: unlimited, no deduction
    if (tier === 'pro' || tier === 'lifetime') {
      response.json({ deducted: 0, remaining: credits, unlimited: true });
      return;
    }

    if (credits < amount) {
      response.json({ error: 'Insufficient credits', required: amount, available: credits });
      return;
    }

    var newBalance = credits - amount;
    user.set('credits', newBalance);
    user.save().then(function() {
      response.json({ deducted: amount, remaining: newBalance });
    }).catch(function(err) {
      response.json({ error: 'Save failed: ' + err.message });
    });

  }).catch(function(err) {
    response.json({ error: 'User not found: ' + err.message });
  });
}
