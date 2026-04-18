<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-top">

        <!-- Brand -->
        <div class="brand-col">
          <div class="f-logo">
            <div class="f-logo-mark">🌿</div>
            <div>
              <span class="f-logo-name">FreshMart</span>
              <span class="f-logo-sub">Supermarket</span>
            </div>
          </div>
          <p class="brand-desc">
            O'zbekistonning eng yaxshi online supermarketi. Har kuni yangi, sifatli mahsulotlar kapingizga yetkaziladi.
          </p>
          <div class="socials">
            <a class="social" v-for="s in socials" :key="s.label" :title="s.label" href="#">
              {{ s.icon }}
            </a>
          </div>
          <!-- App badges -->
          <div class="app-links">
            <button class="app-link">🍎 App Store</button>
            <button class="app-link">▶️ Google Play</button>
          </div>
        </div>

        <!-- Links -->
        <div class="links-col" v-for="col in linkCols" :key="col.title">
          <h4>{{ col.title }}</h4>
          <ul>
            <li v-for="l in col.links" :key="l"><a href="#">{{ l }}</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="contact-col">
          <h4>Aloqa</h4>
          <div class="contacts">
            <div class="contact" v-for="c in contacts" :key="c.label">
              <div class="contact-icon">{{ c.icon }}</div>
              <div>
                <p class="c-label">{{ c.label }}</p>
                <p class="c-val">{{ c.val }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="footer-divider"/>

      <!-- Bottom -->
      <div class="footer-bottom">
        <p>© 2024 FreshMart Supermarket. Barcha huquqlar himoyalangan.</p>
        <div class="pay-methods">
          <span v-for="p in pays" :key="p">{{ p }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const socials = [
  { icon:'📘', label:'Facebook' },
  { icon:'📸', label:'Instagram' },
  { icon:'📱', label:'Telegram' },
  { icon:'▶️', label:'YouTube' },
]

const linkCols = [
  {
    title:'Kategoriyalar',
    links:['🍎 Mevalar','🥦 Sabzavotlar','🥩 Go\'sht','🥛 Sut mahsulotlari','🍞 Non & Pishiriq','🥤 Ichimliklar'],
  },
  {
    title:'Kompaniya',
    links:['Biz haqimizda','Ish o\'rinlari','Hamkorlik','Yangiliklar','Maxfiylik siyosati','Shartlar'],
  },
]

const contacts = [
  { icon:'📍', label:'Manzil', val:'Toshkent shahar, Chilonzor tumani' },
  { icon:'📞', label:'Telefon', val:'+998 71 123-45-67' },
  { icon:'✉️', label:'Email', val:'info@freshmart.uz' },
  { icon:'🕐', label:'Ish vaqti', val:'Har kuni: 8:00 – 22:00' },
]

const pays = ['💳 Visa','💳 Mastercard','📱 Payme','⚡ Click','🏦 Uzcard']
</script>

<style scoped>
.footer {
  background:var(--slate-900);
  color:rgba(255,255,255,.6);
  margin-top:80px;
}

.footer-top {
  display:grid;
  grid-template-columns:2.2fr 1fr 1fr 1.4fr;
  gap:48px; padding:60px 0 40px;
}

/* Brand */
.f-logo { display:flex; align-items:center; gap:10px; margin-bottom:16px; }
.f-logo-mark {
  width:42px; height:42px; border-radius:13px;
  background:linear-gradient(135deg,var(--green-500),var(--green-700));
  display:flex; align-items:center; justify-content:center;
  font-size:22px;
}
.f-logo-name { display:block; font-size:18px; font-weight:800; color:#fff; }
.f-logo-sub  { display:block; font-size:9px; color:rgba(255,255,255,.35); letter-spacing:2px; text-transform:uppercase; }
.brand-desc { font-size:13px; line-height:1.8; margin-bottom:20px; }

.socials { display:flex; gap:8px; margin-bottom:16px; }
.social {
  width:38px; height:38px; border-radius:10px;
  background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.08);
  display:flex; align-items:center; justify-content:center;
  font-size:16px; transition: background .2s, transform .2s var(--spring);
}
.social:hover { background:var(--green-600); transform:translateY(-3px); }

.app-links { display:flex; gap:8px; }
.app-link {
  padding:8px 14px; border-radius:9px;
  background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1);
  color:rgba(255,255,255,.8); font-size:12px; font-weight:600;
  font-family:inherit; transition: background .18s;
}
.app-link:hover { background:rgba(255,255,255,.13); }

/* Links */
.links-col h4, .contact-col h4 {
  font-size:12px; font-weight:700; color:#fff;
  text-transform:uppercase; letter-spacing:1px;
  margin-bottom:16px;
}
.links-col ul { list-style:none; display:flex; flex-direction:column; gap:9px; }
.links-col ul li a {
  font-size:13px; color:rgba(255,255,255,.5);
  transition: color .18s, padding-left .18s;
  display:block;
}
.links-col ul li a:hover { color:#fff; padding-left:4px; }

/* Contact */
.contacts { display:flex; flex-direction:column; gap:14px; }
.contact  { display:flex; gap:12px; align-items:flex-start; }
.contact-icon {
  width:34px; height:34px; border-radius:10px; flex-shrink:0;
  background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.08);
  display:flex; align-items:center; justify-content:center; font-size:16px;
}
.c-label { font-size:10px; color:rgba(255,255,255,.35); text-transform:uppercase; letter-spacing:.8px; margin-bottom:2px; }
.c-val   { font-size:13px; color:rgba(255,255,255,.75); }

/* Divider */
.footer-divider { height:1px; background:rgba(255,255,255,.06); }

/* Bottom */
.footer-bottom {
  display:flex; justify-content:space-between; align-items:center;
  padding:20px 0; font-size:12px;
}
.pay-methods { display:flex; gap:10px; flex-wrap:wrap; }
.pay-methods span {
  padding:5px 12px; border-radius:7px;
  background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.08);
  font-size:11px; font-weight:600; color:rgba(255,255,255,.6);
}

/* Responsive */
@media (max-width:1024px) { .footer-top { grid-template-columns:1fr 1fr; gap:32px; } }
@media (max-width:600px) {
  .footer-top { grid-template-columns:1fr; gap:28px; padding:40px 0 28px; }
  .footer-bottom { flex-direction:column; gap:14px; text-align:center; }
}
</style>
