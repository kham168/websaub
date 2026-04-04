<template>
  <v-app>
    <v-container fluid class="pa-0">
      <!-- 🎥 Video Hero Banner -->
      <section class="video-hero-section">
        <v-carousel
          v-model="currentVideoSlide"
          height="500"
          hide-delimiter-background
          show-arrows
          cycle
          interval="6000"
          class="video-carousel"
        >
          <template v-slot:prev="{ props }">
            <v-btn
              icon="mdi-chevron-left"
              size="large"
              v-bind="props"
              class="video-arrow"
              color="white"
              elevation="3"
            />
          </template>
          <template v-slot:next="{ props }">
            <v-btn
              icon="mdi-chevron-right"
              size="large"
              v-bind="props"
              class="video-arrow"
              color="white"
              elevation="3"
            />
          </template>

          <v-carousel-item
            v-for="(video, i) in videoBanners"
            :key="`video-${i}`"
            class="video-item"
          >
            <iframe
              v-if="videoSrcs[i]"
              :src="videoSrcs[i]"
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              class="video-iframe"
            />

            <!-- Overlay with gradient -->
            <div class="video-overlay">
              <div class="overlay-content">
                <h1 class="text-h3 text-white font-weight-bold mb-4">
                  ບໍລິການລົດແທັກຊີ່
                </h1>
                <p class="text-h6 text-white mb-6">
                  ລາຄາສົມເຫດສົມຜົນ • ປອດໄພ • ໄວ
                </p>
              </div>
            </div>

            <!-- Sound Toggle -->
            <v-btn
              icon
              class="sound-toggle"
              @click="isMuted = !isMuted"
              color="white"
              elevation="2"
            >
              <v-icon>{{
                isMuted ? "mdi-volume-off" : "mdi-volume-high"
              }}</v-icon>
            </v-btn>
          </v-carousel-item>
        </v-carousel>
      </section>

      <!-- 🔍 Search & Filter Section -->
      <v-container class="search-section py-8">
        <v-card elevation="3" class="pa-6 rounded-lg">
          <h2 class="text-h5 font-weight-bold mb-6">
            <v-icon color="primary" class="mr-2">mdi-magnify</v-icon>
            ຄົ້ນຫາລົດແທັກຊີ່
          </h2>

          <v-row>
            <!-- Province Select -->
            <v-col cols="12" sm="6" md="3">
              <v-select
                v-model="selectedProvince"
                :items="provinces"
                label="ເລືອກແຂວງ"
                item-title="name"
                item-value="code"
                clearable
                variant="outlined"
                prepend-inner-icon="mdi-map-marker"
                density="comfortable"
              />
            </v-col>

            <!-- District Select -->
            <v-col cols="12" sm="6" md="3">
              <v-select
                v-model="selectedDistrict"
                :items="districtsForSelectedProvince"
                label="ເລືອກເມືອງ"
                item-title="name"
                item-value="code"
                clearable
                variant="outlined"
                prepend-inner-icon="mdi-map"
                density="comfortable"
                :disabled="!selectedProvince"
              />
            </v-col>

            <!-- Search Button -->
            <v-col cols="12" sm="6" md="2">
              <v-btn
                block
                color="primary"
                size="large"
                @click="queryByLocation"
                :disabled="!selectedProvince || !selectedDistrict"
                prepend-icon="mdi-magnify"
              >
                ຄົ້ນຫາ
              </v-btn>
            </v-col>

            <!-- Search Text -->
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="searchQuery"
                label="ຄົ້ນຫາຕາມຊື່..."
                variant="outlined"
                clearable
                prepend-inner-icon="mdi-magnify"
                density="comfortable"
              />
            </v-col>

            <!-- Ask Button -->
            <v-col cols="12" md="1" class="d-flex align-center">
              <v-btn
                block
                color="success"
                variant="tonal"
                @click="openCommentDialog"
                prepend-icon="mdi-comment-question"
              >
                ສອບຖາມ
              </v-btn>
            </v-col>
          </v-row>

          <!-- Active Filters Display -->
          <v-row v-if="selectedProvince || selectedDistrict" class="mt-2">
            <v-col cols="12">
              <div class="d-flex align-center gap-2 flex-wrap">
                <span class="text-subtitle-2 text-grey-darken-1">ຕົວກອງ:</span>
                <v-chip
                  v-if="selectedProvince"
                  closable
                  @click:close="selectedProvince = null"
                  color="primary"
                  variant="flat"
                  size="small"
                >
                  {{ provinces.find((p) => p.code === selectedProvince)?.name }}
                </v-chip>
                <v-chip
                  v-if="selectedDistrict"
                  closable
                  @click:close="selectedDistrict = null"
                  color="primary"
                  variant="flat"
                  size="small"
                >
                  {{
                    districtsForSelectedProvince.find(
                      (d) => d.code === selectedDistrict
                    )?.name
                  }}
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-container>

      <!-- 📊 Results Summary -->
      <v-container>
        <div class="d-flex justify-space-between align-center mb-4">
          <h3 class="text-h5 font-weight-bold">ຜົນການຄົ້ນຫາ</h3>
          <v-chip color="primary" size="large">
            <v-icon start>mdi-car-multiple</v-icon>
            {{ filteredData.length }} ລົດ
          </v-chip>
        </div>
      </v-container>

      <!-- 🚖 Taxi Cards Grid -->
      <v-container class="pb-12">
        <!-- Empty State -->
        <v-row v-if="filteredData.length === 0">
          <v-col cols="12" class="text-center py-16">
            <v-icon size="120" color="grey-lighten-2">mdi-taxi</v-icon>
            <h3 class="text-h5 text-grey-darken-1 mt-6">
              ບໍ່ພົບຂໍ້ມູນລົດແທັກຊີ່
            </h3>
            <p class="text-body-1 text-grey mt-2">ກະລຸນາລອງຄົ້ນຫາໃໝ່</p>
          </v-col>
        </v-row>
        <v-row v-if="loading" class="text-center py-16">
          <v-col cols="12">
            <v-progress-circular indeterminate color="primary" size="64" />
            <p class="mt-4 text-h6">ກຳລັງໂຫລດ...</p>
          </v-col>
        </v-row>

        <!-- Error State -->
        <v-row v-else-if="error" class="text-center py-16">
          <v-col cols="12">
            <v-icon size="64" color="error">mdi-alert-circle</v-icon>
            <p class="mt-4 text-h6 text-error">{{ error }}</p>
          </v-col>
        </v-row>

        <!-- Taxi Cards -->
        <v-row v-else>
          <v-col
            v-for="(taxi, index) in filteredData"
            :key="taxi.id || index"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card class="taxi-card" elevation="2" hover>
              <!-- Image Carousel -->
              <div class="image-carousel-wrapper">
                <v-carousel
                  v-model="taxi.currentSlide"
                  height="250"
                  hide-delimiter-background
                  show-arrows="hover"
                  class="image-carousel"
                >
                  <template v-slot:prev="{ props }">
                    <v-btn
                      icon="mdi-chevron-left"
                      size="small"
                      v-bind="props"
                      class="carousel-arrow"
                      color="white"
                      elevation="2"
                    />
                  </template>
                  <template v-slot:next="{ props }">
                    <v-btn
                      icon="mdi-chevron-right"
                      size="small"
                      v-bind="props"
                      class="carousel-arrow"
                      color="white"
                      elevation="2"
                    />
                  </template>

                  <v-carousel-item
                    v-for="(img, i) in taxi.image"
                    :key="`img-${index}-${i}`"
                  >
                    <v-img
                      :src="img.startsWith('http') ? img : imageBaseUrl + img"
                      aspect-ratio="1.5"
                      cover
                      class="taxi-image"
                      @click="openZoom(taxi, i)"
                      @error="handleImageError"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey-lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>

                      <!-- Image counter badge -->
                      <div class="image-counter">
                        <v-icon size="small" class="mr-1">mdi-camera</v-icon>
                        {{ i + 1 }}/{{ taxi.image.length }}
                      </div>
                    </v-img>
                  </v-carousel-item>
                </v-carousel>
              </div>

              <!-- Card Content -->
              <v-card-text class="pa-4">
                <!-- Taxi Name -->
                <h4 class="text-h6 font-weight-bold mb-3 taxi-name">
                  {{ taxi.name }}
                </h4>

                <!-- Pricing -->
                <div class="pricing-section mb-3">
                  <v-chip color="success" variant="flat" class="mb-2">
                    <v-icon start size="small">mdi-cash</v-icon>
                    {{ Number(taxi.price1).toLocaleString() }} ₭
                  </v-chip>
                  <p class="text-caption text-grey-darken-1">
                    ລາຄາສາມາດລົມໄດ້ຕາມໄລຍະທາງ
                  </p>
                </div>

                <!-- ✅ FIXED: Contact Info - Tel button calls phone directly -->
                <v-list class="bg-transparent pa-0 mb-3">
                  <v-list-item class="px-0" density="compact">
                    <template v-slot:prepend>
                      <v-icon color="primary" size="small">mdi-phone</v-icon>
                    </template>
                    <v-list-item-title>
                      <!-- ✅ Click to CALL: uses window.location.href for reliable tel: routing -->
                      <span
                        class="contact-link text-primary"
                        @click="callPhone(taxi.tel)"
                        style="cursor: pointer;"
                      >
                        {{ taxi.tel }}
                      </span>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>

                <!-- Details (collapsible) -->
                <v-expand-transition>
                  <div v-if="taxi.showDetails" class="details-expanded">
                    <v-divider class="mb-3" />
                    <p class="text-body-2 text-grey-darken-2">
                      {{ taxi.detail }}
                    </p>
                  </div>
                </v-expand-transition>
              </v-card-text>

              <!-- Card Actions -->
              <v-card-actions class="pa-4 pt-0">
                <v-btn
                  variant="text"
                  color="primary"
                  size="small"
                  @click="taxi.showDetails = !taxi.showDetails"
                >
                  {{ taxi.showDetails ? "ຫຼຸດລົງ" : "ລາຍລະອຽດເພີ່ມ" }}
                  <v-icon end>
                    {{
                      taxi.showDetails ? "mdi-chevron-up" : "mdi-chevron-down"
                    }}
                  </v-icon>
                </v-btn>

                <v-spacer />

                <!-- ✅ FIXED: WhatsApp button routes to WhatsApp -->
                <v-btn
                  color="success"
                  variant="flat"
                  size="small"
                  @click="openWhatsApp(taxi)"
                  prepend-icon="mdi-whatsapp"
                >
                  WhatsApp
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- ================ Show Top Product and slider  ================ -->
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="1" class="d-flex align-end justify-end mb-1">
              <v-icon color="primary">mdi-plus-circle</v-icon>
            </v-col>
            <v-col cols="11" class="d-flex align-start justify-start text-h5">
              ແນະນຳເບຣນດອື່ນๆ
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-container class="pa-4 bg-grey-lighten-3">
            <v-carousel
              cycle
              show-arrows
              hide-delimiters
              interval="3000"
              width="90px"
              height="300px"
            >
              <v-carousel-item v-for="(item, index) in topData" :key="index">
                <v-img
                  :src="item.image[0] || '/placeholder.jpg'"
                  class="fill-height"
                  cover
                >
                </v-img>
              </v-carousel-item>
            </v-carousel>
          </v-container>
          <v-divider class="my-4"></v-divider>
          <!-- =============== Show Top Product and TopData  ================ -->
          <TopDataCard :topData="topData" />
        </v-row>
      </v-container>

      <!-- 📝 Comment Dialog -->
      <v-dialog v-model="commentDialog" max-width="600">
        <v-card class="rounded-lg">
          <v-card-title class="bg-primary text-white pa-4">
            <v-icon class="mr-2">mdi-comment-question</v-icon>
            ສອບຖາມຂໍ້ມູນ
          </v-card-title>

          <v-card-text class="pa-6">
            <v-text-field
              v-model="telephone"
              label="ເບີໂທຕິດຕໍ່"
              type="tel"
              variant="outlined"
              clearable
              prepend-inner-icon="mdi-phone"
              :error="telephoneError"
              :error-messages="telephoneError ? ['ກະລຸນາປ້ອນເບີໂທ'] : []"
              class="mb-4"
            />

            <v-textarea
              v-model="comment"
              label="ຂໍ້ຄວາມ"
              variant="outlined"
              rows="5"
              auto-grow
              clearable
              prepend-inner-icon="mdi-message-text"
              :error="commentError"
              :error-messages="commentError ? ['ກະລຸນາປ້ອນຂໍ້ຄວາມ'] : []"
            />
          </v-card-text>

          <v-card-actions class="pa-4">
            <v-spacer />
            <v-btn variant="text" @click="commentDialog = false">
              ຍົກເລີກ
            </v-btn>
            <v-btn color="primary" variant="flat" @click="submitComment">
              ສົ່ງ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 🔍 Image Zoom Dialog -->
      <v-dialog
        v-model="zoomDialog"
        max-width="1200"
        transition="dialog-transition"
      >
        <v-card class="zoom-dialog-card elevation-24">
          <!-- Header -->
          <v-card-title class="zoom-header pa-6 d-flex align-center">
            <div class="d-flex align-center flex-grow-1">
              <v-avatar color="primary" size="48" class="mr-4">
                <v-icon color="white" size="28">mdi-car-side</v-icon>
              </v-avatar>
              <div>
                <h3 class="text-h5 font-weight-bold">{{ zoomItem.name }}</h3>
                <div class="d-flex align-center mt-1">
                  <v-chip
                    color="success"
                    variant="flat"
                    size="small"
                    class="mr-2"
                  >
                    <v-icon start size="small">mdi-cash</v-icon>
                    {{ Number(zoomItem.price1 || 0).toLocaleString() }} ₭
                  </v-chip>
                  <!-- ✅ FIXED: Click chip phone number to call -->
                  <v-chip
                    color="primary"
                    variant="flat"
                    size="small"
                    style="cursor: pointer;"
                    @click="callPhone(zoomItem.tel)"
                  >
                    <v-icon start size="small">mdi-phone</v-icon>
                    {{ zoomItem.tel }}
                  </v-chip>
                </div>
              </div>
            </div>

            <v-btn icon @click="zoomDialog = false" size="large" variant="text">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-divider />

          <!-- Carousel Container -->
          <v-card-text class="pa-8 zoom-carousel-wrapper">
            <v-carousel
              v-model="zoomSlide"
              height="600"
              hide-delimiters
              show-arrows
              cycle
              interval="4000"
              class="rounded-xl overflow-hidden elevation-8"
            >
              <template v-slot:prev="{ props }">
                <v-btn
                  icon
                  size="large"
                  v-bind="props"
                  class="zoom-nav-btn"
                  color="white"
                  elevation="4"
                >
                  <v-icon size="32">mdi-chevron-left</v-icon>
                </v-btn>
              </template>
              <template v-slot:next="{ props }">
                <v-btn
                  icon
                  size="large"
                  v-bind="props"
                  class="zoom-nav-btn"
                  color="white"
                  elevation="4"
                >
                  <v-icon size="32">mdi-chevron-right</v-icon>
                </v-btn>
              </template>

              <v-carousel-item
                v-for="(img, i) in zoomItem.image"
                :key="`zoom-${i}`"
              >
                <v-img
                  :src="img.startsWith('http') ? img : imageBaseUrl + img"
                  height="600"
                  cover
                  class="zoom-image-main"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="primary"
                        size="64"
                        width="6"
                      ></v-progress-circular>
                    </v-row>
                  </template>

                  <!-- Image counter overlay -->
                  <div class="zoom-image-counter">
                    <v-chip
                      color="rgba(0, 0, 0, 0.8)"
                      text-color="white"
                      size="large"
                      class="font-weight-bold"
                    >
                      <v-icon start>mdi-image-multiple</v-icon>
                      {{ i + 1 }} / {{ zoomItem.image?.length || 0 }}
                    </v-chip>
                  </div>

                  <!-- Play/Pause control -->
                  <div class="zoom-play-control">
                    <v-btn
                      icon
                      size="small"
                      color="white"
                      elevation="2"
                      @click.stop="toggleZoomAutoplay"
                    >
                      <v-icon>{{
                        isZoomPlaying ? "mdi-pause" : "mdi-play"
                      }}</v-icon>
                    </v-btn>
                  </div>
                </v-img>
              </v-carousel-item>
            </v-carousel>
          </v-card-text>

          <v-divider />

          <!-- ✅ FIXED: Footer Actions - separate Call and WhatsApp buttons -->
          <v-card-actions class="pa-6 justify-center gap-4">
            <!-- Call button -->
            <v-btn
              color="primary"
              size="x-large"
              @click="callPhone(zoomItem.tel)"
              prepend-icon="mdi-phone"
              variant="outlined"
              elevation="2"
              class="px-8"
            >
              ໂທຫາ
            </v-btn>
            <!-- WhatsApp button -->
            <v-btn
              color="success"
              size="x-large"
              @click="openWhatsApp(zoomItem)"
              prepend-icon="mdi-whatsapp"
              elevation="2"
              class="px-8"
            >
              ຕິດຕໍ່ທາງ WhatsApp
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

