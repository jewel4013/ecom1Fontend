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
    meta: { guestOnly: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// auth store এখানে import করলে circular import হয় (store-ও router import করে), তাই localStorage থেকে পড়ছি
router.beforeEach((to) => {
  const loggedIn = !!localStorage.getItem("access_token");

  if (to.meta.guestOnly && loggedIn) return { name: "Profile" };
  if (to.meta.requiresAuth && !loggedIn) return { name: "Login" };
});

export default router;

