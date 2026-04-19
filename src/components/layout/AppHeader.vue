<template>
  <header class="header" :class="{ scrolled }">
    <div class="container header-inner">

      <!-- Logo -->
      <router-link to="/" class="logo">
        <div class="logo-mark">
          <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
            <path d="M16 4C10 4 6 9 6 14c0 3 1.5 5.5 4 7l2 7h8l2-7c2.5-1.5 4-4 4-7 0-5-4-10-10-10z" fill="white" opacity=".9"/>
            <circle cx="16" cy="14" r="3" fill="rgba(255,255,255,.5)"/>
          </svg>
        </div>
        <div class="logo-text">
          <span class="logo-name">FreshMart</span>
          <span class="logo-tag">Supermarket</span>
        </div>
      </router-link>

      <!-- Desktop Search -->
      <div class="search-box" :class="{ focused: sf }">
        <svg viewBox="0 0 20 20" fill="none" width="16" height="16" class="s-ico">
          <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" stroke-width="1.7"/>
          <path d="M13 13l3.5 3.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
        </svg>
        <input
          v-model="productStore.searchQuery"
          @focus="sf=true" @blur="sf=false"
          @keyup.enter="goSearch"
          type="text"
          placeholder="Mahsulot qidiring..."
        />
        <button v-if="productStore.searchQuery" class="s-clear" @click="productStore.searchQuery=''">
          <svg viewBox="0 0 14 14" fill="none" width="11" height="11">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Desktop Nav -->
      <nav class="desk-nav">
        <router-link to="/"        class="nav-link">Bosh sahifa</router-link>
        <router-link to="/products" class="nav-link">Mahsulotlar</router-link>
        <a href="#" class="nav-link">Aksiyalar</a>
      </nav>

      <!-- Desktop Actions -->
      <div class="desk-actions">
        <!-- Wishlist -->
        <router-link to="/wishlist" class="action-icon-btn" title="Sevimlilar">
          <svg viewBox="0 0 20 20" fill="none" width="19" height="19">
            <path d="M10 17C10 17 2.5 12 2.5 7a4.5 4.5 0 019 0 4.5 4.5 0 019 0C20.5 12 10 17 10 17z"
              :fill="productStore.wishlist.length ? '#ef4444':'none'"
              :stroke="productStore.wishlist.length ? '#ef4444':'currentColor'"
              stroke-width="1.7" stroke-linejoin="round"/>
          </svg>
          <transition name="badge-pop">
            <span v-if="productStore.wishlist.length" class="action-badge red">{{ productStore.wishlist.length }}</span>
          </transition>
        </router-link>

        <!-- Profile -->
        <button class="action-icon-btn" title="Profil">
          <svg viewBox="0 0 20 20" fill="none" width="19" height="19">
            <circle cx="10" cy="7" r="3.5" stroke="currentColor" stroke-width="1.7"/>
            <path d="M3 18c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
          </svg>
        </button>

        <!-- Divider -->
        <div class="act-divider"/>

        <!-- Cart -->
        <button class="cart-btn" @click="cartStore.isOpen = true">
          <svg viewBox="0 0 20 20" fill="none" width="17" height="17">
            <path d="M2.5 3.5h1.8l.9 1.8m0 0L7 12h9l2-6.7H5.2z" stroke="white" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="8" cy="15.5" r="1.2" fill="white"/>
            <circle cx="14" cy="15.5" r="1.2" fill="white"/>
          </svg>
          <span>Savat</span>
          <transition name="badge-pop">
            <span v-if="cartStore.totalItems" class="cart-count">{{ cartStore.totalItems }}</span>
          </transition>
        </button>
      </div>

      <!-- Mobile right actions -->
      <div class="mob-actions">
        <!-- Search toggle -->
        <button class="mob-icon-btn" @click="showSearch = !showSearch" :class="{ active: showSearch }">
          <svg v-if="!showSearch" viewBox="0 0 20 20" fill="none" width="19" height="19">
            <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" stroke-width="1.8"/>
            <path d="M13 13l3.5 3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          <svg v-else viewBox="0 0 16 16" fill="none" width="16" height="16">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <!-- Cart -->
        <button class="mob-cart-btn" @click="cartStore.isOpen = true">
          <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
            <path d="M2.5 3.5h1.8l.9 1.8m0 0L7 12h9l2-6.7H5.2z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="8" cy="15.5" r="1.2" fill="white"/>
            <circle cx="14" cy="15.5" r="1.2" fill="white"/>
          </svg>
          <transition name="badge-pop">
            <span v-if="cartStore.totalItems" class="mob-cart-badge">{{ cartStore.totalItems }}</span>
          </transition>
        </button>
      </div>
    </div>

    <!-- Mobile Search Dropdown -->
    <transition name="search-drop">
      <div v-if="showSearch" class="mob-search-drop">
        <div class="container">
          <div class="mob-search-inner" :class="{ active: sf2 }">
            <svg viewBox="0 0 20 20" fill="none" width="16" height="16" class="ms-ico">
              <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" stroke-width="1.7"/>
              <path d="M13 13l3.5 3.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
            </svg>
            <input
              ref="mobInpRef"
              v-model="productStore.searchQuery"
              @focus="sf2=true" @blur="sf2=false"
              @keyup.enter="goSearch(); showSearch=false"
              type="text"
              placeholder="Mahsulot qidiring..."
            />
            <button v-if="productStore.searchQuery" class="ms-clear" @click="productStore.searchQuery=''">
              <svg viewBox="0 0 14 14" fill="none" width="11" height="11">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
            </button>
            <button class="ms-cancel" @click="showSearch=false">Bekor</button>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore }    from '../../stores/cart'
