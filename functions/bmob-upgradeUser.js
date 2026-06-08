/**
 * Bmob Cloud Function: upgradeUser
 *
 * Usage: You call this when someone pays.
 * Go to: bmob.cn → Cloud Functions → upgradeUser → Test
 * Enter: {"email": "user@example.com", "tier": "pro"}
 *
 * Or: use the admin page at seedstudio.top/admin.html
 */

function onRequest(request, response, modules) {
  var email = request.body.email;
  var tier = request.body.tier || 'pro';
  var credits = request.body.credits || 999;

  if (!email) {
    response.json({ error: 'Missing email' });
    return;
  }

  var User = Bmob.Object.extend('_User');
  var query = new Bmob.Query(User);
  query.equalTo('email', '==', email);

  query.find().then(function(users) {
    if (users.length === 0) {
      response.json({ error: 'User not found: ' + email });
      return;
    }

    var user = users[0];
    user.set('tier', tier);
    if (credits) user.set('credits', credits);

    user.save().then(function() {
      response.json({
        success: true,
        email: email,
        tier: tier,
        credits: user.get('credits'),
        message: 'Upgraded ' + email + ' to ' + tier
      });
    }).catch(function(err) {
      response.json({ error: 'Save failed: ' + err.message });
    });

  }).catch(function(err) {
    response.json({ error: 'Query failed: ' + err.message });
  });
}
