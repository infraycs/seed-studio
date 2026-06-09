'use strict';
const cloudbase = require('@cloudbase/node-sdk');
const app = cloudbase.init({env: cloudbase.SYMBOL_CURRENT_ENV});
const db = app.database();

exports.main = async function(e){
  // Handle OPTIONS (CORS preflight)
  if(e.httpMethod==='OPTIONS') return {statusCode:204,headers:{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type,Authorization'}};
  var body=typeof e.body==='string'?JSON.parse(e.body):(e.body||e);
  var a=body.action||e.action, d=body.data||e.data||{};
  if(a==='ping') return {ok:1};
  if(a==='debug') return {keys:Object.keys(e),httpMethod:e.httpMethod,path:e.path,body_type:typeof e.body,body_preview:JSON.stringify(e.body).substring(0,200)};
  if(a==='reg'){
    var ex=await db.collection('users').where({email:d.e}).count();
    if(ex.total) return {error:'exists'};
    var r=await db.collection('users').add({email:d.e,pw:d.p,cr:3,ti:'free'});
    return {ok:1,id:r.id,cr:3,ti:'free'};
  }
  if(a==='login'){
    var r=await db.collection('users').where({email:d.e,pw:d.p}).get();
    if(!r.data.length) return {error:'invalid'};
    var u=r.data[0]; return {ok:1,id:u._id,cr:u.cr,ti:u.ti};
  }
  if(a==='deduct'){
    var r=await db.collection('users').doc(d.id).get();
    var u=r.data[0]; if(u.ti==='pro') return {ok:1,ul:1};
    if(u.cr<d.amt) return {error:'insufficient'};
    await db.collection('users').doc(d.id).update({cr:u.cr-d.amt});
    return {ok:1,rm:u.cr-d.amt};
  }
  if(a==='upgrade'){await db.collection('users').doc(d.id).update({ti:'pro',cr:999});return{ok:1};}
  if(a==='lookup'){
    var r=await db.collection('keys').where({oid:d.oid}).get();
    if(r.data.length) return{ok:1,key:r.data[0].key};
    // Auto-check 爱发电 if not cached
    try{
      const ts=Math.floor(Date.now()/1000);
      const uid2='5741d9da011b11efb33152540025c377';
      const tk='WJaK3djBgPCtX8xsYmVeG5kQAn7TDfMN';
      const p=JSON.stringify({page:1,per_page:30});
      const sign=require('crypto').createHash('md5').update(tk+'params'+p+'ts'+ts+'user_id'+uid2).digest('hex');
      const https=require('https');
      const data=await new Promise(function(rs,rj){
        var req=https.request({hostname:'afdian.net',port:443,path:'/api/open/query-order',method:'POST',headers:{'Content-Type':'application/json'}},function(res){var b='';res.on('data',function(c){b+=c});res.on('end',function(){rs(JSON.parse(b))});});
        req.on('error',rj);req.write(JSON.stringify({user_id:uid2,params:p,ts:ts,sign:sign}));req.end();
      });
      if(data.ec===200&&data.data&&data.data.list){
        for(var i=0;i<data.data.list.length;i++){
          var o=data.data.list[i];
          if(o.out_trade_no===d.oid&&o.status===2){
            var key='PRO-'+require('crypto').randomBytes(6).toString('hex').toUpperCase();
            await db.collection('keys').add({oid:d.oid,key:key});
            return{ok:1,key:key};
          }
        }
      }
      return{error:'not paid or not found'};
    }catch(err){return{error:'verify failed: '+err.message};}
  }
  return {error:'bad action'};
};
