<template>
    <!-- START MAIN CONTENT -->
    <div class="main_content">

        <!-- START SECTION SHOP -->
        <div class="section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-4">
                        <div class="dashboard_menu">
                            <ul class="nav nav-tabs flex-column" role="tablist">
                                <li v-for="tab in tabs" :key="tab.id" class="nav-item">
                                    <a class="nav-link" :class="{ active: activeTab === tab.id }" :id="tab.id + '-tab'"
                                        :href="'#' + tab.id" role="tab" :aria-controls="tab.id"
                                        :aria-selected="activeTab === tab.id" @click.prevent="activeTab = tab.id">

                                        <i :class="tab.icon"></i>

                                        {{ tab.label }}
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#" @click.prevent="logout"><i
                                            class="ti-lock"></i>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>


                    <!-- কোন ট্যাব খোলা আছে তাহলে এই ট্যাবগুলি দেখান -->
                    <div class="col-lg-9 col-md-8">
                        <div class="tab-content dashboard_content">
                            <div class="tab-pane fade" :class="{ 'active show': activeTab === 'dashboard' }"
                                id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                                <div class="card">
                                    <div class="card-header">
                                        <h3>Dashboard</h3>
                                    </div>
                                    <div class="card-body">
                                        <p>From your account dashboard. you can easily check &amp; view your <a href="#"
                                                @click.prevent="activeTab = 'orders'">recent
                                                orders</a>, manage your <a href="#"
                                                @click.prevent="activeTab = 'address'">shipping and billing
                                                addresses</a> and <a href="#"
                                                @click.prevent="activeTab = 'account-detail'">edit your password
                                                and account details.</a></p>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" :class="{ 'active show': activeTab === 'orders' }" id="orders"
                                role="tabpanel" aria-labelledby="orders-tab">
                                <div class="card">
                                    <div class="card-header">
                                        <h3>Orders</h3>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>Order</th>
                                                        <th>Date</th>
                                                        <th>Status</th>
                                                        <th>Total</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>#1234</td>
                                                        <td>March 15, 2020</td>
                                                        <td>Processing</td>
                                                        <td>$78.00 for 1 item</td>
                                                        <td><a href="#" class="btn btn-fill-out btn-sm">View</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td>#2366</td>
                                                        <td>June 20, 2020</td>
                                                        <td>Completed</td>
                                                        <td>$81.00 for 1 item</td>
                                                        <td><a href="#" class="btn btn-fill-out btn-sm">View</a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" :class="{ 'active show': activeTab === 'wishlist' }"
                                id="wishlist" role="tabpanel" aria-labelledby="wishlist-tab">
                                <div class="card">
                                    <div class="card-header">
                                        <h3>Wishlist</h3>
                                    </div>
                                    <div class="card-body">
                                        <div class="row shop_container">
                                            <div class="col-6 col-lg-4" v-for="wish in wishProducts" :key="wish.id">
                                                <div class="product">
                                                    <div class="product_img">
                                                        <a href="shop-product-detail.html">
                                                            <img src="/assets/images/product_img1.jpg"
                                                                alt="product_img1">
                                                        </a>
                                                        <div class="product_action_box">
                                                            <ul class="list_none pr_action_btn">
                                                                <li class="add-to-cart">
                                                                    <a href="javascript:void(0)" @click.prevent="addToCart(wish.product_id)">
                                                                        <i class="icon-basket-loaded"></i>
                                                                    </a>
                                                                </li>                                                                
                                                                <li>
                                                                    <a href="shop-quick-view.html" class="popup-ajax">
                                                                        <i class="icon-magnifier-add"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" @click.prevent="removeFromWishlist(wish.product_id)">
                                                                        <i class="icon-trash"></i>
                                                                    </a>
                                                                </li>                                                                
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="product_info">
                                                        <h6 class="product_title"><a href="shop-product-detail.html">{{ wish.product.title }}</a></h6>
                                                        <div class="product_price">
                                                            <span class="price">${{ wish.product.price }}</span>
                                                            <del>$55.25</del>
                                                            <div class="on_sale">
                                                                <span>35% Off</span>
                                                            </div>
                                                        </div>
                                                        <div class="rating_wrap">
                                                            <div class="rating">
                                                                <div class="product_rate" style="width:80%"></div>
                                                            </div>
                                                            <span class="rating_num">(21)</span>
                                                        </div>
                                                        <div class="pr_desc">
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                                Phasellus blandit massa enim. Nullam id varius nunc id
                                                                varius
                                                                nunc.</p>
                                                        </div>
                                                        <div class="pr_switch_wrap">
                                                            <div class="product_color_switch">
                                                                <span class="active" data-color="#87554B"></span>
                                                                <span data-color="#333333"></span>
                                                                <span data-color="#DA323F"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <p v-if="wishProducts.length === 0">No wishlist products found.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" :class="{ 'active show': activeTab === 'address' }" id="address"
                                role="tabpanel" aria-labelledby="address-tab">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="card mb-3 mb-lg-0">
                                            <div class="card-header">
                                                <h3>Billing Address</h3>
                                            </div>
                                            <div class="card-body">
                                                <address>House #15<br>Road #1<br>Block #C <br>Angali <br> Vedora
                                                    <br>1212
                                                </address>
                                                <p>New York</p>
                                                <a href="#" class="btn btn-fill-out">Edit</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="card">
                                            <div class="card-header">
                                                <h3>Shipping Address</h3>
                                            </div>
                                            <div class="card-body">
                                                <address>House #15<br>Road #1<br>Block #C <br>Angali <br> Vedora
                                                    <br>1212
                                                </address>
                                                <p>New York</p>
                                                <a href="#" class="btn btn-fill-out">Edit</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" :class="{ 'active show': activeTab === 'account-detail' }"
                                id="account-detail" role="tabpanel" aria-labelledby="account-detail-tab">
                                <div class="card">
                                    <div class="card-header">
                                        <h3>Account Details</h3>
                                    </div>
                                    <div class="card-body">
                                        <p>Already have an account? <a href="#">Log in instead!</a></p>
                                        <form method="post" name="enq">
                                            <div class="row">
                                                <div class="form-group col-md-6 mb-3">
                                                    <label>First Name <span class="required">*</span></label>
                                                    <input class="form-control" name="name" type="text">
                                                </div>
                                                <div class="form-group col-md-6 mb-3">
                                                    <label>Last Name <span class="required">*</span></label>
                                                    <input class="form-control" name="phone">
                                                </div>
                                                <div class="form-group col-md-12 mb-3">
                                                    <label>Display Name <span class="required">*</span></label>
                                                    <input class="form-control" name="dname" type="text">
                                                </div>
                                                <div class="form-group col-md-12 mb-3">
                                                    <label>Email Address <span class="required">*</span></label>
                                                    <input class="form-control" name="email" type="email">
                                                </div>
                                                <div class="form-group col-md-12 mb-3">
                                                    <label>Current Password <span class="required">*</span></label>
                                                    <input class="form-control" name="password" type="password">
                                                </div>
                                                <div class="form-group col-md-12 mb-3">
                                                    <label>New Password <span class="required">*</span></label>
                                                    <input class="form-control" name="npassword" type="password">
                                                </div>
                                                <div class="form-group col-md-12 mb-3">
                                                    <label>Confirm Password <span class="required">*</span></label>
                                                    <input class="form-control" name="cpassword" type="password">
                                                </div>
                                                <div class="col-md-12">
                                                    <button type="submit" class="btn btn-fill-out" name="submit"
                                                        value="Submit">Save</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- END SECTION SHOP -->

    </div>
    <!-- END MAIN CONTENT -->
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { userAuth } from '../../stores/auth'
import router from '../../router'
import http from '../../lib/http'
import { toast } from 'vue3-toastify'
import { toText, getErrorMessage } from '../../lib/helpers'
import { useCart } from '../../stores/cart' 
import { useRoute } from 'vue-router'


