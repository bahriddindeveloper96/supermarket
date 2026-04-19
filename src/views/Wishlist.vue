<template>
  <div class="page">

    <!-- Banner -->
    <div class="page-banner">
      <div class="container banner-inner">
        <div>
          <div class="breadcrumb">
            <router-link to="/">Bosh sahifa</router-link>
            <span>/</span>
            <span>Sevimlilar</span>
          </div>
          <h1>Sevimli Mahsulotlar</h1>
          <p>{{ wishProducts.length }} ta mahsulot saqlangan</p>
        </div>
        <div class="banner-icon">
          <svg viewBox="0 0 60 60" fill="none" width="60" height="60">
            <circle cx="30" cy="30" r="28" fill="rgba(239,68,68,.1)" stroke="rgba(239,68,68,.25)" stroke-width="1.5"/>
            <path d="M30 46C30 46 14 36 14 25.5a9 9 0 0118 0 9 9 0 0118 0C50 36 30 46 30 46z"
              fill="rgba(239,68,68,.3)" stroke="#ef4444" stroke-width="1.8" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Products -->
    <div class="container content" v-if="wishProducts.length">
      <div class="top-bar">
        <h2>Saqlangan mahsulotlar</h2>
        <button class="clear-all" @click="productStore.wishlist = []">
          <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          Barchasini o'chirish
        </button>
      </div>
      <div class="products-grid">
        <ProductCard v-for="p in wishProducts" :key="p.id" :product="p" />
      </div>
    </div>

    <!-- Empty -->
    <div v-else class="empty-page">
      <div class="container">
        <div class="empty-content">
          <div class="empty-art">
            <svg viewBox="0 0 160 160" fill="none" width="160" height="160">
              <circle cx="80" cy="80" r="76" fill="#fef2f2" stroke="#fecaca" stroke-width="2"/>
              <path d="M80 110C80 110 44 90 44 65a22 22 0 0144 0 22 22 0 0144 0c0 25-32 45-52 45z"
                fill="#fecaca" stroke="#ef4444" stroke-width="2" stroke-linejoin="round"/>
              <path d="M66 72l8 8 16-16" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h2>Sevimlilar bo'sh</h2>
          <p>Mahsulotlarda ❤️ tugmasini bosib saqlang</p>
          <router-link to="/products" class="shop-btn">
            Mahsulotlarga o'tish
            <svg viewBox="0 0 18 18" fill="none" width="16" height="16">
              <path d="M4 9h10M9 4l5 5-5 5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProductStore } from '../stores/products'
import { products } from '../data/products'
import ProductCard from '../components/ui/ProductCard.vue'

const productStore = useProductStore()

const wishProducts = computed(() =>
  products.filter(p => productStore.wishlist.includes(p.id))
)
</script>

<style scoped>
.page { padding-top: 70px; }

.page-banner {
  background: linear-gradient(135deg, #450a0a, #7f1d1d);
  padding: 44px 0 36px;
}
.banner-inner { display: flex; justify-content: space-between; align-items: center; }
.breadcrumb {
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; color: rgba(255,255,255,.45); margin-bottom: 10px;
}
.breadcrumb a { color: rgba(255,255,255,.45); transition: color .18s; }
.breadcrumb a:hover { color: rgba(255,255,255,.85); }
.banner-inner h1 { font-size: 30px; font-weight: 800; color: #fff; margin-bottom: 4px; }
.banner-inner > div > p { color: rgba(255,255,255,.5); font-size: 14px; }

.content { padding: 36px 28px 80px; }

.top-bar {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 24px;
}
.top-bar h2 { font-size: 18px; font-weight: 700; }
.clear-all {
  display: flex; align-items: center; gap: 6px;
  padding: 7px 14px; border-radius: 8px;
  background: #fef2f2; color: var(--red-500);
  font-size: 12px; font-weight: 600; border: 1px solid #fecaca;
  transition: background .18s;
}
.clear-all:hover { background: #fee2e2; }

.products-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
}

.empty-page { padding: 80px 0; }
.empty-content { max-width: 400px; margin: 0 auto; text-align: center; }
.empty-art { margin-bottom: 24px; }
.empty-content h2 { font-size: 26px; font-weight: 800; margin-bottom: 8px; }
.empty-content p  { color: var(--text-3); font-size: 15px; margin-bottom: 28px; }
.shop-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 36px; border-radius: 14px;
  background: linear-gradient(135deg, var(--green-500), var(--green-600));
  color: #fff; font-size: 15px; font-weight: 700;
  transition: transform .2s var(--spring), box-shadow .2s;
}
.shop-btn:hover { transform: translateY(-3px); box-shadow: var(--shadow-green); }

@media (max-width: 1100px) { .products-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px)  { .products-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px)  { .products-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; } }
</style>
