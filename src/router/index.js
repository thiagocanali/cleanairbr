import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Services from "../views/Services.vue";
import Admin from "../views/Admin.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/services", name: "services", component: Services },
  { path: "/admin", name: "admin", component: Admin },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
