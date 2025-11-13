<template>
  <div>
    <v-dialog v-model="isDialogOpen" max-width="900">
      <!-- {{ channels }} -->
      <v-card v-if="props.selectedItem" elevation="3" class="slideshow-card">
        <v-card-title class="d-flex justify-space-between align-center">
          <div>
            <div class="text-h5 font-weight-bold">
              {{ selectedItem.channel }}
            </div>
          </div>
          <v-btn
            icon="mdi-close"
            variant="text"
            @click="$emit('update:selectedItem', null)"
          />
        </v-card-title>

        <v-divider class="my-2" />

        <div class="slideshow-container">
          <v-container fluid class="pa-0">
            <v-col>
              <v-row>
                <!-- it working  when using  desktop md  -->
                <v-col md="4" class="d-none d-md-block">
                  <div @click="showDetails = true" class="cursor-pointer">
                    <v-icon size="x-small" color="green">mdi-eye</v-icon>
                    <span class="text-primary text-decoration-underline ml-4">
                      ຂໍ້ມູນຂອງເຈົ້າຂອງ
                    </span>
                  </div>
                  <v-divider class="my-4" />

                  <div>
                    <v-row>
                      <v-col cols="1">
                        <v-icon size="x-small" color="green">mdi-plus</v-icon>
                      </v-col>
                      <v-col cols="11">
                        <span class="text-body-2">
                          yog yuav ntau tshaj 10 qhov ce muaj promotion 3%
                        </span>
                      </v-col>
                    </v-row>
                  </div>
                  <div>
                    <v-row>
                      <v-col cols="1">
                        <v-icon size="x-small" color="green">mdi-plus</v-icon>
                      </v-col>
                      <v-col cols="11">
                        <span class="text-body-2">
                          yog yuav 1 nkev nces muaj promotion 10%
                        </span>
                      </v-col>
                    </v-row>
                  </div>
                  <v-divider class="my-4" />
                  <div>
                    <v-row>
                      <v-col cols="6">
                        <v-select
                          v-model="selectedUnit"
                          :items="['ອັນ', 'ແກັດ']"
                          label="ກະລຸນາເລືອກ"
                          variant="outlined"
                          density="compact"
                          value="ອັນ"
                          hide-details
                          class="elevation-2 rounded-lg"
                          style="max-width: 120px"
                        />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model.number="quantity"
                          type="text"
                          label="ຈຳນວນ"
                          variant="outlined"
                          density="compact"
                          hide-details
                          class="elevation-2 rounded-lg"
                          style="max-width: 150px"
                          @input="validateQuantity"
                          @keydown="handleKeydown"
                        >
                          <template #prepend-inner>
                            <v-sheet
                              class="d-flex align-center justify-center rounded-circle cursor-pointer pa-1"
                              width="24"
                              height="24"
                              style="border: 1px solid rgba(0, 0, 0, 0.2)"
                              @click="decrease"
                            >
                              <v-icon size="small" color="red"
                                >mdi-minus</v-icon
                              >
                            </v-sheet>
                          </template>

                          <template #append-inner>
                            <v-sheet
                              class="d-flex align-center justify-center rounded-circle cursor-pointer pa-1"
                              width="24"
                              height="24"
                              style="border: 1px solid rgba(0, 0, 0, 0.2)"
                              @click="increase"
                            >
                              <v-icon size="small" color="green"
                                >mdi-plus</v-icon
                              >
                            </v-sheet>
                          </template>
                        </v-text-field>
                      </v-col>
                      <v-col cols="12">
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
                              <span class="text-h6 font-weight-bold">$</span>
                              <span class="text-h3 font-weight-bold">
                                {{ getPriceWhole(selectedItem.price) }}
                              </span>
                              <span
                                class="text-body-1 align-self-start text-decoration-line-through"
                              >
                                ${{ getPriceDecimal(selectedItem.price) }}
                              </span>
                            </div>
                            <div
                              v-if="selectedItem.originalPrice"
                              class="text-body-2 text-grey"
                            >
                              List Price:
                              <span class="text-decoration-line-through">
                                ${{ selectedItem.originalPrice }}
                              </span>
                            </div>
                          </div>

                          <v-btn
                            block
                            color="green"
                            size="large"
                            variant="flat"
                            class="text-none font-weight-bold mb-2"
                            @click="viewDetails(selectedItem)"
                          >
                            add to cart
                          </v-btn>

                          <div
                            class="text-caption text-center text-grey-darken-1"
                          >
                            Get it by <strong>{{ getDeliveryDate() }}</strong>
                          </div>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>

                  <!-- Drawer for Details -->
                  <v-navigation-drawer
                    v-model="showDetails"
                    location="right"
                    temporary
                    width="400"
                  >
                    <v-toolbar flat>
                      <v-toolbar-title
                        class="text-h6 text-center font-weight-bold"
                      >
                        ຂໍ້ມູນລາຍລະອຽດ
                      </v-toolbar-title>
                      <v-btn icon @click="showDetails = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-toolbar>

                    <v-divider />

                    <v-container>
                      <p class="mb-2">
                        <strong>Brand:</strong>
                        <span class="text-primary ml-2">{{
                          selectedItem?.channel || "No channel"
                        }}</span>
                      </p>
                      <p class="mb-2">
                        <strong>Brand owner:</strong>
                        <span class="text-primary ml-2">{{
                          selectedItem?.ownername
                        }}</span>
                      </p>
                      <p class="mb-2">
                        <strong>Email:</strong>
                        <span class="text-primary ml-2">{{
                          selectedItem?.email
                        }}</span>
                      </p>
                      <p class="mb-2">
                        <strong>WhattsApp:</strong>
                        <span class="text-primary ml-2">{{
                          selectedItem?.tel || "No tel"
                        }}</span>
                      </p>

                      <div class="description-section mt-4">
                        <strong>
                          <v-icon color="green">mdi-plus</v-icon>
                          Description
                        </strong>
                        <v-divider class="my-2" />
                        <span>
                          {{ selectedItem?.detail }}
                        </span>
                      </div>
                    </v-container>
                  </v-navigation-drawer>
                </v-col>

                <v-col cols="12" md="4" class="pb-10">
                  <v-carousel
                    v-if="selectedItem.image && selectedItem.image.length > 0"
                    v-model="carouselIndex"
                    cycle
                    show-arrows
                    hide-delimiters
                    interval="4000"
                    height="400"
                    class="rounded-t-lg"
                  >
                    <v-carousel-item
                      v-for="(image, index) in selectedItem.image"
                      :key="index"
                      class="cursor-pointer"
                    >
                      <v-img
                        :src="image"
                        height="400"
                        cover
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      />
                    </v-carousel-item>
                  </v-carousel>

                  <!-- Custom Dot Indicators -->
                  <v-sheet
                    v-if="selectedItem.image && selectedItem.image.length > 1"
                    class="d-flex justify-center align-center pa-5"
                    style="
                      background: linear-gradient(
                        180deg,
                        white 0%,
                        #ffcc80 100%
                      );
                    "
                    rounded="b-lg"
                  >
                    <v-sheet
                      v-for="(image, index) in selectedItem.image"
                      :key="index"
                      :width="carouselIndex === index ? 20 : 10"
                      :height="carouselIndex === index ? 20 : 10"
                      class="rounded-circle cursor-pointer mx-3"
                      :class="{ 'elevation-4': carouselIndex === index }"
                      :color="carouselIndex === index ? '#6d4c41' : '#8d6e63'"
                      @click="carouselIndex = index"
                      :aria-label="`Go to slide ${index + 1}`"
                    />
                  </v-sheet>

                  <!-- Fallback if no images -->
                  <v-sheet
                    v-else
                    class="d-flex align-center justify-center"
                    height="400"
                    color="grey-lighten-3"
                  >
                    <v-icon size="64" color="grey">mdi-image-off</v-icon>
                  </v-sheet>
                  <div class="d-flex align-center justify-center mb-3 mt-8">
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

                  <!-- <div class="text-body-1 mb-2 text-center">
                    {{
                      selectedItem.description || "No description available."
                    }}
                  </div> -->
                </v-col>
                <!-- it working  when using Mobile View or display d-sm -->
                <v-col cols="12" class="d-md-none d-sm-block">
                  <div @click="showDetails = true" class="cursor-pointer">
                    <v-icon size="x-small" color="green">mdi-eye</v-icon>
                    <span class="text-primary text-decoration-underline ml-4">
                      ຂໍ້ມູນຂອງເຈົ້າຂອງ
                    </span>
                  </div>
                  <v-divider class="my-4" />

                  <div>
                    <v-row>
                      <v-col cols="1">
                        <v-icon size="x-small" color="green">mdi-plus</v-icon>
                      </v-col>
                      <v-col cols="11">
                        <span class="text-body-2">
                          yog yuav ntau tshaj 10 qhov ce muaj promotion 3%
                        </span>
                      </v-col>
                    </v-row>
                  </div>
                  <div>
                    <v-row>
                      <v-col cols="1">
                        <v-icon size="x-small" color="green">mdi-plus</v-icon>
                      </v-col>
                      <v-col cols="11">
                        <span class="text-body-2">
                          yog yuav 1 nkev nces muaj promotion 10%
                        </span>
                      </v-col>
                    </v-row>
                  </div>
                  <v-divider class="my-4" />
                  <div>
                    <v-row>
                      <v-col cols="6">
                        <v-select
                          v-model="selectedUnit"
                          :items="['ອັນ', 'ແກັດ']"
                          label="ກະລຸນາເລືອກ"
                          variant="outlined"
                          density="compact"
                          value="ອັນ"
                          hide-details
                          class="elevation-2 rounded-lg"
                          style="max-width: 120px"
                        />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model.number="quantity"
                          type="text"
                          label="ຈຳນວນ"
                          variant="outlined"
                          density="compact"
                          hide-details
                          class="elevation-2 rounded-lg"
                          style="max-width: 150px"
                          @input="validateQuantity"
                          @keydown="handleKeydown"
                        >
                          <template #prepend-inner>
                            <v-sheet
                              class="d-flex align-center justify-center rounded-circle cursor-pointer pa-1"
                              width="24"
                              height="24"
                              style="border: 1px solid rgba(0, 0, 0, 0.2)"
                              @click="decrease"
                            >
                              <v-icon size="small" color="red"
                                >mdi-minus</v-icon
                              >
                            </v-sheet>
                          </template>

                          <template #append-inner>
                            <v-sheet
                              class="d-flex align-center justify-center rounded-circle cursor-pointer pa-1"
                              width="24"
                              height="24"
                              style="border: 1px solid rgba(0, 0, 0, 0.2)"
                              @click="increase"
                            >
                              <v-icon size="small" color="green"
                                >mdi-plus</v-icon
                              >
                            </v-sheet>
                          </template>
                        </v-text-field>
                      </v-col>
                      <v-col cols="12">
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
                              <span class="text-h6 font-weight-bold">$</span>
                              <span class="text-h3 font-weight-bold">
                                {{ getPriceWhole(selectedItem.price) }}
                              </span>
                              <span
                                class="text-body-1 align-self-start text-decoration-line-through"
                              >
                                ${{ getPriceDecimal(selectedItem.price) }}
                              </span>
                            </div>
                            <div
                              v-if="selectedItem.originalPrice"
                              class="text-body-2 text-grey"
                            >
                              List Price:
                              <span class="text-decoration-line-through">
                                ${{ selectedItem.originalPrice }}
                              </span>
                            </div>
                          </div>

                          <v-btn
                            block
                            color="green"
                            size="large"
                            variant="flat"
                            class="text-none font-weight-bold mb-2"
                            @click="viewDetails(selectedItem)"
                          >
                            add to cart
                          </v-btn>

                          <div
                            class="text-caption text-center text-grey-darken-1"
                          >
                            Get it by <strong>{{ getDeliveryDate() }}</strong>
                          </div>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>

                  <!-- Drawer for Details -->
                  <v-navigation-drawer
                    v-model="showDetails"
                    location="right"
                    temporary
                    width="400"
                  >
                    <v-toolbar flat>
                      <v-toolbar-title
                        class="text-h6 text-center font-weight-bold"
                      >
                        ຂໍ້ມູນລາຍລະອຽດ
                      </v-toolbar-title>
                      <v-btn icon @click="showDetails = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-toolbar>

                    <v-divider />

                    <v-container>
                      <p class="mb-2">
                        <strong>Brand:</strong>
                        <span class="text-primary ml-2">{{
                          selectedItem?.title
                        }}</span>
                      </p>

                      <p class="mb-2">
                        <strong>Brand owner:</strong>
                        <span class="text-primary ml-2">{{
                          selectedItem?.ownername
                        }}</span>
                      </p>

                      <p class="mb-2">
                        <strong>email:</strong>
                        <span class="text-primary ml-2">{{
                          selectedItem?.email
                        }}</span>
                      </p>

                      <p class="mb-2">
                        <strong>Tel && WhattsApp:</strong>
                        <span class="text-primary ml-2">{{
                          selectedItem?.tel
                        }}</span>
                      </p>

                      <div class="description-section mt-4">
                        <strong>
                          <v-icon color="green">mdi-plus</v-icon>
                          Description
                        </strong>
                        <v-divider class="my-2" />
                        <span>
                          {{ selectedItem?.detail }}
                        </span>
                      </div>
                    </v-container>
                  </v-navigation-drawer>
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                  class="overflow-y-auto border"
                  style="max-height: 600px"
                >
                  <v-row no-gutters>
                    <v-col
                      v-for="(channel, index) in channels.filter(
                        (item) => item !== selectedItem
                      )"
                      :key="index"
                      cols="12"
                      class="mb-4"
                      @click="selectChannel(channel)"
                    >
                      <v-card class="d-flex flex-column pa-2" outlined>
                        <v-img
                          :src="channel.image[0]"
                          height="100%"
                          cover
                          class="rounded mr-2"
                        />

                        <div
                          class="flex-grow-1 d-flex flex-column justify-space-between"
                        >
                          <div
                            class="d-flex justify-space-between align-center mb-1"
                          >
                            <span
                              class="text-subtitle-1 font-weight-bold text-truncate"
                              style="max-width: 60%; display: inline-block"
                              :title="channel.channel"
                            >
                              {{ channel.channel }}
                            </span>
                            <span class="text-subtitle-2 text-grey text-end">
                              ${{ channel.price }}
                            </span>
                          </div>

                          <div class="d-flex align-center mb-1">
                            <v-rating
                              v-if="channel.rating"
                              :model-value="channel.rating"
                              density="compact"
                              color="amber"
                              half-increments
                              readonly
                              size="small"
                            />
                            <span class="text-body-2 ml-2 text-grey-darken-1">
                              ({{ channel.reviewCount }})
                            </span>
                          </div>

                          <div
                            class="text-body-2 text-grey-darken-1 text-truncate"
                            style="max-width: 100%"
                          >
                            <!-- {{
                              channel?.detail.length > 30
                                ? channel.detail.slice(0, 30) + "..."
                                : channel.detail
                            }} -->
                          </div>
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-container>
        </div>

        <!-- <v-card-text>
          <v-row>
            <v-col cols="4" />
            <v-col cols="12" md="4" class="text-center"> -->
        <!-- <div class="mb-3">
                  <v-btn
                    v-for="(img, i) in selectedItem.images"
                    :key="`thumb-${i}`"
                    variant="flat"
                    class="ma-1 pa-1"
                    :class="{ 'thumbnail-active': selectedItem.slide === i }"
                    @click="selectedItem.slide = i"
                  >
                    <v-img
                      :src="img"
                      height="40"
                      width="40"
                      cover
                      class="rounded"
                    />
                  </v-btn>
                </div> -->
        <!-- <div class="d-flex align-center mb-3">
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
                {{ selectedItem.description || "No description available." }}
              </div> -->
        <!-- </v-col>
          </v-row>
        </v-card-text> -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const carouselIndex = ref(0);
