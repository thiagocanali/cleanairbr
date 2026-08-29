<template>
  <header class="navbar">
    <div class="nav-container">
      <router-link to="/" class="logo">CleanAir</router-link>

      <nav class="nav-links">
        <a class="nav-link" @click.prevent="goHome('hero')" href="/#hero">Início</a>
        <router-link class="nav-link" to="/services">Serviços</router-link>
        <a class="nav-link" @click.prevent="goHome('why')" href="/#why">Por que escolher?</a>
        <a class="nav-link" @click.prevent="goHome('about')" href="/#about">Sobre Nós</a>
        <a class="nav-link" @click.prevent="goHome('contact')" href="/#contact">Contato</a>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderNav",
  methods: {
    async goHome(sectionId) {
      if (this.$route.path === "/") {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        return;
      }
      await this.$router.push({ path: "/", hash: `#${sectionId}` });
      this.$nextTick(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      });
    },
  },
};
</script>

<style>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 18px 0;
  backdrop-filter: blur(14px);
  background: rgba(255, 255, 255, 0.7);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  z-index: 999;
}

.nav-container {
  max-width: 1150px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logo {
  font-size: 26px;
  font-weight: 700;
  color: #0056c7;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 25px;
}

.nav-links .nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: 0.3s;
  cursor: pointer;
}

.nav-links .nav-link:hover {
  color: #005baa;
}

.nav-links .nav-link.router-link-exact-active {
  color: #005baa;
}
</style>
