<template>
  <div>
  
   <v-text-field
  v-model="searchQuery"
  label="Can search by number only"
  type="number"
  append-inner-icon="mdi-magnify"
  @keyup.enter="performSearch"
  clearable
  @click:clear="clearSearch"
  dense
  outlined
/>

    <v-list
      v-if="filteredData.length > 0"
      dense
      shaped
      class="mt-4"
    >
      <v-list-item
        v-for="(item, index) in filteredData"
        :key="index"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.date }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <p v-else class="mt-4">No results found.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Sample history data — replace or fetch from API/store
const historyData = ref([
  { title: 'Order #1234', date: '2025-08-01' },
  { title: 'Order #5678', date: '2025-08-05' },
  { title: 'Order #91011', date: '2025-08-07' },
])

const searchQuery = ref('')

// Computed filtered list based on search query (case-insensitive)
const filteredData = computed(() => {
  if (!searchQuery.value) return historyData.value
  return historyData.value.filter(item =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

function performSearch() {
  // Optionally do something on enter key
}

function clearSearch() {
  searchQuery.value = ''
}
</script>

<style scoped>
/* Optional styling */
</style>
