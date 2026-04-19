<template>
  <nav class="bottom-nav">
    <router-link to="/" class="bn-item" exact-active-class="active">
      <div class="bn-icon">
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
            :stroke="isActive('/') ? 'var(--green-500)' : 'currentColor'"
            :fill="isActive('/') ? 'rgba(34,197,94,.12)' : 'none'"
            stroke-width="1.7" stroke-linejoin="round"/>
          <path d="M9 21V12h6v9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span>Bosh sahifa</span>
    </router-link>

    <router-link to="/products" class="bn-item" active-class="active">
      <div class="bn-icon">
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
          <rect x="3" y="3" width="8" height="8" rx="2"
            :fill="route.path.startsWith('/product') ? 'rgba(34,197,94,.12)' : 'none'"
            :stroke="route.path.startsWith('/product') ? 'var(--green-500)' : 'currentColor'"
            stroke-width="1.7"/>
          <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" stroke-width="1.7"
            :fill="route.path.startsWith('/product') ? 'rgba(34,197,94,.12)' : 'none'"
            :opacity="route.path.startsWith('/product') ? 1 : 0.5"/>
          <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" stroke-width="1.7"
            :fill="route.path.startsWith('/product') ? 'rgba(34,197,94,.12)' : 'none'"
            :opacity="route.path.startsWith('/product') ? 1 : 0.5"/>
          <rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" stroke-width="1.7"
            :fill="route.path.startsWith('/product') ? 'rgba(34,197,94,.12)' : 'none'"
            :opacity="route.path.startsWith('/product') ? 1 : 0.5"/>
        </svg>
      </div>
      <span>Mahsulotlar</span>
    </router-link>

    <router-link to="/wishlist" class="bn-item" active-class="active">
      <div class="bn-icon wish-icon">
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
          <path d="M12 21C12 21 3 14.5 3 8.5a5 5 0 0110 0 5 5 0 0110 0C23 14.5 12 21 12 21z"
            :fill="route.path === '/wishlist' ? '#ef4444' : productStore.wishlist.length ? '#fecaca' : 'none'"
            :stroke="route.path === '/wishlist' || productStore.wishlist.length ? '#ef4444' : 'currentColor'"
            stroke-width="1.7" stroke-linejoin="round"/>
        </svg>
        <transition name="badge-pop">
          <span v-if="productStore.wishlist.length" class="wish-badge">{{ productStore.wishlist.length }}</span>
        </transition>
      </div>
      <span>Sevimlilar</span>
    </router-link>

    <router-link to="/cart" class="bn-item" active-class="active">
      <div class="bn-icon">
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
          <path d="M3 6h2l1.5 8h11L19 6H7"
            :stroke="route.path === '/cart' ? 'var(--green-500)' : 'currentColor'"
            stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="9" cy="19" r="1.5"
            :fill="route.path === '/cart' ? 'var(--green-500)' : 'currentColor'"/>
          <circle cx="16" cy="19" r="1.5"
            :fill="route.path === '/cart' ? 'var(--green-500)' : 'currentColor'"/>
        </svg>
        <transition name="badge-pop">
          <span v-if="cartStore.totalItems" class="cart-badge">{{ cartStore.totalItems }}</span>
        </transition>
      </div>
      <span>Savat</span>
    </router-link>

    <button class="bn-item" @click="profileOpen = !profileOpen">
      <div class="bn-icon">
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
          <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.7"/>
          <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
        </svg>
      </div>
      <span>Profil</span>
    </button>

    <!-- Profile mini sheet -->
    <transition name="sheet">
      <div v-if="profileOpen" class="profile-sheet" @click.self="profileOpen=false">
        <div class="sheet-content">
          <div class="sheet-handle"/>
          <div class="sheet-avatar">
            <div class="avatar-circle">👤</div>
            <div>
              <strong>Mehmon</strong>
              <small>Tizimga kirilmagan</small>
            </div>
          </div>
          <div class="sheet-links">
            <button class="sl-btn" @click="profileOpen=false">
              <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                <path d="M10 2a8 8 0 100 16A8 8 0 0010 2z" stroke="currentColor" stroke-width="1.6"/>
                <path d="M10 7v3l2 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
              </svg>
              Buyurtmalarim
            </button>
            <button class="sl-btn" @click="profileOpen=false">
              <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                <path d="M10 2l2.4 5 5.6.8-4 3.8.9 5.4L10 14.5l-4.9 2.5.9-5.4-4-3.8 5.6-.8L10 2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
              </svg>
              Sharhlarim
            </button>
            <button class="sl-btn" @click="profileOpen=false">
              <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                <path d="M17 10H3M10 3l7 7-7 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Kirish / Ro'yxatdan o'tish
            </button>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../../stores/cart'
