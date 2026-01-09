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
    <!-- show all brand -->
    <v-container fluid class="pa-4">
      <!-- Product Grid -->
      <v-row>
        <v-col
          v-for="(item, index) in allHoobXauj"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
        >
          <v-card class="product-card d-flex flex-column" elevation="1" hover>
            <div class="image-container position-relative">
              <!-- Main product image -->
              <v-img
                :src="item.image[0] || '/favicon.ico'"
                aspect-ratio="1"
                cover
                class="product-image"
                height="200"
                @click="openImageDialog(item.image)"
                style="cursor: pointer"
              />

              <!-- Image count badge -->
              <div v-if="item.image.length > 1" class="image-count-badge">
                <v-icon size="small" class="mr-1">mdi-camera</v-icon>
                {{ item.image.length }}
              </div>
            </div>

            <!-- Product Info -->
            <v-card-text class="flex-grow-1 pa-3">
              <div class="text-h6 mb-1 font-weight-large">
                {{ item.dormantalname }}
              </div>
              <!-- Price Section -->
              <div class="mb-2">
                <div class="d-flex align-center">
                  <span class="text-h6 ml-1">
                    {{ item.price2 }}
                  </span>
                  <span
                    v-if="Number(item.price1) > 0"
                    class="text-body-3 align-self-start text-decoration-line-through text-grey-darken-1"
                  >
                    {{ item.price1 }}
                  </span>
                </div>

                <div class="d-flex align-center">
                  <v-icon icon color="red" > mdi-map-marker</v-icon>
                  <span>{{ item.province }},</span>
                  <span>{{ item.district }}</span>
                </div>

                <!-- Show More Button -->
                <v-btn
                  variant="text"
                  color="primary"
                  size="small"
                  class="mt-2 pa-0"
                  @click.stop="showDetailsDialog(item)"
                >
                  <v-icon size="small" class="mr-1">mdi-eye</v-icon>
                  ເບີ່ງລາຍລະອຽດເພີ່ມເຕີມ
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- ================ Show Top Product and slider  ================ -->
    <v-divider class="my-4"></v-divider>
    <v-row>
      <v-col cols="1" class="d-flex align-end justify-end mb-1">
        <v-icon color="primary">mdi-plus-circle</v-icon>
      </v-col>
      <v-col cols="11" class="d-flex align-start justify-start text-h5">
        ແນະນຳເບຣນດອື່ນໆ
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

    <!-- Image Dialog Popup -->
    <v-dialog v-model="showDialog" max-width="900px">
      <v-card class="rounded-xl overflow-hidden">
        <v-card-title
          class="d-flex justify-space-between align-center bg-primary pa-4"
        >
          <span class="text-h6 text-white">ຮູບພາບບັນຍາກາດຂອງຫ້ອງແຖວ</span>
          <v-btn icon variant="text" @click="showDialog = false" size="small">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-4">
          <!-- Main Carousel with auto-slide -->
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
              <v-img :src="img" height="500" contain></v-img>
            </v-carousel-item>
          </v-carousel>

          <!-- Thumbnail strip -->
          <div
            class="thumbnail-strip mt-4 d-flex justify-center flex-wrap ga-2"
          >
            <v-btn
              v-for="(img, index) in selectedImages"
              :key="index"
              class="pa-0"
              style="min-width: 80px"
              :class="{ 'active-thumbnail': currentIndex === index }"
              color="grey"
              variant="outlined"
              @click="currentIndex = index"
            >
              <v-img :src="img" height="60" width="80" cover></v-img>
            </v-btn>
          </div>

          <!-- Image counter -->
          <div class="text-center mt-3 text-grey">
            {{ currentIndex + 1 }} / {{ selectedImages.length }}
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Details Dialog for each property -->
    <v-dialog v-model="showDetails" max-width="900px" scrollable>
      <v-card>
        <v-card-title
          class="d-flex justify-space-between align-center bg-primary"
        >
          <v-spacer></v-spacer>
          <span class="text-h5 text-white">ລາຍລະອຽດຂອງຫ້ອງແຖວ</span>
          <v-spacer></v-spacer>
          <v-btn icon variant="text" @click="showDetails = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-6" v-if="detailItem">
          <!-- Image Gallery - Clickable -->
          <div class="mb-4">
            <v-carousel
              v-if="detailItem.image && detailItem.image.length > 0"
              height="350"
              cycle
              interval="3000"
              show-arrows
              class="clickable-carousel"
            >
              <v-carousel-item
                v-for="(img, index) in detailItem.image"
                :key="index"
                @click="openImageDialog(detailItem.image, index)"
                style="cursor: pointer"
              >
                <v-img :src="img" height="350" cover>
                  <div class="image-overlay">
                    <v-icon size="48" color="white">mdi-magnify-plus</v-icon>
                  </div>
                </v-img>
              </v-carousel-item>
            </v-carousel>
            <div class="text-center mt-2 text-caption text-grey">
              <v-icon size="small">mdi-cursor-pointer</v-icon>
              ຄລິກຮູບເພື່ອຂະຫຍາຍ
            </div>
          </div>

          <!-- Price Information -->
          <v-card class="mb-4 pa-4 bg-grey-lighten-4" elevation="0">
            <div class="mb-3 text-h6">+ ລາຍລະອຽດລາຄາ:</div>
            <div
              class="d-flex align-center mb-2"
              v-if="Number(detailItem.price1) > 0"
            >
              <strong class="mr-2">ລາຄາເຕັມ:</strong>
              <span class="text-red text-decoration-line-through">
                {{ detailItem.price1 }}
              </span>
            </div>
            <div class="d-flex align-center mb-2">
              <strong class="mr-2">ລາຄາປັດຈຸບັນ:</strong>
              <span class="text-green font-weight-bold text-h6">
                {{ detailItem.price2 }}
              </span>
            </div>
          </v-card>

          <!-- Property Information -->
          <v-card class="mb-4 pa-4" elevation="1">
            <div class="mb-3 text-h6">+ ລາຍລະອຽດຫ້ອງແຖວ:</div>
            <v-row>
              <v-col cols="12" sm="4">
                <div class="mb-1" v-if="detailItem.type">
                  <strong> ປະເພດຫ້ອງແຖວ:</strong>
                  <v-chip size="small" color="primary" class="ml-2">
                    {{ detailItem.type || "0" }}
                  </v-chip>
                </div>
              </v-col>
              <v-col cols="12" sm="3">
                <div class="mb-1" v-if="detailItem.totalroom">
                  <strong>ຫ້ອງທັງໝົດ:</strong>
                  <span class="ml-2 text-red font-weight-bold">
                    {{ detailItem.totalroom || "0" }}
                  </span>
                </div>
              </v-col>
              <v-col cols="12" sm="3">
                <div class="mb-1" >
                  <strong>ຫ້ອງເຕັມ:</strong>
                  <span class="ml-2 text-green font-weight-bold">
                    {{ detailItem.activeroom || "0" }}
                  </span>
                </div>
              </v-col>
              <v-col cols="12" sm="2">
                <div class="mb-1">
                  <strong>ຫ້ອງຫວ່າງ:</strong>
                  <span class="ml-2 text-green font-weight-bold">
                    {{ availableRooms }}
                  </span>
                </div>
              </v-col>
              <v-divider class="my-2"></v-divider>
              <v-col cols="12">
                <div class="mb-0">
                  <div class="mb-3 text-h6">+ ລາຍລະອຽດ:</div>
                  <v-divider class="my-2"></v-divider>
                  <div>
                    <span class="ml-2 text-red font-weight-bold">
                      {{ detailItem.moredetail }}
                    </span>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>

          <!-- Location Information -->
          <v-card class="mb-4 pa-4" elevation="1">
            <h3 class="mb-3 text-h6 d-flex align-center justify-start">
              <v-icon color="red" class="mr-2">mdi-map-marker</v-icon>
              Location
            </h3>
            <v-divider class="my-2"></v-divider>
            <v-row>
              <v-col cols="12" sm="4">
                <div class="mb-2">
                  <strong>ແຂວງ:</strong>
                  <div class="mt-1">{{ detailItem.province }}</div>
                </div>
              </v-col>
              <v-col cols="12" sm="4">
                <div class="mb-2">
                  <strong>ເມືອງ:</strong>
                  <div class="mt-1">{{ detailItem.district }}</div>
                </div>
              </v-col>
              <v-col cols="12" sm="4">
                <div class="mb-2">
                  <strong>ບ້ານ:</strong>
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
              <v-icon color="primary" class="mr-2">mdi-phone</v-icon>
              ຂໍ້ມູນຕິດຕໍ່
            </h3>
            <v-row>
              <v-col cols="12" sm="6" v-if="detailItem.contactnumber">
                <div class="mb-2">
                  <a
                    :href="'tel:' + detailItem.contactnumber"
                    class="ml-2 text-blue text-decoration-none"
                  >
                    <v-icon size="small" class="mr-1">mdi-phone</v-icon>
                    {{ detailItem.contactnumber }}
                  </a>
                </div>
              </v-col>
              <v-col cols="12" sm="6" v-if="detailItem.tel">
                <div class="mb-2">
                  <a
                    :href="getWhatsAppLink(detailItem.tel)"
                    target="_blank"
                    class="ml-2 text-green text-decoration-none"
                  >
                    <v-icon size="small" class="mr-1">mdi-whatsapp</v-icon>
                    {{ detailItem.tel }}
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
import { ref, computed, onMounted } from "vue";

