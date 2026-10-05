<template>
  <section id="about" class="about-section">
    <div class="section-inner about-layout">
      <div class="about-image-wrap">
        <img v-if="imageAvailable" class="about-img" src="https://images.unsplash.com/photo-1597007069217-ff8a7f6b0ec5?auto=format&fit=crop&w=900&q=80" alt="Profissional realizando manutenção em equipamento de ar-condicionado" @error="imageAvailable = false" />
        <div v-else class="about-visual" aria-hidden="true"><span>Clean</span><strong>Air</strong></div>
      </div>
      <div class="about-content">
        <p class="section-label">Sobre a CleanAir</p>
        <h2 class="section-title">Ambientes mais saudáveis começam com um bom cuidado.</h2>
        <p>A CleanAir é especializada em higienização e manutenção de ar condicionado para residências e empresas. Trabalhamos com qualidade, segurança e rapidez.</p>
        <p>Nosso compromisso é entregar ambientes mais saudáveis com atendimento profissional.</p>
        <a class="about-link" href="#contact">Fale com a nossa equipe <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({ imageAvailable: true }),
};
</script>

<style scoped>
.about-section { background: #fff; }
.about-layout { display: grid; grid-template-columns: minmax(280px, .88fr) 1.12fr; gap: clamp(38px, 7vw, 100px); align-items: center; }
.about-image-wrap { position: relative; }
.about-image-wrap::after { content: ""; position: absolute; width: 46%; height: 42%; right: -18px; bottom: -18px; z-index: 0; border: 1px solid #9ccddd; }
.about-img { position: relative; z-index: 1; display: block; width: 100%; min-height: 410px; object-fit: cover; filter: saturate(.82); }
.about-visual { position: relative; z-index: 1; display: flex; flex-direction: column; justify-content: end; min-height: 410px; padding: 30px; overflow: hidden; background: linear-gradient(135deg, #bfe4ef 0%, #f5fbfc 48%, #73c9dd 49%, #0b6395 100%); color: var(--navy); font-size: clamp(2.8rem, 6vw, 4.6rem); font-weight: 800; line-height: .8; letter-spacing: -.09em; }.about-visual span { color: #fff; }.about-visual strong { color: var(--navy); }
.about-content p:not(.section-label) { margin: 20px 0 0; color: var(--muted); font-size: 1.03rem; line-height: 1.75; }
.about-link { display: inline-block; margin-top: 28px; color: var(--blue); font-weight: 800; text-decoration: none; }
.about-link:hover { color: var(--navy); }
@media (max-width: 760px) { .about-layout { grid-template-columns: 1fr; gap: 44px; } .about-image-wrap { max-width: 500px; } .about-img, .about-visual { min-height: 300px; } }
</style>
