<template>
  <v-container fluid class="pa-4">
    <!-- 🔍 DEBUG: Show what props received -->
    <div class="mb-4 pa-2 bg-grey-lighten-4 rounded">
      <strong>DEBUG INFO:</strong>
      <div>Products count: {{ products.length }}</div>
      <div>Loading: {{ loading }}</div>
      <div>Can Edit: {{ canEdit }}</div>
      <div>Can Delete: {{ canDelete }}</div>
    </div>

    <!-- Loading State -->
    <v-row v-if="loading">
      <v-col cols="12" class="text-center py-16">
        <v-progress-circular indeterminate color="primary" size="64" />
        <p class="mt-4 text-h6">Loading products...</p>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <v-row v-else-if="!products || products.length === 0">
      <v-col cols="12" class="text-center py-16">
        <v-icon size="120" color="grey-lighten-2">mdi-package-variant</v-icon>
        <h3 class="text-h5 text-grey-darken-1 mt-6">No products found</h3>
        <p class="text-body-1 text-grey mt-2">
          Products array is {{ products ? "empty" : "undefined" }}
        </p>
      </v-col>
    </v-row>

    <!-- Products Grid -->
    <v-row v-else class="mt-2" dense>
      <v-col
        v-for="(product, index) in products"
        :key="product.id || index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          class="pa-3 d-flex flex-column"
          elevation="3"
          style="height: 100%"
        >
          <!-- Image -->
          <v-avatar size="120" class="mx-auto mb-3" color="grey-lighten-3">
            <span class="text-h4">{{ product.image || "📦" }}</span>
          </v-avatar>

          <!-- Title -->
          <div class="text-center font-weight-bold text-h6 mb-2">
            {{ product.name }}
          </div>

          <!-- Category + Phone -->
          <div class="text-center mb-3">
            <v-chip size="small" color="success" variant="tonal" class="mr-2">
              {{ product.category }}
            </v-chip>
            <v-chip size="small" color="info" variant="tonal">
              <v-icon start size="small">mdi-phone</v-icon>
              {{ product.phone }}
            </v-chip>
          </div>

          <!-- Location Chips -->
          <div class="d-flex flex-wrap gap-2 mb-3 justify-center">
            <v-chip
              size="x-small"
              prepend-icon="mdi-map-marker"
              color="primary"
            >
              {{ product.province }}
            </v-chip>
            <v-chip
              size="x-small"
              prepend-icon="mdi-office-building"
              color="primary"
            >
              {{ product.district }}
            </v-chip>
            <v-chip
              size="x-small"
              prepend-icon="mdi-home-group"
              color="primary"
            >
              {{ product.village }}
            </v-chip>
          </div>

          <!-- Price & Stock -->
          <div class="d-flex justify-space-around my-2">
            <div class="text-center">
              <div class="text-caption text-grey">Price</div>
              <div class="font-weight-bold text-h6">${{ product.price }}</div>
            </div>
            <div class="text-center">
              <div class="text-caption text-grey">Stock</div>
              <div class="font-weight-bold text-h6">{{ product.stock }}</div>
            </div>
          </div>

          <v-divider class="my-3"></v-divider>

          <!-- Action Buttons -->
          <div class="d-flex justify-center gap-2 flex-wrap">
            <v-btn
              color="purple"
              variant="tonal"
              size="small"
              :href="product.videoPath"
              target="_blank"
            >
              <v-icon start>mdi-video</v-icon> Video
            </v-btn>
            <v-btn
              color="red"
              variant="tonal"
              size="small"
              :href="product.mapUrl"
              target="_blank"
            >
              <v-icon start>mdi-map</v-icon> Map
            </v-btn>
          </div>

          <!-- Edit + Delete Buttons -->
          <div class="d-flex justify-center gap-2 mt-3">
            <v-btn
              v-if="canEdit"
              color="primary"
              variant="outlined"
              size="small"
              @click="$emit('editProduct', product)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              v-if="canDelete"
              color="error"
              variant="outlined"
              size="small"
              @click="confirmDelete(product.id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- ================= Edit Product Modal   =============== -->
  <DialogEditProduct
    :showDetailEditProduct="showDetailEditProduct"
    :editingProduct="selectedProduct"
    @close="showDetailEditProduct = false"
  />
</template>

<script setup>
const showDetailEditProduct = ref(false);
const selectedProduct = ref(null);
const editingProduct = ref(null);
// ✅ DEFINE PROPS - This receives data from parent
const props = defineProps({
  products: {
    type: Array,
    required: true,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  canEdit: {
    type: Boolean,
    default: true,
  },
  canDelete: {
    type: Boolean,
    default: true,
  },
});
function openEdit(product) {
  selectedProduct.value = JSON.parse(JSON.stringify(product)); // deep copy
  showDetailEditProduct.value = true;
}
// ✅ DEFINE EMITS - This sends events to parent
const emit = defineEmits(["edit-product", "delete-product"]);

// Confirm delete
const confirmDelete = (productId) => {
  if (confirm("Are you sure you want to delete this product?")) {
    emit("delete-product", productId);
  }
};
const editProduct = (product) => {
  editingProduct.value = { ...product };

  // Separate existing images from the product
  if (product.images && Array.isArray(product.images)) {
    existingImages.value = [...product.images];
  } else {
    existingImages.value = [];
  }

  // Clear new images
  newEditImages.value = [];
  editProductImages.value = [];
  showEditModal.value = true;
};
</script>
