<template>
  <v-app>
    <v-container class="pa-4 bg-grey-lighten-3">
    
      <v-carousel cycle show-arrows hide-delimiters interval="4000">
        <v-carousel-item
          v-for="(img, index) in channelimage || []"
          :key="index"
        >
          <v-img
            :src="img || '/placeholder.jpg'"
            error-src="/placeholder.jpg"
            class="fill-height"
            cover
          />
        </v-carousel-item>

        <!-- Fallback if channelimage is empty -->
        <v-carousel-item
          v-if="!(channelimage && channelimage.length)"
        >
          <v-img src="/placeholder.jpg" class="fill-height" cover />
        </v-carousel-item>
      </v-carousel>
    </v-container>
    <!-- Products Section -->
    <!-- <section class="products-section"> -->
    <v-container fluid class="px-4 px-md-8 py-12">
      <v-container class="pa-4">
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <!-- Search Bar -->
            <v-text-field
              v-model="searchQuery"
              placeholder="Search by ..."
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
            v-for="(item, index) in allDataMuagTshuaj"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            xl="2"
          >
            <v-card
              class="product-card d-flex flex-column"
              elevation="1"
              hover
              @click="selectItem(item)"
            >
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

              <!-- Button: View Gallery -->
              <!-- <v-card-actions class="pa-3 pt-0">
                <v-btn
                  block
                  color="primary"
                  variant="outlined"
                  class="text-none font-weight-medium"
                  size="small"
                >
                  <v-icon size="small" class="mr-1">mdi-eye</v-icon>
                  View Gallery
                </v-btn>
              </v-card-actions> -->
              <v-container class="pa-3 pt-0">
                <v-row dense class="d-flex flex-column ga-2">
                  <!-- ADD TO CART -->
                  <v-col cols="12" class="w-50">
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
                      @click.stop="selectItem(item)"
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
    </v-container>
    <!-- </section> -->

    <!-- Product Detail Component -->
    <MuagTshuajComponent
      :selected-item="selectedItem"
      :channels="allDataMuagTshuaj"
      @update:selected-item="selectedItem = $event"
    />
  </v-app>
</template>

<script setup>
const {
  fetchMuagTshuaj,
  topData,
  loading,
  error,
  allDataMuagTshuaj,
  channelData,
  channelimage,
  qr
} = useMuagTshuaj();
const store = useProductSellStore();
const selectedItem = ref(null);

onMounted(async () => {
  await fetchMuagTshuaj();
  console.log("Muag Tshuaj Data:", channelData.value);
});

const selectItem = (item) => {
  selectedItem.value = { ...item, slide: 0 };
  window.scrollTo({ top: 0, behavior: "smooth" });
};

function formatPrice(price) {
  if (!price) return "0.00";
  return Number(price).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
// add to cart functionality
const getProductQty = (productId) => {
  const cartItem = store.cartItems?.find((item) => item.id === productId);
  return cartItem ? cartItem.quantity || 0 : 0;
};
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
    
  };

  store.addToCart(cartItem);
};
const decrementQty = (productId) => {
  const cartItem = store.cartItems?.find((item) => item.id === productId);
  if (!cartItem) {
    return;
  }

  if (cartItem.quantity > 1) {
    const product = allDataMuagTshuaj.value?.find((p) => p.id === productId);
    const newQty = cartItem.quantity - 1;

    let price = 0;
    if (product && product.price2 !== 0 && product.price2 !== null) {
      price = product.price2;
    } else if (product) {
      price = product.price1;
    }

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
const incrementQty = (productId) => {
  const cartItem = store.cartItems?.find((item) => item.id === productId);
  if (!cartItem) {
    return;
  }

  const product = allDataMuagTshuaj.value?.find((p) => p.id === productId);
  if (!product) {
    return;
  }

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
</script>

<style scoped>
.product-card {
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 1px solid #e0e0e0;
  background: white;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  border-color: #1976d2;
}

/* Image Section */
.image-wrapper {
  position: relative;
  overflow: hidden;
  background: #f5f5f5;
}

.product-image {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover .product-image {
  transform: scale(1.08);
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
/* css add to cart */
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
.qty-display-small {
  font-size: 14px;
  font-weight: 600;
  min-width: 26px;
  padding: 2px 6px;
  text-align: center;
  border-radius: 6px;
  background-color: white;
}
</style>
