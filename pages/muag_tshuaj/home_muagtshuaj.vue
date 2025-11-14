<template>
  <v-app>
    <!-- Hero Carousel Section -->
    <section class="hero-section">
      <v-container fluid class="pa-0">
        <v-carousel
          cycle
          show-arrows="hover"
          hide-delimiters
          interval="5000"
          height="500"
          class="hero-carousel"
        >
          <v-carousel-item
            v-for="(item, index) in items"
            :key="`carousel-${index}`"
          >
            <div class="carousel-item-wrapper">
              <v-img
                :src="item.image[0] || '/placeholder.jpg'"
                cover
                class="carousel-image"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              >
                <div class="carousel-content">
                  <v-container>
                    <div class="carousel-text-wrapper">
                      <v-chip
                        v-if="item.isBestSeller"
                        color="error"
                        size="small"
                        class="mb-4 bestseller-chip"
                      >
                        <v-icon start>mdi-star</v-icon>
                        Best Seller
                      </v-chip>
                      <h1 class="carousel-title">
                        {{ item.title || item.name }}
                      </h1>
                      <p class="carousel-subtitle">
                        {{ item.channel }}
                      </p>
                      <div class="carousel-price">
                        <span class="price-label">Starting from</span>
                        <div class="price-display">
                          <span class="currency">LAK</span>
                          <span class="amount">{{ item.Price2 }}</span>
                        </div>
                      </div>
                    </div>
                  </v-container>
                </div>
              </v-img>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-container>
    </section>

    <!-- Products Section -->
    <section class="products-section">
      <v-container fluid class="px-4 px-md-8 py-12">
        <!-- Section Header -->
        <div class="section-header text-center mb-8">
          <h2 class="section-title">Featured Products</h2>
          <p class="section-subtitle">
            Discover our exclusive collection of premium items
          </p>
          <v-divider
            class="mx-auto mt-4"
            style="max-width: 100px; border-width: 3px"
            color="primary"
          ></v-divider>
        </div>

        <!-- Product Grid -->
        <v-row class="product-grid">
          <v-col
            v-for="(item, index) in items"
            :key="`product-${index}`"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            xl="2"
          >
            <v-card
              class="product-card"
              elevation="0"
              @click="selectItem(item)"
            >
              <!-- Image Section -->
              <div class="image-wrapper">
                <v-img
                  :src="item.image[0]"
                  aspect-ratio="1"
                  cover
                  class="product-image"
                >
                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular
                        indeterminate
                        color="primary"
                      ></v-progress-circular>
                    </div>
                  </template>
                </v-img>

                <!-- Badges -->
                <div class="badges-container">
                  <v-chip
                    v-if="item.discount"
                    color="error"
                    size="small"
                    class="discount-badge"
                  >
                    -{{ item.discount }}%
                  </v-chip>
                  <v-chip
                    v-if="item.isBestSeller"
                    color="warning"
                    size="x-small"
                    class="bestseller-badge"
                  >
                    #1
                  </v-chip>
                </div>

                <!-- Image Count -->
                <div v-if="item.image.length > 1" class="image-count">
                  <v-icon size="x-small">mdi-camera</v-icon>
                  <span>{{ item.image.length }}</span>
                </div>

                <!-- Hover Overlay -->
                <div class="hover-overlay">
                  <v-btn icon size="large" color="white" class="view-btn">
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                </div>
              </div>

              <!-- Product Info -->
              <v-card-text class="product-info pa-4">
                <!-- Brand -->
                <div class="brand-name">
                  {{ item.channel }}
                </div>

                <!-- Product Name -->
                <h3 class="product-name">
                  {{ item.name }}
                </h3>

                <!-- Rating -->
                <div v-if="item.rating" class="rating-section">
                  <v-rating
                    :model-value="item.rating"
                    density="compact"
                    size="small"
                    color="amber"
                    half-increments
                    readonly
                  />
                  <span class="review-count">
                    ({{ item.reviewCount || 0 }})
                  </span>
                </div>

                <!-- Price -->
                <div class="price-section">
                  <div v-if="item.Price1" class="original-price text-red">
                    <span>LAK {{ formatPrice(item.Price1) }}</span>
                  </div>
                  <div class="current-price">
                    <span class="currency">LAK</span>
                    <span class="price">{{ formatPrice(item.Price2) }}</span>
                  </div>
                </div>

                <!-- Details -->
                <p v-if="item.detail" class="product-detail">
                  {{ item.detail }}
                </p>

                <!-- Contact -->
                <div v-if="item.tel" class="contact-info">
                  <v-icon size="small" color="primary">mdi-phone</v-icon>
                  <span class="text-primary">{{ item.tel }}</span>
                </div>

                <!-- Delivery -->
                <div class="delivery-info">
                  <v-icon size="small" color="success">mdi-truck-fast</v-icon>
                  <span
                    >Get it by <strong>{{ getDeliveryDate() }}</strong></span
                  >
                </div>
              </v-card-text>

              <!-- Action Button -->
              <v-card-actions class="pa-4 pt-0">
                <v-btn
                  block
                  color="primary"
                  variant="flat"
                  size="large"
                  class="view-gallery-btn"
                >
                  View Gallery
                  <v-icon end>mdi-arrow-right</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Product Detail Component -->
    <MuagTshuajComponent
      :selected-item="selectedItem"
      :channels="items"
      @update:selected-item="selectedItem = $event"
    />
  </v-app>