import { useProductStore } from '../../stores/products'

const route = useRoute()
const cartStore = useCartStore()
const productStore = useProductStore()
const profileOpen = ref(false)

function isActive(path) {
  return route.path === path
}
</script>

<style scoped>
.bottom-nav {
  display: none;
  position: fixed;
  bottom: 0; left: 0; right: 0;
  z-index: 300;
  background: rgba(255,255,255,.97);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-top: 1px solid var(--border);
  padding: 6px 4px max(10px, env(safe-area-inset-bottom));
  box-shadow: 0 -4px 24px rgba(0,0,0,.08);
}

.bn-item {
  flex: 1;
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  padding: 6px 4px;
  font-size: 10px; font-weight: 600;
  color: var(--text-3);
  border-radius: 12px;
  transition: color .2s;
  background: none; border: none; cursor: pointer;
  font-family: inherit;
}
.bn-item.active { color: var(--green-600); }
.bn-item span { line-height: 1; }

.bn-icon {
  position: relative;
  width: 36px; height: 36px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  transition: background .2s, transform .2s var(--spring);
}
.bn-item.active .bn-icon {
  background: var(--green-50);
}
.bn-item:active .bn-icon { transform: scale(.88); }

/* Badges */
.cart-badge, .wish-badge {
  position: absolute; top: -2px; right: -2px;
  min-width: 17px; height: 17px; border-radius: 9px;
  font-size: 9px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid #fff; padding: 0 3px;
}
.cart-badge { background: var(--green-500); color: #fff; }
.wish-badge { background: #ef4444; color: #fff; }

.wish-icon { color: var(--text-3); }
.bn-item.active .wish-icon { color: #ef4444; }

/* Badge animation */
.badge-pop-enter-active { animation: badgePop .3s var(--spring); }
.badge-pop-leave-active { transition: opacity .15s, transform .15s; }
.badge-pop-leave-to { opacity: 0; transform: scale(0); }
@keyframes badgePop { from { transform: scale(0); } 60% { transform: scale(1.3); } to { transform: scale(1); } }

/* ── Profile Sheet ── */
.profile-sheet {
  position: fixed; inset: 0; z-index: 400;
  background: rgba(0,0,0,.4);
  backdrop-filter: blur(2px);
  display: flex; align-items: flex-end;
}
.sheet-content {
  width: 100%;
  background: #fff;
  border-radius: 24px 24px 0 0;
  padding: 16px 20px max(24px, env(safe-area-inset-bottom));
  animation: slideUp .3s var(--spring);
}
@keyframes slideUp {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
.sheet-handle {
  width: 40px; height: 4px; border-radius: 2px;
  background: var(--slate-200);
  margin: 0 auto 20px;
}
.sheet-avatar {
  display: flex; align-items: center; gap: 14px;
  padding: 16px; border-radius: 14px;
  background: var(--slate-50); border: 1px solid var(--border);
  margin-bottom: 16px;
}
.avatar-circle {
  width: 48px; height: 48px; border-radius: 14px;
  background: var(--slate-200);
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; flex-shrink: 0;
}
.sheet-avatar strong { display: block; font-size: 15px; font-weight: 700; }
.sheet-avatar small { font-size: 12px; color: var(--text-3); }
.sheet-links { display: flex; flex-direction: column; gap: 4px; }
.sl-btn {
  display: flex; align-items: center; gap: 12px;
  width: 100%; padding: 14px 16px; border-radius: 12px;
  font-size: 14px; font-weight: 600; color: var(--text);
  background: none; border: none; cursor: pointer;
  transition: background .18s; text-align: left;
  font-family: inherit;
}
.sl-btn:hover { background: var(--slate-50); }

/* Sheet transition */
.sheet-enter-active { transition: opacity .25s; }
.sheet-leave-active { transition: opacity .2s; }
.sheet-enter-from, .sheet-leave-to { opacity: 0; }

/* ── Show only on mobile ── */
@media (max-width: 768px) {
  .bottom-nav { display: flex; }
}
</style>
