import { createRouter, createWebHistory } from 'vue-router'
import Home          from '../views/Home.vue'
import Category      from '../views/Category.vue'
import Cart          from '../views/Cart.vue'
import Checkout      from '../views/Checkout.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Wishlist      from '../views/Wishlist.vue'
import NotFound      from '../views/NotFound.vue'

const routes = [
  { path: '/',              component: Home },
  { path: '/products',      component: Category },
  { path: '/product/:id',   component: ProductDetail },
  { path: '/cart',          component: Cart },
  { path: '/checkout',      component: Checkout },
  { path: '/wishlist',      component: Wishlist },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
