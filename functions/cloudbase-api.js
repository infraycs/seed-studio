const cloud = require('@cloudbase/node-sdk');
const app = cloud.init({env: cloud.SYMBOL_CURRENT_ENV});
const db = app.database();
const crypto = require('crypto');

function h(s){return crypto.createHash('sha256').update(s+'_s').digest('hex');}

exports.main = async function(e){
  var a=e.action, d=e.data||{};
  try{
    if(a==='reg'){
      var ex=await db.collection('users').where({email:d.e}).count();
      if(ex.total)return{error:'exists'};
      var r=await db.collection('users').add({email:d.e,pw:h(d.p),cr:3,ti:'free'});
      return{ok:1,id:r.id,cr:3,ti:'free'};
    }
    if(a==='login'){
      var r=await db.collection('users').where({email:d.e,pw:h(d.p)}).get();
      if(!r.data.length)return{error:'invalid'};
      var u=r.data[0];
      return{ok:1,id:u._id,cr:u.cr,ti:u.ti};
    }
    if(a==='deduct'){
      var r=await db.collection('users').doc(d.id).get();
      var u=r.data[0];
      if(u.ti==='pro')return{ok:1,ul:1};
      if(u.cr<d.amt)return{error:'insufficient'};
      await db.collection('users').doc(d.id).update({cr:u.cr-d.amt});
      return{ok:1,rm:u.cr-d.amt};
    }
    if(a==='upgrade'){
      await db.collection('users').doc(d.id).update({ti:'pro',cr:999});
      return{ok:1};
    }
    if(a==='key'){
      var ts=Math.floor(Date.now()/1000);
      var uid2='5741d9da011b11efb33152540025c377';
      var tk='WJaK3djBgPCtX8xsYmVeG5kQAn7TDfMN';
      var p=JSON.stringify({page:1,per_page:20});
      var sign=crypto.createHash('md5').update(tk+'params'+p+'ts'+ts+'user_id'+uid2).digest('hex');
      var https=require('https');
      var data=await new Promise(function(rs,rj){
        var req=https.request({
          hostname:'afdian.net',port:443,path:'/api/open/query-order',method:'POST',
          headers:{'Content-Type':'application/json'}
        },function(res){var b='';res.on('data',function(c){b+=c});res.on('end',function(){rs(JSON.parse(b))});});
        req.on('error',rj);
        req.write(JSON.stringify({user_id:uid2,params:p,ts:ts,sign:sign}));
        req.end();
      });
      if(data.ec===200&&data.data&&data.data.list){
        for(var i=0;i<data.data.list.length;i++){
          var o=data.data.list[i];
          if(o.out_trade_no===d.oid&&o.status===2){
            var key='PRO-'+crypto.randomBytes(6).toString('hex').toUpperCase();
            await db.collection('keys').add({oid:d.oid,key:key});
            return{ok:1,key:key};
          }
        }
      }
      return{error:'not found: ec='+data.ec};
    }
    if(a==='lookup'){
      var r=await db.collection('keys').where({oid:d.oid}).get();
      return r.data.length?{ok:1,key:r.data[0].key}:{error:'not found'};
    }
    if(a==='ping')return{ok:1,time:new Date().toISOString()};
    return{error:'bad action'};
  }catch(err){return{error:err.message};}
};
