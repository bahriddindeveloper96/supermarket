<template>
  <div class="page">

    <!-- Banner -->
    <div class="page-banner">
      <div class="container banner-inner">
        <div>
          <div class="breadcrumb">
            <router-link to="/">Bosh sahifa</router-link>
            <span>/</span>
            <router-link to="/cart">Savat</router-link>
            <span>/</span>
            <span>Buyurtma</span>
          </div>
          <h1>Buyurtma Berish</h1>
        </div>
        <!-- Steps -->
        <div class="steps">
          <div v-for="(s,i) in stepLabels" :key="i" class="step-wrap">
            <div class="step" :class="{ active: step===i+1, done: step>i+1 }">
              <div class="step-circle">
                <svg v-if="step>i+1" viewBox="0 0 14 14" fill="none" width="12" height="12">
                  <path d="M2 7l4 4 6-6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span v-else>{{ i+1 }}</span>
              </div>
              <span class="step-label">{{ s }}</span>
            </div>
            <div v-if="i<stepLabels.length-1" class="step-line" :class="{ done: step>i+1 }"/>
          </div>
        </div>
      </div>
    </div>

    <div class="container checkout-layout">

      <!-- ── STEP 1: Delivery info ── -->
      <transition name="step-fade" mode="out-in">
        <div v-if="step===1" key="s1" class="form-col">
          <div class="form-card">
            <div class="card-head">
              <div class="card-icon">📍</div>
              <div>
                <h2>Yetkazib berish ma'lumotlari</h2>
                <p>Buyurtma kimga va qayerga yetkazilsin</p>
              </div>
            </div>

            <div class="form-grid">
              <div class="field">
                <label>Ism <span class="req">*</span></label>
                <input v-model="f.firstName" type="text" placeholder="Ismingiz" :class="{ err: v && !f.firstName }" />
              </div>
              <div class="field">
                <label>Familiya <span class="req">*</span></label>
                <input v-model="f.lastName" type="text" placeholder="Familiyangiz" :class="{ err: v && !f.lastName }" />
              </div>
              <div class="field">
                <label>Telefon <span class="req">*</span></label>
                <input v-model="f.phone" type="tel" placeholder="+998 90 123-45-67" :class="{ err: v && !f.phone }" />
              </div>
              <div class="field">
                <label>Email</label>
                <input v-model="f.email" type="email" placeholder="email@example.com" />
              </div>
              <div class="field full">
                <label>Manzil <span class="req">*</span></label>
                <input v-model="f.address" type="text" placeholder="Ko'cha va uy raqami" :class="{ err: v && !f.address }" />
              </div>
              <div class="field">
                <label>Shahar <span class="req">*</span></label>
                <div class="select-wrap">
                  <select v-model="f.city" :class="{ err: v && !f.city }">
                    <option value="">Shahar tanlang</option>
                    <option v-for="c in cities" :key="c">{{ c }}</option>
                  </select>
                  <svg class="sel-arrow" viewBox="0 0 12 12" fill="none" width="12" height="12">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
              <div class="field">
                <label>Yetkazish vaqti</label>
                <div class="select-wrap">
                  <select v-model="f.time">
                    <option value="">Vaqt tanlang</option>
                    <option v-for="t in times" :key="t">{{ t }}</option>
                  </select>
                  <svg class="sel-arrow" viewBox="0 0 12 12" fill="none" width="12" height="12">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
              <div class="field full">
                <label>Izoh (ixtiyoriy)</label>
                <textarea v-model="f.note" rows="3" placeholder="Qo'shimcha ma'lumot..."></textarea>
              </div>
            </div>

            <div class="form-actions">
              <router-link to="/cart" class="back-btn">
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                  <path d="M13 8H3M8 3l-5 5 5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Orqaga
              </router-link>
              <button class="next-btn" @click="nextStep1">
                To'lov usuliga o'tish
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- ── STEP 2: Payment ── -->
        <div v-else-if="step===2" key="s2" class="form-col">
          <div class="form-card">
            <div class="card-head">
              <div class="card-icon">💳</div>
              <div>
                <h2>To'lov usuli</h2>
                <p>Qulay to'lov usulini tanlang</p>
              </div>
            </div>

            <div class="payment-list">
              <div
                v-for="m in methods" :key="m.id"
                class="pm-card"
                :class="{ selected: pay===m.id }"
                @click="pay=m.id"
              >
                <div class="pm-radio" :class="{ checked: pay===m.id }">
                  <div class="pm-dot"/>
                </div>
                <div class="pm-icon">{{ m.icon }}</div>
                <div class="pm-info">
                  <strong>{{ m.name }}</strong>
                  <p>{{ m.desc }}</p>
                </div>
                <div v-if="m.badge" class="pm-badge">{{ m.badge }}</div>
              </div>
            </div>

            <!-- Card form -->
            <transition name="fade">
              <div v-if="pay==='card'" class="card-form">
                <div class="cf-head">
                  <span>Karta ma'lumotlari</span>
                  <div class="card-logos">
                    <span>💳 VISA</span>
                    <span>💳 MC</span>
                  </div>
                </div>
                <div class="field full">
                  <label>Karta raqami</label>
                  <input type="text" v-model="cardNum" @input="fmtCard" placeholder="0000 0000 0000 0000" maxlength="19" />
                </div>
                <div class="cf-row">
                  <div class="field">
                    <label>Muddati</label>
                    <input type="text" placeholder="MM / YY" maxlength="7" />
                  </div>
                  <div class="field">
                    <label>CVV</label>
                    <input type="password" placeholder="•••" maxlength="3" />
                  </div>
                </div>
              </div>
            </transition>

            <div class="form-actions">
              <button class="back-btn" @click="step=1">
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                  <path d="M13 8H3M8 3l-5 5 5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Orqaga
              </button>
              <button class="next-btn" :disabled="!pay" @click="step=3">
                Buyurtmani tasdiqlash
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- ── STEP 3: Success ── -->
        <div v-else key="s3" class="form-col">
          <div class="form-card success-card">
            <div class="success-anim">
              <div class="success-ring">
                <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
                  <circle cx="40" cy="40" r="36" fill="#dcfce7" stroke="#4ade80" stroke-width="2"/>
                  <path d="M24 40l12 12 20-20" stroke="#16a34a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <h2>Buyurtma qabul qilindi! 🎉</h2>
            <p class="order-num">Buyurtma raqami: <strong>#FM-{{ orderNum }}</strong></p>

            <div class="success-info">
              <div class="si-row">
                <div class="si-label">
                  <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                    <path d="M8 1v8M8 9l-3 4M8 9l3 4" stroke="var(--green-600)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="8" cy="8" r="7" stroke="var(--green-600)" stroke-width="1.6"/>
                  </svg>
                  Manzil
                </div>
                <span>{{ f.address }}, {{ f.city }}</span>
              </div>
              <div class="si-row">
                <div class="si-label">
                  <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                    <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="var(--green-600)" stroke-width="1.6"/>
                    <path d="M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1" stroke="var(--green-600)" stroke-width="1.6"/>
                  </svg>
                  To'lov
                </div>
                <span>{{ payName }}</span>
              </div>
              <div class="si-row">
                <div class="si-label">
                  <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                    <circle cx="8" cy="8" r="6" stroke="var(--green-600)" stroke-width="1.6"/>
                    <path d="M8 5v3.5l2.5 1.5" stroke="var(--green-600)" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                  Vaqti
                </div>
                <span>{{ f.time || '30 daqiqa ichida' }}</span>
              </div>
              <div class="si-row total-row">
                <div class="si-label">Jami to'lov</div>
                <span class="si-total">{{ fmt(cartStore.totalPrice) }} so'm</span>
              </div>
            </div>

            <div class="success-actions">
              <button class="finish-btn" @click="finish">
                Bosh sahifaga qaytish
              </button>
              <button class="track-btn">
                📦 Buyurtmani kuzatish
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- ── ORDER SIDEBAR ── -->
      <div class="order-col" v-if="step<3">
        <div class="order-card">
          <h3>Buyurtma ({{ cartStore.totalItems }} ta)</h3>
          <div class="order-items">
            <div class="oi" v-for="item in cartStore.items" :key="item.id">
              <div class="oi-img"><img :src="item.image" :alt="item.name" /></div>
              <div class="oi-body">
                <p>{{ item.name }}</p>
                <small>{{ fmtQty(item) }} × {{ fmt(item.price) }} so'm</small>
              </div>
              <span class="oi-total">{{ fmt(item.price*item.qty) }}</span>
            </div>
          </div>

          <div class="order-sum">
            <div class="os-row"><span>Yetkazish</span><span class="free">Bepul</span></div>
            <div class="os-total">
              <span>Jami</span>
              <strong>{{ fmt(cartStore.totalPrice) }} so'm</strong>
            </div>
          </div>
        </div>

        <!-- Delivery info card (step 2) -->
        <div class="delivery-card" v-if="step===2 && f.firstName">
          <h4>📍 Yetkazib berish</h4>
          <p>{{ f.firstName }} {{ f.lastName }}</p>
          <p>{{ f.address }}, {{ f.city }}</p>
          <p>{{ f.phone }}</p>
          <button class="edit-link" @click="step=1">Tahrirlash</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { useRouter }    from 'vue-router'

