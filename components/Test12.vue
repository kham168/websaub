
<template>
  <div>
    hello world
    <p class="text-blue">Received value: {{ searchValue }}</p>
  </div>
</template>

<script setup>
defineProps({
  searchValue: {
    type: String,
    default: ''
  }
})
</script>



