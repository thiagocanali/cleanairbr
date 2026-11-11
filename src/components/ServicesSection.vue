<template>
  <section id="services" class="services-section">
    <div class="section-inner">
      <div class="services-head"><div><p class="section-label">O que fazemos</p><h2 class="section-title">Soluções para cuidar do seu ar.</h2></div><p class="section-intro">Do cuidado preventivo à higienização, ajudamos você a manter seu equipamento em boas condições.</p></div>
      <div class="services-grid">
        <article v-for="(service, index) in services" :key="service.title" class="service-card">
          <div class="card-top"><span class="service-number">0{{index+1}}</span><span class="service-arrow" aria-hidden="true">↗</span></div>
          <div class="service-icon" aria-hidden="true">{{service.icon}}</div>
          <h3>{{service.title}}</h3><p>{{service.description}}</p>
          <a :href="whats(service.title)" target="_blank" rel="noopener noreferrer" :aria-label="'Consultar sobre '+service.title">Consultar serviço <span aria-hidden="true">→</span></a>
        </article>
      </div>
      <div class="services-bottom"><p>Precisa de outro tipo de atendimento?</p><router-link to="/services">Conheça todos os serviços <span aria-hidden="true">↗</span></router-link></div>
    </div>
  </section>
</template>
<script setup>
const services=[
{icon:'✳',title:'Higienização de ar-condicionado',description:'Limpeza cuidadosa dos componentes acessíveis para remover sujeiras e resíduos acumulados.'},
{icon:'◉',title:'Manutenção preventiva',description:'Avaliação e cuidados periódicos para identificar necessidades e ajudar a preservar o equipamento.'},
{icon:'▦',title:'Atendimento empresarial',description:'Soluções de higienização e manutenção para equipamentos de ambientes comerciais.'}
];
const whats=(service)=>'https://wa.me/554791223570?text='+encodeURIComponent('Olá! Gostaria de saber mais sobre '+service+'.');
</script>
<style scoped>
.services-section{background:#fff}.services-head{display:flex;align-items:end;justify-content:space-between;gap:40px}.services-head .section-intro{margin:0;max-width:360px}.services-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:46px}.service-card{display:flex;flex-direction:column;min-height:360px;padding:30px;background:#f3f8f9;border:1px solid #e2edef;border-radius:16px;transition:transform .2s,box-shadow .2s}.service-card:hover{transform:translateY(-5px);box-shadow:0 18px 35px #0d425211}.card-top{display:flex;justify-content:space-between;align-items:center;color:#66818e;font-size:.8rem;font-weight:800}.service-arrow{font-size:1.2rem;color:#0b7894}.service-icon{display:grid;place-items:center;width:62px;height:62px;margin-top:32px;background:#dbeff2;border-radius:15px;color:#0b829a;font-size:2rem}h3{margin:24px 0 10px;color:#12394a;font-size:1.36rem;letter-spacing:-.04em;line-height:1.2}p{color:#617783;line-height:1.7}.service-card p{margin:0 0 22px}.service-card a{margin-top:auto;color:#087c97;font-weight:800;text-decoration:none;display:flex;justify-content:space-between;gap:12px}.services-bottom{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-top:26px}.services-bottom p{margin:0}.services-bottom a{font-weight:800;text-decoration:none;color:#087c97}@media(max-width:800px){.services-grid{grid-template-columns:1fr}.service-card{min-height:0}.services-head{display:block}.services-head .section-intro{margin-top:18px}.services-bottom{align-items:flex-start;flex-direction:column}}
</style>