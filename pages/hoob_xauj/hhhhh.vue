<template>
  <v-app fluid>
    <!-- Top Auto Carousel -->
    <v-container class="pa-0 bg-grey-lighten-4">
     
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
            model-value="true"
            persistent
            class="align-center justify-center"
            scrim="black"
            opacity="0.3"
          >
            <div class="text-center text-white px-4">
              <h1 class="text-h3 font-weight-black mb-2 d-none d-sm-block">
                ບໍລິການລົດແທັກຊີ່
              </h1>
              <p class="text-h6 font-weight-light">
                ສະດວກ, ວ່ອງໄວ, ແລະ ປອດໄພທຸກການເດີນທາງ
              </p>
            </div>
          </v-overlay>
        </v-carousel-item>
      </v-carousel>
    </section>
    </v-container>

    <v-divider class="my-4" />

    <v-container class="pa-4">
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          <!-- Search Bar -->
          <v-text-field
            v-model="searchQuery"
            placeholder="Search by name, type, location..."
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-magnify"
            clearable
            hide-details
            class="mb-3"
          >
            <template #append>
              <v-btn
                color="primary"
                size="large"
                @click="handleSearch"
                class="text-none"
              >
                <v-icon class="mr-1">mdi-magnify</v-icon>
                Search
              </v-btn>
            </template>
          </v-text-field>

          <!-- Location Filters -->
          <v-row class="mt-2">
            <v-col cols="12" sm="4">
              <v-select
                v-model="selectedProvince"
                :items="provinces"
                label="Select Province"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-map-marker"
                clearable
                hide-details
                @update:model-value="onProvinceChange"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                v-model="selectedDistrict"
                :items="districts"
                label="Select District"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-map-marker-outline"
                clearable
                hide-details
                :disabled="!selectedProvince"
                @update:model-value="onDistrictChange"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                v-model="selectedVillage"
                :items="villages"
                label="Select Village"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-home-map-marker"
                clearable
                hide-details
                :disabled="!selectedDistrict"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- Loading State -->
    <v-container v-if="loading">
      <v-row justify="center" class="py-16">
        <v-col cols="12" class="text-center">
          <v-progress-circular indeterminate color="primary" size="64" />
          <p class="mt-4 text-h6">ກຳລັງໂຫລດ...</p>
        </v-col>
      </v-row>
    </v-container>

    <!-- Error State -->
    <v-container v-else-if="error">
      <v-row justify="center" class="py-10">
        <v-col cols="12" md="6">
          <v-alert
            type="error"
            variant="tonal"
            border="start"
            :text="error"
            icon="mdi-alert-circle"
          >
            <template #append>
              <v-btn
                color="error"
                variant="outlined"
                prepend-icon="mdi-refresh"
                :loading="refreshing"
                @click="handleRefresh"
              >
                ລອງໃໝ່
              </v-btn>
            </template>
          </v-alert>
        </v-col>
      </v-row>
    </v-container>

    <!-- Main Content -->
    <v-container v-else fluid class="pa-4">
      <!-- ✅ Empty State -->
      <v-row v-if="allHoobXauj.length === 0" justify="center" class="py-16">
        <v-col cols="12" sm="8" md="4" class="text-center">
          <v-sheet
            rounded="xl"
            color="grey-lighten-4"
            class="pa-10 d-flex flex-column align-center"
          >
            <v-icon size="80" color="grey-lighten-1">
              mdi-store-off-outline
            </v-icon>

            <p class="text-h6 font-weight-medium mt-5 mb-1">ບໍ່ມີຂໍ້ມູນ</p>
            <p class="text-body-2 text-medium-emphasis mb-6">
              ບໍ່ພົບຂໍ້ມູນຫ້ອງແຖວໃນຂະນະນີ້
            </p>

            <v-btn
              color="primary"
              variant="tonal"
              size="large"
              rounded="lg"
              prepend-icon="mdi-refresh"
              :loading="refreshing"
              @click="handleRefresh"
            >
              ໂຫລດໃໝ່
            </v-btn>
          </v-sheet>
        </v-col>
      </v-row>

      <!-- Product Grid -->
      <v-row v-else>
        <v-col
          v-for="(item, index) in allHoobXauj"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
        >
          <v-card class="d-flex flex-column" elevation="1" rounded="lg" hover>
            <!-- Product Image -->
            <v-img
              :src="item.image[0] || '/favicon.ico'"
              height="200"
              cover
              class="rounded-t-lg"
              style="cursor: pointer"
              @click="openImageDialog(item.image)"
            >
              <v-chip
                v-if="item.image.length > 1"
                size="small"
                color="black"
                variant="flat"
                class="ma-2 position-absolute"
                style="bottom: 8px; right: 8px; opacity: 0.8"
                prepend-icon="mdi-camera"
              >
                {{ item.image.length }}
              </v-chip>
            </v-img>

            <!-- Product Info -->
            <v-card-text class="flex-grow-1 pa-3">
              <p class="text-h6 mb-2">{{ item.dormantalname }}</p>

              <!-- Price -->
              <div class="d-flex align-center mb-1">
                <span class="text-h6 font-weight-bold text-primary">
                  {{ item.price2 }}
                </span>
                <span
                  v-if="Number(item.price1) > 0"
                  class="text-caption text-decoration-line-through text-medium-emphasis ml-2"
                >
                  {{ item.price1 }}
                </span>
              </div>

              <!-- Location -->
              <div class="d-flex align-center text-body-2 text-medium-emphasis">
                <v-icon size="16" color="red" class="mr-1"
                  >mdi-map-marker</v-icon
                >
                {{ item.province }}, {{ item.district }}
              </div>
            </v-card-text>

            <v-card-actions class="pa-3 pt-0">
              <v-btn
                variant="tonal"
                color="primary"
                size="small"
                block
                prepend-icon="mdi-eye"
                @click.stop="showDetailsDialog(item)"
              >
                ເບີ່ງລາຍລະອຽດເພີ່ມເຕີມ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- ================ Top Brand Section ================ -->
    <v-divider class="my-4" />

    <v-container>
      <v-row align="center" class="mb-2">
        <v-col cols="auto">
          <v-icon color="primary">mdi-plus-circle</v-icon>
        </v-col>
        <v-col>
          <span class="text-h5">ແນະນຳເບຣນດອື່ນໆ</span>
        </v-col>
      </v-row>
    </v-container>

    <v-divider class="my-4" />

    <v-container class="pa-4 bg-grey-lighten-3">
      <v-carousel
        cycle
        show-arrows
        hide-delimiters
        interval="3000"
        height="300px"
      >
        <v-carousel-item v-for="(item, index) in topData" :key="index">
          <v-img
            :src="item.image[0] || '/placeholder.jpg'"
            class="fill-height"
            cover
          />
        </v-carousel-item>
      </v-carousel>
    </v-container>

    <v-divider class="my-4" />

    <TopDataCard :topData="topData" />

    <!-- ================ Image Dialog ================ -->
    <v-dialog v-model="showDialog" max-width="900px">
      <v-card rounded="xl">
        <v-toolbar color="primary" flat>
          <v-toolbar-title class="text-white">
            ຮູບພາບບັນຍາກາດຂອງຫ້ອງແຖວ
          </v-toolbar-title>
          <v-spacer />
          <v-btn icon variant="text" @click="showDialog = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="pa-4">
          <v-carousel
            v-if="selectedImages.length > 0"
            v-model="currentIndex"
            hide-delimiter-background
            height="500"
            cycle
            interval="3000"
            show-arrows
          >
            <v-carousel-item
              v-for="(img, index) in selectedImages"
              :key="index"
            >
              <v-img :src="img" height="500" contain />
            </v-carousel-item>
          </v-carousel>

          <!-- Thumbnails -->
          <v-row justify="center" class="mt-3" no-gutters>
            <v-col
              v-for="(img, index) in selectedImages"
              :key="index"
              cols="auto"
              class="ma-1"
            >
              <v-img
                :src="img"
                height="60"
                width="80"
                cover
                rounded="sm"
                :class="
                  currentIndex === index
                    ? 'border-success border-md'
                    : 'opacity-60'
                "
                style="cursor: pointer"
                @click="currentIndex = index"
              />
            </v-col>
          </v-row>

          <p class="text-center text-medium-emphasis mt-3 text-body-2">
            {{ currentIndex + 1 }} / {{ selectedImages.length }}
          </p>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- ================ Details Dialog ================ -->
    <v-dialog v-model="showDetails" max-width="900px" scrollable>
      <v-card>
        <v-toolbar color="primary" flat>
          <v-spacer />
          <v-toolbar-title class="text-white text-h5">
            ລາຍລະອຽດຂອງຫ້ອງແຖວ
          </v-toolbar-title>
          <v-spacer />
          <v-btn icon variant="text" @click="showDetails = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="pa-6" v-if="detailItem">
          <!-- Image Gallery -->
          <v-carousel
            v-if="detailItem.image && detailItem.image.length > 0"
            height="350"
            cycle
            interval="3000"
            show-arrows
            class="mb-2 rounded-lg"
          >
            <v-carousel-item
              v-for="(img, index) in detailItem.image"
              :key="index"
              @click="openImageDialog(detailItem.image, index)"
              style="cursor: pointer"
            >
              <v-img :src="img" height="350" cover />
            </v-carousel-item>
          </v-carousel>

          <p class="text-center text-caption text-medium-emphasis mb-4">
            <v-icon size="small">mdi-cursor-pointer</v-icon>
            ຄລິກຮູບເພື່ອຂະຫຍາຍ
          </p>

          <!-- Price -->
          <v-card variant="tonal" color="grey" class="mb-4 pa-4" rounded="lg">
            <p class="text-h6 mb-3">+ ລາຍລະອຽດລາຄາ:</p>
            <div v-if="Number(detailItem.price1) > 0" class="mb-2">
              <span class="font-weight-bold mr-2">ລາຄາເຕັມ:</span>
              <span class="text-red text-decoration-line-through">{{
                detailItem.price1
              }}</span>
            </div>
            <div>
              <span class="font-weight-bold mr-2">ລາຄາປັດຈຸບັນ:</span>
              <span class="text-green font-weight-bold text-h6">{{
                detailItem.price2
              }}</span>
            </div>
          </v-card>

          <!-- Room Info -->
          <v-card variant="outlined" class="mb-4 pa-4" rounded="lg">
            <p class="text-h6 mb-3">+ ລາຍລະອຽດຫ້ອງແຖວ:</p>
            <v-row>
              <v-col cols="12" sm="4" v-if="detailItem.type">
                <span class="font-weight-bold">ປະເພດຫ້ອງແຖວ:</span>
                <v-chip size="small" color="primary" class="ml-2">
                  {{ detailItem.type }}
                </v-chip>
              </v-col>
              <v-col cols="12" sm="4" v-if="detailItem.totalroom">
                <span class="font-weight-bold">ຫ້ອງທັງໝົດ:</span>
                <span class="ml-2 text-red font-weight-bold">{{
                  detailItem.totalroom
                }}</span>
              </v-col>
              <v-col cols="12" sm="4">
                <span class="font-weight-bold">ຫ້ອງເຕັມ:</span>
                <span class="ml-2 text-orange font-weight-bold">{{
                  detailItem.activeroom || 0
                }}</span>
              </v-col>
              <v-col cols="12" sm="4">
                <span class="font-weight-bold">ຫ້ອງຫວ່າງ:</span>
                <span class="ml-2 text-green font-weight-bold">{{
                  availableRooms
                }}</span>
              </v-col>
            </v-row>

            <v-divider class="my-3" />

            <p class="text-h6 mb-2">+ ລາຍລະອຽດ:</p>
            <v-divider class="mb-3" />
            <p class="text-body-1 text-red font-weight-bold">
              {{ detailItem.moredetail }}
            </p>
          </v-card>

          <!-- Location -->
          <v-card variant="outlined" class="mb-4 pa-4" rounded="lg">
            <p class="text-h6 mb-2 d-flex align-center">
              <v-icon color="red" class="mr-2">mdi-map-marker</v-icon>
              Location
            </p>
            <v-divider class="mb-3" />
            <v-row>
              <v-col cols="12" sm="4">
                <p class="font-weight-bold mb-1">ແຂວງ:</p>
                <p>{{ detailItem.province }}</p>
              </v-col>
              <v-col cols="12" sm="4">
                <p class="font-weight-bold mb-1">ເມືອງ:</p>
                <p>{{ detailItem.district }}</p>
              </v-col>
              <v-col cols="12" sm="4">
                <p class="font-weight-bold mb-1">ບ້ານ:</p>
                <p>
                  {{
                    detailItem.villages && detailItem.villages.length > 0
                      ? detailItem.villages.join(", ")
                      : "N/A"
                  }}
                </p>
              </v-col>
            </v-row>
          </v-card>

          <!-- Contact -->
          <v-card variant="tonal" color="blue" class="mb-4 pa-4" rounded="lg">
            <p class="text-h6 mb-3">
              <v-icon color="primary" class="mr-2">mdi-phone</v-icon>
              ຂໍ້ມູນຕິດຕໍ່
            </p>
            <v-row>
              <v-col cols="12" sm="6" v-if="detailItem.contactnumber">
                <v-btn
                  :href="'tel:' + detailItem.contactnumber"
                  variant="tonal"
                  color="blue"
                  prepend-icon="mdi-phone"
                  block
                >
                  {{ detailItem.contactnumber }}
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6" v-if="detailItem.tel">
                <v-btn
                  :href="getWhatsAppLink(detailItem.tel)"
                  target="_blank"
                  variant="tonal"
                  color="green"
                  prepend-icon="mdi-whatsapp"
                  block
                >
                  {{ detailItem.tel }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card>

          <!-- Video -->
          <v-card
            v-if="detailItem.locationvideo"
            variant="outlined"
            class="pa-4"
            rounded="lg"
          >
            <p class="text-h6 mb-3">
              <v-icon color="primary" class="mr-2">mdi-video</v-icon>
              Video qhia kev
            </p>
            <v-btn
              :href="detailItem.locationvideo"
              target="_blank"
              color="primary"
              variant="tonal"
              prepend-icon="mdi-play-circle"
            >
              Watch Location Video
            </v-btn>
          </v-card>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn color="primary" variant="flat" @click="showDetails = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
// import { useHoobXauj } from "~/stores/hoobXauj";
const {
  allHoobXauj,
  loading,
  error,
  video1,
  topData,
  fetchHoobXauj,
  channelimage,
  qr,
} = useHoobXauj();

// ── image dialog ──────────────────────────────────────
const showDialog = ref(false);
const selectedImages = ref([]);
const currentIndex = ref(0);

// ── details dialog ────────────────────────────────────
const showDetails = ref(false);
const detailItem = ref(null);
const carouselIndex = ref(0);

// ── refresh ───────────────────────────────────────────
const refreshing = ref(false);

function openImageDialog(images, startIndex = 0) {
  selectedImages.value = images;
  currentIndex.value = startIndex;
  showDialog.value = true;
}

function showDetailsDialog(item) {
  detailItem.value = item;
  showDetails.value = true;
}

async function handleRefresh() {
  refreshing.value = true;
  try {
    await fetchHoobXauj();
  } catch (err) {
    console.error("Refresh failed:", err);
  } finally {
    refreshing.value = false;
  }
}

// ── room helpers ──────────────────────────────────────
const availableRooms = computed(() => {
  if (!detailItem.value) return 0;
  return (detailItem.value.totalroom || 0) - (detailItem.value.activeroom || 0);
});

// ── phone helpers ─────────────────────────────────────
const cleanPhoneNumber = (phone) => {
  if (!phone) return "";
  const cleaned = String(phone).replace(/\D/g, "");
  if (cleaned.startsWith("856")) return cleaned;
  if (cleaned.startsWith("20")) return "856" + cleaned;
  return "856" + cleaned;
};

const getWhatsAppLink = (phone) => {
  const cleanedPhone = cleanPhoneNumber(phone);
  if (!cleanedPhone || cleanedPhone.length < 11) return "#";

  const message =
    `ສະບາຍດີ 👋\nຂ້ອຍສົນໃຈຫ້ອງແຖວນີ້:\n` +
    `  ລະຫັດ: ${detailItem.value?.id || "N/A"}\n` +
    `🏨 ຊື່: ${detailItem.value?.dormantalname || "N/A"}\n` +
    `🛏 ຫ້ອງວ່າງ: ${availableRooms.value || 0}\n` +
    `💰 ລາຄາ: ${detailItem.value?.price2 || "N/A"} ກີບ\n` +
    `📍 ສະຖານທີ່: ${detailItem.value?.province || ""}, ${
      detailItem.value?.district || ""
    }\n\n` +
    `ກະລຸນາໃຫ້ຂໍ້ມູນເພີ່ມເຕີມ. ຂອບໃຈ!`;

  return `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`;
};

// ── banner ────────────────────────────────────────────
const isMuted = ref(true);

const bannerMode = computed(() => {
  if (video1.value) return "video";
  if (channelimage.value?.length > 0) return "image";
  return "none";
});

const bannerVideoSrc = computed(() => {
  if (!video1.value) return "";
  const ytMatch = video1.value.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/
  );
  if (ytMatch) {
    return (
      `https://www.youtube.com/embed/${ytMatch[1]}` +
      `?autoplay=1&mute=${isMuted.value ? 1 : 0}&loop=1&playlist=${ytMatch[1]}`
    );
  }
  return video1.value;
});

