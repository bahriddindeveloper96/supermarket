<template>
  <div class="detail-page" v-if="product">

    <!-- Breadcrumb -->
    <div class="breadcrumb-bar">
      <div class="container">
        <nav class="breadcrumb">
          <router-link to="/">Bosh sahifa</router-link>
          <svg viewBox="0 0 12 12" fill="none" width="10" height="10">
            <path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <router-link to="/products">Mahsulotlar</router-link>
          <svg viewBox="0 0 12 12" fill="none" width="10" height="10">
            <path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span>{{ product.name }}</span>
        </nav>
      </div>
    </div>

    <!-- Main content -->
    <div class="container detail-layout">

      <!-- ── LEFT: Gallery ── -->
      <div class="gallery">
        <!-- Main image -->
        <div class="main-img-wrap">
          <transition name="img-fade" mode="out-in">
            <img
              :key="activeImg"
              :src="product.images[activeImg]"
              :alt="product.name"
              class="main-img"
            />
          </transition>

          <!-- Badge -->
          <div v-if="product.badge" class="img-badge" :class="'badge-' + badgeClass">
            {{ product.badge }}
          </div>

          <!-- Prev / Next -->
          <button class="img-nav prev" @click="prevImg" v-if="product.images.length > 1">
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
              <path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="img-nav next" @click="nextImg" v-if="product.images.length > 1">
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
              <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- Dots -->
          <div class="img-dots" v-if="product.images.length > 1">
            <button
              v-for="(_, i) in product.images" :key="i"
              class="dot" :class="{ active: activeImg === i }"
              @click="activeImg = i"
            />
          </div>
        </div>

        <!-- Thumbnails -->
        <div class="thumbs" v-if="product.images.length > 1">
          <button
            v-for="(img, i) in product.images" :key="i"
            class="thumb" :class="{ active: activeImg === i }"
            @click="activeImg = i"
          >
            <img :src="img" :alt="product.name + ' ' + (i+1)" />
          </button>
        </div>
      </div>

      <!-- ── RIGHT: Info ── -->
      <div class="info-col">

        <!-- Category tag -->
        <div class="cat-tag">
          <span>{{ catName }}</span>
        </div>

        <!-- Name -->
        <h1 class="product-title">{{ product.name }}</h1>

        <!-- Rating row -->
        <div class="rating-row">
          <div class="stars-wrap">
            <span
              v-for="i in 5" :key="i"
              class="star" :class="{ filled: i <= Math.round(product.rating) }"
            >★</span>
          </div>
          <span class="rating-num">{{ product.rating }}</span>
          <span class="rating-sep">·</span>
          <span class="reviews-num">{{ product.reviews }} ta sharh</span>
          <span class="rating-sep">·</span>
          <span class="stock-badge" :class="product.inStock ? 'in' : 'out'">
            {{ product.inStock ? '✓ Mavjud' : '✗ Tugagan' }}
          </span>
        </div>

        <!-- Price block -->
        <div class="price-block">
          <div class="price-main">
            <span class="price-val">{{ fmt(totalPrice) }}</span>
            <span class="price-cur">so'm</span>
          </div>
          <div class="price-meta">
            <span v-if="product.oldPrice" class="old-price">{{ fmt(product.oldPrice * qty) }} so'm</span>
            <span v-if="product.oldPrice" class="discount-pill">
              –{{ discPct }}%
            </span>
          </div>
          <p class="unit-note">
            1 {{ product.unit }} = {{ fmt(product.price) }} so'm
          </p>
        </div>

        <div class="divider"/>

        <!-- Quantity selector -->
        <div class="qty-section">
          <label class="qty-label">Miqdor</label>
          <div class="qty-row">
            <div class="qty-control">
              <button class="qty-btn minus" @click="decQty" :disabled="qty <= product.minQty">
                <svg viewBox="0 0 14 14" fill="none" width="12" height="12">
                  <path d="M2 7h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
              <div class="qty-display">
                <span class="qty-val">{{ displayQty }}</span>
                <span class="qty-unit">{{ product.unit }}</span>
              </div>
              <button class="qty-btn plus" @click="incQty">
                <svg viewBox="0 0 14 14" fill="none" width="12" height="12">
                  <path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>

            <!-- Quick qty chips -->
            <div class="qty-chips">
              <button
                v-for="q in quickQtys" :key="q"
                class="qty-chip" :class="{ active: qty === q }"
                @click="qty = q"
              >
                {{ q }} {{ product.unit }}
              </button>
            </div>
          </div>
        </div>

        <!-- Actions (desktop) -->
        <div class="action-row">
          <button class="add-cart-btn" :class="{ added }" @click="addToCart" :disabled="!product.inStock">
            <transition name="fade" mode="out-in">
              <span v-if="!added" key="a" class="btn-content">
                <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                  <path d="M2.5 3.5h1.8l.9 1.8m0 0L7 12h9l2-6.7H5.2z"
                    stroke="white" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="8" cy="15.5" r="1.2" fill="white"/>
                  <circle cx="14" cy="15.5" r="1.2" fill="white"/>
                </svg>
                Savatga qo'shish · {{ fmt(totalPrice) }} so'm
              </span>
              <span v-else key="b" class="btn-content">
                <svg viewBox="0 0 18 18" fill="none" width="18" height="18">
                  <path d="M3 9l5 5 8-8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Savatga qo'shildi!
              </span>
            </transition>
          </button>

          <button
            class="wish-btn"
            :class="{ active: productStore.isWishlisted(product.id) }"
            @click="productStore.toggleWishlist(product.id)"
            title="Sevimlilar"
          >
            <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
              <path d="M10 17C10 17 2.5 12 2.5 7a4.5 4.5 0 019 0 4.5 4.5 0 019 0C20.5 12 10 17 10 17z"
                :fill="productStore.isWishlisted(product.id) ? '#ef4444' : 'none'"
                :stroke="productStore.isWishlisted(product.id) ? '#ef4444' : 'currentColor'"
                stroke-width="1.7" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- Open cart shortcut -->
        <button v-if="cartStore.totalItems" class="view-cart-link" @click="cartStore.isOpen = true">
          Savatni ko'rish ({{ cartStore.totalItems }} ta mahsulot) →
        </button>

        <!-- Mobile sticky bottom bar (shown only on mobile via CSS) -->
        <div class="mob-sticky-bar">
          <div class="msb-price">
            <span class="msb-val">{{ fmt(totalPrice) }}</span>
            <span class="msb-cur">so'm</span>
          </div>
          <button
            class="msb-wish"
            :class="{ active: productStore.isWishlisted(product.id) }"
            @click="productStore.toggleWishlist(product.id)"
          >
            <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
              <path d="M10 17C10 17 2.5 12 2.5 7a4.5 4.5 0 019 0 4.5 4.5 0 019 0C20.5 12 10 17 10 17z"
                :fill="productStore.isWishlisted(product.id) ? '#ef4444' : 'none'"
                :stroke="productStore.isWishlisted(product.id) ? '#ef4444' : 'currentColor'"
                stroke-width="1.7" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="msb-cart" :class="{ added }" @click="addToCart" :disabled="!product.inStock">
            <transition name="fade" mode="out-in">
              <span v-if="!added" key="a" class="btn-content">
                <svg viewBox="0 0 20 20" fill="none" width="17" height="17">
                  <path d="M2.5 3.5h1.8l.9 1.8m0 0L7 12h9l2-6.7H5.2z" stroke="white" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="8" cy="15.5" r="1.2" fill="white"/>
                  <circle cx="14" cy="15.5" r="1.2" fill="white"/>
                </svg>
                Savatga qo'shish
              </span>
              <span v-else key="b" class="btn-content">
                <svg viewBox="0 0 18 18" fill="none" width="17" height="17">
                  <path d="M3 9l5 5 8-8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Qo'shildi!
              </span>
            </transition>
          </button>
        </div>

        <div class="divider"/>

        <!-- Description -->
        <div class="desc-section">
          <h3>Mahsulot haqida</h3>
          <p>{{ product.description }}</p>
        </div>

        <!-- Details table -->
        <div class="details-table">
          <h3>Tafsilotlar</h3>
          <div class="dt-grid">
            <div class="dt-row" v-for="(val, key) in product.details" :key="key">
              <span class="dt-key">{{ key }}</span>
              <span class="dt-val">{{ val }}</span>
            </div>
          </div>
        </div>

        <!-- Delivery info -->
        <div class="delivery-info">
          <div class="di-item">
            <div class="di-icon">🚚</div>
            <div>
              <strong>Bepul yetkazish</strong>
              <p>30 daqiqa ichida eshigingizga</p>
            </div>
          </div>
          <div class="di-item">
            <div class="di-icon">🔄</div>
            <div>
              <strong>Qaytarish kafolati</strong>
              <p>30 kun ichida qaytarish mumkin</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Related products -->
    <section class="related-section">
      <div class="container">
        <h2 class="related-title">O'xshash mahsulotlar</h2>
        <div class="related-grid">
          <ProductCard v-for="p in related" :key="p.id" :product="p" />
        </div>
      </div>
    </section>

  </div>

  <!-- Not found -->
  <div v-else class="not-found">
    <div class="container">
      <div class="nf-content">
        <span class="nf-emoji">😔</span>
        <h2>Mahsulot topilmadi</h2>
        <router-link to="/products" class="nf-btn">Barcha mahsulotlar</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore }    from '../stores/cart'
