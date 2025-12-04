<template>
  <v-dialog v-model="props.showDetailEditProduct" max-width="800px" persistent>
    <v-card>
      <v-card-title
        class="text-h5 font-weight-bold d-flex justify-space-between align-center"
      >
        <span>Edit Product</span>
        <v-btn icon variant="text" @click="closeEditModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text class="pt-6" v-if="editingProduct">
        <v-form ref="editProductForm">
          <v-row>
            <!-- Province / District / Village -->
            <v-col cols="12" md="4">
              <v-text-field
                v-model="editingProduct.province"
                label="Province"
                variant="outlined"
                prepend-inner-icon="mdi-map-marker"
                placeholder="e.g., Vientiane"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="editingProduct.district"
                label="District"
                variant="outlined"
                prepend-inner-icon="mdi-office-building"
                placeholder="e.g., Chanthabouly"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="editingProduct.village"
                label="Village"
                variant="outlined"
                prepend-inner-icon="mdi-home-group"
                placeholder="e.g., Phonxay"
              ></v-text-field>
            </v-col>

            <!-- Product Name / Type -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="editingProduct.name"
                label="Product Name"
                variant="outlined"
                required
                prepend-inner-icon="mdi-package-variant"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="editingProduct.type"
                :items="types"
                label="Type"
                variant="outlined"
                prepend-inner-icon="mdi-shape"
              ></v-select>
            </v-col>

            <!-- Price / Stock -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="editingProduct.price"
                label="Price ($)"
                type="number"
                variant="outlined"
                prepend-inner-icon="mdi-currency-usd"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="editingProduct.stock"
                label="Stock Quantity"
                type="number"
                variant="outlined"
                prepend-inner-icon="mdi-package-variant-closed"
              ></v-text-field>
            </v-col>

            <!-- Phone -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="editingProduct.phone"
                label="Phone Number"
                type="tel"
                variant="outlined"
                prepend-inner-icon="mdi-phone"
                placeholder="+856 20 5555 1234"
              ></v-text-field>
            </v-col>

            <!-- Donation Money Section -->
            <v-divider></v-divider>
            <v-col cols="12">
              <h4>
                +
                <v-span class="text-primary text-decoration-underline">
                  Donation Money
                </v-span>
              </h4>
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field
                v-model="editingProduct.donation_Money"
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
                    v-model="editingProduct.startDate"
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
                    v-model="editingProduct.endDate"
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
                v-model="editingProduct.Detail_Donation_Money"
                :items="details_Donations"
                label="Please select your Donation"
                variant="outlined"
                prepend-inner-icon="mdi-shape"
              ></v-select>
            </v-col>

            <!-- Video / Map / Area -->
            <v-col cols="12">
              <v-text-field
                v-model="editingProduct.videoPath"
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
                v-model="editingProduct.mapUrl"
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
                v-model="editingProduct.area"
                label="Area"
                variant="outlined"
                required
                prepend-inner-icon="mdi-ruler-square"
              ></v-text-field>
            </v-col>

            <!-- Description -->
            <v-col cols="12">
              <v-textarea
                v-model="editingProduct.description"
                label="Description"
                variant="outlined"
                rows="4"
                prepend-inner-icon="mdi-text"
              ></v-textarea>
            </v-col>

            <!-- Images Section -->
            <v-col cols="12">
              <v-card variant="outlined" class="pa-4">
                <!-- Existing Images -->
                <div v-if="existingImages.length" class="mb-4">
                  <div class="text-subtitle-2 mb-2 text-grey-darken-1">
                    Current Images
                  </div>
                  <v-row>
                    <v-col
                      v-for="(img, idx) in existingImages"
                      :key="'existing-' + idx"
                      cols="3"
                    >
                      <v-card>
                        <v-img :src="img" height="100" cover></v-img>
                        <v-card-actions>
                          <v-btn
                            size="small"
                            color="error"
                            block
                            @click="removeExistingImage(idx)"
                          >
                            Remove
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>

                <!-- Add New Images -->
                <v-file-input
                  v-model="editProductImages"
                  label="Add New Images"
                  multiple
                  accept="image/*"
                  prepend-icon="mdi-camera-plus"
                  variant="outlined"
                  show-size
                  @change="handleEditFileSelect"
                ></v-file-input>

                <!-- New Images Preview -->
                <v-row v-if="newEditImages.length" class="mt-2">
                  <v-col
                    v-for="(img, idx) in newEditImages"
                    :key="'new-' + idx"
                    cols="3"
                  >
                    <v-card>
                      <v-img :src="img" height="100" cover></v-img>
                      <v-badge
                        color="success"
                        content="NEW"
                        location="top right"
                      >
                      </v-badge>
                      <v-card-actions>
                        <v-btn
                          size="small"
                          color="error"
                          block
                          @click="removeNewEditImage(idx)"
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
        <v-btn color="grey" variant="text" @click="closeEditModal">
          Cancel
        </v-btn>
        <v-btn color="primary" variant="elevated" @click="handleUpdateProduct">
          Update Product
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
const props = defineProps({
  showDetailEditProduct: Boolean,
  product: Object
});

// const emit = defineEmits(["update:show", "save"]);

// Create local copy so editing doesn't mutate parent until saved
const localProduct = ref({});

watch(
  () => props.product,
  (val) => {
    if (val) localProduct.value = JSON.parse(JSON.stringify(val));
  },
  { immediate: true }
);

const close = () => emit("update:show", false);

const handleUpdateProduct = () => {
  emit("save", localProduct.value);
  close();
};
const emit = defineEmits(["update:showDetailEditProduct"])

const editingProduct = ref({ ...props.product })

function closeEditModal() {
  emit("update:showDetailEditProduct", false)
}
</script>

