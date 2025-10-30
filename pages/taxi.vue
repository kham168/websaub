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

    <!-- 🔍 Province & District Selection -->
    <v-row class="mb-2">
      <v-col cols="12" sm="4" md="3">
        <v-select
          v-model="selectedProvince"
          :items="provinces"
          label="Select Province"
          item-title="name"
          item-value="code"
          clearable
          variant="outlined"
        />
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <v-select
          v-model="selectedDistrict"
          :items="districtsForSelectedProvince"
          label="Select District"
          item-title="name"
          item-value="code"
          clearable
          variant="outlined"
          :disabled="!selectedProvince"
        />
      </v-col>


  <v-col cols="12" sm="4" md="3" class="d-flex justify-end">
  <v-btn 
    color="primary" 
    variant="tonal" 
    @click="queryByLocation" 
    :disabled="!selectedProvince || !selectedDistrict"
  >
    Search by Location
  </v-btn>
</v-col>





      <v-col cols="12" md="3">
        <v-text-field
          v-model="searchQuery"
          label="Search taxis..."
          variant="outlined"
          clearable
          prepend-inner-icon="mdi-magnify"
          class="rounded-xl"
        />
      </v-col>
      <v-col cols="12" class="d-flex justify-end align-center">
        <v-btn color="primary" variant="outlined" @click="openCommentDialog">
          ສອບຖາມ...
        </v-btn>
      </v-col>
    </v-row>

    <!-- CARD LIST -->
    <div>
      <template v-if="filteredData.length === 0">
        <div class="text-center py-8 text-gray-500 text-lg">
          ບໍ່ມີຂໍ້ມູນລົດຕາມທີ່ທ່ານຄົ້ນຫາ
        </div>
      </template>
      <v-row v-else no-gutters>
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
            <!-- IMAGE SLIDER -->
            <v-window v-model="item.currentSlide" reverse show-arrows>
              <v-window-item
                v-for="(img, i) in item.images"
                :key="`img-${index}-${i}`"
                :value="i"
              >
                <v-img
                  aspect-ratio="16/9"
                  cover
                  :src="imageBaseUrl + img"
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

           <div class="text-sm text-gray-700 d-flex align-center mb-1">
  <v-icon size="small" color="primary" class="mr-1">mdi-cash</v-icon>
   ລາຄາເລີ້ນຕົ້ນ: {{ Number(item.Price1).toLocaleString() }} ₭  
</div>

<div class="text-sm text-gray-700 d-flex align-center mb-1">
  <v-icon size="small" color="primary" class="mr-1">mdi-cash-multiple</v-icon>
  ແລະ ສາມາດລົມໄດ້ ໂດຍອິງໃສ່ໄລຍະທາງ ຫລື ເວລາ
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


 <div v-if="item.showDetails">
 <div class="text-sm text-gray-600 mb-2">
               ລາຍລະອຽດ: {{ item.detail }}
              </div>
              </div>

 <!-- Toggle button -->
   <div class="mt-2 d-flex justify-end">
  <v-btn
    variant="text"
    density="compact"
    color="primary"
    @click="item.showDetails = !item.showDetails"
  >
    {{ item.showDetails ? "ຫຼຸດລົງ" : "ສະແດງເພີ່ມເຕີມ" }}
  </v-btn>
</div>

   
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- 📝 Comment Dialog -->
    <v-dialog v-model="commentDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h6">ສອບຖາມ</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="telephone"
            label="ກາລຸນາປ້ອມເບີໂທເພື່ອຕິດຕໍ່ກັບ.."
            type="tel"
            variant="outlined"
            clearable
            :error="telephoneError"
            :error-messages="telephoneError ? ['ກາລຸນາປ້ອມເບີໂທ'] : []"
            class="mb-4"
          ></v-text-field>

          <v-textarea
            v-model="comment"
            label="ພິມລາຍລະອຽດຢູ່ນີ້ໄດ້..."
            variant="outlined"
            rows="4"
            auto-grow
            clearable
            :error="commentError"
            :error-messages="commentError ? ['ກາລຸນາປ້ອມຂໍ້ຄວາມ'] : []"
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
            <v-img aspect-ratio="16/9" cover :src="imageBaseUrl + img" height="400" />
          </v-window-item>
        </v-window>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
// Province & District API data
const provinces = ref([])
const districtsForSelectedProvince = ref([])
const selectedProvince = ref(null)
const selectedDistrict = ref(null)

// Fetch provinces on mount
onMounted(async () => {
  try {
    // 1) Fetch provinces first
    const resProvince = await axios.get("http://localhost:5151/api/province/selectall")
    if (Array.isArray(resProvince.data)) {
      provinces.value = resProvince.data.map(p => ({ code: p.provinceid, name: p.province }))
    }

    // 2) Fetch ALL taxis if no filters/search are selected
    if (!selectedProvince.value && !selectedDistrict.value && !searchQuery.value) {
      const resTaxi = await axios.get("http://localhost:5151/api/taxi/selectall")
      if (resTaxi.data.status && Array.isArray(resTaxi.data.data)) {
        const taxis = resTaxi.data.data.map((item) => ({
          ...item,
          currentSlide: 0,
        }))
        data.value = taxis
        filteredData.value = taxis
      }
    }
  } catch (err) {
    console.error("❌ Failed to fetch initial data:", err)
  }
})


