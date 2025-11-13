<template>
    <LayoutAdmin />
  </template>
  
  <script setup>
  // Page meta for SEO and settings
  definePageMeta({
    title: 'Admin Dashboard',
    layout: false
  })
  
  // Head settings
  useHead({
    title: 'Admin Dashboard',
    meta: [
      { name: 'description', content: 'Admin dashboard for managing users, products, and orders' }
    ]
  })
  </script>