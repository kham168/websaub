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

    <!-- 🔍 SEARCH / FILTER SECTION -->
    <v-row class="mb-4" dense>
      <!-- Province -->
      <v-col cols="12" sm="6" md="4">
        <v-select
          v-model="selectedProvince"
          :items="provinces"
          item-title="province"
          item-value="provinceid"
          label="ເລືອກແຂວງ..."
          variant="outlined"
          density="compact"
          clearable
          class="match-primary"
          @update:model-value="onProvinceChange"
        />
      </v-col>

      <!-- District -->
      <v-col cols="12" sm="6" md="4">
        <v-select
          v-model="selectedDistrict"
          :items="districts"
          item-title="district"
          item-value="districtid"
          label="ເລືອກເມືອງ..."
          variant="outlined"
          density="compact"
          clearable
          class="match-primary"
          :disabled="!selectedProvince"
          @update:model-value="onDistrictChange"
        />
      </v-col>

      <!-- Village -->
      <v-col cols="12" sm="6" md="4">
        <v-select
          v-model="selectedVillage"
          :items="villages"
          item-title="village"
          item-value="villageid"
          label="ເລືອກບ້ານ..."
          variant="outlined"
          density="compact"
          clearable
          :disabled="!selectedDistrict"
          class="match-primary"
          @update:model-value="onVillageChange"
        />
      </v-col>

      <!-- ✅ Button aligned right -->
      <v-col cols="12" sm="6" md="4" class="d-flex justify-end align-center">
        <v-btn color="primary" variant="outlined" @click="openCommentDialog">
          ສອບຖາມ...
        </v-btn>
      </v-col>
    </v-row>

    <!-- 🏡 LAND CARDS -->
    <v-row no-gutters>

<v-col
  v-for="(item, index) in lands"
  :key="item.id ?? item.productid ?? index"
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
            >
              <v-img
                aspect-ratio="16/9"
                cover
                :src="getImageUrl(img)"
                height="220"
                class="cursor-pointer"
                @click="openZoom(item, i)"
              />
            </v-window-item>
          </v-window>

      <div class="px-4 py-3">
  <div class="text-lg font-bold text-gray-800">{{ item.productname }}</div>
 <div class="text-sm text-gray-600 mb-1">
  💰 {{ formatPrice(item.price) }} ₭
</div>

  <div class="text-sm text-gray-500">
    {{ item.district }} - {{ item.area}}
  </div>
    </div>
   
   <v-expand-transition>
  <div
    v-if="item.showDetails"
    class="px-4 pb-3 text-sm text-gray-600 border-t border-gray-200 mt-2 pt-2"
  >
  <div>
  📞 ເບີໂທ: 
  <a
    :href="`tel:${item.contactnumber}`"
    class="text-blue-600 underline"
  >
    {{ item.contactnumber }}
  </a>

<div>
  💬 WhatsApp: 
  <a
    v-if="item.tel"
    :href="`https://wa.me/856${item.tel.replace(/[^0-9]/g, '')}`"
    target="_blank"
    class="text-green-600 hover:text-green-800 underline transition-colors"
  >
    {{ item.tel }}
  </a>
  <span v-else class="text-gray-500">ບໍ່ມີເບີ WhatsApp</span>
</div>
 

</div> 
    <div>🎥 ວິດີໂອ: 
      <a :href="item.locationvideo" target="_blank" class="text-blue-600 underline">
        ກົດເບິ່ງ
      </a>
    </div>
     <div>🎥 GPS: 
      <a :href="item.locationurl" target="_blank" class="text-blue-600 underline">
        ກົດເບິ່ງ
      </a>
    </div>
    <div>📝 ລາຍລະອຽດ: {{ item.moredetail }}</div>
    <div>📍 ແຂວງ: {{ item.province }}</div>
    <div>📍 ເມືອງ: {{ item.district }}</div>
    <div>📍 ເຂດ: {{ item.area }}</div>
    <div>📍 ແຖວບ້ານ: {{ item.villages[0], item.villages[1], item.villages[2] }}</div>
  </div>
</v-expand-transition>
 
 <!-- 👇 Show more/less button -->
  <v-row class="mt-2" no-gutters>
  <v-col class="d-flex justify-end"
  >
   <v-btn
  variant="text"
  density="compact"
  color="primary"
  @click="toggleDetails(index)"

>
  {{ item.showDetails ? "ຫຼຸດລົງ" : "ສະແດງເພີ່ມເຕີມ" }}
</v-btn>

  </v-col>
