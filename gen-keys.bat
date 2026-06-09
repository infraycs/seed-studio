@echo off
cd /d "%~dp0"
echo Checking 爱发电 orders...
node -e "const c=require('crypto'),f=require('fs'),uid='5741d9da011b11efb33152540025c377',t='WJaK3djBgPCtX8xsYmVeG5kQAn7TDfMN',ts=Math.floor(Date.now()/1000),p=JSON.stringify({page:1,per_page:20}),s=c.createHash('md5').update(t+'params'+p+'ts'+ts+'user_id'+uid).digest('hex');fetch('https://afdian.net/api/open/query-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id:uid,params:p,ts,sign:s})}).then(r=>r.json()).then(d=>{if(d.ec!==200||!d.data)return;var kf='js/valid-keys.json',keys={};try{keys=JSON.parse(f.readFileSync(kf,'utf8'));}catch(e){}var ch=false;d.data.list.forEach(o=>{if(o.status===2&&!keys[o.out_trade_no]){keys[o.out_trade_no]={key:'PRO-'+c.randomBytes(6).toString('hex').toUpperCase(),time:o.create_time,amount:o.total_amount};console.log('NEW: '+keys[o.out_trade_no].key);ch=true;}});if(ch){f.writeFileSync(kf,JSON.stringify(keys,null,2));console.log('Keys saved!');}else console.log('No new orders.');});"
git add js/valid-keys.json && git diff --cached --quiet || (git commit -m "keys" && git push)
echo Done!
pause
