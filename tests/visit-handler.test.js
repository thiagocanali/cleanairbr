import test from 'node:test';
import assert from 'node:assert/strict';
import {makeVisitHandler} from '../api/_lib/visit-handler.js';
const uuid='123e4567-e89b-42d3-a456-426614174000';
const body={equipment_id:uuid,service_type:'higienizacao',measurements:[]};
function response(){return {code:0,headers:{},payload:null,setHeader(k,v){this.headers[k]=v;return this},status(c){this.code=c;return this},json(p){this.payload=p;return this}}}
const req=(method='POST',data=body)=>({method,headers:{'content-type':'application/json'},body:data});
const deps=(session={user:{id:'u1'}},query=async()=>({rows:[{id:uuid}]}))=>({getSession:async()=>session,findUser:async()=>({id:'u1',role:'admin'}),query});
test('recusa método diferente de POST',async()=>{const res=response();await makeVisitHandler(deps())(req('GET'),res);assert.equal(res.code,405);assert.equal(res.headers.Allow,'POST')});
test('recusa conteúdo não JSON',async()=>{const res=response();const request=req();request.headers['content-type']='text/plain';await makeVisitHandler(deps())(request,res);assert.equal(res.code,415)});
test('recusa sessão ausente',async()=>{const res=response();await makeVisitHandler(deps(null))(req(),res);assert.equal(res.code,401)});
test('recusa corpo inválido',async()=>{const res=response();await makeVisitHandler(deps())(req('POST',{...body,service_type:'bad'}),res);assert.equal(res.code,400)});
test('responde 201 com UUID confirmado',async()=>{const res=response();await makeVisitHandler(deps())(req(),res);assert.equal(res.code,201);assert.deepEqual(res.payload,{id:uuid});assert.equal(res.headers['Cache-Control'],'no-store')});
test('não revela detalhes de erros SQL',async()=>{const res=response();await makeVisitHandler(deps(undefined,async()=>{throw Error('postgres password secret')}))(req(),res);assert.equal(res.code,500);assert.doesNotMatch(JSON.stringify(res.payload),/secret|password/)});
