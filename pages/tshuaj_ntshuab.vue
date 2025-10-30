<template>
  <div class="ml-1 mr-1">


  <div class="text-center py-4">
  <!-- 🎥 Video Banner Slider -->
  <div class="relative w-full mb-2 rounded-xl overflow-hidden shadow-lg">

    <v-window
      v-model="currentVideoSlide"
      class="rounded-xl"
      height="500"
      hide-arrows
    >
      <v-window-item
        v-for="(video, i) in videoBanners"
        :key="`video-${i}-${isMuted}`"
        class="relative flex justify-center items-center"
      >
        <!-- Video Iframe -->
        <iframe
          v-if="videoSrcs[i]"
          class="w-full h-full rounded-xl pointer-events-none"
          :src="videoSrcs[i]"
          frameborder="0"
          allow="autoplay; fullscreen"
        ></iframe>

        <!-- Sound Toggle Button in Front of Video -->
      <div
  class="absolute z-20"
  style="top: 40%; left: 10px; transform: translateY(-60%);"
>
  <v-btn
    icon
    small
    @click="isMuted = !isMuted"
    class="bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full"
  >
    <v-icon>{{ isMuted ? 'mdi-volume-off' : 'mdi-volume-high' }}</v-icon>
  </v-btn>
</div>

      </v-window-item>
    </v-window>

  </div>
</div>

    <!-- 🔎 Search -->
    <v-row class="mb-4" dense>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="searchQuery"
          label="ຄົ້ນຫາ..."
          variant="outlined"
          prepend-inner-icon="mdi-magnify"
          clearable
        />
      </v-col>
    </v-row>

    <!-- 💊 Product Grid --> 
    <v-row>
      <v-col
        v-for="item in filteredData"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="rounded-xl overflow-hidden hover:shadow-lg">
          <!-- Image Slider -->
          <v-window v-model="item.currentSlide" show-arrows>
            <v-window-item
              v-for="(img, i) in item.images"
              :key="`img-${item.id}-${i}`"
              :value="i"
            >
              <v-img
                :src="img"
                height="220"
                cover
                class="cursor-pointer"
                @click="openZoom(item, i)"
              />
            </v-window-item>
          </v-window>

          <!-- Text Info -->
          <v-card-title class="text-lg font-bold">
            {{ item.name }}
          </v-card-title>
          <v-card-subtitle>
            ມີລາຄາ:  {{ formatPrice(item.Price1) }}  ແລະ  {{ formatPrice(item.Price2) }} ກີບ
          </v-card-subtitle>
  
   <v-expand-transition>
  <div
    v-if="item.showDetails"
    class="px-4 pb-3 text-sm text-gray-600 border-t border-gray-200 mt-2 pt-2"
  >
  <div>
  📞 ເບີໂທ: 
  <a
    :href="`tel:${item.tel}`"
    class="text-blue-600 underline"
  >
    {{ item.tel }}
  </a>

<div>
  💬 WhatsApp: 
  <a
    :href="`https://wa.me/856${item.tel.replace(/[^0-9]/g, '')}`"
    target="_blank"
    class="text-green-600 hover:text-green-800 underline transition-colors"
  >
    {{ item.tel }}
  </a>
</div> 
</div>
  
    <div>📝 ລາຍລະອຽດ: {{ item.detail }}</div> 
  </div>
</v-expand-transition>
   
 <!-- 👇 Show more/less button -->
  <v-row class="mt-2" no-gutters>
  <v-col class="d-flex justify-end">
   <v-btn
  variant="text"
  density="compact"
  color="primary"
  @click="toggleDetails(item)"
>
  {{ item.showDetails ? "ຫຼຸດລົງ" : "ສະແດງເພີ່ມເຕີມ" }}
</v-btn>

  </v-col>
