<template>
<header class="navbar"><div class="nav-container"><router-link to="/" class="logo" @click="closeMenu">Clean<span>Air</span><i>.</i></router-link>
<button class="menu-toggle" type="button" :aria-expanded="menuOpen" aria-controls="site-navigation" :aria-label="menuOpen?'Fechar menu':'Abrir menu'" @click="menuOpen=!menuOpen"><span></span><span></span><span></span></button>
<nav id="site-navigation" class="nav-links" :class="{'is-open':menuOpen}" aria-label="Navegação principal">
<a href="/#hero" @click.prevent="goHome('hero')">Início</a><router-link to="/services" @click="closeMenu">Serviços</router-link><a href="/#why" @click.prevent="goHome('why')">Diferenciais</a><a href="/#about" @click.prevent="goHome('about')">Sobre nós</a><a class="nav-cta" href="https://wa.me/554791223570?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento." target="_blank" rel="noopener noreferrer" @click="closeMenu">Pedir orçamento <span aria-hidden="true">↗</span></a>
</nav></div></header>
</template>
<script setup>
import {ref,nextTick} from 'vue';
import {useRoute,useRouter} from 'vue-router';
const menuOpen=ref(false),route=useRoute(),router=useRouter();
const closeMenu=()=>{menuOpen.value=false};
const goHome=async(id)=>{closeMenu();if(route.path!=='/')await router.push('/');await nextTick();document.getElementById(id)?.scrollIntoView({behavior:'smooth'})};
</script>
<style scoped>
.navbar{position:sticky;top:0;z-index:1000;background:#fffefdf5;border-bottom:1px solid #dce8ec;backdrop-filter:blur(16px)}.nav-container{max-width:1240px;min-height:80px;margin:auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;gap:24px}.logo{color:#12384b;font-family:Manrope,sans-serif;font-size:1.62rem;font-weight:850;letter-spacing:-.085em;text-decoration:none}.logo span{color:#0985a0}.logo i{font-style:normal;color:#1da8bd}.nav-links{display:flex;align-items:center;gap:30px}.nav-links>a{font-size:.9rem;font-weight:700;color:#466272;text-decoration:none;transition:color .18s}.nav-links>a:hover{color:#087e9b}.nav-links .nav-cta{display:inline-flex;align-items:center;gap:20px;padding:13px 18px;background:#102f43;color:#fff;border-radius:8px}.nav-links .nav-cta:hover{background:#087e9b;color:#fff}.menu-toggle{display:none;border:0;background:transparent;padding:10px;cursor:pointer}.menu-toggle span{display:block;width:23px;height:2px;background:#12384b;margin:5px 0}@media(max-width:850px){.nav-container{min-height:68px;padding:0 20px}.menu-toggle{display:block}.nav-links{display:none;position:absolute;top:68px;left:0;right:0;flex-direction:column;align-items:stretch;gap:0;background:#fff;padding:14px 20px 24px;box-shadow:0 18px 25px #092e401a}.nav-links.is-open{display:flex}.nav-links>a{padding:14px 8px}.nav-links .nav-cta{justify-content:space-between;margin-top:10px;padding:16px}}
</style>