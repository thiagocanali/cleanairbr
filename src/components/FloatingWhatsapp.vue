<template>
  <a href="https://wa.me/554791223570?text=Olá,+gostaria+de+solicitar+um+atendimento+da+CleanAir" class="whatsapp-button" target="_blank" rel="noopener noreferrer" aria-label="Falar com a CleanAir pelo WhatsApp">
    <span aria-hidden="true">⌕</span><span class="button-label">WhatsApp</span>
  </a>
</template>

<style scoped>
.whatsapp-button { position: fixed; right: 22px; bottom: 22px; z-index: 1001; display: flex; align-items: center; gap: 7px; min-height: 48px; padding: 0 16px; border-radius: 24px; background: var(--whatsapp); box-shadow: 0 7px 18px rgba(5,48,31,.24); color: #fff; font-size: .88rem; font-weight: 800; text-decoration: none; transition: transform 180ms ease, background-color 180ms ease; }
.whatsapp-button span:first-child { display: grid; place-items: center; width: 18px; height: 18px; border: 2px solid currentColor; border-radius: 50%; font-size: 0; }.whatsapp-button span:first-child::after { content: ""; width: 5px; height: 5px; border-bottom: 2px solid currentColor; border-left: 2px solid currentColor; transform: translate(-4px, 8px) rotate(-20deg); }
.whatsapp-button:hover { background: #178e49; transform: translateY(-2px); }
@media (max-width: 640px) { .whatsapp-button { right: 16px; bottom: 16px; min-height: 50px; padding: 0 15px; } }
</style>
