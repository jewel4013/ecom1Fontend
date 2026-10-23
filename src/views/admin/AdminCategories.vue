<template>
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="mb-0">Categories</h3>
        <div class="muted-small">Total: {{ categories.length }}</div>
    </div>

    <div class="card">
        <div class="card-body">
            <p v-if="loading" class="mb-0">Loading...</p>
            <p v-else-if="error" class="mb-0 text-danger">{{ error }}</p>
            <p v-else-if="!categories.length" class="mb-0 muted-small">No categories found.</p>

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
                        <tr v-for="(category, index) in categories" :key="category.id">
                            <td>{{ index + 1 }}</td>
                            <td>
                                <img v-if="category.image" :src="category.image" :alt="category.name" class="thumb">
                                <span v-else class="muted-small">No image</span>
                            </td>
                            <td>{{ category.name }}</td>
                            <td class="muted-small">{{ new Date(category.created_at).toLocaleDateString() }}</td>
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

const categories = ref([])
const loading = ref(false)
const error = ref('')

const fetchCategories = async () => {
    loading.value = true
    error.value = ''
    try {
        const res = await http.get('categories')
        categories.value = res.data.data
    } catch (err) {
        error.value = getErrorMessage(err)
    } finally {
        loading.value = false
    }
}

// পেজ খোলার সাথে সাথে ডেটা আনবে
onMounted(fetchCategories)
</script>

<style scoped>
.thumb {
    width: 48px;
    height: 48px;
    object-fit: contain;
}
</style>
