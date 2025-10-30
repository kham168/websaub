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




      <!-- ✅ SEARCH BAR -->
      <div class="flex justify-center mb-4">
       <v-text-field
  v-model="searchText"
  label="Search cream band..."
  variant="outlined"
  clearable
  prepend-inner-icon="mdi-magnify"
  class="w-full max-w-xl"
  @input="handleSearch"
  @click:clear="fetchCreams"  
/> </div>
 
 

  
    <v-row no-gutters>
      <v-col
        v-for="(item, index) in data"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="ma-2 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300" elevation="2">
          
          <!-- IMAGE SLIDER (Click to Zoom) -->
          <v-window v-model="item.currentSlide" reverse show-arrows>
            <v-window-item
              v-for="(img, i) in item.images"
              :key="`img-${index}-${i}`"
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
            <div class="text-sm text-gray-600 mb-1">
              ລາຄາ: {{ formatPrice(item.price1) }}ກີບ, {{ formatPrice(item.price2) }}ກີບ & {{ formatPrice(item.price3) }} ກີບ
            </div>
        
  <div>
  📞 ເບີໂທ: 
  <a
    :href="`tel:${item.tel}`"
    class="text-blue-600 underline"
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

            <div class="text-sm text-gray-500 mb-3">
             ລາຍລະອຽດ: {{ item.detail }}
            </div>

            <!-- BUTTONS -->
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

    <!-- ZOOM DIALOG -->
    <v-dialog v-model="zoomDialog" max-width="900px">
      <v-card class="relative rounded-xl overflow-hidden">

        <!-- Image Slider inside Dialog -->
        <v-window v-model="zoomSlide" reverse show-arrows>
          <v-window-item
            v-for="(img, i) in itens.images"
            :key="`zoom-img-${i}`"
          >
            <v-img
              aspect-ratio="16/9"
              cover
              :src="img"
              height="500"
            />
          </v-window-item>
        </v-window>

      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useDataCart } from '@/stores'
import axios from 'axios' 


const searchText = ref("")
const zoomDialog = ref(false)
const itens = ref({})
const zoomSlide = ref(0)
const data = ref([])

// Fetch creams from backend
async function fetchCreams() {
  try {
    const res = await axios.get("http://localhost:5151/api/cream/selectall")
    if (res.data?.status) {
      data.value = res.data.data.map(c => ({
        id: c.id,
        name: c.creamname,
        price1: c.Price1,
        price2: c.Price2,
        price3: c.Price3,
        tel: c.tel,
        detail: c.detail,
        images: Array.isArray(c.images) ? c.images : [],
        currentSlide: 0
      }))
    } else {
      console.error("API returned fail:", res.data?.message)
    }
  } catch (err) {
    console.error("Error fetching creams:", err)
  }
}

// Search by product name (correct payload)
async function search_by_product_name(name) {
  try {
    const res = await axios.post("http://localhost:5151/api/cream/searchbyname", { name });
    if (res.data?.status && Array.isArray(res.data.data)) {
      const BASE_URL = "http://localhost:5151/";

      data.value = res.data.data.map(c => ({
        id: c.id,
        name: c.creamname,
        price1: c.Price1,
        price2: c.Price2,
        price3: c.Price3,
        tel: c.tel,
        detail: c.detail,
        images: Array.isArray(c.images)
          ? c.images.map(img => img.startsWith("http") ? img : BASE_URL + img)
          : [],
        currentSlide: 0
      }));
    } else {
      data.value = [];
    }
  } catch (err) {
    console.error("Error searching creams:", err);
    data.value = [];
  }
}

 
// Run fetch on mount
onMounted(fetchCreams)

// Open zoom when clicking image
function openZoom(item, index) {
  itens.value = item
  zoomSlide.value = index
  zoomDialog.value = true
}

// Cart logic
const cartStore = useDataCart()
function addToCart(item) {
  cartStore.dataCart.push(item)
  console.log('Cart:', cartStore.dataCart)
}

// Optional: responsive computations
const { xs, sm, md } = useDisplay()
const cardWidth = computed(() => (xs.value ? 280 : sm.value ? 360 : md.value ? 480 : 600))
const cardHeight = computed(() => (xs.value ? '90vh' : '85vh'))
const imageHeight = computed(() => (xs.value ? 220 : sm.value ? 300 : 400))

function formatPrice(value) {
  if (!value) return '0';
  return Number(value).toLocaleString('en-US');
}

let searchTimeout;

function handleSearch(val) {
  clearTimeout(searchTimeout);
  const v = typeof val === 'string' ? val : searchText.value;

  searchTimeout = setTimeout(() => {
    const trimmed = v?.trim() || "";

    // 🧠 If search box is empty -> reload all data
    if (trimmed === "") {
      console.log("Search text cleared → Reloading all creams...");
      fetchCreams();
      return;
    }

    // 🔍 Otherwise → search by name
    search_by_product_name(trimmed);
  }, 400); // wait 400ms after typing stops
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
