<template>
  <v-dialog v-model="props.showProductModal" max-width="800px" persistent>
    <v-card>
      <v-card-title
        class="text-h5 font-weight-bold d-flex justify-space-between align-center"
      >
        <span>Add New Product</span>
        <v-btn icon variant="text" @click="closeAddModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text class="pt-6">
        <v-form ref="productForm">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="newProduct.province"
                label="Province"
                variant="outlined"
                prepend-inner-icon="mdi-map-marker"
                placeholder="e.g., Vientiane"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="newProduct.district"
                label="District"
                variant="outlined"
                prepend-inner-icon="mdi-office-building"
                placeholder="e.g., Chanthabouly"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="newProduct.village"
                label="Village"
                variant="outlined"
                prepend-inner-icon="mdi-home-group"
                placeholder="e.g., Phonxay"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="newProduct.name"
                label="Product Name"
                variant="outlined"
                required
                prepend-inner-icon="mdi-package-variant"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="newProduct.type"
                :items="types"
                label="Type"
                variant="outlined"
                prepend-inner-icon="mdi-shape"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="newProduct.price"
                label="Price ($)"
                type="number"
                variant="outlined"
                prepend-inner-icon="mdi-currency-usd"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="newProduct.stock"
                label="Stock Quantity"
                type="number"
                variant="outlined"
                prepend-inner-icon="mdi-package-variant-closed"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="newProduct.phone"
                label="Phone Number"
                type="tel"
                variant="outlined"
                prepend-inner-icon="mdi-phone"
                placeholder="+856 20 5555 1234"
              ></v-text-field>
            </v-col>
            <v-divider></v-divider>
            <v-col cols="12">
              <h4>
                +
                <v-span class="text-primary text-decoration-underline">
                  Donation Money</v-span
                >
              </h4>
            </v-col>

            <v-col cols="12" md="5">
              <v-text-field
                v-model="newProduct.donation_Money"
                label="Donation Money"
                type="number"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-menu
                v-model="startMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template #activator="{ props }">
                  <v-text-field
                    v-bind="props"
                    v-model="newProduct.startDate"
                    label="Start Date"
                    variant="outlined"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                  ></v-text-field>
                </template>

                <v-date-picker
                  v-model="startRaw"
                  @update:model-value="(date) => selectStartDate(date)"
                  show-adjacent-months
                  color="primary"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-span class="mt-6 text-blue font-weight-bold">to</v-span>
            <v-col cols="12" md="3">
              <v-menu
                v-model="endMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template #activator="{ props }">
                  <v-text-field
                    v-bind="props"
                    v-model="newProduct.endDate"
                    label="End Date"
                    variant="outlined"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                  ></v-text-field>
                </template>

                <v-date-picker
                  v-model="endRaw"
                  @update:model-value="(date) => selectEndDate(date)"
                  show-adjacent-months
                  color="primary"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="newProduct.Detail_Donation_Money"
                :items="details_Donations"
                label="Please select your Donation "
                variant="outlined"
                prepend-inner-icon="mdi-shape"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newProduct.videoPath"
                label="Video URL"
                type="url"
                variant="outlined"
                prepend-inner-icon="mdi-video"
                placeholder="https://example.com/video.mp4"
                hint="Enter the full URL to the product video"
                persistent-hint
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="newProduct.mapUrl"
                label="Google Maps URL"
                type="url"
                variant="outlined"
                prepend-inner-icon="mdi-map"
                placeholder="https://maps.google.com/?q=17.9757,102.6331"
                hint="Enter Google Maps link or coordinates"
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="newProduct.name"
                label="Area"
                variant="outlined"
                required
                prepend-inner-icon="mdi-ruler-square"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="newProduct.description"
                label="Description"
                variant="outlined"
                rows="4"
                prepend-inner-icon="mdi-text"
              ></v-textarea>
            </v-col>

            <v-col cols="12">
              <v-card variant="outlined" class="pa-4">
                <v-file-input
                  v-model="productImages"
                  label="Product Images"
                  multiple
                  accept="image/*"
                  prepend-icon="mdi-camera"
                  variant="outlined"
                  show-size
                  @change="handleFileSelect"
                ></v-file-input>

                <v-row v-if="uploadedImages.length" class="mt-2">
                  <v-col
                    v-for="(img, idx) in uploadedImages"
                    :key="idx"
                    cols="3"
                  >
                    <v-card>
                      <v-img :src="img" height="100" cover></v-img>
                      <v-card-actions>
                        <v-btn
                          size="small"
                          color="error"
                          block
                          @click="removeImage(idx)"
                        >
                          Remove
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn color="grey" variant="text" @click="closeAddModal">
          Cancel
        </v-btn>
        <v-btn color="primary" variant="elevated" @click="handleAddProduct">
          Add Product
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";

// =========================
// PROPS
// =========================
const props = defineProps({
  showProductModal: Boolean,
  types: Array,
  detailsDonations: Array,
});

// =========================
// EMIT
// =========================
const emit = defineEmits(["close", "submit"]);

// =========================
// FORM DATA
// =========================
const newProduct = reactive({
  province: "",
  district: "",
  village: "",
  name: "",
  type: "",
  price: null,
  stock: null,
  phone: "",
  donation_Money: null,
  startDate: "",
  endDate: "",
  Detail_Donation_Money: "",
  videoPath: "",
  mapUrl: "",
  area: "",
  description: "",
});

const productImages = ref([]);
const uploadedImages = ref([]);

const handleAddProduct = () => {
  emit("submit", {
    ...newProduct,
    images: uploadedImages.value,
  });
};

const closeAddModal = () => {
  emit("close");
};

// For image preview
const handleFileSelect = (event) => {
  uploadedImages.value = [];
  for (const file of event) {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImages.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = (index) => {
  uploadedImages.value.splice(index, 1);
};
</script>
