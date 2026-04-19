<template>
  <div class="page">

    <!-- Banner -->
    <div class="page-banner">
      <div class="container banner-inner">
        <div>
          <div class="breadcrumb">
            <router-link to="/">Bosh sahifa</router-link>
            <span>/</span>
            <span>Savat</span>
          </div>
          <h1>Mening Savatim</h1>
          <p>{{ cartStore.totalItems }} ta mahsulot tanlangan</p>
        </div>
        <div class="banner-icon">
          <svg viewBox="0 0 60 60" fill="none" width="60" height="60">
            <circle cx="30" cy="30" r="28" fill="rgba(74,222,128,.15)" stroke="rgba(74,222,128,.3)" stroke-width="1.5"/>
            <path d="M18 22h24l-3 16H21L18 22z" fill="none" stroke="white" stroke-width="1.8" stroke-linejoin="round"/>
            <circle cx="25" cy="42" r="2" fill="white"/>
            <circle cx="35" cy="42" r="2" fill="white"/>
            <path d="M14 18h3l1.5 4" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Filled cart -->
    <div class="container cart-layout" v-if="cartStore.items.length">

      <!-- Items -->
      <div class="items-col">
        <div class="items-head">
          <h2>Tanlangan mahsulotlar</h2>
          <button class="clear-btn" @click="cartStore.clearCart()">
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
            Barchasini o'chirish
          </button>
        </div>

        <TransitionGroup name="clist" class="items-list" tag="div">
          <div class="cart-row" v-for="item in cartStore.items" :key="item.id">
            <div class="row-img">
              <img :src="item.image" :alt="item.name" />
            </div>

            <div class="row-info">
              <p class="row-badge" v-if="item.badge">{{ item.badge }}</p>
              <h3>{{ item.name }}</h3>
              <p class="row-unit">{{ fmt(item.price) }} so'm / {{ item.unit || 'dona' }}</p>
            </div>

            <div class="row-qty">
              <button class="qty-btn" @click="cartStore.updateQty(item.id, item.qty - (item.step || 1))">
                <svg viewBox="0 0 12 12" fill="none" width="10" height="10">
                  <path d="M2 6h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
              </button>
              <span>{{ fmtQty(item) }}</span>
              <button class="qty-btn" @click="cartStore.updateQty(item.id, item.qty + (item.step || 1))">
                <svg viewBox="0 0 12 12" fill="none" width="10" height="10">
                  <path d="M6 2v8M2 6h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
              </button>
            </div>

            <div class="row-total">
              <strong>{{ fmt(item.price * item.qty) }}</strong>
              <span>so'm</span>
            </div>

            <button class="row-del" @click="cartStore.removeItem(item.id)" title="O'chirish">
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </TransitionGroup>

        <!-- Related/upsell strip -->
        <div class="continue-strip">
          <router-link to="/products" class="continue-link">
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
              <path d="M13 8H3M8 3l-5 5 5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Xaridni davom ettirish
          </router-link>
        </div>
      </div>

      <!-- Summary -->
      <div class="summary-col">
        <div class="summary-card">
          <h2>Buyurtma xulosasi</h2>

          <div class="sum-lines">
            <div class="sum-line">
              <span>Mahsulotlar ({{ cartStore.totalItems }} ta)</span>
              <span>{{ fmt(cartStore.totalPrice) }} so'm</span>
            </div>
            <div class="sum-line">
              <span>Yetkazib berish</span>
              <span class="free">Bepul 🎉</span>
            </div>
            <div v-if="discount" class="sum-line discount-line">
              <span>Chegirma ({{ discount }}%)</span>
              <span>–{{ fmt(Math.round(cartStore.totalPrice * discount/100)) }} so'm</span>
            </div>
          </div>

          <div class="sum-total">
            <span>Jami to'lov</span>
            <strong>{{ fmt(finalTotal) }} so'm</strong>
          </div>

          <!-- Promo -->
          <div class="promo-box">
            <label>Promo kod</label>
            <div class="promo-row">
              <input
                v-model="promoInput"
                type="text"
                placeholder="FRESHMART30"
                :class="{ error: promoError, success: discount > 0 }"
              />
              <button class="promo-apply" @click="applyPromo">Qo'llash</button>
            </div>
            <p v-if="promoError" class="promo-msg error-msg">❌ Noto'g'ri promo kod</p>
            <p v-if="discount" class="promo-msg success-msg">✅ {{ discount }}% chegirma qo'llandi!</p>
          </div>

          <router-link to="/checkout" class="checkout-btn">
            Buyurtma berish
            <svg viewBox="0 0 18 18" fill="none" width="16" height="16">
              <path d="M4 9h10M9 4l5 5-5 5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>

          <!-- Trust badges -->
          <div class="trust-badges">
            <div class="tb" v-for="t in trusts" :key="t">
              <svg viewBox="0 0 14 14" fill="none" width="13" height="13">
                <path d="M2 7l4 4 6-6" stroke="var(--green-500)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ t }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty cart -->
    <div v-else class="empty-page">
      <div class="container">
        <div class="empty-content">
          <div class="empty-art">
            <svg viewBox="0 0 160 160" fill="none" width="160" height="160">
              <circle cx="80" cy="80" r="76" fill="#f0fdf4" stroke="#dcfce7" stroke-width="2"/>
              <path d="M52 64h56l-7 38H59L52 64z" fill="#dcfce7" stroke="#4ade80" stroke-width="2" stroke-linejoin="round"/>
              <circle cx="68" cy="108" r="6" fill="#4ade80"/>
              <circle cx="92" cy="108" r="6" fill="#4ade80"/>
              <path d="M40 54h10l3 10" stroke="#86efac" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M74 82l4 4 8-8" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h2>Savat bo'sh</h2>
          <p>Yangi mahsulotlarni savatga qo'shing va buyurtma bering</p>
          <router-link to="/products" class="shop-btn">
            <svg viewBox="0 0 18 18" fill="none" width="16" height="16">
              <path d="M4 9h10M9 4l5 5-5 5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Xarid boshlash
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cart'

