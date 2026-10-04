import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'


createApp(App).use(createPinia()).use(router).use(Vue3Toastify, {
    position: "top-right",
    autoClose: 1500,
}).mount('#app')
