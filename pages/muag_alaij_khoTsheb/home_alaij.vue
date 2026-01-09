<template>
  <v-app fluid>
    <!-- Top Auto Carousel -->
    <v-container class="pa-4 bg-grey-lighten-3">
      <v-carousel cycle show-arrows v-model="carouselIndex" hide-delimiters interval="4000">
        <v-carousel-item v-for="(img, index) in channelimage" :key="index">
          <v-img
            :src="img || '/placeholder.jpg'"
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
          v-for="(item, index) in allkhoTshebData"
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
              <div class="mb-2">
                <div class="d-flex align-center">
                  <span class="text-red">LAK</span>
                  <span class="text-h6 ml-1">{{
                    formatPrice(item.price2)
                  }}</span>
                  <span
                    class="text-body-3 align-self-start text-decoration-line-through text-grey-darken-1"
                    >{{ formatPrice(item.price1) }}</span
                  >
                </div>
              </div>
              <div class="d-flex align-center mt-2">
                <v-icon color="grey">mdi-phone</v-icon>
                <span class="font-weight-bold text-blue ml-2">
                  {{ item.tel }}
                </span>
              </div>
              <div class="ml-6 mt-1">{{ item.detail }}</div>
            </v-card-text>
            <!-- ========== Product Info - When locationgps has value (hide price, show location) ========== -->
            <v-card-text class="flex-grow-1" v-else>
              <div class="text-primary text-h6 font-weight-medium">
                {{ item.name }}
              </div>
              <div class="text-primary font-weight-medium">
                {{ item.type }}
              </div>

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
              <div class="ml-6 mt-1">{{ item.detail }}</div>
            </v-card-text>

            <v-container class="pa-3 pt-0">
              <v-row dense class="d-flex flex-column ga-2">
                <!-- ADD TO CART -->
                <v-col cols="12" class="w-50" v-if="!item.locationgps">
                  <div v-if="getProductQty(item.id) === 0">
                    <v-btn
                      block
                      color="success"
                      class="text-none font-weight-bold"
                      size="large"
                      @click.stop="addToCart(item)"
                      rounded="lg"
                      elevation="2"
                    >
                      <v-icon class="mr-2">mdi-cart-plus</v-icon>
                      Add to Cart
                    </v-btn>
                  </div>

                  <!-- QTY CONTROLS -->
                  <div v-else>
                    <div
                      class="quantity-wrapper-small bg-green"
                      style="
                        border: 1px solid green;
                        border-radius: 50px;
                        padding: 4px;
                      "
                    >
                      <v-btn
                        icon
                        size="small"
                        color="primary"
                        class="qty-btn-small"
                        @click.stop="decrementQty(item.id)"
                      >
                        <v-icon size="16" color="red">mdi-minus</v-icon>
                      </v-btn>

                      <span
                        class="qty-display-small bg-green text-white"
                        style="border-radius: 6px; padding: 2px 6px"
                      >
                        {{ getProductQty(item.id) }}
                      </span>

                      <v-btn
                        icon
                        size="small"
                        color="primary"
                        class="qty-btn-small"
                        @click.stop="incrementQty(item.id)"
                      >
                        <v-icon size="16" color="green">mdi-plus</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </v-col>

                <!-- VIEW DETAILS BUTTON -->
                <v-col cols="12">
                  <v-container
                    class="d-flex justify-end pa-0"
                    @click.stop="selectItems(item)"
                  >
                    <v-span
                      style="cursor: pointer; text-decoration: underline"
                      class="text-blue"
                    >
                      Show More Details</v-span
                    >
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- ================ Show Top Product and slider  ================ -->
    <v-divider class="my-4"></v-divider>
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

    <!-- ✅ Conditional rendering based on locationgps -->
    <KhoTshebComponemt
      v-if="locationgps === null"
      :selected-item="selectedItems"
      :channels="allkhoTshebData"
      @update:selected-item="selectedItems = $event"
    />

    <!-- ✅ Detail Dialog Component KhoTsheb locationgps -->
    <DialogShowDetailKhoTsheb
      :detail-item="detailItem"
      :show-details="showDetails"
      @update:show-details="showDetails = $event"
    />
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import KhoTshebComponemt from "~/components/KhoTshebComponemt.vue";

const {
  khoTshebData,
  fetchKhoTsheb,
  allkhoTshebData,
  topData,
  pagination,
  loading,
  error,
  channelimage,
  qr,
} = useKhoTsheb();
const selectedItems = ref(null);
const locationgps = ref(null);
const showDetails = ref(false);
const detailItem = ref(null);
const carouselIndex = ref(0);


const store = useProductSellStore();
const getProductQty = (productId) => {
  const cartItem = store.cartItems?.find((item) => item.id === productId);
  return cartItem ? cartItem.quantity || 0 : 0;
};
const incrementQty = (productId) => {
  const cartItem = store.cartItems?.find((item) => item.id === productId);
  if (!cartItem) {
    return;
  }

  const product = allkhoTshebData.value?.find((p) => p.id === productId);
  if (!product) {
    return;
  }

  console.log("Current qty:", cartItem.quantity);

  const newQty = (cartItem.quantity || 0) + 1;

  let price = 0;
  if (product.price2 !== 0 && product.price2 !== null) {
    price = product.price2;
  } else {
    price = product.price1;
  }

  const updatedItem = {
    ...cartItem,
    quantity: newQty,
    price: price,
  };

  store.updateCart(updatedItem);
};
const decrementQty = (productId) => {
  const cartItem = store.cartItems?.find((item) => item.id === productId);
  if (!cartItem) {
    return;
  }

  if (cartItem.quantity > 1) {
    const product = allkhoTshebData.value?.find((p) => p.id === productId);
    const newQty = cartItem.quantity - 1;

    let price = 0;
    if (product && product.price2 !== 0 && product.price2 !== null) {
      price = product.price2;
    } else if (product) {
      price = product.price1;
    }
    console.log("Current qty111:", newQty);

    const updatedItem = {
      ...cartItem,
      quantity: newQty,
      price: price,
    };

    store.updateCart(updatedItem);
  } else {
    store.removeFromCart(productId);
  }
};
onMounted(async () => {
  await fetchKhoTsheb();
  console.log("Kho Tsheb fetched:", allkhoTshebData.value);
  console.log("Cart items:", store.cartItems?.length || 0);
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

// ------ End Search Handler -----

const addToCart = (product) => {
  let price = 0;
  if (product.price2 !== 0 && product.price2 !== null) {
    price = product.price2;
  } else {
    price = product.price1;
  }

  const cartItem = {
    ...product,
    quantity: 1,
    unit: "ອັນ",
    price: price,
    qr: qr.value,
    // qrimage: qrimage.value,
  };

  store.addToCart(cartItem);
};
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
/* ----- */
.quantity-wrapper-small {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.qty-btn-small {
  width: 28px !important;
  height: 28px !important;
  min-width: 28px !important;
  border-radius: 12px !important; /* box-style */
  padding: 0 !important;
  background-color: yellow !important;
}
</style>
