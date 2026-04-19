import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const isOpen = ref(false)

  const totalItems = computed(() => items.value.reduce((sum, i) => sum + i.qty, 0))
  const totalPrice = computed(() => items.value.reduce((sum, i) => sum + i.price * i.qty, 0))

  function addItem(product) {
    const existing = items.value.find(i => i.id === product.id)
    const step = product.step || 1
    const minQty = product.minQty || 1
    if (existing) {
      existing.qty = Math.round((existing.qty + step) * 100) / 100
    } else {
      items.value.push({ ...product, qty: minQty })
    }
  }

  function removeItem(id) {
    items.value = items.value.filter(i => i.id !== id)
  }

  function updateQty(id, qty) {
    const item = items.value.find(i => i.id === id)
    if (!item) return
    const minQty = item.minQty || 1
    const rounded = Math.round(qty * 100) / 100
    if (rounded < minQty) {
      removeItem(id)
      return
    }
    item.qty = rounded
  }

  function clearCart() {
    items.value = []
  }

  return { items, isOpen, totalItems, totalPrice, addItem, removeItem, updateQty, clearCart }
})
