<template>
  <section id="hero" class="hero">
    <div class="hero-inner">
      <div class="hero-copy">
        <p class="eyebrow"><span class="eyebrow-dot"></span> Cuidado especializado em climatização</p>
        <h1>Seu ambiente merece <em>respirar melhor.</em></h1>
        <p class="hero-description">Higienização e manutenção de ar-condicionado com atenção aos detalhes, para residências e empresas em Blumenau e região.</p>
        <div class="hero-actions">
          <a class="button-primary" href="https://wa.me/554791223570?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20com%20a%20CleanAir." target="_blank" rel="noopener noreferrer">Solicitar orçamento <span aria-hidden="true">↗</span></a>
          <router-link class="button-outline" to="/services">Explorar serviços <span aria-hidden="true">→</span></router-link>
        </div>
        <div class="hero-detail"><span class="detail-line"></span><span>Atendimento residencial e empresarial</span></div>
      </div>
      <div class="hero-visual">
        <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=85" alt="Profissional trabalhando em equipamento de climatização" fetchpriority="high" />
        <div class="visual-caption"><span class="caption-mark">✳</span><div><strong>Mais cuidado em cada detalhe.</strong><small>Higienização • Manutenção • Prevenção</small></div></div>
      </div>
    </div>
    <div class="hero-bottom"><span>CLEAN AIR / BLUMENAU · SC</span><a href="#services">DESCUBRA NOSSOS SERVIÇOS <span aria-hidden="true">↓</span></a></div>
  </section>
</template>

<style scoped>
.hero{padding:0;background:#eaf3f6;overflow:hidden}.hero-inner{width:min(1320px,100%);margin:auto;min-height:650px;display:grid;grid-template-columns:1.05fr .95fr;align-items:stretch}.hero-copy{padding:clamp(70px,8vw,120px) clamp(24px,5vw,78px);display:flex;flex-direction:column;justify-content:center}.eyebrow{display:flex;align-items:center;gap:10px;margin:0 0 27px;color:#0a6680;text-transform:uppercase;letter-spacing:.13em;font-weight:800;font-size:.74rem}.eyebrow-dot{width:8px;height:8px;border-radius:50%;background:#0c9ab4;box-shadow:0 0 0 5px #c9e7ec}h1{max-width:710px;margin:0;color:#102f43;font-size:clamp(3.3rem,6vw,6.3rem);letter-spacing:-.075em;line-height:.99;font-weight:800}h1 em{display:block;color:#087e9b;font-style:normal}.hero-description{max-width:520px;margin:29px 0 0;color:#526b78;font-size:clamp(1rem,1.5vw,1.14rem);line-height:1.8}.hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:35px}.hero-actions a{gap:22px}.button-outline{display:inline-flex;align-items:center;justify-content:center;gap:18px;padding:13px 20px;min-height:50px;border:1px solid #a6c2cd;border-radius:9px;text-decoration:none;font-weight:750;color:#123b50;background:transparent;transition:background .2s}.button-outline:hover{background:#d7eaf0}.hero-detail{display:flex;align-items:center;gap:14px;margin-top:54px;color:#66818b;font-size:.82rem;font-weight:600}.detail-line{width:33px;height:1px;background:#0c8aa5}.hero-visual{position:relative;min-height:540px;background:#0b4055}.hero-visual>img{display:block;width:100%;height:100%;object-fit:cover;filter:saturate(.75);opacity:.86}.hero-visual:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(5,35,50,.52),transparent 55%);pointer-events:none}.visual-caption{position:absolute;z-index:1;bottom:36px;left:32px;right:32px;display:flex;gap:16px;align-items:center;padding:20px;background:rgba(255,255,255,.94);backdrop-filter:blur(10px);border-radius:12px;color:#143b4b;box-shadow:0 12px 30px #042e3b33}.caption-mark{display:grid;place-items:center;flex:none;width:42px;height:42px;border-radius:50%;background:#d7f1f4;color:#07859d;font-size:1.4rem}.visual-caption strong,.visual-caption small{display:block}.visual-caption small{margin-top:4px;color:#617985;font-size:.77rem}.hero-bottom{max-width:1320px;margin:auto;padding:17px clamp(24px,5vw,78px);display:flex;justify-content:space-between;gap:16px;color:#6c8590;font-size:.69rem;font-weight:800;letter-spacing:.12em}.hero-bottom a{color:#0b718d;text-decoration:none}@media(max-width:850px){.hero-inner{grid-template-columns:1fr}.hero-copy{padding:78px 24px 54px}.hero-visual{min-height:380px;height:440px}.hero-detail{margin-top:35px}h1{max-width:680px}}@media(max-width:520px){.hero-copy{padding:66px 20px 45px}h1{font-size:clamp(3rem,13vw,4.5rem)}.hero-visual{height:330px;min-height:330px}.visual-caption{bottom:16px;left:16px;right:16px;padding:14px}.hero-bottom{padding:16px 20px;flex-wrap:wrap}.hero-actions a{width:100%;justify-content:space-between}}
</style>