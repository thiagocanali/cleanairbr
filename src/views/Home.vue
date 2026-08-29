<template>
  <main class="home">
    <HeroSection />
    <ServicesSection />
    <WhySection />
    <AboutSection />
    <ContactSection />
    <InstagramSection />
  </main>
</template>

<script>
import HeroSection from "../components/HeroSection.vue";
import ServicesSection from "../components/ServicesSection.vue";
import WhySection from "../components/WhySection.vue";
import AboutSection from "../components/AboutSection.vue";
import ContactSection from "../components/ContactSection.vue";
import InstagramSection from "../components/InstagramSection.vue";

export default {
  name: "Home",
  components: {
    HeroSection,
    ServicesSection,
    WhySection,
    AboutSection,
    ContactSection,
    InstagramSection,
  },
};
</script>
