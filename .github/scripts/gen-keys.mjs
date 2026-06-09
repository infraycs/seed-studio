import crypto from 'crypto';
import fs from 'fs';

const UID = '5741d9da011b11efb33152540025c377';
const TOKEN = 'WJaK3djBgPCtX8xsYmVeG5kQAn7TDfMN';

const ts = Math.floor(Date.now() / 1000);
const params = JSON.stringify({ page: 1, per_page: 10 });
const signStr = TOKEN + 'params' + params + 'ts' + ts + 'user_id' + UID;
const sign = crypto.createHash('md5').update(signStr).digest('hex');

try {
  const resp = await fetch('https://afdian.net/api/open/query-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: UID, params, ts, sign }),
  });
  const data = await resp.json();

  if (data.ec !== 200 || !data.data || !data.data.list) {
    console.log('API returned no data. ec=' + data.ec);
    process.exit(0);
  }

  const kf = 'js/valid-keys.json';
  let keys = {};
  try { keys = JSON.parse(fs.readFileSync(kf, 'utf8')); } catch (e) { keys = {}; }

  let changed = false;
  data.data.list.forEach(o => {
    if (o.status === 2 && !keys[o.out_trade_no]) {
      const key = 'PRO-' + crypto.randomBytes(4).toString('hex').toUpperCase();
      keys[o.out_trade_no] = { key, time: o.create_time };
      console.log('NEW KEY: ' + key + ' for order ' + o.out_trade_no);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(kf, JSON.stringify(keys, null, 2));
    console.log('Keys saved.');
  } else {
    console.log('No new paid orders.');
  }
} catch (e) {
  console.error('Error:', e.message);
  process.exit(1);
}
