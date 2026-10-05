<template>
  <header class="navbar">
    <div class="nav-container">
      <router-link to="/" class="logo" @click="closeMenu">
        Clean<span>Air</span>
      </router-link>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="site-navigation"
        aria-label="Alternar menu de navegação"
        @click="menuOpen = !menuOpen"
      >
        <span></span><span></span><span></span>
      </button>

      <nav id="site-navigation" class="nav-links" :class="{ 'is-open': menuOpen }" aria-label="Navegação principal">
        <a class="nav-link" href="#hero" @click.prevent="goHome('hero')">Início</a>
        <router-link class="nav-link" to="/services" @click="closeMenu">Serviços</router-link>
        <a class="nav-link" href="#why" @click.prevent="goHome('why')">Por que escolher?</a>
        <a class="nav-link" href="#about" @click.prevent="goHome('about')">Sobre nós</a>
        <a class="nav-link nav-contact" href="#contact" @click.prevent="goHome('contact')">Contato</a>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderNav",
  data: () => ({ menuOpen: false }),
  methods: {
    closeMenu() { this.menuOpen = false; },
    async goHome(sectionId) {
      this.closeMenu();
      if (this.$route.path !== "/") await this.$router.push({ path: "/" });
      this.$nextTick(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" }));
    },
  },
};
</script>

<style scoped>
.navbar { position: sticky; top: 0; z-index: 1000; background: rgba(255,255,255,.94); border-bottom: 1px solid rgba(8,59,92,.1); backdrop-filter: blur(12px); }
.nav-container { width: min(1180px, 100%); min-height: 72px; margin: auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; }
.logo { color: var(--navy); font-size: 1.4rem; font-weight: 800; letter-spacing: -.06em; text-decoration: none; }
.logo span { color: var(--blue); }
.nav-links { display: flex; align-items: center; gap: 25px; }
.nav-link { color: #36505f; font-size: .9rem; font-weight: 600; text-decoration: none; transition: color 180ms ease; cursor: pointer; }
.nav-link:hover, .router-link-exact-active { color: var(--blue); }
.nav-contact { padding: 10px 14px; border: 1px solid #a9c8d7; border-radius: 6px; color: var(--navy); }
.nav-contact:hover { background: var(--sky); color: var(--navy); }
.menu-toggle { display: none; padding: 8px; border: 0; background: transparent; cursor: pointer; }
.menu-toggle span { display: block; width: 22px; height: 2px; margin: 4px; background: var(--navy); }
@media (max-width: 760px) {
  .nav-container { min-height: 64px; padding: 0 20px; }
  .menu-toggle { display: block; }
  .nav-links { display: none; position: absolute; top: 64px; right: 0; left: 0; padding: 12px 20px 20px; flex-direction: column; align-items: stretch; gap: 2px; background: #fff; border-bottom: 1px solid var(--line); box-shadow: 0 12px 20px rgba(8,59,92,.08); }
  .nav-links.is-open { display: flex; }
  .nav-link { padding: 12px 6px; font-size: 1rem; }
  .nav-contact { margin-top: 6px; text-align: center; }
}
</style>
