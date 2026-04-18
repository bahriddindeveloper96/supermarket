<template>
  <div class="page">

    <!-- Page banner -->
    <div class="page-banner">
      <div class="banner-bg">
        <div class="bb-blob bb1"/><div class="bb-blob bb2"/>
      </div>
      <div class="container banner-inner">
        <div>
          <div class="breadcrumb">
            <router-link to="/">Bosh sahifa</router-link>
            <span>/</span>
            <span>Mahsulotlar</span>
          </div>
          <h1>Barcha Mahsulotlar</h1>
          <p>{{ productStore.filteredProducts.length }} ta mahsulot topildi</p>
        </div>
        <!-- Mini search -->
        <div class="banner-search" :class="{ focused: sf }">
          <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
            <circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.8"/>
            <path d="M14 14l3 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          <input
            v-model="productStore.searchQuery"
            @focus="sf=true" @blur="sf=false"
            type="text" placeholder="Mahsulot qidirish..."
          />
        </div>
      </div>
    </div>

    <div class="container page-body">

      <!-- ── SIDEBAR ────────────────────────────────── -->
      <aside class="sidebar">

        <!-- Categories -->
        <div class="side-card">
          <h3 class="side-title">
            <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
              <rect x="2" y="2" width="5" height="5" rx="1.5" fill="currentColor"/>
              <rect x="9" y="2" width="5" height="5" rx="1.5" fill="currentColor" opacity=".4"/>
              <rect x="2" y="9" width="5" height="5" rx="1.5" fill="currentColor" opacity=".4"/>
              <rect x="9" y="9" width="5" height="5" rx="1.5" fill="currentColor"/>
            </svg>
            Kategoriyalar
          </h3>
          <div class="cat-list">
            <button
              class="cat-item"
              :class="{ active: !productStore.selectedCategory }"
              @click="productStore.selectedCategory = null"
            >
              <span class="ci-icon">🛒</span>
              <span>Barchasi</span>
              <span class="ci-count">{{ allProducts.length }}</span>
            </button>
            <button
              v-for="c in categories" :key="c.id"
              class="cat-item"
              :class="{ active: productStore.selectedCategory === c.id }"
              @click="productStore.selectedCategory = c.id"
            >
              <span class="ci-icon">{{ c.icon }}</span>
              <span>{{ c.name }}</span>
              <span class="ci-count">{{ getCnt(c.id) }}</span>
            </button>
          </div>
        </div>

        <!-- Sort -->
        <div class="side-card">
          <h3 class="side-title">
            <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
              <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
            </svg>
            Saralash
          </h3>
          <div class="sort-list">
            <button
              v-for="s in sorts" :key="s.val"
              class="sort-item"
              :class="{ active: productStore.sortBy === s.val }"
              @click="productStore.sortBy = s.val"
            >
              <span class="sort-dot"/>
              {{ s.label }}
            </button>
          </div>
        </div>

        <!-- Clear -->
        <button
          v-if="hasFilter"
          class="clear-all-btn"
          @click="clear"
        >
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          Filtrlarni tozalash
        </button>
      </aside>

      <!-- ── PRODUCTS AREA ───────────────────────────── -->
      <div class="products-area">

        <!-- Toolbar -->
        <div class="toolbar">
          <!-- Active filters -->
          <div class="active-tags">
            <transition name="fade">
              <span v-if="productStore.selectedCategory" class="tag" @click="productStore.selectedCategory=null">
                {{ getCatName(productStore.selectedCategory) }}
                <svg viewBox="0 0 12 12" fill="none" width="10" height="10">
                  <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                </svg>
              </span>
            </transition>
            <transition name="fade">
              <span v-if="productStore.searchQuery" class="tag" @click="productStore.searchQuery=''">
                "{{ productStore.searchQuery }}"
                <svg viewBox="0 0 12 12" fill="none" width="10" height="10">
                  <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                </svg>
              </span>
            </transition>
          </div>

          <!-- View toggle -->
          <div class="view-btns">
            <button :class="{ active: view==='grid' }" @click="view='grid'" title="Grid ko'rinish">
              <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
                <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor"/>
                <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" opacity=".5"/>
                <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" opacity=".5"/>
                <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor"/>
              </svg>
            </button>
            <button :class="{ active: view==='list' }" @click="view='list'" title="List ko'rinish">
              <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
                <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Grid -->
        <div v-if="view==='grid'" class="grid-view">
          <TransitionGroup name="plist">
            <ProductCard
              v-for="p in productStore.filteredProducts"
              :key="p.id" :product="p"
            />
          </TransitionGroup>
        </div>

        <!-- List -->
        <div v-else class="list-view">
          <TransitionGroup name="plist">
            <div class="list-row" v-for="p in productStore.filteredProducts" :key="p.id">
              <div class="lr-img">
                <img :src="p.image" :alt="p.name" />
                <span v-if="p.badge" class="lr-badge">{{ p.badge }}</span>
              </div>
              <div class="lr-info">
                <div class="lr-rating">
                  <span class="lr-stars">{{ '★'.repeat(Math.round(p.rating)) }}</span>
                  <span>{{ p.rating }} ({{ p.reviews }})</span>
                </div>
                <h3>{{ p.name }}</h3>
                <p>{{ p.description }}</p>
              </div>
              <div class="lr-right">
                <div class="lr-prices">
                  <div class="lr-price">{{ fmt(p.price) }} <span>so'm</span></div>
                  <div v-if="p.oldPrice" class="lr-old">{{ fmt(p.oldPrice) }} so'm</div>
                </div>
                <button class="lr-add" @click="add(p)">
                  <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                    <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  Savatga
                </button>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <!-- Empty -->
        <div v-if="!productStore.filteredProducts.length" class="empty">
          <div class="empty-icon">
            <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
              <circle cx="40" cy="40" r="38" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="2"/>
              <path d="M28 40h24M36 32l8 8-8 8" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3>Mahsulot topilmadi</h3>
          <p>Qidiruv so'rovingizni o'zgartiring</p>
          <button @click="clear" class="empty-btn">Filtrlarni tozalash</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProductStore } from '../stores/products'