const { items, allitems, topData, pagination, loading, error, fetchTaxi } =
  useTaxi();

defineProps({
  store: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const imageBaseUrl = "http://localhost:5151/";

const filteredData = ref([]);
const searchQuery = ref("");

const provinces = ref([]);
const districtsForSelectedProvince = ref([]);
const selectedProvince = ref(null);
const selectedDistrict = ref(null);

const commentDialog = ref(false);
const telephone = ref("");
const comment = ref("");
const telephoneError = ref(false);
const commentError = ref(false);

const zoomDialog = ref(false);
const zoomItem = ref({ image: [] });
const zoomSlide = ref(0);
const isZoomPlaying = ref(true);

const videoBanners = ref([
  "https://youtu.be/KTd1yYVoMpE?si=GPO0xlvZHjYZyecB",
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "https://www.youtube.com/watch?v=9bZkp7q19f0",
]);
const currentVideoSlide = ref(0);
const isMuted = ref(true);

function extractYoutubeID(url) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=))([\w-]+)/
  );
  return match ? match[1] : "";
}

const videoSrcs = computed(() => {
  return videoBanners.value.map((video) => {
    const id = extractYoutubeID(video);
    if (!id) return "";
    return `https://www.youtube.com/embed/${id}?autoplay=1&loop=1&playlist=${id}&mute=${
      isMuted.value ? 1 : 0
    }`;
  });
});

