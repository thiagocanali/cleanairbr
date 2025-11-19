<template>
  <section id="why">
    <h2 class="title">Por que escolher a CleanAir?</h2>

    <div class="why-grid">
      <div class="why-item">
        <span class="why-icon">⭐</span>
        <h3>Excelência no Atendimento</h3>
        <p>Profissionais qualificados e equipamentos modernos.</p>
      </div>

      <div class="why-item">
        <span class="why-icon">⏱️</span>
        <h3>Agendamento Rápido</h3>
        <p>Horários flexíveis e atendimento imediato.</p>
      </div>

      <div class="why-item">
        <span class="why-icon">🛡️</span>
        <h3>Serviço Garantido</h3>
        <p>Garantia completa em todos os serviços realizados.</p>
      </div>
    </div>
  </section>
</template>

<style>
.why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 26px;
  margin-top: 20px;
}

.why-item {
  background: #fff;
  padding: 26px;
  text-align: center;
  border-radius: 14px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}

.why-icon {
  font-size: 40px;
  margin-bottom: 12px;
  display: block;
}
</style>
