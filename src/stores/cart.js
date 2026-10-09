import { defineStore } from 'pinia'
import http from '../lib/http'
import { toast } from 'vue3-toastify';
import { toText, getErrorMessage } from '../lib/helpers';

export const useCart = defineStore('cart', {
    state: () => ({
        carts: [],
    }),

    getters: {
        subtotal: (state) =>
            state.carts.reduce((sum, i) => sum + i.quantity * Number(i.price), 0),
    },

    actions: {
        async fetchCarts() {
            const res = await http.get('/cart')
            this.carts = res.data.data
        },
        async removeCart(cartId) {
            try {
                const res =await http.delete('/cart', {
                    data: { cart_id: cartId },
                })
                this.carts = this.carts.filter((i) => i.id !== cartId)
                toast.success(toText(res.data.message))
            } catch (error) {
                toast.error(getErrorMessage(error))
            }

        },
        async updateQuantity(cart, quantity) {
            try {
                await http.put('/cart', {
                    cart_id: cart.id,
                    quantity,
                    size: cart.size,
                    color: cart.color,
                })
                cart.quantity = quantity
            } catch (error) {
                toast.error(getErrorMessage(error))
            }
        }
    },
})
