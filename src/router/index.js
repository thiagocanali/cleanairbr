import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Services from '../views/Services.vue';

const routes=[
 {path:'/',name:'home',component:Home},
 {path:'/services',name:'services',component:Services},
 {path:'/gestao',name:'gestao',component:()=>import('../views/Gestao.vue'),meta:{private:true}},
];
const router=createRouter({history:createWebHistory(import.meta.env.BASE_URL),routes,scrollBehavior(to){return to.hash?{el:to.hash,behavior:'smooth'}:{top:0}}});
router.afterEach(to=>{
  const robots=document.querySelector('meta[name="robots"]');
  if(robots) robots.setAttribute('content',to.meta.private?'noindex, nofollow':'index, follow');
});
export default router;
