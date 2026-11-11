# Clean Air Gestão — primeira fase

## Objetivo
Um caderno digital privado, simples e adaptado ao celular, para o proprietário da Clean Air. O serviço principal é **higienização de ar-condicionado**. Manutenção e outros serviços são complementares.

## Separação dos ambientes
- Site institucional: público; nunca consulta dados de clientes.
- Gestão: autenticação obrigatória, sem cadastro público; autorização por lista de administradores mantida no banco.
- O caminho /gestao sozinho não oferece segurança. Nenhuma tela administrativa deve consultar dados antes da autenticação.
- **Não usar localStorage para dados de clientes** nem inserir credenciais secretas no frontend.

## Modelo inicial
- `admin_users`: usuários explicitamente autorizados (vinculados ao Auth).
- `customers`: nome, telefone, e-mail opcional, endereço opcional, canal preferido e consentimento de contato.
- `equipment`: cliente, localização interna, tipo, marca, modelo, capacidade e observações.
- `service_visits`: equipamento, data, tipo de serviço, descrição, observações, situação e próxima data de contato.
- `measurements`: visita, momento (antes/depois), velocidade do ar em m/s, temperatura em °C, observações sobre condições de teste.
- `reminders`: cliente/equipamento/visita, data, situação e canal de contato.
- Fotos e PDFs: somente em bucket privado, com autorização testada, numa etapa posterior.

## Medições e relatórios
- Registrar valores e unidades, instrumento e condições de medição, quando conhecidos.
- Comparar medições feitas em condições equivalentes; mostrar variação absoluta e percentual quando aplicável.
- Não inferir economia elétrica em kWh ou R$ apenas de velocidade do ar e temperatura.
- Estimativa energética só com metodologia e dados elétricos suficientes, explicitando hipóteses e incerteza.

## Fluxo de uso mínimo
1. Entrar com conta previamente autorizada.
2. Encontrar cliente por nome ou telefone; criar se não existir.
3. Selecionar equipamento; registrar higienização ou outro serviço.
4. Anotar medições antes e depois e observações.
5. Agendar próximo contato (padrão sugerido: 12 meses, editável).
6. Na data, abrir lembrete, iniciar contato no canal consentido e marcar resultado.

## Segurança antes de produção
- Criar projeto Supabase **exclusivo** da Clean Air; não reutilizar outros projetos.
- Aplicar SQL revisado, validar RLS com sessão anônima, usuário autenticado não autorizado e administrador autorizado.
- Proibir inscrição pública no painel e usar MFA para administradores.
- Revisar política de privacidade, retenção, consentimento e atendimento a solicitações LGPD.
- Configurar backup/restauração, logs de auditoria sem dados sensíveis e exportação segura.
- Não cadastrar clientes reais até validar o controle de acesso ponta a ponta.

## Estado da entrega
- Este documento e o esquema SQL são a base inicial.
- A migração **não foi executada**; não há autenticação nem painel funcional ainda.
- Próximo passo: provisionar o projeto próprio, testar as políticas e implementar login + cadastro de clientes.
