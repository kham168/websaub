<template>
  <div>
    <v-dialog v-model="isDialogOpen" max-width="900">
      <v-card
        v-if="props.selectedItem"
        elevation="3"
        class="slideshow-card mb-16"
      >
        <v-card-title class="d-flex justify-space-between align-center">
          <div>
            <div class="text-h5 font-weight-bold">
              {{ props.selectedItem.name }}
            </div>
          </div>
          <v-btn
            icon="mdi-close"
            variant="text"
            @click="$emit('update:selectedItem', null)"
          />
        </v-card-title>

        <v-divider />

        <div class="slideshow-container">
          <v-container fluid class="pa-0">
            <v-col>
              <v-row>
                <!-- Desktop View (md and up) -->
                <v-col md="6" class="d-none d-md-block">
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
                          Buy more than 10 items and get 3% promotion
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
                          Buy 1 case and get 10% promotion
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
                            <div
                              v-if="props.selectedItem.discount"
                              class="mb-2"
                            >
                              <v-chip
                                size="small"
                                color="red"
                                text-color="white"
                                class="font-weight-bold"
                              >
                                -{{ props.selectedItem.discount }}% OFF
                              </v-chip>
                            </div>
                            <div class="d-flex align-center">
                              <span class="text-red">LAK</span>
                              <span
                                class="text-subtitle-1 font-weight-bold ml-2"
                              >
                                {{ formatPrice(props.selectedItem.price1) }}
                              </span>
                              <span
                                v-if="props.selectedItem.price2"
                                class="text-subtitle-2 align-self-start text-decoration-line-through text-grey-darken-1 ml-2"
                              >
                                {{ formatPrice(props.selectedItem.price2) }}
                              </span>
                            </div>
                          </div>

                          <v-btn
                            block
                            color="green"
                            size="large"
                            variant="flat"
                            class="text-none font-weight-bold mb-2"
                            @click="addToCart(props.selectedItem)"
                          >
                            Add to Cart
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
                          props.selectedItem?.name || "No brand"
                        }}</span>
                      </p>
                      <p class="mb-2">
                        <strong>Email:</strong>
                        <span class="text-primary ml-2">{{
                          props.selectedItem?.email || "-"
                        }}</span>
                      </p>
                      <p class="mb-2">
                        <strong>Tel & WhatsApp:</strong>
                        <span class="text-primary ml-2">{{
                          props.selectedItem?.tel || "-"
                        }}</span>
                      </p>
                      <div class="description-section mt-4">
                        <strong>
                          <v-icon color="green">mdi-plus</v-icon>
                          Description
                        </strong>
                        <v-divider class="my-2" />
                        <span>{{
                          props.selectedItem?.detail ||
                          "No description available"
                        }}</span>
                      </div>
                    </v-container>
                  </v-navigation-drawer>
                </v-col>

                <!-- Image Carousel Column -->
                <v-col cols="12" md="6" class="pa-8">
                  <v-carousel
                    v-if="props.selectedItem?.image?.length > 0"
                    v-model="carouselIndex"
                    cycle
                    show-arrows
                    hide-delimiters
                    interval="1000"
                    height="400"
                    class="rounded-t-lg"
                  >
                    <v-carousel-item
                      v-for="(img, idx) in props.selectedItem.image"
                      :key="idx"
                      class="cursor-pointer"
                    >
                      <v-img :src="img" height="400" cover />
                    </v-carousel-item>
                  </v-carousel>

                  <!-- Custom Dot Indicators -->
                  <v-sheet
                    v-if="props.selectedItem?.image?.length > 1"
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
                      v-for="(img, idx) in props.selectedItem.image"
                      :key="idx"
                      :width="carouselIndex === idx ? 20 : 10"
                      :height="carouselIndex === idx ? 20 : 10"
                      class="rounded-circle cursor-pointer mx-3"
                      :class="{ 'elevation-4': carouselIndex === idx }"
                      :color="carouselIndex === idx ? '#6d4c41' : '#8d6e63'"
                      @click="carouselIndex = idx"
                      :aria-label="`Go to slide ${idx + 1}`"
                    />
                  </v-sheet>

                  <!-- Fallback if no images -->
                  <v-sheet
                    v-else
                    class="d-flex align-center justify-center rounded-lg"
                    height="400"
                    color="grey-lighten-3"
                  >
                    <v-icon size="64" color="grey">mdi-image-off</v-icon>
                  </v-sheet>
                </v-col>

                <!-- Mobile View (d-md-none) -->
                <v-col cols="12" class="d-md-none">
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
                          Buy more than 10 items and get 3% promotion
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
                          Buy 1 case and get 10% promotion
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
                            <div
                              v-if="props.selectedItem.discount"
                              class="mb-2"
                            >
                              <v-chip
                                size="small"
                                color="red"
                                text-color="white"
                                class="font-weight-bold"
                              >
                                -{{ props.selectedItem.discount }}% OFF
                              </v-chip>
                            </div>
                            <div class="d-flex align-center">
                              <!-- <span class="text-red">LAK</span> -->
                              <span
                                class="text-subtitle-1 font-weight-bold ml-2"
                              >
                                {{ formatPrice(props.selectedItem.price1) }}
                              </span>
                              <span
                                v-if="props.selectedItem.price2"
                                class="text-subtitle-2 align-self-start text-decoration-line-through text-grey-darken-1 ml-2"
                              >
                                {{ formatPrice(props.selectedItem.price2) }}
                              </span>
                            </div>
                          </div>

                          <v-btn
                            block
                            color="green"
                            size="large"
                            variant="flat"
                            class="text-none font-weight-bold mb-2"
                            @click="addToCart(props.selectedItem)"
                          >
                            Add to Cart
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

                  <!-- Mobile Drawer for Details -->
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
                          props.selectedItem?.name || "No brand"
                        }}</span>
                      </p>
                      <p class="mb-2">
                        <strong>Email:</strong>
                        <span class="text-primary ml-2">{{
                          props.selectedItem?.email || "-"
                        }}</span>
                      </p>
                      <p class="mb-2">
                        <strong>Tel & WhatsApp:</strong>
                        <span class="text-primary ml-2">{{
                          props.selectedItem?.tel || "-"
                        }}</span>
                      </p>
                      <div class="description-section mt-4">
                        <strong>
                          <v-icon color="green">mdi-plus</v-icon>
                          Description
                        </strong>
                        <v-divider class="my-2" />
                        <span>{{
                          props.selectedItem?.detail ||
                          "No description available"
                        }}</span>
                      </div>
                    </v-container>
                  </v-navigation-drawer>
                </v-col>
              </v-row>
            </v-col>
          </v-container>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useProductSellStore } from "@/stores/index";
