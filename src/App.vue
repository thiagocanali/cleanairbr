<template>
  <div id="app">
    <HeaderNav />

    <!-- Todas as sessões da Home estão aqui -->
    <HeroSection />
    <ServicesSection />
    <WhySection />
    <AboutSection />
    <ContactSection />
    <InstagramSection />
    <FloatingWhatsapp />

    <!-- Footer único -->
    <SiteFooter />
  </div>
</template>

<script>
import HeaderNav from "./components/HeaderNav.vue";
import HeroSection from "./components/HeroSection.vue";
import ServicesSection from "./components/ServicesSection.vue";
import WhySection from "./components/WhySection.vue";
import AboutSection from "./components/AboutSection.vue";
import ContactSection from "./components/ContactSection.vue";
import InstagramSection from "./components/InstagramSection.vue";
import SiteFooter from "./components/SiteFooter.vue";
import FloatingWhatsapp from "./components/FloatingWhatsapp.vue";

export default {
  name: "App",
  components: {
    HeaderNav,
    HeroSection,
    ServicesSection,
    WhySection,
    AboutSection,
    ContactSection,
    InstagramSection,
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
}

section {
  max-width: 1100px;
  margin: auto;
  padding: 70px 20px;
}
</style>