</v-row>

  


          <!-- Actions -->
          <v-card-actions>
            <v-btn color="primary" variant="text" @click="openCommentDialog">💬 ຄວາມຄິດເຫັນ</v-btn>
            <v-spacer />
          <v-btn color="primary" @click="addToCart(item)">
            🛒 ຊື້
          </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- 🔍 Zoom Dialog -->
  <!-- 🔍 Zoom Dialog -->
<v-dialog v-model="zoomDialog" max-width="800px">
  <v-card class="rounded-xl overflow-hidden">
    <v-window v-model="zoomSlide" show-arrows>
      <v-window-item
        v-for="(img, i) in zoomItem.images"
        :key="`zoom-${i}`"
        :value="i"
      >
        <v-img :src="img" height="450" cover />
      </v-window-item>
    </v-window>

    <v-card-actions>
      <v-btn color="primary" variant="text" @click="openCommentDialog">
        💬 ຄວາມຄິດເຫັນ
      </v-btn>
      <v-spacer />
      <v-btn color="primary" size="large" class="text-lg font-bold py-3 px-6" @click="addToCart(zoomItem)">
        🛒 ຊື້
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>


    <!-- 💬 Comment Dialog -->
    <v-dialog v-model="commentDialog" max-width="500px">
      <v-card>
        <v-card-title>ຄວາມຄິດເຫັນ</v-card-title>
        <v-card-text>
          <v-text-field v-model="telephone" label="ເບີໂທ" outlined />
          <v-textarea v-model="comment" label="ຂໍ້ຄິດເຫັນ" outlined />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="submitComment">ສົ່ງ</v-btn>
          <v-btn color="primary" variant="text" @click="commentDialog = false">ຍົກເລີກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"

const searchQuery = ref("")

// Comment dialog
const commentDialog = ref(false)
const telephone = ref("")
const comment = ref("")

function openCommentDialog() {
  commentDialog.value = true
}

function submitComment() {
  console.log("📞", telephone.value, "📝", comment.value)
  commentDialog.value = false
}

// Data
const data = ref([])

// Base URL for images (must match your Express static serve)
const imageBaseUrl = "http://localhost:5151/"

// Fetch from API
onMounted(async () => {
  try {
    const res = await fetch("http://localhost:5151/api/tshuaj/selectall")
    const json = await res.json()
    if (json.status && Array.isArray(json.data)) {
      data.value = json.data.map((c) => ({
        ...c,
        images: Array.isArray(c.images)
          ? c.images.map((img) => imageBaseUrl + img)
          : [],
        currentSlide: 0,
          showDetails: true
      }))
    }
  } catch (err) {
    console.error("❌ Fetch error:", err)
  }
})

// Search filter
const filteredData = computed(() => {
  if (!searchQuery.value) return data.value
  return data.value.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      String(item.id).includes(searchQuery.value)
  )
})

// Zoom dialog
const zoomDialog = ref(false)
const zoomItem = ref({})
const zoomSlide = ref(0)

function openZoom(item, index) {
  zoomItem.value = item
  zoomSlide.value = index
  zoomDialog.value = true
}

// Cart
function addToCart(item) {
  console.log("🛒 Added to cart:", item)
}
 
function toggleDetails(item) {
  item.showDetails = !item.showDetails
}
 
 function formatPrice(value) {
  if (!value) return '0';
  return Number(value).toLocaleString('en-US');
}

const videoBanners = ref([
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://www.youtube.com/embed/VIDEO_ID_2',
  'https://www.youtube.com/embed/VIDEO_ID_3'
])

const currentVideoSlide = ref(0)
const isMuted = ref(true)

// Helper to extract YouTube ID from URL
function extractYoutubeID(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=))([\w-]+)/)
  return match ? match[1] : ''
}

// Pre-compute iframe srcs for template safety
const videoSrcs = computed(() => {
  return videoBanners.value.map((video) => {
    const id = extractYoutubeID(video)
    if (!id) return ''
    return `https://www.youtube.com/embed/${id}?autoplay=1&loop=1&playlist=${id}&mute=${isMuted.value ? 1 : 0}`
  })
})

</script>
 