import Swal from "sweetalert2";

const carouselIndex = ref(0);
const showDetails = ref(false);
const quantity = ref(1);
const selectedUnit = ref("ອັນ");
const cartItems = ref([]);

const store = useProductSellStore();

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

const getDeliveryDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1); // Tomorrow
  const options = { weekday: "short", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
const addToCart = (product) => {
  let price = 0;
  if (product.price2 !== 0 || product.price2 !== null) {
    price = product.price2;
  } else {
    price = product.price1;
  }
  cartItems.value = {
    ...product,
    quantity: 1,
    unit: selectedUnit.value,
    price: price,
  };

  store.addToCart(cartItems.value);
  isDialogOpen.value = false;
  setTimeout(() => {
    showSuccess();
  }, 200);
};
const showSuccess = () => {
  Swal.fire({
    icon: "success",
    showConfirmButton: false,
    showCancelButton: false,
    timer: 1000,
  });
};
const increase = () => {
  quantity.value++;
};

const decrease = () => {
  if (quantity.value > 1) quantity.value--;
};

const handleKeydown = (e) => {
  const allowed = [8, 9, 13, 37, 38, 39, 40, 46];
  if (
    !(
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      (e.keyCode >= 96 && e.keyCode <= 105) ||
      allowed.includes(e.keyCode)
    )
  ) {
    e.preventDefault();
  }
};

const validateQuantity = (event) => {
  let val = Number(event.target.value);
  if (isNaN(val) || val < 1) val = 1;
  val = Math.floor(val);
  event.target.value = val;
  quantity.value = val;
};
</script>

<style scoped>
.v-text-field :deep(input) {
  text-align: center !important;
}

.cursor-pointer {
  cursor: pointer;
}

.v-sheet.cursor-pointer:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.v-sheet.rounded-circle {
  transition: all 0.3s ease;
}

.v-sheet.rounded-circle:hover {
  transform: scale(1.1);
}

.slideshow-container {
  max-height: 80vh;
  overflow-y: auto;
}

.description-section {
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
}
</style>
