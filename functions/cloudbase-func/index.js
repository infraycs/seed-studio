'use strict';
const cloudbase = require('@cloudbase/node-sdk');
const app = cloudbase.init({env: cloudbase.SYMBOL_CURRENT_ENV});
const db = app.database();

exports.main = async function(e){
  var body=typeof e.body==='string'?JSON.parse(e.body):(e.body||e);
  var a=body.action||e.action, d=body.data||e.data||{};
  if(a==='ping') return {ok:1};
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
    return r.data.length?{ok:1,key:r.data[0].key}:{error:'not found'};
  }
  return {error:'bad action'};
};
