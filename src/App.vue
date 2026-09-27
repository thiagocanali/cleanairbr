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
  components: {
    HeaderNav,
    SiteFooter,
    FloatingWhatsapp,
  },
};
</script>

<style>
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
