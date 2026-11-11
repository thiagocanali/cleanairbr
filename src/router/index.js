import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Services from '../views/Services.vue';
import Gestao from '../views/Gestao.vue';
const routes=[
 {path:'/',name:'home',component:Home},
 {path:'/services',name:'services',component:Services},
 {path:'/gestao',name:'gestao',component:Gestao,meta:{private:true}},
];
const router=createRouter({history:createWebHistory(import.meta.env.BASE_URL),routes,scrollBehavior(to){return to.hash?{el:to.hash,behavior:'smooth'}:{top:0}}});
export default router;
