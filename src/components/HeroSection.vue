<template>
  <section id="hero" class="hero">
    <div class="overlay"></div>
    <div class="hero-content">
      <h2>Higienização Profissional de Ar Condicionado</h2>
      <p>Atendimento rápido, seguro e de qualidade para residências e empresas.</p>
      <a class="cta" href="https://wa.me/554791223570?text=Olá,+quero+um+atendimento+CleanAir" target="_blank">
        Solicitar Atendimento
      </a>
    </div>
  </section>
</template>

<style>
.hero {
  position: relative;
  height: 85vh;
  background: url("https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1400&q=80")
    center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 47, 105, 0.53);
}

.hero-content {
  position: relative;
  text-align: center;
  padding: 0 18px;
  max-width: 650px;
}

.hero-content h2 {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 16px;
}

.hero-content p {
  font-size: 18px;
  margin-bottom: 26px;
  opacity: 0.9;
}

.cta {
  display: inline-block;
  background: #25d366;
  padding: 14px 26px;
  color: white;
  font-weight: 700;
  text-decoration: none;
  border-radius: 8px;
  transition: 0.3s;
}

.cta:hover {
  background: #1db656;
}
</style>