import { useProductStore } from '../../stores/products'

const cartStore    = useCartStore()
const productStore = useProductStore()
const router       = useRouter()

const scrolled    = ref(false)
const sf          = ref(false)
const sf2         = ref(false)
const showSearch  = ref(false)
const mobInpRef   = ref(null)

watch(showSearch, async v => {
  if (v) { await nextTick(); mobInpRef.value?.focus() }
})

function goSearch() { router.push('/products') }
function onScroll() { scrolled.value = window.scrollY > 20 }
onMounted(()  => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
/* ═══ SHELL ══════════════════════════════════════════ */
.header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  background: rgba(255,255,255,.94);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid transparent;
  transition: border-color .25s, box-shadow .25s;
}
.header.scrolled {
  border-bottom-color: var(--border);
  box-shadow: 0 2px 20px rgba(0,0,0,.07);
}
.header-inner {
  display: flex; align-items: center;
  gap: 12px; height: 66px;
}

/* ═══ LOGO ════════════════════════════════════════════ */
.logo { display: flex; align-items: center; gap: 9px; flex-shrink: 0; }
.logo-mark {
  width: 38px; height: 38px; border-radius: 11px; flex-shrink: 0;
  background: linear-gradient(135deg, var(--green-500), var(--green-700));
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 3px 12px rgba(34,197,94,.3);
}
.logo-name { display: block; font-size: 17px; font-weight: 800; color: var(--green-700); letter-spacing: -.3px; line-height: 1; }
.logo-tag  { display: block; font-size: 9px; font-weight: 600; color: var(--text-3); letter-spacing: 1.6px; text-transform: uppercase; margin-top: 2px; }

