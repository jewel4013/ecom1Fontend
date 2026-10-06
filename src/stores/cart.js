import { defineStore } from 'pinia'
import http from '../lib/http'

export const useCart = defineStore('cart', {
    state: () => ({
        carts: [],
    }),

    getters: {
        subtotal: (state) =>
            state.carts.reduce((sum, cart) => sum + cart.quantity * Number(cart.product.price), 0),
    },

    actions: {
        async fetchCarts() {
            const res = await http.get('/cart')
            this.carts = res.data.data
        },
    },
})
