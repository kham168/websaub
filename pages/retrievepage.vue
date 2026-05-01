<template>
  <v-container fluid class="pa-0 bg-grey-lighten-4">
    <section class="position-relative">
      <v-sheet
        v-if="bannerMode === 'none'"
        height="400"
        color="grey-darken-4"
        class="d-flex align-center justify-center"
      >
        <div class="text-center">
          <v-icon size="80" color="grey-darken-2">mdi-image-off-outline</v-icon>
          <p class="text-h6 text-grey-darken-1 mt-4">ບໍ່ມີສື່ສຳລັບສະແດງ</p>
        </div>
      </v-sheet>

      <div
        v-else-if="bannerMode === 'video'"
        class="position-relative"
        style="width: 100%; height: 450px; background: #000"
      >
        <iframe
          :src="bannerVideoSrc"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          style="width: 100%; height: 100%; display: block"
        />
        <v-btn
          icon
          position="absolute"
          location="bottom left"
          class="ma-4 blur-btn"
          @click="isMuted = !isMuted"
        >
          <v-icon>{{ isMuted ? "mdi-volume-off" : "mdi-volume-high" }}</v-icon>
        </v-btn>
      </div>

      <v-carousel
        v-else-if="bannerMode === 'image'"
        height="450"
        cycle
        hide-delimiter-background
        show-arrows="hover"
      >
        <v-carousel-item
          v-for="(img, i) in bannerImages"
          :key="i"
          cover
          :src="img"
        >
          <v-overlay
            contained
            :model-value="true"
            persistent
            class="align-center justify-center"
            scrim="black"
            opacity="0.3"
          >
            <div class="text-center text-white px-4">
              <h1 class="text-h3 font-weight-black mb-2 d-none d-sm-block">
                {{ channelStore.channelName || "ບໍລິການ" }}
              </h1>
              <p class="text-h6 font-weight-light">
                {{
                  channelStore.detail || "ສະດວກ, ວ່ອງໄວ, ແລະ ປອດໄພທຸກການເດີນທາງ"
                }}
              </p>
            </div>
          </v-overlay>
        </v-carousel-item>
      </v-carousel>
    </section>

    <v-container class="position-relative">
      <div class="d-flex align-center mb-4">
        <v-icon color="primary" class="mr-2">mdi-magnify</v-icon>
        <h2 class="text-h6 font-weight-bold">
          ຄົ້ນຫາ {{ channelStore.channelName || "" }}
        </h2>
      </div>

      <v-row dense>
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="selectedProvince"
            :items="provinces"
            label="ເລືອກແຂວງ"
            item-title="name"
            item-value="code"
            variant="filled"
            rounded="lg"
            prepend-inner-icon="mdi-map-marker-outline"
            density="comfortable"
            flat
          />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="selectedDistrict"
            :items="districtsForSelectedProvince"
            label="ເລືອກເມືອງ"
            variant="filled"
            rounded="lg"
            prepend-inner-icon="mdi-map-outline"
            density="comfortable"
            flat
            :no-data-text="
              !selectedProvince ? 'ກະລຸນາເລືອກແຂວງກ່ອນ' : 'ບໍ່ມີຂໍ້ມູນ'
            "
          />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="searchQuery"
            label="ຄົ້ນຫາຕາມຊື່ ຫຼື ເບີໂທ..."
            variant="filled"
            rounded="lg"
            prepend-inner-icon="mdi-magnify"
            density="comfortable"
            flat
            clearable
          />
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-btn
            block
            height="48"
            color="primary"
            rounded="lg"
            elevation="2"
            @click="openCommentDialog"
            prepend-icon="mdi-chat-question"
            class="text-none font-weight-bold"
          >
            ສອບຖາມ
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <!-- Loading State -->
      <div v-if="loadings" class="text-center py-16">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
          width="6"
        />
        <p class="mt-4 text-grey">ກຳລັງໂຫລດຂໍ້ມູນ...</p>
      </div>

      <template v-else>
        <!-- Not Found — district selected but no results -->
        <div
          v-if="channels.length === 0"
          class="text-center py-16"
        >
          <v-icon size="80" color="grey-lighten-2">mdi-car-search</v-icon>
          <p class="text-h6 text-grey mt-4">ບໍ່ພົບຂໍ້ມູນໃນເມືອງທີ່ທ່ານເລືອກ</p>
          <p class="text-body-2 text-grey-lighten-1 mt-2">
            ກະລຸນາລອງເລືອກເມືອງອື່ນ ຫຼື ຄົ້ນຫາດ້ວຍຄຳອື່ນ
          </p>
          <v-btn
            class="mt-6"
            color="primary"
            variant="outlined"
            rounded="lg"
            @click="resetFilter"
          >
            ລ້າງການຄົ້ນຫາ
          </v-btn>
        </div>

        <!-- Not Found — search query has no results -->
        <div
          v-else-if="channels.length === 0"
          class="text-center py-16"
        >
          <v-icon size="80" color="grey-lighten-2">mdi-magnify-close</v-icon>
          <p class="text-h6 text-grey mt-4">
            ບໍ່ພົບຜົນການຄົ້ນຫາສຳລັບ "{{ searchQuery }}"
          </p>
          <p class="text-body-2 text-grey-lighten-1 mt-2">
            ກະລຸນາລອງຄົ້ນຫາດ້ວຍຊື່ ຫຼື ເບີໂທອື່ນ
          </p>
          <v-btn
            class="mt-6"
            color="primary"
            variant="outlined"
            rounded="lg"
            @click="resetFilter"
          >
            ລ້າງການຄົ້ນຫາ
          </v-btn>
        </div>

        <!-- Results Grid -->
        <v-row v-else>
          <v-col
            v-for="(item, index) in channels"
            :key="index"
            cols="12"
            sm="6"
            lg="4"
          >
            <v-card
              rounded="xl"
              class="taxi-card h-100 d-flex flex-column border-thin overflow-hidden"
            >
              <v-hover v-slot="{ isHovering, props }">
                <div
                  v-bind="props"
                  class="overflow-hidden position-relative"
                  style="height: 220px"
                >
                  <v-img
                    :src="item.image[0]"
                    height="220"
                    cover
                    class="transition-swing"
                    :style="{
                      transform: isHovering ? 'scale(1.05)' : 'scale(1)',
                    }"
                    @click="openZoom(item, 0)"
                  >
                    <template v-slot:placeholder>
                      <v-skeleton-loader type="image" height="220" />
                    </template>
                  </v-img>
                  <v-chip
                    position="absolute"
                    location="top right"
                    class="ma-3 font-weight-bold"
                    color="primary"
                    variant="flat"
                    size="small"
                  >
                    {{ Number(item.price1 || 0).toLocaleString() }} ₭
                  </v-chip>
                </div>
              </v-hover>

              <v-card-text class="pa-4 flex-grow-1">
                <div class="d-flex justify-space-between align-start mb-2">
                  <h3
                    class="text-h6 font-weight-bold text-truncate"
                    style="max-width: 70%"
                  >
                    {{ item.dormantalname || item.name || "—" }}
                  </h3>
                  <v-icon color="grey-lighten-1">mdi-shield-check</v-icon>
                </div>

                <div class="d-flex align-center mb-3">
                  <v-icon size="small" color="primary" class="mr-1"
                    >mdi-phone-outline</v-icon
                  >
                  <span class="text-body-2 font-weight-medium">{{
                    item.tel
                  }}</span>
                </div>

                <v-divider class="mb-3" />

                <p class="text-caption text-grey-darken-1 line-clamp-2">
                  {{
                    item.moredetail || item.detail || "ບໍ່ມີລາຍລະອຽດເພີ່ມເຕີມ"
                  }}
                </p>
              </v-card-text>

              <v-card-actions class="px-4 pb-4 pt-0">
                <v-btn
                  variant="outlined"
                  color="primary"
                  rounded="lg"
                  class="flex-grow-1 text-none"
                  @click="openZoom(item, 0)"
                >
                  ລາຍລະອຽດ
                </v-btn>
                <v-btn
                  color="success"
                  variant="flat"
                  rounded="lg"
                  class="flex-grow-1 text-none ml-2"
                  prepend-icon="mdi-whatsapp"
                  @click="openWhatsApp(item)"
                >
                  WhatsApp
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Pagination -->
        <div
          v-if="pagination && pagination.totalPages > 1"
          class="d-flex justify-center mt-8"
        >
          <v-pagination
            v-model="currentPage"
            :length="pagination.totalPages"
            rounded="lg"
            @update:model-value="onPageChange"
          />
        </div>
      </template>

      <v-divider class="my-12" />

      <div v-if="topData && topData.length > 0" class="mt-12">
  <!-- Title Section -->
  <div class="d-flex align-center mb-6">
    <div class="bg-primary rounded-circle pa-1 mr-3">
      <v-icon color="white" size="small">mdi-star</v-icon>
    </div>
    <h2 class="text-h5 font-weight-bold">ແນະນຳເບຣນດອື່ນໆ</h2>
  </div>

  <!-- Slider Container -->
  <div 
  v-if="topData && topData.length > 0" 
  class="mt-12 position-relative section-container"
  @mouseenter="stopAutoSlide"
  @mouseleave="startAutoSlide"