const cartStore = useCartStore()
const router    = useRouter()

const step = ref(1)
const v    = ref(false)  // validation triggered
const pay  = ref('')
const cardNum = ref('')
const orderNum = Math.floor(Math.random()*90000)+10000

const f = ref({
  firstName:'', lastName:'', phone:'', email:'',
  address:'', city:'', time:'', note:''
})

const stepLabels = ['Ma\'lumotlar', 'To\'lov', 'Tasdiqlash']

const cities = ['Toshkent','Samarqand','Buxoro','Namangan','Andijon','Farg\'ona','Qo\'qon','Nukus']
const times  = ['09:00 – 12:00','12:00 – 15:00','15:00 – 18:00','18:00 – 21:00']

const methods = [
  { id:'card',  icon:'💳', name:'Kredit / Debit karta', desc:'Visa, Mastercard, UzCard', badge:'' },
  { id:'payme', icon:'📱', name:'Payme',  desc:'Payme ilovasi orqali to\'lash', badge:'Mashhur' },
  { id:'click', icon:'⚡', name:'Click',  desc:'Click ilovasi orqali to\'lash', badge:'' },
  { id:'cash',  icon:'💵', name:'Naqd pul', desc:'Kurier kelganda to\'lash', badge:'' },
]

const payName = computed(() => methods.find(m=>m.id===pay.value)?.name || '')

