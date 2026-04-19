<template>
  <div id="app">
    <AppHeader />
    <CartSidebar />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter />
    <BottomNav />
    <transition name="fade">
      <div v-if="cartStore.isOpen" class="overlay" @click="cartStore.isOpen = false" />
    </transition>
  </div>
</template>

<script setup>
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import CartSidebar from './components/layout/CartSidebar.vue'
import BottomNav from './components/layout/BottomNav.vue'
import { useCartStore } from './stores/cart'
const cartStore = useCartStore()
</script>

<style>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 99;
  backdrop-filter: blur(2px);
}

@media (max-width: 768px) {
  main { padding-bottom: 72px; }
}
</style>
