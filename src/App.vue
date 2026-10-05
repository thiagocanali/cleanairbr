<template>
  <div id="app">
    <HeaderNav />
    <router-view />
    <SiteFooter />
    <FloatingWhatsapp />
  </div>
</template>

<script>
import HeaderNav from "./components/HeaderNav.vue";
import SiteFooter from "./components/SiteFooter.vue";
import FloatingWhatsapp from "./components/FloatingWhatsapp.vue";

export default {
  name: "App",
  components: { HeaderNav, SiteFooter, FloatingWhatsapp },
};
</script>

<style>
:root {
  --navy: #083b5c;
  --blue: #0b6395;
  --sky: #eaf5f9;
  --ink: #163040;
  --muted: #60727e;
  --line: #d8e4e9;
  --surface: #ffffff;
  --page: #f8fbfc;
  --whatsapp: #22a85a;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 82px; }
body {
  margin: 0;
  min-width: 320px;
  font-family: "Inter", Arial, sans-serif;
  background: var(--page);
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; }
section { padding: 96px 24px; }
.section-inner { width: min(1120px, 100%); margin: 0 auto; }
.section-label {
  margin: 0 0 10px;
  color: var(--blue);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.section-title {
  max-width: 660px;
  margin: 0;
  color: var(--navy);
  font-size: clamp(1.85rem, 3.6vw, 2.75rem);
  letter-spacing: -0.045em;
  line-height: 1.12;
}
.section-intro {
  max-width: 600px;
  margin: 18px 0 0;
  color: var(--muted);
  font-size: 1.05rem;
  line-height: 1.7;
}
.button-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 13px 20px;
  border-radius: 7px;
  background: var(--whatsapp);
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 180ms ease, transform 180ms ease;
}
.button-primary:hover { background: #178e49; transform: translateY(-1px); }
.button-primary:focus-visible, a:focus-visible, button:focus-visible { outline: 3px solid #76c7eb; outline-offset: 3px; }

@media (max-width: 640px) {
  section { padding: 68px 20px; }
  .section-intro { font-size: 1rem; }
}
</style>
