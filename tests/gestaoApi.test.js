import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const source = await readFile(new URL('../src/lib/gestaoApi.js', import.meta.url), 'utf8');
const moduleSource = source.replaceAll('import.meta.env.VITE_SUPABASE_URL', "'https://clean-air.example'")
  .replaceAll('import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY', "'test-public-key'");
const api = await import('data:text/javascript,' + encodeURIComponent(moduleSource));

const originalFetch = globalThis.fetch;
test.after(() => { globalThis.fetch = originalFetch; });

test('não envia gravação de atendimento por múltiplos endpoints', async () => {
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({url, options});
    return {ok:true,status:200,text:async()=>JSON.stringify('11111111-1111-4111-8111-111111111111')};
  };
  const result = await api.addVisit({
    equipment_id:'22222222-2222-4222-8222-222222222222',
    service_type:'higienizacao',
    description:'Limpeza',
    next_contact_on:'2027-11-13',
  },[{phase:'antes',air_velocity_ms:2.1}]);
  assert.equal(result.id,'11111111-1111-4111-8111-111111111111');
  assert.equal(calls.length,1);
  assert.match(calls[0].url,/\/rest\/v1\/rpc\/create_service_visit$/);
  assert.equal(calls[0].options.method,'POST');
  assert.equal(JSON.parse(calls[0].options.body).p_measurements[0].phase,'antes');
});

test('erro HTTP da RPC não retorna sucesso fictício', async () => {
  globalThis.fetch = async () => ({
    ok:false,status:403,json:async()=>({message:'Acesso não autorizado'}),
  });
  await assert.rejects(api.addVisit({equipment_id:'id',service_type:'higienizacao'},[]),/Acesso não autorizado/);
});

test('operações de edição usam PATCH e retornam erro quando nenhum registro foi alterado', async () => {
  const calls=[];
  globalThis.fetch = async (url,options) => {
    calls.push({url,options});
    return {ok:true,status:200,text:async()=>JSON.stringify([])};
  };
  await assert.rejects(api.updateCustomer('abc',{full_name:'Teste'}),/não encontrado ou sem permissão/);
  assert.equal(calls[0].options.method,'PATCH');
  assert.match(calls[0].url,/\/rest\/v1\/customers\?id=eq.abc/);
});

test('conclusão de lembrete exige registro alterado', async () => {
  globalThis.fetch = async () => ({ok:true,status:200,text:async()=>JSON.stringify([])});
  await assert.rejects(api.completeReminder('abc'),/não encontrado ou sem permissão/);
});

test('login de conta não autorizada não mantém sessão', async () => {
  const calls=[];
  globalThis.fetch = async (url,options) => {
    calls.push({url,options});
    if (url.includes('/auth/v1/token')) return {
      ok:true,status:200,text:async()=>JSON.stringify({
        access_token:'token-temporario',refresh_token:'refresh-temporario',expires_in:3600,
      }),
    };
    if (url.includes('/rest/v1/admin_users')) return {
      ok:true,status:200,text:async()=>JSON.stringify([]),
    };
    throw new Error('Requisição inesperada');
  };
  await assert.rejects(api.signIn('teste@example.com','senha-teste'),/não está autorizada/);
  assert.equal(api.isSignedIn(),false);
  assert.equal(calls.length,2);
});

test('logout limpa sessão mesmo quando endpoint remoto falha', async () => {
  globalThis.fetch = async (url) => {
    if (url.includes('/auth/v1/token')) return {
      ok:true,status:200,text:async()=>JSON.stringify({
        access_token:'token-temporario',refresh_token:'refresh-temporario',expires_in:3600,
      }),
    };
    if (url.includes('/rest/v1/admin_users')) return {
      ok:true,status:200,text:async()=>JSON.stringify([{user_id:'admin'}]),
    };
    return {ok:false,status:503,json:async()=>({message:'Serviço indisponível'})};
  };
  await api.signIn('admin@example.com','senha-teste');
  assert.equal(api.isSignedIn(),true);
  await assert.rejects(api.signOut(),/Serviço indisponível/);
  assert.equal(api.isSignedIn(),false);
});

test('resposta HTTP 204 não tenta analisar JSON', async () => {
  globalThis.fetch = async () => ({ok:true,status:204});
  await assert.rejects(api.deleteCustomer('abc'),/não encontrado ou sem permissão/);
});

test('erro 401 em consulta invalida a sessão em memória', async () => {
  globalThis.fetch = async (url) => {
    if (url.includes('/auth/v1/token')) return {
      ok:true,status:200,text:async()=>JSON.stringify({
        access_token:'token-temporario',refresh_token:'refresh-temporario',expires_in:3600,
      }),
    };
    if (url.includes('/rest/v1/admin_users')) return {
      ok:true,status:200,text:async()=>JSON.stringify([{user_id:'admin'}]),
    };
    return {ok:false,status:401,json:async()=>({message:'JWT expired'})};
  };
  await api.signIn('admin@example.com','senha-teste');
  assert.equal(api.isSignedIn(),true);
  await assert.rejects(api.listCustomers(),/JWT expired/);
  assert.equal(api.isSignedIn(),false);
});

