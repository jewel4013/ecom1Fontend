<template>
    <div class="form-card">
        <h2 style="margin-top: 0">Login form</h2>
        <div class="row">
            <div>
                <label for="">Email</label>
                <input type="text" v-model="email" />
            </div>
            <div style="display: flex; gap: 5rem;">
                <button @click="send" :disabled="auth.sending">
                    {{ auth.sending ? 'Sending...' : 'Send' }}
                </button>
            </div>
        </div>

        <hr>

        <div class="row">
            <div>
                <label for="">OTP</label>
                <input type="text" maxlength="6-digit code" />
            </div>
            <button>
                Verify & Login
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { userAuth } from '../../stores/auth';

    const auth = userAuth()

    const email = ref(auth.email || '')
    const otp = ref('')

    const send = () => {
        auth.sendOtp(email.value)
    }
</script>

