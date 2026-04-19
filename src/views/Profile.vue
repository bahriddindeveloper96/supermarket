<template>
  <div class="page">

    <!-- Banner -->
    <div class="page-banner">
      <!-- Desktop banner -->
      <div class="container banner-inner desk-banner">
        <div>
          <div class="breadcrumb">
            <router-link to="/">Bosh sahifa</router-link>
            <span>/</span>
            <span>Profil</span>
          </div>
          <h1>{{ authStore.isLoggedIn ? authStore.user.name : 'Mening Profilim' }}</h1>
          <p>{{ authStore.isLoggedIn ? authStore.user.email : 'Kirish yoki ro\'yxatdan o\'ting' }}</p>
        </div>
        <div class="banner-avatar" v-if="authStore.isLoggedIn">
          <div class="avatar-big">{{ initials }}</div>
        </div>
        <div class="banner-icon" v-else>
          <svg viewBox="0 0 60 60" fill="none" width="60" height="60">
            <circle cx="30" cy="30" r="28" fill="rgba(74,222,128,.15)" stroke="rgba(74,222,128,.3)" stroke-width="1.5"/>
            <circle cx="30" cy="24" r="8" fill="none" stroke="white" stroke-width="1.8"/>
            <path d="M14 50c0-8.8 7.2-16 16-16s16 7.2 16 16" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </div>
      </div>

      <!-- Mobile banner (logged in) -->
      <div v-if="authStore.isLoggedIn" class="mob-banner">
        <button class="mob-logout-btn" @click="doLogout" title="Chiqish">
          <svg viewBox="0 0 18 18" fill="none" width="16" height="16">
            <path d="M11 4l5 5-5 5M16 9H7M7 3H4a1 1 0 00-1 1v10a1 1 0 001 1h3" stroke="rgba(255,255,255,.7)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="mob-avatar-wrap">
          <div class="mob-avatar">{{ initials }}</div>
        </div>
        <strong class="mob-name">{{ authStore.user.name }}</strong>
        <span class="mob-email">{{ authStore.user.email }}</span>
        <div class="mob-stats">
          <div class="ms-item">
            <strong>{{ authStore.orders.length }}</strong>
            <span>Buyurtma</span>
          </div>
          <div class="ms-divider"/>
          <div class="ms-item">
            <strong>{{ productStore.wishlist.length }}</strong>
            <span>Sevimli</span>
          </div>
          <div class="ms-divider"/>
          <div class="ms-item">
            <strong>{{ authStore.orders.reduce((s,o)=>s+o.total,0) > 0 ? (authStore.orders.reduce((s,o)=>s+o.total,0)/1000).toFixed(0)+'K' : '0' }}</strong>
            <span>so'm sarflangan</span>
          </div>
        </div>
      </div>

      <!-- Mobile banner (not logged in) -->
      <div v-else class="mob-banner mob-banner-guest">
        <div class="mob-guest-icon">
          <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
            <circle cx="24" cy="18" r="9" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="2"/>
            <path d="M6 44c0-9 8-16 18-16s18 7 18 16" stroke="rgba(255,255,255,.9)" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <strong class="mob-name">Mening Profilim</strong>
        <span class="mob-email">Kirish yoki ro'yxatdan o'ting</span>
      </div>
    </div>

    <!-- ── NOT LOGGED IN ─────────────────────────────── -->
    <div v-if="!authStore.isLoggedIn" class="container auth-wrap">
      <div class="auth-card">

        <!-- Tabs -->
        <div class="auth-tabs">
          <button :class="{ active: authTab === 'login' }" @click="authTab='login'; clearErr()">Kirish</button>
          <button :class="{ active: authTab === 'register' }" @click="authTab='register'; clearErr()">Ro'yxatdan o'tish</button>
        </div>

        <!-- Login -->
        <transition name="tab-fade" mode="out-in">
          <div v-if="authTab === 'login'" key="login" class="auth-form">
            <div class="field">
              <label>Email</label>
              <input v-model="lEmail" type="email" placeholder="email@example.com" :class="{ err: authErr && !lEmail }" />
            </div>
            <div class="field">
              <label>Parol</label>
              <div class="pass-wrap">
                <input v-model="lPass" :type="showPass ? 'text' : 'password'" placeholder="Parolingiz" :class="{ err: authErr && !lPass }" />
                <button class="eye-btn" type="button" @click="showPass = !showPass">
                  <svg v-if="!showPass" viewBox="0 0 20 20" fill="none" width="16" height="16">
                    <ellipse cx="10" cy="10" rx="8" ry="5" stroke="currentColor" stroke-width="1.6"/>
                    <circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.6"/>
                  </svg>
                  <svg v-else viewBox="0 0 20 20" fill="none" width="16" height="16">
                    <path d="M3 3l14 14M8.5 8.7A2.5 2.5 0 0013 12M5 6.4C3.5 7.5 2.3 8.9 2 10c1.3 4 4.5 6 8 6 1.2 0 2.4-.3 3.5-.8M10 4c3.5 0 6.7 2 8 6-.3.9-.8 1.8-1.4 2.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <p v-if="authErr" class="auth-err">{{ authErr }}</p>
            <button class="submit-btn" @click="doLogin">
              <svg viewBox="0 0 18 18" fill="none" width="16" height="16">
                <path d="M4 9h10M9 4l5 5-5 5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Kirish
            </button>
            <p class="auth-switch">Hisobingiz yo'qmi? <button @click="authTab='register'; clearErr()">Ro'yxatdan o'ting</button></p>
          </div>

          <!-- Register -->
          <div v-else key="register" class="auth-form">
            <div class="form-grid-2">
              <div class="field">
                <label>Ism <span class="req">*</span></label>
                <input v-model="rName" type="text" placeholder="Ismingiz" :class="{ err: authErr && !rName }" />
              </div>
              <div class="field">
                <label>Telefon</label>
                <input v-model="rPhone" type="tel" placeholder="+998 90 123-45-67" />
              </div>
            </div>
            <div class="field">
              <label>Email <span class="req">*</span></label>
              <input v-model="rEmail" type="email" placeholder="email@example.com" :class="{ err: authErr && !rEmail }" />
            </div>
            <div class="field">
              <label>Parol <span class="req">*</span></label>
              <div class="pass-wrap">
                <input v-model="rPass" :type="showPass ? 'text' : 'password'" placeholder="Kamida 6 ta belgi" :class="{ err: authErr && !rPass }" />
                <button class="eye-btn" type="button" @click="showPass = !showPass">
                  <svg v-if="!showPass" viewBox="0 0 20 20" fill="none" width="16" height="16">
                    <ellipse cx="10" cy="10" rx="8" ry="5" stroke="currentColor" stroke-width="1.6"/>
                    <circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.6"/>
                  </svg>
                  <svg v-else viewBox="0 0 20 20" fill="none" width="16" height="16">
                    <path d="M3 3l14 14M8.5 8.7A2.5 2.5 0 0013 12M5 6.4C3.5 7.5 2.3 8.9 2 10c1.3 4 4.5 6 8 6 1.2 0 2.4-.3 3.5-.8M10 4c3.5 0 6.7 2 8 6-.3.9-.8 1.8-1.4 2.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <p v-if="authErr" class="auth-err">{{ authErr }}</p>
            <button class="submit-btn" @click="doRegister">
              <svg viewBox="0 0 18 18" fill="none" width="16" height="16">
                <path d="M9 4v10M4 9h10" stroke="white" stroke-width="2" stroke-linecap="round"/>
              </svg>
              Ro'yxatdan o'tish
            </button>
            <p class="auth-switch">Hisobingiz bormi? <button @click="authTab='login'; clearErr()">Kirish</button></p>
          </div>
        </transition>

        <!-- Benefits -->
        <div class="auth-benefits">
          <div class="ab" v-for="b in benefits" :key="b.t">
            <div class="ab-icon">{{ b.i }}</div>
            <div>
              <strong>{{ b.t }}</strong>
              <p>{{ b.d }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── LOGGED IN ──────────────────────────────────── -->
    <div v-else>

      <!-- Mobile tab bar -->
      <div class="mob-tab-bar">
        <button
          v-for="t in tabs" :key="t.id"
          class="mtb-item" :class="{ active: activeTab === t.id }"
          @click="activeTab = t.id"
        >
          <span class="mtb-icon" v-html="t.icon"/>
          <span class="mtb-label">{{ t.label }}</span>
          <span v-if="t.badge" class="mtb-badge">{{ t.badge }}</span>
        </button>
      </div>

    <div class="container profile-wrap">

      <!-- Sidebar -->
      <aside class="profile-side">
        <div class="side-user">
          <div class="side-avatar">{{ initials }}</div>
          <div>
            <strong>{{ authStore.user.name }}</strong>
            <p>{{ authStore.user.email }}</p>
            <p v-if="authStore.user.phone" class="side-phone">{{ authStore.user.phone }}</p>
          </div>
        </div>

        <nav class="side-nav">
          <button v-for="t in tabs" :key="t.id" class="sn-btn" :class="{ active: activeTab === t.id }" @click="activeTab = t.id">
            <span class="sn-icon" v-html="t.icon"/>
            {{ t.label }}
            <span v-if="t.badge" class="sn-badge">{{ t.badge }}</span>
          </button>
        </nav>

        <button class="logout-btn" @click="doLogout">
          <svg viewBox="0 0 18 18" fill="none" width="15" height="15">
            <path d="M11 4l5 5-5 5M16 9H7M7 3H4a1 1 0 00-1 1v10a1 1 0 001 1h3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Chiqish
        </button>
      </aside>

      <!-- Main content -->
      <div class="profile-main">
        <transition name="tab-fade" mode="out-in">

          <!-- ── Tab: Ma'lumotlar ── -->
          <div v-if="activeTab === 'info'" key="info" class="tab-panel">
            <div class="panel-head">
              <h2>Shaxsiy ma'lumotlar</h2>
              <button v-if="!editing" class="edit-btn" @click="startEdit">
                <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
                  <path d="M11 2l3 3-9 9H2v-3l9-9z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
                </svg>
                Tahrirlash
              </button>
            </div>

            <div v-if="!editing" class="info-grid">
              <div class="ig-item">
                <label>Ism</label>
                <span>{{ authStore.user.name }}</span>
              </div>
              <div class="ig-item">
                <label>Email</label>
                <span>{{ authStore.user.email }}</span>
              </div>
              <div class="ig-item">
                <label>Telefon</label>
                <span>{{ authStore.user.phone || '—' }}</span>
              </div>
              <div class="ig-item">
                <label>A'zo bo'lgan</label>
                <span>FreshMart mijozi</span>
              </div>
            </div>

            <div v-else class="edit-form">
              <div class="form-grid-2">
                <div class="field">
                  <label>Ism</label>
                  <input v-model="editData.name" type="text" />
                </div>
                <div class="field">
                  <label>Telefon</label>
                  <input v-model="editData.phone" type="tel" />
                </div>
              </div>
              <div class="field">
                <label>Email</label>
                <input v-model="editData.email" type="email" disabled class="disabled" />
              </div>
              <div class="form-actions">
                <button class="cancel-btn" @click="editing = false">Bekor qilish</button>
                <button class="save-btn" @click="saveEdit">Saqlash</button>
              </div>
            </div>

            <!-- Stats -->
            <div class="user-stats">
              <div class="stat-card">
                <strong>{{ authStore.orders.length }}</strong>
                <span>Buyurtma</span>
              </div>
              <div class="stat-card">
                <strong>{{ productStore.wishlist.length }}</strong>
                <span>Sevimli</span>
              </div>
              <div class="stat-card">
                <strong>{{ totalSpent }}</strong>
                <span>so'm sarflangan</span>
              </div>
            </div>
          </div>

          <!-- ── Tab: Buyurtmalar ── -->
          <div v-else-if="activeTab === 'orders'" key="orders" class="tab-panel">
            <div class="panel-head">
              <h2>Buyurtmalarim</h2>
              <span class="panel-count">{{ authStore.orders.length }} ta</span>
            </div>

            <div v-if="authStore.orders.length" class="orders-list">
              <div class="order-card" v-for="order in authStore.orders" :key="order.id">
                <div class="oc-head">
                  <div class="oc-id">
                    <span class="oc-num">#{{ order.id }}</span>
                    <span class="oc-date">{{ order.date }}</span>
                  </div>
                  <span class="oc-status" :class="'status-' + order.status">{{ statusLabel(order.status) }}</span>
                </div>

                <div class="oc-items">
                  <div class="oci" v-for="item in order.items.slice(0,3)" :key="item.id">
                    <img :src="item.image" :alt="item.name" />
                    <span>{{ item.name }}</span>
                    <span class="oci-qty">{{ fmtQty(item) }}</span>
                  </div>
                  <p v-if="order.items.length > 3" class="oc-more">+{{ order.items.length - 3 }} ta mahsulot</p>
                </div>

                <div class="oc-foot">
                  <div class="oc-meta">
                    <span>📍 {{ order.city }}</span>
                    <span>💳 {{ order.payment }}</span>
                  </div>
                  <strong class="oc-total">{{ fmt(order.total) }} so'm</strong>
                </div>
              </div>
            </div>

            <div v-else class="empty-state">
              <div class="es-art">
                <svg viewBox="0 0 140 140" fill="none" width="130" height="130">
                  <circle cx="70" cy="70" r="66" fill="#f0fdf4" stroke="#dcfce7" stroke-width="2"/>
                  <path d="M42 56h56l-8 40H50L42 56z" fill="#dcfce7" stroke="#4ade80" stroke-width="2" stroke-linejoin="round"/>
                  <circle cx="58" cy="102" r="5" fill="#4ade80"/>
                  <circle cx="82" cy="102" r="5" fill="#4ade80"/>
                  <path d="M34 48h8l2 8" stroke="#86efac" stroke-width="2.5" stroke-linecap="round"/>
                </svg>
              </div>
              <h3>Buyurtmalar yo'q</h3>
              <p>Hali hech narsa buyurtma qilmagansiz</p>
              <router-link to="/products" class="es-btn">Xarid boshlash</router-link>
            </div>
          </div>

          <!-- ── Tab: Sevimlilar ── -->
          <div v-else-if="activeTab === 'wishlist'" key="wishlist" class="tab-panel">
            <div class="panel-head">
              <h2>Sevimli mahsulotlar</h2>
              <span class="panel-count">{{ wishlistProducts.length }} ta</span>
            </div>

            <div v-if="wishlistProducts.length" class="wish-grid">
              <div class="wish-card" v-for="p in wishlistProducts" :key="p.id">
                <router-link :to="'/product/' + p.id" class="wc-img-link">
                  <img :src="p.images ? p.images[0] : p.image" :alt="p.name" />
                </router-link>
                <div class="wc-body">
                  <router-link :to="'/product/' + p.id">
                    <p class="wc-name">{{ p.name }}</p>
                  </router-link>
                  <div class="wc-price">
                    <strong>{{ fmt(p.price) }}</strong>
                    <span>so'm / {{ p.unit || 'dona' }}</span>
                  </div>
                </div>
                <div class="wc-actions">
                  <button class="wc-cart" @click="addToCart(p)">
                    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                      <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    Savatga
                  </button>
                  <button class="wc-del" @click="productStore.toggleWishlist(p.id)" title="O'chirish">
                    <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
                      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div v-else class="empty-state">
              <div class="es-art">
                <svg viewBox="0 0 140 140" fill="none" width="130" height="130">
                  <circle cx="70" cy="70" r="66" fill="#fff1f2" stroke="#fecaca" stroke-width="2"/>
                  <path d="M70 105C70 105 30 80 30 52a22 22 0 0140 0 22 22 0 0140 0c0 28-40 53-40 53z"
                    fill="#fecaca" stroke="#ef4444" stroke-width="2" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3>Sevimlilar bo'sh</h3>
              <p>Yoqtirgan mahsulotlaringizni bu yerda saqlang</p>
              <router-link to="/products" class="es-btn">Mahsulotlarga o'tish</router-link>
            </div>
          </div>

        </transition>
      </div>
    </div>
    </div><!-- /v-else logged in -->

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore }    from '../stores/auth'
import { useProductStore } from '../stores/products'
import { useCartStore }    from '../stores/cart'