import { useProductStore } from '../stores/products'
import { products, categories } from '../data/products'
import ProductCard from '../components/ui/ProductCard.vue'

const route        = useRoute()
const cartStore    = useCartStore()
const productStore = useProductStore()

const product  = computed(() => products.find(p => p.id === Number(route.params.id)))
const catName  = computed(() => categories.find(c => c.id === product.value?.category)?.name || '')
const related  = computed(() =>
  products.filter(p => p.category === product.value?.category && p.id !== product.value?.id).slice(0, 4)
)

const activeImg = ref(0)
const added     = ref(false)
const qty       = ref(1)

// reset on product change
watch(product, () => { activeImg.value = 0; qty.value = product.value?.minQty || 1 }, { immediate: true })

const badgeMap  = { 'Yangi':'new', 'Chegirma':'sale', 'Top':'top', 'Premium':'premium' }
const badgeClass = computed(() => badgeMap[product.value?.badge] || 'new')

const discPct    = computed(() =>
  product.value?.oldPrice
    ? Math.round((1 - product.value.price / product.value.oldPrice) * 100)
    : 0
)

const totalPrice = computed(() =>
  product.value ? Math.round(product.value.price * qty.value) : 0
)

const displayQty = computed(() =>
  product.value?.unit === 'kg' ? qty.value.toFixed(1) : qty.value
)