import { useCartStore }    from '../stores/cart'
import { categories, products as allProducts } from '../data/products'
import ProductCard from '../components/ui/ProductCard.vue'

const productStore = useProductStore()
const cartStore    = useCartStore()
const view = ref('grid')
const sf   = ref(false)

const sorts = [
  { val:'default',    label:'⚡ Standart' },
  { val:'price-asc',  label:'↑ Narx: arzondan qimmatga' },
  { val:'price-desc', label:'↓ Narx: qimmatdan arzonga' },
  { val:'rating',     label:'★ Reyting bo\'yicha' },
]

const hasFilter = computed(() =>
  productStore.selectedCategory || productStore.searchQuery || productStore.sortBy !== 'default'
)

function getCnt(id) { return allProducts.filter(p => p.category === id).length }
function getCatName(id) { return categories.find(c => c.id === id)?.name || '' }
function fmt(n) { return n.toLocaleString('uz-UZ') }
function clear() { productStore.selectedCategory=null; productStore.searchQuery=''; productStore.sortBy='default' }
function add(p)  { cartStore.addItem(p) }
</script>

<style scoped>
.page { padding-top:70px; }

/* ─── Banner ─────────────────────────────────────── */
.page-banner {
  position:relative; overflow:hidden;
  background:linear-gradient(135deg,#052e16,#14532d);
  padding:52px 0 44px;
}
.banner-bg { position:absolute; inset:0; }
.bb-blob { position:absolute; border-radius:50%; filter:blur(70px); }
.bb1 { width:350px; height:350px; background:rgba(34,197,94,.2);  top:-80px;  right:-40px; }
.bb2 { width:250px; height:250px; background:rgba(249,115,22,.1); bottom:-60px; left:15%; }

.banner-inner {
  position:relative; z-index:1;
  display:flex; justify-content:space-between; align-items:center; gap:24px;
}
.breadcrumb {
  display:flex; align-items:center; gap:8px;
  margin-bottom:10px;
  font-size:13px; color:rgba(255,255,255,.5);
}
.breadcrumb a { color:rgba(255,255,255,.5); transition:color .18s; }
.breadcrumb a:hover { color:rgba(255,255,255,.85); }
.banner-inner h1 { font-size:32px; font-weight:800; color:#fff; margin-bottom:6px; }
.banner-inner p  { color:rgba(255,255,255,.55); font-size:14px; }

.banner-search {
  display:flex; align-items:center; gap:10px;
  background:rgba(255,255,255,.1);
  border:1.5px solid rgba(255,255,255,.15);
  border-radius:12px; padding:0 16px;
  min-width:300px; transition: background .2s, border-color .2s;
}
.banner-search.focused { background:rgba(255,255,255,.15); border-color:rgba(74,222,128,.5); }
.banner-search svg { color:rgba(255,255,255,.5); flex-shrink:0; }
.banner-search input {
  flex:1; border:none; background:transparent;
  padding:13px 0; color:#fff; font-size:14px; font-family:inherit; outline:none;
}
.banner-search input::placeholder { color:rgba(255,255,255,.4); }

/* ─── Page body ──────────────────────────────────── */
.page-body {
  display:grid; grid-template-columns:256px 1fr;
  gap:28px; padding-top:36px; padding-bottom:80px;
  align-items:start;
}

/* ─── Sidebar ────────────────────────────────────── */
.sidebar { display:flex; flex-direction:column; gap:16px; position:sticky; top:84px; }

.side-card {
  background:#fff; border-radius:var(--radius-lg);
  border:1px solid var(--border); padding:20px;
}
.side-title {
  display:flex; align-items:center; gap:8px;
  font-size:13px; font-weight:700; text-transform:uppercase;
  letter-spacing:.8px; color:var(--text-2);
  margin-bottom:14px;
}

.cat-list { display:flex; flex-direction:column; gap:2px; }
.cat-item {
  display:flex; align-items:center; gap:10px;
  padding:9px 12px; border-radius:10px;
  font-size:13px; font-weight:500; color:var(--text-2);
  transition: background .15s, color .15s;
  text-align:left;
}
.cat-item:hover { background:var(--slate-50); color:var(--text); }
.cat-item.active { background:var(--green-50); color:var(--green-700); font-weight:600; }
.ci-icon { font-size:16px; }
.ci-count {
  margin-left:auto; font-size:11px; font-weight:600;
  padding:2px 8px; border-radius:20px;
  background:var(--slate-100); color:var(--text-3);
}
.cat-item.active .ci-count { background:var(--green-100); color:var(--green-700); }

.sort-list { display:flex; flex-direction:column; gap:2px; }
.sort-item {
  display:flex; align-items:center; gap:10px;
  padding:9px 12px; border-radius:10px;
  font-size:13px; font-weight:500; color:var(--text-2);
  text-align:left; transition: background .15s, color .15s;
}
.sort-item:hover { background:var(--slate-50); color:var(--text); }
.sort-item.active { background:var(--green-50); color:var(--green-700); font-weight:600; }
.sort-dot {
  width:7px; height:7px; border-radius:50%; border:2px solid var(--slate-300);
  flex-shrink:0; transition: border-color .15s, background .15s;
}
.sort-item.active .sort-dot { border-color:var(--green-500); background:var(--green-500); }

.clear-all-btn {
  display:flex; align-items:center; justify-content:center; gap:8px;
  width:100%; padding:11px; border-radius:10px;
  background:#fef2f2; color:var(--red-500);
  font-size:13px; font-weight:600; border:1px solid #fecaca;
  transition: background .18s;
}
.clear-all-btn:hover { background:#fee2e2; }

/* ─── Products area ──────────────────────────────── */
.toolbar {
  display:flex; align-items:center; gap:10px; flex-wrap:wrap;
  margin-bottom:20px; min-height:36px;
}
.active-tags { display:flex; align-items:center; gap:8px; flex:1; flex-wrap:wrap; }
.tag {
  display:inline-flex; align-items:center; gap:6px;
  padding:5px 12px; border-radius:50px;
  background:var(--green-50); color:var(--green-700);
  border:1px solid var(--green-200,#bbf7d0);
  font-size:12px; font-weight:600; cursor:pointer;
  transition: background .18s;
  animation:scaleIn .2s var(--ease);
}
.tag:hover { background:var(--green-100); }

.view-btns { display:flex; gap:4px; }
.view-btns button {
  width:36px; height:36px; border-radius:9px;
  background:var(--slate-100); color:var(--text-3);
  display:flex; align-items:center; justify-content:center;
  transition: background .18s, color .18s;
}
.view-btns button.active { background:var(--green-500); color:#fff; }
.view-btns button:hover:not(.active) { background:var(--slate-200); color:var(--text); }

/* Grid */
.grid-view {
  display:grid; grid-template-columns:repeat(3,1fr); gap:18px;
}

/* List */
.list-view { display:flex; flex-direction:column; gap:12px; }
.list-row {
  background:#fff; border:1px solid var(--border);
  border-radius:var(--radius-lg); padding:18px;
  display:flex; align-items:center; gap:18px;
  transition: box-shadow .25s, transform .25s var(--spring), border-color .25s;
  animation:fadeUp .22s var(--ease);
}
.list-row:hover { box-shadow:var(--shadow-md); transform:translateX(4px); border-color:var(--green-200,#bbf7d0); }
.lr-img { width:90px; height:90px; border-radius:12px; overflow:hidden; flex-shrink:0; position:relative; }
.lr-img img { width:100%; height:100%; object-fit:cover; }
.lr-badge {
  position:absolute; top:6px; left:6px;
  padding:2px 8px; border-radius:50px;
  background:var(--green-500); color:#fff;
  font-size:10px; font-weight:700;
}
.lr-info { flex:1; }
.lr-rating { display:flex; align-items:center; gap:6px; margin-bottom:6px; font-size:12px; color:var(--text-3); }
.lr-stars { color:#facc15; }
.lr-info h3 { font-size:15px; font-weight:700; margin-bottom:4px; }
.lr-info p  { font-size:13px; color:var(--text-2); }
.lr-right { display:flex; flex-direction:column; align-items:flex-end; gap:10px; flex-shrink:0; }
.lr-price { font-size:20px; font-weight:800; color:var(--green-700); }
.lr-price span { font-size:12px; font-weight:400; color:var(--text-3); }
.lr-old { font-size:13px; color:var(--text-3); text-decoration:line-through; }
.lr-add {
  display:flex; align-items:center; gap:6px;
  padding:10px 20px; border-radius:10px;
  background:var(--green-50); color:var(--green-700);
  border:1.5px solid var(--green-200,#bbf7d0);
  font-size:13px; font-weight:600;
  transition: background .18s, border-color .18s, transform .2s var(--spring);
}
.lr-add:hover { background:var(--green-500); color:#fff; border-color:var(--green-500); transform:translateY(-1px); }

/* Empty */
.empty { text-align:center; padding:80px 40px; background:#fff; border-radius:var(--radius-lg); border:1px solid var(--border); }
.empty-icon { margin:0 auto 20px; }
.empty h3 { font-size:22px; font-weight:700; margin-bottom:8px; }
.empty p  { color:var(--text-3); margin-bottom:24px; }
.empty-btn {
  padding:12px 32px; border-radius:50px;
  background:var(--green-500); color:#fff;
  font-size:14px; font-weight:700;
  transition: transform .2s var(--spring), box-shadow .2s;
}
.empty-btn:hover { transform:translateY(-2px); box-shadow:var(--shadow-green); }

/* Transitions */
.plist-move,
.plist-enter-active,
.plist-leave-active { transition:all .28s var(--ease); }
.plist-enter-from { opacity:0; transform:scale(.92); }
.plist-leave-to   { opacity:0; transform:scale(.92); }

/* ─── Responsive ─────────────────────────────────── */
@media (max-width:1100px) { .grid-view { grid-template-columns:repeat(2,1fr); } }
@media (max-width:880px) {
  .page-body { grid-template-columns:1fr; }
  .sidebar   { position:static; display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .banner-search { display:none; }
}
@media (max-width:600px) {
  .grid-view { grid-template-columns:repeat(2,1fr); gap:10px; }
  .sidebar   { grid-template-columns:1fr; }
  .list-row  { flex-wrap:wrap; }
}
</style>