const authStore    = useAuthStore()
const productStore = useProductStore()
const cartStore    = useCartStore()

/* ── Auth ── */
const authTab  = ref('login')
const lEmail   = ref('')
const lPass    = ref('')
const rName    = ref('')
const rEmail   = ref('')
const rPhone   = ref('')
const rPass    = ref('')
const showPass = ref(false)
const authErr  = ref('')

function clearErr() { authErr.value = '' }

function doLogin() {
  if (!lEmail.value || !lPass.value) { authErr.value = 'Barcha maydonlarni to\'ldiring'; return }
  const res = authStore.login(lEmail.value, lPass.value)
  if (!res.ok) authErr.value = res.error
}

function doRegister() {
  if (!rName.value || !rEmail.value || !rPass.value) { authErr.value = 'Majburiy maydonlarni to\'ldiring'; return }
  if (rPass.value.length < 6) { authErr.value = 'Parol kamida 6 ta belgi bo\'lishi kerak'; return }
  const res = authStore.register({ name: rName.value, email: rEmail.value, phone: rPhone.value, password: rPass.value })
  if (!res.ok) authErr.value = res.error
}

/* ── Profile ── */
const activeTab = ref('info')
const editing   = ref(false)
const editData  = ref({})

const initials = computed(() => {
  if (!authStore.user?.name) return '?'
  return authStore.user.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()
})

