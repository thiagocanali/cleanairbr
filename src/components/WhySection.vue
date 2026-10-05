<template>
  <section id="why" class="why-section">
    <div class="section-inner">
      <div class="why-heading">
        <div>
          <p class="section-label">Por que escolher</p>
          <h2 class="section-title">Confiança no serviço, tranquilidade no ambiente.</h2>
        </div>
        <p class="section-intro">Atendimento próximo e uma execução cuidadosa do início ao fim.</p>
      </div>
      <div class="why-grid">
        <article class="why-item"><span class="why-icon">01</span><h3>Excelência no Atendimento</h3><p>Profissionais qualificados e equipamentos modernos.</p></article>
        <article class="why-item"><span class="why-icon">02</span><h3>Agendamento Rápido</h3><p>Horários flexíveis e atendimento imediato.</p></article>
        <article class="why-item"><span class="why-icon">03</span><h3>Serviço Garantido</h3><p>Garantia completa em todos os serviços realizados.</p></article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.why-section { background: var(--sky); }
.why-heading { display: flex; justify-content: space-between; align-items: end; gap: 48px; }
.why-heading .section-intro { margin: 0; }
.why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 46px; }
.why-item { padding: 30px; background: rgba(255,255,255,.68); border: 1px solid rgba(11,99,149,.14); }
.why-icon { display: block; color: var(--blue); font-size: .78rem; font-weight: 800; letter-spacing: .1em; }
h3 { margin: 42px 0 12px; color: var(--navy); font-size: 1.16rem; letter-spacing: -.02em; }
p { margin: 0; color: var(--muted); line-height: 1.65; }
@media (max-width: 760px) { .why-heading { display: block; } .why-heading .section-intro { margin-top: 18px; } .why-grid { grid-template-columns: 1fr; gap: 12px; margin-top: 32px; } .why-item { padding: 24px; } h3 { margin-top: 25px; } }
</style>
