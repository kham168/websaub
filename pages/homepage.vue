<template>
  <div class="ml-0 mr-0">
    <v-card
      v-for="(item, index) in data"
      :key="index"
      class="ma-3 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
      elevation="2"
      style="position: relative;"
    >
      <!-- Slides (images only) -->
      <v-window v-model="item.slide" show-arrows>
        <v-window-item
          v-for="(img, i) in item.images"
          :key="`slide-${item.id}-${i}`"
        >
          <v-img
            aspect-ratio="16/9"
            cover
            :src="img"
            height="300"
          />
        </v-window-item>
      </v-window>

      <!-- ✅ Overlay stays fixed (not sliding) -->
      <div
        class="scroll-content px-3 py-3"
        style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(255, 255, 255, 0.85); border-top-left-radius: 12px; border-top-right-radius: 12px; padding-bottom: 50px;"
      >
       <div class="text-lg font-bold text-gray-800 mb-1">{{ item.id }}</div>
        <div class="text-sm text-gray-600 mb-2">{{ item.channel }}</div>

        <!-- ✅ Only "Read me" navigates -->
        <NuxtLink :to="`/${item.path}`">
          <v-btn
            variant="outlined"
            color="green"
            class="rounded-full border-2 font-semibold px-6 py-3 transition-all duration-300 hover:bg-green-600 hover:text-white"
            style="position: absolute; bottom: 20px; right: 20px; z-index: 20;"
          >
            <v-icon left class="mr-2">mdi-book-open-page-variant</v-icon>
            Read me
          </v-btn>
        </NuxtLink>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const data = ref([])

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:5151/api/channel/selectall")
    if (res.data.status) {
      data.value = res.data.data.map(c => ({
        ...c,
        images: Array.isArray(c.image_urls) ? c.image_urls : [], // ✅ map API images
        slide: 0 // ✅ needed for v-window
      }))
    }
  } catch (err) {
    console.error("Error fetching data:", err)
  }
})

</script>
