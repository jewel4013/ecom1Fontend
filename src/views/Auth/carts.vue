<template>
  <!-- START SECTION SHOP -->
  <div class="section">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="table-responsive shop_cart_table">
            <table class="table">
              <thead>
                <tr>
                  <th class="product-thumbnail">Banner</th>
                  <th class="product-name">Product</th>
                  <th class="product-stock-status">Stock Status</th>
                  <th class="product-price">Price</th>
                  <th class="product-quantity">Quantity</th>
                  <th class="product-subtotal">Total</th>
                  <th class="product-remove">Remove</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="cartStore.carts.length === 0">
                  <td colspan="6" class="text-center" style="color: #999; padding:50px;">No cart items found.</td>
                </tr>
                <tr v-for="cart in cartStore.carts" :key="cart.id">
                  <td class="product-thumbnail">
                    <a href="#"
                      ><img src="/assets/images/product_img1.jpg" alt="product1"
                    /></a>
                  </td>
                  <td class="product-name" data-title="Product">
                    <a href="#">{{ cart.product.title }}</a>
                  </td>
                  <td class="product-stock-status" data-title="Stock Status"><span class="badge rounded-pill text-bg-success">In Stock</span></td>
                  <td class="product-price" data-title="Price">৳{{ cart.price }}</td>
                  <td class="product-quantity" data-title="Quantity">
                    <div class="quantity">
                      <input type="button" value="-" class="minus" @click="decrement(cart)"/>
                      <input
                        name="quantity"
                        :value="cart.quantity"
                        title="Qty"
                        class="qty"
                        size="4"
                        readonly
                      />
                      <input type="button" value="+" class="plus" @click="increment(cart)"/>
                    </div>
                  </td>
                  <td class="product-subtotal" data-title="Total">৳{{ (cart.price * cart.quantity).toFixed(2) }}</td>
                  <td class="product-remove" data-title="Remove">
                    <a href="javascript:void(0)" @click.prevent="cartStore.removeCart(cart.id)"><i class="ti-close"></i></a>
                  </td>
                </tr>

                
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="6" class="px-0">
                    <div class="row g-0 align-items-center">
                      <div class="col-lg-4 col-md-6 mb-3 mb-md-0">
                        <div class="coupon field_form input-group">
                          <input
                            type="text"
                            value=""
                            class="form-control form-control-sm"
                            placeholder="Enter Coupon Code.."
                          />
                          <div class="input-group-append">
                            <button
                              class="btn btn-fill-out btn-sm"
                              type="submit"
                            >
                              Apply Coupon
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-8 col-md-6 text-start text-md-end">
                        <button type="button" v-if="cartStore.carts.length" @click="clearCarts()" class="btn btn-line-fill btn-sm">Clear Cart</button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="medium_divider"></div>
          <div class="divider center_icon">
            <i class="ti-shopping-cart-full"></i>
          </div>
          <div class="medium_divider"></div>
        </div>
      </div>
      <div class="row justify-content-center">
        <!-- <div class="col-md-6">
          <div class="heading_s1 mb-3">
            <h6>Calculate Shipping</h6>
          </div>
          <form class="field_form shipping_calculator">
            <div class="form-row">
              <div class="form-group col-lg-12 mb-3">
                <div class="custom_select">
                 <select class="form-control" v-model="selectDistrict">
                    <option value="">Choose District...</option>
                    <option v-for="district in districts"
                            :key="district.name"
                            :value="district.name">
                        {{ toTitle(district.name) }}
                    </option>
                </select>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-lg-6 mb-3">
                <div class="custom_select">
                 <select class="form-control" v-model="selectThana" :disabled="!selectDistrict">
                    <option value="">Choose Police Station...</option>
                    <option v-for="thana in thanas"
                            :key="thana"
                            :value="thana">
                        {{ toTitle(thana) }}
                    </option>
                </select>
                </div>
              </div>
              <div class="form-group col-lg-6 mb-3">
                <input
                  required="required"
                  placeholder="PostCode / ZIP"
                  class="form-control"
                  name="name"
                  type="text"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-lg-12 mb-3">
                <button class="btn btn-fill-line" type="submit">
                  Update Totals
                </button>
              </div>
            </div>
          </form>
        </div> -->
        <div class="col-md-6">
          <div class="border p-3 p-md-4">
            <div class="heading_s1 mb-3">
              <h6>Cart Totals</h6>
            </div>
            <div class="table-responsive">
              <table class="table">
                <tbody>
                  <tr>
                    <td class="cart_total_label">Cart Subtotal</td>
                    <td class="cart_total_amount">৳ {{ cartStore.subtotal.toFixed(2) }}</td>
                  </tr>
                  <tr>
                    <td class="cart_total_label">Shipping</td>
                    <td class="cart_total_amount">Free Shipping</td>
                  </tr>
                  <tr>
                    <td class="cart_total_label">Total</td>
                    <td class="cart_total_amount"><strong>৳ {{ cartStore.subtotal.toFixed(2) }}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <a href="#" class="btn btn-fill-out">Proceed To CheckOut</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- END SECTION SHOP -->
</template>

<script setup>
import { useCart } from '../../stores/cart';
import http from '../../lib/http';
import {toText, getErrorMessage} from '../../lib/helpers';
import { toast } from 'vue3-toastify';
// import { ref, computed, onMounted, watch } from 'vue'
// import axios from 'axios';



// const districts = ref([])
// onMounted(async () => {
//     const res = await axios.get('https://cdn.jsdelivr.net/npm/thikana@1.0.0/src/data/data.json')
//     districts.value = res.data.divisions
//         .flatMap((division) => division.districts)
//         .sort((a, b) => a.name.localeCompare(b.name))
// })
// const selectDistrict = ref('')
// const selectThana = ref('')
// const thanas = computed(() => {
//     const district = districts.value.find((d) => d.name === selectDistrict.value)
//     return district ? district.thana : []
// })
// watch(selectDistrict, () => {
//     selectThana.value = ''
// })
// // ডেটায় নামগুলো বড় হাতের (DHAKA), দেখানোর জন্য Dhaka বানাচ্ছি
// const toTitle = (name) => name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())


const cartStore = useCart();

const clearCarts = async () => {  
  if(!confirm('Are you sure you want to clear your cart?')) {
    return;
  }
  try {
    const res = await http.get('/cart-clear');
    await cartStore.fetchCarts();
    toast.success(toText(res.data.message));
  } catch (error) {
    toast.error(getErrorMessage(error));
  }
};

const decrement = (cart) => {
  const check = Number(cart.quantity || 0) - 1;
  if (check < 1) return;
  cartStore.updateQuantity(cart, check);
}

const increment = (cart) => {
  cartStore.updateQuantity(cart, Number(cart.quantity || 0) + 1);
}



</script>
