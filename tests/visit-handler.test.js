import test from 'node:test';
import assert from 'node:assert/strict';
import {makeVisitHandler} from '../api/_lib/visit-handler.js';
const uuid='123e4567-e89b-42d3-a456-426614174000';
const body={equipment_id:uuid,service_type:'higienizacao',measurements:[]};
function response(){return {code:0,headers:{},payload:null,setHeader(k,v){this.headers[k]=v;return this},status(c){this.code=c;return this},json(p){this.payload=p;return this}}}
const req=(method='POST',data=body)=>({method,headers:{'content-type':'application/json','sec-fetch-site':'same-origin'},body:data});
const deps=(session={user:{id:'u1'}},query=async()=>({rows:[{id:uuid}]}))=>({getSession:async()=>session,findUser:async()=>({id:'u1',role:'admin'}),query});
test('recusa método diferente de POST',async()=>{const res=response();await makeVisitHandler(deps())(req('GET'),res);assert.equal(res.code,405);assert.equal(res.headers.Allow,'POST')});
test('recusa conteúdo não JSON',async()=>{const res=response();const request=req();request.headers['content-type']='text/plain';await makeVisitHandler(deps())(request,res);assert.equal(res.code,415)});
test('recusa sessão ausente',async()=>{const res=response();await makeVisitHandler(deps(null))(req(),res);assert.equal(res.code,401)});
test('recusa corpo inválido',async()=>{const res=response();await makeVisitHandler(deps())(req('POST',{...body,service_type:'bad'}),res);assert.equal(res.code,400)});
test('responde 201 com UUID confirmado',async()=>{const res=response();await makeVisitHandler(deps())(req(),res);assert.equal(res.code,201);assert.deepEqual(res.payload,{id:uuid});assert.equal(res.headers['Cache-Control'],'no-store')});
test('não revela detalhes de erros SQL',async()=>{const res=response();await makeVisitHandler(deps(undefined,async()=>{throw Error('postgres password secret')}))(req(),res);assert.equal(res.code,500);assert.doesNotMatch(JSON.stringify(res.payload),/secret|password/)});

test('recusa content-type que apenas começa como JSON',async()=>{const res=response();const request=req();request.headers['content-type']='application/json-malicious';await makeVisitHandler(deps())(request,res);assert.equal(res.code,415)});
test('bloqueia origem não confiável antes de consultar SQL',async()=>{let calls=0;const res=response();const request=req();request.headers.origin='https://attacker.example';await makeVisitHandler({...deps(undefined,async()=>{calls++}),allowedOrigins:['https://cleanair.example']})(request,res);assert.equal(res.code,403);assert.equal(calls,0)});
test('permite origem explicitamente confiável',async()=>{const res=response();const request=req();request.headers.origin='https://cleanair.example';await makeVisitHandler({...deps(),allowedOrigins:['https://cleanair.example']})(request,res);assert.equal(res.code,201)});
test('origem presente sem configuração é negada',async()=>{const res=response();const request=req();request.headers.origin='https://cleanair.example';await makeVisitHandler(deps())(request,res);assert.equal(res.code,403)});

test('nega escrita cross-site mesmo sem Origin',async()=>{let calls=0;const res=response();const request=req();request.headers['sec-fetch-site']='cross-site';await makeVisitHandler(deps(undefined,async()=>{calls++}))(request,res);assert.equal(res.code,403);assert.equal(calls,0)});
test('nega escrita same-site sem confiança explícita',async()=>{const res=response();const request=req();request.headers['sec-fetch-site']='same-site';await makeVisitHandler(deps())(request,res);assert.equal(res.code,403)});
test('permite fetch metadata same-origin',async()=>{const res=response();const request=req();request.headers['sec-fetch-site']='same-origin';await makeVisitHandler(deps())(request,res);assert.equal(res.code,201)});

test('nega POST sem Origin e sem Fetch Metadata',async()=>{const res=response();const request=req();delete request.headers['sec-fetch-site'];await makeVisitHandler(deps())(request,res);assert.equal(res.code,403)});
test('nega POST com Sec-Fetch-Site none e sem Origin',async()=>{const res=response();const request=req();request.headers['sec-fetch-site']='none';await makeVisitHandler(deps())(request,res);assert.equal(res.code,403)});
test('recusa charset arbitrário em Content-Type',async()=>{const res=response();const request=req();request.headers['content-type']='application/json; charset=evil';await makeVisitHandler(deps())(request,res);assert.equal(res.code,415)});
test('aceita JSON com charset UTF-8',async()=>{const res=response();const request=req();request.headers['content-type']='application/json; charset=utf-8';await makeVisitHandler(deps())(request,res);assert.equal(res.code,201)});
