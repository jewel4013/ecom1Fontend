<template>
    <div class="form-card">
        <h2 style="margin-top: 0">Login form</h2>
        <div class="row">
            <div>
                <label for="email">Email</label>
                <input id="email" type="email" v-model="email" placeholder="you@example.com" />
            </div>
            <div style="display: flex; gap: 1rem; align-items: center;">
                <button @click="send" :disabled="auth.sending">
                    {{ auth.sending ? 'Sending...' : 'Send' }}
                </button>
                <span v-if="auth.sendMessage" :class="auth.sendError ? 'msg-error' : 'msg-success'">
                    {{ auth.sendMessage }}
                </span>
            </div>
        </div>

        <hr>

        <div class="row">
            <div>
                <label for="otp">OTP</label>
                <input id="otp" v-model="otp" type="text" maxlength="6" placeholder="6-digit code" />
            </div>
            <div style="display: flex; gap: 1rem; align-items: center;">
                <button @click="verify" :disabled="auth.verifing">
                    {{ auth.verifing ? 'Verifying...' : 'Verify & Login' }}
                </button>
                <span v-if="auth.verifyMessage" :class="auth.verifyError ? 'msg-error' : 'msg-success'">
                    {{ auth.verifyMessage }}
                </span>
            </div>
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
    const verify = () => {
        auth.verifyOtp(email.value, otp.value)
    }
</script>

<style scoped>
.msg-success {
    color: green;
}
.msg-error {
    color: red;
}
</style>
