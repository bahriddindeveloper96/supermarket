<template>
  <div class="home">

    <!-- ── HERO ─────────────────────────────────────────── -->
    <section class="hero">
      <!-- Background layers -->
      <div class="hero-bg">
        <div class="blob blob-1"/>
        <div class="blob blob-2"/>
        <div class="blob blob-3"/>
        <div class="grid-overlay"/>
      </div>

      <div class="container hero-wrap">
        <!-- Left: copy -->
        <div class="hero-copy">
          <div class="hero-chip">
            <span class="chip-dot"/>
            Toshkentda №1 online supermarket
          </div>

          <h1 class="hero-h1">
            Eng yangi<br>
            <span class="text-gradient">mahsulotlar</span><br>
            eshigingizda
          </h1>

          <p class="hero-sub">
            30 daqiqada yetkazib beramiz · Bepul yetkazish · 100% sifat kafolati
          </p>

          <div class="hero-cta">
            <router-link to="/products" class="btn-hero-primary">
              <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                <path d="M4 6h12l-2 8H6L4 6z" stroke="white" stroke-width="1.6" stroke-linejoin="round"/>
                <circle cx="8" cy="16" r="1.5" fill="white"/>
                <circle cx="13" cy="16" r="1.5" fill="white"/>
                <path d="M2 4h1.5l.5 2" stroke="white" stroke-width="1.6" stroke-linecap="round"/>
              </svg>
              Xarid boshlash
            </router-link>
            <a href="#categories" class="btn-hero-outline">
              Kategoriyalar
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>

          <div class="hero-stats">
            <div class="hstat">
              <strong>50K+</strong><span>Mijozlar</span>
            </div>
            <div class="hstat-div"/>
            <div class="hstat">
              <strong>10K+</strong><span>Mahsulotlar</span>
            </div>
            <div class="hstat-div"/>
            <div class="hstat">
              <strong>4.9 ⭐</strong><span>Reyting</span>
            </div>
          </div>
        </div>

        <!-- Right: visual -->
        <div class="hero-visual">
          <div class="hero-card-wrap">
            <div class="hero-img-ring">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=600&fit=crop&auto=format"
                alt="Fresh market"
              />
            </div>

            <!-- Floating chips -->
            <div class="float-chip chip-a">
              <span>🍎</span>
              <div>
                <p>Yangi Olma</p>
                <small>8,500 so'm/kg</small>
              </div>
            </div>
            <div class="float-chip chip-b">
              <div class="chip-icon chip-icon-green">
                <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                  <path d="M4 10l4 4 8-8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div>
                <p>30 daqiqada</p>
                <small>Tez yetkazish</small>
              </div>
            </div>
            <div class="float-chip chip-c">
              <span class="chip-emoji">📦</span>
              <div>
                <p>1,240 buyurtma</p>
                <small>Bugun yetkazildi</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── TRUST STRIP ────────────────────────────────── -->
    <section class="trust-strip">
      <div class="container trust-grid">
        <div class="trust-item" v-for="t in trust" :key="t.label">
          <div class="trust-icon" :style="{ background: t.bg }">
            <span>{{ t.icon }}</span>
          </div>
          <div>
            <h4>{{ t.label }}</h4>
            <p>{{ t.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CATEGORIES ─────────────────────────────────── -->
    <section class="section" id="categories">
      <div class="container">
        <div class="sec-head">
          <div>
            <h2 class="sec-title">Kategoriyalar</h2>
            <p class="sec-sub">Kerakli mahsulot turini toping</p>
          </div>
        </div>
        <div class="cat-grid">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="cat-card"
            @click="goCategory(cat.id)"
          >
            <div class="cat-emoji-wrap" :style="{ background: cat.bg }">
              <span>{{ cat.icon }}</span>
            </div>
            <span class="cat-name">{{ cat.name }}</span>
            <span class="cat-count">{{ getCnt(cat.id) }} ta</span>
          </button>
        </div>
      </div>
    </section>

    <!-- ── FEATURED PRODUCTS ──────────────────────────── -->
    <section class="section section-alt">
      <div class="container">
        <div class="sec-head">
          <div>
            <h2 class="sec-title">🔥 Eng mashhur</h2>
            <p class="sec-sub">Mijozlar tomonidan eng ko'p tanlanganlar</p>
          </div>
          <router-link to="/products" class="see-all-btn">
            Barchasini ko'rish
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
        </div>
        <div class="products-grid">
          <ProductCard v-for="p in featured" :key="p.id" :product="p" />
        </div>
      </div>
    </section>

    <!-- ── PROMO BANNER ───────────────────────────────── -->
    <section class="promo-section">
      <div class="container">
        <div class="promo-card">
          <div class="promo-bg-art">
            <div class="promo-circle c1"/>
            <div class="promo-circle c2"/>
          </div>
          <div class="promo-body">
            <span class="promo-label">⚡ Maxsus taklif</span>
            <h2>Birinchi buyurtmangizga<br><em>30% chegirma!</em></h2>
            <p>FRESHMART30 promo kodini kiriting va chegirmadan foydalaning</p>
            <div class="promo-code-row">
              <div class="code-box">
                <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                  <rect x="3" y="3" width="14" height="14" rx="3" stroke="#facc15" stroke-width="1.6"/>
                  <path d="M7 10h6M10 7v6" stroke="#facc15" stroke-width="1.6" stroke-linecap="round"/>
                </svg>
                FRESHMART30
              </div>
              <button class="copy-btn" @click="copy">
                {{ copied ? '✓ Nusxalandi' : 'Nusxalash' }}
              </button>
            </div>
            <router-link to="/products" class="promo-cta">Hozir xarid qiling →</router-link>
          </div>
          <div class="promo-art">
            <div class="art-circles">
              <span v-for="e in ['🍎','🥦','🥩','🛒','🍊','🥛']" :key="e" class="art-item">{{ e }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── NEW ARRIVALS ───────────────────────────────── -->
    <section class="section">
      <div class="container">
        <div class="sec-head">
          <div>
            <h2 class="sec-title">✨ Yangi kelganlar</h2>
            <p class="sec-sub">Bu hafta qo'shilgan mahsulotlar</p>
          </div>
          <router-link to="/products" class="see-all-btn">
            Barchasini ko'rish
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
        </div>
        <div class="products-grid">
          <ProductCard v-for="p in newArrivals" :key="p.id" :product="p" />
        </div>
      </div>
    </section>

    <!-- ── TESTIMONIALS ───────────────────────────────── -->
    <section class="section section-alt">
      <div class="container">
        <div class="sec-head center">
          <div>
            <h2 class="sec-title">Mijozlarimiz fikri</h2>
            <p class="sec-sub">FreshMart-ni tanlagan 50,000+ mijozdan</p>
          </div>
        </div>
        <div class="reviews-grid">
          <div class="review-card" v-for="r in reviews" :key="r.id">
            <div class="review-stars">
              <span v-for="i in 5" :key="i">★</span>
            </div>
            <p class="review-text">"{{ r.text }}"</p>
            <div class="review-author">
              <div class="author-av" :style="{ background: r.color }">{{ r.av }}</div>
              <div>
                <strong>{{ r.name }}</strong>
                <small>{{ r.city }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── APP DOWNLOAD BANNER ────────────────────────── -->
    <section class="app-section">
      <div class="container">
        <div class="app-card">
          <div class="app-content">
            <span class="app-label">📱 Mobil Ilova</span>
            <h2>FreshMart ilovasini<br>yuklab oling!</h2>
            <p>Ilova orqali buyurtma bering va qo'shimcha 10% chegirma oling</p>
            <div class="app-btns">
              <button class="app-store-btn">
                <span>🍎</span>
                <div><small>Yuklab olish</small><strong>App Store</strong></div>
              </button>
              <button class="app-store-btn">
                <span>▶️</span>
                <div><small>Yuklab olish</small><strong>Google Play</strong></div>
              </button>
            </div>
          </div>
          <div class="app-phone">
            <div class="phone-mock">
              <div class="phone-screen">
                <div class="screen-content">
                  <div class="sc-top">
                    <div class="sc-logo">🛒</div>
                    <span>FreshMart</span>
                  </div>
                  <div class="sc-items">
                    <div class="sc-item" v-for="e in ['🍎 Olma', '🥦 Brokoli', '🥛 Sut']" :key="e">{{ e }}</div>
                  </div>
                  <div class="sc-btn">Buyurtma berish</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/products'
import { categories, products } from '../data/products'
import ProductCard from '../components/ui/ProductCard.vue'

const router       = useRouter()
const productStore = useProductStore()
const copied       = ref(false)

const featured   = computed(() => products.filter(p => p.rating >= 4.8).slice(0, 8))
const newArrivals = computed(() => products.filter(p => p.badge === 'Yangi').slice(0, 8))

function getCnt(id) { return products.filter(p => p.category === id).length }
function goCategory(id) { productStore.selectedCategory = id; router.push('/products') }

function copy() {
  navigator.clipboard.writeText('FRESHMART30')
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

const trust = [
  { icon:'🚚', label:'Tez yetkazish', desc:'30 daqiqada eshigingizga', bg:'#f0fdf4' },
  { icon:'💯', label:'Sifat kafolati', desc:'100% yangi mahsulotlar',   bg:'#eff6ff' },
  { icon:'🔒', label:'Xavfsiz to\'lov', desc:'Karta va ilova orqali',   bg:'#fdf4ff' },
  { icon:'🎧', label:'24/7 Yordam',    desc:'Har doim siz bilan',       bg:'#fff7ed' },
]

const reviews = [
  { id:1, text:'FreshMart orqali xarid qilish juda qulay! Mahsulotlar doim yangi va sifatli.', name:'Aziza Rahimova', city:'Toshkent, Chilonzor', av:'A', color:'#22c55e' },
  { id:2, text:'Yetkazib berish tezligi ajoyib. 25 daqiqada eshigimga keltirishdi, tavsiya qilaman!', name:'Bobur Ismoilov', city:'Toshkent, Yunusobod', av:'B', color:'#3b82f6' },
  { id:3, text:'Narxlar bozordan ham arzonroq, mahsulotlar esa yangi. Doim shu yerdan xarid qilaman.', name:'Malika Yusupova', city:'Toshkent, Mirzo Ulug\'bek', av:'M', color:'#a855f7' },
]
</script>

<style scoped>
.home { padding-top: 70px; }
@media (max-width:768px) { .home { padding-top: 58px; } }

/* ═══ HERO ═══════════════════════════════════════════ */
.hero {
  position: relative; overflow: hidden;
  background: linear-gradient(145deg, #052e16 0%, #14532d 45%, #0f172a 100%);
  min-height: 92vh;
  display: flex; align-items: center;
}
.hero-bg { position:absolute; inset:0; }
.blob {
  position:absolute; border-radius:50%;
  filter:blur(90px); opacity:.45;
}
.blob-1 { width:500px; height:500px; background:rgba(34,197,94,.3);  top:-100px; right:-100px; animation:float 8s ease-in-out infinite; }
.blob-2 { width:400px; height:400px; background:rgba(249,115,22,.15); bottom:-80px; left:5%;    animation:float 10s ease-in-out infinite 2s; }
.blob-3 { width:300px; height:300px; background:rgba(59,130,246,.12); top:30%; left:30%;         animation:float 12s ease-in-out infinite 4s; }
.grid-overlay {
  position:absolute; inset:0;
  background-image:
    linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
  background-size:60px 60px;
}

.hero-wrap {
  position:relative; z-index:1;
  display:grid; grid-template-columns:1fr 1fr;
  gap:60px; align-items:center;
  padding:100px 28px 80px;
}

/* Copy */
.hero-chip {
  display:inline-flex; align-items:center; gap:8px;
  padding:8px 18px; border-radius:50px; margin-bottom:28px;
  background:rgba(74,222,128,.12);
  border:1px solid rgba(74,222,128,.25);
  color:#4ade80; font-size:13px; font-weight:600;
}
.chip-dot {
  width:7px; height:7px; border-radius:50%;
  background:#4ade80;
  box-shadow:0 0 8px #4ade80;
  animation:pulse 2s ease-in-out infinite;
}

.hero-h1 {
  font-size:clamp(38px,5.5vw,66px);
  font-weight:900; color:#fff; line-height:1.05;
  margin-bottom:20px; letter-spacing:-1.5px;
}
.text-gradient {
  background:linear-gradient(135deg,#4ade80 0%,#facc15 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
}

.hero-sub {
  color:rgba(255,255,255,.6); font-size:16px; line-height:1.7;
  margin-bottom:36px;
}

.hero-cta { display:flex; gap:14px; flex-wrap:wrap; margin-bottom:48px; }

.btn-hero-primary {
  display:inline-flex; align-items:center; gap:10px;
  padding:15px 32px; border-radius:14px;
  background:linear-gradient(135deg,var(--green-500),var(--green-600));
  color:#fff; font-size:15px; font-weight:700;
  transition: transform .2s var(--spring), box-shadow .2s;
  box-shadow:0 4px 20px rgba(34,197,94,.35);
}
.btn-hero-primary:hover { transform:translateY(-3px); box-shadow:0 10px 36px rgba(34,197,94,.45); }

.btn-hero-outline {
  display:inline-flex; align-items:center; gap:8px;
  padding:15px 28px; border-radius:14px;
  border:1.5px solid rgba(255,255,255,.2); color:rgba(255,255,255,.85);
  font-size:15px; font-weight:600;
  transition: border-color .2s, background .2s;
}
.btn-hero-outline:hover { border-color:rgba(255,255,255,.5); background:rgba(255,255,255,.06); }

.hero-stats { display:flex; align-items:center; gap:24px; }
.hstat { text-align:center; }
.hstat strong { display:block; font-size:24px; font-weight:800; color:#fff; letter-spacing:-0.5px; }
.hstat span   { font-size:12px; color:rgba(255,255,255,.45); text-transform:uppercase; letter-spacing:1px; }
.hstat-div { width:1px; height:36px; background:rgba(255,255,255,.12); }

/* Visual */
.hero-visual { display:flex; justify-content:center; align-items:center; }
.hero-card-wrap { position:relative; width:440px; height:440px; }

.hero-img-ring {
  width:380px; height:380px; border-radius:50%;
  overflow:hidden;
  border:2px solid rgba(74,222,128,.2);
  box-shadow:0 0 0 12px rgba(74,222,128,.05), 0 32px 80px rgba(0,0,0,.4);
  position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
}
.hero-img-ring img { width:100%; height:100%; object-fit:cover; }

/* Floating chips */
.float-chip {
  position:absolute; display:flex; align-items:center; gap:10px;
  padding:12px 16px; border-radius:16px;
  background:rgba(255,255,255,.95); backdrop-filter:blur(12px);
  box-shadow:0 8px 32px rgba(0,0,0,.12);
  white-space:nowrap;
}
.float-chip span  { font-size:28px; }
.float-chip p     { font-size:13px; font-weight:700; color:var(--slate-900); margin:0; }
.float-chip small { font-size:11px; color:var(--text-3); }

.chip-a { top:0; left:-20px; animation:float 4s ease-in-out infinite; }
.chip-b { bottom:40px; right:-30px; animation:float 5s ease-in-out infinite 1.5s; }
.chip-c { top:50px; right:-20px; animation:float 6s ease-in-out infinite 3s; }

.chip-icon { width:32px; height:32px; border-radius:9px; display:flex; align-items:center; justify-content:center; }
.chip-icon-green { background:var(--green-500); }
.chip-emoji { font-size:28px; }

/* ═══ TRUST STRIP ════════════════════════════════════ */
.trust-strip { background:#fff; border-bottom:1px solid var(--border); }
.trust-grid {
  display:grid; grid-template-columns:repeat(4,1fr);
  gap:0;
}
.trust-item {
  display:flex; align-items:center; gap:14px;
  padding:24px 28px;
  border-right:1px solid var(--border);
}
.trust-item:last-child { border-right:none; }
.trust-icon {
  width:48px; height:48px; border-radius:14px; flex-shrink:0;
  display:flex; align-items:center; justify-content:center;
  font-size:22px;
}
.trust-item h4 { font-size:14px; font-weight:700; margin-bottom:2px; }
.trust-item p  { font-size:12px; color:var(--text-3); }

/* ═══ SECTION BASE ═══════════════════════════════════ */
.section     { padding:80px 0; }
.section-alt { background:#fff; }

.sec-head { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:36px; }
.sec-head.center { justify-content:center; text-align:center; }
.sec-title { font-size:28px; font-weight:800; letter-spacing:-.5px; margin-bottom:4px; }
.sec-sub   { font-size:14px; color:var(--text-3); }

.see-all-btn {
  display:inline-flex; align-items:center; gap:6px;
  padding:9px 18px; border-radius:10px;
  background:var(--green-50); color:var(--green-700);
  border:1px solid var(--green-200,#bbf7d0);
  font-size:13px; font-weight:600;
  transition: background .18s, transform .18s var(--spring);
}
.see-all-btn:hover { background:var(--green-100); transform:translateX(2px); }

/* ═══ CATEGORIES ════════════════════════════════════ */
.cat-grid {
  display:grid; grid-template-columns:repeat(8,1fr);
  gap:14px;
}
.cat-card {
  display:flex; flex-direction:column; align-items:center; gap:8px;
  padding:20px 12px 16px;
  background:#fff; border-radius:var(--radius-lg);
  border:1.5px solid var(--border);
  transition: border-color .2s, transform .25s var(--spring), box-shadow .2s;
  cursor:pointer;
}
.cat-card:hover {
  border-color:var(--green-400);
  transform:translateY(-5px);
  box-shadow:var(--shadow-md);
}
.cat-emoji-wrap {
  width:56px; height:56px; border-radius:16px;
  display:flex; align-items:center; justify-content:center;
  font-size:28px;
  transition: transform .25s var(--spring);
}
.cat-card:hover .cat-emoji-wrap { transform:scale(1.1); }
.cat-name  { font-size:12px; font-weight:700; color:var(--text); text-align:center; line-height:1.2; }
.cat-count { font-size:11px; color:var(--text-3); }

/* ═══ PRODUCTS GRID ══════════════════════════════════ */
.products-grid {
  display:grid; grid-template-columns:repeat(4,1fr);
  gap:20px;
}

/* ═══ PROMO BANNER ═══════════════════════════════════ */
.promo-section { padding:60px 0; }
.promo-card {
  position:relative; overflow:hidden;
  background:linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#0d2d18 100%);
  border-radius:var(--radius-xl);
  padding:56px 60px;
  display:flex; justify-content:space-between; align-items:center;
  gap:40px;
}
.promo-bg-art { position:absolute; inset:0; }
.promo-circle {
  position:absolute; border-radius:50%;
  filter:blur(80px);
}
.c1 { width:400px; height:400px; background:rgba(34,197,94,.15); top:-100px; right:10%; }
.c2 { width:300px; height:300px; background:rgba(249,115,22,.1);  bottom:-80px; left:30%; }

.promo-body { position:relative; z-index:1; }
.promo-label {
  display:inline-block; padding:5px 14px; border-radius:50px;
  background:rgba(250,204,21,.15); color:#facc15;
  border:1px solid rgba(250,204,21,.25);
  font-size:12px; font-weight:700; letter-spacing:.5px;
  margin-bottom:16px;
}
.promo-body h2 { font-size:clamp(26px,3vw,40px); font-weight:900; color:#fff; line-height:1.15; margin-bottom:10px; }
.promo-body h2 em { color:#4ade80; font-style:normal; }
.promo-body > p { color:rgba(255,255,255,.55); font-size:15px; margin-bottom:24px; }

.promo-code-row { display:flex; align-items:center; gap:10px; margin-bottom:24px; }
.code-box {
  display:flex; align-items:center; gap:8px;
  padding:10px 20px; border-radius:10px;
  border:1.5px dashed rgba(250,204,21,.4);
  background:rgba(250,204,21,.08);
  color:#facc15; font-size:16px; font-weight:800; letter-spacing:2px;
  font-family:monospace;
}
.copy-btn {
  padding:10px 16px; border-radius:10px;
  background:rgba(255,255,255,.08); color:rgba(255,255,255,.7);
  font-size:13px; font-weight:600; border:1px solid rgba(255,255,255,.1);
  transition: background .18s;
}
.copy-btn:hover { background:rgba(255,255,255,.14); }

.promo-cta {
  display:inline-flex; align-items:center;
  padding:13px 28px; border-radius:12px;
  background:linear-gradient(135deg,var(--green-500),var(--green-600));
  color:#fff; font-size:14px; font-weight:700;
  transition: transform .2s var(--spring), box-shadow .2s;
}
.promo-cta:hover { transform:translateY(-2px); box-shadow:var(--shadow-green); }

.promo-art { position:relative; z-index:1; }
.art-circles { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
.art-item {
  width:56px; height:56px; border-radius:16px;
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.08);
  display:flex; align-items:center; justify-content:center;
  font-size:26px; transition: transform .3s var(--spring);
}
.art-item:hover { transform:scale(1.15) rotate(5deg); }

/* ═══ REVIEWS ════════════════════════════════════════ */
.reviews-grid {
  display:grid; grid-template-columns:repeat(3,1fr); gap:20px;
}
.review-card {
  background:var(--bg); border:1.5px solid var(--border);
  border-radius:var(--radius-lg); padding:28px;
  transition: box-shadow .25s, transform .25s var(--spring), border-color .25s;
}
.review-card:hover { box-shadow:var(--shadow-md); transform:translateY(-4px); border-color:var(--green-200, #bbf7d0); }
.review-stars { color:#facc15; font-size:16px; letter-spacing:2px; margin-bottom:14px; }
.review-text { font-size:14px; line-height:1.75; color:var(--text-2); margin-bottom:20px; font-style:italic; }
.review-author { display:flex; align-items:center; gap:12px; }
.author-av {
  width:44px; height:44px; border-radius:12px; flex-shrink:0;
  display:flex; align-items:center; justify-content:center;
  color:#fff; font-size:18px; font-weight:700;
}
.review-author strong { display:block; font-size:14px; font-weight:700; }
.review-author small  { color:var(--text-3); font-size:12px; }

/* ═══ APP SECTION ════════════════════════════════════ */
.app-section { padding:60px 0 80px; }
.app-card {
  background:linear-gradient(135deg,var(--green-600),var(--green-900));
  border-radius:var(--radius-xl); padding:56px 60px;
  display:flex; justify-content:space-between; align-items:center;
  gap:40px; overflow:hidden; position:relative;
}
.app-label {
  display:inline-block; padding:5px 14px; border-radius:50px;
  background:rgba(255,255,255,.15); color:#fff;
  font-size:12px; font-weight:700; letter-spacing:.5px; margin-bottom:16px;
}
.app-content h2 {
  font-size:36px; font-weight:900; color:#fff; line-height:1.15; margin-bottom:10px;
}
.app-content > p { color:rgba(255,255,255,.65); font-size:15px; margin-bottom:28px; }
.app-btns { display:flex; gap:12px; flex-wrap:wrap; }
.app-store-btn {
  display:flex; align-items:center; gap:10px;
  padding:12px 22px; border-radius:12px;
  background:rgba(255,255,255,.12);
  border:1px solid rgba(255,255,255,.18); color:#fff;
  font-family:inherit; transition: background .18s;
}
.app-store-btn:hover { background:rgba(255,255,255,.2); }
.app-store-btn span { font-size:24px; }
.app-store-btn small { display:block; font-size:10px; opacity:.7; }
.app-store-btn strong { display:block; font-size:15px; font-weight:700; }

/* Phone mockup */
.app-phone { flex-shrink:0; }
.phone-mock {
  width:200px; background:var(--slate-900); border-radius:28px;
  padding:8px; box-shadow:0 32px 80px rgba(0,0,0,.4);
  border:2px solid rgba(255,255,255,.1);
}
.phone-screen {
  background:#f8fafc; border-radius:22px; overflow:hidden;
  padding:16px; min-height:320px;
}
.screen-content { display:flex; flex-direction:column; gap:12px; }
.sc-top { display:flex; align-items:center; gap:8px; }
.sc-logo {
  width:32px; height:32px; border-radius:9px;
  background:var(--green-500); display:flex; align-items:center; justify-content:center;
  font-size:16px;
}
.sc-top span { font-size:13px; font-weight:700; color:var(--slate-900); }
.sc-items { display:flex; flex-direction:column; gap:8px; }
.sc-item {
  padding:10px 12px; background:#fff; border-radius:10px;
  font-size:12px; font-weight:600; color:var(--slate-800);
  border:1px solid var(--border);
}
.sc-btn {
  padding:12px; background:var(--green-500); border-radius:10px;
  text-align:center; font-size:13px; font-weight:700; color:#fff;
}

/* ═══ RESPONSIVE ═════════════════════════════════════ */
@media (max-width:1100px) {
  .cat-grid      { grid-template-columns:repeat(4,1fr); }
  .products-grid { grid-template-columns:repeat(3,1fr); }
}
@media (max-width:900px) {
  .hero-wrap { grid-template-columns:1fr; text-align:center; padding:80px 0 60px; }
  .hero-visual { display:none; }
  .hero-cta    { justify-content:center; }
  .hero-stats  { justify-content:center; }
  .trust-grid  { grid-template-columns:repeat(2,1fr); }
  .trust-item  { border-right:none; border-bottom:1px solid var(--border); }
  .products-grid { grid-template-columns:repeat(2,1fr); }
  .reviews-grid  { grid-template-columns:1fr; }
  .promo-card { flex-direction:column; padding:36px 24px; }
  .promo-art  { display:none; }
  .app-card   { flex-direction:column; padding:36px 24px; }
  .app-phone  { display:none; }
}
@media (max-width:600px) {
  .section { padding:52px 0; }
  .hero-wrap { padding:64px 0 48px; }
  .hero-h1 { font-size:clamp(30px,8vw,42px); }
  .hero-sub { font-size:14px; margin-bottom:24px; }
  .hero-cta { flex-direction:column; align-items:center; gap:10px; margin-bottom:32px; }
  .btn-hero-primary, .btn-hero-outline { width:100%; max-width:300px; justify-content:center; }
  .hero-stats { gap:16px; }
  .hstat strong { font-size:20px; }
  .cat-grid { grid-template-columns:repeat(4,1fr); gap:8px; }
  .cat-card { padding:14px 6px 12px; }
  .cat-emoji-wrap { width:44px; height:44px; font-size:22px; border-radius:12px; }
  .cat-name { font-size:11px; }
  .cat-count { font-size:10px; }
  .products-grid { gap:10px; }
  .sec-head { flex-direction:column; align-items:flex-start; gap:10px; }
  .sec-title { font-size:22px; }
  .trust-grid { grid-template-columns:1fr; }
  .trust-item { border-right:none; border-bottom:1px solid var(--border); }
  .promo-body h2 { font-size:22px; }
  .reviews-grid { gap:12px; }
  .review-card { padding:20px; }
  .promo-card { padding:28px 20px; }
  .app-card { padding:28px 20px; }
  .app-content h2 { font-size:26px; }
}
@media (max-width:390px) {
  .cat-grid { grid-template-columns:repeat(4,1fr); gap:6px; }
  .cat-emoji-wrap { width:38px; height:38px; font-size:18px; }
  .hero-chip { font-size:11px; padding:6px 14px; }
  .hstat-div { display:none; }
}
</style>
