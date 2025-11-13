<template>
  <v-app fluid>
    <!-- Top Auto Carousel -->
    <v-container class="pa-4 bg-grey-lighten-3">
      <v-carousel cycle show-arrows hide-delimiters interval="4000">
        <!-- FIXED: Changed from selectedItem to channels -->
        <v-carousel-item v-for="(item, index) in allCreams" :key="index">
          <v-img :src="item.image[0]" class="fill-height" cover>
            <template v-slot:default>
              <v-sheet
                class="d-flex align-center justify-center"
                color="rgba(0,0,0,0.4)"
                height="100%"
              >
                <!-- <h2 class="text-white text-h4 text-center px-4">
                  {{ item.title || "hello" }}
                </h2> -->
              </v-sheet>
            </template>
          </v-img>
        </v-carousel-item>
      </v-carousel>
    </v-container>

    <v-divider class="my-4"></v-divider>

    <!-- Product Grid -->
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
          <!-- {{ item.id }} -->
          <v-card
            class="product-card d-flex flex-column"
            elevation="1"
            hover
            @click="selectItem(item)"
          >
            <div class="image-container position-relative">
              <v-img
                :src="item.image[0] || '/favicon.ico'"
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

            <v-card-text class="flex-grow-1 pa-3">
              <div class="text-caption text-primary mb-1 font-weight-medium">
                {{ item.productname }}
              </div>

              <div class="d-flex align-center mb-2">
                <v-rating
                  :model-value="item.rating || 4"
                  density="compact"
                  size="small"
                  color="amber"
                  half-increments
                  readonly
                />
                <span class="text-caption text-grey-darken-1 ml-1">
                  {{ item.reviewCount || 4 }}
                </span>
              </div>

              <div class="mb-2">
                <div class="mb-1">
                  <v-chip
                    size="x-small"
                    color="red"
                    text-color="white"
                    class="font-weight-bold"
                  >
                    -{{ item.discount || 10 }}%
                  </v-chip>
                </div>
                <div class="d-flex align-center">
                  <span class="price-symbol">$</span>
                  <span class="price-whole">{{ item.Price2 }}</span>
                  <span
                    class="text-body-3 align-self-start text-decoration-line-through text-grey-darken-1"
                    >{{ item.Price1 }}</span
                  >
                </div>
                <div v-if="item.originalPrice" class="text-caption text-grey">
                  List:
                  <span class="text-decoration-line-through"
                    >${{ item.originalPrice }}</span
                  >
                </div>
              </div>

              <div class="text-caption text-grey-darken-2 mb-1">
                Get it as soon as <strong>{{ getDeliveryDate() }}</strong>
              </div>
            </v-card-text>

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
    <v-container fluid class="pa-4">
      <v-row>
        <v-col
          v-for="(item, index) in topData"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
        >
          <!-- {{ item.id }} -->
          <v-card
            class="product-card d-flex flex-column"
            elevation="1"
            hover
            @click="selectItem(item)"
          >
            <div class="image-container position-relative">
              <v-img
                :src="item.image[0] || '/favicon.ico'"
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

            <v-card-text class="flex-grow-1 pa-3">
              <div class="text-caption text-primary mb-1 font-weight-medium">
                {{ item.productname }}
              </div>

              <div class="d-flex align-center mb-2">
                <v-rating
                  :model-value="item.rating || 4"
                  density="compact"
                  size="small"
                  color="amber"
                  half-increments
                  readonly
                />
                <span class="text-caption text-grey-darken-1 ml-1">
                  {{ item.reviewCount || 4 }}
                </span>
              </div>

              <div class="mb-2">
                <div class="mb-1">
                  <v-chip
                    size="x-small"
                    color="red"
                    text-color="white"
                    class="font-weight-bold"
                  >
                    -{{ item.discount || 10 }}%
                  </v-chip>
                </div>
                <div class="d-flex align-center">
                  <span class="price-symbol">$</span>
                  <span class="price-whole">{{ item.Price2 }}</span>
                  <span
                    class="text-body-3 align-self-start text-decoration-line-through text-grey-darken-1"
                    >{{ item.Price1 }}</span
                  >
                </div>
                <div v-if="item.originalPrice" class="text-caption text-grey">
                  List:
                  <span class="text-decoration-line-through"
                    >${{ item.originalPrice }}</span
                  >
                </div>
              </div>

              <div class="text-caption text-grey-darken-2 mb-1">
                Get it as soon as <strong>{{ getDeliveryDate() }}</strong>
              </div>
            </v-card-text>

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

    <!-- FIXED: Added event listener and channels prop -->
    <!-- <ChannelComponent
      :selected-item="selectedItem"
      :channels="channels"
      @update:selected-item="selectedItem = $event"
    /> -->
    <CreamComponemt
      :selected-item="selectedItem"
      :channels="allCreams"
      @update:selected-item="selectedItem = $event"
    />
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import { toast } from 'vue-sonner'

const { allCreams, fetchBrandCream, loading, error, pagination, topData } =
  useBrandCream();

const quantity = ref(1);
const selectedItem = ref(null);

const selectItem = (item) => {
  selectedItem.value = { ...item, slide: 0 };
  window.scrollTo({ top: 0, behavior: "smooth" });
};
onMounted(async () => {
  await fetchBrandCream();
  console.log("Creams fetched:", allCreams.value);
  console.log("TopData fetched:", topData.value);
  // console.log("Pagination:", pagination.value);
  if (error.value) {
    console.error("Error:", error.value);
  }
});

const getDeliveryDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};
</script>

<style scoped>
.product-card {
  height: 100%;
  cursor: pointer;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
}

.image-container {
  position: relative;
  overflow: hidden;
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

.price-symbol {
  font-size: 14px;
  font-weight: 600;
  vertical-align: super;
  margin-right: 2px;
}

.price-whole {
  font-size: 20px;
  font-weight: bold;
  line-height: 1;
}

.price-decimal {
  font-size: 14px;
  font-weight: 600;
  vertical-align: super;
}
.center-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: max-content;
  z-index: 9999;
}
</style>
