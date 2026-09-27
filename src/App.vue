<template>
  <div id="app">
    <a class="skip-link" href="#main-content">Pular para o conteúdo principal</a>
    <HeaderNav />

    <main id="main-content" tabindex="-1">
      <router-view />
    </main>

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
  components: {
    HeaderNav,
    SiteFooter,
    FloatingWhatsapp,
  },
};
</script>

<style>
.skip-link {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 1000;
  padding: 10px 14px;
  border-radius: 8px;
  background: #123b5d;
  color: #fff;
  transform: translateY(-180%);
  transition: transform 160ms ease;
}

.skip-link:focus {
  transform: translateY(0);
}

body {
  margin: 0;
  font-family: "Inter", sans-serif;
  background: #f4f6fa;
  color: #222;
  line-height: 1.6;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

:focus-visible {
  outline: 3px solid #ffb703;
  outline-offset: 3px;
}

section {
  max-width: 1100px;
  margin: auto;
  padding: 70px 20px;
  scroll-margin-top: 110px;
}
</style>
