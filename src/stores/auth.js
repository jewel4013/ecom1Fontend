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
        

    }
    
})