const quickQtys = computed(() => {
  if (!product.value) return []
  return product.value.unit === 'kg'
    ? [0.5, 1, 1.5, 2, 3]
    : [1, 2, 3, 5]
})

function incQty() {
  qty.value = Math.round((qty.value + product.value.step) * 10) / 10
}
function decQty() {
  const next = Math.round((qty.value - product.value.step) * 10) / 10
  if (next >= product.value.minQty) qty.value = next
}

function addToCart() {
  if (!product.value) return
  for (let i = 0; i < (product.value.unit === 'dona' ? qty.value : 1); i++) {
    cartStore.addItem({ ...product.value, image: product.value.images[0] })
  }
  if (product.value.unit === 'kg') {
    const existing = cartStore.items.find(i => i.id === product.value.id)
    if (existing) existing.qty = qty.value
  }
  added.value = true
  setTimeout(() => added.value = false, 2000)
}

function fmt(n) { return Math.round(n).toLocaleString('uz-UZ') }

function prevImg() {
  activeImg.value = (activeImg.value - 1 + product.value.images.length) % product.value.images.length
}
function nextImg() {
  activeImg.value = (activeImg.value + 1) % product.value.images.length
}
</script>

<style scoped>
.detail-page { padding-top: 70px; min-height: 100vh; }
@media (max-width: 768px) { .detail-page { padding-top: 58px; } }

