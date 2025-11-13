<template>
  <v-app fluid>
    <!-- Top Auto Carousel -->
    <v-container class="pa-4 bg-grey-lighten-3">
      <v-carousel cycle show-arrows hide-delimiters interval="4000">
        <v-carousel-item v-for="(item, index) in khoTshebData" :key="index">
          <v-img
            :src="item.image[0] || '/placeholder.jpg'"
            class="fill-height"
            cover
          />
        </v-carousel-item>
      </v-carousel>
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

    <!-- Product Grid -->
    <v-container fluid class="pa-4">
      <v-row>
        <v-col
          v-for="(item, index) in khoTshebData"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
        >
          <v-card class="product-card d-flex flex-column" elevation="1" hover>
            <!-- Image -->
            <div class="image-container position-relative">
              <v-img
                :src="item.image[0]"
                aspect-ratio="1"
                cover
                class="product-image"
                height="200"
              />

              <div v-if="item.image.length > 1" class="image-count-badge">
                <v-icon size="small" class="mr-1">mdi-camera</v-icon>
                {{ item.image.length }}
              </div>

              <div v-if="item.isBestSeller" class="best-seller-badge">
                #1 Best Seller
              </div>
            </div>

            <!-- Product Info -->
            <!-- Product Info - When locationgps is null (show price) -->
            <v-card-text class="flex-grow-1" v-if="!item.locationgps">
              <div class="text-primary text-h6 font-weight-medium">
                {{ item.name }}
              </div>
              <div class="text-primary font-weight-medium">
                {{ item.type }}
              </div>
              <div>{{ item.detail }}</div>

              <div class="d-flex text-h6 mt-2">
                <span
                  v-if="item.Price2"
                  class="text-red text-decoration-line-through mr-2"
                >
                  LAK {{ formatPrice(item.Price2) }}
                </span>
                <span class="font-weight-bold">
                  LAK {{ formatPrice(item.Price1) }}
                </span>
              </div>

              <div class="d-flex align-center mt-2">
                <v-icon color="grey">mdi-phone</v-icon>
                <span class="font-weight-bold text-blue ml-2">
                  {{ item.tel }}
                </span>
              </div>

              <div class="text-caption text-grey-darken-2 mb-1">
                Get it as soon as <strong>{{ getDeliveryDate() }}</strong>
              </div>
            </v-card-text>

            <!-- Product Info - When locationgps has value (hide price, show location) -->
            <v-card-text class="flex-grow-1" v-else>
              <div class="text-primary text-h6 font-weight-medium">
                {{ item.name }}
              </div>
              <div class="text-primary font-weight-medium">
                {{ item.type }}
              </div>
              <div>{{ item.detail }}</div>

              <div class="d-flex align-center mt-2">
                <v-icon color="grey">mdi-phone</v-icon>
                <span class="font-weight-bold text-blue ml-2">
                  {{ item.tel }}
                </span>
              </div>
              <div class="d-flex align-center mt-2">
                <v-icon color="grey">mdi-map-marker</v-icon>
                <span class="font-weight-bold text-blue ml-2">
                  {{ item.locationgps }}
                </span>
              </div>

              <div class="text-caption text-grey-darken-2 mb-1">
                Get it as soon as <strong>{{ getDeliveryDate() }}</strong>
              </div>
            </v-card-text>

            <!-- Button: View Gallery -->
            <v-card-actions class="pa-3 pt-0">
              <v-btn
                block
                color="primary"
                variant="outlined"
                class="text-none font-weight-medium"
                size="small"
                @click.stop="selectItems(item)"
              >
                <v-icon size="small" class="mr-1">mdi-eye</v-icon>
                View Gallery
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- ✅ Conditional rendering based on locationgps -->
    <KhoTshebComponemt
      v-if="locationgps === null"
      :selected-item="selectedItems"
      :channels="khoTshebData"
      @update:selected-item="selectedItems = $event"
    />

    <!-- Full old v-dialog restored -->
    <v-dialog v-else v-model="showDetails" max-width="800px">
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

          <!-- Price Information - Hidden when locationgps is not null -->

          <!-- Property Information -->
          <v-card class="mb-4 pa-4" elevation="1">
            <h3 class="mb-3">Property Information</h3>
            <v-row>
              <v-col cols="12" sm="6">
                <div class="mb-1">
                  <strong>Type:</strong>
                  <v-chip size="small" color="primary" class="ml-2">
                    {{ detailItem.type || "-" }}
                  </v-chip>
                </div>
              </v-col>
              <!-- <v-col cols="12" sm="6">
                <div class="mb-1">
                  <strong>Total Rooms:</strong>
                  <span class="ml-2 text-red font-weight-bold">
                    {{ detailItem.totalroom || "-" }}
                  </span>
                </div>
              </v-col> -->
              <v-col cols="12" sm="12">
                <div class="mb-0">
                  <strong>Details:</strong>
                  <v-divider></v-divider>
                  <div>
                    <span class="ml-2 text-red font-weight-bold">
                      {{ detailItem.detail }}
                    </span>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" v-if="detailItem.name">
                <div class="mb-2">
                  <strong>Title:</strong>
                  <span class="ml-2">{{ detailItem.name }}</span>
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
              <v-col cols="12">
                <div class="mb-2">
                  <strong>GPS Location:</strong>
                  <div class="mt-1">{{ detailItem.locationgps || "N/A" }}</div>
                </div>
              </v-col>
            </v-row>
          </v-card>

          <!-- Contact Information -->
          <v-card class="mb-4 pa-4 bg-blue-lighten-5" elevation="1">
            <h3 class="mb-3">
              <v-icon color="primary" class="mr-2">mdi-phone</v-icon>
              Contact Information
            </h3>
            <v-row>
              <v-col cols="12">
                <div class="mb-2">
                  <a
                    :href="'tel:' + detailItem.tel"
                    class="ml-2 text-blue text-decoration-none"
                  >
                    <v-icon size="small" class="mr-1">mdi-phone</v-icon>
                    {{ detailItem.tel }}
                  </a>
                </div>
              </v-col>
            </v-row>
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
import { ref, onMounted } from "vue";
import KhoTshebComponemt from "~/components/KhoTshebComponemt.vue";

