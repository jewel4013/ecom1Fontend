import { createRouter, createWebHistory } from "vue-router";
import Profile from "../views/Profile.vue";
import Login from "../views/Auth/Login.vue";

const routes = [
  {
    path: "/",
    redirect: { name: "Login" },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

