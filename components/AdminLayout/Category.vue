<template>
  <v-container fluid class="pa-6 bg-background">
    <v-row align="center" class="mb-6">
      <v-col cols="6" sm="6">
        <p class="text-overline text-medium-emphasis mb-0">Inventory</p>
        <div class="d-flex align-center ga-3">
          <span class="text-h4 font-weight-bold">Products</span>
          <v-chip color="primary" variant="tonal" size="small">
            {{ products.length }} items
          </v-chip>
        </div>
      </v-col>

      <v-col cols="6" sm="6">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          placeholder="Search products…"
          variant="outlined"
          density="compact"
          hide-details
          rounded="lg"
        />
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12">
        <div class="d-flex align-center ga-2 flex-wrap">
          <v-btn
            :variant="activeFilter === 'all' ? 'flat' : 'tonal'"
            :color="activeFilter === 'all' ? 'primary' : 'default'"
            rounded="lg"
            size="small"
            prepend-icon="mdi-view-grid-outline"
            @click="activeFilter = 'all'"
          >
            All Stock
            <v-chip
              class="ml-2"
              size="x-small"
              :color="activeFilter === 'all' ? 'white' : 'primary'"
              :variant="activeFilter === 'all' ? 'flat' : 'tonal'"
              >{{ products.length }}</v-chip
            >
          </v-btn>

          <v-btn
            :variant="activeFilter === 'seller' ? 'flat' : 'tonal'"
            :color="activeFilter === 'seller' ? 'deep-orange' : 'default'"
            rounded="lg"
            size="small"
            prepend-icon="mdi-fire"
            @click="activeFilter = 'seller'"
          >
            Seller Stock
            <v-chip
              class="ml-2"
              size="x-small"
              :color="activeFilter === 'seller' ? 'white' : 'deep-orange'"
              :variant="activeFilter === 'seller' ? 'flat' : 'tonal'"
              >{{ sellerProducts.length }}</v-chip
            >
          </v-btn>

          <v-divider vertical class="mx-1" />

          <v-btn
            v-for="cat in categories"
            :key="cat"
            :variant="activeFilter === cat ? 'flat' : 'outlined'"
            :color="activeFilter === cat ? 'secondary' : 'default'"
            rounded="lg"
            size="small"
            @click="activeFilter = cat"
          >
            {{ cat }}
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row class="mb-2">
      <v-col cols="12">
        <div class="d-flex align-center ga-2">
          <v-icon
            :color="activeFilter === 'seller' ? 'deep-orange' : 'primary'"
            size="18"
          >
            {{
              activeFilter === "seller"
                ? "mdi-fire"
                : "mdi-package-variant-closed"
            }}
          </v-icon>
          <span
            class="text-body-2 font-weight-bold text-medium-emphasis text-uppercase"
          >
            {{
              activeFilter === "seller"
                ? "Best Sellers"
                : activeFilter === "all"
                ? "All Products"
                : activeFilter
            }}
          </span>
          <span class="text-caption text-disabled"
            >— {{ displayedProducts.length }} results</span
          >
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="product in displayedProducts"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          rounded="xl"
          variant="outlined"
          hover
          style="cursor: pointer"
          @click="openDialog(product)"
        >
          <v-progress-linear
            :color="product.color"
            model-value="100"
            height="4"
            rounded="0"
          />

          <v-card-text class="pa-5">
            <div class="d-flex align-start justify-space-between mb-4">
              <v-avatar size="52" rounded="lg" :color="product.color + '22'">
                <v-icon size="26" :color="product.color">{{
                  product.icon
                }}</v-icon>
              </v-avatar>

              <div class="d-flex flex-column align-end ga-1">
                <v-chip
                  v-if="product.seller"
                  color="deep-orange"
                  variant="flat"
                  size="x-small"
                  prepend-icon="mdi-fire"
                  class="font-weight-bold"
                >
                  Best Seller
                </v-chip>
                <v-chip
                  :color="qtyColor(product.qty)"
                  variant="tonal"
                  size="x-small"
                  class="font-weight-bold text-uppercase"
                >
                  {{ qtyLabel(product.qty) }}
                </v-chip>
              </div>
            </div>

            <p class="text-subtitle-1 font-weight-bold text-truncate mb-0">
              {{ product.name }}
            </p>
            <v-chip
              class="mt-1 mb-4"
              size="x-small"
              variant="tonal"
              color="secondary"
              prepend-icon="mdi-tag-outline"
            >
              {{ product.category }}
            </v-chip>

            <div class="d-flex align-center justify-space-between mb-1">
              <span class="text-caption text-medium-emphasis">Stock qty</span>
              <v-chip
                :color="qtyColor(product.qty)"
                variant="flat"
                size="small"
                class="font-weight-bold"
              >
                {{ product.qty }}
              </v-chip>
            </div>

            <v-progress-linear
              :model-value="qtyPercent(product.qty)"
              :color="qtyColor(product.qty)"
              bg-color="surface-variant"
              rounded
              height="6"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col v-if="displayedProducts.length === 0" cols="12">
        <v-empty-state
          icon="mdi-magnify-off"
          title="No products found"
          :text="
            activeFilter === 'seller'
              ? 'No best seller products yet.'
              : `No results for &quot;${search}&quot;`
          "
        />
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="400" rounded="xl">
      <v-card rounded="xl" v-if="selected">
        <v-progress-linear
          :color="selected.color"
          model-value="100"
          height="4"
          rounded="0"
        />

        <v-card-text class="pa-6">
          <div class="d-flex align-center ga-3 mb-5">
            <v-avatar size="48" rounded="lg" :color="selected.color + '22'">
              <v-icon size="24" :color="selected.color">{{
                selected.icon
              }}</v-icon>
            </v-avatar>
            <div>
              <div class="text-subtitle-1 font-weight-bold">
                {{ selected.name }}
              </div>
              <div class="text-caption text-medium-emphasis">
                {{ selected.category }}
              </div>
            </div>
          </div>

          <v-alert
            type="info"
            variant="tonal"
            density="compact"
            class="mb-5"
            icon="mdi-package-variant"
          >
            Current stock: <strong>{{ selected.qty }}</strong> units
          </v-alert>

          <v-text-field
            v-model.number="addQty"
            label="Add quantity"
            placeholder="Enter amount to add"
            variant="outlined"
            density="comfortable"
            rounded="lg"
            type="number"
            min="1"
            hide-details="auto"
            :rules="[(v) => v > 0 || 'Must be greater than 0']"
            prepend-inner-icon="mdi-plus-box-outline"
          />
        </v-card-text>

        <v-card-actions class="pa-4 pt-0 ga-2">
          <v-btn
            variant="tonal"
            color="secondary"
            rounded="lg"
            block
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            variant="flat"
            :color="selected.color"
            rounded="lg"
            block
            :disabled="!addQty || addQty <= 0"
            prepend-icon="mdi-check"
            @click="confirmAdd"
          >
            Add Stock
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";