const { khoTshebData, fetchKhoTsheb } = useKhoTsheb();
const selectedItems = ref(null);
const locationgps = ref(null);
const showDetails = ref(false);
const detailItem = ref(null);

onMounted(async () => {
  await fetchKhoTsheb();
  console.log("Kho Tsheb fetched:", khoTshebData.value);
});

const selectItems = (item) => {
  // Check if item.locationgps is null or not
  if (
    item.locationgps === null ||
    item.locationgps === undefined ||
    item.locationgps === ""
  ) {
    // locationgps is null - use KhoTshebComponemt
    locationgps.value = null;
    selectedItems.value = { ...item, slide: 0 };
  } else {
    // locationgps is not null - use v-dialog
    locationgps.value = item.locationgps;
    detailItem.value = item;
    showDetails.value = true;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
};

function formatPrice(price) {
  if (!price) return "0";
  return Number(price).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

const getDeliveryDate = () => {
  const date = new Date();
  const options = { weekday: "short", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

// Search and Filter states
const searchQuery = ref("");
const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const selectedVillage = ref(null);

// Location data for Vientiane Capital
const locationData = {
  "Vientiane Capital": {
    Chanthabuly: [
      "Ban Haysoke",
      "Ban Mixay",
      "Ban Sihom",
      "Ban Anou",
      "Ban Hatsady",
      "Ban Simuang",
    ],
    Sikhottabong: [
      "Ban Nongbone",
      "Ban Thongkang",
      "Ban Nongduang",
      "Ban Donekoy",
      "Ban Nonsavang",
      "Ban Dongpaina",
    ],
    Xaysetha: [
      "Ban Phonthan",
      "Ban Naxeng",
      "Ban Dongdok",
      "Ban Phontong",
      "Ban Nongtha",
      "Ban Donnokkhoum",
    ],
    Sisattanak: [
      "Ban Phonphanao",
      "Ban Nongveng",
      "Ban Dongmieng",
      "Ban Nonghai",
      "Ban Dongnasok",
      "Ban Saphanmo",
    ],
    Naxaithong: [
      "Ban Donxang",
      "Ban Naxay",
      "Ban Nongsa",
      "Ban Phiengdi",
      "Ban Thongpong",
      "Ban Donekoy",
    ],
    Xaythany: [
      "Ban Phonthan Neua",
      "Ban Phonthan Tai",
      "Ban Nongviengkham",
      "Ban Nabo",
      "Ban Sivilai",
      "Ban Nongtha",
    ],
    Hadxaifong: [
      "Ban Dongkhamxang",
      "Ban Thongmang",
      "Ban Hadxaifong",
      "Ban Phonhong",
      "Ban Nongbouathong",
      "Ban Sivilay",
    ],
    Sangthong: [
      "Ban Phonsinuan",
      "Ban Nongthong",
      "Ban Donexay",
      "Ban Phonsin",
      "Ban Nonghin",
      "Ban Sangthong",
    ],
    Pakngum: [
      "Ban Thongmang",
      "Ban Nongkaew",
      "Ban Phonngam",
      "Ban Natan",
      "Ban Donkoy",
      "Ban Hatkhamphone",
    ],
  },
};
// --- Computed Select Lists ---
const provinces = computed(() => Object.keys(locationData));
const districts = computed(() => {
  if (!selectedProvince.value) return [];
  return Object.keys(locationData[selectedProvince.value]);
});
const villages = computed(() => {
  if (!selectedProvince.value || !selectedDistrict.value) return [];
  return locationData[selectedProvince.value][selectedDistrict.value];
});

// --- Select Change Handlers ---
function onProvinceChange() {
  selectedDistrict.value = null;
  selectedVillage.value = null;
}
function onDistrictChange() {
  selectedVillage.value = null;
}

// --- Search Handler ---
function handleSearch() {
  const province = selectedProvince.value;
  const district = selectedDistrict.value;
  const village = selectedVillage.value;
  const query = searchQuery.value.trim().toLowerCase();

  // Example Search Logic
  console.log("Search Query:", query);
  console.log("Province:", province);
  console.log("District:", district);
  console.log("Village:", village);

  if (!query && !province && !district && !village) {
    alert("Please enter a search query or select a location!");
    return;
  }

  // For demo purpose
  alert(
    `Searching for "${query || "all"}" in ${
      village || district || province || "all areas"
    }`
  );
}
</script>

<style scoped>
.product-card {
  border-radius: 8px;
  transition: all 0.2s ease;
}
.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.image-container {
  position: relative;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  background: #f8f8f8;
}
.image-count-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  display: flex;
  align-items: center;
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
