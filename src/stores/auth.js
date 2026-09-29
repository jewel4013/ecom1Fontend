import { defineStore } from 'pinia'
import http from '../lib/http'
import router from '../router'

export const userAuth = defineStore('auth', {
    state: () => ({
        email: '',
        access_token: localStorage.getItem('access_token'),
        sending: false,
        message: '',
        verifing: false,
    }),       

    getters: {
        isAuthenticated: (check) => !!check.access_token,
    },

    actions: {
        async sendOtp(email) {
            this.sending = true
            try {
                const res = await http.post('login/otp', {
                    email,
                })
                this.email = email
                this.message = res.data.message
                this.sending = false
            } catch (error) {
                this.message = error.response.data.message
                this.sending = false                
            }
        },

    }
    
})