>
  <!-- Title Section -->
  <div class="d-flex align-center mb-6">
    <div class="bg-primary rounded-circle pa-1 mr-3">
      <v-icon color="white" size="small">mdi-star</v-icon>
    </div>
    <h2 class="text-h5 font-weight-bold">ແນະນຳເບຣນດອື່ນໆ</h2>
  </div>

  <!-- Slider Wrapper -->
  <div 
  class="position-relative slider-wrapper"
  @mouseenter="stopAutoSlide"
  @mouseleave="startAutoSlide"
>
  <!-- Left Button: Transparent Glass Style -->
  <v-btn
    icon
    class="nav-btn left-btn"
    @click="scrollBrands(-1)"
  >
    <v-icon color="black">mdi-chevron-left</v-icon>
  </v-btn>

  <div
    ref="brandsTrack"
    class="brands-scroll-container d-flex ga-4"
  >
    <!-- Pass your data here -->
    <TopDataCard :topData="topData" />
    
    <!-- CLONE: To make it look infinite, we repeat the first few items -->
    <!-- If your TopDataCard handles a list, you might need to pass the first 3 items again -->
    <TopDataCard :topData="topData.slice(0, 3)" class="cloned-items" />
  </div>

  <!-- Right Button -->
  <v-btn
    icon
    class="nav-btn right-btn"
    @click="scrollBrands(1)"
  >
    <v-icon color="black">mdi-chevron-right</v-icon>
  </v-btn>
