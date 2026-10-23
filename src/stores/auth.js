import { defineStore } from 'pinia'
import http from '../lib/http'
import router from '../router'
import { toast } from 'vue3-toastify'
import { toText, getErrorMessage } from '../lib/helpers'
import { useCart } from './cart'

export const userAuth = defineStore('auth', {
    state: () => ({
        email: '',
        access_token: localStorage.getItem('access_token'),
        // লগইনের পর user (name, email, roles) রাখি, যাতে বোঝা যায় কে Admin
        user: JSON.parse(localStorage.getItem('user') || 'null'),

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
        isAdmin: (check) => !!check.user?.roles?.includes('Admin'),
    },

    actions: {
        // isAdmin = true হলে admin-এর route-এ request যাবে
        async sendOtp(email, isAdmin = false) {
            this.sending = true
            this.sendMessage = ''
            this.sendError = false
            try {
                const url = isAdmin ? 'admin/login/otp' : 'login/otp'
                const res = await http.post(url, {
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

        async verifyOtp(email, otp, isAdmin = false) {
            this.verifing = true
            this.sendMessage = ''
            this.verifyError = false
            this.verifyMessage = ''
            try {
                const url = isAdmin ? 'admin/login' : 'login'
                const res = await http.post(url, {
                    email,
                    otp,
                })
                // token থাকে res.data.data.access_token এ। token না থাকলে লগইন ব্যর্থ ধরব
                const token = res.data.data?.access_token
                const user = res.data.data?.user

                console.log(user)


                if (!token) {
                    this.verifyMessage = toText(res.data.message) || 'Invalid OTP'
                    this.verifyError = true
                    return
                }
                this.email = email
                this.access_token = token
                localStorage.setItem('access_token', token)
                this.user = user
                localStorage.setItem('user', JSON.stringify(user))
                await useCart().fetchCarts()

                toast.success(res.data.message)
                await new Promise((resolve) => setTimeout(resolve, 2000)) // 2 second delay for better UX                                  
                router.push({ name: isAdmin ? 'AdminDashboard' : 'Dashboard' })

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
            this.user = null
            localStorage.removeItem('user')
            useCart().$reset()
            toast.success("Logged out successfully")
            
        }

    }

})
