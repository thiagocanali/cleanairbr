<template>
  <a
    href="https://wa.me/554791223570?text=Olá,+gostaria+de+solicitar+um+atendimento+da+CleanAir"
    class="whatsapp-button"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src="https://cdn-icons-png.flaticon.com/512/4423/4423697.png" alt="WhatsApp" />
  </a>
</template>

<style>
.whatsapp-button {
  position: fixed;
  bottom: 25px;
  right: 25px;
  width: 65px;
  height: 65px;
  background: #25d366;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  animation: float 3s ease-in-out infinite;
  z-index: 9999;
}

.whatsapp-button img {
  width: 38px;
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
