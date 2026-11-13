<template>
  <a v-if="showButton" href="https://wa.me/554791223570?text=Olá,+gostaria+de+solicitar+um+atendimento+da+CleanAir" class="whatsapp-button" target="_blank" rel="noopener noreferrer" aria-label="Falar com a CleanAir pelo WhatsApp">
    <span aria-hidden="true">⌕</span><span class="button-label">WhatsApp</span>
  </a>
</template>\n\n<script setup>\nimport {computed} from "vue";\nimport {useRoute} from "vue-router";\nconst route=useRoute();\nconst showButton=computed(()=>!route.meta.private && !["/admin","/clients","/equipment","/gestao"].some(prefix=>route.path===prefix||route.path.startsWith(prefix+"/")));\n</script>

<style scoped>
.whatsapp-button { position: fixed; right: calc(16px + env(safe-area-inset-right, 0px)); bottom: calc(16px + env(safe-area-inset-bottom, 0px)); z-index: 30; display: flex; align-items: center; gap: 7px; min-height: 48px; padding: 0 16px; border-radius: 24px; background: var(--whatsapp); box-shadow: 0 7px 18px rgba(5,48,31,.24); color: #fff; font-size: .88rem; font-weight: 800; text-decoration: none; transition: transform 180ms ease, background-color 180ms ease; }
.whatsapp-button span:first-child { display: grid; place-items: center; width: 18px; height: 18px; border: 2px solid currentColor; border-radius: 50%; font-size: 0; }.whatsapp-button span:first-child::after { content: ""; width: 5px; height: 5px; border-bottom: 2px solid currentColor; border-left: 2px solid currentColor; transform: translate(-4px, 8px) rotate(-20deg); }
.whatsapp-button:hover { background: #178e49; transform: translateY(-2px); }
@media (max-width: 640px) { .whatsapp-button { right: calc(12px + env(safe-area-inset-right, 0px)); bottom: calc(12px + env(safe-area-inset-bottom, 0px)); min-height: 50px; padding: 0 15px; } }
@media (prefers-reduced-motion: reduce) { .whatsapp-button { transition: none; } .whatsapp-button:hover { transform: none; } }\n</style>