</v-row>
 
        </v-card>
      </v-col>
    </v-row>

    <!-- ZOOM DIALOG -->
    <v-dialog v-model="zoomDialog" max-width="900px">
      <v-card class="relative rounded-xl overflow-hidden">
        <v-window v-model="zoomSlide" reverse show-arrows>
          <v-window-item
            v-for="(img, i) in zoomItem.images"
            :key="`zoom-img-${i}`"
          >
            <v-img aspect-ratio="16/9" cover :src="getImageUrl(img)" height="400" />
          </v-window-item>
        </v-window>
      </v-card>
    </v-dialog>

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
            class="mb-4"
          />
          <v-textarea
            v-model="comment"
            label="ພິມລາຍລະອຽດຢູ່ນີ້ໄດ້..."
            variant="outlined"
            rows="4"
            auto-grow
            clearable
          />
        </v-card-text>
        <v-card-actions class="d-flex justify-end ga-2">
          <v-btn variant="tonal" @click="commentDialog = false">ຍົກເລິກ</v-btn>
          <v-btn color="primary" @click="submitComment">ສົ່ງ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

// API base
const API_BASE = "http://localhost:5151"
const IMAGE_BASE = "http://localhost:5151/"

// 🔹 State
const provinces = ref([])
const districts = ref([])
const villages = ref([])
const lands = ref([])

const selectedProvince = ref(null)
const selectedDistrict = ref(null)
const selectedVillage = ref(null)


// query all lands without any filter
async function query_data_without_any_id() {
  lands.value = []
  try {
    const res = await axios.get(`${API_BASE}/api/land/selectall`)
    lands.value = (res.data.data || []).map((item) => ({
      ...item,
      currentSlide: 0,
      showDetails: false // ensure default exists
    }))
  } catch (err) {
    console.error("❌ Failed to load lands:", err)
  }
}

 

// 🏁 Load Provinces on mount
onMounted(async () => {
  try {
    const res = await axios.get(`${API_BASE}/api/province/selectall`)
    provinces.value = res.data
  } catch (err) {
    console.error("❌ Failed to load provinces:", err)
  }

  // 🟢 Load all lands initially
  await query_data_without_any_id()
})


// Province → District
async function onProvinceChange(provinceId) {
  selectedDistrict.value = null
  selectedVillage.value = null
  districts.value = []
  villages.value = []
  lands.value = []

  // 🟢 If province cleared, reload all lands
  if (!provinceId) {
    await query_data_without_any_id()
    return
  }

  try {
    const res = await axios.post(`${API_BASE}/api/district/selectbyprovinceid`, {
      provinceid: provinceId,
    })
    districts.value = res.data.data || []
  } catch (err) {
    console.error("❌ Failed to load districts:", err)
  }
}


// District → Village
async function onDistrictChange(districtId) {
  selectedVillage.value = null
  villages.value = []
  lands.value = []

  // 🟢 If district cleared, reload all lands
  if (!districtId) {
    await query_data_without_any_id()
    return
  }

  try {
    const res = await axios.post(`${API_BASE}/api/village/selectbydistrictid`, {
      districtid: districtId,
    })
    villages.value = res.data || []
  } catch (err) {
    console.error("❌ Failed to load villages:", err)
  }
}


// Village → Lands
async function onVillageChange(villageId) {
  lands.value = []

  if (!villageId) {
    await query_data_without_any_id()
    return
  }

  try {
    const res = await axios.post(`${API_BASE}/api/land/selectbydistrictidandvillageid`, {
      districtid: selectedDistrict.value,
      villageid: villageId,
    })
    lands.value = (res.data.data || []).map((item) => ({
      ...item,
      currentSlide: 0,
      showDetails: false // ensure default exists
    }))
  } catch (err) {
    console.error("❌ Failed to load lands:", err)
  }
}
 

// 🖼️ Image helper
function getImageUrl(img) {
  return IMAGE_BASE + img
}

// 🔍 Zoom dialog
const zoomDialog = ref(false)
const zoomItem = ref({})
const zoomSlide = ref(0)
function openZoom(item, index) {
  zoomItem.value = item
  zoomSlide.value = index
  zoomDialog.value = true
}

// 📝 Comment dialog
const commentDialog = ref(false)
const telephone = ref("")
const comment = ref("")
function openCommentDialog() {
  commentDialog.value = true
}
function submitComment() {
  if (!telephone.value.trim() || !comment.value.trim()) {
    alert("⚠️ ກາລຸນາປ້ອມເບີໂທ ແລະ ຂໍ້ຄວາມກ່ອນ")
    return
  }
  alert(`✅ ສົ່ງຂໍ້ຄວາມສຳເລັດ!\n📞 ${telephone.value}\n📝 ${comment.value}`)
  telephone.value = ""
  comment.value = ""
  commentDialog.value = false
}
 

function toggleDetails(index) {
  // defensive checks
  if (index == null || !Array.isArray(lands.value) || !lands.value[index]) return

  // Toggle using the reactive array element
  lands.value[index].showDetails = !lands.value[index].showDetails
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
