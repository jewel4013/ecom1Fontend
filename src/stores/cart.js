import { defineStore } from 'pinia'
import http from '../lib/http'

export const useCart = defineStore('cart', {
    state: () => ({
        carts: [],
    }),

    getters: {
        subtotal: (state) =>
            state.carts.reduce((sum, i) => sum + i.quantity * Number(i.product.price), 0),
    },

    actions: {
        async fetchCarts() {
            const res = await http.get('/cart')
            this.carts = res.data.data
        },
        async removeCart(cartId) {
            await http.delete('/cart', {
                data: { cart_id: cartId },
            })
            this.carts = this.carts.filter((i) => i.id !== cartId)
        }
    },
})
