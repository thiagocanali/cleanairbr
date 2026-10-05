<template>
  <section id="services" class="services-section">
    <div class="section-inner">
      <p class="section-label">Nossos serviços</p>
      <h2 class="section-title">Cuidado completo para o seu ar-condicionado.</h2>
      <p class="section-intro">Soluções para manter o equipamento limpo, eficiente e preparado para o dia a dia.</p>
      <div class="services-grid">
        <article class="service-card">
          <span class="service-number">01</span>
          <h3>Higienização Completa</h3>
          <p>Limpeza profunda garantindo ar puro e seguro para sua família.</p>
        </article>
        <article class="service-card">
          <span class="service-number">02</span>
          <h3>Manutenção Preventiva</h3>
          <p>Evite gastos e prolongue a vida útil do seu equipamento.</p>
        </article>
        <article class="service-card">
          <span class="service-number">03</span>
          <h3>Atendimento Empresarial</h3>
          <p>Serviços para empresas com emissão de relatório e periodicidade.</p>
        </article>
      </div>
      <router-link to="/services" class="services-link">Ver todos os serviços <span aria-hidden="true">→</span></router-link>
    </div>
  </section>
</template>

<style scoped>
.services-section { background: #fff; }
.services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin-top: 48px; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.service-card { min-height: 225px; padding: 30px 32px 30px 0; border-right: 1px solid var(--line); }
.service-card:not(:first-child) { padding-left: 32px; }
.service-card:last-child { border-right: 0; }
.service-number { color: var(--blue); font-size: .78rem; font-weight: 800; letter-spacing: .1em; }
h3 { margin: 22px 0 12px; color: var(--navy); font-size: 1.22rem; letter-spacing: -.025em; }
p { margin: 0; color: var(--muted); line-height: 1.65; }
.services-link { display: inline-block; margin-top: 28px; color: var(--blue); font-weight: 800; text-decoration: none; }
.services-link:hover { color: var(--navy); }
@media (max-width: 760px) { .services-grid { grid-template-columns: 1fr; margin-top: 34px; } .service-card, .service-card:not(:first-child) { min-height: auto; padding: 24px 0; border-right: 0; border-bottom: 1px solid var(--line); } .service-card:last-child { border-bottom: 0; } h3 { margin-top: 14px; } }
</style>