const auth = userAuth()
const route = useRoute()

// বাম পাশের মেনু। id টা ডান পাশের tab-pane এর id এর সাথে মিলতে হবে
const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'ti-layout-grid2' },
    { id: 'orders', label: 'Orders', icon: 'ti-shopping-cart-full' },
    { id: 'wishlist', label: 'Wishlist', icon: 'ti-heart' },
    { id: 'address', label: 'My Address', icon: 'ti-location-pin' },
    { id: 'account-detail', label: 'Account details', icon: 'ti-id-badge' },
]

// এখন কোন ট্যাব খোলা আছে
const activeTab = ref( route.hash.slice(1) || 'dashboard')
router.replace({ path: route.path, hash: '' })

// এই পেজে থাকা অবস্থায় hash বদলালে (যেমন header-এর Wishlist লিংক) সেই ট্যাব খুলে hash মুছে দিই
watch(() => route.hash, (hash) => {
    if (!hash) return
    activeTab.value = hash.slice(1)
    router.replace({ path: route.path, hash: '' })
})

const wishProducts = ref([])

onMounted(async () => {
    try {
        const res = await http.get('/wishlist')
        wishProducts.value = res.data.data
    } catch (error) {
        toast.error(getErrorMessage(error))
    }
})

const addToCart = async (id) => {
    try {
        const res = await http.post('/cart', { 
            product_id: id, 
            quantity: 1 
        })
        toast.success(toText(res.data.message))
        await useCart().fetchCarts()
    } catch (error) {
        toast.error(getErrorMessage(error))
    }
}


const removeFromWishlist = async (productId) => {
    try {
        // axios.delete এর ২য় আর্গুমেন্ট config, তাই body পাঠাতে হয় data এর ভেতরে
        const res = await http.delete('/wishlist', {
            data: { product_id: productId },
        })
        wishProducts.value = wishProducts.value.filter(wish => wish.product_id !== productId)
        toast.success(toText(res.data.message))
    } catch (error) {
        toast.error(getErrorMessage(error))
    }
}



const logout = () => {
    auth.logout()
    router.push({ name: 'Login' })
}

</script>