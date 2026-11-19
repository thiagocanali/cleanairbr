import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const config=JSON.parse(readFileSync(new URL('../vercel.json',import.meta.url),'utf8'));
const rewrites=config.rewrites;
test('Vercel possui fallback para rotas SPA',()=>{
 assert.ok(Array.isArray(rewrites));
 assert.ok(rewrites.some(r=>r.destination==='/index.html'));
});
test('fallback SPA não captura endpoints API nem assets',()=>{
 const fallback=rewrites.find(r=>r.destination==='/index.html');
 assert.ok(fallback);
 const matcher=new RegExp('^'+fallback.source+'$');
 for(const route of ['/api/gestao/visits','/api/auth/session','/assets/index.js','/favicon.ico']){
  assert.equal(matcher.test(route),false,route+' não pode ser redirecionado para HTML');
 }
 for(const route of ['/','/services','/gestao','/gestao/clientes']){
  assert.equal(matcher.test(route),true,route+' deve funcionar no SPA');
 }
});
