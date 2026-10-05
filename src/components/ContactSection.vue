<template>
  <section id="contact" class="contact-section">
    <div class="section-inner contact-layout">
      <div>
        <p class="section-label">Vamos conversar</p>
        <h2 class="section-title">Solicite seu atendimento.</h2>
        <p class="section-intro">Conte com a CleanAir para cuidar da qualidade do ar no seu ambiente.</p>
      </div>
      <div class="contact-card">
        <dl>
          <div><dt>WhatsApp</dt><dd><a href="https://wa.me/554791223570" target="_blank" rel="noopener noreferrer">(47) 9122-3570</a></dd></div>
          <div><dt>E-mail</dt><dd><a href="mailto:atendimento.cleanair@gmail.com">atendimento.cleanair@gmail.com</a></dd></div>
          <div><dt>Região</dt><dd>Atendimento em SC e regiões próximas</dd></div>
        </dl>
        <a class="button-primary" href="https://wa.me/554791223570" target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section { background: var(--navy); }
.contact-section .section-label { color: #90d3e9; }
.contact-section .section-title { color: #fff; }
.contact-section .section-intro { color: #c5dce5; }
.contact-layout { display: grid; grid-template-columns: 1fr minmax(350px, .8fr); gap: clamp(38px, 8vw, 110px); align-items: center; }
.contact-card { padding: 32px; background: #fff; }
dl { margin: 0; }
dl div { padding: 15px 0; border-bottom: 1px solid var(--line); }
dl div:first-child { padding-top: 0; } dl div:last-child { border: 0; }
dt { margin-bottom: 4px; color: var(--blue); font-size: .76rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
dd { margin: 0; color: var(--ink); font-weight: 600; line-height: 1.5; } dd a { text-decoration: none; } dd a:hover { color: var(--blue); }
.contact-card .button-primary { width: 100%; margin-top: 26px; }
@media (max-width: 760px) { .contact-layout { grid-template-columns: 1fr; } .contact-card { padding: 26px 22px; } }
</style>