function parseImageArray(imageData) {
  if (!imageData) return ["placeholder.jpg"];
  if (Array.isArray(imageData)) {
    return imageData.length > 0 ? imageData : ["placeholder.jpg"];
  }
  if (typeof imageData === "string") {
    try {
      const parsed = JSON.parse(imageData);
      return Array.isArray(parsed) ? parsed : [imageData];
    } catch {
      const result = imageData.includes(",")
        ? imageData.split(",").map((s) => s.trim()).filter((s) => s)
        : [imageData];
      return result.length > 0 ? result : ["placeholder.jpg"];
    }
  }
  return ["placeholder.jpg"];
}

function processTaxiItems(items) {
  if (!items || !Array.isArray(items)) return [];
  return items.map((item) => ({
    ...item,
    image: parseImageArray(item.image || item.images || item.photo),
    currentSlide: 0,
    showDetails: false,
  }));
}

onMounted(async () => {
  await fetchTaxi();
  if (allitems.value && allitems.value.length > 0) {
    filteredData.value = processTaxiItems(allitems.value);
  }
  if (topData.value && Array.isArray(topData.value) && topData.value.length > 0) {
    topData.value = processTaxiItems(topData.value);
  }

  try {
    const resProvince = await fetch("http://localhost:5151/api/province/selectall");
    if (!resProvince.ok) throw new Error(`Province API failed: ${resProvince.status}`);
    const provinceData = await resProvince.json();
    let provinceList = Array.isArray(provinceData)
      ? provinceData
      : provinceData.data && Array.isArray(provinceData.data)
      ? provinceData.data
      : [];

    if (provinceList.length > 0) {
      provinces.value = provinceList.map((p) => ({
        code: p.provinceid || p.id || p.code,
        name: p.province || p.name || p.province_name,
      }));
    }
  } catch (err) {
    console.error("❌ Failed to fetch provinces:", err);
  }
});

