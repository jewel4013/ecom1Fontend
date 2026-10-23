<template>
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="mb-0">Users</h3>
        <button v-if="!showForm" class="btn btn-primary btn-sm" @click="openCreate">+ Add User</button>
    </div>

    <!-- একই ফর্ম দিয়ে নতুন ইউজার বানানো ও Edit, দুটোই হয় -->
    <div v-if="showForm" class="card mb-4" :class="{ 'border-primary': editingId }">
        <div class="card-body">
            <h5 class="card-title mb-1">{{ editingId ? 'Edit user' : 'Create new user' }}</h5>
            <p class="muted-small mb-3">ইউজার নিজের ইমেইলে OTP দিয়ে লগইন করবে, তাই password লাগবে না।</p>

            <form @submit.prevent="saveUser">
                <div class="row g-3">
                    <div class="col-md-5">
                        <label class="form-label small">Name</label>
                        <input v-model.trim="form.name" class="form-control form-control-sm"
                            :class="{ 'is-invalid': errors.name }" placeholder="Full name" required>
                        <div class="invalid-feedback">{{ errors.name?.[0] }}</div>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label small">Email</label>
                        <input v-model.trim="form.email" type="email" class="form-control form-control-sm"
                            :class="{ 'is-invalid': errors.email }" placeholder="user@example.com" required>
                        <div class="invalid-feedback">{{ errors.email?.[0] }}</div>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label small">Role</label>
                        <!-- নিজের রোল বদলানো যাবে না (backend-ও আটকায়) -->
                        <select v-model="form.role" class="form-select form-select-sm"
                            :class="{ 'is-invalid': errors.role }" :disabled="isSelf(editingId)">
                            <option value="Customer">Customer</option>
                            <option value="Admin">Admin</option>
                        </select>
                        <div class="invalid-feedback">{{ errors.role?.[0] }}</div>
                    </div>
                </div>

                <div v-if="form.role === 'Admin' && !isSelf(editingId)" class="alert alert-warning py-2 small mt-3 mb-0">
                    This user will get full access to the admin panel.
                </div>

                <div class="mt-3 d-flex gap-2">
                    <button type="submit" class="btn btn-primary btn-sm" :disabled="saving">
                        <template v-if="saving">Saving...</template>
                        <template v-else>{{ editingId ? 'Update User' : 'Create User' }}</template>
                    </button>
                    <button type="button" class="btn btn-outline-secondary btn-sm" @click="closeForm">Cancel</button>
                </div>
            </form>
        </div>
    </div>

    <!-- role অনুযায়ী ফিল্টার -->
    <div class="btn-group btn-group-sm mb-3">
        <button v-for="tab in filterTabs" :key="tab" class="btn"
            :class="filter === tab ? 'btn-dark' : 'btn-outline-dark'" @click="filter = tab">
            {{ tab }} ({{ countByRole(tab) }})
        </button>
    </div>

    <div class="card">
        <div class="card-body">
            <p v-if="loading" class="mb-0">Loading...</p>
            <p v-else-if="loadError" class="mb-0 text-danger">{{ loadError }}</p>
            <p v-else-if="!filteredUsers.length" class="mb-0 muted-small">No users found.</p>

            <div v-else class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-light">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Joined</th>
                            <th class="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in filteredUsers" :key="user.id" :class="{ 'table-primary': editingId === user.id }">
                            <td>
                                {{ user.name }}
                                <span v-if="isSelf(user.id)" class="muted-small">(you)</span>
                            </td>
                            <td>{{ user.email }}</td>
                            <td>
                                <span v-for="role in user.roles" :key="role" class="badge me-1"
                                    :class="role === 'Admin' ? 'bg-danger' : 'bg-secondary'">
                                    {{ role }}
                                </span>
                            </td>
                            <td class="muted-small">{{ formatDate(user.created_at) }}</td>
                            <td class="text-end text-nowrap">
                                <button class="btn btn-outline-primary btn-sm me-1" @click="startEdit(user)">Edit</button>
                                <!-- নিজেকে ডিলিট করা যাবে না -->
                                <button class="btn btn-outline-danger btn-sm" :disabled="isSelf(user.id) || deletingId === user.id"
                                    @click="deleteUser(user)">
                                    {{ deletingId === user.id ? '...' : 'Delete' }}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import http from '../../lib/http'
