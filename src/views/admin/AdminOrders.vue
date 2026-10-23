<template>
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="mb-0">Orders</h3>
        <div class="muted-small">Total: {{ orders.length }}</div>
    </div>

    <div class="card">
        <div class="card-body">
            <p v-if="loading" class="mb-0">Loading...</p>
            <p v-else-if="error" class="mb-0 text-danger">{{ error }}</p>
            <p v-else-if="!orders.length" class="mb-0 muted-small">No orders yet.</p>

            <div v-else class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-light">
                        <tr>
                            <th>Invoice</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th class="text-end">Payable</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orders" :key="order.id">
                            <td class="small">{{ order.invoice_no }}</td>
                            <td>
                                {{ order.user?.name || 'Unknown' }}
                                <div class="muted-small">{{ order.user?.email }}</div>
                            </td>
                            <td>{{ formatDate(order.created_at) }}</td>
                            <td><span class="badge" :class="orderStatusClass[order.status]">{{ order.status }}</span></td>
                            <td><span class="badge" :class="paymentStatusClass[order.payment_status]">{{ order.payment_status }}</span></td>
                            <td class="text-end">{{ money(order.payable) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import http from '../../lib/http'
import { getErrorMessage, money, formatDate, orderStatusClass, paymentStatusClass } from '../../lib/helpers'

const orders = ref([])
const loading = ref(false)
const error = ref('')

const fetchOrders = async () => {
    loading.value = true
    error.value = ''
    try {
        const res = await http.get('admin/orders')
        orders.value = res.data.data
    } catch (err) {
        error.value = getErrorMessage(err)
    } finally {
        loading.value = false
    }
}

onMounted(fetchOrders)
</script>
