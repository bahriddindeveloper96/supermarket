<template>
  <teleport to="body">
    <transition name="map-fade">
      <div v-if="show" class="map-overlay" @click.self="$emit('close')">
        <div class="map-modal">

          <!-- Header -->
          <div class="mm-head">
            <div class="mm-title">
              <div class="mm-pin-icon">
                <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                  <path d="M10 2C7.2 2 5 4.2 5 7c0 4.5 5 11 5 11s5-6.5 5-11c0-2.8-2.2-5-5-5z"
                    fill="var(--green-500)" stroke="var(--green-600)" stroke-width="1.2"/>
                  <circle cx="10" cy="7" r="2" fill="white"/>
                </svg>
              </div>
              <div>
                <h3>Xaritada manzil tanlang</h3>
                <p>Markerni sudrang yoki manzil qidiring</p>
              </div>
            </div>
            <button class="mm-close" @click="$emit('close')" aria-label="Yopish">
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <!-- Search bar -->
          <div class="mm-search">
            <svg class="search-ico" viewBox="0 0 18 18" fill="none" width="15" height="15">
              <circle cx="7.5" cy="7.5" r="5" stroke="currentColor" stroke-width="1.7"/>
              <path d="M11.5 11.5l3 3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
            </svg>
            <input
              ref="searchInput"
              v-model="query"
              type="text"
              placeholder="Manzil, ko'cha yoki landmark qidiring..."
              @keyup.enter="search"
              @input="onInput"
            />
            <button v-if="query" class="search-clear" @click="query=''; suggestions=[]">
              <svg viewBox="0 0 12 12" fill="none" width="10" height="10">
                <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
            </button>
            <button class="search-btn" @click="search" :disabled="!query.trim()">Qidirish</button>
          </div>

          <!-- Suggestions dropdown -->
          <transition name="suggest-drop">
            <ul v-if="suggestions.length" class="suggestions">
              <li
                v-for="s in suggestions" :key="s.uri"
                @click="selectSuggestion(s)"
                class="suggest-item"
              >
                <svg viewBox="0 0 14 14" fill="none" width="12" height="12">
                  <path d="M7 1C4.8 1 3 2.8 3 5c0 3.5 4 8 4 8s4-4.5 4-8c0-2.2-1.8-4-4-4z" stroke="var(--green-500)" stroke-width="1.3"/>
                  <circle cx="7" cy="5" r="1.3" fill="var(--green-500)"/>
                </svg>
                <span>{{ s.displayName }}</span>
              </li>
            </ul>
          </transition>

          <!-- Map -->
          <div class="mm-map-wrap">
            <div ref="mapEl" class="mm-map"/>

            <!-- GPS button on map -->
            <button class="map-gps-btn" @click="goToMe" :class="{ loading: locating }" :title="'Mening joylashuvim'">
              <svg v-if="!locating" viewBox="0 0 20 20" fill="none" width="18" height="18">
                <circle cx="10" cy="10" r="4" stroke="currentColor" stroke-width="1.7"/>
                <path d="M10 2v3M10 15v3M2 10h3M15 10h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <svg v-else class="spin" viewBox="0 0 20 20" fill="none" width="18" height="18">
                <path d="M10 3a7 7 0 017 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>

            <!-- Map loading overlay -->
            <transition name="fade">
              <div v-if="mapLoading" class="map-loading">
                <div class="map-spinner"/>
                <p>Xarita yuklanmoqda...</p>
              </div>
            </transition>
          </div>

          <!-- Footer: address preview + confirm -->
          <div class="mm-foot">
            <div class="addr-preview" :class="{ filled: !!selectedAddress }">
              <div class="ap-icon">
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                  <path d="M8 1C5.8 1 4 2.8 4 5c0 4 4 9 4 9s4-5 4-9c0-2.2-1.8-4-4-4z"
                    :fill="selectedAddress ? 'var(--green-500)' : 'none'"
                    :stroke="selectedAddress ? 'var(--green-600)' : 'currentColor'"
                    stroke-width="1.5"/>
                  <circle cx="8" cy="5" r="1.5"
                    :fill="selectedAddress ? 'white' : 'currentColor'"
                    :stroke="selectedAddress ? 'none' : 'none'"/>
                </svg>
              </div>
              <div class="ap-text">
                <span class="ap-label">Tanlangan manzil</span>
                <span class="ap-addr">{{ selectedAddress || 'Xaritada nuqta tanlang' }}</span>
              </div>
            </div>

            <div class="mm-actions">
              <button class="me-btn" @click="goToMe" :disabled="locating">
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                  <circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                </svg>
                {{ locating ? 'Aniqlanmoqda...' : 'Mening joylashuvim' }}
              </button>
              <button class="ok-btn" :disabled="!selectedAddress" @click="confirm">
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                  <path d="M3 8l4 4 6-6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Tasdiqlash
              </button>
            </div>
          </div>

        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue'