function fmt(n) { return n.toLocaleString('uz-UZ') }

function fmtQty(item) {
  const u = item.unit || 'dona'
  const q = (u === 'kg' || u === 'gr') ? item.qty.toFixed(1) : item.qty
  return `${q} ${u}`
}

function nextStep1() {
  v.value = true
  if (!f.value.firstName || !f.value.lastName || !f.value.phone || !f.value.address || !f.value.city) return
  v.value = false
  step.value = 2
}

function fmtCard() {
  cardNum.value = cardNum.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim()
}

function finish() {
  cartStore.clearCart()
  router.push('/')
}
</script>

<style scoped>
.page { padding-top:70px; }
@media (max-width:768px) { .page { padding-top:58px; } }

/* ─── Banner ─────────────────────────────────────── */
.page-banner {
  background:linear-gradient(135deg,#052e16,#14532d);
  padding:36px 0;
}
.banner-inner { display:flex; justify-content:space-between; align-items:center; gap:32px; flex-wrap:wrap; }
.breadcrumb { display:flex; align-items:center; gap:8px; font-size:13px; color:rgba(255,255,255,.4); margin-bottom:8px; }
.breadcrumb a { color:rgba(255,255,255,.4); transition:color .18s; }
.breadcrumb a:hover { color:rgba(255,255,255,.8); }
.banner-inner h1 { font-size:28px; font-weight:800; color:#fff; }

/* Steps */
.steps { display:flex; align-items:center; gap:0; }
.step-wrap { display:flex; align-items:center; }
.step { display:flex; align-items:center; gap:10px; }
.step-circle {
  width:32px; height:32px; border-radius:50%;
  background:rgba(255,255,255,.1); border:2px solid rgba(255,255,255,.2);
  display:flex; align-items:center; justify-content:center;
  font-size:13px; font-weight:700; color:rgba(255,255,255,.5);
  transition: all .3s;
}
.step.active .step-circle { background:white; border-color:white; color:var(--green-700); }
.step.done   .step-circle { background:var(--green-500); border-color:var(--green-500); }
.step-label { font-size:13px; font-weight:600; color:rgba(255,255,255,.4); transition: color .3s; }
.step.active .step-label { color:#fff; }
.step.done   .step-label { color:rgba(255,255,255,.7); }
.step-line {
  width:60px; height:2px; background:rgba(255,255,255,.15); margin:0 12px;
  transition: background .3s;
}
.step-line.done { background:var(--green-500); }

/* ─── Layout ─────────────────────────────────────── */
.checkout-layout {
  display:grid; grid-template-columns:1fr 360px;
  gap:28px; padding:36px 28px 80px; align-items:start;
}

/* ─── Form card ──────────────────────────────────── */
.form-card {
  background:#fff; border-radius:var(--radius-lg);
  border:1px solid var(--border); padding:32px;
}
.card-head {
  display:flex; align-items:center; gap:16px;
  margin-bottom:28px; padding-bottom:20px;
  border-bottom:1px solid var(--border);
}
.card-icon { font-size:28px; }
.card-head h2 { font-size:19px; font-weight:700; margin-bottom:2px; }
.card-head p  { font-size:13px; color:var(--text-3); }

/* Form grid */
.form-grid { display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-bottom:28px; }
.field { display:flex; flex-direction:column; gap:6px; }
.field.full { grid-column:1/-1; }
.field label { font-size:12px; font-weight:700; color:var(--text-2); text-transform:uppercase; letter-spacing:.5px; }
.req { color:var(--red-400); }
.field input,
.field textarea {
  padding:12px 14px; border-radius:10px;
  border:1.5px solid var(--border); font-size:14px;
  font-family:inherit; color:var(--text); outline:none;
  transition: border-color .2s, box-shadow .2s;
  background:#fff;
}
.field input:focus,
.field textarea:focus {
  border-color:var(--green-400);
  box-shadow:0 0 0 4px rgba(74,222,128,.12);
}
.field input.err   { border-color:var(--red-400); }
.field textarea { resize:vertical; min-height:80px; }

/* Select */
.select-wrap { position:relative; }
.select-wrap select {
  width:100%; padding:12px 36px 12px 14px;
  border-radius:10px; border:1.5px solid var(--border);
  font-size:14px; font-family:inherit; color:var(--text);
  background:#fff; outline:none; appearance:none;
  transition: border-color .2s;
  cursor:pointer;
}
.select-wrap select:focus { border-color:var(--green-400); }
.select-wrap select.err { border-color:var(--red-400); }
.sel-arrow { position:absolute; right:12px; top:50%; transform:translateY(-50%); color:var(--text-3); pointer-events:none; }

/* Actions */
.form-actions { display:flex; align-items:center; gap:12px; }
.back-btn {
  display:inline-flex; align-items:center; gap:6px;
  padding:12px 20px; border-radius:10px;
  background:var(--slate-100); color:var(--text-2);
  font-size:14px; font-weight:600; transition: background .18s;
}
.back-btn:hover { background:var(--slate-200); color:var(--text); }
.next-btn {
  flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
  padding:14px 24px; border-radius:12px;
  background:linear-gradient(135deg,var(--green-500),var(--green-600));
  color:#fff; font-size:15px; font-weight:700;
  transition: transform .2s var(--spring), box-shadow .2s, opacity .2s;
}
.next-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:var(--shadow-green); }
.next-btn:disabled { opacity:.45; cursor:not-allowed; }

/* ─── Payment ────────────────────────────────────── */
.payment-list { display:flex; flex-direction:column; gap:10px; margin-bottom:24px; }
.pm-card {
  display:flex; align-items:center; gap:14px;
  padding:16px; border-radius:12px;
  border:1.5px solid var(--border); cursor:pointer;
  transition: border-color .2s, background .2s, box-shadow .2s;
}
.pm-card:hover { border-color:var(--green-300,#86efac); }
.pm-card.selected { border-color:var(--green-500); background:var(--green-50); box-shadow:0 0 0 4px rgba(74,222,128,.1); }

.pm-radio {
  width:20px; height:20px; border-radius:50%;
  border:2px solid var(--slate-300); flex-shrink:0;
  display:flex; align-items:center; justify-content:center;
  transition: border-color .2s;
}
.pm-radio.checked { border-color:var(--green-500); }
.pm-dot {
  width:8px; height:8px; border-radius:50%;
  background:var(--green-500); opacity:0; transition: opacity .2s;
}
.pm-radio.checked .pm-dot { opacity:1; }

.pm-icon { font-size:28px; }
.pm-info { flex:1; }
.pm-info strong { display:block; font-size:14px; font-weight:700; margin-bottom:2px; }
.pm-info p { font-size:12px; color:var(--text-3); margin:0; }
.pm-badge {
  padding:3px 10px; border-radius:50px;
  background:var(--green-100); color:var(--green-700);
  font-size:11px; font-weight:700;
}

/* Card form */
.card-form {
  background:var(--slate-50); border-radius:12px;
  border:1px solid var(--border); padding:20px;
  margin-bottom:24px;
}
.cf-head {
  display:flex; justify-content:space-between; align-items:center;
  margin-bottom:16px; font-size:13px; font-weight:600; color:var(--text-2);
}
.card-logos { display:flex; gap:8px; font-size:11px; font-weight:700; color:var(--text-3); }
.cf-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

/* ─── Success ────────────────────────────────────── */
.success-card { text-align:center; }
.success-anim { display:flex; justify-content:center; margin-bottom:20px; }
.success-ring { animation:scaleIn .4s var(--spring); }
.success-card h2 { font-size:26px; font-weight:800; margin-bottom:8px; }
.order-num { color:var(--text-3); font-size:15px; margin-bottom:24px; }
.order-num strong { color:var(--green-700); }

.success-info {
  background:var(--slate-50); border-radius:12px;
  border:1px solid var(--border); padding:20px;
  text-align:left; margin-bottom:24px;
  display:flex; flex-direction:column; gap:12px;
}
.si-row {
  display:flex; justify-content:space-between; align-items:center;
  font-size:14px;
}
.si-label {
  display:flex; align-items:center; gap:7px;
  color:var(--text-3); font-weight:500; font-size:13px;
}
.total-row { padding-top:12px; border-top:1px solid var(--border); }
.total-row .si-label { font-size:15px; font-weight:700; color:var(--text); }
.si-total { font-size:20px; font-weight:800; color:var(--green-700); }

.success-actions { display:flex; gap:10px; }
.finish-btn {
  flex:1; padding:14px; border-radius:12px;
  background:linear-gradient(135deg,var(--green-500),var(--green-600));
  color:#fff; font-size:15px; font-weight:700;
  transition: transform .2s var(--spring), box-shadow .2s;
}
.finish-btn:hover { transform:translateY(-2px); box-shadow:var(--shadow-green); }
.track-btn {
  flex:1; padding:14px; border-radius:12px;
  background:var(--slate-100); color:var(--text);
  font-size:14px; font-weight:600;
  transition: background .18s;
}
.track-btn:hover { background:var(--slate-200); }

/* ─── Order col ──────────────────────────────────── */
.order-card {
  background:#fff; border-radius:var(--radius-lg);
  border:1px solid var(--border); padding:22px;
  position:sticky; top:84px;
  margin-bottom:16px;
}
.order-card h3 { font-size:14px; font-weight:700; color:var(--text-2); text-transform:uppercase; letter-spacing:.5px; margin-bottom:16px; }
.order-items { display:flex; flex-direction:column; gap:10px; margin-bottom:16px; }
.oi { display:flex; align-items:center; gap:10px; }
.oi-img { width:44px; height:44px; border-radius:9px; overflow:hidden; flex-shrink:0; }
.oi-img img { width:100%; height:100%; object-fit:cover; }
.oi-body { flex:1; }
.oi-body p { font-size:13px; font-weight:600; line-height:1.2; }
.oi-body small { color:var(--text-3); font-size:11px; }
.oi-total { font-size:13px; font-weight:700; color:var(--green-700); white-space:nowrap; }

.order-sum { border-top:1px solid var(--border); padding-top:14px; display:flex; flex-direction:column; gap:8px; }
.os-row { display:flex; justify-content:space-between; font-size:13px; color:var(--text-2); }
.free { color:var(--green-600); font-weight:600; }
.os-total { display:flex; justify-content:space-between; align-items:center; font-size:14px; font-weight:600; }
.os-total strong { font-size:20px; color:var(--green-700); }

.delivery-card {
  background:#fff; border-radius:var(--radius-lg);
  border:1px solid var(--border); padding:18px;
  font-size:14px; display:flex; flex-direction:column; gap:5px;
}
.delivery-card h4 { font-size:13px; font-weight:700; margin-bottom:6px; color:var(--text-2); }
.delivery-card p { color:var(--text); }
.edit-link {
  align-self:flex-start; margin-top:8px;
  color:var(--green-600); font-size:13px; font-weight:600;
  transition: color .18s;
}
.edit-link:hover { color:var(--green-700); }

/* Step transition */
.step-fade-enter-active, .step-fade-leave-active { transition:all .28s var(--ease); }
.step-fade-enter-from { opacity:0; transform:translateX(20px); }
.step-fade-leave-to   { opacity:0; transform:translateX(-20px); }

/* ─── Responsive ─────────────────────────────────── */
@media (max-width:900px) {
  .checkout-layout { grid-template-columns:1fr; padding:24px 0 60px; }
  .order-card { position:static; }
  .steps { display:none; }
}
@media (max-width:600px) {
  .page-banner { padding:28px 0; }
  .banner-inner h1 { font-size:22px; }
  .form-grid { grid-template-columns:1fr; gap:14px; }
  .success-actions { flex-direction:column; }
  .form-card { padding:18px; }
  .card-head { gap:10px; margin-bottom:20px; }
  .card-head h2 { font-size:17px; }
  .pm-card { padding:12px; }
  .pm-icon { font-size:22px; }
}
@media (max-width:430px) {
  .next-btn { font-size:13px; padding:13px 16px; }
  .step-circle { width:28px; height:28px; font-size:12px; }
  .step-label  { font-size:11px; }
  .step-line   { width:40px; margin:0 8px; }
}
</style>
