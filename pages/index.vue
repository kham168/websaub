<template>
  <div>
    <!-- Basket Button (Fixed at Top Right) -->
    <v-btn
      icon
      style="position: fixed; top: 20px; right: 20px; z-index: 999;"
      color="primary"
      @click="goToBasket"
    >
      <v-icon>mdi-cart</v-icon> <!-- You can change mdi-cart to mdi-trash-can if needed -->
    </v-btn>

    <!-- Your other content goes here -->
    <p style="margin-top: 100px;">Main page content...</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Only define this once
const goToBasket = () => {
  // This will navigate to /basket page (make sure the route exists)
  router.push('/basket')
}
</script>
