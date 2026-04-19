import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user   = ref(JSON.parse(localStorage.getItem('fm_user')   || 'null'))
  const orders = ref(JSON.parse(localStorage.getItem('fm_orders') || '[]'))

  const isLoggedIn = computed(() => !!user.value)

  function login(email, password) {
    const saved = JSON.parse(localStorage.getItem('fm_reg_' + email) || 'null')
    if (saved && saved.password === password) {
      user.value = { name: saved.name, email: saved.email, phone: saved.phone || '' }
      localStorage.setItem('fm_user', JSON.stringify(user.value))
      return { ok: true }
    }
    return { ok: false, error: "Email yoki parol noto'g'ri" }
  }

  function register(data) {
    if (localStorage.getItem('fm_reg_' + data.email)) {
      return { ok: false, error: 'Bu email allaqachon ro\'yxatdan o\'tgan' }
    }
    localStorage.setItem('fm_reg_' + data.email, JSON.stringify(data))
    user.value = { name: data.name, email: data.email, phone: data.phone || '' }
    localStorage.setItem('fm_user', JSON.stringify(user.value))
    return { ok: true }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('fm_user')
  }

  function updateUser(data) {
    user.value = { ...user.value, ...data }
    localStorage.setItem('fm_user', JSON.stringify(user.value))
    const reg = JSON.parse(localStorage.getItem('fm_reg_' + user.value.email) || 'null')
    if (reg) localStorage.setItem('fm_reg_' + user.value.email, JSON.stringify({ ...reg, ...data }))
  }

  function addOrder(order) {
    orders.value.unshift(order)
    localStorage.setItem('fm_orders', JSON.stringify(orders.value))
  }

  return { user, orders, isLoggedIn, login, register, logout, updateUser, addOrder }
})
