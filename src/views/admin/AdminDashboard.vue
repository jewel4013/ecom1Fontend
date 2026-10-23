<template>
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="mb-0">Overview</h3>
    </div>

    <p v-if="error" class="text-danger">{{ error }}</p>

    <!-- Stats -->
    <div class="row g-3 mb-4">
        <div v-for="stat in stats" :key="stat.label" class="col-md-3 col-6">
            <div class="card stat text-center">
                <div class="muted-small">{{ stat.label }}</div>
                <div class="h4 mt-2 mb-0">{{ loading ? '...' : stat.value }}</div>
            </div>
        </div>
    </div>

    <!-- Recent orders -->
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="mb-0">Recent Orders</h5>
                <router-link class="small" :to="{ name: 'AdminOrders' }">See all</router-link>
            </div>

            <p v-if="loading" class="mb-0">Loading...</p>
            <p v-else-if="!recentOrders.length" class="mb-0 muted-small">No orders yet.</p>

            <div v-else class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-light">
                        <tr>
                            <th>Invoice</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th class="text-end">Payable</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in recentOrders" :key="order.id">
                            <td class="small">{{ order.invoice_no }}</td>
                            <td>{{ order.user?.name || 'Unknown' }}</td>
                            <td>{{ formatDate(order.created_at) }}</td>
                            <td><span class="badge" :class="orderStatusClass[order.status]">{{ order.status }}</span></td>
                            <td class="text-end">{{ money(order.payable) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import http from '../../lib/http'
import { getErrorMessage, money, formatDate, orderStatusClass } from '../../lib/helpers'

const orders = ref([])
const productCount = ref(0)
const customerCount = ref(0)
const loading = ref(false)
const error = ref('')

// Canceled অর্ডার বাদ দিয়ে মোট আয়
const revenue = computed(() =>
    orders.value
        .filter((order) => order.status !== 'Canceled')
        .reduce((sum, order) => sum + Number(order.payable), 0)
)

const stats = computed(() => [
    { label: 'Total Orders', value: orders.value.length },
    { label: 'Revenue', value: money(revenue.value) },
    { label: 'Customers', value: customerCount.value },
    { label: 'Products', value: productCount.value },
])

// API আগে থেকেই latest() দিয়ে সাজানো, তাই প্রথম ৫টা = সবচেয়ে নতুন ৫টা
const recentOrders = computed(() => orders.value.slice(0, 5))

const fetchOverview = async () => {
    loading.value = true
    error.value = ''
    try {
        // তিনটা request একসাথে পাঠাচ্ছি, একটার জন্য আরেকটা অপেক্ষা করবে না
        const [ordersRes, productsRes, usersRes] = await Promise.all([
            http.get('admin/orders'),
            http.get('products'),
            http.get('users'),
        ])
        orders.value = ordersRes.data.data
        productCount.value = productsRes.data.data.length
        customerCount.value = usersRes.data.data.users.filter((user) => user.roles.includes('Customer')).length
    } catch (err) {
        error.value = getErrorMessage(err)
    } finally {
        loading.value = false
    }
}

onMounted(fetchOverview)
</script>

<style scoped>
.stat {
    padding: 1rem;
}
</style>
