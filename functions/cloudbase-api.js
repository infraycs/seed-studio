const cloud = require('@cloudbase/node-sdk');
const app = cloud.init({env: cloud.SYMBOL_CURRENT_ENV});
const db = app.database();
const crypto = require('crypto');

function hash(s){return crypto.createHash('sha256').update(s+'_salt').digest('hex');}
function rc(){return 'S'+Math.random().toString(36).slice(2,8).toUpperCase();}

exports.main = async (e)=>{
  const a=e.action,d=e.data||{};
  try{
    if(a==='register'){
      if(!d.email||!d.pw)return{error:'missing fields'};
      const ex=await db.collection('users').where({email:d.email}).count();
      if(ex.total>0)return{error:'exists'};
      const u={email:d.email,pw:hash(d.pw),cr:3,ti:'free',rc:rc(),ct:new Date().toISOString()};
      const r=await db.collection('users').add(u);
      return{ok:true,id:r.id,cr:3,ti:'free',rc:u.rc};
    }
    if(a==='login'){
      const res=await db.collection('users').where({email:d.email,pw:hash(d.pw)}).get();
      if(!res.data.length)return{error:'invalid'};
      const u=res.data[0];
      return{ok:true,id:u._id,cr:u.cr,ti:u.ti,email:u.email,rc:u.rc};
    }
    if(a==='deduct'){
      const u=await db.collection('users').doc(d.uid).get();
      if(!u.data.length)return{error:'not found'};
      const ud=u.data[0];
      if(ud.ti==='pro')return{ok:true,rm:ud.cr,ul:true};
      if((ud.cr||0)<(d.amt||1))return{error:'insufficient'};
      const nb=(ud.cr||0)-(d.amt||1);
      await db.collection('users').doc(d.uid).update({cr:nb});
      return{ok:true,rm:nb};
    }
    if(a==='upgrade'){
      await db.collection('users').doc(d.uid).update({ti:'pro',cr:999});
      return{ok:true};
    }
    if(a==='key'){
      // Admin generates license key for an order
      const key='PRO-'+crypto.randomBytes(6).toString('hex').toUpperCase();
      await db.collection('keys').add({oid:d.oid,key,ct:new Date().toISOString()});
      return{ok:true,key};
    }
    if(a==='lookup'){
      const kk=await db.collection('keys').where({oid:d.oid}).get();
      if(kk.data.length)return{ok:true,key:kk.data[0].key};
      return{error:'not found'};
    }
    return{error:'invalid action'};
  }catch(err){return{error:err.message};}
};
