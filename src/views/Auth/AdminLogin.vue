<template>
    <!-- START ADMIN LOGIN SECTION -->
    <div class="login_register_wrap section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-6 col-md-10">
                    <div class="login_wrap">
                        <div class="padding_eight_all bg-white">
                            <div class="heading_s1">
                                <h3>Admin Login</h3>
                            </div>
                            <p class="admin-note">This login is only for Admins.</p>
                            <form @submit.prevent="send">
                                <div class="form-group mb-3">
                                    <input v-model="email" type="email" class="form-control" name="email" placeholder="Admin Email" required>
                                </div>
                                <div class="form-group mb-3">
                                    <button :disabled="auth.sending" class="btn btn-fill-out btn-block" type="submit">
                                        {{ auth.sending ? 'Sending...' : 'Send OTP' }}
                                    </button>
                                    <span v-if="auth.sendMessage" :class="auth.sendError ? 'msg-error' : 'msg-success'">
                                        {{ auth.sendMessage }}
                                    </span>
                                </div>
                            </form>
                            <form @submit.prevent="verify" v-if="auth.otpSent">
                                <p>Enter the OTP sent to your email address.</p>
                                <div class="form-group mb-3">
                                    <input v-model="otp" class="form-control" placeholder="6-digit OTP" maxlength="6">
                                </div>
                                <div class="form-group mb-3">
                                    <button :disabled="auth.verifing" type="submit" class="btn btn-fill-out btn-block">
                                        {{ auth.verifing ? 'Verifying...' : 'Verify & Login' }}
                                    </button>
                                    <span v-if="auth.verifyMessage" :class="auth.verifyError ? 'msg-error' : 'msg-success'">
                                        {{ auth.verifyMessage }}
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END ADMIN LOGIN SECTION -->

</template>

<script setup>
import { ref } from 'vue';
import { userAuth } from '../../stores/auth';

const auth = userAuth()

const email = ref(auth.email || '')
const otp = ref('')

// শেষে true পাঠালে store admin-এর route-এ request পাঠাবে
const send = () => {
    auth.sendOtp(email.value, true)
}
const verify = () => {
    auth.verifyOtp(email.value, otp.value, true)
}
</script>

<style scoped>
.admin-note {
    color: #b02a37;
    font-weight: 600;
}

.msg-success {
    color: green;
}

.msg-error {
    color: red;
}
</style>
