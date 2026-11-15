# Migração Clean Air Gestão para Neon — execução inicial

## Inventário confirmado
- Frontend Vue 3/Vite; a tela `src/views/Gestao.vue` usa `src/lib/gestaoApi.js`.
- `gestaoApi.js` depende de `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `/auth/v1/token`, `/auth/v1/logout`, `/rest/v1/*` e `/rest/v1/rpc/create_service_visit`.
- `database/001_initial_schema.sql` depende de `auth.users`, `auth.uid()`, roles `anon`/`authenticated` e políticas RLS do Supabase.
- `database/002_atomic_service_visit.sql` implementa a operação transacional e precisa ser portada para backend Neon.
- O projeto não apresenta dependência `@supabase/supabase-js` no `package.json`; o acoplamento é por REST direto.
- Não foi comprovada dependência de Storage, Realtime ou Edge Functions nos arquivos auditados.

## Banco Neon criado e verificado
- Projeto `cleanair-gestao`, ID `misty-wind-88430051`.
- Região `aws-sa-east-1`, PostgreSQL 17, database `cleanair`, branch `main`.
- `database/neon/001_initial_schema.sql` aplicada transacionalmente; catálogo consultado confirma seis tabelas.
- Não existem contas administrativas nem dados migrados. **Não usar em produção ainda.**

## Próxima fase de implementação
1. Criar backend server-side com conexão Neon por `DATABASE_URL` (SSL) e sessão segura via Better Auth; nenhuma credencial de banco no Vite.
2. Implementar endpoints autenticados para clientes, equipamentos, visitas e lembretes, com autorização administrativa e queries parametrizadas.
3. Portar criação de atendimento/medições/lembrete para transação única e testar rollback.
4. Substituir `gestaoApi.js` por chamadas ao backend e eliminar variáveis `VITE_SUPABASE_*` após validação.
5. Testar autenticação, CRUD, isolamento e fluxos de UI com banco isolado antes de liberar deploy.

## Segurança e deploys
- O frontend não pode acessar o Neon diretamente.
- O esquema atual é acessado apenas por conexão de servidor; não há API pública de banco.
- Não desativar proteção de previews, não alterar produção, não apagar o projeto Supabase antigo antes da homologação.
- Os previews automáticos da Vercel foram desabilitados temporariamente para economizar cota; CI GitHub Actions deve validar código sem deploy.

## Migration transacional de atendimentos — 15/11/2026
- `database/neon/002_atomic_service_visit.sql` aplicada ao banco Neon `cleanair`.
- A função `public.create_service_visit` é `SECURITY INVOKER` e não concede execução ao papel público.
- Consulta real ao catálogo confirmou `public_execute=false`.
- Teste negativo real com equipamento inexistente retornou SQLSTATE `22023`; consultas posteriores confirmaram 0 atendimentos, 0 medições e 0 lembretes.
- **Pendente:** testes positivos com dados descartáveis, rollback com fase duplicada, API autenticada, isolamento por usuário e integração Vue.
- A função é uma primitiva interna do banco. A autorização administrativa **deve ser verificada pelo backend** antes de qualquer invocação; não expor esta função diretamente ao navegador.

## Validação server-side de atendimentos — 15/11/2026
- Adicionado `api/_lib/visit-validation.js`, módulo puro sem acesso a credenciais nem dependências do Supabase.
- Rejeita UUID inválido, serviço desconhecido, datas impossíveis, fases duplicadas, mais de duas medições, valores não finitos e velocidade negativa.
- Adicionados oito testes em `tests/visit-validation.test.js`.
- **Evidência local:** `node --test tests/visit-validation.test.js`: 8 aprovados, 0 falhas; `node --check api/_lib/visit-validation.js`: aprovado no ambiente de trabalho.
- **Não concluído:** API HTTP autenticada, Better Auth, integração de CRUD e frontend, testes de CI e build completo. O módulo ainda não é utilizado em endpoint de produção.
- **Segurança:** não criar endpoints que executem SQL até existir verificação de sessão e papel administrativo no backend.

## Barreira administrativa da API — 15/11/2026
- `api/_lib/require-admin.js`: exige sessão verificada e consulta papel administrativo em fonte confiável; nega acesso sem sessão, sem conta, com papel insuficiente ou identidade divergente.
- `tests/require-admin.test.js`: sete testes de autorização.
- Validação local do mesmo código em arquivos temporários `.mjs`: `node --test` **7/7 aprovados**, `node --check` aprovado. Ainda não substitui o teste da suíte integral no checkout do repositório.
- **Pendente:** integrar Better Auth e Neon na API HTTP, testar sessão real, rate limiting, autorização com usuários distintos e CI do HEAD.

## Composição protegida da criação de atendimentos — 15/11/2026
- `api/_lib/create-authorized-visit.js` une a checagem administrativa server-side, a validação do payload e a invocação da função Neon com parâmetros `$1` a `$5`.
- O executor SQL é injetado pelo backend e não contém credenciais no código. Falhas de autenticação e dados inválidos impedem qualquer chamada SQL.
- `tests/create-authorized-visit.test.js`: seis testes de contrato (sem sessão, sem papel, payload inválido, SQL parametrizado, UUID de resposta, ausência de executor).
- **Estado: implementado e versionado, sem evidência de execução da nova suíte no checkout/CI.** Ainda não é uma rota HTTP ativa.
- Próxima integração: provedor de sessão real, adaptador PostgreSQL server-side e handler HTTP seguro, com testes de integração e rate limiting antes de exposição.

## Contrato HTTP para atendimento — 15/11/2026
- Adicionado `api/_lib/visit-handler.js`, handler desacoplado de framework, sem credenciais e sem rota pública registrada.
- Apenas `POST` com `Content-Type: application/json`; respostas `401`, `403`, `400`, `405`, `415`, `500` e `201`, com `Cache-Control: no-store`.
- Mensagens internas de SQL não são devolvidas ao cliente.
- `tests/visit-handler.test.js` adiciona seis cenários de contrato HTTP.
- **Não homologado:** os novos testes ainda não têm execução comprovada; o GitHub Actions do último HEAD consultado não retornou execuções.
- **P0 em andamento:** configurar sessões reais no servidor, adaptador de banco PostgreSQL, proteção contra CSRF quando usar cookies e rate limiting antes de registrar rota acessível externamente.
