<template>
  <div class="ml-0 mr-0">


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

    <!-- 🔍 SEARCH BAR -->
    <v-row class="mb-2">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-text-field
          v-model="searchQuery"
          label="Search items..."
          variant="outlined"
          clearable
          prepend-inner-icon="mdi-magnify"
          class="rounded-xl"
        />
      </v-col>

      <!-- ✅ Button aligned right -->
      <v-col cols="12" sm="4" md="6" lg="8" class="d-flex justify-end align-center">
        <v-btn color="primary" variant="outlined" @click="openCommentDialog">
          ສອບຖາມ...
        </v-btn>
      </v-col>
    </v-row>

    <!-- CARD LIST -->
    <v-row no-gutters>
      <v-col
        v-for="(item, index) in filteredData"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          class="ma-3 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
          elevation="2"
        >
          <!-- IMAGE SLIDER (click to zoom) -->
          <v-window v-model="item.currentSlide" reverse show-arrows>
            <v-window-item
              v-for="(img, i) in item.images"
              :key="`img-${index}-${i}`"
              :value="i"
            >
              <v-img
                aspect-ratio="16/9"
                cover
                :src="img"
                height="220"
                class="cursor-pointer"
                @click="openZoom(item, i)"
              />
            </v-window-item>
          </v-window>

          <!-- CONTENT -->
          <div class="px-4 py-3">
            <div class="text-lg font-bold text-gray-800">
              {{ item.name }}
            </div>
          <div class="text-sm text-gray-600 mb-3">
  ລາຄາ1: {{ Number(item.Price1).toLocaleString() }} ₭  
  ລາຄາ2: {{ Number(item.Price2).toLocaleString() }} ₭
</div>

             <div class="text-sm text-gray-600 mb-3">
  ໂທ: 
  <a
    :href="`tel:${item.tel}`"
    class="text-blue-600 underline hover:text-blue-800 transition-colors"
  >
    {{ item.tel }}
  </a>
</div>
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

              <div class="text-sm text-gray-600 mb-3">
              ລາຍລະອຽດ: {{ item.detail }}
            </div>
 
            <!-- BUTTON -->
            <v-card-actions class="px-0 pt-0 gap-2 justify-end">
              <v-btn
                variant="outlined"
                color="yellow-darken-3"
                class="rounded-full border-2 font-semibold text-none px-6 py-2 
                       transition-all duration-300 hover:bg-yellow-500 hover:text-white"
                @click="addToCart(item)"
              >
                <v-icon left class="mr-2">mdi-cart</v-icon>
                Buy
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- 📝 Comment Dialog -->
    <v-dialog v-model="commentDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h6">ສອບຖາມ</v-card-title>
        <v-card-text>
          <!-- Telephone field -->
          <v-text-field
            v-model="telephone"
            label="ກາລຸນາປ້ອມເບີໂທເພື່ອຕິດຕໍ່ກັບ.."
            type="tel"
            variant="outlined"
            clearable
            class="mb-4"
          ></v-text-field>

          <!-- Comment field -->
          <v-textarea
            v-model="comment"
            label="ພິມລາຍລະອຽດຢູ່ນີ້ໄດ້..."
            variant="outlined"
            rows="4"
            auto-grow
            clearable
          ></v-textarea>
        </v-card-text>
        <v-card-actions class="d-flex justify-end ga-2">
          <v-btn variant="tonal" @click="commentDialog = false">ຍົກເລິກ</v-btn>
          <v-btn color="primary" @click="submitComment">ສົ່ງ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- ZOOM DIALOG -->
    <v-dialog v-model="zoomDialog" max-width="900px">
      <v-card class="relative rounded-xl overflow-hidden">
        <v-window v-model="zoomSlide" reverse show-arrows>
          <v-window-item
            v-for="(img, i) in zoomItem.images"
            :key="`zoom-img-${i}`"
            :value="i"
          >
            <v-img aspect-ratio="16/9" cover :src="img" height="400" />
          </v-window-item>
        </v-window>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useDisplay } from "vuetify"

// 🔍 Search
const searchQuery = ref("")

// Comment dialog
const commentDialog = ref(false)
const telephone = ref("")
const comment = ref("")

function openCommentDialog() {
  commentDialog.value = true
}

function submitComment() {
  console.log("📞 Phone:", telephone.value)
  console.log("📝 Comment:", comment.value)
  commentDialog.value = false
}

// API data
const data = ref([])

// base URL where backend serves images
const imageBaseUrl = "http://localhost:5151/"

// Fetch data on page load
onMounted(async () => {
  try {
    const res = await fetch("http://localhost:5151/api/khoomkho_tsheb/selectall")
    const json = await res.json()
    if (json.status && Array.isArray(json.data)) {
      data.value = json.data.map((c) => ({
        ...c,
        images: Array.isArray(c.images)
          ? c.images.map((img) => imageBaseUrl + img)
          : [],
        currentSlide: 0,
      }))
    }
  } catch (err) {
    console.error("❌ Fetch error:", err)
  }
})

// 🔎 Filtered list
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

// Buy method
function addToCart(item) {
  console.log("🛒 Added to cart:", item)
}

// Responsive computations
const { xs, sm, md } = useDisplay()
const cardWidth = computed(() =>
  xs.value ? 280 : sm.value ? 360 : md.value ? 480 : 600
)
const cardHeight = computed(() => (xs.value ? "90vh" : "85vh"))
const imageHeight = computed(() => (xs.value ? 220 : sm.value ? 300 : 400))

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
