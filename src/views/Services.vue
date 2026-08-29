<template>
  <div class="services-page">
    <header class="services-hero">
      <h1>Nossos Serviços</h1>
      <p>Profissionalismo, qualidade e atendimento especializado.</p>
    </header>

    <section class="services-grid">

      <div class="service-card">
        <h3>Higienização Completa</h3>
        <p>Remoção de fungos, poeira e bactérias para garantir ar puro e seguro.</p>
        <a class="whats-btn" :href="whats('Quero higienização completa')">Solicitar</a>
      </div>

      <div class="service-card">
        <h3>Limpeza da Evaporadora</h3>
        <p>Limpeza interna garantindo eficiência e saúde no ambiente.</p>
        <a class="whats-btn" :href="whats('Quero limpeza da evaporadora')">Solicitar</a>
      </div>

      <div class="service-card">
        <h3>Limpeza da Condensadora</h3>
        <p>Melhora o desempenho e reduz consumo de energia.</p>
        <a class="whats-btn" :href="whats('Quero limpeza da condensadora')">Solicitar</a>
      </div>

      <div class="service-card">
        <h3>Manutenção Preventiva</h3>
        <p>Evite problemas, aumente a vida útil e economize dinheiro.</p>
        <a class="whats-btn" :href="whats('Quero manutenção preventiva')">Solicitar</a>
      </div>

      <div class="service-card">
        <h3>Troca de Filtros</h3>
        <p>Garantia de ar mais limpo e maior eficiência do aparelho.</p>
        <a class="whats-btn" :href="whats('Quero troca de filtros')">Solicitar</a>
      </div>

    </section>
  </div>
</template>

<script>
export default {
  methods: {
    whats(msg) {
      const number = "554791223570";
      return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
    }
  }
};
</script>

<style>
.services-hero {
  text-align: center;
  padding: 70px 20px;
  background: #005baa;
  color: white;
}
.services-grid {
  max-width: 1100px;
  margin: auto;
  padding: 60px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}
.service-card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.service-card h3 {
  margin-bottom: 10px;
  color: #005baa;
}
.whats-btn {
  display: inline-block;
  margin-top: 15px;
  background: #25D366;
  color: white;
  padding: 10px 15px;
  border-radius: 6px;
  text-decoration: none;
}
.whats-btn:hover {
  background: #1da851;
}
</style>
