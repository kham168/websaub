<template>
  <v-app fluid>
    <v-container class="pa-4 bg-grey-lighten-3">
      <v-carousel
        v-model="carouselIndex"
        cycle
        show-arrows
        hide-delimiters
        interval="4000"
      >
        <v-carousel-item
          v-for="(img, index) in channelimage || []"
          :key="`carousel-${index}`"
        >
          <v-img
            :src="img || '/placeholder.jpg'"
            class="fill-height"
            cover
            eager
          >
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

    <!-- ================== Show all Product ================= -->
    <v-container fluid class="pa-4">
      <v-row>
        <v-col
          v-for="(item, index) in allCreams"
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
                contain
                class="product-image"
                height="200"
              />

              <!-- <div v-if="item.image.length > 1" class="image-count-badge mr-4">
                <v-icon size="small" class="mr-1">mdi-camera</v-icon>
                {{ item.image.length }}
              </div> -->

              <div v-if="item.isBestSeller" class="best-seller-badge">
                #1 Best Seller
              </div>
            </div>

            <!-- Product Info - Clickable -->
            <v-card-text class="flex-grow-1 pa-3">
              <div class="text-caption mb-1 font-weight-medium">
                {{ item.creamname }}
              </div>

              <!-- <div class="mb-2">
                <div class="d-flex align-center">
                  <span class="text-red">LAK</span>
                  <span class="text-h6 ml-1">{{
                    formatPrice(item.price2)
                  }}</span>
                  <span 
                  v-if="Number(item.price1) > 0"
                    class="text-body-3 align-self-start text-decoration-line-through text-grey-darken-1"
                    >{{ formatPrice(item.price1) }}</span
                  >
                </div>
              </div> -->
              <div class="mb-2">
                <div class="d-flex align-center">
                  <span class="text-red">LAK</span>

                  <!-- Main price -->
                  <span
                    class="text-h6 ml-1"
                  >
                    {{ formatPrice(item.price2) }}
                  </span>

                  <!-- Old price (show only if valid) -->
                  <span
                    v-if="Number(item.price1) > 0"
                    class="text-body-3 align-self-start text-decoration-line-through text-grey-darken-1 ml-2"
                  >
                    {{ formatPrice(item.price1) }}
                  </span>
                </div>
              </div>

              <div class="text-caption text-primary mb-1 font-weight-medium">
                {{ item.tel }}
              </div>
              <div class="text-caption mb-1 font-weight-medium">
                {{ item.detail }}
              </div>
            </v-card-text>

            <!-- Cart Actions -->
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
      <div class="text-center mt-10">
        <v-btn
          variant="text"
          v-if="allCreams.length < totalItems"
          color="primary"
          :loading="loading1"
          @click="loadMore"
          class="font-weight-bold"
          >Load More</v-btn
        >
      </div>
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

    <CreamComponemt
      :selected-item="selectedItem"
      :channels="allCreams"
      @update:selected-item="selectedItem = $event"
    />
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProductSellStore } from "@/stores/index";

const {
  allCreams,
  fetchBrandCream,
  loading,
  error,
  pagination,
  topData,
  channelimage,
  qr,
  seeMore,
  totalItems,
} = useBrandCream();

const selectedItem = ref(null);
const searchQuery = ref("");
const store = useProductSellStore();
const currentPage = ref(0);
const loading1 = ref(false);

// Get product quantity from cart by ID
const getProductQty = (productId) => {
  const cartItem = store.cartItems?.find((item) => item.id === productId);
  return cartItem ? cartItem.quantity || 0 : 0;
};
const carouselIndex = ref(0);

// Select item for detail view
const selectItem = (item) => {
  selectedItem.value = { ...item, slide: 0 };
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Add to cart
const addToCart = (product) => {
  let price = 0;
  if (product.price1 !== 0 && product.price1 !== null) {
    price = product.price1;
  } else {
    price = product.price2;
  }

  const cartItem = {
    ...product,
    quantity: 1,
    unit: "ອັນ",
    price: price,
    qr: qr.value,
  };
  console.log("cartItem---------->fgfdhgbfhbgj", qr.value);
  // if (qr) {
  //   console.warn("QR code not loaded yet!");
  // }
  store.addToCart(cartItem);
};

// Increment quantity by product ID
const incrementQty = (productId) => {
  const cartItem = store.cartItems?.find((item) => item.id === productId);
  if (!cartItem) {
    return;
  }

  const product = allCreams.value?.find((p) => p.id === productId);
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

// Decrement quantity by product ID
const decrementQty = (productId) => {
  const cartItem = store.cartItems?.find((item) => item.id === productId);
  if (!cartItem) {
    return;
  }

  if (cartItem.quantity > 1) {
    const product = allCreams.value?.find((p) => p.id === productId);
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

// Handle search
const handleSearch = () => {
  // console.log("Searching for:", searchQuery.value);
};

// Get delivery date
onMounted(async () => {
  await fetchBrandCream();
});
const loadMore = async () => {
  // if (seeMore.value) {
  loading1.value = true;
  currentPage.value++; // increase page
  setTimeout(async () => {
    await seeMore(currentPage.value);
    loading1.value = false;
  }, 2000);
  // }
};
</script>

<style scoped>
.product-card {
  height: 100%;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
}

.image-container {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.product-image {
  transition: transform 0.3s;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.image-count-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  display: flex;
  align-items: center;
}

.best-seller-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: #ff6b35;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
}

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