const bannerImages = computed(() => channelimage.value ?? []);

// ── lifecycle ─────────────────────────────────────────
onMounted(async () => {
  try {
    await fetchHoobXauj();
    console.log("✅ video1:", video1.value);
    console.log("✅ channelimage:", channelimage.value);
    console.log("✅ bannerMode:", bannerMode.value);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
});
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
.z-index-2 {
  z-index: 2;
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
  .mt-n16 {
    margin-top: 30px !important;
  }
  .text-h3 {
    font-size: 1.75rem !important;
  }
}
.d-flex[style*="overflow-x"]::-webkit-scrollbar {
  display: none;
}
</style>
<!-- <script setup>
import { ref, computed, onMounted } from "vue";

const {
  allHoobXauj,
  loading,
  error,
  pagination,
  video1,
  topData,
  fetchHoobXauj,
  channelimage,
  qr,
} = useHoobXauj();

// image dialog
const showDialog = ref(false);
const selectedImages = ref([]);
const currentIndex = ref(0);

// details dialog
const showDetails = ref(false);
const detailItem = ref(null);
const carouselIndex = ref(0);

// refresh
const refreshing = ref(false);

function openImageDialog(images, startIndex = 0) {
  selectedImages.value = images;
  currentIndex.value = startIndex;
  showDialog.value = true;
}

function showDetailsDialog(item) {
  detailItem.value = item;
  showDetails.value = true;
}

async function handleRefresh() {
  refreshing.value = true;
  try {
    await fetchHoobXauj();
  } catch (err) {
    console.error("Refresh failed:", err);
  } finally {
    refreshing.value = false;
  }
}

const availableRooms = computed(() => {
  if (!detailItem.value) return 0;
  return (detailItem.value.totalroom || 0) - (detailItem.value.activeroom || 0);
});

const cleanPhoneNumber = (phone) => {
  if (!phone) return "";
  const cleaned = String(phone).replace(/\D/g, "");
  if (cleaned.startsWith("856")) return cleaned;
  if (cleaned.startsWith("20")) return "856" + cleaned;
  return "856" + cleaned;
};

const getWhatsAppLink = (phone) => {
  const cleanedPhone = cleanPhoneNumber(phone);
  if (!cleanedPhone || cleanedPhone.length < 11) return "#";

  const message = `ສະບາຍດີ 👋
ຂ້ອຍສົນໃຈຫ້ອງແຖວນີ້:
  ລະຫັດ: ${detailItem.value?.id || "N/A"}
🏨 ຊື່: ${detailItem.value?.dormantalname || "N/A"}
🛏 ຫ້ອງວ່າງ: ${availableRooms.value || 0}
💰 ລາຄາ: ${detailItem.value?.price2 || "N/A"} ກີບ
📍 ສະຖານທີ່: ${detailItem.value?.province || ""}, ${
    detailItem.value?.district || ""
  }

ກະລຸນາໃຫ້ຂໍ້ມູນເພີ່ມເຕີມ. ຂອບໃຈ!`;

  return `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`;
};

onMounted(async () => {
  try {
    await fetchHoobXauj();
    console.log("Data fetched successfully=======:", video1.value);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
});

const isMuted = ref(true);

// Computed banner mode
const bannerMode = computed(() => {
  if (video1.value) return "video";
  if (channelimage.value && channelimage.value.length > 0) return "image";
  return "none";
});

// Convert YouTube/video URL to embeddable src
const bannerVideoSrc = computed(() => {
  if (!video1.value) return "";
  // Handle YouTube
  const ytMatch = video1.value.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/
  );
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=${
      isMuted.value ? 1 : 0
    }&loop=1&playlist=${ytMatch[1]}`;
  }
  return video1.value;
});

const bannerImages = computed(() => channelimage.value || []);
</script> -->