const showDetails = ref(false);
const quantity = ref(1);
const selectedUnit = ref("ອັນ");

const props = defineProps({
  selectedItem: {
    type: Object,
    default: null,
  },
  channels: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:selectedItem"]);

const isDialogOpen = computed({
  get: () => !!props.selectedItem,
  set: (val) => {
    if (!val) emit("update:selectedItem", null);
  },
});

const getPriceWhole = (price) => Math.floor(price);
const getPriceDecimal = (price) => Math.round((price % 1) * 100);
const getDeliveryDate = () => "Tomorrow";

const closeDialog = () => {
  emit("update:selectedItem", null);
};

const viewDetails = (item) => {
  console.log("View details:", item);
};

const increase = () => {
  quantity.value++;
};

const decrease = () => {
  if (quantity.value > 0) quantity.value--;
};

const handleKeydown = (event) => {
  const allowedKeys = [8, 9, 13, 37, 38, 39, 40, 46];

  if (
    (event.keyCode >= 48 && event.keyCode <= 57) ||
    (event.keyCode >= 96 && event.keyCode <= 105) ||
    allowedKeys.includes(event.keyCode)
  ) {
    return true;
  }

  event.preventDefault();
};

const validateQuantity = (event) => {
  let val = Number(event.target.value);

  if (isNaN(val) || val < 0) {
    val = 0;
  }

  val = Math.floor(val);

  event.target.value = val;
  quantity.value = val;
};
// Select a different channel
const selectChannel = (channel) => {
  console.log("Selected channel:", channel);
  emit("update:selectedItem", channel);
  carouselIndex.value = 0; // Reset carousel index if needed
};
</script>

<style scoped>
/* Text input centering */
.v-text-field :deep(input) {
  text-align: center !important;
}

/* Cursor pointer utility */
.cursor-pointer {
  cursor: pointer;
}

/* Thumbnail active state */
.thumbnail-active {
  border: 2px solid green;
}

/* Circle icon hover effect */
.v-sheet.cursor-pointer:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

/* Indicator dot hover and transition */
.v-sheet.rounded-circle {
  transition: all 0.3s ease;
}

.v-sheet.rounded-circle:hover {
  transform: scale(1.1);
}
</style>