watch(
  allitems,
  (newItems) => {
    if (newItems && newItems.length > 0) {
      filteredData.value = processTaxiItems(newItems);
    }
  },
  { deep: true }
);

watch(selectedProvince, async (provinceId) => {
  selectedDistrict.value = null;
  districtsForSelectedProvince.value = [];
  if (!provinceId) return;

  try {
    const res = await fetch("http://localhost:5151/api/district/selectbyprovinceid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provinceid: provinceId }),
    });
    if (!res.ok) throw new Error(`District API failed: ${res.status}`);
    const districtData = await res.json();
    let districtList = Array.isArray(districtData)
      ? districtData
      : districtData.data && Array.isArray(districtData.data)
      ? districtData.data
      : [];

    if (districtList.length > 0) {
      districtsForSelectedProvince.value = districtList.map((d) => ({
        code: d.districtid || d.id || d.code,
        name: d.district || d.name || d.district_name,
      }));
    }
  } catch (err) {
    console.error("❌ Failed to fetch districts:", err);
  }
});

async function queryByLocation() {
  if (!selectedProvince.value || !selectedDistrict.value) return;
  try {
    const res = await fetch(
      "http://localhost:5151/api/taxi/selectbyprovinceanddistrictid",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provinceid: selectedProvince.value,
          districtid: selectedDistrict.value,
        }),
      }
    );
    if (!res.ok) throw new Error(`Search API failed: ${res.status}`);
    const responseData = await res.json();
    if (responseData.status && Array.isArray(responseData.data)) {
      filteredData.value = processTaxiItems(responseData.data);
      if (filteredData.value.length === 0) alert("ບໍ່ພົບລົດແທັກຊີ່ໃນເຂດທີ່ເລືອກ");
    } else {
      filteredData.value = [];
    }
  } catch (err) {
    console.error("❌ Failed to fetch taxis by location:", err);
    alert("ເກີດຂໍ້ຜິດພາດໃນການຄົ້ນຫາ: " + err.message);
  }
}

