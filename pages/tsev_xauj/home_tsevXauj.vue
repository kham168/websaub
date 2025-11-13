<template>
  <v-app fluid>
    <!-- Top Carousel -->
    <v-container class="pa-4 bg-grey-lighten-3">
      <v-carousel cycle show-arrows hide-delimiters interval="4000">
        <v-carousel-item v-for="(item, index) in houses" :key="index">
          <v-img
            :src="item.image[0] || '/placeholder.jpg'"
            class="fill-height"
            cover
          >
            <template v-slot:default>
              <v-sheet
                class="d-flex align-center justify-center"
                color="rgba(0,0,0,0.4)"
                height="100%"
              >
                <h2 class="text-white text-h4 text-center px-4">
                  {{ item.title || item.channel }}
                </h2>
              </v-sheet>
            </template>
          </v-img>
        </v-carousel-item>
      </v-carousel>
    </v-container>

    <v-divider class="my-4"></v-divider>

    <!-- House Grid -->
    <v-container fluid class="pa-4">
      <v-row>
        <v-col
          v-for="(item, index) in houses"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
        >
          <v-card class="product-card d-flex flex-column" elevation="1" hover>
            <div class="image-container position-relative">
              <v-img
                :src="item.image[0] || '/favicon.ico'"
                aspect-ratio="1"
                cover
                class="product-image"
                height="200"
                @click="openImageDialog(item.image)"
                style="cursor: pointer"
              />

              <div v-if="item.image.length > 1" class="image-count-badge">
                <v-icon size="small" class="mr-1">mdi-camera</v-icon>
                {{ item.image.length }}
              </div>

              <div v-if="item.isBestSeller" class="best-seller-badge">
                #1 Best Seller
              </div>
            </div>

            <v-card-text class="flex-grow-1 pa-3">
              <div class="mb-2">
                <div class="d-flex align-center mb-1">
                  <span class="text-red text-decoration-line-through mr-2">
                    LAK {{ formatPrice(item.price2) }}
                  </span>
                  <span class="font-weight-bold"
                    >LAK {{ formatPrice(item.price1) }}</span
                  >
                </div>
                <div class="mb-1">
                  <strong>Tsev:</strong>
                  <span class="text-red ml-2">{{ item.type || "-" }}</span>
                </div>
                <div class="mb-1">
                  <strong>Muaj:</strong>
                  <span class="text-red ml-2">{{ item.totalroom || "-" }}</span>
                </div>
                <div class="mb-1">
                  <v-icon color="grey">mdi-map-marker</v-icon>
                  <span>{{ item.province }}, {{ item.district }}</span>
                </div>

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
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Image Dialog -->
    <v-dialog v-model="showDialog" max-width="700px">
      <v-card class="rounded-xl overflow-hidden pa-4">
        <v-carousel
          v-if="selectedImages.length > 0"
          v-model="currentIndex"
          hide-delimiter-background
          height="400"
          cycle
          interval="2000"
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

          <v-card class="mb-4 pa-4 bg-grey-lighten-4" elevation="0">
            <h3 class="mb-3">Price Information</h3>
            <div class="d-flex align-center mb-2">
              <strong class="mr-2">Original Price:</strong>
              <span class="text-red text-decoration-line-through">
                LAK {{ formatPrice(detailItem.price2) }}
              </span>
            </div>
            <div class="d-flex align-center mb-2">
              <strong class="mr-2">Current Price:</strong>
              <span class="text-green font-weight-bold text-h6">
                LAK {{ formatPrice(detailItem.price1) }}
              </span>
            </div>
            <div
              v-if="detailItem.price2 && detailItem.price1"
              class="d-flex align-center"
            >
              <strong class="mr-2">Discount:</strong>
              <v-chip color="red" size="small" class="text-white">
                Save LAK
                {{ formatPrice(detailItem.price2 - detailItem.price1) }}
              </v-chip>
            </div>
          </v-card>

          <v-card class="mb-4 pa-4" elevation="1">
            <h3 class="mb-3">Property Information</h3>
            <v-row>
              <v-col cols="12" sm="6">
                <div>
                  <strong>Type:</strong>
                  <span class="text-red ml-2">{{
                    detailItem.type || "-"
                  }}</span>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div>
                  <strong>Total Rooms:</strong>
                  <span class="text-red ml-2">{{
                    detailItem.totalroom || "-"
                  }}</span>
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
            </v-row>
          </v-card>

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
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="flat" @click="showDetails = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
const { fetchTsevXauj, houses } = useTsevXauj();

const showDialog = ref(false);
const showDetails = ref(false);
const selectedImages = ref([]);
const currentIndex = ref(0);
const detailItem = ref(null);

function formatPrice(price) {
  if (!price) return "0.00";
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
  await fetchTsevXauj();
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
.best-seller-badge {
  position: absolute;
  bottom: 8px;
  left: 8px;
  background: #ff6b35;
  color: white;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  border-radius: 4px;
}
</style>