</template>

<script setup>
const { fetchMuagTshuaj, items, topData, pagination } = useMuagTshuaj();
const selectedItem = ref(null);

onMounted(async () => {
  await fetchMuagTshuaj();
  console.log("Products loaded:", items.value);
});

const selectItem = (item) => {
  selectedItem.value = { ...item, slide: 0 };
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const getDeliveryDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  const options = { weekday: "short", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
function formatPrice(price) {
  if (!price) return "0.00";
  return Number(price).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
</script>

<style scoped>
/* Hero Section */
.hero-section {
  position: relative;
  overflow: hidden;
}

.hero-carousel {
  border-radius: 0;
}

.carousel-item-wrapper {
  height: 100%;
  width: 100%;
}

.carousel-image {
  height: 100%;
}

.carousel-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 60px 0;
}

.carousel-text-wrapper {
  max-width: 700px;
}

.bestseller-chip {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.carousel-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
  line-height: 1.2;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.carousel-subtitle {
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 24px;
  font-weight: 500;
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
}

.carousel-price {
  display: inline-flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 16px 24px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.price-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.price-display {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.price-display .currency {
  font-size: 1rem;
  color: white;
  font-weight: 600;
}

.price-display .amount {
  font-size: 2rem;
  color: white;
  font-weight: 700;
}

/* Products Section */
.products-section {
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
  min-height: 100vh;
}

.section-header {
  margin-bottom: 48px;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #666;
  font-weight: 400;
}

/* Product Card */
.product-grid {
  gap: 24px 0;
}

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

.badges-container {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 2;
}

.discount-badge {
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.bestseller-badge {
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.image-count {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 2;
}

.hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .hover-overlay {
  opacity: 1;
}

.view-btn {
  transform: scale(0.8);
  transition: transform 0.3s ease;
}

.product-card:hover .view-btn {
  transform: scale(1);
}

/* Product Info */
.product-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.brand-name {
  font-size: 0.75rem;
  color: #1976d2;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.8em;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0;
}

.review-count {
  font-size: 0.875rem;
  color: #666;
}

.price-section {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin: 8px 0;
}

.current-price {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.current-price .currency {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1a1a1a;
}

.current-price .price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
}

.original-price {
  font-size: 0.875rem;
  color: #999;
  text-decoration: line-through;
}

.product-detail {
  font-size: 0.875rem;
  color: #666;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 4px 0;
}

.contact-info,
.delivery-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.813rem;
  color: #666;
  margin: 4px 0;
}

.delivery-info {
  color: #2e7d32;
}

/* Action Button */
.view-gallery-btn {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0.3px;
  border-radius: 8px;
  height: 44px;
}

/* Responsive */
@media (max-width: 960px) {
  .carousel-content {
    padding: 40px 0;
  }

  .carousel-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 600px) {
  .carousel-content {
    padding: 24px 0;
  }

  .product-grid {
    gap: 16px 0;
  }
}
</style>