watch(searchQuery, async (val) => {
  if (!val) {
    filteredData.value = processTaxiItems(allitems.value);
    return;
  }
  try {
    const res = await fetch("http://localhost:5151/api/taxi/searchbyname", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: val }),
    });
    const responseData = await res.json();
    if (responseData.status && Array.isArray(responseData.data)) {
      filteredData.value = processTaxiItems(responseData.data);
    } else {
      filteredData.value = [];
    }
  } catch (err) {
    console.error("❌ Failed to search taxis:", err);
    filteredData.value = [];
  }
});

function openCommentDialog() {
  commentDialog.value = true;
  telephoneError.value = false;
  commentError.value = false;
}

function submitComment() {
  telephoneError.value = !telephone.value.trim();
  commentError.value = !comment.value.trim();
  if (telephoneError.value || commentError.value) return;
  telephone.value = "";
  comment.value = "";
  commentDialog.value = false;
}

function openZoom(item, index) {
  zoomItem.value = item;
  zoomSlide.value = index;
  zoomDialog.value = true;
  isZoomPlaying.value = true;
}

function toggleZoomAutoplay() {
  isZoomPlaying.value = !isZoomPlaying.value;
}

// ✅ NEW: Call phone function — triggers native phone dialer
function callPhone(tel) {
  if (!tel) {
    alert("❌ ບໍ່ມີເບີໂທ");
    return;
  }
  // Strip all non-digit characters then open tel: link
  const cleanPhone = tel.replace(/\D/g, "");
  window.location.href = `tel:${cleanPhone}`;
}

