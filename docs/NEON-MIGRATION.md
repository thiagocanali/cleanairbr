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

## Endurecimento do handler HTTP — 15/11/2026
- Corrigida aceitação de tipos MIME que apenas começavam com `application/json`; agora somente JSON com parâmetros MIME opcionais é aceito.
- Cabeçalho `Origin` presente exige correspondência exata em `allowedOrigins` fornecida pelo adaptador confiável do servidor; sem lista configurada, origem presente é rejeitada.
- Adicionados quatro testes de regressão em `tests/visit-handler.test.js`.
- **Limite:** requisições sem `Origin` ainda dependem da validação de sessão, de CSRF tokens ou de uma política de `Sec-Fetch-Site` quando houver autenticação por cookies. O adaptador de produção ainda não existe.
- **Próximo P0:** criar adaptador Better Auth/Neon, política CSRF completa e validar a suíte no GitHub Actions antes de publicar endpoints.

## Continuidade e Fetch Metadata — 15/11/2026
- Política de trabalho: após cada etapa, seguir para a próxima tarefa executável sem aguardar aprovação para decisões técnicas comuns; nunca realizar produção, merge protegido ou operações destrutivas sem autorização.
- Handler HTTP agora rejeita `Sec-Fetch-Site: cross-site` e `same-site`, aceitando somente `same-origin` e `none` quando o cabeçalho estiver presente.
- Três testes de regressão adicionados para escrita cross-site, same-site e same-origin.
- **Limite:** navegadores/clientes que omitem Fetch Metadata ainda precisam de proteção CSRF compatível com a autenticação escolhida. Não publicar a rota antes de conectar e validar sessão e banco.
- **P0:** integrar autenticação real, banco server-side e CSRF; **P1:** executar testes completos e confirmar CI; **P2:** migrar CRUD e frontend sem Supabase; **P3:** homologação antes de produção.

## Lote de execução 15/11/2026 — segurança e validação
- Tarefa 1: exigir `Origin` autorizado ou `Sec-Fetch-Site: same-origin` nas escritas; requisições sem ambos são negadas.
- Tarefa 2: adicionar quatro testes HTTP para origem ausente, `none`, charset inválido e charset UTF-8.
- Tarefa 3: rejeitar velocidades acima de 200 m/s e temperaturas fora de -100 a 150 °C como proteção de entrada; limites operacionais devem ser revisados conforme instrumentos utilizados.
- Tarefa 4: adicionar dois testes dos limites físicos.
- Tarefa 5: atualizar documentação e verificar CI. **A execução dos testes do lote ainda não foi comprovada**; não declarar suíte verde. Consultas de Actions anteriores retornaram lista vazia.
- **P0:** implementar adaptador de sessão Better Auth e executor SQL server-side sem exposição de credenciais; conectar endpoints protegidos.
- **P1:** verificar GitHub Actions no HEAD, rodar `npm ci && npm test && npm run build` em ambiente com dependências instaláveis.
- **P2:** integrar CRUD de clientes, equipamentos, lembretes e histórico.
- **P3:** migrar `src/lib/gestaoApi.js` e testes para a API própria.
- **P4:** homologar autenticação, autorização, CSRF e dados em ambiente isolado antes de liberar produção.

## Lote de autenticação — 15/11/2026
- `database/neon/003_auth_tables.sql` versiona estrutura **aditiva, ainda não aplicada** para usuários, sessões, contas e verificações Better Auth; `app_users.auth_user_id` associa identidade autenticada ao papel administrativo.
- `api/_lib/admin-user-lookup.js` implementa consulta parametrizada de papel administrativo por `auth_user_id`; nunca utiliza papéis enviados pelo navegador.
- `tests/admin-user-lookup.test.js` adiciona cinco testes. **Executados em cópia local dos mesmos módulos:** `node --test` 5/5 aprovados e `node --check` aprovado. Não representa execução da suíte integral do checkout.
- A migração requer validação de compatibilidade com a versão exata do adaptador Better Auth, antes de ser aplicada. Não executar no banco ativo nem registrar endpoints sem revisão do adaptador e política de sessão.
- **Pendências prioritárias:** fixar dependências e lockfile, implementar adaptador Better Auth e pool Neon no servidor, aplicar migration em ambiente de desenvolvimento após revisão, integrar handler, executar `npm ci && npm test && npm run build` e CI.

## Verificação direta do Neon e PR de consolidação — 15/11/2026
- Projeto Neon identificado: `cleanair-gestao` (`misty-wind-88430051`), região `aws-sa-east-1`, PostgreSQL 17.
- Branch default `main` (`br-jolly-moon-b6xwwiih`) está `ready`; database `cleanair`; role de conexão `cleanair_owner`.
- Consulta somente leitura confirmou as seis tabelas operacionais (`app_users`, `customers`, `equipment`, `measurements`, `reminders`, `service_visits`) e a função `create_service_visit`. As quatro tabelas Better Auth ainda não existem no banco. A migration 003 continua pendente.
- Criado `api/_lib/better-auth-schema-config.js` com mapeamento explícito dos modelos/tabelas e colunas snake_case da migration 003; cinco testes de contrato adicionados. Baseado na documentação oficial Better Auth sobre `modelName` e `fields`: https://better-auth.com/docs/reference/options.
- PR #4 criada como draft para consolidar esta branch. GitHub reportou `mergeable: false`; não realizar merge. A comparação anterior indicava 107 commits à frente e 1 atrás de `main`, portanto é necessária reconciliação consciente da divergência.
- PR #3 existente usa a branch `v0/checkup-cleanair`; PR #2 já está merged. Não confundir a PR #3 com a nova PR #4.
- Limitações: Better Auth e PostgreSQL pool ainda não estão instalados/configurados no `package.json`; `src/lib/gestaoApi.js` continua chamando Supabase; nenhum teste de integração/CI deste HEAD foi confirmado.
- Região Neon `aws-sa-east-1` não suporta Neon Functions. Não depender de Neon Functions para endpoints Vercel.
