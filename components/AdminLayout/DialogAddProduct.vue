<template>
  <v-dialog v-model="props.showProductModal" max-width="900px" persistent>
    <!-- Success Dialog -->
    <v-dialog v-model="successDialog" max-width="400px">
      <v-card class="pa-4 text-center">
        <v-icon size="48" color="green">mdi-check-circle</v-icon>
        <h3 class="mt-2">{{ successMessage }}</h3>
        <v-card-actions class="justify-center mt-4">
          <v-btn color="green darken-2" text @click="successDialog = false">
            ຕົກລົງ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Error Dialog -->
    <v-dialog v-model="errorDialog" max-width="400px">
      <v-card class="pa-4 text-center">
        <v-icon size="48" color="red">mdi-alert-circle</v-icon>
        <h3 class="mt-2">Error</h3>
        <p class="mt-2">{{ errorMessage }}</p>
        <v-card-actions class="justify-center mt-4">
          <v-btn color="red darken-2" text @click="errorDialog = false">
            ປິດ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card style="background-color: #F0F4C3">
      <v-card-title
        class="text-h5 font-weight-bold d-flex justify-space-between align-center"
      >
        <span class="text-primary">+ ເພີ່ມສິນຄ້າ</span>
        <v-btn icon variant="text" @click="closeAddModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-card-text class="pt-6">
        <!-- ================= FORM GROUP 0 (Standard Products) ================= -->
        <Form
          v-if="chChannelGroup === 0"
          @submit="saveProduct"
          v-slot="{ errors }"
         
        >
          <v-row>
            <v-col cols="12" md="6">
              <Field
                name="name"
                :rules="validationRules.name"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  label="ກະລຸນາປ້ອນຊື່ສິນຄ້າ..... *"
                  variant="outlined"
                  prepend-inner-icon="mdi-package-variant"
                  :error="!!errors.name"
                  :error-messages="errors.name"
                />
              </Field>
            </v-col>

            <!-- <v-col cols="12" md="6">
              <Field
                name="type"
                :rules="validationRules.type"
                v-slot="{ field }"
              >
                <v-select
                  v-bind="field"
                  :items="props.types"
                  label="Type *"
                  variant="outlined"
                  prepend-inner-icon="mdi-shape"
                  :error="!!errors.type"
                  :error-messages="errors.type"
                />
              </Field>
            </v-col> -->
            <v-col cols="12" md="6">
              <Field
                name="type"
                :rules="validationRules.type"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  label="ກະລຸນາປ້ອນປະເພດ..... *"
                  type="text"
                  variant="outlined"
                  placeholder="e.g., Apartment, House, Condo"
                  :error="!!errors.type"
                  :error-messages="errors.type"
                >
                  <template #prepend-inner>
                    <v-icon color="purple">mdi-shape</v-icon>
                  </template>
                </v-text-field>
              </Field>
            </v-col>

            <v-col cols="12" md="6">
              <Field
                name="price1"
                :rules="validationRules.price1"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  label="ກະລຸນາປ້ອນລາຄາ..... (ໂປຣໂມຊັນ)*"
                  type="number"
                  placeholder="Enter price"
                  variant="outlined"
                  :error="!!errors.price1"
                  :error-messages="errors.price1"
                  hint="Enter numeric value"
                >
                <template #prepend-inner>
                    <v-icon color="teal">mdi-cash</v-icon>
                  </template>
                </v-text-field>
              </Field>
            </v-col>

            <v-col cols="12" md="6">
              <Field
                name="price2"
                :rules="validationRules.price2"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  label="ກະລຸນາປ້ອນລາຄາ..... *"
                  variant="outlined"
                  :error="!!errors.price2"
                  :error-messages="errors.price2"
                  hint="e.g., 500 or 500b/m2"
                  >
                <template #prepend-inner>
                    <v-icon color="teal">mdi-cash</v-icon>
                  </template>
                </v-text-field>
              </Field>
            </v-col>

            <v-col cols="12" md="6">
              <Field
                name="stock"
                :rules="validationRules.stock"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  type="number"
                  label="ກະລຸນາປ້ອນຈໍານວນສິນຄ້າ..... *"
                  variant="outlined"
                  prepend-inner-icon="mdi-package-variant-closed"
                  :error="!!errors.stock"
                  :error-messages="errors.stock"
                />
              </Field>
            </v-col>

            <v-col cols="12" md="6">
              <Field
                name="phone"
                :rules="validationRules.phone"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  label="ກະລຸນາປ້ອນເບີ Whatsapp.... *"
                  variant="outlined"
                  prepend-inner-icon="mdi-phone"
                  :error="!!errors.phone"
                  :error-messages="errors.phone"
                  placeholder="e.g., 020-12345678"
                />
              </Field>
            </v-col>

            <v-col cols="12">
              <Field
                name="description"
                :rules="validationRules.description"
                v-slot="{ field }"
              >
                <v-textarea
                  v-bind="field"
                  rows="4"
                  label="ກະລຸນາປ້ອນລາຍລະອຽດ..... *"
                  variant="outlined"
                  prepend-inner-icon="mdi-text"
                  :error="!!errors.description"
                  :error-messages="errors.description"
                />
              </Field>
            </v-col>

            <v-col cols="12">
              <v-file-input
                v-model="productImages"
                label="ອັບໂຫລດຮູບສິນຄ້າ"
                variant="outlined"
                prepend-icon="mdi-camera"
                accept="image/*"
                multiple
                show-size
                :rules="imageRules"
                @update:model-value="handleFileSelect"
              />
              <div
                v-if="uploadedImages.length"
                class="mt-2 d-flex flex-wrap gap-2"
              >
                <div
                  v-for="(img, i) in uploadedImages"
                  :key="i"
                  class="position-relative"
                >
                  <v-img
                    :src="img"
                    width="100"
                    height="100"
                    cover
                    class="rounded"
                  />
                  <v-btn
                    icon
                    size="x-small"
                    color="red"
                    class="position-absolute"
                    style="top: 4px; right: 4px"
                    @click="removeImage(i)"
                  >
                    <v-icon size="small">mdi-close</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>

          <v-divider class="my-4" />
          <v-card-actions class="pa-4">
            <v-spacer />
            <v-btn
              class="bg-red"
              variant="text"
              @click="closeAddModal"
              :disabled="loading"
            >
              ຍົກເລີກ
            </v-btn>
            <v-btn class="bg-blue" type="submit" :loading="loading">
              ເພີ່ມສິນຄ້າ
            </v-btn>
          </v-card-actions>
        </Form>

        <!-- ================= FORM GROUP OTHER (Real Estate/Rentals) ================= -->
        <Form v-else @submit="saveProduct" v-slot="{ errors }">
          <v-row>
            <!-- Location Fields -->
            <v-col cols="12" md="4">
              <Field
                name="province"
                :rules="validationRules.required"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  label="ກະລຸນາປ້ອນແຂວງ...... *"
                  variant="outlined"
                  :error="!!errors.province"
                  :error-messages="errors.province"
                >
                  <template #prepend-inner>
                    <v-icon color="red">mdi-map-marker</v-icon>
                  </template>
                </v-text-field>
              </Field>
            </v-col>
            <v-col cols="12" md="4">
              <Field
                name="district"
                :rules="validationRules.required"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  label="ກະລຸນາປ້ອນເມືອງ..... *"
                  variant="outlined"
                  :error="!!errors.district"
                  :error-messages="errors.district"
                >
                  <template #prepend-inner>
                    <v-icon color="green">mdi-office-building</v-icon>
                  </template>
                </v-text-field>
              </Field>
            </v-col>
            <v-col cols="12" md="4">
              <Field name="village" v-slot="{ field }">
                <v-text-field
                  v-bind="field"
                  label="ກະລຸນາປ້ອນບ້ານ....."
                  variant="outlined"
                >
                  <template #prepend-inner>
                    <v-icon color="orange">mdi-home-group</v-icon>
                  </template>
                </v-text-field>
              </Field>
            </v-col>
            <!-- Basic Info -->
            <v-col cols="12" md="6">
              <Field
                name="name"
                :rules="validationRules.name"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  label="ກະລຸນາປ້ອນຊື່..... *"
                  variant="outlined"
                  :error="!!errors.name"
                  :error-messages="errors.name"
                >
                  <template #prepend-inner>
                    <v-icon color="blue">mdi-package-variant</v-icon>
                  </template>
                </v-text-field>
              </Field>
            </v-col>

            <v-col cols="12" md="6">
              <Field
                name="type"
                :rules="validationRules.type"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  label="ກະລຸນາປ້ອນປະເພດ..... *"
                  type="text"
                  variant="outlined"
                  placeholder="e.g., Apartment, House, Condo"
                  :error="!!errors.type"
                  :error-messages="errors.type"
                >
                  <template #prepend-inner>
                    <v-icon color="purple">mdi-shape</v-icon>
                  </template>
                </v-text-field>
              </Field>
            </v-col>

            <!-- Pricing -->
            <v-col cols="12" md="6">
              <Field
                name="price1"
                :rules="validationRules.price1"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  label="ກະລຸນາປ້ອນລາຄາ..... (ໂປຣໂມຊັນ)*"
                  type="number"
                  variant="outlined"
                  placeholder="ກະລຸນາປ້ອນລາຄາໂປຣໂມຊັນ...."
                  :error="!!errors.price1"
                  :error-messages="errors.price1"
                >
                  <template #prepend-inner>
                    <v-icon color="teal">mdi-cash</v-icon>
                  </template>
                </v-text-field>
              </Field>
            </v-col>

            <v-col cols="12" md="6">
              <Field
                name="price2"
                :rules="validationRules.price2"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  label="ກະລຸນາປ້ອນລາຄາ..... *"
                  variant="outlined"
                  placeholder="e.g., 500 or 500b/m2"
                  :error="!!errors.price2"
                  :error-messages="errors.price2"
                >
                  <template #prepend-inner>
                    <v-icon color="teal">mdi-cash</v-icon>
                  </template>
                </v-text-field>
              </Field>
            </v-col>

            <!-- Room Details -->
            <v-col cols="12" md="6">
              <Field
                name="totalRoom"
                :rules="validationRules.number"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  type="number"
                  label="ຈໍານວນຫ້ອງທັງໝົດ..... *"
                  variant="outlined"
                  prepend-inner-icon="mdi-door"
                  :error="!!errors.totalRoom"
                  :error-messages="errors.totalRoom"
                />
              </Field>
            </v-col>

            <v-col cols="12" md="6">
              <Field
                name="activeroom"
                :rules="validationRules.number"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  type="number"
                  label="ຈໍານວນຫ້ອງທີເຕັມແລ້ວ..... *"
                  variant="outlined"
                  :error="!!errors.activeroom"
                  :error-messages="errors.activeroom"
                >
                  <template #prepend-inner>
                    <v-icon color="green">mdi-check-circle</v-icon>
                  </template>
                </v-text-field>
              </Field>
            </v-col>

            <!-- Contact Info -->
            <v-col cols="12" md="6">
              <Field name="contactnumber" v-slot="{ field }">
                <v-text-field
                  v-bind="field"
                  label="ກະລຸນາປ້ອນເບີໂທ.....*"
                  variant="outlined"
                >
                  <template #prepend-inner>
                    <v-icon color="green-darken-2">mdi-phone</v-icon>
                  </template>
                </v-text-field>
              </Field>
            </v-col>

            <v-col cols="12" md="6">
              <Field
                name="phone"
                :rules="validationRules.phone"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  label="ກະລຸນາປ້ອນເບີ Whatsapp.... *"
                  variant="outlined"
                  :error="!!errors.phone"
                  :error-messages="errors.phone"
                >
                  <template #prepend-inner>
                    <v-icon color="green-darken-2">mdi-phone</v-icon>
                  </template>
                </v-text-field>
              </Field>
            </v-col>

            <!-- Additional Details -->
            <v-col cols="12" md="6">
              <Field name="area" v-slot="{ field }">
                <v-text-field
                  v-bind="field"
                  label="ຂະຫນາດຂອງຫ້ອງ ຫຼື ເນື້ອທີ່ດິນ.....*"
                  variant="outlined"
                  prepend-inner-icon="mdi-texture-box"
                  hint="e.g., 100 sqm"
                />
              </Field>
            </v-col>

            <!-- <v-col cols="12" md="6">
              <Field name="price3" v-slot="{ field }">
                <v-text-field
                  v-bind="field"
                  label="Price 3 (Optional)"
                  variant="outlined"
                  prepend-inner-icon="mdi-currency-usd"
                />
              </Field>
            </v-col> -->

            <!-- Media URLs -->
            <v-col cols="12">
              <Field
                name="locationvideo"
                :rules="validationRules.url"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  label="Video URL"
                  variant="outlined"
                  prepend-inner-icon="mdi-video"
                  hint="YouTube or video URL"
                  :error="!!errors.locationvideo"
                  :error-messages="errors.locationvideo"
                />
              </Field>
            </v-col>

            <v-col cols="12">
              <Field
                name="mapUrl"
                :rules="validationRules.url"
                v-slot="{ field }"
              >
                <v-text-field
                  v-bind="field"
                  label="Google Maps URL"
                  variant="outlined"
                  prepend-inner-icon="mdi-map"
                  hint="Google Maps link"
                  :error="!!errors.mapUrl"
                  :error-messages="errors.mapUrl"
                />
              </Field>
            </v-col>

            <!-- Description -->
            <v-col cols="12">
              <Field
                name="moredetail"
                :rules="validationRules.description"
                v-slot="{ field }"
              >
                <v-textarea
                  v-bind="field"
                  rows="4"
                  label="Description *"
                  variant="outlined"
                  prepend-inner-icon="mdi-text"
                  :error="!!errors.moredetail"
                  :error-messages="errors.moredetail"
                />
              </Field>
            </v-col>

            <!-- Images -->
            <v-col cols="12">
              <v-file-input
                v-model="productImages"
                label="Product Images"
                variant="outlined"
                prepend-icon="mdi-camera"
                accept="image/*"
                multiple
                show-size
                :rules="imageRules"
                @update:model-value="handleFileSelect"
              />
              <div
                v-if="uploadedImages.length"
                class="mt-2 d-flex flex-wrap gap-2"
              >
                <div
                  v-for="(img, i) in uploadedImages"
                  :key="i"
                  class="position-relative"
                >
                  <v-img
                    :src="img"
                    width="100"
                    height="100"
                    cover
                    class="rounded"
                  />
                  <v-btn
                    icon
                    size="x-small"
                    color="red"
                    class="position-absolute"
                    style="top: 4px; right: 4px"
                    @click="removeImage(i)"
                  >
                    <v-icon size="small">mdi-close</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>

          <v-divider class="my-4" />
          <v-card-actions class="pa-4">
            <v-spacer />
            <v-btn
              class="bg-red"
              variant="text"
              @click="closeAddModal"
              :disabled="loading"
            >
              ຍົກເລີກ
            </v-btn>
            <v-btn class="bg-blue" type="submit" :loading="loading">
              ເພີ່ມສິນຄ້າ
            </v-btn>
          </v-card-actions>
        </Form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { Form, Field } from "vee-validate";