// ✅ NEW: WhatsApp function — opens WhatsApp chat with +856 country code
function openWhatsApp(item) {
  if (!item.tel) {
    alert("❌ ບໍ່ມີເບີໂທ");
    return;
  }
  // Remove all non-digits, strip leading 0, prepend Laos country code 856
  const cleanPhone = item.tel.replace(/\D/g, "").replace(/^0+/, "");
  const message = encodeURIComponent("ສະບາຍດີ! ຂ້ອຍຕ້ອງການຈອງລົດ");
  const url = `https://wa.me/856${cleanPhone}?text=${message}`;
  window.open(url, "_blank");
}

function handleImageError(event) {
  const imgSrc = event.target.src;
  if (!imgSrc.includes("/uploads/")) {
    event.target.src = imageBaseUrl + "uploads/" + imgSrc.split("/").pop();
  } else if (!imgSrc.includes("/images/")) {
    event.target.src = imageBaseUrl + "images/" + imgSrc.split("/").pop();
  } else {
    event.target.src =
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="20"%3ENo Image%3C/text%3E%3C/svg%3E';
  }
}
</script>

<style scoped>
.video-hero-section {
  position: relative;
  height: 500px;
  overflow: hidden;
}

.video-carousel {
  border-radius: 0;
}

.video-item {
  position: relative;
  height: 500px;
}