/* ── Yandex Maps API key
   Bepul key olish: https://developer.tech.yandex.ru/
   "JavaScript API and HTTP Geocoder" xizmatini tanlang  */
const YANDEX_API_KEY = 'cbdc9859-f455-4f85-8fba-ede2051230e5'

const props = defineProps({ show: Boolean })
const emit  = defineEmits(['close', 'confirm'])

const mapEl      = ref(null)
const query      = ref('')
const suggestions = ref([])
const selectedAddress = ref('')
const selectedCoords  = ref(null)
const locating   = ref(false)
const mapLoading = ref(true)

let ymaps  = null
let myMap  = null
let placemark = null
let suggestTimer = null

/* ── Load & init map when shown ── */
watch(() => props.show, async (val) => {
  if (!val) return
  await nextTick()
  mapLoading.value = true
  try {
    ymaps = await loadYmaps()
    initMap()
  } catch (e) {
    mapLoading.value = false
    console.error('Yandex Maps yuklanmadi:', e)
  }
})

function loadYmaps() {
  return new Promise((resolve, reject) => {
    if (window.ymaps?.Map) { resolve(window.ymaps); return }
    if (document.getElementById('ymaps-script')) {
      window.ymaps.ready(() => resolve(window.ymaps))
      return
    }
    const s = document.createElement('script')
    s.id  = 'ymaps-script'
    s.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_API_KEY}&lang=uz_UZ`
    s.onload  = () => window.ymaps.ready(() => resolve(window.ymaps))
    s.onerror = reject
    document.head.appendChild(s)
  })
}

function initMap() {
  if (!mapEl.value) return

  /* Default center: Tashkent */
  myMap = new ymaps.Map(mapEl.value, {
    center: [41.2995, 69.2401],
    zoom: 13,
    controls: ['zoomControl'],
  }, {
    suppressMapOpenBlock: true,
  })

  placemark = new ymaps.Placemark([41.2995, 69.2401], {
    hintContent: 'Sudrab ko\'chiring',
  }, {
    preset: 'islands#greenDotIcon',
    draggable: true,
  })

  myMap.geoObjects.add(placemark)
  mapLoading.value = false

  /* On placemark drag end — reverse geocode */
  placemark.events.add('dragend', () => {
    const coords = placemark.geometry.getCoordinates()
    reverseGeocode(coords)
  })

  /* On map click — move placemark */
  myMap.events.add('click', (e) => {
    const coords = e.get('coords')
    placemark.geometry.setCoordinates(coords)
    reverseGeocode(coords)
  })
}

/* ── Reverse geocode ── */
async function reverseGeocode(coords) {
  if (!ymaps) return
  try {
    const res = await ymaps.geocode(coords, { results: 1 })
    const obj = res.geoObjects.get(0)
    if (obj) {
      selectedAddress.value = obj.getAddressLine()
      selectedCoords.value  = coords
    }
  } catch (e) {
    console.error('Geocode xatolik:', e)
  }
}

/* ── Search / suggestions ── */
function onInput() {
  clearTimeout(suggestTimer)
  if (query.value.length < 2) { suggestions.value = []; return }
  suggestTimer = setTimeout(fetchSuggestions, 350)
}

async function fetchSuggestions() {
  if (!ymaps || !query.value.trim()) return
  try {
    const res = await ymaps.suggest(query.value + ', Uzbekistan', { results: 5 })
    suggestions.value = res.map(r => ({ displayName: r.displayName, value: r.value, uri: r.value }))
  } catch {
    suggestions.value = []
  }
}

async function search() {
  if (!ymaps || !query.value.trim()) return
  suggestions.value = []
  try {
    const res = await ymaps.geocode(query.value + ', Uzbekistan', { results: 1 })
    const obj = res.geoObjects.get(0)
    if (obj) {
      const coords = obj.geometry.getCoordinates()
      myMap.setCenter(coords, 16, { duration: 500 })
      placemark.geometry.setCoordinates(coords)
      selectedAddress.value = obj.getAddressLine()
      selectedCoords.value  = coords
    }
  } catch (e) {
    console.error('Qidirishda xatolik:', e)
  }
}

async function selectSuggestion(s) {
  query.value = s.displayName
  suggestions.value = []
  await search()
}

/* ── Go to my GPS location ── */
function goToMe() {
  if (!navigator.geolocation) return
  locating.value = true
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const coords = [pos.coords.latitude, pos.coords.longitude]
      myMap.setCenter(coords, 17, { duration: 500 })
      placemark.geometry.setCoordinates(coords)
      reverseGeocode(coords)
      locating.value = false
    },
    () => { locating.value = false },
    { timeout: 8000, enableHighAccuracy: true }
  )
}

/* ── Confirm selection ── */
function confirm() {
  if (!selectedAddress.value) return
  emit('confirm', {
    address: selectedAddress.value,
    coords:  selectedCoords.value,
  })
  emit('close')
}

/* ── Cleanup ── */
onUnmounted(() => {
  if (myMap) { myMap.destroy(); myMap = null }
})
</script>

<style scoped>
/* ── Overlay ── */
.map-overlay {
  position: fixed; inset: 0; z-index: 600;
  background: rgba(0,0,0,.55);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
}

/* ── Modal ── */
.map-modal {
  width: 100%; max-width: 680px; max-height: 92vh;
  background: #fff; border-radius: 20px;
  display: flex; flex-direction: column;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0,0,0,.22);
}

/* ── Header ── */
.mm-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 20px 14px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.mm-title { display: flex; align-items: center; gap: 12px; }
.mm-pin-icon {
  width: 38px; height: 38px; border-radius: 11px;
  background: var(--green-50); border: 1px solid var(--green-200,#bbf7d0);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.mm-title h3 { font-size: 16px; font-weight: 700; margin-bottom: 2px; }
.mm-title p  { font-size: 12px; color: var(--text-3); }
.mm-close {
  width: 34px; height: 34px; border-radius: 10px;
  background: var(--slate-100); color: var(--text-2); flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  transition: background .18s, color .18s;
}
.mm-close:hover { background: #fee2e2; color: var(--red-500); }

/* ── Search ── */
.mm-search {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 16px; border-bottom: 1px solid var(--border);
  position: relative; flex-shrink: 0;
}
.search-ico { color: var(--text-3); flex-shrink: 0; }
.mm-search input {
  flex: 1; border: none; outline: none;
  font-size: 14px; font-family: inherit; color: var(--text);
  background: transparent;
}
.mm-search input::placeholder { color: var(--text-3); }
.search-clear {
  color: var(--text-3); transition: color .15s;
  display: flex; align-items: center;
}
.search-clear:hover { color: var(--text); }
.search-btn {
  padding: 8px 16px; border-radius: 9px;
  background: var(--green-500); color: #fff;
  font-size: 13px; font-weight: 600; flex-shrink: 0;
  transition: background .18s;
}
.search-btn:hover:not(:disabled) { background: var(--green-600); }
.search-btn:disabled { opacity: .45; cursor: not-allowed; }

/* Suggestions */
.suggestions {
  position: absolute; top: calc(100% + 4px); left: 16px; right: 16px;
  background: #fff; border: 1px solid var(--border);
  border-radius: 12px; overflow: hidden;
  box-shadow: var(--shadow-md); z-index: 10;
  list-style: none;
}
.suggest-item {
  display: flex; align-items: center; gap: 10px;
  padding: 11px 14px; cursor: pointer;
  font-size: 13px; color: var(--text);
  transition: background .15s;
  border-bottom: 1px solid var(--border);
}
.suggest-item:last-child { border-bottom: none; }
.suggest-item:hover { background: var(--green-50); }
.suggest-item span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* ── Map ── */
.mm-map-wrap {
  flex: 1; position: relative; min-height: 0;
}
.mm-map { width: 100%; height: 100%; min-height: 300px; }

/* GPS button on map */
.map-gps-btn {
  position: absolute; bottom: 16px; right: 16px; z-index: 2;
  width: 42px; height: 42px; border-radius: 12px;
  background: #fff; color: var(--text-2);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 12px rgba(0,0,0,.15);
  transition: background .18s, color .18s;
}
.map-gps-btn:hover { background: var(--green-50); color: var(--green-600); }
.map-gps-btn.loading { color: var(--green-500); }

/* Map loading */
.map-loading {
  position: absolute; inset: 0;
  background: #f8fafc;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 12px; z-index: 5;
}
.map-spinner {
  width: 36px; height: 36px; border-radius: 50%;
  border: 3px solid var(--green-100);
  border-top-color: var(--green-500);
  animation: spin .8s linear infinite;
}
.map-loading p { font-size: 13px; color: var(--text-3); }
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Footer ── */
.mm-foot {
  border-top: 1px solid var(--border);
  padding: 14px 16px; flex-shrink: 0;
  display: flex; flex-direction: column; gap: 12px;
}

.addr-preview {
  display: flex; align-items: center; gap: 10px;
  padding: 11px 14px; border-radius: 12px;
  background: var(--slate-50); border: 1.5px solid var(--border);
  transition: border-color .2s, background .2s;
}
.addr-preview.filled { border-color: var(--green-300,#86efac); background: var(--green-50); }
.ap-icon { flex-shrink: 0; }
.ap-text { display: flex; flex-direction: column; min-width: 0; }
.ap-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; color: var(--text-3); }
.ap-addr  { font-size: 13px; font-weight: 600; color: var(--text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.addr-preview:not(.filled) .ap-addr { color: var(--text-3); font-weight: 400; }

.mm-actions { display: flex; gap: 10px; }
.me-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 11px 16px; border-radius: 11px;
  background: var(--slate-100); color: var(--text-2);
  font-size: 13px; font-weight: 600;
  transition: background .18s; flex-shrink: 0;
}
.me-btn:hover:not(:disabled) { background: var(--slate-200); color: var(--text); }
.me-btn:disabled { opacity: .5; cursor: not-allowed; }
.ok-btn {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 7px;
  padding: 11px; border-radius: 11px;
  background: linear-gradient(135deg, var(--green-500), var(--green-600));
  color: #fff; font-size: 14px; font-weight: 700;
  transition: transform .2s var(--spring), box-shadow .2s, opacity .2s;
}
.ok-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: var(--shadow-green); }
.ok-btn:disabled { opacity: .4; cursor: not-allowed; }

/* ── Animations ── */
.spin { animation: spin .8s linear infinite; }

.map-fade-enter-active { transition: opacity .25s; }
.map-fade-leave-active { transition: opacity .2s; }
.map-fade-enter-from, .map-fade-leave-to { opacity: 0; }
.map-fade-enter-active .map-modal { animation: modalPop .3s var(--spring); }
@keyframes modalPop { from { transform: scale(.94) translateY(10px); opacity:0; } to { transform: scale(1) translateY(0); opacity:1; } }

.suggest-drop-enter-active { transition: opacity .15s, transform .15s; }
.suggest-drop-leave-active { transition: opacity .1s; }
.suggest-drop-enter-from   { opacity: 0; transform: translateY(-6px); }
.suggest-drop-leave-to     { opacity: 0; }

.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ── Responsive ── */
@media (max-width: 768px) {
  .map-overlay { padding: 0; align-items: flex-end; }
  .map-modal {
    max-width: 100%; max-height: 94vh;
    border-radius: 20px 20px 0 0;
  }
  .map-fade-enter-active .map-modal { animation: slideUp .32s var(--spring); }
  @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
  .mm-map { min-height: 240px; }
  .me-btn span { display: none; }
  .me-btn { padding: 11px 14px; }
}
@media (max-width: 430px) {
  .mm-head { padding: 14px 14px 12px; }
  .mm-search { padding: 10px 12px; }
  .mm-foot { padding: 12px; gap: 10px; }
  .ok-btn { font-size: 13px; }
}
</style>
