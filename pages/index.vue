<template>
  <v-app>
    <v-container fluid class="pa-0">
      <!-- Hero Carousel -->
      <v-carousel
        cycle
        show-arrows
        hide-delimiters
        interval="4000"
        height="500"
        class="hero-carousel"
      >
        <v-carousel-item
          v-for="(item, index) in channels"
          :key="index"
          @click="viewDetails(item)"
          class="carousel-item"
        >
          <v-img
            :src="item.image[0] || '/placeholder.jpg'"
            height="500"
            cover
            gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.7)"
          >
            <v-container class="fill-height">
              <v-row align="end" class="fill-height pa-6">
                <v-col cols="12">
                  <div class="text-center">
                    <h1 class="text-white text-h3 font-weight-bold mb-3">
                      {{ item.channel }}
                    </h1>
                    <p v-if="item.title" class="text-white text-h6 mb-4">
                      {{ item.title }}
                    </p>
                    <v-btn
                      color="white"
                      variant="flat"
                      size="large"
                      @click.stop="navigateToProduct(index)"
                      prepend-icon="mdi-arrow-right"
                    >
                      ເບິ່ງລາຍການ
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-img>
        </v-carousel-item>
      </v-carousel>
    </v-container>

    <v-divider class="my-6" />

    <!-- Categories Grid -->
    <v-container fluid class="pa-6">
      <div class="text-center mb-8">
        <h2 class="text-h3 font-weight-bold mb-3">ບໍລິການຂອງພວກເຮົາ</h2>
        <p class="text-h6 text-grey-darken-1">ເລືອກບໍລິການທີ່ທ່ານຕ້ອງການ</p>
      </div>

      <!-- Loading State -->
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

      <!-- Categories Cards -->
      <v-row v-else>
        <v-col
          v-for="(item, index) in channels"
          :key="item.id || index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
        >
          <v-card
            class="category-card"
            elevation="2"
            hover
            @click="navigateToProduct(index)"
          >
            <!-- Image -->
            <div class="image-wrapper">
              <v-img
                :src="item.image[0]"
                aspect-ratio="1"
                cover
                class="category-image"
              >
                <!-- Image Count Badge -->
                <div v-if="item.image.length > 1" class="image-count-badge">
                  <v-icon size="small" class="mr-1">mdi-camera</v-icon>
                  {{ item.image.length }}
                </div>

                <!-- Best Seller Badge -->
                <div v-if="item.isBestSeller" class="best-seller-badge">
                  #1 ຍອດນິຍົມ
                </div>
              </v-img>
            </div>

            <!-- Content -->
            <v-card-text class="pa-4">
              <!-- Channel Name -->
              <h3 class="text-h6 font-weight-bold mb-2 channel-name">
                {{ item.channel }}
              </h3>

              <!-- Title/Description -->
              <p v-if="item.title" class="text-body-2 text-grey-darken-1 mb-3">
                {{ item.detail }}
              </p>

              <!-- Rating -->
            </v-card-text>

            <!-- Actions -->
            <v-card-actions class="pa-4 pt-0">
              <v-btn
                block
                color="primary"
                variant="flat"
                @click.stop="navigateToProduct(index)"
                prepend-icon="mdi-arrow-right-circle"
              >
                ເບິ່ງລາຍລະອຽດ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Composable
const { channels, fetchChannels, loading, error } = useChannel();

onMounted(async () => {
  await fetchChannels();
  console.log("Channels loaded:", channels.value);
});

// Navigation function with FIXED routes
const navigateToProduct = (index) => {
  const routes = [
    "/muag_cream/home_muagcreams",
    "/hoob_xauj/home_hoobXauj",
    "/tsev_xauj/home_tsevXauj",
    "/muag_alaij_khoTsheb/home_alaij",
    "/muag_av/home_muagav",
    "/muag_tshuaj/home_muagtshuaj",
    "/taxi/home_taxi",
  ];

  if (routes[index]) {
    console.log("Navigating to:", routes[index]);
    router.push(routes[index]);
  } else {
    console.warn("No route found for index:", index);
  }
};

// View details (alternative navigation using item.path)
const viewDetails = (item) => {
  if (item.path) {
    router.push(`/${item.path}`);
  }
};

// Price helpers
const getPriceWhole = (price) => {
  return Math.floor(price || 0);
};

const getPriceDecimal = (price) => {
  const decimal = ((price || 0) % 1).toFixed(2).substring(1);
  return decimal;
};

// Delivery date helper
const getDeliveryDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  const options = { weekday: "short", month: "short", day: "numeric" };
  return date.toLocaleDateString("lo-LA", options);
};
</script>

<style scoped>
/* Hero Carousel */
.hero-carousel {
  border-radius: 0;
}

/* Category Cards */
.category-card {
  height: 100%;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.category-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2) !important;
}

.image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
}

.category-image {
  transition: transform 0.4s ease;
}

.category-card:hover .category-image {
  transform: scale(1.1);
}

.image-count-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  display: flex;
  align-items: center;
  z-index: 2;
  backdrop-filter: blur(4px);
}

.best-seller-badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: #ff6b35;
  color: white;
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 700;
  border-radius: 6px;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.channel-name {
  color: #1976d2;
  line-height: 1.4;
  min-height: 2em;
  transition: color 0.2s;
}

.category-card:hover .channel-name {
  color: #1565c0;
}
/* Responsive */
@media (max-width: 600px) {
  .category-card {
    margin-bottom: 16px;
  }
}
</style>
