// stores/index.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDataStore = defineStore('dataStore', () => {
  const dataTs = ref('test234')
  return { dataTs }
})

export const useDataCart = defineStore('dataCart', () => {
  const dataCart = ref([])
  return { dataCart }
})