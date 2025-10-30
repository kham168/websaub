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

    <!-- SEARCH / FILTER SECTION -->
    <v-row class="mb-4" dense>

      <!-- Province -->
<v-col cols="12" sm="4" md="3">
  <v-select
    v-model="selectedProvince"
    :items="provinces"
    item-title="name"
    item-value="code"
    label="ເລືອກແຂວງ..."
    variant="outlined"
    density="compact"
    clearable
    class="match-primary"
  />
</v-col>

<!-- District -->
<v-col cols="12" sm="4" md="3">
  <v-select
    v-model="selectedDistrict"
    :items="districts"
    item-title="name"
    item-value="code"
    label="ເລືອກເມືອງ..."
    variant="outlined"
    density="compact"
    clearable
    :disabled="!selectedProvince"
    class="match-primary"
  />
</v-col>

<!-- Village -->
<v-col cols="12" sm="4" md="3">
  <v-select
    v-model="selectedVillage"
    :items="villages"
    item-title="name"
    item-value="code"
    label="ເລືອກບ້ານ..."
    variant="outlined"
    density="compact"
    clearable
    :disabled="!selectedDistrict"
    class="match-primary"
  />
</v-col>
      <!-- ✅ Button aligned right -->
      <v-col cols="12" md="3" class="d-flex justify-end align-center">
        <v-btn color="primary" variant="outlined" @click="openCommentDialog">
          ສອບຖາມ...
        </v-btn>
      </v-col>
    </v-row>

    <!-- GUEST HOUSE CARDS -->
    <v-row no-gutters>
      <v-col
        v-for="(item, index) in filteredData"
        :key="item.id"
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
              :key="`img-${item.id}-${i}`"
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
            <div class="text-lg font-bold text-gray-800">{{ item.housename }}</div>
            
         <div class="text-sm text-gray-500">
  💰 {{ formatPrice(item.price1) }} - {{ formatPrice(item.price2) }} - {{ formatPrice(item.price3) }} kip
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
    <div>📝 ລາຍລະອຽດ: {{ item.moredetail }}</div>
    <div>📍 ແຂວງ: {{ item.province }}</div>
     <div>📍 ເມືອງ: {{ item.district }}</div>
      <div>📍 ແຖວບ້ານ: {{ item.villages[0], item.villages[1], item.villages[2] }}</div>
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
            <v-img
              aspect-ratio="16/9"
              cover
              :src="imageBaseUrl + img"
              height="400"
            />
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

import { ref, computed, watch, onMounted } from "vue"
import axios from "axios"

const imageBaseUrl = "http://localhost:5151/"

const provinces = ref([])
const districts = ref([])
const villages = ref([])
const selectedProvince = ref(null)
const selectedDistrict = ref(null)
const selectedVillage = ref(null)
const data = ref([])

// ✅ Fetch default data when page loads
onMounted(async () => {
  await loadAllHouses()
  await loadProvinces()
})

// ✅ Fetch all houses if nothing selected
async function loadAllHouses() {
  try {
    const res = await axios.get("http://localhost:5151/api/house/selectall")
    if (res.data.status && Array.isArray(res.data.data)) {
      data.value = res.data.data.map(h => ({
        ...h,
        images: Array.isArray(h.images) ? h.images : [],
        currentSlide: 0,
        showDetails: false
      }))
    } else {
      data.value = []
    }
  } catch (err) {
    console.error("❌ Failed to fetch all guest houses:", err)
    data.value = []
  }
}

// ✅ Fetch provinces
async function loadProvinces() {
  try {
    const res = await axios.get("http://localhost:5151/api/province/selectall")
    if (Array.isArray(res.data)) {
      provinces.value = res.data.map(p => ({ code: p.provinceid, name: p.province }))
    }
  } catch (err) {
    console.error("❌ Failed to fetch provinces:", err)
  }
}

