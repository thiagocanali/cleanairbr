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

## Sequência imediata
1. CA-004: resolver infraestrutura do banco sem afetar outros projetos.
2. CA-005 e CA-006: aplicar migração e validar build/permissões.
3. CA-007 a CA-010: fechar um fluxo real e seguro de cadastro.

## Regras de entrega
- Cada tarefa concluída exige evidência de teste, commit/PR e revisão do impacto.
- Não marcar como concluída uma tarefa só porque uma tela foi desenhada.
- Não cadastrar clientes reais antes de homologar autenticação e RLS.
- Não efetuar alterações destrutivas em outros projetos para liberar cota.
