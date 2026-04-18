import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const isOpen = ref(false)

  const totalItems = computed(() => items.value.reduce((sum, i) => sum + i.qty, 0))
  const totalPrice = computed(() => items.value.reduce((sum, i) => sum + i.price * i.qty, 0))

  function addItem(product) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.qty++
    } else {
      items.value.push({ ...product, qty: 1 })
    }
  }

  function removeItem(id) {
    items.value = items.value.filter(i => i.id !== id)
  }

  function updateQty(id, qty) {
    if (qty <= 0) {
      removeItem(id)
      return
    }
    const item = items.value.find(i => i.id === id)
    if (item) item.qty = qty
  }

  function clearCart() {
    items.value = []
  }

  return { items, isOpen, totalItems, totalPrice, addItem, removeItem, updateQty, clearCart }
})
