<template>
  <div class="page">
    <div class="container content">
      <div class="art">
        <svg viewBox="0 0 200 200" fill="none" width="200" height="200">
          <circle cx="100" cy="100" r="96" fill="#f0fdf4" stroke="#dcfce7" stroke-width="2"/>
          <text x="100" y="120" text-anchor="middle" font-size="80" font-weight="900" fill="#bbf7d0">404</text>
          <path d="M60 140 Q100 160 140 140" stroke="#4ade80" stroke-width="3" stroke-linecap="round" fill="none"/>
        </svg>
      </div>
      <h1>Sahifa topilmadi</h1>
      <p>Siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan</p>
      <div class="actions">
        <router-link to="/" class="home-btn">
          <svg viewBox="0 0 18 18" fill="none" width="16" height="16">
            <path d="M3 9l6-6 6 6" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 7v7h3v-4h2v4h3V7" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Bosh sahifaga
        </router-link>
        <router-link to="/products" class="shop-btn">
          Mahsulotlarga o'tish
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { padding-top: 70px; min-height: 80vh; display: flex; align-items: center; }
.content { text-align: center; padding: 60px 28px; }
.art { margin-bottom: 24px; }
h1 { font-size: 32px; font-weight: 800; margin-bottom: 10px; }
p  { font-size: 15px; color: var(--text-3); margin-bottom: 32px; }
.actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.home-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 28px; border-radius: 12px;
  background: linear-gradient(135deg, var(--green-500), var(--green-600));
  color: #fff; font-size: 14px; font-weight: 700;
  transition: transform .2s var(--spring), box-shadow .2s;
}
.home-btn:hover { transform: translateY(-2px); box-shadow: var(--shadow-green); }
.shop-btn {
  display: inline-flex; align-items: center;
  padding: 13px 28px; border-radius: 12px;
  background: var(--slate-100); color: var(--text);
  font-size: 14px; font-weight: 600;
  transition: background .18s;
}
.shop-btn:hover { background: var(--slate-200); }
</style>
