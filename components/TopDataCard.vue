<template>
  <div class="slider-wrapper">
    <!-- Desktop Grid -->
    <v-row v-if="!$vuetify.display.mobile" class="ma-0">
      <v-col
        v-for="(item, index) in topData"
        :key="'grid-' + index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="pa-2"
      >
        <v-card
          rounded="xl"
          border
          elevation="0"
          @click="selectItem(item)"
          class="desktop-card h-100 d-flex flex-column"
        >
          <v-img :src="item.image?.[0] || '/favicon.ico'" height="180" cover>
            <template v-slot:placeholder>
              <v-skeleton-loader type="image" />
            </template>
            <div class="d-flex justify-end pa-2">
              <v-chip size="x-small" color="primary" variant="flat">
                <v-icon size="12" start>mdi-store</v-icon>
                ຍີ່ຫໍ້
              </v-chip>
            </div>
          </v-img>
          <v-card-text class="pa-3 flex-grow-1">
            <p class="text-subtitle-1 font-weight-bold mb-0 text-truncate">
              {{ item.name }}
            </p>
            <p v-if="item.detail" class="text-caption text-grey-darken-1 mt-1 line-clamp-2">
              {{ item.detail }}
            </p>
          </v-card-text>
          <v-card-actions class="pa-3 pt-0">
            <v-btn
              block
              rounded="lg"
              color="primary"
              variant="flat"
              append-icon="mdi-arrow-right"
              size="small"
            >
              ເບິ່ງສິນຄ້າ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Mobile Slider -->
    <div v-else class="mobile-slider-container">
      <!-- Prev Arrow -->
      <v-btn
        icon
        elevation="3"
        class="slider-arrow slider-arrow--left"
        @click="scrollLeft"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <!-- Scroll Track -->
      <div class="scroll-track" ref="scrollTrack">
        <div
          v-for="(item, index) in topData"
          :key="'slide-' + index"
          class="slide-card-wrapper"
        >
          <v-card
            rounded="xl"
            class="slide-card d-flex flex-column"
            elevation="2"
            border
            @click="selectItem(item)"
          >
            <div class="card-img-wrapper">
              <v-img
                :src="item.image?.[0] || '/favicon.ico'"
                height="160"
                cover
                class="card-img"
              >
                <template v-slot:placeholder>
                  <div class="img-placeholder d-flex align-center justify-center fill-height">
                    <v-icon size="48" color="grey-lighten-1">mdi-image</v-icon>
                  </div>
                </template>
                <div class="img-gradient" />
                <div class="d-flex justify-end pa-2">
                  <v-chip size="x-small" color="primary" variant="flat">
                    <v-icon size="12" start>mdi-store</v-icon>
                    ຍີ່ຫໍ້
                  </v-chip>
                </div>
              </v-img>
            </div>

            <v-card-text class="pa-3 pb-1 flex-grow-1">
              <p class="card-name font-weight-bold text-truncate mb-1">
                {{ item.name }}
              </p>
              <p v-if="item.detail" class="text-caption text-grey-darken-1 line-clamp-2">
                {{ item.detail }}
              </p>
            </v-card-text>

            <v-card-actions class="pa-3 pt-1">
              <v-btn
                block
                rounded="lg"
                color="primary"
                variant="flat"
                append-icon="mdi-arrow-right"
                size="small"
              >
                ເບິ່ງສິນຄ້າ
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div>

      <!-- Next Arrow -->
      <v-btn
        icon
        elevation="3"
        class="slider-arrow slider-arrow--right"
        @click="scrollRight"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  topData: { type: Array, default: () => [] },
});

const router = useRouter();
const scrollTrack = ref(null);

const SCROLL_AMOUNT = 280;

const scrollLeft = () => {
  scrollTrack.value?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
};

const scrollRight = () => {
  scrollTrack.value?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
};

const selectItem = (item) => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  router.push(`/channel/${item.channel}`);
};
</script>

<style scoped>
/* ── Mobile Slider Container ── */
.mobile-slider-container {
  position: relative;
  padding: 8px 0;
}

/* ── Scroll Track ── */
.scroll-track {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  gap: 0; /* ← remove gap between cards */
  padding: 8px 0; /* ← remove side padding that caused the cut-off */
  scrollbar-width: none;
}
.scroll-track::-webkit-scrollbar {
  display: none;
}

/* ── Each card wrapper ── */
.slide-card-wrapper {
  flex: 0 0 auto;
  width: 85vw; /* ← fills most of screen, shows next card peeking */
  max-width: 340px;
  scroll-snap-align: center;
  padding: 0 6px; /* ← small breathing room between cards only */
}

/* ── Arrows ── */
.slider-arrow {
  position: absolute;
  top: 95px; /* ← align to middle of image (200px / 2) */
  transform: none;
  z-index: 10;
  background: white !important;
  color: #1976d2 !important;
  width: 38px !important;
  height: 38px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18) !important;
}
.slider-arrow--left {
  left: 8px;
}
.slider-arrow--right {
  right: 8px;
}

/* ── Desktop card hover ── */
.desktop-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}
.desktop-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
}

/* ── Card image gradient ── */
.img-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(to top, rgba(0,0,0,0.15), transparent);
}

/* ── line-clamp utility ── */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
