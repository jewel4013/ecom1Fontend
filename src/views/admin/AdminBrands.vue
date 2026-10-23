<template>
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="mb-0">Brands</h3>
        <div class="muted-small">Total: {{ brands.length }}</div>
    </div>

    <div class="card">
        <div class="card-body">
            <p v-if="loading" class="mb-0">Loading...</p>
            <p v-else-if="error" class="mb-0 text-danger">{{ error }}</p>
            <p v-else-if="!brands.length" class="mb-0 muted-small">No brands found.</p>

            <div v-else class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-light">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(brand, index) in brands" :key="brand.id">
                            <td>{{ index + 1 }}</td>
                            <td>
                                <img v-if="brand.image" :src="brand.image" :alt="brand.name" class="thumb">
                                <span v-else class="muted-small">No image</span>
                            </td>
                            <td>{{ brand.name }}</td>
                            <td class="muted-small">{{ new Date(brand.created_at).toLocaleDateString() }}</td>
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
import { getErrorMessage } from '../../lib/helpers'

const brands = ref([])
const loading = ref(false)
const error = ref('')

const fetchBrands = async () => {
    loading.value = true
    error.value = ''
    try {
        const res = await http.get('brands')
        brands.value = res.data.data
    } catch (err) {
        error.value = getErrorMessage(err)
    } finally {
        loading.value = false
    }
}

// পেজ খোলার সাথে সাথে ডেটা আনবে
onMounted(fetchBrands)
</script>

<style scoped>
.thumb {
    width: 48px;
    height: 48px;
    object-fit: contain;
}
</style>
