<template>
  <a
    :href="whatsLink"
    target="_blank"
    rel="noopener noreferrer"
    class="whatsapp-button"
  >
    <img src="/whatsapp-icon.svg" alt="WhatsApp" />
    Fale Conosco
  </a>
</template>

<script>
export default {
  name: "WhatsAppButton",
  computed: {
    whatsLink() {
      const number = "554791223570";
      const message = encodeURIComponent(
        "Olá! Vim pelo site da CleanAir e gostaria de mais informações."
      );
      return `https://wa.me/${number}?text=${message}`;
    }
  }
};
</script>

<style scoped>
.whatsapp-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
  background: #25d366;
  color: #fff;
  padding: 12px 20px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  font-size: 16px;
  text-decoration: none;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
}
.whatsapp-button:hover {
  transform: scale(1.05);
}
.whatsapp-button img {
  width: 24px;
  height: 24px;
}
</style>