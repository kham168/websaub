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
    </v-row>

    <!-- 🏠 DORMANTAL CARDS -->
    <v-row no-gutters>
      <v-col
        v-for="(item, index) in dormantalData"
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
                :src="fullImageUrl(img)"
                height="220"
                class="cursor-pointer"
                @click="openZoom(item, i)"
              />
            </v-window-item>
          </v-window>

          <!-- CONTENT -->
            <div class="px-4 py-3">
         <!-- CONTENT -->
<div class="px-4 py-3">
  <div class="text-lg font-bold text-gray-800">{{ item.dormantalname }}</div>
<div class="text-sm text-gray-600 mb-1">
  ລາຄາປະມານ 
  {{ formatPrice(item.price1) }} - 
  {{ formatPrice(item.price2) }} - 
  {{ formatPrice(item.price3) }} ₭/ເດືອນ
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
 
    <div>🎥 ວິດີໂອ: 
      <a :href="item.locationvideo" target="_blank" class="text-blue-600 underline">
        ກົດເບິ່ງ
      </a>
    </div>
      <div>📝 ປະເພດຫ້ອງແຖວ: {{ item.type }}</div>
        <div>📝 ຈຳນວນຫ້ອງ: {{ item.totalroom }}</div>
         <div>📝 ຫ້ອງວ່າງ: {{ item.activeroom }}</div>
    <div>📝 ລາຍລະອຽດ: {{ item.moredetail }}</div>
    <div>📍 ແຂວງ: {{ item.province }}</div>
     <div>📍 ເມືອງ: {{ item.district }}</div>
      <div>📍 ແຖວ: {{ item.villages[0], item.villages[1], item.villages[2] }}</div>
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

 
</div>  

          </div>
            <!-- Actions -->
         <v-card-actions class="px-4">
  <v-spacer />
  <v-btn
    variant="text"
    density="compact"
    color="primary"
    @click="openCommentDialog"
  >
    💬 ສອບຖາມ
  </v-btn>
</v-card-actions>

        </v-card>
      </v-col>
    </v-row>
 

    <!-- 🔍 Zoom dialog -->
    <v-dialog v-model="zoomDialog" max-width="900px">
      <v-card class="relative rounded-xl overflow-hidden">
        <v-window v-model="zoomSlide" reverse show-arrows>
          <v-window-item
            v-for="(img, i) in zoomItem.images"
            :key="`zoom-img-${i}`"
            :value="i"
          >
            <v-img aspect-ratio="16/9" cover :src="fullImageUrl(img)" height="400" />
          </v-window-item>
        </v-window>
      </v-card>
    </v-dialog>


  </div>
   <v-dialog v-model="commentDialog" max-width="500px">
      <v-card>
        <v-card-title>ພີມລາຍລະອຽດ</v-card-title>
        <v-card-text>
          <v-text-field v-model="telephone" label="ເບີໂທ" outlined />
          <v-textarea v-model="comment" label="ຂໍ້ຄິດເຫັນ" outlined />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="submitComment">ສົ່ງ</v-btn>
          <v-btn text @click="commentDialog = false">ຍົກເລີກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch } from '#app'

// States
const provinces = ref([])
const districts = ref([])
const villages = ref([])
const dormantalData = ref([])

// Selected values
const selectedProvince = ref(null)
const selectedDistrict = ref(null)
const selectedVillage = ref(null)

// Zoom dialog
const zoomDialog = ref(false)
const zoomItem = ref({})
const zoomSlide = ref(0)


async function query_data_without_any_id() {
  dormantalData.value = []

  // Fetch all dormantal data when no filters are selected
  const { data: dormRes } = await useFetch("http://localhost:5151/api/dormantal/selectall", {
    method: "GET"
  })

  dormantalData.value = (dormRes.value?.data || []).map(d => ({
    ...d,
    currentSlide: 0,
    showDetails: false
  }))
}



// Load provinces on mount
const { data: provinceRes } = await useFetch("http://localhost:5151/api/province/selectall")
provinces.value = provinceRes.value || []

// ✅ Load all dormantal data at first
await query_data_without_any_id()

async function onProvinceChange(provinceid) {
  selectedDistrict.value = null
  selectedVillage.value = null
  districts.value = []
  villages.value = []
  dormantalData.value = []

  // 🟢 If user clears the province (clicks 'x')
  if (!provinceid) {
    await query_data_without_any_id()
    return
  }

  // fetch districts normally
  const { data: districtRes } = await useFetch("http://localhost:5151/api/district/selectbyprovinceid", {
    method: "POST",
    body: { provinceid }
  })
  districts.value = districtRes.value?.data || []
}

async function onDistrictChange(districtid) {
  selectedVillage.value = null
  villages.value = []
  dormantalData.value = []

  // 🟢 If user clears the district (clicks 'x')
  if (!districtid) {
    await query_data_without_any_id()
    return
  }

  if (!selectedProvince.value) return

  // fetch villages
  const { data: villageRes } = await useFetch("http://localhost:5151/api/village/selectbydistrictid", {
    method: "POST",
    body: { districtid }
  })
  villages.value = villageRes.value || []

  // fetch dormantal by province+district
  const { data: dormRes } = await useFetch("http://localhost:5151/api/dormantal/selectbyprovinceidanddistrictid", {
    method: "POST",
    body: { province: selectedProvince.value, districtid }
  })
  dormantalData.value = (dormRes.value?.data || []).map(d => ({
    ...d,
    currentSlide: 0,
    showDetails: false
  }))
}




async function onVillageChange(villageid) {
  dormantalData.value = []
  if (!villageid || !selectedDistrict.value) return

  // fetch dormantal by district+village
  const { data: dormRes } = await useFetch("http://localhost:5151/api/dormantal/selectbydistrictidandvillageid", {
    method: "POST",
    body: { districtid: selectedDistrict.value, villageid }
  })
  dormantalData.value = (dormRes.value?.data || []).map(d => ({
  ...d,
  currentSlide: 0,
  showDetails: false, // 👈 add this line
}))

}

// Helpers
function fullImageUrl(img) {
  return `http://localhost:5151/${img}`
}

function openZoom(item, index) {
  zoomItem.value = item
  zoomSlide.value = index
  zoomDialog.value = true
}

// comment dialog state (add near other refs)
const commentDialog = ref(false)
const telephone = ref("")
const comment = ref("")

// open dialog
function openCommentDialog() {
  commentDialog.value = true
}

// submit (simple client-side behavior; you can POST to server if you want)
async function submitComment() {
  if (!telephone.value.trim() || !comment.value.trim()) {
    alert("⚠️ ກາລຸນາປ້ອມເບີໂທ ແລະ ຂໍ້ຄວາມກ່ອນ")
    return
  }

  // Example: send to backend (uncomment & adapt endpoint if you have it)
  // try {
  //   await axios.post(`${API_BASE}/api/comments`, {
  //     telephone: telephone.value,
  //     comment: comment.value,
  //     // optionally an item id: item.id
  //   })
  // } catch (err) {
  //   console.error("Failed to send comment:", err)
  // }

  alert(`✅ ສົ່ງສຳເລັດ\n📞 ${telephone.value}\n📝 ${comment.value}`)
  telephone.value = ""
  comment.value = ""
  commentDialog.value = false
}

 
function toggleDetails(item) {
  item.showDetails = !item.showDetails
} 

function formatPrice(value) {
  if (!value) return "0"
  return Number(value).toLocaleString()
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
