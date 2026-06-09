var cloudbase,app,db;try{cloudbase=require('@cloudbase/node-sdk');app=cloudbase.init({env:cloudbase.SYMBOL_CURRENT_ENV});db=app.database();}catch(e){}

function ok(d){return{statusCode:200,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'},body:JSON.stringify(d)};}
function err(m,s){return{statusCode:s||400,headers:{'Access-Control-Allow-Origin':'*'},body:JSON.stringify({error:m})};}

exports.main=async function(e){
  if(e.httpMethod==='OPTIONS')return{statusCode:204,headers:{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type'}};
  var b=typeof e.body==='string'?JSON.parse(e.body):e.body||e,a=b.action,d=b.data||{};
  if(!db)return err('db not initialized',500);
  try{
    if(a==='ping')return ok({ok:1});
    if(a==='reg'){var ex=await db.collection('users').where({email:d.e}).count();if(ex.total)return err('exists');var r=await db.collection('users').add({email:d.e,pw:d.p,cr:3,ti:'free'});return ok({id:r.id,cr:3,ti:'free'});}
    if(a==='login'){var r=await db.collection('users').where({email:d.e,pw:d.p}).get();if(!r.data.length)return err('invalid');var u=r.data[0];return ok({id:u._id,cr:u.cr,ti:u.ti});}
    if(a==='deduct'){var r=await db.collection('users').doc(d.id).get();var u=r.data[0];if(u.ti==='pro')return ok({ul:true,rm:u.cr});if(u.cr<d.amt)return err('insufficient');await db.collection('users').doc(d.id).update({cr:u.cr-d.amt});return ok({rm:u.cr-d.amt});}
    if(a==='upgrade'){await db.collection('users').doc(d.id).update({ti:'pro',cr:999});return ok({ti:'pro'});}
    if(a==='lookup'){
      var r=await db.collection('keys').where({oid:d.oid}).get();if(r.data.length)return ok({key:r.data[0].key});
      try{
        var ts=Math.floor(Date.now()/1000),uid2='5741d9da011b11efb33152540025c377',tk='WJaK3djBgPCtX8xsYmVeG5kQAn7TDfMN',p=JSON.stringify({page:1,per_page:30});
        var sign=require('crypto').createHash('md5').update(tk+'params'+p+'ts'+ts+'user_id'+uid2).digest('hex');
        var https=require('https'),data=await new Promise(function(rs,rj){var rq=https.request({hostname:'afdian.net',port:443,path:'/api/open/query-order',method:'POST',headers:{'Content-Type':'application/json'}},function(res){var b='';res.on('data',function(c){b+=c});res.on('end',function(){rs(JSON.parse(b))});});rq.on('error',rj);rq.write(JSON.stringify({user_id:uid2,params:p,ts:ts,sign:sign}));rq.end();});
        if(data.ec===200&&data.data&&data.data.list){for(var i=0;i<data.data.list.length;i++){var o=data.data.list[i];if(o.out_trade_no===d.oid&&o.status===2){var key='PRO-'+require('crypto').randomBytes(6).toString('hex').toUpperCase();await db.collection('keys').add({oid:d.oid,key:key});return ok({key:key});}}}
        return err('not found');
      }catch(ex){return err('verify failed: '+ex.message);}
    }
    return err('bad action');
  }catch(ex){return err(ex.message,500);}
};
