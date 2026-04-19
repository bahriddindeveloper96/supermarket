<template>
  <transition name="slide">
    <aside v-if="cartStore.isOpen" class="sidebar">

      <!-- Header -->
      <div class="sb-head">
        <div class="sb-title">
          <div class="sb-icon">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"
                stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div>
            <h2>Savat</h2>
            <p>{{ cartStore.totalItems }} ta mahsulot</p>
          </div>
        </div>
        <button class="close" @click="cartStore.isOpen=false">
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Items -->
      <div class="sb-body" v-if="cartStore.items.length">
        <TransitionGroup name="item-list">
          <div class="cart-item" v-for="item in cartStore.items" :key="item.id">
            <div class="item-img">
              <img :src="item.image" :alt="item.name" />
            </div>
            <div class="item-info">
              <p class="item-name">{{ item.name }}</p>
              <p class="item-price">{{ fmt(item.price) }} <span>so'm</span></p>
            </div>
            <div class="item-right">
              <button class="del" @click="cartStore.removeItem(item.id)" title="O'chirish">
                <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
              <div class="qty">
                <button @click="cartStore.updateQty(item.id, item.qty - (item.step || 1))">−</button>
                <span>{{ fmtQty(item) }}</span>
                <button @click="cartStore.updateQty(item.id, item.qty + (item.step || 1))">+</button>
              </div>
              <p class="item-subtotal">{{ fmt(item.price * item.qty) }}</p>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- Empty -->
      <div v-else class="sb-empty">
        <div class="empty-art">
          <svg viewBox="0 0 120 120" fill="none" width="100" height="100">
            <circle cx="60" cy="60" r="56" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="2"/>
            <path d="M38 40h44l-6 32H44L38 40z" fill="#dcfce7" stroke="#4ade80" stroke-width="2" stroke-linejoin="round"/>
            <circle cx="50" cy="78" r="4" fill="#4ade80"/>
            <circle cx="70" cy="78" r="4" fill="#4ade80"/>
            <path d="M30 36h6l2 8" stroke="#86efac" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <h3>Savat bo'sh</h3>
        <p>Mahsulotlarni savatga qo'shing</p>
        <button class="go-shop" @click="cartStore.isOpen=false; $router.push('/products')">
          Xarid boshlash
        </button>
      </div>

      <!-- Footer -->
      <div v-if="cartStore.items.length" class="sb-foot">
        <div class="promo-row">
          <input v-model="promo" type="text" placeholder="Promo kod..." class="promo-input" />
          <button class="promo-btn" @click="applyPromo">Qo'llash</button>
        </div>

        <div class="summary">
          <div class="sum-row">
            <span>Mahsulotlar</span>
            <span>{{ fmt(cartStore.totalPrice) }} so'm</span>
          </div>
          <div class="sum-row">
            <span>Yetkazish</span>
            <span class="free">Bepul 🎉</span>
          </div>
          <div v-if="discounted" class="sum-row discount-row">
            <span>Chegirma (30%)</span>
            <span class="disc">–{{ fmt(Math.round(cartStore.totalPrice * .3)) }} so'm</span>
          </div>
          <div class="sum-total">
            <span>Jami to'lov</span>
            <strong>{{ fmt(finalPrice) }} so'm</strong>
          </div>
        </div>

        <button class="checkout-btn" @click="checkout">
          <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
            <path d="M5 10h10M10 5l5 5-5 5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Buyurtma berish
        </button>
        <button class="clear-btn" @click="cartStore.clearCart()">Savatni tozalash</button>
      </div>
    </aside>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../../stores/cart'
import { useRouter }    from 'vue-router'

const cartStore  = useCartStore()
const router     = useRouter()
const promo      = ref('')
const discounted = ref(false)

const finalPrice = computed(() =>
  discounted.value
    ? Math.round(cartStore.totalPrice * .7)
    : cartStore.totalPrice
)

function fmt(n) { return n.toLocaleString('uz-UZ') }

function fmtQty(item) {
  const u = item.unit || 'dona'
  const q = (u === 'kg' || u === 'gr') ? item.qty.toFixed(1) : item.qty
  return `${q} ${u}`
}

function applyPromo() {
  if (promo.value.toUpperCase() === 'FRESHMART30') {
    discounted.value = true
    promo.value = '✓ FRESHMART30'
  }
}

function checkout() {
  cartStore.isOpen = false
  router.push('/checkout')
}
</script>

<style scoped>
/* ─── Shell ─────────────────────────────────────────── */
.sidebar {
  position:fixed; top:0; right:0; bottom:0;
  width:420px; z-index:200;
  background:#fff;
  display:flex; flex-direction:column;
  box-shadow:-4px 0 40px rgba(0,0,0,.12);
}