const tabs = computed(() => [
  { id:'info',     label:"Ma'lumotlarim",  icon: userIcon },
  { id:'orders',   label:'Buyurtmalarim', icon: bagIcon,  badge: authStore.orders.length || null },
  { id:'wishlist', label:'Sevimlilar',    icon: heartIcon, badge: productStore.wishlist.length || null },
])

const totalSpent = computed(() =>
  authStore.orders.reduce((s, o) => s + o.total, 0).toLocaleString('uz-UZ')
)

const wishlistProducts = computed(() =>
  productStore.allProducts.filter(p => productStore.wishlist.includes(p.id))
)

function startEdit() {
  editData.value = { ...authStore.user }
  editing.value  = true
}

function saveEdit() {
  if (!editData.value.name) return
  authStore.updateUser(editData.value)
  editing.value = false
}

function doLogout() {
  authStore.logout()
  activeTab.value = 'info'
}

function fmt(n) { return n.toLocaleString('uz-UZ') }

function fmtQty(item) {
  const u = item.unit || 'dona'
  const q = (u === 'kg' || u === 'gr') ? item.qty.toFixed(1) : item.qty
  return `${q} ${u}`
}

function statusLabel(s) {
  return { processing: 'Jarayonda', delivered: 'Yetkazildi', cancelled: 'Bekor qilindi' }[s] || s
}

