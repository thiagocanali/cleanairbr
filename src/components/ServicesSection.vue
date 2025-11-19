<template>
  <section id="services">
    <h2 class="title">Nossos Serviços</h2>

    <div class="services-grid">
      <div class="service-card">
        <div class="icon">🧼</div>
        <h3>Higienização Completa</h3>
        <p>Limpeza profunda garantindo ar puro e seguro para sua família.</p>
      </div>

      <div class="service-card">
        <div class="icon">⚡</div>
        <h3>Manutenção Preventiva</h3>
        <p>Evite gastos e prolongue a vida útil do seu equipamento.</p>
      </div>

      <div class="service-card">
        <div class="icon">🏢</div>
        <h3>Atendimento Empresarial</h3>
        <p>Serviços para empresas com emissão de relatório e periodicidade.</p>
      </div>
    </div>
  </section>
</template>

<style>
.title {
  text-align: center;
  font-size: 32px;
  margin-bottom: 35px;
  color: #003a81;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 26px;
}

.service-card {
  background: #fff;
  padding: 26px;
  border-radius: 14px;
  text-align: center;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  transition: 0.3s;
}

.service-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);
}

.icon {
  font-size: 42px;
  margin-bottom: 14px;
}
</style>