.video-iframe {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.6)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
}

.overlay-content {
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.video-arrow {
  z-index: 3;
}

.sound-toggle {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 2;
}

.search-section {
  margin-top: -40px;
  position: relative;
  z-index: 10;
}

.taxi-card {
  height: 100%;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.taxi-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
}

.image-carousel-wrapper {
  position: relative;
  overflow: hidden;
}

.taxi-image {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.taxi-card:hover .taxi-image {
  transform: scale(1.05);
}

.image-counter {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  z-index: 2;
  backdrop-filter: blur(4px);
}

.carousel-arrow {
  margin: 0 8px;
  opacity: 0;
  transition: opacity 0.3s;
}

.taxi-card:hover .carousel-arrow {
  opacity: 1;
}

.taxi-name {
  color: #1976d2;
  line-height: 1.4;
  min-height: 2em;
}

.pricing-section {
  border-left: 3px solid #4caf50;
  padding-left: 12px;
}

.contact-link {
  text-decoration: none;
  font-weight: 500;
}

.contact-link:hover {
  text-decoration: underline;
}

.details-expanded {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.zoom-dialog-card {
  border-radius: 16px !important;
  overflow: hidden;
}

.zoom-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.zoom-carousel-wrapper {
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
  min-height: 600px;
}

.zoom-image-main {
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.zoom-image-main:hover {
  transform: scale(1.02);
}

.zoom-image-counter {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}

.zoom-play-control {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 10;
}

.zoom-play-control .v-btn {
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.9) !important;
  transition: all 0.3s ease;
}

.zoom-play-control .v-btn:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 1) !important;
}

.zoom-nav-btn {
  opacity: 0.95;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.9) !important;
}

.zoom-nav-btn:hover {
  opacity: 1;
  transform: scale(1.15);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
}

@media (max-width: 960px) {
  .zoom-carousel-wrapper {
    padding: 16px !important;
  }
  .zoom-header {
    flex-direction: column;
    align-items: flex-start !important;
  }
  .zoom-header .v-avatar {
    margin-bottom: 12px;
  }
}

@media (max-width: 600px) {
  .zoom-carousel-wrapper {
    padding: 12px !important;
  }
  .zoom-image-counter {
    top: 12px;
    right: 12px;
  }
  .zoom-image-counter .v-chip {
    font-size: 0.75rem;
  }
}
</style>