## Confirmação de persistência — 13/11/2026
- Criação de cliente e equipamento só é considerada confirmada quando a API retorna um registro com ID.
- Erros de resposta vazia orientam conferir a lista antes de repetir a operação, evitando duplicidade.
- Adicionados testes simulados de criação confirmada e sem confirmação.
- **Não homologado:** testes automatizados e integração com banco dedicado ainda pendentes.

# Roadmap — Clean Air (12/11/2026)

> Fonte de acompanhamento: checklist versionado no GitHub. Os estados abaixo são de implementação no código, **não** de homologação em produção.

## Meta
Site institucional profissional e Clean Air Gestão privado, utilizável pelo proprietário em celular: clientes, equipamentos, higienização, testes antes/depois, histórico, relatório e retorno anual.

## Entregas e critérios de aceite

### Fase 0 — Fundação
- [x] CA-001 — Definir entidades e fluxo de atendimento (documentação).
- [x] CA-002 — Criar interface inicial de clientes/equipamentos/atendimentos/lembretes (sem homologação).
- [x] CA-003 — Preparar SQL com RLS (ainda não aplicado).
- [ ] CA-004 — Disponibilizar projeto PostgreSQL/Supabase exclusivo. **BLOQUEADO:** limite de 2 projetos gratuitos ativos; não pausar/excluir projetos existentes sem autorização específica.
- [ ] CA-005 — Aplicar migração em ambiente isolado e testar permissões para anônimo, autenticado não autorizado e administrador.
- [ ] CA-006 — Validar build, lint, testes e CI para a aplicação.

### Fase 1 — Acesso e cadastros
- [ ] CA-007 — Login do proprietário com conta pré-aprovada, MFA, recuperação de senha e logout.
- [ ] CA-008 — Criar/editar/pesquisar clientes por nome e telefone, consentimento e canal preferido.
- [ ] CA-009 — CRUD de equipamentos associados ao cliente.
- [ ] CA-010 — Garantir isolamento de dados com testes de autorização; sem dados de clientes no localStorage.

### Fase 2 — Serviço principal: higienização
- [ ] CA-011 — Ficha de atendimento com higienização em destaque, manutenção e outros serviços.
- [ ] CA-012 — Medições antes/depois: temperatura (°C), velocidade do ar (m/s), condições de teste e instrumento.
- [ ] CA-013 — Comparativo de variações com validações; **não** converter medições em promessa de economia elétrica.
- [ ] CA-014 — Fotos antes/depois em armazenamento privado com política de acesso e limites de upload.
- [ ] CA-015 — Histórico por aparelho, edição/correção e trilha de auditoria.

### Fase 3 — Relatório e relacionamento
- [ ] CA-016 — PDF técnico com identificação, serviço, fotos, medições e observações.
- [ ] CA-017 — Compartilhamento manual pelo WhatsApp com confirmação do usuário.
- [ ] CA-018 — Lembrete anual sugerido (editável), painel de pendências e registro de contato.
- [ ] CA-019 — Dashboard simples com busca e ações rápidas.

### Fase 4 — Site público
- [ ] CA-020 — Concluir redesign responsivo, incluindo Sobre, Contato e Serviços.
- [ ] CA-021 — Revisar SEO, dados comerciais, links, domínio, alegações e informações de contato.
- [ ] CA-022 — Revisão de acessibilidade, mobile e formulários; testes no domínio de produção.

### Fase 5 — Homologação e lançamento
- [ ] CA-023 — Revisar LGPD: aviso de privacidade, finalidade, retenção, acesso e exportação.
- [ ] CA-024 — Backups/restauração, recuperação de incidentes e segurança das sessões.
- [ ] CA-025 — Testes automatizados, validação em ambiente de homologação e teste com o proprietário.
- [ ] CA-026 — Deploy de produção com configuração de ambiente, monitoramento e documentação operacional.

## Auditoria de integração — 13/11/2026
- PR #2 (`feat/redesign-clean-air-2026`): redesign, SQL inicial, tela `/gestao` com CRUD inicial de clientes/equipamentos, atendimentos e lembretes. **Código não homologado em produção.**
- PR #3 (`v0/checkup-cleanair`): dashboard `/admin`, `/clients` e `/equipment` com fixtures estáticas e salvamento somente em memória. Melhorias de UX e botão flutuante devem ser portadas seletivamente, sem tornar fixtures operacionais.
- As branches divergem; merge automático pode sobrescrever componentes de layout e rotas. Não foi realizado merge em `main`.
- Supabase: dois projetos ativos na organização; nenhum banco exclusivo Clean Air disponível. Criar terceiro projeto gratuito retorna erro de cota. Não pausar projetos nem usar outro banco sem autorização.
- Auth: login via API e allowlist, token renovável em memória; sessão é perdida ao recarregar. MFA e testes RLS pendentes.
- Integridade: criação de atendimento e medições ocorre em requisições separadas; requer transação no servidor/RPC antes de produção para evitar gravação parcial.
- CI: workflow configurado, mas ainda sem evidência de execução bem-sucedida nesta auditoria.
- Não utilizar dados reais até concluir CA-004, CA-005, CA-007 e CA-010.

