<template>
  <section id="about">
    <h2 class="title">Sobre a CleanAir</h2>

    <div class="about-wrapper">
      <img
        class="about-img"
        src="https://images.unsplash.com/photo-1597007069217-ff8a7f6b0ec5?auto=format&fit=crop&w=900&q=80"
      />

      <div class="about-text">
        <p>
          A CleanAir é especializada em higienização e manutenção de ar condicionado
          para residências e empresas. Trabalhamos com qualidade, segurança e rapidez.
        </p>

        <p>
          Nosso compromisso é entregar ambientes mais saudáveis com atendimento profissional.
        </p>
      </div>
    </div>
  </section>
</template>

<style>
.about-wrapper {
  display: flex;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
}

.about-img {
  width: 340px;
  border-radius: 14px;
}

.about-text {
  flex: 1;
  font-size: 18px;
  line-height: 1.6;
}
</style>