/* ═══ DESKTOP SEARCH ══════════════════════════════════ */
.search-box {
  flex: 1; max-width: 400px;
  display: flex; align-items: center; gap: 9px;
  background: var(--slate-100); border: 1.5px solid transparent;
  border-radius: 12px; padding: 0 14px;
  transition: all .2s var(--ease);
}
.search-box.focused {
  background: #fff; border-color: var(--green-400);
  box-shadow: 0 0 0 3px rgba(74,222,128,.12);
}
.s-ico { color: var(--text-3); flex-shrink: 0; transition: color .2s; }
.search-box.focused .s-ico { color: var(--green-500); }
.search-box input {
  flex: 1; border: none; background: transparent; outline: none;
  padding: 11px 0; font-size: 14px; font-family: inherit; color: var(--text);
}
.search-box input::placeholder { color: var(--text-3); }
.s-clear {
  display: flex; align-items: center; justify-content: center;
  width: 22px; height: 22px; border-radius: 6px; flex-shrink: 0;
  color: var(--text-3); transition: background .18s, color .18s;
}
.s-clear:hover { background: var(--red-400); color: #fff; }

/* ═══ DESKTOP NAV ═════════════════════════════════════ */
.desk-nav { display: flex; gap: 2px; flex-shrink: 0; margin-left: 4px; }
.nav-link {
  padding: 7px 13px; border-radius: 10px;
  font-size: 14px; font-weight: 500; color: var(--text-2);
  transition: background .18s, color .18s; white-space: nowrap;
}
.nav-link:hover { background: var(--slate-100); color: var(--text); }
.nav-link.router-link-active { background: var(--green-100); color: var(--green-700); font-weight: 600; }

/* ═══ DESKTOP ACTIONS ═════════════════════════════════ */
.desk-actions {
  display: flex; align-items: center; gap: 4px;
  flex-shrink: 0; margin-left: auto;
}

.action-icon-btn {
  position: relative;
  width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
  background: transparent;
  display: flex; align-items: center; justify-content: center;
  color: var(--text-2);
  transition: background .18s, color .18s, transform .2s var(--spring);
  text-decoration: none; border: none; cursor: pointer;
}
.action-icon-btn:hover {
  background: var(--slate-100);
  color: var(--text);
  transform: translateY(-1px);
}
.action-icon-btn:hover svg path[stroke="#ef4444"],
.action-icon-btn:hover svg path[fill="#ef4444"] { stroke: #dc2626; }

.action-badge {
  position: absolute; top: 4px; right: 4px;
  min-width: 16px; height: 16px; border-radius: 8px;
  font-size: 9px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid #fff; padding: 0 3px; line-height: 1;
}
.action-badge.red { background: #ef4444; color: #fff; }

.act-divider {
  width: 1px; height: 24px;
  background: var(--border);
  margin: 0 6px; flex-shrink: 0;
}

.cart-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 0 16px 0 12px; height: 42px; border-radius: 12px; flex-shrink: 0;
  background: linear-gradient(135deg, var(--green-500), var(--green-600));
  color: #fff; font-size: 14px; font-weight: 700;
  transition: transform .2s var(--spring), box-shadow .2s;
  box-shadow: 0 2px 10px rgba(34,197,94,.25);
}
.cart-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(34,197,94,.4); }
.cart-count {
  min-width: 22px; height: 22px; border-radius: 11px;
  background: rgba(255,255,255,.2);
  border: 1.5px solid rgba(255,255,255,.3);
  font-size: 11px; font-weight: 800;
  display: flex; align-items: center; justify-content: center; padding: 0 5px;
}

/* ═══ MOBILE ACTIONS ══════════════════════════════════ */
.mob-actions {
  display: none;
  align-items: center; gap: 8px; margin-left: auto; flex-shrink: 0;
}

.mob-icon-btn {
  width: 38px; height: 38px; border-radius: 11px;
  background: var(--slate-100); color: var(--text-2);
  display: flex; align-items: center; justify-content: center;
  transition: background .18s, color .18s;
}
.mob-icon-btn.active { background: var(--green-100); color: var(--green-700); }

.mob-cart-btn {
  position: relative;
  width: 42px; height: 42px; border-radius: 12px;
  background: linear-gradient(135deg, var(--green-500), var(--green-600));
  display: flex; align-items: center; justify-content: center;
  transition: transform .2s var(--spring), box-shadow .2s;
  box-shadow: 0 3px 12px rgba(34,197,94,.3);
}
.mob-cart-btn:active { transform: scale(.94); }
.mob-cart-badge {
  position: absolute; top: -5px; right: -5px;
  min-width: 18px; height: 18px; border-radius: 9px;
  background: var(--red-500); color: #fff; font-size: 10px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid #fff; padding: 0 3px;
}

/* Badge pop animation */
.badge-pop-enter-active { animation: badgePop .3s var(--spring); }
.badge-pop-leave-active { transition: opacity .15s, transform .15s; }
.badge-pop-leave-to { opacity: 0; transform: scale(0); }
@keyframes badgePop { from { transform: scale(0); } 60% { transform: scale(1.3); } to { transform: scale(1); } }

/* ═══ MOBILE SEARCH DROP ══════════════════════════════ */
.mob-search-drop {
  border-top: 1px solid var(--border);
  background: rgba(255,255,255,.98);
  backdrop-filter: blur(12px);
  padding: 10px 0 12px;
}
.mob-search-inner {
  display: flex; align-items: center; gap: 10px;
  background: var(--slate-100);
  border: 1.5px solid transparent; border-radius: 12px;
  padding: 0 14px;
  transition: all .2s;
}
.mob-search-inner.active {
  background: #fff; border-color: var(--green-400);
  box-shadow: 0 0 0 3px rgba(74,222,128,.12);
}
.ms-ico { color: var(--text-3); flex-shrink: 0; }
.mob-search-inner.active .ms-ico { color: var(--green-500); }
.mob-search-inner input {
  flex: 1; border: none; background: transparent; outline: none;
  padding: 12px 0; font-size: 15px; font-family: inherit; color: var(--text);
}
.mob-search-inner input::placeholder { color: var(--text-3); }
.ms-clear {
  display: flex; align-items: center; justify-content: center;
  width: 22px; height: 22px; border-radius: 6px;
  color: var(--text-3); transition: background .18s;
}
.ms-clear:hover { background: var(--red-400); color: #fff; }
.ms-cancel { font-size: 14px; font-weight: 600; color: var(--green-600); padding: 4px 6px; white-space: nowrap; }

/* Search drop transition */
.search-drop-enter-active { transition: all .22s var(--ease); }
.search-drop-leave-active { transition: all .18s var(--ease); }
.search-drop-enter-from, .search-drop-leave-to { opacity: 0; transform: translateY(-8px); }

/* ═══ RESPONSIVE ══════════════════════════════════════ */
@media (max-width: 1024px) {
  .desk-nav { display: none; }
}
@media (max-width: 768px) {
  .search-box  { display: none; }
  .desk-actions { display: none; }
  .mob-actions  { display: flex; }
  .logo-tag { display: none; }
  .header-inner { height: 58px; gap: 10px; }
}
@media (max-width: 400px) {
  .logo-text { display: none; }
  .logo-mark { width: 34px; height: 34px; border-radius: 10px; }
}
</style>
