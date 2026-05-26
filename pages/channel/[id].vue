<template>
  <v-container fluid class="pa-0 bg-grey-lighten-4">

    <!-- ── Banner ────────────────────────────────────────────────────── -->
    <section class="position-relative">
      <!-- No media -->
      <v-sheet
        v-if="bannerMode === 'none'"
        :height="smAndDown ? 140 : 320"
        color="grey-darken-3"
        class="d-flex align-center justify-center"
      >
        <div class="text-center">
          <v-icon :size="smAndDown ? 40 : 64" color="grey-darken-1">mdi-image-off-outline</v-icon>
        </div>
      </v-sheet>

      <!-- Video banner -->
      <div
        v-else-if="bannerMode === 'video'"
        class="position-relative"
        :style="`width:100%;height:${smAndDown ? 220 : 400}px;background:#000`"
      >
        <iframe
          :src="bannerVideoSrc"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          style="width:100%;height:100%;display:block"
        />
        <v-btn
          icon
          position="absolute"
          location="bottom left"
          class="ma-3 blur-btn"
          size="small"
          @click="isMuted = !isMuted"
        >
          <v-icon size="18">{{ isMuted ? "mdi-volume-off" : "mdi-volume-high" }}</v-icon>
        </v-btn>
      </div>

      <!-- Image carousel banner -->
      <v-carousel
        v-else-if="bannerMode === 'image'"
        :height="smAndDown ? 200 : 380"
        cycle
        hide-delimiter-background
        show-arrows="hover"
        interval="4000"
      >
        <v-carousel-item
          v-for="(img, i) in bannerImages"
          :key="i"
          cover
          :src="img"
        >
          <div
            v-if="!smAndDown && channelStore.channelName"
            class="fill-height d-flex align-end pa-4"
            style="background:linear-gradient(to top,rgba(0,0,0,.55) 0%,transparent 60%)"
          >
            <div class="text-white">
              <div class="text-h5 font-weight-black">{{ channelStore.channelName }}</div>
              <div v-if="channelStore.detail" class="text-body-2 opacity-80">{{ channelStore.detail }}</div>
            </div>
          </div>
        </v-carousel-item>
      </v-carousel>
    </section>

    <!-- ── Search Bar (compact) ───────────────────────────────────────── -->
    <v-sheet color="white" elevation="1" class="sticky-search">
      <v-container class="py-2 px-3">
        <!-- Row 1: search + filter toggle + question -->
        <div class="d-flex align-center ga-2">
          <v-text-field
            v-model="searchQuery"
            :placeholder="t('search_placeholder')"
            variant="outlined"
            rounded="pill"
            prepend-inner-icon="mdi-magnify"
            density="compact"
            hide-details
            clearable
            class="flex-grow-1 search-field"
            bg-color="grey-lighten-4"
          />
          <v-btn
            :icon="showFilter ? 'mdi-filter-off' : 'mdi-filter-variant'"
            :color="(selectedProvince || selectedDistrict) ? 'primary' : 'default'"
            variant="tonal"
            size="small"
            rounded="circle"
            @click="showFilter = !showFilter"
          />
          <v-btn
            icon="mdi-chat-question"
            color="primary"
            variant="flat"
            size="small"
            rounded="circle"
            @click="openCommentDialog"
          />
        </div>

        <!-- Row 2: province/district (expandable) -->
        <v-expand-transition>
          <div v-if="showFilter" class="mt-2 d-flex ga-2">
            <v-select
              v-model="selectedProvince"
              :items="provinces"
              :label="t('select_province')"
              item-title="name"
              item-value="code"
              variant="outlined"
              rounded="lg"
              density="compact"
              hide-details
              flat
              class="flex-grow-1"
            />
            <v-select
              v-model="selectedDistrict"
              :items="districtsForSelectedProvince"
              :label="t('select_district')"
              variant="outlined"
              rounded="lg"
              density="compact"
              hide-details
              flat
              class="flex-grow-1"
              :no-data-text="!selectedProvince ? t('select_province_first') : t('no_data')"
            />
          </div>
        </v-expand-transition>
      </v-container>
    </v-sheet>

    <!-- ── Product Grid ──────────────────────────────────────────────── -->
    <v-container class="px-2 px-md-3 pt-3">
      <!-- Loading -->
      <div v-if="loadings" class="text-center py-12">
        <v-progress-circular indeterminate color="primary" size="48" width="4" />
        <p class="mt-3 text-body-2 text-grey">{{ t("loading") }}</p>
      </div>

      <template v-else>
        <!-- Empty state -->
        <div v-if="filteredData.length === 0" class="text-center py-12">
          <v-icon size="64" color="grey-lighten-2">mdi-magnify-close</v-icon>
          <p class="text-h6 text-grey mt-3">{{ t("not_found") }}</p>
          <v-btn class="mt-4" color="primary" variant="tonal" rounded="lg" size="small" @click="resetFilter">
            {{ t("clear_search") }}
          </v-btn>
        </div>

        <!-- Product cards: 2-col mobile, 3-col desktop -->
        <v-row v-else dense class="ma-0">
          <v-col
            v-for="(item, index) in filteredData"
            :key="index"
            cols="6"
            sm="6"
            md="4"
            lg="3"
            class="pa-1"
          >
            <v-card
              rounded="xl"
              class="product-card h-100 d-flex flex-column overflow-hidden"
              elevation="0"
              border
              @click="openDetail(item)"
            >
              <!-- Image with overlays -->
              <div class="position-relative card-img-box">
                <v-img
                  :src="item.image[0]"
                  :height="smAndDown ? 150 : 200"
                  cover
                  class="card-img"
                >
                  <template v-slot:placeholder>
                    <div class="fill-height d-flex align-center justify-center bg-grey-lighten-3">
                      <v-icon size="36" color="grey-lighten-1">mdi-image</v-icon>
                    </div>
                  </template>
                  <!-- bottom gradient -->
                  <div class="img-bottom-grad" />
                </v-img>

                <!-- discount badge top-left -->
                <div
                  v-if="isNumericPrice(getItemPrice1(item)) && isNumericPrice(getItemPrice2(item)) && parsePrice(getItemPrice1(item)) > parsePrice(getItemPrice2(item))"
                  class="discount-badge"
                >
                  -{{ Math.round((1 - parsePrice(getItemPrice2(item)) / parsePrice(getItemPrice1(item))) * 100) }}%
                </div>

                <!-- photo count badge bottom-right -->
                <div v-if="item.image.length > 1" class="photo-badge">
                  <v-icon size="10">mdi-camera</v-icon>
                  {{ item.image.length }}
                </div>
              </div>

              <!-- Info -->
              <div class="px-2 pt-2 pb-1 flex-grow-1 d-flex flex-column">
                <p class="card-title line-clamp-2 mb-1">{{ getItemName(item) }}</p>

                <!-- Numeric price -->
                <template v-if="isNumericPrice(getItemPrice1(item)) || isNumericPrice(getItemPrice2(item))">
                  <div class="d-flex align-center ga-1 flex-wrap">
                    <span class="price-main">
                      {{ isNumericPrice(getItemPrice2(item)) ? parsePrice(getItemPrice2(item)).toLocaleString() : parsePrice(getItemPrice1(item)).toLocaleString() }}
                      <span class="price-cur">₭</span>
                    </span>
                    <span
                      v-if="isNumericPrice(getItemPrice1(item)) && isNumericPrice(getItemPrice2(item)) && parsePrice(getItemPrice1(item)) > parsePrice(getItemPrice2(item))"
                      class="price-old"
                    >{{ parsePrice(getItemPrice1(item)).toLocaleString() }}</span>
                  </div>
                </template>
                <template v-else-if="getItemPrice1(item) || getItemPrice2(item)">
                  <span class="price-ask">{{ getItemPrice1(item) || getItemPrice2(item) }}</span>
                </template>
              </div>

              <!-- Cart / action button -->
              <div class="px-2 pb-2">
                <template v-if="isNumericPrice(getItemPrice1(item)) || isNumericPrice(getItemPrice2(item))">
                  <div v-if="cart[item.id]" class="qty-row">
                    <v-btn icon="mdi-minus" size="x-small" variant="outlined" color="primary" rounded @click.stop="decrementQty(item.id)" />
                    <span class="qty-num">{{ cart[item.id] }}</span>
                    <v-btn icon="mdi-plus" size="x-small" variant="flat" color="primary" rounded @click.stop="incrementQty(item.id)" />
                  </div>
                  <v-btn
                    v-else block color="primary" variant="flat"
                    rounded="lg" size="small" class="text-none font-weight-bold cart-btn"
                    @click.stop="addToCart(item)"
                  >
                    <v-icon size="14" start>mdi-cart-plus</v-icon>
                    {{ t("add_to_cart") }}
                  </v-btn>
                </template>
                <v-btn
                  v-else block color="#25D366" variant="flat"
                  rounded="lg" size="small" class="text-none font-weight-bold cart-btn"
                  @click.stop="openWhatsApp(item)"
                >
                  <v-icon size="14" start>mdi-whatsapp</v-icon>
                  WhatsApp
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Pagination -->
        <div v-if="pagination && pagination.totalPages > 1" class="d-flex justify-center mt-6 mb-2">
          <v-pagination
            v-model="currentPage"
            :length="pagination.totalPages"
            rounded="lg"
            size="small"
            @update:model-value="onPageChange"
          />
        </div>
      </template>

      <!-- TopData recommended brands -->
      <template v-if="topData && topData.length > 0">
        <v-divider class="my-4" />
        <div class="d-flex align-center mb-3 px-1">
          <v-icon color="primary" class="mr-2">mdi-star-circle</v-icon>
          <span class="text-subtitle-1 font-weight-bold">{{ t("recommended_brands") }}</span>
        </div>
        <TopDataCard :topData="topData" />
      </template>
    </v-container>

    <!-- ── Gallery Dialog ────────────────────────────────────────────── -->
    <v-dialog
      v-model="galleryDialog"
      :max-width="smAndDown ? '100%' : '960'"
      :fullscreen="smAndDown"
      transition="dialog-transition"
    >
      <v-card
        rounded="xl"
        color="grey-darken-4"
        elevation="24"
        class="overflow-hidden"
      >
        <div class="d-flex align-center justify-space-between pa-3 pa-sm-4">
          <div class="d-flex align-center ga-2 min-width-0">
            <v-icon color="white" size="20">mdi-image-multiple</v-icon>
            <span class="text-white font-weight-bold text-body-1 text-truncate">
              {{ getItemName(galleryItem) || t("no_media") }}
            </span>
          </div>
          <div class="d-flex align-center ga-2 flex-shrink-0">
            <v-chip
              color="grey-darken-2"
              variant="flat"
              size="small"
              class="text-white"
            >
              {{ gallerySlide + 1 }} / {{ galleryItem.image?.length || 0 }}
            </v-chip>
            <v-btn
              icon
              size="small"
              variant="text"
              color="white"
              @click="galleryDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>

        <v-carousel
          v-model="gallerySlide"
          :height="galleryHeight"
          hide-delimiters
          show-arrows
          class="gallery-carousel"
        >
          <template v-slot:prev="{ props }">
            <v-btn
              v-bind="props"
              icon
              size="large"
              elevation="6"
              class="gallery-nav-btn"
            >
              <v-icon size="30" color="grey-darken-3">mdi-chevron-left</v-icon>
            </v-btn>
          </template>
          <template v-slot:next="{ props }">
            <v-btn
              v-bind="props"
              icon
              size="large"
              elevation="6"
              class="gallery-nav-btn"
            >
              <v-icon size="30" color="grey-darken-3">mdi-chevron-right</v-icon>
            </v-btn>
          </template>
          <v-carousel-item
            v-for="(img, i) in galleryItem.image"
            :key="`g-${i}`"
          >
            <v-img
              :src="img"
              :height="galleryHeight"
              contain
              class="bg-grey-darken-4"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="white" size="48" />
                </v-row>
              </template>
            </v-img>
          </v-carousel-item>
        </v-carousel>

        <div
          v-if="galleryItem.image && galleryItem.image.length > 1"
          class="thumbnail-strip pa-3 d-flex ga-2 justify-center"
        >
          <div
            v-for="(img, i) in galleryItem.image"
            :key="`t-${i}`"
            class="thumbnail-wrapper"
            :class="{ 'thumbnail-active': gallerySlide === i }"
            @click="gallerySlide = i"
          >
            <v-img
              :src="img"
              width="64"
              height="64"
              cover
              class="rounded-lg"
              style="cursor: pointer"
            />
          </div>
        </div>
      </v-card>
    </v-dialog>

    <!-- ── Detail Bottom Sheet ───────────────────────────────────────── -->
    <v-dialog
      v-model="detailDialog"
      :max-width="smAndDown ? '100%' : '520'"
      :fullscreen="false"
      transition="dialog-bottom-transition"
      scrollable
      class="detail-dialog"
    >
      <v-card
        :rounded="smAndDown ? 'xl xl 0 0' : 'xl'"
        elevation="8"
        class="detail-sheet"
      >
        <!-- drag handle (mobile) -->
        <div class="d-flex justify-center pt-2 pb-0">
          <div class="drag-handle" />
        </div>

        <!-- Image carousel compact -->
        <div class="position-relative detail-img-wrap">
          <v-carousel
            v-if="detailItem.image && detailItem.image.length > 0"
            v-model="detailSlide"
            height="220"
            hide-delimiters
            show-arrows="hover"
            cycle
            interval="4000"
          >
            <v-carousel-item v-for="(img, i) in detailItem.image" :key="`di-${i}`">
              <v-img :src="img" height="220" cover @click="openGalleryFromDetail(i)" style="cursor:zoom-in" />
            </v-carousel-item>
          </v-carousel>

          <!-- close button top-right -->
          <v-btn
            icon size="small" variant="flat" color="white"
            class="detail-close-btn" @click="detailDialog = false"
          >
            <v-icon size="18" color="grey-darken-3">mdi-close</v-icon>
          </v-btn>

          <!-- image count -->
          <div v-if="detailItem.image && detailItem.image.length > 1" class="detail-photo-count">
            <v-icon size="11">mdi-camera</v-icon> {{ detailSlide + 1 }}/{{ detailItem.image.length }}
          </div>
        </div>

        <!-- Content area -->
        <v-card-text class="pa-3 pa-md-4">

          <!-- Name + discount row -->
          <div class="d-flex align-start justify-space-between mb-2">
            <div class="text-subtitle-1 font-weight-bold flex-grow-1 mr-2" style="line-height:1.3">
              {{ getItemName(detailItem) }}
            </div>
            <v-chip
              v-if="isNumericPrice(getItemPrice1(detailItem)) && isNumericPrice(getItemPrice2(detailItem)) && parsePrice(getItemPrice1(detailItem)) > parsePrice(getItemPrice2(detailItem))"
              color="red" variant="flat" size="x-small" class="font-weight-bold flex-shrink-0"
            >
              -{{ Math.round((1 - parsePrice(getItemPrice2(detailItem)) / parsePrice(getItemPrice1(detailItem))) * 100) }}%
            </v-chip>
          </div>

          <!-- Price row -->
          <div class="d-flex align-center ga-2 mb-3 flex-wrap">
            <template v-if="isNumericPrice(getItemPrice1(detailItem)) || isNumericPrice(getItemPrice2(detailItem))">
              <span class="text-h6 font-weight-black text-primary">
                {{ isNumericPrice(getItemPrice2(detailItem)) ? parsePrice(getItemPrice2(detailItem)).toLocaleString() : parsePrice(getItemPrice1(detailItem)).toLocaleString() }} ₭
              </span>
              <span
                v-if="isNumericPrice(getItemPrice1(detailItem)) && isNumericPrice(getItemPrice2(detailItem)) && parsePrice(getItemPrice1(detailItem)) > parsePrice(getItemPrice2(detailItem))"
                class="text-body-2 text-decoration-line-through text-grey"
              >{{ parsePrice(getItemPrice1(detailItem)).toLocaleString() }} ₭</span>
            </template>
            <template v-else-if="getItemPrice1(detailItem) || getItemPrice2(detailItem)">
              <v-chip color="success" variant="tonal" size="small">
                <v-icon start size="13">mdi-cash</v-icon>
                {{ getItemPrice1(detailItem) || getItemPrice2(detailItem) }}
              </v-chip>
            </template>
          </div>

          <!-- Detail / type row compact -->
          <div v-if="getItemDetail(detailItem) || getItemType(detailItem)" class="detail-info-box mb-3">
            <div v-if="getItemType(detailItem)" class="d-flex align-center ga-2 mb-1">
              <v-icon size="14" color="grey">mdi-tag-outline</v-icon>
              <span class="text-caption text-grey-darken-2">{{ getItemType(detailItem) }}</span>
            </div>
            <div v-if="getItemDetail(detailItem)" class="d-flex align-start ga-2">
              <v-icon size="14" color="grey" class="mt-0">mdi-text-box-outline</v-icon>
              <span class="text-caption text-grey-darken-2 detail-clamp">{{ getItemDetail(detailItem) }}</span>
            </div>
          </div>

          <!-- Cart qty or add -->
          <div v-if="isNumericPrice(getItemPrice1(detailItem)) || isNumericPrice(getItemPrice2(detailItem))" class="mb-3">
            <div v-if="cart[detailItem.id]" class="qty-row-large">
              <v-btn icon="mdi-minus" variant="outlined" color="primary" size="small" rounded @click.stop="decrementQty(detailItem.id)" />
              <span class="text-h6 font-weight-bold px-4">{{ cart[detailItem.id] }}</span>
              <v-btn icon="mdi-plus" variant="flat" color="primary" size="small" rounded @click.stop="incrementQty(detailItem.id)" />
            </div>
            <v-btn
              v-else block color="primary" variant="flat" size="large"
              rounded="lg" class="text-none font-weight-bold"
              @click="addToCart(detailItem)"
            >
              <v-icon start>mdi-cart-plus</v-icon>
              {{ t("add_to_cart") }}
            </v-btn>
          </div>

          <!-- Call + WhatsApp row -->
          <v-row dense>
            <v-col cols="6">
              <v-btn block color="primary" variant="tonal" rounded="lg" size="default" class="text-none" @click="callPhone(detailItem.tel)">
                <v-icon start size="16">mdi-phone</v-icon>{{ t("call_btn") }}
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block color="#25D366" variant="flat" rounded="lg" size="default" class="text-none text-white" @click="openWhatsApp(detailItem)">
                <v-icon start size="16">mdi-whatsapp</v-icon>WhatsApp
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- ── Comment Dialog ────────────────────────────────────────────── -->
    <v-dialog
      v-model="commentDialog"
      max-width="450"
      transition="dialog-bottom-transition"
    >
      <v-card rounded="xl">
        <v-toolbar color="primary" flat>
          <v-toolbar-title class="font-weight-bold">{{
            t("comment_dialog_title")
          }}</v-toolbar-title>
          <v-btn icon @click="commentDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-6">
          <v-text-field
            v-model="telephone"
            :label="t('comment_subject')"
            variant="outlined"
            rounded="lg"
            class="mb-2"
          />
          <v-textarea
            v-model="comment"
            :label="t('comment_detail')"
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
            {{ t("comment_submit") }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useDisplay } from "vuetify";
