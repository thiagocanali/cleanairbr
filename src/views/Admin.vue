<template>
  <div class="admin-page">
    <header class="admin-header">
      <div>
        <p class="eyebrow">Área profissional</p>
        <h1>Bom dia, Clean Air</h1>
        <p class="date-label">Visão geral da operação</p>
      </div>
      <button class="primary-action" type="button">+ Novo serviço</button>
    </header>

    <section class="metrics" aria-label="Resumo da operação">
      <article v-for="metric in metrics" :key="metric.label" class="metric-card">
        <span class="metric-icon" aria-hidden="true">{{ metric.icon }}</span>
        <div><strong>{{ metric.value }}</strong><span>{{ metric.label }}</span></div>
      </article>
    </section>

    <div class="admin-grid">
      <section class="panel agenda-panel">
        <div class="panel-heading"><div><p class="eyebrow">Agenda</p><h2>Serviços de hoje</h2></div><button class="text-action" type="button">Ver agenda</button></div>
        <div class="service-list">
          <article v-for="service in todayServices" :key="service.time + service.client" class="service-row">
            <time>{{ service.time }}</time><div><strong>{{ service.client }}</strong><span>{{ service.type }} · {{ service.units }}</span></div><span class="status" :class="service.statusClass">{{ service.status }}</span>
          </article>
        </div>
      </section>

      <section class="panel reminders-panel">
        <div class="panel-heading"><div><p class="eyebrow">Atenção</p><h2>Próximos contatos</h2></div><button class="text-action" type="button">Ver clientes</button></div>
        <ul class="reminder-list">
          <li v-for="reminder in reminders" :key="reminder.client"><span class="reminder-dot" aria-hidden="true"></span><div><strong>{{ reminder.client }}</strong><span>{{ reminder.reason }}</span></div><button class="contact-action" type="button">Contatar</button></li>
        </ul>
      </section>
    </div>

    <section class="quick-actions" aria-label="Ações rápidas">
      <button v-for="action in actions" :key="action.title" class="quick-action" type="button"><span aria-hidden="true">{{ action.icon }}</span><strong>{{ action.title }}</strong><small>{{ action.description }}</small></button>
    </section>
  </div>
</template>

<script>
export default {
  name: "AdminView",
  data() {
    return {
      metrics: [
        { icon: "Hoje", value: "3", label: "serviços agendados" },
        { icon: "Clientes", value: "28", label: "clientes ativos" },
        { icon: "Equipamentos", value: "46", label: "equipamentos" },
        { icon: "Retornos", value: "5", label: "retornos este mês" },
      ],
      todayServices: [
        { time: "09:00", client: "João Silva", type: "Limpeza", units: "2 aparelhos", status: "Próximo", statusClass: "status-next" },
        { time: "14:00", client: "Maria Souza", type: "Manutenção", units: "1 aparelho", status: "Agendado", statusClass: "status-scheduled" },
        { time: "16:30", client: "Carlos Oliveira", type: "Avaliação", units: "3 aparelhos", status: "Agendado", statusClass: "status-scheduled" },
      ],
      reminders: [
        { client: "Ana Paula", reason: "Manutenção anual · há 11 meses", },
        { client: "Ricardo Mendes", reason: "Orçamento enviado há 3 dias", },
        { client: "Cláudia Santos", reason: "Retorno recomendado para esta semana", },
      ],
      actions: [
        { icon: "Cliente", title: "Novo cliente", description: "Cadastre rapidamente" },
        { icon: "Agenda", title: "Abrir agenda", description: "Organize seus horários" },
        { icon: "Histórico", title: "Histórico", description: "Consulte serviços anteriores" },
      ],
    };
  },
};
</script>

<style scoped>
.admin-page { max-width: 1180px; margin: 0 auto; padding: 150px 24px 80px; color: #15304a; }
.admin-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 34px; }
.eyebrow { margin: 0 0 6px; color: #0785a8; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; }
h1, h2, p { margin-top: 0; } h1 { margin-bottom: 6px; font-size: clamp(2rem, 4vw, 3rem); line-height: 1.05; } h2 { margin-bottom: 0; font-size: 1.25rem; } .date-label { margin-bottom: 0; color: #668097; }
.primary-action, .contact-action { border: 0; border-radius: 10px; background: #067da2; color: #fff; cursor: pointer; font-weight: 800; } .primary-action { padding: 14px 20px; } .primary-action:hover, .contact-action:hover { background: #056782; }
.metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 22px; }.metric-card, .panel, .quick-action { border: 1px solid #dbe8ed; border-radius: 16px; background: rgba(255,255,255,.86); box-shadow: 0 8px 24px rgba(21,48,74,.05); }.metric-card { display: flex; align-items: center; gap: 14px; padding: 20px; }.metric-icon { display: grid; place-items: center; min-width: 44px; height: 44px; border-radius: 12px; background: #e4f4f7; color: #067da2; font-size: .65rem; font-weight: 900; text-align: center; }.metric-card strong, .metric-card span:not(.metric-icon) { display: block; }.metric-card strong { font-size: 1.7rem; line-height: 1; }.metric-card span:not(.metric-icon) { margin-top: 5px; color: #668097; font-size: .8rem; }
.admin-grid { display: grid; grid-template-columns: 1.15fr .85fr; gap: 22px; }.panel { padding: 24px; }.panel-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 18px; }.text-action { border: 0; background: transparent; color: #067da2; cursor: pointer; font-weight: 800; }.service-list, .reminder-list { display: grid; gap: 10px; }.service-row, .reminder-list li { display: flex; align-items: center; gap: 16px; padding: 14px 0; border-top: 1px solid #e8f0f2; }.service-row:first-child, .reminder-list li:first-child { border-top: 0; }.service-row time { min-width: 48px; color: #067da2; font-size: .85rem; font-weight: 900; }.service-row div, .reminder-list li div { flex: 1; }.service-row strong, .service-row span, .reminder-list strong, .reminder-list li div span { display: block; }.service-row span, .reminder-list li div span { color: #668097; font-size: .82rem; }.status { padding: 5px 8px; border-radius: 6px; font-size: .7rem !important; font-weight: 800; }.status-next { background: #fff2d6; color: #9a6500 !important; }.status-scheduled { background: #e5f4f5; color: #067d83 !important; }.reminder-dot { width: 9px; height: 9px; border-radius: 50%; background: #ffb703; }.contact-action { padding: 8px 10px; font-size: .75rem; }.quick-actions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 22px; }.quick-action { display: grid; grid-template-columns: auto 1fr; column-gap: 12px; padding: 18px; text-align: left; cursor: pointer; color: #15304a; }.quick-action span { grid-row: span 2; color: #067da2; font-weight: 900; }.quick-action small { color: #668097; }
@media (max-width: 800px) { .admin-page { padding: 130px 16px 50px; }.admin-header { align-items: flex-start; flex-direction: column; }.primary-action { width: 100%; }.metrics { grid-template-columns: repeat(2, 1fr); }.admin-grid { grid-template-columns: 1fr; }.quick-actions { grid-template-columns: 1fr; } }
@media (max-width: 420px) { .metric-card { padding: 14px 10px; gap: 8px; }.metric-icon { min-width: 38px; height: 38px; font-size: .55rem; }.metric-card strong { font-size: 1.35rem; }.metric-card span:not(.metric-icon) { font-size: .7rem; } .service-row { gap: 9px; }.status { display: none !important; } }
</style>
