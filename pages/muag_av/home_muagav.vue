<template>
  <v-app fluid>
    <!-- Top Auto Carousel -->
    <v-container class="pa-4 bg-grey-lighten-3">
      <v-carousel
        cycle
        show-arrows
        v-model="carouselIndex"
        hide-delimiters
        interval="4000"
      >
        <v-carousel-item
          v-for="(img, index) in channelimage || []"
          :key="`carousel-${index}`"
        >
          <v-img :src="img || '/placeholder.jpg'" class="fill-height" cover>
          </v-img>
        </v-carousel-item>
      </v-carousel>
    </v-container>

    <v-divider class="my-4"></v-divider>
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
              ></v-select>
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
              ></v-select>
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
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
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
    <!-- Product Grid -->
    <v-container fluid class="pa-4">
      <v-row>
        <v-col
          v-for="(item, index) in allbrandMuagAv"
          :key="`product-${item.id || index}`"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
        >
          <v-card class="product-card d-flex flex-column" elevation="1" hover>
            <div class="image-container position-relative">
              <!-- Product Image -->
              <v-img
                :src="item.image?.[0] || '/placeholder.jpg'"
                aspect-ratio="1"
                cover
                height="200"
                class="product-image"
                @click="openImageDialog(item.image)"
              />

              <!-- Image Count Badge -->
              <div
                v-if="item.image && item.image.length > 1"
                class="image-count-badge"
              >
                <v-icon size="small" class="mr-1">mdi-camera</v-icon>
                {{ item.image.length }}
              </div>
            </div>

            <v-card-text class="flex-grow-1 pa-3">
              <div class="text-caption text-primary mb-1 font-weight-medium">
                {{ item.productname || "Unnamed Product" }}
              </div>
              <div class="mb-2">
                <div class="d-flex align-center text-h6">
                  <span class="price-whole ml-1">ລາຄາ:</span>
                  <span class="price-whole ml-1">{{ item.price }}</span>
                  <span class="ml-2 text-error">/ເເມັດກ້ອນ</span>
                </div>
              </div>
              <!-- Location -->
              <div class="text-caption text-grey mb-2">
                <v-icon size="small">mdi-map-marker</v-icon>
                {{ item.district }}, {{ item.province }}
              </div>

              <!-- Area -->
              <div v-if="item.area" class="text-caption mb-2">
                <strong>Area:</strong> {{ item.area }}
              </div>

              <!-- Price -->

              <div class="text-grey-darken-2 mb-1">
                Contact:
                <span class="text-primary"> {{ item.tel || "N/A" }}</span>
              </div>

              <!-- View Details Button -->
              <v-btn
                variant="text"
                color="primary"
                size="small"
                class="mt-2 pa-0"
                @click.stop="showDetailsDialog(item)"
              >
                <v-icon size="small" class="mr-1">mdi-eye</v-icon>
                Show More Details
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="my-4"> </v-divider>
    <v-row>
      <v-col cols="1" class="d-flex align-end justify-end mb-1">
        <v-icon color="primary">mdi-plus-circle</v-icon>
        <!-- <h1 class="font-weight-bold mb-4 text-center">ແນະນຳເບຣນດອື່ນๆ</h1> -->
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

    <!-- Image Dialog -->
    <v-dialog v-model="showDialog" max-width="700px">
      <v-card class="rounded-xl overflow-hidden pa-4">
        <v-carousel
          v-if="selectedImages.length > 0"
          v-model="currentIndex"
          hide-delimiter-background
          height="400"
          cycle
          interval="2500"
        >
          <v-carousel-item v-for="(img, index) in selectedImages" :key="index">
            <v-img :src="img" height="400" contain></v-img>
          </v-carousel-item>
        </v-carousel>

        <div class="thumbnail-strip mt-2 d-flex justify-center">
          <v-btn
            v-for="(img, index) in selectedImages"
            :key="index"
            class="ma-1 p-0"
            style="min-width: 60px; padding: 0"
            :class="{ 'active-thumbnail': currentIndex === index }"
            color="grey"
            variant="text"
            @click="currentIndex = index"
          >
            <v-img :src="img" height="32" width="60" cover></v-img>
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- Details Dialog -->
    <v-dialog v-model="showDetails" max-width="800px">
      <v-card>
        <v-card-title
          class="d-flex justify-space-between align-center bg-primary"
        >
          <span class="text-h5 text-white">Property Details</span>
          <v-btn icon variant="text" @click="showDetails = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-6" v-if="detailItem">
          <!-- Image Gallery -->
          <div class="mb-4">
            <v-carousel
              v-if="detailItem.image && detailItem.image.length > 0"
              height="300"
              cycle
              interval="3000"
              show-arrows
            >
              <v-carousel-item
                v-for="(img, index) in detailItem.image"
                :key="index"
              >
                <v-img :src="img" height="300" cover></v-img>
              </v-carousel-item>
            </v-carousel>
          </div>

          <!-- Price Information -->
          <v-card class="mb-4 pa-4 bg-grey-lighten-4" elevation="0">
            <h3 class="mb-3">Price Information</h3>
            <!-- <div class="d-flex align-center mb-2">
              <strong class="mr-2">Original Price:</strong>
              <span class="text-red text-decoration-line-through">
                LAK {{ formatPrice(detailItem.price2) }}
              </span>
            </div> -->
            <div class="d-flex align-center mb-2">
              <strong class="mr-2">Current Price:</strong>
              <span class="text-green font-weight-bold text-h6">
                {{ detailItem.price }}
              </span>
              <span class="font-weight-bold text-h6 ml-2 text-error"
                >/ເເມັດກ້ອນ</span
              >
            </div>
            <!-- <div
              v-if="detailItem.price2 && detailItem.price1"
              class="d-flex align-center"
            >
              <strong class="mr-2">Discount:</strong>
              <v-chip color="red" size="small" class="text-white">
                Save LAK
                {{ formatPrice(detailItem.price2 - detailItem.price1) }}
              </v-chip>
            </div> -->
          </v-card>

          <!-- Property Information -->
          <v-card class="mb-4 pa-4" elevation="1">
            <h3 class="mb-3">Property Information</h3>
            <v-row>
              <v-col cols="12" sm="4">
                <div class="mb-1">
                  <strong>Type:</strong>
                  <span class="text-red ml-2">
                    {{ detailItem.type || "no detail" }}</span
                  >
                  <!-- <v-chip size="small" color="primary" class="ml-2">
                  
                  </v-chip> -->
                </div>
              </v-col>
              <v-col cols="12" sm="4">
                <div class="mb-1">
                  <strong>Total Rooms:</strong>
                  <span class="ml-2 text-red font-weight-bold">
                    {{ detailItem.totalroom || "-" }}
                  </span>
                </div>
              </v-col>
              <v-col cols="12" sm="4">
                <div class="mb-1">
                  <strong> squaremeters:</strong>
                  <span class="ml-2 text-red font-weight-bold">
                    {{ detailItem.squaremeters || "no detail" }}
                  </span>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="mb-0">
                  <strong>Details:</strong>
                  <v-divider></v-divider>
                  <div>
                    <span class="ml-2 text-red font-weight-bold">
                      {{ detailItem.moredetail }}
                    </span>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" v-if="detailItem.title">
                <div class="mb-2">
                  <strong>Title:</strong>
                  <span class="ml-2">{{ detailItem.title }}</span>
                </div>
              </v-col>
              <v-col cols="12" v-if="detailItem.channel">
                <div class="mb-2">
                  <strong>Channel/Owner:</strong>
                  <span class="ml-2">{{ detailItem.channel }}</span>
                </div>
              </v-col>
            </v-row>
          </v-card>

          <!-- Location Information -->
          <v-card class="mb-4 pa-4" elevation="1">
            <h3 class="mb-3">
              <v-icon color="primary" class="mr-2">mdi-map-marker</v-icon>
              Location
            </h3>
            <v-row>
              <v-col cols="12" sm="4">
                <div class="mb-2">
                  <strong>Province:</strong>
                  <div class="mt-1">{{ detailItem.province }}</div>
                </div>
              </v-col>
              <v-col cols="12" sm="4">
                <div class="mb-2">
                  <strong>District:</strong>
                  <div class="mt-1">{{ detailItem.district }}</div>
                </div>
              </v-col>
              <v-col cols="12" sm="4">
                <div class="mb-2">
                  <strong>Village:</strong>
                  <div class="mt-1">
                    {{
                      detailItem.villages && detailItem.villages.length > 0
                        ? detailItem.villages.join(", ")
                        : "N/A"
                    }}
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>

          <v-card class="mb-4 pa-4 bg-blue-lighten-5" elevation="1">
            <h3 class="mb-3">
              <v-icon color="primary" class="mr-2">mdi-plus</v-icon>
              Contact Information
            </h3>
            <v-row>
              <v-col cols="12" sm="6">
                <div class="mb-2">
                  <!-- <strong>Phone:</strong> -->
                  <a
                    :href="'tel:' + detailItem.tel"
                    class="ml-2 text-blue text-decoration-none"
                  >
                    <v-icon size="small" class="mr-1">mdi-phone</v-icon>
                    {{ detailItem.tel }}
                  </a>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="mb-2">
                  <!-- <strong>WhatsApp:</strong> -->
                  <a
                    :href="'https://wa.me/' + detailItem.contactnumber"
                    target="_blank"
                    class="ml-2 text-green text-decoration-none"
                  >
                    <v-icon size="small" class="mr-1">mdi-whatsapp</v-icon>
                    {{ detailItem.contactnumber }}
                  </a>
                </div>
              </v-col>
            </v-row>
          </v-card>

          <!-- Video Location -->
          <v-card class="pa-4" elevation="1" v-if="detailItem.locationvideo">
            <h3 class="mb-3">
              <v-icon color="primary" class="mr-2">mdi-video</v-icon>
              Video qhia kev
            </h3>
            <a
              :href="detailItem.locationvideo"
              target="_blank"
              class="text-primary text-decoration-underline"
            >
              <v-icon class="mr-1">mdi-play-circle</v-icon>
              Watch Location Video
            </a>
          </v-card>

          <!-- Additional Details if available -->
          <!-- <v-card class="mt-4 pa-4" elevation="1" v-if="detailItem?.moredetails">
            <h3 class="mb-3">Description</h3>
            <p>{{ detailItem.moredetails }}</p>
          </v-card> -->
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="flat" @click="showDetails = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
const {
  fetchBrandMuagAv,
  topData,
  loading,
  error,
  allbrandMuagAv,
  qr,
  channelimage,
} = useBrandMuagAv();
const showDialog = ref(false);
const selectedImages = ref([]);
const currentIndex = ref(0);
const showDetails = ref(false);
const detailItem = ref(null);
const carouselIndex = ref(0);

function formatPrice(price) {
  if (!price) return "0";
  return Number(price).toLocaleString("en-US", { minimumFractionDigits: 0 });
}

function openImageDialog(images) {
  selectedImages.value = images;
  currentIndex.value = 0;
  showDialog.value = true;
}

function showDetailsDialog(item) {
  detailItem.value = item;
  showDetails.value = true;
}

onMounted(async () => {
  await fetchBrandMuagAv();
});
</script>

<style scoped>
.product-card {
  height: 100%;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
}
.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  transform: translateY(-2px);
}
.image-container {
  background: #f8f8f8;
  overflow: hidden;
  position: relative;
  border-radius: 8px 8px 0 0;
}
.product-image {
  transition: transform 0.3s ease;
  border-radius: 12px;
}
.product-card:hover .product-image {
  transform: scale(1.05);
}
.image-count-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  font-size: 12px;
}
.active-thumbnail {
  border: 2px solid green;
  border-radius: 4px;
}
.thumbnail-strip img {
  border-radius: 4px;
}
</style>