const {
  allHoobXauj,
  loading,
  error,
  pagination,
  topData,
  fetchHoobXauj,
  channelimage,
  qr,
} = useHoobXauj();

// <------------image dialog state------------>
const showDialog = ref(false);
const selectedImages = ref([]);
const currentIndex = ref(0);

// <------------details dialog state------------>
const showDetails = ref(false);
const detailItem = ref(null);
const carouselIndex = ref(0);

// Updated function to open image dialog with starting index
function openImageDialog(images, startIndex = 0) {
  selectedImages.value = images;
  currentIndex.value = startIndex;
  showDialog.value = true;
}

function showDetailsDialog(item) {
  detailItem.value = item;
  showDetails.value = true;
}

// Computed property for available rooms
const availableRooms = computed(() => {
  if (!detailItem.value) return 0;
  return (detailItem.value.totalroom || 0) - (detailItem.value.activeroom || 0);
});

// Helper function to clean phone number
const cleanPhoneNumber = (phone) => {
  if (!phone) return "";

  // Convert to string and remove all non-digit characters
  const cleaned = String(phone).replace(/\D/g, "");

  // If number starts with 856, return as is
  if (cleaned.startsWith("856")) {
    return cleaned;
  }

  // If number starts with 20 (Laos mobile), add 856
  if (cleaned.startsWith("20")) {
    return "856" + cleaned;
  }

  // Otherwise, add 856
  return "856" + cleaned;
};

// Function to get WhatsApp link with message
const getWhatsAppLink = (phone) => {
  const cleanedPhone = cleanPhoneNumber(phone);

  if (!cleanedPhone || cleanedPhone.length < 11) {
    console.error("Invalid phone number:", phone);
    return "#";
  }

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

  const link = `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(
    message
  )}`;

  return link;
};

onMounted(async () => {
  try {
    await fetchHoobXauj();
    console.log("Hoob Xauj fetched:", allHoobXauj.value);
    console.log("channelimage", channelimage.value);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
});
</script>

<style scoped>
/* Product Card Styles */
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
  border: 3px solid #4caf50 !important;
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
  z-index: 2;
}

/* Clickable carousel styles */
.clickable-carousel {
  position: relative;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0);
  transition: background 0.3s ease;
  opacity: 0;
}

.clickable-carousel:hover .image-overlay {
  background: rgba(0, 0, 0, 0.3);
  opacity: 1;
}
</style>