import { userAuth } from '../../stores/auth'
import { getErrorMessage, toText, formatDate } from '../../lib/helpers'

const auth = userAuth()
const isSelf = (id) => !!id && id === auth.user?.id

const users = ref([])
const loading = ref(false)
const loadError = ref('')

// ---------- লিস্ট ও ফিল্টার ----------
const filterTabs = ['All', 'Admin', 'Customer']
const filter = ref('All')

const countByRole = (role) =>
    role === 'All' ? users.value.length : users.value.filter((u) => u.roles.includes(role)).length

const filteredUsers = computed(() =>
    filter.value === 'All' ? users.value : users.value.filter((u) => u.roles.includes(filter.value))
)

const fetchUsers = async () => {
    loading.value = true
    loadError.value = ''
    try {
        const res = await http.get('users')
        users.value = res.data.data.users
    } catch (err) {
        loadError.value = getErrorMessage(err)
    } finally {
        loading.value = false
    }
}

// ---------- ফর্ম (Create + Edit) ----------
const showForm = ref(false)
const saving = ref(false)
// null হলে নতুন ইউজার বানাচ্ছি, id থাকলে সেই ইউজার Edit করছি
const editingId = ref(null)
const emptyForm = () => ({ name: '', email: '', role: 'Customer' })
const form = reactive(emptyForm())
// Laravel validation error: { email: ['The email has already been taken.'] }
const errors = ref({})

const openCreate = () => {
    editingId.value = null
    Object.assign(form, emptyForm())
    errors.value = {}
    showForm.value = true
}

const startEdit = (user) => {
    editingId.value = user.id
    Object.assign(form, {
        name: user.name,
        email: user.email,
        role: user.roles.includes('Admin') ? 'Admin' : 'Customer',
    })
    errors.value = {}
    showForm.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' }) // ফর্মটা উপরে, তাই সেখানে নিয়ে যাই
}

const closeForm = () => {
    showForm.value = false
    editingId.value = null
    errors.value = {}
}

const saveUser = async () => {
    saving.value = true
    errors.value = {}
    try {
        const payload = { ...form }
        // নিজেকে Edit করলে role পাঠাই না, যাতে ভুল করেও নিজের রোল না বদলায়
        if (isSelf(editingId.value)) delete payload.role

        const res = editingId.value
            ? await http.put(`users/${editingId.value}`, payload)
            : await http.post('users', payload)

        const saved = res.data.data.user
        if (editingId.value) {
            // লিস্টে পুরনো ইউজারকে নতুন তথ্য দিয়ে বদলে দিই
            const index = users.value.findIndex((u) => u.id === saved.id)
            if (index !== -1) users.value[index] = saved
        } else {
            // নতুন ইউজারকে লিস্টের একদম উপরে বসাই, আবার API কল করতে হবে না
            users.value.unshift(saved)
        }

        toast.success(toText(res.data.message))
        closeForm()
    } catch (err) {
        if (err.response?.status === 422) {
            errors.value = err.response.data.errors || {}
        } else {
            toast.error(getErrorMessage(err))
        }
    } finally {
        saving.value = false
    }
}

// ---------- Delete ----------
const deletingId = ref(null)

const deleteUser = async (user) => {
    // backend-এ invoices টেবিল onDelete('cascade'), তাই ইউজারের অর্ডারও মুছে যাবে
    const ok = confirm(`Delete "${user.name}"?\n\nThis user's orders, cart and wishlist will also be deleted. This cannot be undone.`)
    if (!ok) return

    deletingId.value = user.id
    try {
        const res = await http.delete(`users/${user.id}`)
        users.value = users.value.filter((u) => u.id !== user.id)
        if (editingId.value === user.id) closeForm()
        toast.success(toText(res.data.message))
    } catch (err) {
        toast.error(getErrorMessage(err))
    } finally {
        deletingId.value = null
    }
}

onMounted(fetchUsers)
</script>
