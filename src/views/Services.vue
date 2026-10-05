<template>
  <main class="services-page">
    <header class="services-hero">
      <div>
        <p>Serviços CleanAir</p>
        <h1>Cuidado técnico para um ar mais saudável.</h1>
        <span>Profissionalismo, qualidade e atendimento especializado.</span>
      </div>
    </header>
    <section class="services-list">
      <div class="services-grid">
        <article v-for="(service, index) in services" :key="service.title" class="service-card">
          <span>0{{ index + 1 }}</span><h2>{{ service.title }}</h2><p>{{ service.description }}</p>
          <a :href="whats(service.message)" target="_blank" rel="noopener noreferrer">Solicitar pelo WhatsApp <b aria-hidden="true">→</b></a>
        </article>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data: () => ({ services: [
    { title: "Higienização Completa", description: "Remoção de fungos, poeira e bactérias para garantir ar puro e seguro.", message: "Quero higienização completa" },
    { title: "Limpeza da Evaporadora", description: "Limpeza interna garantindo eficiência e saúde no ambiente.", message: "Quero limpeza da evaporadora" },
    { title: "Limpeza da Condensadora", description: "Melhora o desempenho e reduz consumo de energia.", message: "Quero limpeza da condensadora" },
    { title: "Manutenção Preventiva", description: "Evite problemas, aumente a vida útil e economize dinheiro.", message: "Quero manutenção preventiva" },
    { title: "Troca de Filtros", description: "Garantia de ar mais limpo e maior eficiência do aparelho.", message: "Quero troca de filtros" },
  ] }),
  methods: { whats(message) { return `https://wa.me/554791223570?text=${encodeURIComponent(message)}`; } },
};
</script>

<style scoped>
.services-hero { display: grid; place-items: center; min-height: 360px; padding: 72px 24px; background: var(--navy); color: #fff; text-align: center; }.services-hero div { max-width: 720px; }.services-hero p { margin: 0 0 16px; color: #99d9ec; font-size: .75rem; font-weight: 800; letter-spacing: .13em; text-transform: uppercase; }.services-hero h1 { margin: 0; font-size: clamp(2.3rem, 5vw, 4.2rem); letter-spacing: -.055em; line-height: 1.02; }.services-hero span { display: block; margin-top: 22px; color: #d1e7ef; }
.services-list { width: min(1120px, 100%); margin: auto; padding: 74px 24px 96px; }.services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }.service-card { padding: 30px; background: #fff; border: 1px solid var(--line); }.service-card span { color: var(--blue); font-size: .75rem; font-weight: 800; letter-spacing: .1em; }.service-card h2 { margin: 30px 0 12px; color: var(--navy); font-size: 1.25rem; letter-spacing: -.025em; }.service-card p { min-height: 78px; margin: 0; color: var(--muted); line-height: 1.65; }.service-card a { display: inline-block; margin-top: 26px; color: var(--blue); font-size: .9rem; font-weight: 800; text-decoration: none; }.service-card a:hover { color: var(--navy); }
@media (max-width: 850px) { .services-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .services-list { padding: 52px 20px 68px; }.services-grid { grid-template-columns: 1fr; }.service-card p { min-height: auto; } }
</style>