// Watch province selection to fetch districts
watch(selectedProvince, async (provinceId) => {
  selectedDistrict.value = null
  districtsForSelectedProvince.value = []
  if (!provinceId) return
  try {
    const res = await axios.post("http://localhost:5151/api/district/selectbyprovinceid", { provinceid: provinceId })
    if (res.data.status && Array.isArray(res.data.data)) {
      districtsForSelectedProvince.value = res.data.data.map(d => ({ code: d.districtid, name: d.district }))
    }
  } catch (err) {
    console.error("❌ Failed to fetch districts:", err)
  }
})

// Query taxis by province and district
async function queryByLocation() {
 
  if (!selectedProvince.value || !selectedDistrict.value) return
  try {
    const res = await axios.post("http://localhost:5151/api/taxi/selectbyprovinceanddistrictid", {
      provinceid: selectedProvince.value,
      districtid: selectedDistrict.value
    })
    if (res.data.status && Array.isArray(res.data.data)) {
      const taxis = res.data.data.map((item) => ({
        ...item,
        currentSlide: 0,
      }))
      data.value = taxis
      filteredData.value = taxis // ✅ update displayed data
    }
  } catch (err) {
    console.error("❌ Failed to fetch taxis by location:", err)
  }
}

import { useDisplay } from "vuetify"
import axios from "axios"

// API base config
const apiUrl = "http://localhost:5151/api/taxi/selectall"
const imageBaseUrl = "http://localhost:5151/" // 👈 adjust if different

// Search
const searchQuery = ref("")

// Comment dialog
const commentDialog = ref(false)
const telephone = ref("")
const comment = ref("")
const telephoneError = ref(false)
const commentError = ref(false)

// Data
const data = ref([])

onMounted(async () => {
  try {
    const res = await axios.get(apiUrl)
    if (res.data.status && Array.isArray(res.data.data)) {
      // Add currentSlide for v-window control
      data.value = res.data.data.map((item) => ({
        ...item,
        currentSlide: 0,
      }))
    }
  } catch (err) {
    console.error("❌ Failed to fetch taxis:", err)
  }
})


// Search taxis by name using API
const filteredData = ref([])

watch(searchQuery, async (val) => {
  if (!val) {
    filteredData.value = data.value
    return
  }
  try {
    const res = await axios.post("http://localhost:5151/api/taxi/searchbyname", { name: val })
    if (res.data.status && Array.isArray(res.data.data)) {
      filteredData.value = res.data.data.map((item) => ({
        ...item,
        currentSlide: 0,
      }))
    } else {
      filteredData.value = []
    }
  } catch (err) {
    console.error("❌ Failed to search taxis:", err)
    filteredData.value = []
  }
})

// Initialize filteredData with all taxis
onMounted(() => {
  filteredData.value = data.value
})

// Comment handlers
function openCommentDialog() {
  commentDialog.value = true
}
function submitComment() {
  telephoneError.value = !telephone.value.trim()
  commentError.value = !comment.value.trim()
  if (telephoneError.value || commentError.value) return

  console.log("📞 Phone:", telephone.value)
  console.log("📝 Comment:", comment.value)
  telephone.value = ""
  comment.value = ""
  commentDialog.value = false
}

// Zoom dialog
const zoomDialog = ref(false)
const zoomItem = ref({})
const zoomSlide = ref(0)
function openZoom(item, index) {
  zoomItem.value = item
  zoomSlide.value = index
  zoomDialog.value = true
}

// Cart action
 

// Responsive helpers
const { xs, sm, md } = useDisplay()
const cardWidth = computed(() =>
  xs.value ? 280 : sm.value ? 360 : md.value ? 480 : 600
)
const cardHeight = computed(() => (xs.value ? "90vh" : "85vh"))
const imageHeight = computed(() => (xs.value ? 220 : sm.value ? 300 : 400))
 

 function addToCart(item) {
  if (!item.tel) {
    alert("❌ Taxi has no phone number.")
    return
  }

  const phone = item.tel.replace(/\D/g, "")
  const message = encodeURIComponent("ສະບາຍດີ! ຂ້ອຍຕ້ອງການຈອງລົດ.., ແລ້ວທ່ານວ່າງບໍ່")
  const url = `https://wa.me/856${phone}?text=${message}`

  try {
    window.open(url, "_blank")
  } catch (err) {
    alert("⚠️ Cannot open WhatsApp. Please check your browser or app.")
  }
}

const videoBanners = ref([
  'https://youtu.be/KTd1yYVoMpE?si=GPO0xlvZHjYZyecB',
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