function addToCart(p) {
  cartStore.addItem({ ...p, image: p.images ? p.images[0] : p.image })
}

/* SVG icons as strings for tab nav */
const userIcon  = `<svg viewBox="0 0 18 18" fill="none" width="16" height="16"><circle cx="9" cy="6" r="3.5" stroke="currentColor" stroke-width="1.6"/><path d="M2 17c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`
const bagIcon   = `<svg viewBox="0 0 18 18" fill="none" width="16" height="16"><path d="M3 5h12l-1.5 9H4.5L3 5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="7" cy="15" r="1.2" fill="currentColor"/><circle cx="11" cy="15" r="1.2" fill="currentColor"/><path d="M5 5V4a4 4 0 018 0v1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`
const heartIcon = `<svg viewBox="0 0 18 18" fill="none" width="16" height="16"><path d="M9 15S2 10.5 2 6a4 4 0 018 0 4 4 0 018 0c0 4.5-7 9-7 9z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`

const benefits = [
  { i:'🚀', t:'Tezkor yetkazish',   d:'30 daqiqada eshigingizga' },
  { i:'🎁', t:'Maxsus chegirmalar', d:'A\'zolarga alohida narxlar' },
  { i:'📦', t:'Buyurtma kuzatish',  d:'Real vaqtda holat ko\'rish' },
]
</script>

