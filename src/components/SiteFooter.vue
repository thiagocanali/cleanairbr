<template>
  <footer class="footer">
    <div class="footer-inner">
      <router-link to="/" class="footer-logo">Clean<span>Air</span></router-link>
      <p>CleanAir © 2025 — Todos os direitos reservados.</p>
      <a href="#hero">Voltar ao topo ↑</a>
    </div>
  </footer>
</template>

<style scoped>
.footer { padding: 26px 24px; background: #062a41; color: #b7cbd5; }
.footer-inner { width: min(1120px, 100%); margin: auto; display: flex; justify-content: space-between; align-items: center; gap: 18px; font-size: .82rem; }
.footer-logo { color: #fff; font-size: 1.15rem; font-weight: 800; letter-spacing: -.05em; text-decoration: none; }.footer-logo span { color: #79cfe9; }
.footer p { margin: 0; }.footer a:not(.footer-logo) { color: #d5e8ef; text-decoration: none; font-weight: 600; }.footer a:hover { color: #fff; }
@media (max-width: 640px) { .footer-inner { flex-direction: column; align-items: flex-start; } }
</style>