## Implementação incremental — 13/11/2026
- Adicionada `database/002_atomic_service_visit.sql` com função `public.create_service_visit` (SECURITY INVOKER) para inserir atendimento, até duas medições e lembrete na mesma transação.
- `src/lib/gestaoApi.js` agora chama a RPC; `src/views/Gestao.vue` não duplica o lembrete.
- A RPC depende da aplicação sequencial dos scripts 001 e 002 em um projeto exclusivo; sem banco disponível, não há teste de integração ou verificação de RLS.
- Critério de aceite pendente: transação deve reverter completamente quando uma medição for inválida, usuário não autorizado deve receber erro de permissão, e um atendimento válido deve gerar um único lembrete.

## Validação do cliente API — 13/11/2026
- Corrigidas sequências literais de quebra de linha que invalidavam o JavaScript em `src/lib/gestaoApi.js`.
- A camada REST agora suporta respostas JSON escalares da RPC e trata operações PATCH sem registro alterado como erro.
- Adicionados testes de contrato com `fetch` simulado em `tests/gestaoApi.test.js`; não são testes reais de banco/RLS.
- Corrigida semântica HTML de `main` aninhado na gestão.
- Execução de `npm test` e `npm run build` ainda não verificada nesta sessão. Sem deploy ou merge em `main`.

## Segurança e contratos de API — 13/11/2026
- Removido endpoint de criação avulsa de lembretes da camada cliente: lembretes de visitas são gerados pela RPC transacional.
- Testes simulados adicionais: conta não autorizada não permanece logada; logout limpa sessão mesmo com falha remota; resposta 204 em exclusão gera mensagem clara.
- Import descontinuado removido de `Gestao.vue` para evitar falha de build.
- **Validação pendente:** testes ainda não executados no CI; não confundir testes simulados com testes reais de autenticação/RLS no Supabase.
- Ambiente local desta sessão não possui acesso de rede ao GitHub para checkout e execução integral do build. Não foi realizado deploy.

## Robustez do frontend — 13/11/2026
- Corrigido logout: mesmo se a API de revogação falhar, o painel limpa dados da sessão na interface.
- Tratamento de erros de consulta de equipamentos e atendimentos ao trocar seletores.
- Datas de lembrete calculadas pelo calendário local, sem conversão UTC.
- Resposta 401 invalida sessão em memória no cliente.
- Tentativa de checkout para execução local falhou por DNS (`Could not resolve host: github.com`). **Nenhum build ou teste foi executado com sucesso nesta etapa.**
- Validação visual, CI, testes reais de RLS e banco exclusivo continuam pendentes.

## Integridade e sessão — 13/11/2026
- `database/002_atomic_service_visit.sql` rejeita duas medições com a mesma fase; transação deve reverter por completo quando houver falha.
- `Gestao.vue` impede submissões simultâneas, valida nome e identificação e limpa a UI quando a sessão é invalidada por 401.
- Adicionado teste de contrato para invalidação da sessão após HTTP 401.
- **Pendente:** execução de testes e build no CI; implantação SQL e testes reais em Supabase dedicado. Nenhum merge/deploy foi realizado.

## Tratamento de falhas parciais — 13/11/2026
- A gravação de atendimento agora informa sucesso mesmo se a atualização posterior do histórico falhar, evitando confusão entre falha de leitura e falha de escrita.
- Medições numéricas inválidas são rejeitadas antes da chamada RPC.
- `updateCustomer` e `updateEquipment` tratam resposta HTTP 204 sem gerar `TypeError`.
- A criação de atendimento exige UUID retornado pela RPC; se faltar confirmação, orienta consultar o histórico antes de repetir, reduzindo duplicações.
- Adicionados testes de contrato para respostas vazias; **execução não confirmada**.
- Próximas tarefas em ordem: (1) obter execução CI `npm test` + `npm run build`; (2) corrigir falhas de CI; (3) provisionar Supabase dedicado; (4) aplicar SQL 001/002 e testar rollback/RLS; (5) testar CRUD e UX mobile; (6) avaliar integração seletiva da PR #3; (7) homologar PR #2, sem merge/deploy automático.

## Validação de respostas de autenticação e RPC — 13/11/2026
- Login rejeita resposta sem `access_token`, `refresh_token` ou duração de sessão válida.
- Criação de atendimento exige UUID em formato válido antes de confirmar o resultado.
- Testes simulados adicionados para ambos os cenários.
- Consulta de workflows do commit `4f2dc30580c67c6a287d4161f40a3bd42cc4e9ef`: nenhuma execução retornada. Isso **não comprova** sucesso ou falha da suíte.
- **Próximos passos:** obter execução CI e logs; provisionar banco dedicado; testar RLS e RPC com transações; homologar interface mobile e CRUD; revisar PR #3; somente depois considerar merge.

## Sequência imediata
1. CA-004: resolver infraestrutura do banco sem afetar outros projetos.
2. CA-005 e CA-006: aplicar migração e validar build/permissões.
3. CA-007 a CA-010: fechar um fluxo real e seguro de cadastro.

## Regras de entrega
- Cada tarefa concluída exige evidência de teste, commit/PR e revisão do impacto.
- Não marcar como concluída uma tarefa só porque uma tela foi desenhada.
- Não cadastrar clientes reais antes de homologar autenticação e RLS.
- Não efetuar alterações destrutivas em outros projetos para liberar cota.
