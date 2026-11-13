<template>
  <section class="instagram-section" aria-labelledby="social-title">
    <div class="section-inner social-layout">
      <div>
        <p class="section-label">Contato e novidades</p>
        <h2 id="social-title" class="section-title">Converse com a CleanAir.</h2>
        <p class="section-intro">Para agendar uma higienização ou tirar dúvidas sobre o atendimento, fale diretamente pelo WhatsApp.</p>
      </div>
      <a class="social-link" href="https://wa.me/554791223570" target="_blank" rel="noopener noreferrer">Solicitar atendimento pelo WhatsApp</a>
    </div>
  </section>
</template>
<style scoped>
.instagram-section{background:var(--sky)}
.social-layout{display:flex;align-items:center;justify-content:space-between;gap:28px;flex-wrap:wrap}
.social-layout>div{flex:1 1 350px}
.social-link{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 20px;border-radius:9px;background:var(--navy);color:#fff;text-decoration:none;font-weight:800}
.social-link:hover{background:var(--blue)}
@media(max-width:640px){.social-link{width:100%}}
</style>