</div>
</div>
</div>
    </v-container>

    <!-- Comment Dialog -->
    <v-dialog
      v-model="commentDialog"
      max-width="450"
      transition="dialog-bottom-transition"
    >
      <v-card rounded="xl">
        <v-toolbar color="primary" flat>
          <v-toolbar-title class="font-weight-bold"
            >ສົ່ງຂໍ້ຄວາມສອບຖາມ</v-toolbar-title
          >
          <v-btn icon @click="commentDialog = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-toolbar>
        <v-card-text class="pa-6">
          <v-text-field
            v-model="telephone"
            label="ຫົວຂໍ້ສອບຖາມ"
            variant="outlined"
            rounded="lg"
            class="mb-2"
          />
          <v-textarea
            v-model="comment"
            label="ລາຍລະອຽດ"
            variant="outlined"
            rounded="lg"
            rows="4"
          />
          <v-btn
            block
            color="primary"
            size="large"
            rounded="lg"
            class="mt-4"
            @click="submitComment"
          >
            ສົ່ງຂໍ້ມູນ
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Zoom Dialog -->
    <v-dialog
      v-model="zoomDialog"
      max-width="1200"
      transition="dialog-transition"
    >
      <v-card rounded="xl" elevation="24">
        <v-card-title
          class="pa-4 pa-sm-6 d-flex align-center"
          style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        >
          <v-avatar color="white" size="40" class="mr-3 d-none d-sm-flex">
            <v-icon color="primary" size="24">mdi-image-outline</v-icon>
          </v-avatar>
          <div class="flex-grow-1 min-width-0">
            <h3
              class="text-body-1 text-sm-h5 font-weight-bold text-white text-truncate"
            >
              {{ zoomItem.dormantalname || zoomItem.name || "—" }}
            </h3>
            <div class="d-flex align-center mt-1 ga-1 ga-sm-2 flex-wrap">
              <v-chip color="success" variant="flat" size="small">
                <v-icon start size="small">mdi-cash</v-icon>
                {{ Number(zoomItem.price1 || 0).toLocaleString() }} ₭
              </v-chip>
              <v-chip
                color="white"
                variant="flat"
                size="small"
                style="cursor: pointer"
                @click="callPhone(zoomItem.tel)"
              >
                <v-icon start size="small" color="primary">mdi-phone</v-icon>
                {{ zoomItem.tel }}
              </v-chip>
            </div>
          </div>
          <v-btn
            icon
            @click="zoomDialog = false"
            size="small"
            variant="text"
            color="white"
            class="ml-2 flex-shrink-0"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider />

        <v-carousel
          v-model="zoomSlide"
          :height="carouselHeight"
          hide-delimiters
          show-arrows
          cycle
          interval="4000"
          class="rounded-xl elevation-8"
        >
          <template v-slot:prev="{ props }">
            <v-btn
              v-bind="props"
              :size="smAndDown ? 'small' : 'large'"
              elevation="4"
              class="bg-white"
            >
              <v-icon :size="smAndDown ? 18 : 32" color="grey-darken-2"
                >mdi-chevron-left</v-icon
              >
            </v-btn>
          </template>
          <template v-slot:next="{ props }">
            <v-btn
              v-bind="props"
              :size="smAndDown ? 'small' : 'large'"
              elevation="4"
              class="bg-white"
            >
              <v-icon :size="smAndDown ? 18 : 32" color="grey-darken-2"
                >mdi-chevron-right</v-icon
              >
            </v-btn>
          </template>

          <v-carousel-item
            v-for="(img, i) in zoomItem.image"
            :key="`zoom-${i}`"
          >
            <v-img
              :src="img.startsWith('http') ? img : img"
              :height="carouselHeight"
              contain
              class="rounded-xl bg-grey-darken-4"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                    size="64"
                    width="6"
                  />
                </v-row>
              </template>

              <div class="d-flex justify-end pa-2 pa-sm-3">
                <v-chip
                  color="black"
                  variant="flat"
                  :size="smAndDown ? 'small' : 'default'"
                  class="text-white font-weight-bold opacity-80"
                >
                  <v-icon start size="small">mdi-image-multiple</v-icon>
                  {{ i }} / {{ zoomItem.image?.length || 0 }}
                </v-chip>
              </div>

              <div
                class="position-absolute w-100 d-flex align-center justify-space-between pa-2 pa-sm-3"
                style="bottom: 0"
              >
                <v-btn
                  icon
                  size="small"
                  elevation="2"
                  class="bg-white"
                  @click.stop="toggleZoomAutoplay"
                >
                  <v-icon size="18" color="grey-darken-2">
                    {{ isZoomPlaying ? "mdi-pause" : "mdi-play" }}
                  </v-icon>
                </v-btn>
                <div class="d-flex align-center ga-1">
                  <v-icon
                    v-for="(_, dotIndex) in zoomItem.image"
                    :key="dotIndex"
                    :size="dotIndex === i ? 10 : 7"
                    :color="dotIndex === i ? 'white' : 'grey-lighten-1'"
                  >
                    mdi-circle
                  </v-icon>
                </div>
                <div style="width: 32px" />
              </div>
            </v-img>
          </v-carousel-item>
        </v-carousel>

        <v-divider />

        <v-card-actions
          class="pa-4 pa-sm-6 justify-center ga-2 ga-sm-4 flex-wrap"
        >
          <v-btn
            color="primary"
            :size="$vuetify.display.smAndDown ? 'large' : 'x-large'"
            @click="callPhone(zoomItem.tel)"
            prepend-icon="mdi-phone"
            elevation="2"
            :block="$vuetify.display.smAndDown"
            class="px-4 px-sm-8"
          >
            ໂທຫາ
          </v-btn>
          <v-btn
            color="success"
            :size="$vuetify.display.smAndDown ? 'large' : 'x-large'"
            @click="openWhatsApp(zoomItem)"
            prepend-icon="mdi-whatsapp"
            elevation="2"
            :block="$vuetify.display.smAndDown"
            class="px-4 px-sm-8"
          >
            ຕິດຕໍ່ທາງ WhatsApp
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useDisplay } from "vuetify";
// ນຳໃຊ້ Composable ທີ່ເຮົາສ້າງໄວ້
import { useGetChannelById } from "~/composables/useRetrieveByid";

