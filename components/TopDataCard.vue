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
          class="desktop-card"
        >
          <v-img :src="item.image?.[0] || '/favicon.ico'" height="200" cover>
            <template v-slot:placeholder>
              <v-skeleton-loader type="image" />
            </template>
          </v-img>
          <v-card-text class="pa-4">
            <p class="text-h6 font-weight-bold mb-1 text-truncate">
              {{ item.name }}
            </p>
          </v-card-text>
          <v-card-actions class="pa-4 pt-0">
            <v-btn
              block
              rounded="lg"
              color="#e3f2fd"
              class="text-primary font-weight-bold"
              variant="flat"
              append-icon="mdi-arrow-right"
            >
              ເບິ່ງເພີ່ມ
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
            class="slide-card"
            elevation="2"
            border
            @click="selectItem(item)"
          >
            <!-- Image with gradient overlay -->
            <div class="card-img-wrapper">
              <v-img
                :src="item.image?.[0] || '/favicon.ico'"
                height="200"
                cover
                class="card-img"
              >
                <template v-slot:placeholder>
                  <div class="img-placeholder">
                    <v-icon size="48" color="grey-lighten-1">mdi-image</v-icon>
                  </div>
                </template>
                <!-- Gradient overlay at bottom -->
                <div class="img-gradient" />
              </v-img>
            </div>

            <!-- Card Info -->
            <v-card-text class="pa-3 pb-1">
              <p class="card-name font-weight-bold text-truncate mb-1">
                {{ item.name }}
              </p>
             
            </v-card-text>

            <v-card-actions class="pa-3 pt-1">
              <v-btn
                block
                rounded="lg"
                color="#e3f2fd"
                class="text-primary font-weight-bold"
                variant="flat"
                append-icon="mdi-arrow-right"
                size="small"
              >
                ເບິ່ງເພີ່ມ
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
  router.push({ path: "/retrievepage", query: { channelId: item.channel } });
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

/* ── Button color ── */
:deep(.text-primary.v-btn--variant-flat) {
  background-color: #e3f2fd !important;
  color: #1976d2 !important;
}
</style>