const { typeCreamServiceInstance } = useTypeCream();
const { TypeAmaranthusItemInsert } = useTypeAmaranthu();

// Props and Emits
const props = defineProps({
  showProductModal: {
    type: Boolean,
    required: true,
  },
  types: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["close", "success"]);

// Refs
const successDialog = ref(false);
const successMessage = ref("Product added successfully!");
const errorDialog = ref(false);
const errorMessage = ref("");
const productImages = ref([]);
const uploadedImages = ref([]);
const loading = ref(false);

// Computed
const chChannelGroup = computed(() => {
  const channel = useCookie("chChannel").value;
  return channel ? parseInt(channel) : 0;
});

// Validation Rules
const validationRules = {
  required: (v) => !!v || "This field is required",
  name: (v) => {
    if (!v) return "Name is required";
    if (v.length < 2) return "Name must be at least 2 characters";
    if (v.length > 200) return "Name must be less than 200 characters";
    return true;
  },
  type: (v) => !!v || "Type is required",
  number: (v) => {
    if (v === null || v === undefined || v === "") return true;
    const num = Number(v);
    if (isNaN(num)) return "Must be a valid number";
    if (num < 0) return "Must be a positive number";
    return true;
  },
  price1: (v) => {
    // Optional field - can be null or empty
    if (!v && v !== 0) return true;
    const num = Number(v);
    if (isNaN(num)) return "Must be a valid number";
    if (num < 0) return "Price cannot be negative";
    return true;
  },
  price2: (v) => {
    // Required field
    if (!v && v !== 0) return "Price is required";
    // Allow both numeric and text formats like "500b/m2"
    return true;
  },
  stock: (v) => {
    if (v === null || v === undefined || v === "") return true;
    const num = Number(v);
    if (isNaN(num)) return "Must be a valid number";
    if (num < 0) return "Stock cannot be negative";
    return true;
  },
  phone: (v) => {
    if (!v) return "Phone number is required";
    // Lao phone format: 020XXXXXXXX or 20XXXXXXXX or with dashes
    const phoneRegex = /^(020|20|030|856)[0-9-\s]{7,}$/;
    if (!phoneRegex.test(v.replace(/\s/g, ""))) {
      return "Invalid phone number format";
    }
    return true;
  },
  description: (v) => {
    if (!v) return "Description is required";
    if (v.length < 5) return "Description must be at least 5 characters";
    if (v.length > 2000) return "Description must be less than 2000 characters";
    return true;
  },
  url: (v) => {
    if (!v) return true; // Optional field
    try {
      new URL(v);
      return true;
    } catch {
      return "Must be a valid URL";
    }
  },
};

// Image validation rules
const imageRules = [
  (files) => {
    if (!files || files.length === 0) return true;
    const maxSize = 5 * 1024 * 1024; // 5MB
    const maxFiles = 10;

    if (files.length > maxFiles) {
      return `Maximum ${maxFiles} images allowed`;
    }

    for (const file of files) {
      if (file.size > maxSize) {
        return `Image ${file.name} exceeds 5MB limit`;
      }
      if (!file.type.startsWith("image/")) {
        return `${file.name} is not a valid image`;
      }
    }
    return true;
  },
];

// Methods
const handleFileSelect = (files) => {
  uploadedImages.value = [];

  if (!files || files.length === 0) return;

  // Validate file count
  if (files.length > 10) {
    showError("Maximum 10 images allowed");
    productImages.value = [];
    return;
  }

  // Create preview images
  Array.from(files).forEach((file) => {
    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      showError(`Image ${file.name} exceeds 5MB limit`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      showError(`${file.name} is not a valid image`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImages.value.push(e.target.result);
    };
    reader.onerror = () => {
      showError(`Failed to read ${file.name}`);
    };
    reader.readAsDataURL(file);
  });
};

const removeImage = (index) => {
  uploadedImages.value.splice(index, 1);
  if (productImages.value && productImages.value.length) {
    const newFiles = Array.from(productImages.value);
    newFiles.splice(index, 1);
    productImages.value = newFiles;
  }
};

const saveProduct = async (formValues) => {
  try {
    loading.value = true;

    console.log("📋 Form Values:", formValues);
    console.log("📷 Images:", productImages.value);

    // Merge form values
    const payload = { ...formValues };

    // Convert productImages to array of File objects
    const files = productImages.value ? Array.from(productImages.value) : [];

    console.log("📦 Final Payload:", payload);
    console.log("📷 Files to upload:", files.length);

    // Call appropriate service based on channel group
    let response;
    if (chChannelGroup.value === 0) {
      response = await typeCreamServiceInstance(payload, files);
    } else {
      response = await TypeAmaranthusItemInsert(payload, files);
    }

    console.log("✅ Response:", response);

    if (response) {
      showSuccess("Product added successfully!");
      emit("success", response);
      clear();
    } else {
      throw new Error("No response received from server");
    }
  } catch (error) {
    console.error("❌ Error saving product:", error);
    showError(error.message || "Failed to add product. Please try again.");
  } finally {
    loading.value = false;
  }
};

const clear = () => {
  productImages.value = [];
  uploadedImages.value = [];
  loading.value = false;
  emit("close");
};

const closeAddModal = () => {
  if (loading.value) return;
  clear();
};

const showSuccess = (message) => {
  successMessage.value = message;
  successDialog.value = true;
  setTimeout(() => {
    successDialog.value = false;
  }, 3000);
};

const showError = (message) => {
  errorMessage.value = message;
  errorDialog.value = true;
};
</script>

<style scoped>
.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}

.gap-2 {
  gap: 0.5rem;
}
</style>
