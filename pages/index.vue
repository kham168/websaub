<template>
  <v-app>
    <v-container fluid class="pa-2 pl-16 pr-16">
      <v-carousel
        cycle
        show-arrows
        hide-delimiters
        interval="2000"
        height="500"
        class="hero-carousel"
      >
        <v-carousel-item
          v-for="(img, index) in profileImageitems[0]?.image"
          :key="index"
        >
          <v-img
            :src="img"
            height="500"
            cover
            gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.7)"
          />
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
      <!-- <NuxtLink to="/admin">Admin Page</NuxtLink> -->
      <v-container class="pa-4">
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <!-- Search Bar -->
            <v-text-field
              v-model="searchQuery"
              placeholder="Search by name, type,..."
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-magnify"
              clearable
              hide-details
              class="search-field mb-3"
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
          </v-col>
        </v-row>
      </v-container>
      <v-divider class="my-4"></v-divider>
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
            @click="navigateToProduct(item.channel)"
            @click.stop="navigateToProduct(item)"
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
              <h3 class="text-h6 font-weight-bold channel-name">
                {{ item.channel }}
              </h3>

              <!-- Title/Description -->
              <p v-if="item.title" class="text-body-2 text-grey-darken-1 mb-1">
                {{ item.detail }}
              </p>
            </v-card-text>

            <!-- Actions -->
            <v-card-actions class="pa-4 pt-0">
              <v-btn
                block
                color="primary"
                variant="flat"
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
const { fetchProfileImages, profileImageitems } = useProfileImage();

onMounted(async () => {
  await fetchChannels();

  console.log("Channels loaded:", channels.value);
  await fetchProfileImages();
  console.log("Profile images loaded:", profileImageitems.value);
});

const routesMap = {
  1: "/muag_cream/home_muagcreams",
  2: "/hoob_xauj/home_hoobXauj",
  3: "/tsev_xauj/home_tsevXauj",
  4: "/muag_alaij_khoTsheb/home_alaij",
  5: "/muag_av/home_muagav",
  6: "/muag_tshuaj/home_muagtshuaj",
  7: "/taxi/home_taxi",
};

const navigateToProduct = (item) => {
  const route = routesMap[item.id];

  if (route) {
    console.log("Navigating to:", route);
    router.push(route);
  } else {
    console.warn("No matching route for id:", item.id);
  }
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
