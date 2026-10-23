import { createRouter, createWebHistory } from "vue-router";
import Profile from "../views/Profile.vue";
import Login from "../views/Auth/Login.vue";
import Home from "../views/home.vue";
import Dashboard from "../views/dashboard/myDashboard.vue";
import { toast } from "vue3-toastify";
import Wishlist from "../views/Auth/wishlist.vue";
import Carts from "../views/Auth/carts.vue";
import AdminLogin from "../views/Auth/AdminLogin.vue";
import AdminLayout from "../components/layout/AdminLayout.vue";
import AdminDashboard from "../views/admin/AdminDashboard.vue";
import AdminOrders from "../views/admin/AdminOrders.vue";
import AdminProducts from "../views/admin/AdminProducts.vue";
import AdminBrands from "../views/admin/AdminBrands.vue";
import AdminCategories from "../views/admin/AdminCategories.vue";
import AdminUsers from "../views/admin/AdminUsers.vue";
import AdminSettings from "../views/admin/AdminSettings.vue";
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
    path: "/admin/login",
    name: "AdminLogin",
    component: AdminLogin,
    meta: { guestOnly: true },
  },
  {
    // parent route: AdminLayout (header + sidebar), ভেতরে children পেজ বসবে
    path: "/admin",
    component: AdminLayout,
    redirect: { name: "AdminDashboard" },
    // এই meta সব children-ও পাবে। adminLayout: সাইটের header/footer দেখাবে না
    meta: { requiresAuth: true, requiresAdmin: true, adminLayout: true },
    children: [
      { path: "dashboard", name: "AdminDashboard", component: AdminDashboard, meta: { title: "Overview" } },
      { path: "orders", name: "AdminOrders", component: AdminOrders, meta: { title: "Orders" } },
      { path: "products", name: "AdminProducts", component: AdminProducts, meta: { title: "Products" } },
      { path: "brands", name: "AdminBrands", component: AdminBrands, meta: { title: "Brands" } },
      { path: "categories", name: "AdminCategories", component: AdminCategories, meta: { title: "Categories" } },
      { path: "users", name: "AdminUsers", component: AdminUsers, meta: { title: "Users" } },
      { path: "settings", name: "AdminSettings", component: AdminSettings, meta: { title: "Settings" } },
    ],
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
  },
  {
    path: "/dashboard/my-account/carts",
    name: "Carts",
    component: Carts,
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

  if (to.meta.guestOnly && loggedIn) {
    toast.warning('You are already logged in!')
    return { name: "Profile" };
  }
  if (to.meta.requiresAuth && !loggedIn){
    toast.warning('Please login first!')
    return { name: to.meta.requiresAdmin ? "AdminLogin" : "Login" };
  }

  // Admin পেজে শুধু Admin ঢুকতে পারবে
  if (to.meta.requiresAdmin) {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user?.roles?.includes("Admin")) {
      toast.error('You are not authorized!')
      return { name: "Home" };
    }
  }

});

// router.beforeEach((to) => {
//   const authStore = userAuth();

//   if(to.meta.requiresAuth && !authStore.isAuthenticated) return { name: "Login" };
//   if(to.meta.guestOnly && authStore.isAuthenticated) return { name: "Profile" };
// })



export default router;