/* ── Breadcrumb ──────────────────────────────────────── */
.breadcrumb-bar {
  background: #fff;
  border-bottom: 1px solid var(--border);
  padding: 14px 0;
}
.breadcrumb {
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; color: var(--text-3);
}
.breadcrumb a { color: var(--text-3); transition: color .18s; }
.breadcrumb a:hover { color: var(--green-600); }
.breadcrumb span { color: var(--text); font-weight: 500; }

/* ── Layout ─────────────────────────────────────────── */
.detail-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 52px;
  padding: 40px 28px 80px;
  align-items: start;
}

/* ═══ GALLERY ═══════════════════════════════════════════ */
.gallery { display: flex; flex-direction: column; gap: 14px; position: sticky; top: 84px; }

.main-img-wrap {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: var(--slate-50);
  aspect-ratio: 1/1;
  border: 1px solid var(--border);
}
.main-img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
}

/* Badge */
.img-badge {
  position: absolute; top: 14px; left: 14px;
  padding: 5px 12px; border-radius: 50px;
  font-size: 12px; font-weight: 700; letter-spacing: .4px;
  text-transform: uppercase;
}
.badge-new     { background: var(--green-500); color: #fff; }
.badge-sale    { background: #f97316; color: #fff; }
.badge-top     { background: #facc15; color: var(--slate-900); }
.badge-premium { background: #7c3aed; color: #fff; }

/* Nav arrows */
.img-nav {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 38px; height: 38px; border-radius: 50%;
  background: rgba(255,255,255,.9); backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  color: var(--text-2); box-shadow: var(--shadow-sm);
  transition: background .18s, transform .2s var(--spring);
}
.img-nav:hover { background: #fff; transform: translateY(-50%) scale(1.08); }
.prev { left: 12px; }
.next { right: 12px; }

/* Dots */
.img-dots {
  position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 6px;
}
.dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: rgba(255,255,255,.5); transition: all .2s;
}
.dot.active { background: #fff; width: 22px; border-radius: 4px; }

/* Thumbnails */
.thumbs {
  display: flex; gap: 10px; flex-wrap: wrap;
}
.thumb {
  width: 72px; height: 72px; border-radius: 12px;
  overflow: hidden;
  border: 2px solid var(--border);
  transition: border-color .2s, transform .2s var(--spring);
  flex-shrink: 0;
}
.thumb:hover   { border-color: var(--green-400); transform: translateY(-2px); }
.thumb.active  { border-color: var(--green-500); box-shadow: 0 0 0 3px rgba(34,197,94,.2); }
.thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* Image transition */
.img-fade-enter-active, .img-fade-leave-active { transition: opacity .22s var(--ease); }
.img-fade-enter-from, .img-fade-leave-to { opacity: 0; }

/* ═══ INFO ══════════════════════════════════════════════ */
.info-col { display: flex; flex-direction: column; gap: 0; }

.cat-tag {
  margin-bottom: 12px;
}
.cat-tag span {
  padding: 4px 14px; border-radius: 50px;
  background: var(--green-50);
  color: var(--green-700);
  border: 1px solid var(--green-200, #bbf7d0);
  font-size: 12px; font-weight: 700;
}

.product-title {
  font-size: 32px; font-weight: 800; color: var(--text);
  line-height: 1.15; letter-spacing: -.5px;
  margin-bottom: 14px;
}

.rating-row {
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
  margin-bottom: 20px;
}
.stars-wrap { display: flex; gap: 2px; }
.star { font-size: 16px; color: var(--slate-200); transition: color .15s; }
.star.filled { color: #facc15; }
.rating-num { font-size: 14px; font-weight: 700; color: var(--text); }
.rating-sep { color: var(--text-3); }
.reviews-num { font-size: 14px; color: var(--text-3); }
.stock-badge {
  padding: 3px 10px; border-radius: 50px;
  font-size: 12px; font-weight: 700;
}
.stock-badge.in  { background: var(--green-100); color: var(--green-700); }
.stock-badge.out { background: #fee2e2; color: var(--red-500); }

/* Price block */
.price-block { margin-bottom: 20px; }
.price-main { display: flex; align-items: baseline; gap: 6px; margin-bottom: 6px; }
.price-val { font-size: 36px; font-weight: 900; color: var(--green-700); letter-spacing: -.5px; }
.price-cur { font-size: 16px; color: var(--text-3); }
.price-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
.old-price { font-size: 16px; color: var(--text-3); text-decoration: line-through; }
.discount-pill {
  padding: 3px 10px; border-radius: 50px;
  background: #fee2e2; color: var(--red-500);
  font-size: 12px; font-weight: 700;
}
.unit-note { font-size: 13px; color: var(--text-3); }

.divider { height: 1px; background: var(--border); margin: 20px 0; }

/* Qty */
.qty-section { margin-bottom: 20px; }
.qty-label { display: block; font-size: 12px; font-weight: 700; color: var(--text-2); text-transform: uppercase; letter-spacing: .8px; margin-bottom: 12px; }
.qty-row { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }

.qty-control {
  display: flex; align-items: center; gap: 0;
  background: var(--slate-100); border-radius: 14px;
  border: 1.5px solid var(--border);
  overflow: hidden;
}
.qty-btn {
  width: 44px; height: 52px;
  display: flex; align-items: center; justify-content: center;
  color: var(--text-2);
  transition: background .18s, color .18s;
}
.qty-btn:hover:not(:disabled) { background: var(--green-500); color: #fff; }
.qty-btn:disabled { opacity: .35; cursor: not-allowed; }

.qty-display {
  display: flex; align-items: baseline; gap: 4px;
  padding: 0 20px; min-width: 80px; justify-content: center;
}
.qty-val  { font-size: 20px; font-weight: 800; color: var(--text); }
.qty-unit { font-size: 12px; color: var(--text-3); }

.qty-chips { display: flex; gap: 6px; flex-wrap: wrap; }
.qty-chip {
  padding: 8px 14px; border-radius: 10px;
  background: var(--slate-100); color: var(--text-2);
  border: 1.5px solid var(--border);
  font-size: 13px; font-weight: 600;
  transition: all .18s;
}
.qty-chip:hover  { border-color: var(--green-400); color: var(--green-700); }
.qty-chip.active { background: var(--green-500); color: #fff; border-color: var(--green-500); }

/* Actions */
.action-row { display: flex; gap: 10px; margin-bottom: 12px; }

.add-cart-btn {
  flex: 1;
  padding: 16px 24px; border-radius: 14px;
  background: linear-gradient(135deg, var(--green-500), var(--green-600));
  color: #fff; font-size: 15px; font-weight: 700;
  transition: transform .2s var(--spring), box-shadow .2s, background .2s;
  overflow: hidden;
}
.add-cart-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: var(--shadow-green); }
.add-cart-btn:disabled { opacity: .5; cursor: not-allowed; }
.add-cart-btn.added { background: linear-gradient(135deg, #3b82f6, #2563eb); }
.btn-content { display: flex; align-items: center; justify-content: center; gap: 8px; }

.wish-btn {
  width: 54px; height: 54px; border-radius: 14px;
  background: var(--slate-100);
  border: 1.5px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  color: var(--text-3);
  transition: all .2s var(--spring);
}
.wish-btn:hover  { border-color: var(--red-400); color: var(--red-400); transform: scale(1.06); }
.wish-btn.active { border-color: var(--red-400); background: #fef2f2; }

.view-cart-link {
  width: 100%; text-align: center; padding: 10px;
  font-size: 13px; font-weight: 600; color: var(--green-700);
  transition: color .18s;
  background: none;
}
.view-cart-link:hover { color: var(--green-900, #14532d); }

/* Description */
.desc-section { margin-bottom: 20px; }
.desc-section h3, .details-table h3 {
  font-size: 15px; font-weight: 700; color: var(--text);
  margin-bottom: 10px;
}
.desc-section p { font-size: 14px; color: var(--text-2); line-height: 1.75; }

/* Details */
.details-table { margin-bottom: 20px; }
.dt-grid { display: flex; flex-direction: column; gap: 0; }
.dt-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 14px; border-radius: 8px;
  font-size: 14px;
  transition: background .15s;
}
.dt-row:nth-child(odd) { background: var(--slate-50); }
.dt-row:hover { background: var(--green-50); }
.dt-key { color: var(--text-3); font-weight: 500; }
.dt-val { color: var(--text); font-weight: 600; }

/* Delivery info */
.delivery-info {
  display: flex; gap: 12px; flex-wrap: wrap;
}
.di-item {
  flex: 1; min-width: 160px;
  display: flex; align-items: center; gap: 12px;
  padding: 14px 16px; border-radius: 12px;
  background: var(--slate-50); border: 1px solid var(--border);
}
.di-icon { font-size: 24px; flex-shrink: 0; }
.di-item strong { display: block; font-size: 13px; font-weight: 700; margin-bottom: 2px; }
.di-item p { font-size: 12px; color: var(--text-3); margin: 0; }

/* ── Related ────────────────────────────────────────── */
.related-section {
  background: #fff;
  border-top: 1px solid var(--border);
  padding: 52px 0 64px;
}
.related-title {
  font-size: 24px; font-weight: 800; letter-spacing: -.3px;
  margin-bottom: 28px;
}
.related-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px;
}

/* ── Not found ──────────────────────────────────────── */
.not-found { padding: 120px 0; }
.nf-content { text-align: center; }
.nf-emoji { font-size: 64px; display: block; margin-bottom: 16px; }
.nf-content h2 { font-size: 24px; font-weight: 700; margin-bottom: 20px; }
.nf-btn {
  display: inline-block; padding: 12px 32px; border-radius: 12px;
  background: var(--green-500); color: #fff; font-weight: 700;
}

/* ── Mobile sticky bar (hidden on desktop) ──────────── */
.mob-sticky-bar { display: none; }

/* ── Responsive: Tablet ─────────────────────────────── */
@media (max-width: 960px) {
  .detail-layout {
    grid-template-columns: 1fr;
    gap: 0;
    padding: 32px 0 120px;
  }
  .gallery { position: static; }
  .related-grid { grid-template-columns: repeat(2, 1fr); }
  .related-section { padding: 40px 0 52px; }
}

/* ── Responsive: Mobile ─────────────────────────────── */
@media (max-width: 768px) {
  .detail-page { padding-top: 58px; }

  /* ─ Breadcrumb ─ */
  .breadcrumb-bar { padding: 12px 0; background: var(--slate-50); }
  .breadcrumb { font-size: 12px; gap: 6px; flex-wrap: nowrap; overflow: hidden; }
  .breadcrumb span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  /* ─ Layout: gallery goes full-bleed ─ */
  .detail-layout { padding: 0 0 140px; }
  .gallery {
    margin-left: -20px;
    margin-right: -20px;
    width: calc(100% + 40px);
  }
  .main-img-wrap {
    border-radius: 0;
    border-left: none;
    border-right: none;
    border-top: none;
    aspect-ratio: 4/3;
  }
  .thumbs {
    padding: 12px 20px 4px;
    gap: 8px;
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
  }
  .thumbs::-webkit-scrollbar { display: none; }
  .thumb { width: 60px; height: 60px; flex-shrink: 0; }

  /* ─ Info section ─ */
  .info-col {
    padding: 24px 20px 0;
  }

  .cat-tag { margin-bottom: 8px; }
  .cat-tag span { font-size: 12px; padding: 4px 12px; }

  .product-title {
    font-size: 22px;
    font-weight: 800;
    line-height: 1.25;
    margin-bottom: 12px;
    letter-spacing: -.3px;
  }

  .rating-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 16px;
  }
  .star { font-size: 15px; }
  .rating-num  { font-size: 13px; }
  .reviews-num { font-size: 13px; }

  .price-block { margin-bottom: 16px; }
  .price-val { font-size: 30px; font-weight: 900; }
  .price-cur { font-size: 15px; }
  .old-price { font-size: 14px; }
  .unit-note { font-size: 12px; }

  .divider { margin: 18px 0; }

  /* ─ Qty selector ─ */
  .qty-section { margin-bottom: 0; }
  .qty-label { font-size: 11px; margin-bottom: 10px; }
  .qty-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .qty-control { border-radius: 14px; }
  .qty-btn { width: 48px; height: 52px; }
  .qty-display { padding: 0 20px; min-width: 80px; }
  .qty-val  { font-size: 20px; }
  .qty-unit { font-size: 12px; }
  .qty-chips { display: flex; gap: 8px; flex-wrap: wrap; }
  .qty-chip {
    padding: 9px 16px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
  }

  /* ─ Desktop actions hidden, sticky bar shown ─ */
  .action-row     { display: none; }
  .view-cart-link { display: none; }

  .mob-sticky-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    position: fixed;
    bottom: 68px;
    left: 0; right: 0;
    z-index: 150;
    background: rgba(255,255,255,.98);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-top: 1px solid var(--border);
    padding: 10px 16px max(10px, env(safe-area-inset-bottom));
    box-shadow: 0 -6px 28px rgba(0,0,0,.1);
  }
  .msb-price {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    min-width: 90px;
  }
  .msb-val {
    font-size: 18px; font-weight: 900;
    color: var(--green-700); letter-spacing: -.3px;
    line-height: 1.1;
  }
  .msb-cur { font-size: 11px; color: var(--text-3); }

  .msb-wish {
    width: 50px; height: 50px; border-radius: 14px; flex-shrink: 0;
    background: var(--slate-100);
    border: 1.5px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--text-3);
    transition: all .2s var(--spring);
  }
  .msb-wish:active  { transform: scale(.92); }
  .msb-wish.active  { border-color: #ef4444; background: #fef2f2; }

  .msb-cart {
    flex: 1; height: 50px; border-radius: 14px;
    background: linear-gradient(135deg, var(--green-500), var(--green-600));
    color: #fff; font-size: 14px; font-weight: 700;
    transition: opacity .2s, transform .2s var(--spring);
    overflow: hidden;
    box-shadow: 0 4px 14px rgba(34,197,94,.3);
  }
  .msb-cart:active  { transform: scale(.97); }
  .msb-cart.added   { background: linear-gradient(135deg, #3b82f6, #2563eb); }
  .msb-cart:disabled { opacity: .45; cursor: not-allowed; }

  /* ─ Description & details ─ */
  .desc-section { margin-bottom: 24px; }
  .desc-section h3, .details-table h3 {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 12px;
  }
  .desc-section p {
    font-size: 14px;
    line-height: 1.75;
    color: var(--text-2);
  }
  .dt-row { padding: 11px 14px; font-size: 13px; }
  .details-table { margin-bottom: 24px; }

  /* ─ Delivery cards ─ */
  .delivery-info { flex-direction: column; gap: 10px; }
  .di-item       { min-width: unset; padding: 14px 16px; }
  .di-icon       { font-size: 22px; }
  .di-item strong { font-size: 13px; }
  .di-item p     { font-size: 12px; }

  /* ─ Related ─ */
  .related-section { padding: 32px 0 48px; margin-top: 24px; }
  .related-title   { font-size: 20px; margin-bottom: 18px; }
  .related-grid    { grid-template-columns: repeat(2, 1fr); gap: 10px; }
}

/* ── Small phones (430px) ────────────────────────────── */
@media (max-width: 430px) {
  .gallery {
    margin-left: -14px;
    margin-right: -14px;
    width: calc(100% + 28px);
  }
  .info-col { padding: 20px 16px 0; }
  .thumbs { padding: 10px 14px 4px; gap: 7px; }
  .thumb  { width: 54px; height: 54px; }

  .product-title { font-size: 20px; }
  .price-val     { font-size: 26px; }

  .qty-btn    { width: 44px; height: 50px; }
  .qty-val    { font-size: 18px; }
  .qty-chips  { gap: 6px; }
  .qty-chip   { padding: 8px 13px; font-size: 12px; }

  .msb-val  { font-size: 17px; }
  .msb-cart { font-size: 13px; }
  .msb-wish { width: 46px; height: 46px; }
  .msb-cart { height: 46px; }
}

/* ── Very small phones (375px) ───────────────────────── */
@media (max-width: 375px) {
  .product-title { font-size: 18px; }
  .price-val     { font-size: 24px; }
  .qty-chips     { gap: 5px; }
  .qty-chip      { padding: 7px 11px; font-size: 11px; }
  .msb-price     { min-width: 80px; }
  .msb-val       { font-size: 16px; }
}
</style>
