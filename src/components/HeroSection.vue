<template>
  <section id="hero" class="hero">
    <div class="hero-content">
      <p class="eyebrow">Higienização e manutenção</p>
      <h1>Ar-condicionado limpo, eficiente e seguro.</h1>
      <p class="hero-description">Atendimento rápido, seguro e de qualidade para residências e empresas.</p>
      <div class="hero-actions">
        <a class="button-primary" href="https://wa.me/554791223570?text=Olá,+quero+um+atendimento+CleanAir" target="_blank" rel="noopener noreferrer">Solicitar atendimento</a>
        <a class="hero-link" href="#services">Conheça os serviços <span aria-hidden="true">↓</span></a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { position: relative; min-height: min(720px, calc(100vh - 72px)); display: grid; place-items: center; overflow: hidden; background: linear-gradient(90deg, rgba(4,42,65,.9) 0%, rgba(4,42,65,.68) 51%, rgba(4,42,65,.28) 100%), url("https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1600&q=85") center/cover no-repeat; }
.hero-content { position: relative; width: min(1120px, 100%); padding: 60px 24px; color: #fff; }
.eyebrow { margin: 0 0 18px; color: #a7ddef; font-size: .78rem; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }
h1 { max-width: 710px; margin: 0; font-size: clamp(2.55rem, 6vw, 5rem); letter-spacing: -.06em; line-height: .98; }
.hero-description { max-width: 540px; margin: 24px 0 0; color: #e3f2f7; font-size: clamp(1rem, 2vw, 1.2rem); line-height: 1.65; }
.hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 22px; margin-top: 34px; }
.hero-link { color: #fff; font-weight: 700; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,.65); padding-bottom: 4px; }
.hero-link:hover { border-color: #fff; }
@media (max-width: 640px) { .hero { min-height: 620px; background-position: 58% center; } .hero-content { padding: 48px 20px; } .hero-actions { align-items: flex-start; flex-direction: column; gap: 22px; } }
</style>
