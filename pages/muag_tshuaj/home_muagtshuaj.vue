
<template>
    <v-app fluid>
      <!-- Top Auto Carousel -->
      <v-container class="pa-4 bg-grey-lighten-3">
        <v-carousel
          cycle
          show-arrows
          hide-delimiters
          interval="4000"
        >
          <v-carousel-item v-for="(item, index) in items" :key="index">
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
      <!-- show all brand -->
      <v-container fluid class="pa-4">
        <!-- Main Slideshow Display at Top -->
        <v-row v-if="selectedItem" class="mb-6">
          <v-col cols="12">
            <v-card elevation="3" class="slideshow-card">
              <v-card-title class="d-flex justify-space-between align-center">
                <div>
                  <div class="text-h5 font-weight-bold">
                    {{ selectedItem.channel }}
                  </div>
                  <div class="text-subtitle-1 text-grey">
                    {{ selectedItem.title || selectedItem.name }}
                  </div>
                </div>
                <v-btn
                  icon="mdi-close"
                  variant="text"
                  @click="selectedItem = null"
                />
              </v-card-title>
  
              <v-divider />
  
              <!-- Large Slideshow -->
              <div class="slideshow-container">
                <v-window v-model="selectedItem.slide" show-arrows>
                  <template v-slot:prev="{ props }">
                    <v-btn
                      icon="mdi-chevron-left"
                      size="large"
                      v-bind="props"
                      class="slideshow-arrow"
                      color="primary"
                    />
                  </template>
                  <template v-slot:next="{ props }">
                    <v-btn
                      icon="mdi-chevron-right"
                      size="large"
                      v-bind="props"
                      class="slideshow-arrow"
                      color="primary"
                    />
                  </template>
  
                  <v-window-item
                    v-for="(img, i) in selectedItem.image"
                    :key="`slideshow-${i}`"
                  >
                    <v-img
                      :src="img"
                      height="500"
                      contain
                      class="slideshow-image"
                    />
                  </v-window-item>
                </v-window>
  
                <!-- Thumbnail Navigation -->
                <div class="thumbnail-nav">
                  <v-btn
                    v-for="(img, i) in selectedItem.image"
                    :key="`thumb-${i}`"
                    :class="[
                      'thumbnail-btn',
                      { active: selectedItem.slide === i },
                    ]"
                    @click="selectedItem.slide = i"
                    variant="flat"
                  >
                    <v-img
                      :src="img"
                      height="80"
                      width="80"
                      cover
                      class="thumbnail-image"
                    />
                  </v-btn>
                </div>
              </div>
  
              <!-- Slideshow Info -->
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="8">
                    <div class="d-flex align-center mb-3">
                      <v-rating
                        v-if="selectedItem.rating"
                        :model-value="selectedItem.rating"
                        density="compact"
                        color="amber"
                        half-increments
                        readonly
                      />
                      <span class="text-body-2 ml-2 text-grey-darken-1">
                        {{ selectedItem.reviewCount || 0 }} reviews
                      </span>
                    </div>
  
                    <div class="text-body-1 mb-2">
                      {{
                        selectedItem.description || "No description available."
                      }}
                    </div>
                  </v-col>
  
                  <v-col cols="12" md="4">
                    <v-card variant="outlined" class="pa-4">
                      <div class="mb-3">
                        <div v-if="selectedItem.discount" class="mb-2">
                          <v-chip
                            size="small"
                            color="red"
                            text-color="white"
                            class="font-weight-bold"
                          >
                            -{{ selectedItem.discount }}% OFF
                          </v-chip>
                        </div>
                        <div class="d-flex align-center">
                          <span class="price-symbol-large">$</span>
                          <span class="price-whole-large">{{
                            getPriceWhole(selectedItem.price)
                          }}</span>
                          <span class="price-decimal-large">{{
                            getPriceDecimal(selectedItem.price)
                          }}</span>
                        </div>
                        <div
                          v-if="selectedItem.originalPrice"
                          class="text-body-2 text-grey"
                        >
                          List Price:
                          <span class="text-decoration-line-through"
                            >${{ selectedItem.originalPrice }}</span
                          >
                        </div>
                      </div>
  
                      <v-btn
                        block
                        color="green"
                        size="large"
                        variant="flat"
                        class="text-none font-weight-bold mb-2"
                        prepend-icon="mdi-book-open-page-variant"
                        @click="viewDetails(selectedItem)"
                      >
                        Read Now
                      </v-btn>
  
                      <div class="text-caption text-center text-grey-darken-1">
                        Get it by <strong>{{ getDeliveryDate() }}</strong>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
  
        <!-- Product Grid -->
        <v-row>
          <v-col
            v-for="(item, index) in items"
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
              <!-- Image Preview -->
              <div class="image-container position-relative">
                <v-img
                  :src="item.image[0]"
                  aspect-ratio="1"
                  cover
                  class="product-image"
                  height="200"
                />
  
                <!-- Image Count Badge -->
                <div v-if="item.image.length > 1" class="image-count-badge">
                  <v-icon size="small" class="mr-1">mdi-camera</v-icon>
                  {{ item.image.length }}
                </div>
  
                <!-- Best Seller Badge -->
                <div v-if="item.isBestSeller" class="best-seller-badge">
                  #1 Best Seller
                </div>
              </div>
  
              <!-- Product Info -->
              <v-card-text class="flex-grow-1 pa-3">
                <!-- Channel/Brand Name -->
                <div class="text-caption text-primary mb-1 font-weight-medium">
                  {{ item.channel }}
                </div>
  
                <!-- Rating -->
                <div v-if="item.rating" class="d-flex align-center mb-2">
                  <v-rating
                    :model-value="item.rating"
                    density="compact"
                    size="small"
                    color="amber"
                    half-increments
                    readonly
                  />
                  <span class="text-caption text-grey-darken-1 ml-1">
                    {{ item.reviewCount || 0 }}
                  </span>
                </div>
  
                <!-- Price Section -->
                <div class="mb-2">
                  <div v-if="item.discount" class="mb-1">
                    <v-chip
                      size="x-small"
                      color="red"
                      text-color="white"
                      class="font-weight-bold"
                    >
                      -{{ item.discount }}%
                    </v-chip>
                  </div>
                  <div class="d-flex align-center">
                    <span class="price-symbol">$</span>
                    <span class="price-whole">{{
                      getPriceWhole(item.Price1rice)
                    }}</span>
                    <span class="price-decimal">{{
                      getPriceDecimal(item.Price2rice)
                    }}</span>
                  </div>
                  <div v-if="item.originalPrice" class="text-caption text-grey">
                    List:
                    <span class="text-decoration-line-through"
                      >${{ item.originalPrice }}</span
                    >
                  </div>
                </div>
  
                <!-- Delivery Info -->
                <div class="text-caption text-grey-darken-2 mb-1">
                  Get it as soon as <strong>{{ getDeliveryDate() }}</strong>
                </div>
              </v-card-text>
  
              <!-- Click to View Badge -->
              <v-card-actions class="pa-3 pt-0">
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
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
const { fetchMuagTshuaj, items, topData, pagination } = useMuagTshuaj();  
  const selectedItem = ref(null);
  
  onMounted(async () => {
    await fetchMuagTshuaj();
    console.log("allDatamuagtshuaj:", items.value);

  });
  
  const selectItem = (item) => {
    selectedItem.value = { ...item, slide: 0 };
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const getPriceWhole = (price) => {
    return Math.floor(price || 0);
  };
  
  const getPriceDecimal = (price) => {
    const decimal = ((price || 0) % 1).toFixed(2).substring(1);
    return decimal;
  };
  
  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    const options = { weekday: "short", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  
  const viewDetails = (item) => {
    window.location.href = `/${item.path}`;
  };
  </script>
  
  <style scoped>
  /* Slideshow Styles */
  .slideshow-card {
    border-radius: 12px;
    overflow: hidden;
  }
  
  .slideshow-container {
    background: #f5f5f5;
    position: relative;
  }
  
  .slideshow-image {
    background: white;
  }
  
  .slideshow-arrow {
    margin: 0 16px;
  }
  
  .thumbnail-nav {
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 16px;
    background: white;
    flex-wrap: wrap;
  }
  
  .thumbnail-btn {
    padding: 4px !important;
    min-width: 80px !important;
    height: auto !important;
    border: 2px solid transparent;
    border-radius: 8px;
    transition: all 0.2s;
  }
  
  .thumbnail-btn.active {
    border-color: #1976d2;
    box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
  }
  
  .thumbnail-btn:hover {
    border-color: #90caf9;
  }
  
  .thumbnail-image {
    border-radius: 4px;
  }
  
  .price-symbol-large {
    font-size: 16px;
    vertical-align: top;
    margin-top: 4px;
    font-weight: 500;
  }
  
  .price-whole-large {
    font-size: 36px;
    font-weight: 600;
    line-height: 1;
  }
  
  .price-decimal-large {
    font-size: 16px;
    vertical-align: top;
    margin-top: 4px;
    font-weight: 500;
  }
  
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
    font-size: 12px;
    font-weight: 600;
    border-radius: 4px;
    display: flex;
    align-items: center;
    z-index: 2;
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
  
  .product-title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4;
    min-height: 2.8em;
    color: #0066c0;
    font-weight: 400;
  }
  
  .product-title:hover {
    color: #c45500;
    text-decoration: underline;
  }
  
  .price-symbol {
    font-size: 13px;
    vertical-align: top;
    margin-top: 3px;
    font-weight: 500;
    color: #0f1111;
  }
  
  .price-whole {
    font-size: 28px;
    font-weight: 500;
    line-height: 1;
    color: #0f1111;
  }
  
  .price-decimal {
    font-size: 13px;
    vertical-align: top;
    margin-top: 3px;
    font-weight: 500;
    color: #0f1111;
  }
  </style>