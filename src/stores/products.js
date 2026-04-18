import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { products as allProducts, categories } from '../data/products'

export const useProductStore = defineStore('products', () => {
  const searchQuery = ref('')
  const selectedCategory = ref(null)
  const sortBy = ref('default')
  const wishlist = ref([])

  const filteredProducts = computed(() => {
    let list = [...allProducts]
    if (selectedCategory.value) {
      list = list.filter(p => p.category === selectedCategory.value)
    }
    if (searchQuery.value) {
      list = list.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    }
    if (sortBy.value === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sortBy.value === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sortBy.value === 'rating') list.sort((a, b) => b.rating - a.rating)
    return list
  })

  function toggleWishlist(id) {
    if (wishlist.value.includes(id)) {
      wishlist.value = wishlist.value.filter(i => i !== id)
    } else {
      wishlist.value.push(id)
    }
  }

  function isWishlisted(id) {
    return wishlist.value.includes(id)
  }

  return { searchQuery, selectedCategory, sortBy, filteredProducts, categories, allProducts, wishlist, toggleWishlist, isWishlisted }
})
