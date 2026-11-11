<template><div id="app"><HeaderNav/><router-view/><SiteFooter/><FloatingWhatsapp/></div></template>
<script setup>
import HeaderNav from './components/HeaderNav.vue';
import SiteFooter from './components/SiteFooter.vue';
import FloatingWhatsapp from './components/FloatingWhatsapp.vue';
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap');
:root{--navy:#102f43;--blue:#087e9b;--sky:#e9f3f5;--ink:#17394b;--muted:#617985;--line:#d9e7eb;--surface:#fff;--page:#f7fafb;--whatsapp:#198d55}
*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:88px}body{margin:0;min-width:320px;font-family:'DM Sans',Arial,sans-serif;background:var(--page);color:var(--ink);-webkit-font-smoothing:antialiased}h1,h2,h3,h4{font-family:Manrope,'DM Sans',sans-serif}a{color:inherit}section{padding:100px 24px}.section-inner{width:min(1120px,100%);margin:auto}.section-label{margin:0 0 15px;color:var(--blue);font-size:.75rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase}.section-title{max-width:700px;margin:0;color:var(--navy);font-size:clamp(2.1rem,4vw,3.6rem);font-weight:800;letter-spacing:-.065em;line-height:1.12}.section-intro{max-width:610px;margin:20px 0 0;color:var(--muted);font-size:1.05rem;line-height:1.8}.button-primary{display:inline-flex;align-items:center;justify-content:center;gap:14px;min-height:50px;padding:14px 22px;border-radius:9px;background:var(--whatsapp);color:#fff;font-weight:800;text-decoration:none;transition:background-color .18s,transform .18s}.button-primary:hover{background:#107445;transform:translateY(-2px)}a:focus-visible,button:focus-visible{outline:3px solid #3db8d2;outline-offset:4px}@media(max-width:640px){section{padding:72px 20px}.section-intro{font-size:1rem}}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*:before,*:after{transition-duration:.01ms!important;animation-duration:.01ms!important}}
</style>