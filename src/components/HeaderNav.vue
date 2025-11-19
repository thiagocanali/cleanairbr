<template>
  <header class="navbar">
    <div class="nav-container">
      <h1 class="logo">CleanAir</h1>

      <nav class="nav-links">
        <a href="#hero">Início</a>
        <a href="#services">Serviços</a>
        <a href="#why">Por que escolher?</a>
        <a href="#about">Sobre Nós</a>
        <a href="#contact">Contato</a>
      </nav>
    </div>
  </header>
</template>

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
  padding: 0 22px;
}

.logo {
  font-size: 26px;
  font-weight: 700;
  color: #0056c7;
}

.nav-links a {
  margin-left: 24px;
  text-decoration: none;
  font-weight: 500;
  color: #222;
  transition: 0.3s;
}

.nav-links a:hover {
  color: #0056c7;
}
</style>