// ✅ Watch province → load districts
watch(selectedProvince, async (provinceId) => {
  selectedDistrict.value = null
  selectedVillage.value = null
  districts.value = []
  villages.value = []
  data.value = []

  if (!provinceId) {
    // If province cleared, show default houses again
    await loadAllHouses()
    return
  }

  try {
    const res = await axios.post("http://localhost:5151/api/district/selectbyprovinceid", { provinceid: provinceId })
    if (res.data.status && Array.isArray(res.data.data)) {
      districts.value = res.data.data.map(d => ({ code: d.districtid, name: d.district }))
    }
  } catch (err) {
    console.error("❌ Failed to fetch districts:", err)
  }
})

// ✅ Watch district → load villages
watch(selectedDistrict, async (districtId) => {
  selectedVillage.value = null
  villages.value = []
  data.value = []

  if (!districtId) {
    // If district cleared, show default houses again
    await loadAllHouses()
    return
  }

  try {
    const res = await axios.post("http://localhost:5151/api/village/selectbydistrictid", { districtid: districtId })
    if (Array.isArray(res.data)) {
      villages.value = res.data.map(v => ({ code: v.villageid, name: v.village }))
    }
  } catch (err) {
    console.error("❌ Failed to fetch villages:", err)
  }
})

// ✅ Watch district + village → load filtered houses
watch([selectedDistrict, selectedVillage], async ([districtId, villageId]) => {
  if (!districtId || !villageId) {
    // ❗If missing -> show all houses
    await loadAllHouses()
    return
  }

  try {
    const res = await axios.post("http://localhost:5151/api/house/selectbydistrictidandvillageid", {
      districtid: districtId,
      villageid: villageId
    })
    if (res.data.status && Array.isArray(res.data.data)) {
      data.value = res.data.data.map(h => ({
        ...h,
        images: Array.isArray(h.images) ? h.images : [],
        currentSlide: 0,
        showDetails: false
      }))
    } else {
      data.value = []
    }
  } catch (err) {
    console.error("❌ Failed to fetch guest houses:", err)
    data.value = []
  }
})

// ✅ Computed filteredData
const filteredData = computed(() => data.value)

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

<style scoped lang="css">
.match-primary :deep(.v-field--variant-outlined) {
  color: rgb(var(--v-theme-primary));
}
.match-primary :deep(.v-field--variant-outlined .v-field__outline) {
  border-color: rgb(var(--v-theme-primary));
}
.match-primary :deep(.v-label),
.match-primary :deep(.v-field__input),
.match-primary :deep(.v-select__selection-text),
.match-primary :deep(.v-field__append-inner .v-icon) {
  color: rgb(var(--v-theme-primary));
}
</style>



<style scoped>
/* Make outlined v-select border + text match the primary outlined button */
.match-primary :deep(.v-field--variant-outlined) {
  /* border color comes from currentColor, so set color to primary */
  color: rgb(var(--v-theme-primary));
}

/* Ensure the visible outline uses the same color */
.match-primary :deep(.v-field--variant-outlined .v-field__outline) {
  border-color: rgb(var(--v-theme-primary));
}

/* Label, input text, selected text, and dropdown icon */
.match-primary :deep(.v-label),
.match-primary :deep(.v-field__input),
.match-primary :deep(.v-select__selection-text),
.match-primary :deep(.v-field__append-inner .v-icon) {
  color: rgb(var(--v-theme-primary));
}

/* Optional: hover & focus ring similar to outlined button feel */
.match-primary :deep(.v-field--variant-outlined:hover .v-field__outline) {
  border-color: rgb(var(--v-theme-primary));
}

.match-primary :deep(.v-field--variant-outlined:focus-within) {
  box-shadow: 0 0 0 2px rgba(var(--v-theme-primary), 0.15);
  border-radius: 12px; /* tweak to your liking */
}

/* Disabled state: keep default muted look */
.match-primary :deep(.v-field--disabled) {
  color: rgba(var(--v-theme-on-surface), 0.38);
  box-shadow: none;
}

 
 
</style>
