<template>
  <article class="card" @mouseenter="hover=true" @mouseleave="hover=false">

    <!-- Image area -->
    <div class="card-media-wrap">
      <router-link :to="'/product/' + product.id" class="card-media-link">
        <div class="card-media">
          <img :src="product.images ? product.images[0] : product.image" :alt="product.name" loading="lazy" />

          <!-- Overlay actions -->
          <!-- <div class="media-overlay" :class="{ show: hover }">
            <button class="ov-btn" @click.stop="addToCart" title="Savatga qo'shish">
              <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                <path d="M5 10h10M10 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Savatga qo'shish
            </button>
          </div> -->

          <!-- Badge -->
          <div v-if="product.badge" class="badge" :class="'badge-'+badge">
            {{ product.badge }}
          </div>

          <!-- Discount pill -->
          <div v-if="product.oldPrice" class="disc-pill">
            -{{ discPct }}%
          </div>
        </div>
      </router-link>

      <!-- Wishlist — router-link TASHQARISIDA -->
      <button
        class="wish"
        :class="{ active: productStore.isWishlisted(product.id) }"
        @click="productStore.toggleWishlist(product.id)"
        title="Sevimlilarga qo'shish"
      >
        <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
          <path d="M10 17s-7-4.5-7-9a4 4 0 018 0 4 4 0 018 0c0 4.5-7 9-7 9z"
                :fill="productStore.isWishlisted(product.id) ? '#ef4444' : 'none'"
                :stroke="productStore.isWishlisted(product.id) ? '#ef4444' : 'currentColor'"
                stroke-width="1.6" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <!-- Body -->
    <div class="card-body">
      <!-- Rating -->
      <div class="rating">
        <div class="stars">
          <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.round(product.rating) }">★</span>
        </div>
        <span class="r-val">{{ product.rating }}</span>
        <span class="r-cnt">({{ product.reviews }})</span>
      </div>

      <!-- Name -->
      <router-link :to="'/product/' + product.id">
        <h3 class="name">{{ product.name }}</h3>
      </router-link>

      <!-- Price -->
      <div class="price-row">
        <div class="price-group">
          <span class="price">{{ fmt(product.price) }}</span>
          <span class="currency">so'm</span>
          <span class="unit-label">/ {{ product.unit || 'dona' }}</span>
        </div>
        <span v-if="product.oldPrice" class="old-price">{{ fmt(product.oldPrice) }}</span>
      </div>

      <!-- Add button / Qty stepper -->
      <transition name="fade" mode="out-in">
        <div v-if="cartItem" key="stepper" class="qty-stepper">
          <button class="qs-btn" @click.stop="decrement">
            <svg viewBox="0 0 12 12" fill="none" width="11" height="11">
              <path d="M2 6h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <span class="qs-val">{{ fmtQty(cartItem) }}</span>
          <button class="qs-btn qs-plus" @click.stop="increment">
            <svg viewBox="0 0 12 12" fill="none" width="11" height="11">
              <path d="M6 2v8M2 6h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <button v-else key="addbtn" class="add-btn" @click="addToCart">
          <span class="btn-inner">
            <svg viewBox="0 0 18 18" fill="none" width="15" height="15">
              <path d="M9 4v10M4 9h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Savatga
          </span>
        </button>
      </transition>
    </div>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore }    from '../../stores/cart'
import { useProductStore } from '../../stores/products'

const props = defineProps({ product: Object })
const cartStore    = useCartStore()
const productStore = useProductStore()
const hover = ref(false)

const cartItem = computed(() => cartStore.items.find(i => i.id === props.product.id) || null)

const badgeMap = { 'Yangi':'new', 'Chegirma':'sale', 'Top':'top', 'Premium':'premium' }
const badge    = computed(() => badgeMap[props.product.badge] || 'new')
const discPct  = computed(() =>
  props.product.oldPrice
    ? Math.round((1 - props.product.price / props.product.oldPrice) * 100)
    : 0
)

function fmt(n) { return n.toLocaleString('uz-UZ') }

function fmtQty(item) {
  const u = item.unit || 'dona'
  const q = (u === 'kg' || u === 'gr') ? item.qty.toFixed(1) : item.qty
  return `${q} ${u}`
}

function addToCart() {
  cartStore.addItem({ ...props.product, image: props.product.images ? props.product.images[0] : props.product.image })
}

function increment() {
  cartStore.updateQty(props.product.id, cartItem.value.qty + (props.product.step || 1))
}

function decrement() {
  cartStore.updateQty(props.product.id, cartItem.value.qty - (props.product.step || 1))
}
</script>

<style scoped>
/* ─── Media wrappers ────────────────────────────────── */
.card-media-wrap { position:relative; }
.card-media-link { display:block; }

