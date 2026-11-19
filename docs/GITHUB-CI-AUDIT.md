# Auditoria GitHub/CI — Desenvolvimento Autônomo com Proteção

## Constatações
- PR #4 aberta em draft para `feat/redesign-clean-air-2026`: reutilizar para esta frente.
- PR #3 existe em outra branch e requer revisão independente; não integrar automaticamente.
- `.github/workflows/quality.yml` executava `push` na branch de feature **e** `pull_request` para `main`, gerando execuções redundantes.
- `.github/workflows/deploy.yml` publicava GitHub Pages na `main` sem testes e com `npm ci || npm install`, mascarando falhas de lockfile.
- Consulta de `/rulesets` retornou `[]`, mas a consulta de proteção de `main` retornou HTTP 403 (`Resource not accessible by integration`). **Não é possível confirmar as proteções existentes**.
- Execução GitHub Actions #105 da PR #4, no HEAD `51bb5f4`, estava `completed/success` quando auditada.

## Alterações propostas e versionadas na branch
1. `AGENTS.md` estabelece lotes de 5–10 tarefas, uma PR por frente, barreiras de merge, validação reforçada e limites de deploy.
2. `quality.yml` executa em PRs para `main`, em pushes na `main` e manualmente; deixa de duplicar eventos de push na branch de feature.
3. `quality.yml` usa `npm ci`, `npm test`, `npm run build`, timeout, permissões mínimas e ações pinadas.
4. `deploy.yml` mantém o gatilho de push em `main`, mas exige testes/build antes da publicação e remove fallback para `npm install`.
5. `deploy.yml` limita `contents: write` ao job que publica Pages; não cria deploys Vercel.
6. Ambas as pipelines usam checkout sem credenciais persistentes e setup-node pinado.

## Consequências e validação pendente
- A alteração do deploy **só entra em vigor se a PR for integrada à main**; a publicação Pages permanece automática após um push na main. Esta PR deve continuar draft até a migração Neon e as validações necessárias.
- O job de deploy ainda depende da permissão de escrita do token para publicar `gh-pages`. Verificar configurações do Pages e do repositório antes de integrar.
- Se branch protection exigir um check antigo pelo nome, preservar o nome do workflow e verificar os contextos de status no GitHub antes de ativar novos checks obrigatórios.
- Verificar se as versões SHA pinadas são aceitas e se a CI completa passa no HEAD.
- Não ativar auto-merge sem confirmar regras, checks, reviews e autorização de integração.
- Nenhuma proteção de `main` foi alterada; nenhuma migration, segredo ou configuração de produção foi modificada.
