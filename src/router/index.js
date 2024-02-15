import { createRouter, createWebHistory } from "vue-router";
//import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/login/MyLogin.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/login/MyRegister.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