/* ─── Card shell ────────────────────────────────────── */
.card {
  background:#fff; border-radius:var(--radius-lg);
  overflow:hidden;
  border:1px solid var(--border);
  transition: transform .3s var(--spring), box-shadow .3s var(--ease), border-color .3s;
  display:flex; flex-direction:column;
}
.card:hover {
  transform:translateY(-6px);
  box-shadow:var(--shadow-md);
  border-color:var(--green-200, #bbf7d0);
}

/* ─── Media ─────────────────────────────────────────── */
.card-media {
  position:relative;
  aspect-ratio:1/1;
  overflow:hidden;
  background:var(--slate-50);
}
.card-media img {
  width:100%; height:100%; object-fit:cover;
  transition: transform .5s var(--ease);
}
.card:hover .card-media img { transform:scale(1.07); }

/* Overlay */
.media-overlay {
  position:absolute; inset:0;
  background:rgba(15,23,42,.28);
  display:flex; align-items:flex-end; justify-content:center;
  padding-bottom:16px;
  opacity:0; transition: opacity .25s;
}
.media-overlay.show { opacity:1; }
.ov-btn {
  display:flex; align-items:center; gap:6px;
  padding:10px 22px; border-radius:50px;
  background:#fff; color:var(--text);
  font-size:13px; font-weight:600;
  transform:translateY(10px);
  transition: transform .25s var(--spring), background .18s, color .18s;
  box-shadow:var(--shadow-sm);
}
.media-overlay.show .ov-btn { transform:translateY(0); }
.ov-btn:hover { background:var(--green-500); color:#fff; }

/* Badge */
.badge {
  position:absolute; top:12px; left:12px;
  padding:4px 10px; border-radius:50px;
  font-size:10px; font-weight:700; letter-spacing:.5px; text-transform:uppercase;
}
.badge-new     { background:var(--green-500); color:#fff; }
.badge-sale    { background:var(--orange-500); color:#fff; }
.badge-top     { background:var(--yellow-400); color:var(--slate-900); }
.badge-premium { background:#7c3aed; color:#fff; }

/* Wishlist */
.wish {
  position:absolute; top:12px; right:12px;
  width:34px; height:34px; border-radius:10px;
  background:rgba(255,255,255,.9); backdrop-filter:blur(4px);
  color:var(--text-2);
  display:flex; align-items:center; justify-content:center;
  transition: transform .2s var(--spring), background .18s;
  box-shadow:var(--shadow-sm);
}
.wish:hover  { transform:scale(1.15); }
.wish.active { background:#fff3; }

/* Discount pill */
.disc-pill {
  position:absolute; bottom:12px; left:12px;
  padding:4px 10px; border-radius:50px;
  background:#fee2e2; color:var(--red-500);
  font-size:11px; font-weight:700;
}

/* ─── Body ──────────────────────────────────────────── */
.card-body { padding:14px 16px 16px; display:flex; flex-direction:column; gap:8px; flex:1; }

/* Rating */
.rating { display:flex; align-items:center; gap:5px; }
.stars  { display:flex; gap:1px; }
.star { font-size:12px; color:var(--slate-200); transition: color .15s; }
.star.filled { color:var(--yellow-400); }
.r-val { font-size:12px; font-weight:700; color:var(--text); }
.r-cnt { font-size:12px; color:var(--text-3); }

/* Name */
.name {
  font-size:14px; font-weight:600; color:var(--text); line-height:1.35;
  display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
  flex:1; transition: color .18s;
}
a:hover .name { color: var(--green-700); }

/* Price */
.price-row { display:flex; align-items:center; justify-content:space-between; }
.price-group { display:flex; align-items:baseline; gap:4px; }
.price    { font-size:18px; font-weight:800; color:var(--green-700); }
.currency { font-size:11px; color:var(--text-3); }
.unit-label { font-size:11px; color:var(--text-3); }
.old-price { font-size:12px; color:var(--text-3); text-decoration:line-through; }

/* Qty stepper */
.qty-stepper {
  display:flex; align-items:center; justify-content:space-between;
  width:100%; border-radius:10px;
  background:var(--green-500);
  padding:4px;
}
.qs-btn {
  width:32px; height:32px; border-radius:8px;
  display:flex; align-items:center; justify-content:center;
  background:rgba(255,255,255,.2); color:#fff;
  transition: background .15s;
  flex-shrink:0;
}
.qs-btn:hover { background:rgba(255,255,255,.35); }
.qs-val {
  font-size:13px; font-weight:700; color:#fff;
  min-width:52px; text-align:center;
}

/* Add button */
.add-btn {
  width:100%; padding:10px 14px; border-radius:10px;
  font-size:13px; font-weight:600;
  background:var(--green-50); color:var(--green-700);
  border:1.5px solid var(--green-200, #bbf7d0);
  transition: background .2s, border-color .2s, color .2s, transform .2s var(--spring), box-shadow .2s;
  overflow:hidden;
}
.add-btn:hover {
  background:var(--green-500); color:#fff;
  border-color:var(--green-500);
  transform:translateY(-1px);
  box-shadow:0 4px 16px rgba(34,197,94,.25);
}
.add-btn.added {
  background:var(--green-600); color:#fff;
  border-color:var(--green-600);
}
.btn-inner { display:flex; align-items:center; justify-content:center; gap:6px; }

@media (max-width:430px) {
  .card-body { padding:10px 12px 12px; gap:6px; }
  .name { font-size:13px; }
  .price { font-size:15px; }
  .add-btn { padding:9px 10px; font-size:12px; }
  .r-val, .r-cnt { font-size:11px; }
  .qs-btn { width:28px; height:28px; }
  .qs-val { font-size:12px; }
}
@media (max-width:375px) {
  .card-body { padding:8px 10px 10px; }
  .name { font-size:12px; }
  .price { font-size:13px; }
  .add-btn { padding:8px 6px; font-size:11px; }
  .old-price { display:none; }
  .qs-val { font-size:11px; min-width:40px; }
}
</style>
