import { defineStore } from 'pinia'
import http from '../lib/http'
import router from '../router'

// Laravel কখনো message পাঠায় array হিসেবে (["OTP sent successfully"]), কখনো string হিসেবে
const toText = (message) =>
    Array.isArray(message) ? message.join(', ') : message

// সার্ভার বন্ধ/নেটওয়ার্ক এরর হলে error.response থাকে না, তাই ডিফল্ট মেসেজ
const getErrorMessage = (error) =>
    toText(error.response?.data?.message) || 'Something went wrong. Please try again.'

export const userAuth = defineStore('auth', {
    state: () => ({
        email: '',
        access_token: localStorage.getItem('access_token'),

        sending: false,
        sendMessage: '',
        sendError: false,

        verifing: false,
        verifyMessage: '',
        verifyError: false,
    }),

    getters: {
        isAuthenticated: (check) => !!check.access_token,
    },

    actions: {
        async sendOtp(email) {
            this.sending = true
            this.sendMessage = ''
            this.sendError = false
            try {
                const res = await http.post('login/otp', {
                    email,
                })
                this.email = email
                this.sendMessage = toText(res.data.message)
            } catch (error) {
                this.sendMessage = getErrorMessage(error)
                this.sendError = true
            } finally {
                this.sending = false
            }
        },

        async verifyOtp(email, otp) {
            this.verifing = true
            this.verifyMessage = ''
            this.verifyError = false
            try {
                const res = await http.post('login', {
                    email,
                    otp,
                })
                // token থাকে res.data.data.access_token এ। token না থাকলে লগইন ব্যর্থ ধরব
                const token = res.data.data?.access_token
                if (!token) {
                    this.verifyMessage = toText(res.data.message) || 'Invalid OTP'
                    this.verifyError = true
                    return
                }
                this.email = email
                this.access_token = token
                localStorage.setItem('access_token', token)
                router.push({ name: 'Profile' })
            } catch (error) {
                this.verifyMessage = getErrorMessage(error)
                this.verifyError = true
            } finally {
                this.verifing = false
            }
        },

    }

})
