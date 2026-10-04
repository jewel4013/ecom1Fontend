import { createRouter, createWebHistory } from "vue-router";
import Profile from "../views/Profile.vue";
import Login from "../views/Auth/Login.vue";
import Home from "../views/home.vue";
import Dashboard from "../views/dashboard/myDashboard.vue";
import { toast } from "vue3-toastify";
import Wishlist from "../views/Auth/wishlist.vue";
// import { userAuth } from "../stores/auth.js";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
  {
    path: "/dashboard/my-account",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard/my-account/wishlist",
    name: "Wishlist",
    component: Wishlist,
    meta: { requiresAuth: true },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// auth store এখানে import করলে circular import হয় (store-ও router import করে), তাই localStorage থেকে পড়ছি
router.beforeEach((to) => {
  const loggedIn = !!localStorage.getItem("access_token");

  if (to.meta.guestOnly && loggedIn) {
    toast.warning('You are already logged in!')
    return { name: "Profile" };
  }
  if (to.meta.requiresAuth && !loggedIn){
    toast.warning('Please login first!')
    return { name: "Login" };
  } 
    
});

// router.beforeEach((to) => {
//   const authStore = userAuth();

//   if(to.meta.requiresAuth && !authStore.isAuthenticated) return { name: "Login" };
//   if(to.meta.guestOnly && authStore.isAuthenticated) return { name: "Profile" };
// })



export default router;