/* ─── Head ──────────────────────────────────────────── */
.sb-head {
  display:flex; align-items:center; justify-content:space-between;
  padding:20px 24px;
  border-bottom:1px solid var(--border);
}
.sb-title { display:flex; align-items:center; gap:12px; }
.sb-icon {
  width:40px; height:40px; border-radius:12px;
  background:linear-gradient(135deg,var(--green-500),var(--green-700));
  display:flex; align-items:center; justify-content:center;
}
.sb-title h2 { font-size:17px; font-weight:700; line-height:1; margin-bottom:2px; }
.sb-title p  { font-size:12px; color:var(--text-3); }
.close {
  width:34px; height:34px; border-radius:9px;
  background:var(--slate-100); color:var(--text-2);
  display:flex; align-items:center; justify-content:center;
  transition: background .18s, color .18s;
}
.close:hover { background:#fee2e2; color:var(--red-500); }

/* ─── Body ──────────────────────────────────────────── */
.sb-body { flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:10px; }

.cart-item {
  display:flex; align-items:center; gap:12px;
  padding:12px; border-radius:var(--radius);
  border:1px solid var(--border);
  transition: border-color .18s, box-shadow .18s;
  animation: fadeUp .22s var(--ease);
}
.cart-item:hover { border-color:var(--green-200, #bbf7d0); box-shadow:var(--shadow-sm); }

.item-img { width:56px; height:56px; border-radius:10px; overflow:hidden; flex-shrink:0; }
.item-img img { width:100%; height:100%; object-fit:cover; }
.item-info { flex:1; min-width:0; }
.item-name { font-size:13px; font-weight:600; line-height:1.3; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.item-price { font-size:13px; color:var(--green-600); font-weight:700; margin-top:3px; }
.item-price span { font-size:11px; font-weight:400; color:var(--text-3); }

.item-right { display:flex; flex-direction:column; align-items:flex-end; gap:6px; flex-shrink:0; }
.del {
  width:24px; height:24px; border-radius:7px;
  background:var(--slate-100); color:var(--text-3);
  display:flex; align-items:center; justify-content:center;
  transition: background .18s, color .18s;
}
.del:hover { background:#fee2e2; color:var(--red-500); }

.qty {
  display:flex; align-items:center; gap:2px;
  background:var(--slate-100); border-radius:9px; padding:3px;
}
.qty button {
  width:26px; height:26px; border-radius:7px;
  background:var(--slate-200); font-size:16px; font-weight:700;
  color:var(--text-2); display:flex; align-items:center; justify-content:center;
  transition: background .15s, color .15s;
  line-height:1;
}
.qty button:hover { background:var(--green-500); color:#fff; }
.qty span { font-size:13px; font-weight:700; min-width:26px; text-align:center; }
.item-subtotal { font-size:13px; font-weight:700; color:var(--text); }

/* ─── Empty ─────────────────────────────────────────── */
.sb-empty {
  flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center;
  gap:10px; padding:40px; text-align:center;
}
.empty-art { margin-bottom:8px; opacity:.85; }
.sb-empty h3 { font-size:18px; font-weight:700; }
.sb-empty p  { color:var(--text-3); font-size:14px; }
.go-shop {
  margin-top:12px; padding:12px 32px;
  background:linear-gradient(135deg,var(--green-500),var(--green-600));
  color:#fff; border-radius:12px; font-size:14px; font-weight:700;
  transition: transform .2s var(--spring), box-shadow .2s;
}
.go-shop:hover { transform:translateY(-2px); box-shadow:var(--shadow-green); }

/* ─── Footer ────────────────────────────────────────── */
.sb-foot { padding:16px 20px 20px; border-top:1px solid var(--border); }

.promo-row { display:flex; gap:8px; margin-bottom:16px; }
.promo-input {
  flex:1; padding:10px 14px;
  border:1.5px solid var(--border); border-radius:10px;
  font-size:13px; font-family:inherit; outline:none; color:var(--text);
  transition: border-color .2s;
}
.promo-input:focus { border-color:var(--green-400); }
.promo-btn {
  padding:10px 16px; background:var(--slate-900); color:#fff;
  border-radius:10px; font-size:13px; font-weight:600;
  transition: background .18s;
}
.promo-btn:hover { background:var(--slate-700); }

.summary { display:flex; flex-direction:column; gap:8px; margin-bottom:14px; }
.sum-row { display:flex; justify-content:space-between; font-size:13px; color:var(--text-2); }
.free    { color:var(--green-600); font-weight:600; }
.discount-row .disc { color:var(--red-500); font-weight:600; }
.sum-total {
  display:flex; justify-content:space-between; align-items:center;
  padding-top:10px; border-top:1px solid var(--border);
  font-size:14px; font-weight:600;
}
.sum-total strong { font-size:20px; color:var(--green-700); }

.checkout-btn {
  width:100%; display:flex; align-items:center; justify-content:center; gap:8px;
  padding:15px; border-radius:14px; margin-bottom:8px;
  background:linear-gradient(135deg,var(--green-500),var(--green-600));
  color:#fff; font-size:15px; font-weight:700;
  transition: transform .2s var(--spring), box-shadow .2s;
}
.checkout-btn:hover { transform:translateY(-2px); box-shadow:var(--shadow-green); }

.clear-btn {
  width:100%; padding:10px; border-radius:10px;
  font-size:13px; font-weight:500; color:var(--red-400);
  transition: background .18s;
}
.clear-btn:hover { background:#fef2f2; }

/* ─── List transition ───────────────────────────────── */
.item-list-move,
.item-list-enter-active,
.item-list-leave-active { transition: all .25s var(--ease); }
.item-list-enter-from { opacity:0; transform:translateX(20px); }
.item-list-leave-to   { opacity:0; transform:translateX(20px); }

/* ─── Responsive ────────────────────────────────────── */
@media (max-width:480px) { .sidebar { width:100%; } }
</style>
