<template>
  <a
    v-if="showButton"
    href="https://wa.me/554791223570?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20atendimento%20da%20CleanAir"
    class="whatsapp-button"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Fale com a CleanAir pelo WhatsApp (abre em nova aba)"
  >
    <img src="https://cdn-icons-png.flaticon.com/512/4423/4423697.png" alt="" />
  </a>
</template>

<script>
export default {
  name: "FloatingWhatsapp",
  computed: {
    showButton() {
      return !["/admin", "/clients", "/equipment", "/gestao"].some(\n        (prefix) => this.$route.path === prefix || this.$route.path.startsWith(prefix + "/")\n      ) && !this.$route.meta.private;
    },
  },
};
</script>

<style>
.whatsapp-button {
  position: fixed;
  right: calc(16px + env(safe-area-inset-right, 0px));
  bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  width: 56px;
  height: 56px;
  background: #25d366;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  animation: none;
  z-index: 30;
}

.whatsapp-button img {
  width: 38px;
}

@media (max-width: 480px) {
  .whatsapp-button {
    width: 50px;
    height: 50px;
  }

  .whatsapp-button img {
    width: 30px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .whatsapp-button {
    animation: none;
    transition: none;
  }
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
