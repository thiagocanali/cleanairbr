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