const { smAndDown } = useDisplay();

// ─── Configuration ──────────────────────────────────────────────────────────
// ປ່ຽນເປັນ URL ຂອງ Server ຖ້າຕ້ອງການ Deploy
// const BASE_URL = "https://service.tsheb.la/api"; 
const BASE_URL = "http://localhost:5151/api";

// ─── Setup Composable ───────────────────────────────────────────────────────
// ດຶງເຄື່ອງມື ແລະ ຂໍ້ມູນອອກມາຈາກ Composable
const {
  channels,
  topData,
  pagination,
  qr,
  channelimage,
  video1,
  loadings,
  errors,
  fetchChannelById
} = useGetChannelById();

// ─── Local State ────────────────────────────────────────────────────────────
const channelStore = ref({
  channelId: null,
  channelName: "",
  channelimage: [],
  video1: "",
  detail: "",
  qr: "",
});

const route=useRoute();
const filteredData = ref([]);
const baseData = ref([]);
const currentPage = ref(1);

const searchQuery = ref("");
const provinces = ref([]);
const districtsForSelectedProvince = ref([]);
const selectedProvince = ref(null);
const selectedDistrict = ref(null);

// UI States
const commentDialog = ref(false);
const telephone = ref("");
const comment = ref("");
const zoomDialog = ref(false);
const zoomItem = ref({});
const zoomSlide = ref(0);
const isZoomPlaying = ref(true);
const isMuted = ref(true);
// const brandsTrack = ref(null);

