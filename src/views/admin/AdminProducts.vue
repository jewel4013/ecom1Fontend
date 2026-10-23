<template>
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="mb-0">Products</h3>
        <div class="muted-small">Total: {{ products.length }}</div>
    </div>

    <div class="card">
        <div class="card-body">
            <p v-if="loading" class="mb-0">Loading...</p>
            <p v-else-if="error" class="mb-0 text-danger">{{ error }}</p>
            <p v-else-if="!products.length" class="mb-0 muted-small">No products found.</p>

            <div v-else class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-light">
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Remark</th>
                            <th>Stock</th>
                            <th class="text-end">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product.id">
                            <td>
                                <img v-if="product.image" :src="imageUrl(product.image)" :alt="product.title" class="thumb">
                            </td>
                            <td>{{ product.title }}</td>
                            <td>{{ product.category?.name || '-' }}</td>
                            <td>{{ product.brand?.name || '-' }}</td>
                            <td class="text-capitalize">{{ product.remark }}</td>
                            <td>
                                <span class="badge" :class="product.stock ? 'bg-success' : 'bg-danger'">
                                    {{ product.stock ? 'In stock' : 'Out of stock' }}
                                </span>
                            </td>
                            <td class="text-end">
                                <!-- ছাড় থাকলে আসল দাম কেটে ছাড়ের দাম দেখাব -->
                                <template v-if="product.discount_price">
                                    <del class="muted-small">{{ money(product.price) }}</del><br>
                                    {{ money(product.discount_price) }}
                                </template>
                                <template v-else>{{ money(product.price) }}</template>
                            </td>
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
import { getErrorMessage, imageUrl, money } from '../../lib/helpers'

const products = ref([])
const loading = ref(false)
const error = ref('')

const fetchProducts = async () => {
    loading.value = true
    error.value = ''
    try {
        const res = await http.get('products')
        products.value = res.data.data
    } catch (err) {
        error.value = getErrorMessage(err)
    } finally {
        loading.value = false
    }
}

onMounted(fetchProducts)
</script>

<style scoped>
.thumb {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 4px;
}
</style>