import { useProductSellStore } from "@/stores/index";

const { smAndDown } = useDisplay();
const BASE_URL = "https://service.tsheb.la/api";

const {
  channels,
  topData,
  pagination,
  qr,
  channelimage,
  video1,
  loadings,
  errors,
  fetchChannelById,
} = useGetChannelById();

const { currentLang, t, langs } = useLanguage();
const store = useProductSellStore();
const route = useRoute();

// ── State ─────────────────────────────────────────────────────────────────────
const channelStore = ref({
  channelId: null,
  channelName: "",
  imageadvert: [],
  video1: "",
  detail: "",
  qr: "",
});

const filteredData = ref([]);
const baseData = ref([]);
const currentPage = ref(1);
const searchQuery = ref("");
const provinces = ref([]);
const districtsForSelectedProvince = ref([]);
const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const cart = ref({});

const galleryDialog = ref(false);
const galleryItem = ref({ image: [] });
const gallerySlide = ref(0);

const detailDialog = ref(false);
const detailItem = ref({ image: [] });
const detailSlide = ref(0);

const commentDialog = ref(false);
const telephone = ref("");
const comment = ref("");
const isMuted = ref(true);
const showFilter = ref(false);

// ── Computed ──────────────────────────────────────────────────────────────────
const galleryHeight = computed(() => (smAndDown.value ? 300 : 520));