const search = ref("");
const dialog = ref(false);
const selected = ref(null);
const addQty = ref(null);
const activeFilter = ref("all");

const products = ref([
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    qty: 42,
    icon: "mdi-headphones",
    color: "indigo",
    seller: true,
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    category: "Accessories",
    qty: 8,
    icon: "mdi-keyboard",
    color: "amber",
    seller: false,
  },
  {
    id: 3,
    name: "USB-C Hub 7-in-1",
    category: "Accessories",
    qty: 75,
    icon: "mdi-usb-port",
    color: "teal",
    seller: true,
  },
  {
    id: 4,
    name: "Webcam HD 1080p",
    category: "Electronics",
    qty: 3,
    icon: "mdi-webcam",
    color: "red",
    seller: false,
  },
  {
    id: 5,
    name: "LED Desk Lamp",
    category: "Furniture",
    qty: 21,
    icon: "mdi-desk-lamp",
    color: "orange",
    seller: false,
  },
  {
    id: 6,
    name: "Ergonomic Chair",
    category: "Furniture",
    qty: 0,
    icon: "mdi-chair-rolling",
    color: "purple",
    seller: true,
  },
  {
    id: 7,
    name: 'Monitor 27" 4K',
    category: "Electronics",
    qty: 14,
    icon: "mdi-monitor",
    color: "blue",
    seller: true,
  },
  {
    id: 8,
    name: "Laptop Stand",
    category: "Accessories",
    qty: 33,
    icon: "mdi-laptop",
    color: "cyan",
    seller: false,
  },
]);

const categories = computed(() => [
  ...new Set(products.value.map((p) => p.category)),
]);

const sellerProducts = computed(() => products.value.filter((p) => p.seller));

const displayedProducts = computed(() => {
  let list =
    activeFilter.value === "seller"
      ? sellerProducts.value
      : activeFilter.value === "all"
      ? products.value
      : products.value.filter((p) => p.category === activeFilter.value);

  if (search.value.trim()) {
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(search.value.toLowerCase()) ||
        p.category.toLowerCase().includes(search.value.toLowerCase())
    );
  }
  return list;
});

function openDialog(product) {
  selected.value = product;
  addQty.value = null;
  dialog.value = true;
}

function confirmAdd() {
  if (!addQty.value || addQty.value <= 0) return;
  const product = products.value.find((p) => p.id === selected.value.id);
  if (product) product.qty += Number(addQty.value);
  dialog.value = false;
}

function qtyPercent(qty) {
  return Math.min(100, qty);
}

function qtyColor(qty) {
  if (qty === 0) return "error";
  if (qty <= 10) return "warning";
  if (qty <= 30) return "info";
  return "success";
}

function qtyLabel(qty) {
  if (qty === 0) return "Out of stock";
  if (qty <= 10) return "Low stock";
  if (qty <= 30) return "Limited";
  return "In stock";
}
</script>