// ─── Computed Properties ────────────────────────────────────────────────────
const carouselHeight = computed(() => (smAndDown.value ? 280 : 550));

const bannerMode = computed(() => {
  if (channelStore.value.video1) return "video";
  if (channelStore.value.channelimage?.length > 0) return "image";
  return "none";
});

const bannerImages = computed(() => {
  const data = channelStore.value.channelimage;
  return Array.isArray(data) ? data : (data ? [data] : []);
});

const bannerVideoSrc = computed(() => {
  const id = extractYoutubeID(channelStore.value.video1);
  if (!id) return "";
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=${isMuted.value ? 1 : 0}&loop=1&playlist=${id}&rel=0`;
});

// ─── Helpers ────────────────────────────────────────────────────────────────
function extractYoutubeID(url) {
  if (!url) return "";
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=|shorts\/))([\w-]+)/);
  return match ? match[1] : "";
}

const syncFromComposable = () => {
  console.log("🔄 Syncing UI state...");
  if (!channels.value) return;

  const processed = channels.value.map((item) => ({
    ...item,
    image: Array.isArray(item.image) ? item.image : [item.image || "placeholder.jpg"],
  }));

  baseData.value = processed;
  filteredData.value = processed;
  console.log("✅ UI Updated with", processed.length, "items");
};

// ─── Actions ────────────────────────────────────────────────────────────────
const onPageChange = async (page) => {
  if (!channelStore.value.channelId) return;
  await fetchChannelById(channelStore.value.channelId, page - 1);
  syncFromComposable();
};

const queryByLocation = async (districtId) => {
  if (!selectedProvince.value || !districtId) return;
  
  // ດຶງຂໍ້ມູນໃໝ່ ຫຼື ກັ່ນຕອງຈາກຂໍ້ມູນທີ່ມີ
  const filtered = baseData.value.filter(
    (item) => String(item.districtId || item.districtid || "") === String(districtId)
  );
  filteredData.value = filtered;
};

const resetFilter = () => {
  selectedProvince.value = null;
  selectedDistrict.value = null;
  searchQuery.value = "";
  filteredData.value = baseData.value;
};

// ─── Lifecycle ──────────────────────────────────────────────────────────────
onMounted(async () => {
  console.log("🚀 Page Initialization...");

  console.log("📡 Fetching data for channel:", channelStore.value.channelId);
  // 1. ດຶງຂໍ້ມູນເບື້ອງຕົ້ນຈາກ History State
  const routeState = history.state?.store;
  if (routeState?.channelId) {
    channelStore.value = { ...channelStore.value, ...routeState };
  }

  // 2. ເອີ້ນໃຊ້ Composable ເພື່ອດຶງຂໍ້ມູນຈາກ API
  // if (!channelStore.value.channelId) {
    console.log("📡 Fetching data for channel00000:", route.query.channelId);
    await fetchChannelById(route.query.channelId, 0);
    console.log("📡  data for channel000007777:", channels.value);
    
    // ອັບເດດຂໍ້ມູນ Banner/QR ຖ້າ API ມີຂໍ້ມູນໃໝ່ກວ່າ
    // if (video1.value) channelStore.value.video1 = video1.value;
    // if (qr.value) channelStore.value.qr = qr.value;
    // if (channelimage.value) {
    //   channelStore.value.channelimage = Array.isArray(channelimage.value) 
    //     ? channelimage.value 
    //     : [channelimage.value];
    // }
    
    // syncFromComposable();
  // }

  // 3. ໂຫຼດລາຍຊື່ແຂວງ
  try {
    const res = await fetch(`${BASE_URL}/province/selectall`);
    const pData = await res.json();
    provinces.value = (pData.data || pData).map((p) => ({
      code: p.provinceid,
      name: p.province,
    }));
  } catch (e) {
    console.error("❌ Province fetch error:", e);
  }
});
const openZoom=(item,index)=>{
  zoomItem.value=item;
  zoomSlide.value=index;
  zoomDialog.value=true;
  console.log("🔍 Zooming into item:", item);
  
}
const toggleZoomAutoplay=()=>{
  isZoomPlaying.value=!isZoomPlaying.value;
}
const openCommentDialog=()=>{
  commentDialog.value=true;
}

// ─── Watchers ───────────────────────────────────────────────────────────────
watch(selectedProvince, async (id) => {
  selectedDistrict.value = null;
  districtsForSelectedProvince.value = [];
  if (!id) {
    filteredData.value = baseData.value;
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/district/selectByProvinceId?provinceId=${id}`);
    const dData = await res.json();
    districtsForSelectedProvince.value = (dData.data || dData).map((item) => ({
      title: item.district,
      value: item.districtid,
    }));
  } catch (e) {
    console.error("❌ District fetch error:", e);
  }
});

