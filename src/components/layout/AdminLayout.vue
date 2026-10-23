<template>
    <!-- সব admin পেজের জন্য একই header, sidebar, footer -->
    <header class="admin-header bg-white border-bottom sticky-top">
        <div class="container d-flex justify-content-between align-items-center py-3">
            <div class="d-flex align-items-center gap-3">
                <router-link class="h5 mb-0 text-decoration-none" :to="{ name: 'AdminDashboard' }">ecom1 Admin</router-link>
                <span class="muted-small">/ {{ route.meta.title }}</span>
            </div>
            <div class="d-flex align-items-center gap-2">
                <router-link class="btn btn-outline-secondary btn-sm" to="/">View site</router-link>
                <button class="btn btn-outline-danger btn-sm" @click="logout">Logout</button>
            </div>
        </div>
    </header>

    <main class="admin-wrap">
        <div class="container">
            <div class="row g-4">
                <!-- Sidebar -->
                <aside class="col-lg-3 sidebar">
                    <div class="sidebar-sticky">
                        <div class="card">
                            <div class="card-body">
                                <h6 class="mb-1">{{ auth.user?.name || 'Administrator' }}</h6>
                                <p class="mb-0 muted-small">{{ auth.user?.email }}</p>
                            </div>
                        </div>

                        <!-- active-class: যে পেজ খোলা, সেই লিংকে Bootstrap-এর 'active' ক্লাস বসবে -->
                        <nav class="list-group mt-3">
                            <router-link v-for="item in menu" :key="item.name" :to="{ name: item.name }"
                                class="list-group-item list-group-item-action" active-class="active">
                                {{ item.label }}
                            </router-link>
                        </nav>
                    </div>
                </aside>

                <!-- এখানে child route-এর পেজ বসবে -->
                <section class="col-lg-9 main">
                    <router-view></router-view>
                </section>
            </div>
        </div>
    </main>

    <footer class="bg-light py-3 mt-5">
        <div class="container text-center small">
            &copy; {{ new Date().getFullYear() }} ecom1 Admin
        </div>
    </footer>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { userAuth } from '../../stores/auth'

const auth = userAuth()
const route = useRoute()
const router = useRouter()

// name গুলো router/index.js-এর route name-এর সাথে মিলতে হবে
const menu = [
    { name: 'AdminDashboard', label: 'Overview' },
    { name: 'AdminOrders', label: 'Orders' },
    { name: 'AdminProducts', label: 'Products' },
    { name: 'AdminBrands', label: 'Brands' },
    { name: 'AdminCategories', label: 'Categories' },
    { name: 'AdminUsers', label: 'Users' },
    { name: 'AdminSettings', label: 'Settings' },
]

const logout = () => {
    auth.logout()
    router.push({ name: 'AdminLogin' })
}
</script>

<style scoped>
.admin-header {
    box-shadow: 0 2px 6px rgba(0, 0, 0, .06);
}

.admin-wrap {
    padding: 2.5rem 0;
}

.sidebar {
    min-width: 220px;
}

/* header-এর নিচে এসে sidebar আটকে থাকবে */
.sidebar-sticky {
    position: sticky;
    top: 88px;
}

@media (max-width: 767px) {
    .sidebar {
        order: 2;
    }

    /* মোবাইলে sidebar নিচে থাকে, তাই sticky বন্ধ */
    .sidebar-sticky {
        position: static;
    }

    .main {
        order: 1;
    }
}
</style>

<!-- scoped নেই: এই ক্লাসগুলো সব admin child পেজেও কাজ করবে -->
<style>
.muted-small {
    color: #6c757d;
    font-size: .9rem;
}
</style>
