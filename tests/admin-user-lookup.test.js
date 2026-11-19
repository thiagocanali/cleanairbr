import test from 'node:test';
import assert from 'node:assert/strict';
import {makeAdminUserLookup} from '../api/_lib/admin-user-lookup.js';
test('não consulta SQL com identificador vazio',async()=>{let calls=0;const lookup=makeAdminUserLookup(async()=>{calls++});assert.equal(await lookup(''),null);assert.equal(calls,0)});
test('consulta papel com parâmetro posicional',async()=>{let sql,params;const lookup=makeAdminUserLookup(async(s,p)=>{sql=s;params=p;return {rows:[{auth_user_id:'auth-1',role:'admin'}]}});assert.deepEqual(await lookup('auth-1'),{id:'auth-1',role:'admin'});assert.match(sql,/\$1::text/);assert.deepEqual(params,['auth-1'])});
test('não confia em identificador diferente retornado',async()=>{const lookup=makeAdminUserLookup(async()=>({rows:[{auth_user_id:'other',role:'admin'}]}));assert.equal(await lookup('auth-1'),null)});
test('não cria privilégio para usuário não encontrado',async()=>{const lookup=makeAdminUserLookup(async()=>({rows:[]}));assert.equal(await lookup('auth-1'),null)});
test('falha sem executor',()=>assert.throws(()=>makeAdminUserLookup(null),TypeError));