watch(selectedDistrict, (newVal) => {
  if (newVal) queryByLocation(newVal);
});

watch(searchQuery, (q) => {
  if (!q) {
    filteredData.value = baseData.value;
    return;
  }
  const lower = q.toLowerCase().trim();
  filteredData.value = baseData.value.filter(
    (item) =>
      (item.dormantalname || item.name || "").toLowerCase().includes(lower) ||
      (item.tel && item.tel.includes(lower))
  );
});

// Debug logs
watch(errors, (err) => { if (err) console.error("🚨 Composable Error:", err); });

//slide auto
const brandsTrack = ref(null);
const autoSlideInterval = ref(null);

const scrollBrands = (direction) => {
  const container = brandsTrack.value;
  if (!container) return;

  const cardWidth = 320; // Adjust to your actual card width + gap
  const currentScroll = container.scrollLeft;
  const maxScroll = container.scrollWidth - container.clientWidth;

  if (direction === 1) {
    // If we are at the very end, jump to start instantly then slide
    if (currentScroll >= maxScroll - 5) {
      container.scrollTo({ left: 0, behavior: 'instant' });
      // Small timeout to allow the 'instant' jump to settle before sliding
      setTimeout(() => {
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }, 10);
    } else {
      container.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  } else {
    // Left direction logic
    if (currentScroll <= 5) {
      container.scrollTo({ left: maxScroll, behavior: 'instant' });
      setTimeout(() => {
        container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      }, 10);
    } else {
      container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  }
};

const startAutoSlide = () => {
  autoSlideInterval.value = setInterval(() => {
    scrollBrands(1);
  }, 3000); // Faster slide for a smoother feel
};

const stopAutoSlide = () => {
  if (autoSlideInterval.value) clearInterval(autoSlideInterval.value);
};

onMounted(() => startAutoSlide());
onUnmounted(() => stopAutoSlide());
</script>


<style scoped>
:deep(.v-carousel__controls .v-btn),
:deep(.v-window__controls .v-btn) {
  background-color: rgba(0, 0, 0, 0.1) !important;
  color: white !important;
  width: 36px !important;
  height: 36px !important;
  border-radius: 50% !important;
  backdrop-filter: blur(4px) !important;
  box-shadow: none !important;
}
:deep(.v-carousel__controls .v-btn:hover),
:deep(.v-window__controls .v-btn:hover) {
  background-color: rgba(0, 0, 0, 0.6) !important;
}
.transition-swing {
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp-limit: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.taxi-card {
  transition: all 0.3s ease;
  border-color: rgba(0, 0, 0, 0.05) !important;
}
.taxi-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1) !important;
}
.blur-btn {
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(10px);
  color: white !important;
}
.border-thin {
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
}
@media (max-width: 600px) {
  .text-h3 {
    font-size: 1.75rem !important;
  }
}
.d-flex[style*="overflow-x"]::-webkit-scrollbar {
  display: none;
}
</style>
<style scoped>
.slider-wrapper {
  overflow: hidden; /* Keeps buttons from causing horizontal page scroll */
  padding: 0 10px;
}

.brands-scroll-container {
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  display: flex;
  padding-bottom: 20px;
}

.brands-scroll-container::-webkit-scrollbar {
  display: none;
}

/* Glassmorphism Navigation */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  background: rgba(255, 255, 255, 0.4) !important;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.left-btn {
  left: 20px;
}

.right-btn {
  right: 20px;
}

/* Hover Effect */
.nav-btn:hover {
  background: rgba(255, 255, 255, 0.9) !important;
  scale: 1.05;
}

/* Ensure cards don't shrink */
:deep(.v-card) {
  flex: 0 0 auto;
  width: 300px; /* Adjust this to match your design */
}
</style>