const bannerMode = computed(() => {
  if (channelStore.value.video1) return "video";
  if (channelStore.value.imageadvert?.length > 0) return "image";
  return "none";
});

const bannerImages = computed(() => {
  const data = channelStore.value.imageadvert;
  return Array.isArray(data) ? data : data ? [data] : [];
});

const bannerVideoSrc = computed(() => {
  const id = extractYoutubeID(channelStore.value.video1);
  if (!id) return "";
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=${
    isMuted.value ? 1 : 0
  }&loop=1&playlist=${id}&rel=0`;
});

// ── Universal field helpers ───────────────────────────────────────────────────
const getItemName = (item) =>
  item?.creamname ||
  item?.dormantalname ||
  item?.housename ||
  item?.productname ||
  item?.name ||
  "";

const getItemDetail = (item) => item?.detail || item?.moredetail || "";
const getItemType = (item) => item?.type || item?.types || "";
const getItemPrice1 = (item) => item?.price1 || item?.Price1 || "";
const getItemPrice2 = (item) =>
  item?.price2 || item?.Price2 || item?.price || "";

const isNumericPrice = (val) => {
  if (!val) return false;
  const cleaned = String(val)
    .replace(/[,.\s]/g, "")
    .replace(/kip$/i, "");
  return !isNaN(Number(cleaned)) && Number(cleaned) > 0;
};

const parsePrice = (val) => {
  if (!val) return 0;
  const cleaned = String(val).replace(/[,\s]/g, "").replace(/kip$/i, "");
  return Number(cleaned) || 0;
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function extractYoutubeID(url) {
  if (!url) return "";
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=|shorts\/))([\w-]+)/
  );
  return match ? match[1] : "";
}

function hasValidQr(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function hasValidPrice(price) {
  if (price === null || price === undefined) return false;
  const str = String(price).trim();
  return str !== "" && str !== "undefined" && !isNaN(Number(str));
}

const syncFromComposable = () => {
  if (!channels.value) return;
  const channelQr = hasValidQr(qr.value) ? qr.value : null;
  const processed = channels.value.map((item) => ({
    ...item,
    image: Array.isArray(item.image)
      ? item.image
      : [item.image || "placeholder.jpg"],
    qr: hasValidQr(item.qr) ? item.qr : channelQr,
  }));
  baseData.value = processed;
  filteredData.value = processed;
};

// ── API Search (single source of truth) ──────────────────────────────────────
async function searchChannelData({ districtId = "", detail = "" } = {}) {
  const channelId = route.params.id || channelStore.value.channelId;
  if (!channelId) return;
  try {
    const url = `${BASE_URL}/all/searchDataAll?channelId=${channelId}&detail=${encodeURIComponent(
      detail
    )}&dId=${districtId}&vId=`;
    const res = await fetch(url);
    const data = await res.json();
    const raw = data.data || data;
    const channelQr = hasValidQr(qr.value) ? qr.value : null;
    filteredData.value = Array.isArray(raw)
      ? raw.map((item) => ({
          ...item,
          image: Array.isArray(item.image)
            ? item.image
            : [item.image || "placeholder.jpg"],
          qr: hasValidQr(item.qr) ? item.qr : channelQr,
        }))
      : [];
  } catch (e) {
    console.error("❌ Search data fetch error:", e);
  }
}

// ── Dialog helpers ────────────────────────────────────────────────────────────
function openGalleryFromDetail(index) {
  galleryItem.value = detailItem.value;
  gallerySlide.value = index;
  galleryDialog.value = true;
}

function openDetail(item) {
  detailItem.value = item;
  detailSlide.value = 0;
  detailDialog.value = true;
}

function openCommentDialog() {
  commentDialog.value = true;
}

// ── Pagination ────────────────────────────────────────────────────────────────
const onPageChange = async (page) => {
  if (!channelStore.value.channelId) return;
  await fetchChannelById(channelStore.value.channelId, page - 1);
  syncFromComposable();
};

// ── Reset filter ──────────────────────────────────────────────────────────────
const resetFilter = () => {
  selectedProvince.value = null;
  selectedDistrict.value = null;
  searchQuery.value = "";
  filteredData.value = baseData.value;
};

// ── WhatsApp / Phone ──────────────────────────────────────────────────────────
const callPhone = (tel) => {
  if (tel) window.location.href = `tel:${tel}`;
};

const openWhatsApp = (item) => {
  let tel = (item.tel || "").replace(/\D/g, "");
  if (tel.startsWith("20") && tel.length === 10) tel = "856" + tel;
  if (tel) window.open(`https://wa.me/${tel}`, "_blank");
  else console.error("No phone number available for this item");
};

// ── Cart ──────────────────────────────────────────────────────────────────────
const addToCart = (product) => {
  const selectedPrice =
    product.price2 !== 0 &&
    product.price2 !== null &&
    product.price2 !== undefined
      ? product.price2
      : product.price1;

  const cartItem = {
    ...product,
    quantity: 1,
    unit: "ອັນ",
    price: selectedPrice,
    qr: qr.value,
  };
  store.addToCart(cartItem);
  cart.value[product.id || product.itemid] = 1;
};

const incrementQty = (productId) => {
  const cartItem = store.cartItems?.find((item) => item.id === productId);
  const product = baseData.value?.find((p) => p.id === productId);
  if (!product) return;
  const newQty = (cartItem ? cartItem.quantity : 0) + 1;
  const price =
    product.price2 !== 0 && product.price2 !== null
      ? product.price2
      : product.price1;
  store.updateCart({
    ...(cartItem || product),
    quantity: newQty,
    price,
    id: productId,
  });
  cart.value[productId] = newQty;
};

const decrementQty = (productId) => {
  const cartItem = store.cartItems?.find((item) => item.id === productId);
  if (!cartItem) return;
  const newQty = cartItem.quantity - 1;
  if (newQty > 0) {
    const product = baseData.value?.find((p) => p.id === productId);
    const price =
      product && product.price2 !== 0 && product.price2 !== null
        ? product.price2
        : product?.price1;
    store.updateCart({ ...cartItem, quantity: newQty, price });
    cart.value[productId] = newQty;
  } else {
    store.removeFromCart(productId);
    delete cart.value[productId];
  }
};

// ── Lifecycle ─────────────────────────────────────────────────────────────────
onMounted(async () => {
  const routeState = history.state?.store;
  if (routeState?.channelId) {
    channelStore.value = { ...channelStore.value, ...routeState };
  }

  await fetchChannelById(route.params.id, 0);

  if (video1?.value) channelStore.value.video1 = video1.value;
  if (channelimage?.value) channelStore.value.imageadvert = Array.isArray(channelimage.value) ? channelimage.value : [channelimage.value];
  if (qr?.value) channelStore.value.qr = qr.value;

  syncFromComposable();

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

// ── Watchers ──────────────────────────────────────────────────────────────────

// Route channelId: reload all data when navigating between topData channels
watch(
  () => route.params.id,
  async (newId, oldId) => {
    if (!newId || newId === oldId) return;

    // Reset filter/search state
    selectedProvince.value = null;
    selectedDistrict.value = null;
    searchQuery.value = "";
    currentPage.value = 1;
    cart.value = {};

    await fetchChannelById(newId, 0);

    if (video1?.value) channelStore.value.video1 = video1.value;
    if (channelimage?.value)
      channelStore.value.imageadvert = Array.isArray(channelimage.value)
        ? channelimage.value
        : [channelimage.value];
    if (qr?.value) channelStore.value.qr = qr.value;

    syncFromComposable();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
);

// Province: load districts + reset district + search with no dId
watch(selectedProvince, async (id) => {
  selectedDistrict.value = null;
  districtsForSelectedProvince.value = [];

  if (!id) {
    filteredData.value = baseData.value;
    searchQuery.value = "";
    return;
  }

  try {
    const res = await fetch(
      `${BASE_URL}/district/selectByProvinceId?provinceId=${id}`
    );
    const dData = await res.json();
    districtsForSelectedProvince.value = (dData.data || dData).map((item) => ({
      title: item.district,
      value: item.districtid,
    }));
  } catch (e) {
    console.error("❌ District fetch error:", e);
  }

  await searchChannelData({ detail: searchQuery.value ?? "" });
});

// District: search with dId (or clear back to province-level)
watch(selectedDistrict, async (districtId) => {
  await searchChannelData({
    districtId: districtId ?? "",
    detail: searchQuery.value ?? "",
  });
});

// Search box: debounced API call with current district
let searchTimer = null;
watch(searchQuery, (val) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(async () => {
    await searchChannelData({
      districtId: selectedDistrict.value ?? "",
      detail: val ?? "",
    });
  }, 400);
});

watch(errors, (err) => {
  if (err) console.error("🚨 Composable Error:", err);
});
// ---------- comnent ----
const submitComment = () => {
  if (!telephone.value && !comment.value) return;

  const WHATSAPP_NUMBER = "2076376363";

  const message = [
    telephone.value ? `📞 ${t("comment_subject")}: ${telephone.value}` : "",
    comment.value   ? `💬 ${t("comment_detail")}: ${comment.value}`   : "",
  ]
    .filter(Boolean)
    .join("\n");

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");

  // Reset & close
  commentDialog.value = false;
  telephone.value = "";
  comment.value = "";
};
</script>
<style scoped>
/* ── Sticky search bar ───────────────────────────────────────────────── */
.sticky-search {
  position: sticky;
  top: 40px;
  z-index: 10;
}

/* ── Sticky search bar ───────────────────────────────────────────────── */
.sticky-search {
  position: sticky;
  top: 40px;
  z-index: 10;
}

/* ── Product card ────────────────────────────────────────────────────── */
.product-card {
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  background: #fff;
}
.product-card:active { transform: scale(0.97); }
@media (hover: hover) {
  .product-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.13) !important; }
}

/* card image */
.card-img-box { overflow: hidden; }
.card-img { transition: transform 0.35s ease; }
.product-card:hover .card-img { transform: scale(1.04); }
.img-bottom-grad {
  position: absolute; bottom: 0; left: 0; right: 0; height: 36px;
  background: linear-gradient(to top, rgba(0,0,0,0.18), transparent);
  pointer-events: none;
}

/* badges */
.discount-badge {
  position: absolute; top: 6px; left: 6px;
  background: #f44336; color: #fff;
  font-size: 10px; font-weight: 700;
  padding: 2px 6px; border-radius: 6px;
  line-height: 1.4;
}
.photo-badge {
  position: absolute; bottom: 6px; right: 6px;
  background: rgba(0,0,0,0.5); color: #fff;
  font-size: 10px; font-weight: 600;
  padding: 2px 5px; border-radius: 6px;
  display: flex; align-items: center; gap: 3px;
}

/* card text */
.card-title {
  font-size: 12px; font-weight: 600; line-height: 1.35;
  color: #212121;
}
@media (min-width: 600px) { .card-title { font-size: 13px; } }

.price-main  { font-size: 13px; font-weight: 800; color: #1565C0; }
.price-cur   { font-size: 11px; font-weight: 700; }
.price-old   { font-size: 11px; color: #9e9e9e; text-decoration: line-through; }
.price-ask   { font-size: 11px; color: #2e7d32; font-weight: 600; }
@media (min-width: 600px) {
  .price-main { font-size: 15px; }
  .price-old  { font-size: 12px; }
}

/* cart button */
.cart-btn { font-size: 11px !important; min-height: 30px !important; }
@media (min-width: 600px) { .cart-btn { font-size: 12px !important; } }

/* qty row inside card */
.qty-row {
  display: flex; align-items: center; justify-content: space-between;
  border: 1px solid #e0e0e0; border-radius: 10px; padding: 2px 6px;
}
.qty-num { font-size: 14px; font-weight: 700; }

/* ── Detail bottom sheet ─────────────────────────────────────────────── */
.detail-dialog :deep(.v-overlay__content) {
  align-items: flex-end !important;
  margin: 0 !important;
  width: 100% !important;
  max-width: 520px !important;
}
@media (min-width: 600px) {
  .detail-dialog :deep(.v-overlay__content) {
    align-items: center !important;
  }
}
.detail-sheet { max-height: 90vh; overflow-y: auto; }

.drag-handle {
  width: 36px; height: 4px;
  background: #e0e0e0; border-radius: 4px;
  margin-bottom: 4px;
}

.detail-img-wrap { position: relative; }
.detail-close-btn {
  position: absolute !important;
  top: 8px; right: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;
  z-index: 2;
}
.detail-photo-count {
  position: absolute; bottom: 8px; right: 8px;
  background: rgba(0,0,0,0.5); color: #fff;
  font-size: 11px; font-weight: 600;
  padding: 2px 7px; border-radius: 8px;
  display: flex; align-items: center; gap: 3px;
}

.detail-info-box {
  background: #f5f5f5; border-radius: 10px; padding: 10px 12px;
}
.detail-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.qty-row-large {
  display: flex; align-items: center; justify-content: center;
  gap: 16px; border: 1.5px solid #e0e0e0; border-radius: 12px;
  padding: 6px 12px; margin-bottom: 10px;
}

/* ── Text utilities ──────────────────────────────────────────────────── */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.w-100 { width: 100%; }

/* ── Blur button (video mute) ────────────────────────────────────────── */
.blur-btn {
  background: rgba(255,255,255,0.2) !important;
  backdrop-filter: blur(10px);
  color: white !important;
}

/* ── Gallery dialog ──────────────────────────────────────────────────── */
.gallery-carousel :deep(.v-window__controls) { padding: 0 8px; }
.gallery-nav-btn {
  background: rgba(255,255,255,0.92) !important;
  box-shadow: 0 2px 16px rgba(0,0,0,0.3) !important;
  transition: transform 0.15s, background 0.15s;
}
.gallery-nav-btn:hover { background: white !important; transform: scale(1.1); }
.thumbnail-strip { overflow-x: auto; scrollbar-width: none; }
.thumbnail-strip::-webkit-scrollbar { display: none; }
.thumbnail-wrapper {
  flex-shrink: 0; border-radius: 10px; overflow: hidden;
  border: 2.5px solid transparent; transition: border-color 0.2s, transform 0.2s;
}
.thumbnail-wrapper:hover { transform: scale(1.06); }
.thumbnail-active { border-color: #1976d2 !important; transform: scale(1.1) !important; }

/* ── Search field pill ───────────────────────────────────────────────── */
.search-field :deep(.v-field) { border-radius: 999px !important; }
</style>
