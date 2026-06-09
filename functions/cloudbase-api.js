const cloud = require('@cloudbase/node-sdk');
const app = cloud.init({env: cloud.SYMBOL_CURRENT_ENV});
const db = app.database();
const crypto = require('crypto');
function h(s){return crypto.createHash('sha256').update(s+'_s').digest('hex');}
exports.main = async (e)=>{
  const a=e.action,d=e.data||{};
  if(a==='reg'){
    const ex=await db.collection('users').where({email:d.e}).count();
    if(ex.total)return{error:'exists'};
    const r=await db.collection('users').add({email:d.e,pw:h(d.p),cr:3,ti:'free'});
    return{ok:1,id:r.id,cr:3,ti:'free'};
  }
  if(a==='login'){
    const r=await db.collection('users').where({email:d.e,pw:h(d.p)}).get();
    if(!r.data.length)return{error:'invalid'};
    const u=r.data[0];return{ok:1,id:u._id,cr:u.cr,ti:u.ti};
  }
  if(a==='deduct'){
    const r=await db.collection('users').doc(d.id).get();
    const u=r.data[0];if(u.ti==='pro')return{ok:1,ul:1};
    if(u.cr<d.amt)return{error:'insufficient'};
    await db.collection('users').doc(d.id).update({cr:u.cr-d.amt});
    return{ok:1,rm:u.cr-d.amt};
  }
  if(a==='upgrade'){await db.collection('users').doc(d.id).update({ti:'pro',cr:999});return{ok:1};}
  if(a==='key'){
    try{
      const ts=Math.floor(Date.now()/1000);
      const uid2='5741d9da011b11efb33152540025c377';
      const tk='WJaK3djBgPCtX8xsYmVeG5kQAn7TDfMN';
      const p=JSON.stringify({page:1,per_page:20});
      const sign=crypto.createHash('md5').update(tk+'params'+p+'ts'+ts+'user_id'+uid2).digest('hex');
      const https=require('https');
      const data=await new Promise((rs,rj)=>{
        const req=https.request({hostname:'afdian.net',port:443,path:'/api/open/query-order',method:'POST',headers:{'Content-Type':'application/json'}},res=>{let b='';res.on('data',c=>b+=c);res.on('end',()=>rs(JSON.parse(b)));});
        req.on('error',rj);req.write(JSON.stringify({user_id:uid2,params:p,ts,sign}));req.end();
      });
      if(data.ec===200&&data.data&&data.data.list){
        const oo=data.data.list.find(o=>o.out_trade_no===d.oid&&o.status===2);
        if(oo){const key='PRO-'+crypto.randomBytes(6).toString('hex').toUpperCase();await db.collection('keys').add({oid:d.oid,key});return{ok:1,key};}
      }
      return{error:'not found'};
    }catch(err){return{error:err.message};}
  }
  if(a==='lookup'){
    const r=await db.collection('keys').where({oid:d.oid}).get();
    return r.data.length?{ok:1,key:r.data[0].key}:{error:'not found'};
  }
  return{error:'bad action'};
};