test('PATCH sem corpo retorna erro de negócio em vez de TypeError', async () => {
  globalThis.fetch = async () => ({ok:true,status:204});
  await assert.rejects(api.updateCustomer('abc',{full_name:'Teste'}),/Cliente não encontrado ou sem permissão/);
  await assert.rejects(api.updateEquipment('abc',{label:'Sala'}),/Equipamento não encontrado ou sem permissão/);
});

test('RPC sem data de retorno não é confundida com atendimento salvo', async () => {
  globalThis.fetch = async () => ({ok:true,status:204});
  await assert.rejects(api.addVisit({equipment_id:'abc',service_type:'higienizacao'},[]),/não confirmou/);
});

test('login rejeita resposta de autenticação sem tokens', async () => {
  globalThis.fetch = async () => ({
    ok:true,status:200,text:async()=>JSON.stringify({access_token:'',expires_in:3600}),
  });
  await assert.rejects(api.signIn('admin@example.com','senha-teste'),/sessão inválida/);
  assert.equal(api.isSignedIn(),false);
});

test('RPC rejeita identificador malformado mesmo com HTTP 200', async () => {
  globalThis.fetch = async () => ({
    ok:true,status:200,text:async()=>JSON.stringify('não-é-uuid'),
  });
  await assert.rejects(api.addVisit({equipment_id:'abc',service_type:'higienizacao'},[]),/não confirmou/);
});

test('login rejeita tempo de expiração zero', async () => {
  globalThis.fetch = async () => ({
    ok:true,status:200,text:async()=>JSON.stringify({
      access_token:'token',refresh_token:'refresh',expires_in:0,
    }),
  });
  await assert.rejects(api.signIn('admin@example.com','senha'),/sessão inválida/);
  assert.equal(api.isSignedIn(),false);
});

test('refresh inválido encerra sessão sem acessar dados protegidos', async () => {
  const originalNow=Date.now;
  let clock=1_800_000_000_000;
  Date.now=()=>clock;
  try {
    const calls=[];
    globalThis.fetch=async (url)=>{
      calls.push(url);
      if(url.includes('grant_type=password')) return {
        ok:true,status:200,text:async()=>JSON.stringify({
          access_token:'token-inicial',refresh_token:'refresh-inicial',expires_in:120,
        }),
      };
      if(url.includes('/admin_users')) return {
        ok:true,status:200,text:async()=>JSON.stringify([{user_id:'admin'}]),
      };
      if(url.includes('grant_type=refresh_token')) return {
        ok:true,status:200,text:async()=>JSON.stringify({access_token:'',expires_in:3600}),
      };
      throw new Error('Consulta protegida não deveria ser executada');
    };
    await api.signIn('admin@example.com','senha');
    clock+=90_000;
    await assert.rejects(api.listCustomers(),/Sessão expirada/);
    assert.equal(api.isSignedIn(),false);
    assert.equal(calls.filter(url=>url.includes('/customers')).length,0);
  } finally {
    Date.now=originalNow;
  }
});

test('renovação não envia bearer antigo e usa token renovado na consulta', async () => {
  const originalNow=Date.now;
  let clock=1_800_000_000_000;
  Date.now=()=>clock;
  try {
    const calls=[];
    globalThis.fetch=async (url,options)=>{
      calls.push({url,options});
      if(url.includes('grant_type=password')) return {
        ok:true,status:200,text:async()=>JSON.stringify({
          access_token:'token-inicial',refresh_token:'refresh-inicial',expires_in:120,
        }),
      };
      if(url.includes('/admin_users')) return {
        ok:true,status:200,text:async()=>JSON.stringify([{user_id:'admin'}]),
      };
      if(url.includes('grant_type=refresh_token')) return {
        ok:true,status:200,text:async()=>JSON.stringify({
          access_token:'token-renovado',refresh_token:'refresh-renovado',expires_in:3600,
        }),
      };
      if(url.includes('/customers')) return {
        ok:true,status:200,text:async()=>JSON.stringify([]),
      };
      throw new Error('Rota inesperada');
    };
    await api.signIn('admin@example.com','senha');
    clock+=90_000;
    await api.listCustomers();
    const refresh=calls.find(call=>call.url.includes('grant_type=refresh_token'));
    const customers=calls.find(call=>call.url.includes('/customers'));
    assert.equal(refresh.options.headers.Authorization,undefined);
    assert.equal(customers.options.headers.Authorization,'Bearer token-renovado');
  } finally {
    Date.now=originalNow;
    await api.signOut().catch(()=>{});
  }
});