const cartStore   = useCartStore()
const promoInput  = ref('')
const promoError  = ref(false)
const discount    = ref(0)

const finalTotal = computed(() =>
  discount.value
    ? Math.round(cartStore.totalPrice * (1 - discount.value / 100))
    : cartStore.totalPrice
)

function fmt(n) { return n.toLocaleString('uz-UZ') }

function fmtQty(item) {
  const u = item.unit || 'dona'
  const q = (u === 'kg' || u === 'gr') ? item.qty.toFixed(1) : item.qty
  return `${q} ${u}`
}

function applyPromo() {
  promoError.value = false
  const code = promoInput.value.trim().toUpperCase()
  if (code === 'FRESHMART30') {
    discount.value = 30
  } else if (code === 'SAVE10') {
    discount.value = 10
  } else {
    promoError.value = true
    discount.value = 0
  }
}

const trusts = ['Xavfsiz to\'lov', 'Bepul yetkazish', '30 kun qaytarish kafolati']
</script>

<style scoped>
.page { padding-top:70px; }
@media (max-width:768px) { .page { padding-top:58px; } }

/* ─── Banner ─────────────────────────────────────── */
.page-banner {
  background:linear-gradient(135deg,#052e16,#14532d);
  padding:44px 0 36px;
}
.banner-inner { display:flex; justify-content:space-between; align-items:center; }
.breadcrumb { display:flex; align-items:center; gap:8px; font-size:13px; color:rgba(255,255,255,.45); margin-bottom:10px; }
.breadcrumb a { color:rgba(255,255,255,.45); transition:color .18s; }
.breadcrumb a:hover { color:rgba(255,255,255,.85); }
.banner-inner h1 { font-size:30px; font-weight:800; color:#fff; margin-bottom:4px; }
.banner-inner > div > p { color:rgba(255,255,255,.5); font-size:14px; }

/* ─── Layout ─────────────────────────────────────── */
.cart-layout {
  display:grid; grid-template-columns:1fr 380px;
  gap:28px; padding:36px 28px 80px; align-items:start;
}

/* ─── Items col ──────────────────────────────────── */
.items-col { display:flex; flex-direction:column; gap:16px; }
.items-head {
  display:flex; justify-content:space-between; align-items:center;
}
.items-head h2 { font-size:18px; font-weight:700; }
.clear-btn {
  display:flex; align-items:center; gap:6px;
  padding:7px 14px; border-radius:8px;
  background:#fef2f2; color:var(--red-500);
  font-size:12px; font-weight:600; border:1px solid #fecaca;
  transition: background .18s;
}
.clear-btn:hover { background:#fee2e2; }

.items-list { display:flex; flex-direction:column; gap:10px; }
.cart-row {
  display:flex; align-items:center; gap:16px;
  padding:16px; border-radius:var(--radius-lg);
  background:#fff; border:1px solid var(--border);
  transition: box-shadow .25s, border-color .25s;
  animation:fadeUp .22s var(--ease);
}
.cart-row:hover { box-shadow:var(--shadow-sm); border-color:var(--green-200,#bbf7d0); }

.row-img { width:76px; height:76px; border-radius:12px; overflow:hidden; flex-shrink:0; }
.row-img img { width:100%; height:100%; object-fit:cover; }

.row-info { flex:1; }
.row-badge {
  display:inline-block; padding:2px 9px; border-radius:50px;
  background:var(--green-500); color:#fff; font-size:10px; font-weight:700;
  margin-bottom:5px;
}
.row-info h3 { font-size:14px; font-weight:600; margin-bottom:3px; }
.row-unit { font-size:12px; color:var(--text-3); }

.row-qty {
  display:flex; align-items:center; gap:4px;
  background:var(--slate-100); border-radius:10px; padding:4px;
}
.qty-btn {
  width:30px; height:30px; border-radius:8px;
  display:flex; align-items:center; justify-content:center;
  background:var(--slate-200); color:var(--text-2);
  transition: background .15s, color .15s;
}
.qty-btn:hover { background:var(--green-500); color:#fff; }
.row-qty span { font-size:14px; font-weight:700; min-width:28px; text-align:center; }

.row-total { text-align:right; min-width:110px; }
.row-total strong { display:block; font-size:17px; font-weight:800; color:var(--green-700); }
.row-total span { font-size:11px; color:var(--text-3); }

.row-del {
  width:34px; height:34px; border-radius:9px; flex-shrink:0;
  background:var(--slate-100); color:var(--text-3);
  display:flex; align-items:center; justify-content:center;
  transition: background .18s, color .18s;
}
.row-del:hover { background:#fee2e2; color:var(--red-500); }

.continue-strip {
  padding:14px 0 0;
  border-top:1px dashed var(--border);
}
.continue-link {
  display:inline-flex; align-items:center; gap:6px;
  font-size:13px; font-weight:600; color:var(--green-700);
  transition: gap .2s;
}
.continue-link:hover { gap:10px; }

/* ─── Summary col ────────────────────────────────── */
.summary-card {
  background:#fff; border-radius:var(--radius-lg);
  border:1px solid var(--border); padding:24px;
  position:sticky; top:84px;
}
.summary-card h2 { font-size:17px; font-weight:700; margin-bottom:20px; }

.sum-lines { display:flex; flex-direction:column; gap:10px; margin-bottom:16px; }
.sum-line { display:flex; justify-content:space-between; font-size:14px; color:var(--text-2); }
.free { color:var(--green-600); font-weight:600; }
.discount-line span:last-child { color:var(--red-500); font-weight:600; }

.sum-total {
  display:flex; justify-content:space-between; align-items:center;
  padding:14px 0; border-top:1px solid var(--border);
  border-bottom:1px solid var(--border);
  margin-bottom:20px; font-size:14px; font-weight:600;
}
.sum-total strong { font-size:22px; color:var(--green-700); }

.promo-box { margin-bottom:20px; }
.promo-box label { display:block; font-size:12px; font-weight:600; color:var(--text-2); margin-bottom:8px; }
.promo-row { display:flex; gap:8px; }
.promo-row input {
  flex:1; padding:10px 13px; border-radius:10px;
  border:1.5px solid var(--border); font-size:13px; font-family:inherit;
  outline:none; color:var(--text); transition: border-color .2s;
}
.promo-row input:focus { border-color:var(--green-400); }
.promo-row input.error   { border-color:var(--red-400); }
.promo-row input.success { border-color:var(--green-500); background:var(--green-50); }
.promo-apply {
  padding:10px 14px; border-radius:10px;
  background:var(--slate-900); color:#fff;
  font-size:13px; font-weight:600; transition: background .18s;
}
.promo-apply:hover { background:var(--slate-700); }
.promo-msg { font-size:12px; margin-top:6px; }
.error-msg   { color:var(--red-500); }
.success-msg { color:var(--green-600); }

.checkout-btn {
  display:flex; align-items:center; justify-content:center; gap:8px;
  width:100%; padding:15px; border-radius:14px; margin-bottom:16px;
  background:linear-gradient(135deg,var(--green-500),var(--green-600));
  color:#fff; font-size:15px; font-weight:700;
  transition: transform .2s var(--spring), box-shadow .2s;
}
.checkout-btn:hover { transform:translateY(-2px); box-shadow:var(--shadow-green); }

.trust-badges { display:flex; flex-direction:column; gap:6px; }
.tb { display:flex; align-items:center; gap:7px; font-size:12px; color:var(--text-3); }

/* ─── Empty ──────────────────────────────────────── */
.empty-page { padding:80px 0; }
.empty-content { max-width:400px; margin:0 auto; text-align:center; }
.empty-art { margin-bottom:24px; }
.empty-content h2 { font-size:26px; font-weight:800; margin-bottom:8px; }
.empty-content p  { color:var(--text-3); font-size:15px; margin-bottom:28px; }
.shop-btn {
  display:inline-flex; align-items:center; gap:8px;
  padding:14px 36px; border-radius:14px;
  background:linear-gradient(135deg,var(--green-500),var(--green-600));
  color:#fff; font-size:15px; font-weight:700;
  transition: transform .2s var(--spring), box-shadow .2s;
}
.shop-btn:hover { transform:translateY(-3px); box-shadow:var(--shadow-green); }

/* ─── Transitions ────────────────────────────────── */
.clist-move,
.clist-enter-active,
.clist-leave-active { transition:all .28s var(--ease); }
.clist-enter-from { opacity:0; transform:translateX(-16px); }
.clist-leave-to   { opacity:0; transform:translateX(16px); }

/* ─── Responsive ─────────────────────────────────── */
@media (max-width:900px) {
  .cart-layout { grid-template-columns:1fr; padding:24px 0 60px; }
  .summary-card { position:static; }
}
@media (max-width:600px) {
  .page-banner { padding:32px 0 24px; }
  .banner-inner h1 { font-size:24px; }
  .cart-row { flex-wrap:wrap; gap:10px; }
  .row-img  { width:60px; height:60px; }
  .row-total { order:3; width:auto; text-align:left; }
  .row-total strong { font-size:15px; }
  .row-del   { order:4; margin-left:auto; }
  .items-head h2 { font-size:16px; }
}
@media (max-width:430px) {
  .row-info h3 { font-size:13px; }
  .sum-total strong { font-size:18px; }
  .checkout-btn { font-size:14px; padding:14px; }
}
</style>
