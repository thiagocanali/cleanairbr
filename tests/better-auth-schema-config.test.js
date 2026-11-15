import test from 'node:test';
import assert from 'node:assert/strict';
import {betterAuthDatabaseSchema as schema} from '../api/_lib/better-auth-schema-config.js';
test('mapeia os quatro modelos para as tabelas da migration',()=>{assert.deepEqual(Object.values(schema).map(x=>x.modelName),['auth_user','auth_session','auth_account','auth_verification'])});
test('mapeia timestamps e campos de usuário para snake_case',()=>{assert.equal(schema.user.fields.emailVerified,'email_verified');assert.equal(schema.user.fields.createdAt,'created_at');assert.equal(schema.user.fields.updatedAt,'updated_at')});
test('mapeia campos da sessão para colunas existentes',()=>{assert.deepEqual(schema.session.fields,{userId:'user_id',expiresAt:'expires_at',createdAt:'created_at',updatedAt:'updated_at',ipAddress:'ip_address',userAgent:'user_agent'})});
test('mapeia tokens da conta para colunas existentes',()=>{assert.equal(schema.account.fields.accountId,'account_id');assert.equal(schema.account.fields.providerId,'provider_id');assert.equal(schema.account.fields.accessTokenExpiresAt,'access_token_expires_at')});
test('não permite mutação acidental da configuração exportada',()=>{assert.equal(Object.isFrozen(schema),true);assert.equal(Object.isFrozen(schema.session.fields),true)});