<style scoped>
.page { padding-top:70px; }
@media (max-width:768px) { .page { padding-top:58px; } }

/* ── Banner ────────────────────────────────────────── */
.page-banner {
  background:linear-gradient(135deg,#052e16,#14532d);
  padding:44px 0 36px;
}
.desk-banner { display:flex; justify-content:space-between; align-items:center; }
.breadcrumb { display:flex; align-items:center; gap:8px; font-size:13px; color:rgba(255,255,255,.45); margin-bottom:10px; }
.breadcrumb a { color:rgba(255,255,255,.45); transition:color .18s; }
.breadcrumb a:hover { color:rgba(255,255,255,.85); }
.desk-banner h1 { font-size:28px; font-weight:800; color:#fff; margin-bottom:4px; }
.desk-banner > div > p { color:rgba(255,255,255,.5); font-size:14px; }
.banner-icon svg { opacity:.8; }
.avatar-big {
  width:72px; height:72px; border-radius:20px;
  background:linear-gradient(135deg,var(--green-400),var(--green-600));
  display:flex; align-items:center; justify-content:center;
  font-size:26px; font-weight:800; color:#fff;
  box-shadow:0 8px 24px rgba(34,197,94,.35);
}

/* ── Auth ──────────────────────────────────────────── */
.auth-wrap { padding:48px 0 80px; display:flex; justify-content:center; }
.auth-card {
  width:100%; max-width:480px;
  background:#fff; border-radius:var(--radius-lg);
  border:1px solid var(--border); padding:32px;
  box-shadow:var(--shadow-md);
}

.auth-tabs {
  display:flex; background:var(--slate-100); border-radius:12px;
  padding:4px; gap:4px; margin-bottom:28px;
}
.auth-tabs button {
  flex:1; padding:10px; border-radius:9px;
  font-size:14px; font-weight:600; color:var(--text-2);
  transition: background .2s, color .2s, box-shadow .2s;
}
.auth-tabs button.active {
  background:#fff; color:var(--green-700);
  box-shadow:var(--shadow-sm);
}

.auth-form { display:flex; flex-direction:column; gap:16px; }

.field { display:flex; flex-direction:column; gap:6px; }
.field label { font-size:13px; font-weight:600; color:var(--text-2); }
.field input {
  padding:11px 14px; border-radius:10px;
  border:1.5px solid var(--border); font-size:14px;
  font-family:inherit; outline:none; color:var(--text);
  transition:border-color .2s;
}
.field input:focus { border-color:var(--green-400); }
.field input.err    { border-color:var(--red-400); }
.field input.disabled { background:var(--slate-50); color:var(--text-3); cursor:not-allowed; }

.form-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

.pass-wrap { position:relative; }
.pass-wrap input { width:100%; padding-right:44px; }
.eye-btn {
  position:absolute; right:12px; top:50%; transform:translateY(-50%);
  color:var(--text-3); transition:color .18s;
}
.eye-btn:hover { color:var(--text); }

.req { color:var(--red-500); }

.auth-err {
  padding:10px 14px; border-radius:10px;
  background:#fef2f2; color:var(--red-600);
  font-size:13px; border:1px solid #fecaca;
}

.submit-btn {
  display:flex; align-items:center; justify-content:center; gap:8px;
  padding:14px; border-radius:12px; margin-top:4px;
  background:linear-gradient(135deg,var(--green-500),var(--green-600));
  color:#fff; font-size:15px; font-weight:700;
  transition:transform .2s var(--spring), box-shadow .2s;
}
.submit-btn:hover { transform:translateY(-2px); box-shadow:var(--shadow-green); }

.auth-switch { text-align:center; font-size:13px; color:var(--text-3); }
.auth-switch button { color:var(--green-600); font-weight:600; text-decoration:underline; }

.auth-benefits {
  display:flex; flex-direction:column; gap:10px;
  margin-top:28px; padding-top:24px;
  border-top:1px solid var(--border);
}
.ab { display:flex; align-items:center; gap:12px; }
.ab-icon { font-size:22px; width:36px; text-align:center; flex-shrink:0; }
.ab strong { display:block; font-size:13px; font-weight:700; }
.ab p { font-size:12px; color:var(--text-3); margin-top:1px; }

/* ── Profile layout ────────────────────────────────── */
.profile-wrap {
  display:grid; grid-template-columns:260px 1fr;
  gap:28px; padding:36px 0 80px; align-items:start;
}

/* ── Sidebar ───────────────────────────────────────── */
.profile-side {
  background:#fff; border-radius:var(--radius-lg);
  border:1px solid var(--border); padding:24px;
  position:sticky; top:84px;
}

.side-user {
  display:flex; flex-direction:column; align-items:center;
  gap:12px; text-align:center; padding-bottom:20px;
  border-bottom:1px solid var(--border); margin-bottom:16px;
}
.side-avatar {
  width:64px; height:64px; border-radius:18px;
  background:linear-gradient(135deg,var(--green-400),var(--green-600));
  display:flex; align-items:center; justify-content:center;
  font-size:22px; font-weight:800; color:#fff;
}
.side-user strong { display:block; font-size:15px; font-weight:700; }
.side-user p { font-size:12px; color:var(--text-3); }
.side-phone { margin-top:2px; }

.side-nav { display:flex; flex-direction:column; gap:2px; margin-bottom:16px; }
.sn-btn {
  display:flex; align-items:center; gap:10px;
  width:100%; padding:11px 14px; border-radius:11px;
  font-size:13px; font-weight:600; color:var(--text-2);
  background:none; border:none; cursor:pointer;
  transition:background .18s, color .18s;
  font-family:inherit; text-align:left;
}
.sn-btn:hover { background:var(--slate-50); color:var(--text); }
.sn-btn.active { background:var(--green-50); color:var(--green-700); }
.sn-icon { display:flex; align-items:center; color:inherit; }
.sn-badge {
  margin-left:auto; min-width:20px; height:20px; border-radius:10px;
  background:var(--green-500); color:#fff;
  font-size:10px; font-weight:700;
  display:flex; align-items:center; justify-content:center; padding:0 5px;
}

.logout-btn {
  display:flex; align-items:center; gap:8px;
  width:100%; padding:11px 14px; border-radius:11px;
  font-size:13px; font-weight:600; color:var(--red-500);
  background:none; border:none; cursor:pointer;
  transition:background .18s; font-family:inherit;
}
.logout-btn:hover { background:#fef2f2; }

/* ── Main panel ────────────────────────────────────── */
.profile-main {
  background:#fff; border-radius:var(--radius-lg);
  border:1px solid var(--border); padding:28px;
  min-height:400px;
}

.panel-head {
  display:flex; align-items:center; justify-content:space-between;
  margin-bottom:24px; padding-bottom:16px;
  border-bottom:1px solid var(--border);
}
.panel-head h2 { font-size:18px; font-weight:700; }
.panel-count { font-size:13px; color:var(--text-3); background:var(--slate-100); padding:4px 12px; border-radius:50px; }

.edit-btn {
  display:flex; align-items:center; gap:6px;
  padding:8px 16px; border-radius:9px;
  background:var(--slate-100); color:var(--text-2);
  font-size:12px; font-weight:600;
  transition:background .18s;
}
.edit-btn:hover { background:var(--slate-200); }

/* Info grid */
.info-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:28px; }
.ig-item { background:var(--slate-50); border-radius:12px; padding:14px 16px; }
.ig-item label { display:block; font-size:11px; font-weight:600; color:var(--text-3); text-transform:uppercase; letter-spacing:.5px; margin-bottom:5px; }
.ig-item span { font-size:14px; font-weight:600; color:var(--text); }

/* Edit form */
.edit-form { display:flex; flex-direction:column; gap:14px; margin-bottom:28px; }
.form-actions { display:flex; gap:10px; justify-content:flex-end; margin-top:4px; }
.cancel-btn {
  padding:10px 20px; border-radius:10px;
  background:var(--slate-100); color:var(--text-2);
  font-size:13px; font-weight:600; transition:background .18s;
}
.cancel-btn:hover { background:var(--slate-200); }
.save-btn {
  padding:10px 24px; border-radius:10px;
  background:var(--green-500); color:#fff;
  font-size:13px; font-weight:700;
  transition:background .18s;
}
.save-btn:hover { background:var(--green-600); }

/* Stats */
.user-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
.stat-card {
  text-align:center; padding:16px;
  background:var(--green-50); border-radius:14px;
  border:1px solid var(--green-100,#dcfce7);
}
.stat-card strong { display:block; font-size:22px; font-weight:800; color:var(--green-700); margin-bottom:4px; }
.stat-card span { font-size:11px; color:var(--green-600); font-weight:500; }

/* Orders */
.orders-list { display:flex; flex-direction:column; gap:14px; }
.order-card {
  border:1px solid var(--border); border-radius:14px; overflow:hidden;
  transition:box-shadow .2s, border-color .2s;
}
.order-card:hover { box-shadow:var(--shadow-sm); border-color:var(--green-200,#bbf7d0); }

.oc-head {
  display:flex; justify-content:space-between; align-items:center;
  padding:14px 16px; background:var(--slate-50);
  border-bottom:1px solid var(--border);
}
.oc-num { font-size:14px; font-weight:700; color:var(--text); }
.oc-date { font-size:12px; color:var(--text-3); margin-left:8px; }
.oc-status {
  padding:4px 12px; border-radius:50px;
  font-size:11px; font-weight:700;
}
.status-processing { background:#fef9c3; color:#a16207; }
.status-delivered  { background:#dcfce7; color:#15803d; }
.status-cancelled  { background:#fef2f2; color:#b91c1c; }

.oc-items { padding:12px 16px; display:flex; flex-direction:column; gap:8px; }
.oci { display:flex; align-items:center; gap:10px; }
.oci img { width:36px; height:36px; border-radius:8px; object-fit:cover; flex-shrink:0; }
.oci span { font-size:13px; color:var(--text); flex:1; }
.oci-qty { font-size:12px; color:var(--text-3); flex-shrink:0; }
.oc-more { font-size:12px; color:var(--text-3); padding-top:2px; }

.oc-foot {
  display:flex; justify-content:space-between; align-items:center;
  padding:12px 16px; border-top:1px solid var(--border);
  background:var(--slate-50);
}
.oc-meta { display:flex; gap:16px; font-size:12px; color:var(--text-3); }
.oc-total { font-size:16px; font-weight:800; color:var(--green-700); }

/* Wishlist grid */
.wish-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:14px; }
.wish-card {
  border:1px solid var(--border); border-radius:14px; overflow:hidden;
  transition:box-shadow .2s, border-color .2s;
}
.wish-card:hover { box-shadow:var(--shadow-sm); border-color:var(--green-200,#bbf7d0); }
.wc-img-link { display:block; aspect-ratio:4/3; overflow:hidden; background:var(--slate-50); }
.wc-img-link img { width:100%; height:100%; object-fit:cover; transition:transform .4s; }
.wish-card:hover .wc-img-link img { transform:scale(1.05); }
.wc-body { padding:12px 14px 8px; }
.wc-name { font-size:13px; font-weight:600; color:var(--text); line-height:1.3; margin-bottom:6px; }
a:hover .wc-name { color:var(--green-700); }
.wc-price { display:flex; align-items:baseline; gap:4px; }
.wc-price strong { font-size:15px; font-weight:800; color:var(--green-700); }
.wc-price span { font-size:11px; color:var(--text-3); }
.wc-actions { display:flex; gap:8px; padding:0 14px 14px; }
.wc-cart {
  flex:1; display:flex; align-items:center; justify-content:center; gap:6px;
  padding:9px; border-radius:10px;
  background:var(--green-50); color:var(--green-700);
  border:1.5px solid var(--green-200,#bbf7d0);
  font-size:12px; font-weight:600;
  transition:background .18s, color .18s;
}
.wc-cart:hover { background:var(--green-500); color:#fff; border-color:var(--green-500); }
.wc-del {
  width:36px; height:36px; border-radius:10px; flex-shrink:0;
  background:var(--slate-100); color:var(--text-3);
  display:flex; align-items:center; justify-content:center;
  transition:background .18s, color .18s;
}
.wc-del:hover { background:#fee2e2; color:var(--red-500); }

/* Empty state */
.empty-state { text-align:center; padding:48px 20px; }
.es-art { margin-bottom:20px; }
.empty-state h3 { font-size:20px; font-weight:800; margin-bottom:8px; }
.empty-state p  { font-size:14px; color:var(--text-3); margin-bottom:24px; }
.es-btn {
  display:inline-flex; padding:12px 32px; border-radius:12px;
  background:linear-gradient(135deg,var(--green-500),var(--green-600));
  color:#fff; font-size:14px; font-weight:700;
  transition:transform .2s var(--spring), box-shadow .2s;
}
.es-btn:hover { transform:translateY(-2px); box-shadow:var(--shadow-green); }

/* Transitions */
.tab-fade-enter-active, .tab-fade-leave-active { transition:opacity .2s, transform .2s; }
.tab-fade-enter-from { opacity:0; transform:translateY(8px); }
.tab-fade-leave-to   { opacity:0; transform:translateY(-8px); }

/* ── Mobile banner elements (hidden on desktop) ──────── */
.mob-banner    { display:none; }
.mob-tab-bar   { display:none; }

/* ── Desktop banner elements ─────────────────────────── */
.desk-banner { display:flex; }

/* ── Responsive ─────────────────────────────────────── */
@media (max-width:900px) {
  .profile-wrap { grid-template-columns:1fr; }
  .profile-side { position:static; }
}

@media (max-width:768px) {
  /* Banner */
  .desk-banner { display:none; }
  .mob-banner {
    display:flex; flex-direction:column; align-items:center;
    padding:20px 20px 28px; text-align:center; position:relative;
  }
  .mob-logout-btn {
    position:absolute; top:16px; right:16px;
    width:36px; height:36px; border-radius:10px;
    background:rgba(255,255,255,.12); border:none; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    transition:background .18s;
  }
  .mob-logout-btn:hover { background:rgba(255,255,255,.2); }
  .mob-avatar-wrap { margin-bottom:12px; }
  .mob-avatar {
    width:76px; height:76px; border-radius:22px;
    background:linear-gradient(135deg,rgba(255,255,255,.25),rgba(255,255,255,.1));
    border:2px solid rgba(255,255,255,.3);
    display:flex; align-items:center; justify-content:center;
    font-size:28px; font-weight:800; color:#fff;
    box-shadow:0 8px 24px rgba(0,0,0,.2);
  }
  .mob-name  { font-size:18px; font-weight:800; color:#fff; margin-bottom:4px; }
  .mob-email { font-size:13px; color:rgba(255,255,255,.6); margin-bottom:20px; }
  .mob-stats {
    display:flex; align-items:center; gap:0;
    background:rgba(255,255,255,.1); border-radius:16px;
    padding:12px 20px; border:1px solid rgba(255,255,255,.15);
    width:100%; max-width:320px; justify-content:center;
  }
  .ms-item { text-align:center; flex:1; }
  .ms-item strong { display:block; font-size:16px; font-weight:800; color:#fff; }
  .ms-item span   { font-size:10px; color:rgba(255,255,255,.6); font-weight:500; }
  .ms-divider { width:1px; height:32px; background:rgba(255,255,255,.2); margin:0 4px; }
  .mob-banner-guest { padding:28px 20px 24px; }
  .mob-guest-icon { margin-bottom:10px; opacity:.8; }

  /* Mobile tab bar */
  .mob-tab-bar {
    display:flex; align-items:center;
    background:#fff; border-bottom:1px solid var(--border);
    position:sticky; top:58px; z-index:50;
    box-shadow:0 2px 8px rgba(0,0,0,.05);
  }
  .mtb-item {
    flex:1; display:flex; flex-direction:column; align-items:center;
    gap:3px; padding:10px 4px;
    font-size:10px; font-weight:600; color:var(--text-3);
    background:none; border:none; cursor:pointer;
    position:relative; transition:color .18s;
    font-family:inherit;
    border-bottom:2px solid transparent;
  }
  .mtb-item.active { color:var(--green-600); border-bottom-color:var(--green-500); }
  .mtb-icon { display:flex; align-items:center; }
  .mtb-label { line-height:1; }
  .mtb-badge {
    position:absolute; top:6px; right:calc(50% - 14px);
    min-width:16px; height:16px; border-radius:8px;
    background:var(--green-500); color:#fff;
    font-size:9px; font-weight:700;
    display:flex; align-items:center; justify-content:center; padding:0 3px;
  }

  /* Hide desktop sidebar */
  .profile-side { display:none; }

  /* Profile layout: single col, flat */
  .profile-wrap {
    grid-template-columns:1fr;
    padding:0 0 80px;
    gap:0;
  }
  .profile-main {
    border-radius:0; border-left:none; border-right:none; border-top:none;
    padding:20px 16px;
    min-height:0;
    box-shadow:none;
  }

  /* Auth */
  .auth-wrap { padding:20px 0 80px; }
  .auth-card {
    border-radius:0; border-left:none; border-right:none; border-top:none;
    padding:24px 16px;
    box-shadow:none;
    max-width:100%;
  }
  .auth-benefits { display:none; }

  /* Info grid */
  .info-grid { grid-template-columns:1fr 1fr; }

  /* Stats */
  .user-stats { grid-template-columns:repeat(3,1fr); gap:8px; }
  .stat-card { padding:12px 8px; }
  .stat-card strong { font-size:18px; }

  /* Orders */
  .oc-meta { flex-direction:column; gap:4px; }

  /* Wishlist */
  .wish-grid { grid-template-columns:1fr 1fr; gap:10px; }
}

@media (max-width:430px) {
  .page-banner { padding:0; }
  .mob-banner { padding:16px 16px 22px; }
  .mob-avatar { width:64px; height:64px; font-size:22px; border-radius:18px; }
  .mob-name { font-size:16px; }
  .info-grid { grid-template-columns:1fr; }
  .user-stats { gap:6px; }
  .stat-card strong { font-size:16px; }
  .stat-card span   { font-size:10px; }
  .panel-head h2 { font-size:16px; }
  .form-grid-2 { grid-template-columns:1fr; }
  .wish-grid { grid-template-columns:1fr; }
  .oc-foot { flex-direction:column; align-items:flex-start; gap:6px; }
  .profile-main { padding:16px 14px; }
}

@media (max-width:375px) {
  .mob-stats { padding:10px 12px; }
  .ms-item strong { font-size:14px; }
  .mtb-item { font-size:9px; }
}
</style>
