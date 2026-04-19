<template>
  <nav class="bottom-nav">

    <router-link to="/" class="bn-item" :class="{ active: isActive('/') }">
      <div class="bn-icon">
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
            :stroke="isActive('/') ? 'var(--green-500)' : 'currentColor'"
            :fill="isActive('/') ? 'rgba(34,197,94,.15)' : 'none'"
            stroke-width="1.7" stroke-linejoin="round"/>
          <path d="M9 21V12h6v9"
            :stroke="isActive('/') ? 'var(--green-600)' : 'currentColor'"
            stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span>Bosh sahifa</span>
    </router-link>

    <router-link to="/products" class="bn-item" :class="{ active: isProducts }">
      <div class="bn-icon">
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
          <rect x="3" y="3" width="8" height="8" rx="2"
            :stroke="isProducts ? 'var(--green-500)' : 'currentColor'"
            :fill="isProducts ? 'rgba(34,197,94,.15)' : 'none'"
            stroke-width="1.7"/>
          <rect x="13" y="3" width="8" height="8" rx="2"
            :stroke="isProducts ? 'var(--green-500)' : 'currentColor'"
            :fill="isProducts ? 'rgba(34,197,94,.15)' : 'none'"
            stroke-width="1.7"/>
          <rect x="3" y="13" width="8" height="8" rx="2"
            :stroke="isProducts ? 'var(--green-500)' : 'currentColor'"
            :fill="isProducts ? 'rgba(34,197,94,.15)' : 'none'"
            stroke-width="1.7"/>
          <rect x="13" y="13" width="8" height="8" rx="2"
            :stroke="isProducts ? 'var(--green-500)' : 'currentColor'"
            :fill="isProducts ? 'rgba(34,197,94,.15)' : 'none'"
            stroke-width="1.7"/>
        </svg>
      </div>
      <span>Mahsulotlar</span>
    </router-link>

    <router-link to="/wishlist" class="bn-item" :class="{ active: isActive('/wishlist') }">
      <div class="bn-icon">
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
          <path d="M12 21C12 21 3 14.5 3 8.5a5 5 0 0110 0 5 5 0 0110 0C23 14.5 12 21 12 21z"
            :fill="productStore.wishlist.length ? '#fecaca' : 'none'"
            :stroke="productStore.wishlist.length ? '#ef4444' : isActive('/wishlist') ? '#ef4444' : 'currentColor'"
            stroke-width="1.7" stroke-linejoin="round"/>
        </svg>
        <transition name="badge-pop">
          <span v-if="productStore.wishlist.length" class="wish-badge">{{ productStore.wishlist.length }}</span>
        </transition>
      </div>
      <span>Sevimlilar</span>
    </router-link>

    <router-link to="/cart" class="bn-item" :class="{ active: isActive('/cart') }">
      <div class="bn-icon">
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
          <path d="M3 6h2l1.5 8h11L19 6H7"
            :stroke="isActive('/cart') ? 'var(--green-500)' : 'currentColor'"
            stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="9" cy="19" r="1.5"
            :fill="isActive('/cart') ? 'var(--green-500)' : 'currentColor'"/>
          <circle cx="16" cy="19" r="1.5"
            :fill="isActive('/cart') ? 'var(--green-500)' : 'currentColor'"/>
        </svg>
        <transition name="badge-pop">
          <span v-if="cartStore.totalItems" class="cart-badge">{{ cartStore.totalItems }}</span>
        </transition>
      </div>
      <span>Savat</span>
    </router-link>

    <router-link to="/profile" class="bn-item" :class="{ active: isActive('/profile') }">
      <div class="bn-icon">
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
          <circle cx="12" cy="8" r="4"
            :stroke="isActive('/profile') ? 'var(--green-500)' : 'currentColor'"
            :fill="isActive('/profile') ? 'rgba(34,197,94,.15)' : 'none'"
            stroke-width="1.7"/>
          <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"
            :stroke="isActive('/profile') ? 'var(--green-500)' : 'currentColor'"
            stroke-width="1.7" stroke-linecap="round"/>
        </svg>
        <span v-if="authStore.isLoggedIn" class="profile-dot"/>
      </div>
      <span>{{ authStore.isLoggedIn ? authStore.user.name.split(' ')[0] : 'Profil' }}</span>
    </router-link>

  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore }    from '../../stores/cart'
import { useProductStore } from '../../stores/products'
import { useAuthStore }    from '../../stores/auth'

const route        = useRoute()
const cartStore    = useCartStore()
const productStore = useProductStore()
const authStore    = useAuthStore()

const isProducts = computed(() => route.path.startsWith('/product'))

function isActive(path) {
  return route.path === path
}
</script>

<style scoped>
/* ── Shell ─────────────────────────────────────────── */
.bottom-nav {
  display: none;
  position: fixed;
  bottom: 0; left: 0; right: 0;
  z-index: 300;
  background: rgba(255,255,255,.96);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-top: 1px solid rgba(0,0,0,.07);
  padding: 4px 8px max(10px, env(safe-area-inset-bottom));
  box-shadow: 0 -2px 20px rgba(0,0,0,.07);
}

/* ── Item ──────────────────────────────────────────── */
.bn-item {
  flex: 1;
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  padding: 4px 2px;
  font-size: 10px; font-weight: 600;
  color: var(--text-3);
  border-radius: 14px;
  transition: color .2s;
  text-decoration: none;
  min-width: 0;
}
.bn-item.active { color: var(--green-600); }
.bn-item > span {
  line-height: 1; white-space: nowrap;
  overflow: hidden; text-overflow: ellipsis;
  max-width: 100%;
}

/* ── Icon wrapper ──────────────────────────────────── */
.bn-icon {
  position: relative;
  width: 42px; height: 36px;
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  transition: background .2s, transform .18s var(--spring);
}
.bn-item.active .bn-icon {
  background: var(--green-50);
}
.bn-item:active .bn-icon { transform: scale(.84); }

/* ── Badges ────────────────────────────────────────── */
.cart-badge, .wish-badge {
  position: absolute; top: -3px; right: -1px;
  min-width: 17px; height: 17px; border-radius: 9px;
  font-size: 9px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid rgba(255,255,255,.96); padding: 0 3px;
}
.cart-badge { background: var(--green-500); color: #fff; }
.wish-badge { background: #ef4444;          color: #fff; }

.profile-dot {
  position: absolute; top: -2px; right: 1px;
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--green-500); border: 2px solid rgba(255,255,255,.96);
}

/* ── Badge pop animation ───────────────────────────── */
.badge-pop-enter-active { animation: badgePop .3s var(--spring); }
.badge-pop-leave-active { transition: opacity .15s, transform .15s; }
.badge-pop-leave-to { opacity: 0; transform: scale(0); }
@keyframes badgePop {
  from   { transform: scale(0); }
  60%    { transform: scale(1.3); }
  to     { transform: scale(1); }
}

/* ── Show only on mobile ───────────────────────────── */
@media (max-width: 768px) {
  .bottom-nav { display: flex; justify-content: space-around; align-items: flex-end; }
}
</style>
