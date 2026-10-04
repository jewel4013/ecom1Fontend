import { defineStore } from 'pinia'
import http from '../lib/http'
import router from '../router'
import { toast } from 'vue3-toastify'
import { toText, getErrorMessage } from '../lib/helpers'

export const userAuth = defineStore('auth', {
    state: () => ({
        email: '',
        access_token: localStorage.getItem('access_token'),

        sending: false,
        sendMessage: '',
        sendError: false,

        otpSent: false,

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
                this.otpSent = true
            } catch (error) {
                this.sendMessage = getErrorMessage(error)
                this.sendError = true
            } finally {
                this.sending = false
            }
        },

        async verifyOtp(email, otp) {
            this.verifing = true
            this.sendMessage = ''
            this.verifyError = false
            this.verifyMessage = ''            
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

                toast.success(res.data.message)
                await new Promise((resolve) => setTimeout(resolve, 2000)) // 2 second delay for better UX                                  
                router.push({ name: 'Dashboard' })
            } catch (error) {
                this.verifyMessage = getErrorMessage(error)
                this.verifyError = true
            } finally {
                this.verifing = false
            }
        },

        logout() {
            this.access_token = null
            this.email = ''
            this.otpSent = false

            localStorage.removeItem('access_token')
            toast.success("Logged out successfully")
            
        }

    }

})
