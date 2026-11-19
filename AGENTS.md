# AGENTS.md — Clean Air

## Objetivo
Desenvolver o site público e a gestão privada da Clean Air com **desenvolvimento autônomo com proteção**. Estas instruções se aplicam a agentes e colaboradores que atuem neste repositório.

## Execução em lotes
1. Antes de editar, inspecione `main`, PRs abertas, CI, dependências, documentação e alterações em andamento.
2. Organize de **5 a 10 tarefas relacionadas** por ciclo. Execute as tarefas independentes possíveis sem aguardar confirmação para cada correção comum.
3. Reutilize a PR aberta da mesma frente; mantenha **no máximo uma PR ativa por frente**, salvo justificativa técnica documentada. Nunca abra uma PR por tarefa.
4. Use commits pequenos e descritivos na mesma branch da frente, faça push e acompanhe a CI. Corrija as falhas antes de considerar o lote concluído.
5. Documente resultados efetivamente executados, testes e bloqueios; não afirme que uma verificação passou sem evidência.
6. Quando houver bloqueio, avance em tarefas independentes que não dependam dele.

## Barreiras obrigatórias
- **Não** contorne proteção da `main`, revisões, checks obrigatórios ou políticas de segurança.
- **Não** faça merge de PR draft, incompleta, com CI falha/pendente, vulnerabilidades conhecidas ou conflitos não resolvidos.
- Squash merge e auto-merge somente se a política do repositório permitir e houver autorização explícita para integrar a PR específica. Nunca faça autoaprovação para satisfazer revisão obrigatória.
- Autenticação, sessões, permissões, alterações de banco e produção requerem validação adicional: revisão de migrações, isolamento de dados, rollback, testes de autorização e confirmação de ambiente. Não exponha credenciais.
- Migrações destrutivas, produção, custos e exclusão de dados precisam de aprovação explícita; não trate autorização geral de desenvolvimento como autorização para essas operações.
- Não modifique outros repositórios nem recursos de produção para resolver uma tarefa local.

## CI, PR e deploy
- Preferir validação em `pull_request` para `main` e `push` para `main`; evitar CI duplicada para o mesmo commit em branch e PR.
- `npm ci` deve falhar se o lockfile estiver inconsistente. Nunca usar `npm ci || npm install` no CI.
- Exigir `npm test` e `npm run build` antes de qualquer publicação. Não remover testes para tornar a CI verde.
- GitHub Actions: permissões mínimas, ações com versões revisadas, checkout sem persistir credenciais quando possível, concurrency para cancelar execuções obsoletas.
- Preservar cota gratuita Vercel: evitar previews/deploys intermediários; usar GitHub Actions para testes. Nenhum workflow novo deve disparar deploy Vercel automaticamente.
- O workflow GitHub Pages existente publica em `main`. Qualquer alteração na política de publicação deve ser revisada antes de integrar; não desabilitar produção silenciosamente.
- Não alterar branch protection sem consultar regras e avaliar efeitos sobre PRs, checks e permissões. Se a API negar leitura, registrar o bloqueio e não presumir ausência de proteção.

## Escopo técnico atual
- Gestão privada: migração planejada de Supabase para Neon PostgreSQL + backend autenticado. Não considerar a migração concluída até remover dependências antigas, validar CRUD, sessão e isolamento de dados.
- Nunca disponibilizar credenciais de banco ao frontend ou em variáveis `VITE_*`.
- Não aplicar migrations de autenticação ou alterar dados reais sem testes de integração e revisão específica.
- Não publicar a gestão como pronta enquanto login e persistência segura não estiverem validados.

## Critérios de conclusão de lote
- Código e testes correspondentes versionados.
- CI do HEAD concluída com sucesso, ou bloqueio explicitamente registrado.
- PR consolidada e descrição atualizada, sem merge prematuro.
- Sem deploy de produção não autorizado.
