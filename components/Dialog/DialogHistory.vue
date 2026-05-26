<template>
  <v-container fluid class="pa-0">
    <v-container
      class="px-3 px-sm-4 px-md-6 py-4 py-md-6"
      style="max-width: 1200px"
    >
      <!-- SEARCH SECTION -->
      <v-sheet
        class="pa-4 pa-md-6 mb-4 mb-md-6 rounded-lg rounded-md-xl search-section"
        elevation="0"
      >
        <div class="d-flex align-center mb-4 mb-md-5">
          <v-avatar size="32" class="d-sm-none" color="deep-purple">
            <v-icon size="20" color="white">mdi-phone-search</v-icon>
          </v-avatar>
          <v-avatar size="40" class="d-none d-sm-flex" color="deep-purple">
            <v-icon size="24" color="white">mdi-phone-search</v-icon>
          </v-avatar>
          <span class="ml-3 text-body-1 text-sm-h6 font-weight-bold">
            Search Order by Phone
          </span>
        </div>

        <v-form @submit.prevent="handleSearch">
          <div class="d-flex flex-column flex-sm-row gap-2 gap-sm-3">
            <v-text-field
              v-model="searchPhone"
              label="Phone Number"
              placeholder="020 XXXX XXXX"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-phone"
              clearable
              hide-details
              color="deep-purple"
              class="flex-grow-1"
              @keyup.enter="handleSearch"
              @click:clear="handleClearSearch"
            />

            <v-btn
              color="deep-purple"
              variant="flat"
              size="large"
              class="flex-grow-0 flex-sm-grow-0"
              style="min-width: 120px"
              :loading="loading"
              :disabled="!isPhoneValid"
              @click="handleSearch"
            >
              <v-icon class="mr-1">mdi-magnify</v-icon>
              Search
            </v-btn>
          </div>
        </v-form>

        <v-alert
          v-if="error"
          type="error"
          variant="tonal"
          class="mt-3 mt-md-4"
          closable
          @click:close="error = ''"
        >
          {{ error }}
        </v-alert>
      </v-sheet>

      <!-- SEARCH RESULTS -->
      <v-expand-transition>
        <div v-if="hasSearched">
          <!-- ORDERS FOUND -->
          <div v-if="orders.length > 0">
            <v-chip
              color="success"
              variant="flat"
              prepend-icon="mdi-check-circle"
              class="mb-4"
            >
              Found {{ orders.length }} order(s)
            </v-chip>

            <!-- ORDER CARDS -->
            <v-card
              v-for="(order, idx) in orders"
              :key="idx"
              class="mb-4 order-card"
              elevation="2"
              rounded="lg"
            >
              <!-- ORDER HEADER -->
              <v-card-title class="bg-grey-lighten-4 pa-3 pa-md-4">
                <div
                  class="d-flex flex-column flex-sm-row align-start align-sm-center w-100 gap-2"
                >
                  <div class="d-flex align-center flex-grow-1">
                    <v-icon color="deep-purple" size="20" class="mr-2"
                      >mdi-receipt</v-icon
                    >
                    <span
                      class="text-body-2 text-sm-subtitle-1 font-weight-bold"
                    >
                      {{ order.orderid }}
                    </span>
                  </div>
                  <v-chip
                    :color="getStatusColor(order.sellstatus)"
                    size="small"
                    label
                    class="font-weight-bold"
                  >
                    <v-icon start size="16">
                      {{ getStatusIcon(order.sellstatus) }}
                    </v-icon>
                    {{ getStatusText(order.sellstatus) }}
                  </v-chip>
                </div>
              </v-card-title>

              <v-divider />

              <!-- ORDER DETAILS -->
              <v-card-text class="pa-3 pa-md-4">
                <!-- INFO GRID -->
                <div class="info-grid mb-4">
                  <div class="info-item">
                    <div class="text-caption text-grey">Order Date</div>
                    <div class="text-body-2 font-weight-medium">
                      {{ formatDate(order.cdate) }}
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="text-caption text-grey">your name</div>
                    <div class="text-body-2 font-weight-medium">
                      {{ order.custname }}
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="text-caption text-grey">Phone</div>
                    <div class="text-body-2 font-weight-medium">
                      {{ order.custtel }}
                    </div>
                  </div>

                  <div class="info-item">
                    <div class="text-caption text-grey">Shipping</div>
                    <div class="text-body-2 font-weight-medium">
                      {{ order.shipping }}
                    </div>
                  </div>

                  <div class="info-item">
                    <div class="text-caption text-grey">Items</div>
                    <div class="text-body-2 font-weight-medium">
                      {{ (order.productdetail || []).length }} products
                    </div>
                  </div>
                </div>

                <!-- DELIVERY ADDRESS -->
                <div class="mb-4">
                  <div class="text-caption text-grey mb-1">
                    Delivery Address
                  </div>
                  <div class="text-body-2 font-weight-medium">
                    {{ order.delivery || "N/A" }}
                  </div>
                </div>

                <!-- PAYMENT PROOF -->
                <!-- {{ order.paymentimage }} -->
                <div v-if="order.paymentimage" class="mb-4">
                  <div class="text-caption text-grey mb-2">Payment Proof</div>
                  <v-card
                    variant="outlined"
                    class="pa-2"
                    style="max-width: 150px"
                  >
                    <v-img
                      :src="order.paymentimage"
                      class="rounded"
                      aspect-ratio="1"
                      max-height="280"
                      cover
                      @click="openPaymentImage(order.paymentimage)"
                    >
                      <template #placeholder>
                        <div
                          class="d-flex align-center justify-center fill-height"
                        >
                          <v-progress-circular
                            indeterminate
                            color="deep-purple"
                          />
                        </div>
                      </template>
                      <template #error>
                        <div
                          class="d-flex align-center justify-center fill-height flex-column pa-4"
                        >
                          <v-icon size="40" color="grey"
                            >mdi-image-broken</v-icon
                          >
                          <div class="text-caption text-grey mt-2">
                            Image not available
                          </div>
                        </div>
                      </template>
                    </v-img>
                  </v-card>
                </div>
                <!-- dialog show paymentimage -->
                <v-dialog v-model="showPaymentDialog" max-width="600">
                  <v-card rounded="xl">
                    <v-card-title
                      class="d-flex justify-space-between align-center"
                    >
                      <span class="text-h6">Payment Proof</span>
                      <v-btn
                        icon
                        variant="text"
                        @click="showPaymentDialog = false"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-card-title>

                    <v-divider />

                    <v-card-text class="pa-4 text-center">
                      <v-img
                        v-if="selectedPaymentImage"
                        :src="selectedPaymentImage"
                        max-height="500"
                        contain
                      >
                        <template #placeholder>
                          <v-progress-circular
                            indeterminate
                            color="deep-purple"
                          />
                        </template>

                        <template #error>
                          <v-icon size="64" color="grey"
                            >mdi-image-broken</v-icon
                          >
                        </template>
                      </v-img>
                    </v-card-text>
                  </v-card>
                </v-dialog>

                <v-divider class="my-4" />

                <!-- PRODUCTS SECTION -->
                <div class="text-caption text-grey font-weight-bold mb-3">
                  ORDER ITEMS
                </div>

                <div class="products-list mb-4">
                  <div
                    v-for="(item, itemIdx) in order.productdetail || []"
                    :key="itemIdx"
                    class="product-item"
                  >
                    <div class="d-flex align-center gap-3">
                      <v-avatar size="48" rounded="lg" class="flex-shrink-0">
                        <v-img :src="item.image || '/placeholder.jpg'">
                          <template #placeholder>
                            <v-icon size="24" color="grey">mdi-image</v-icon>
                          </template>
                          <template #error>
                            <v-icon size="24" color="grey"
                              >mdi-image-off</v-icon
                            >
                          </template>
                        </v-img>
                      </v-avatar>

                      <div class="flex-grow-1 min-w-0">
                        <div
                          class="text-body-2 font-weight-medium text-truncate"
                        >
                          {{ item.productname }}
                        </div>
                        <div class="text-caption text-grey">
                          {{ item.qty }} × {{ formatPrice(item.price) }}
                        </div>
                      </div>

                      <div
                        class="text-body-2 font-weight-bold text-deep-purple text-no-wrap"
                      >
                        {{
                          formatPrice(
                            (parseFloat(item.price) || 0) *
                              (parseFloat(item.qty) || 0)
                          )
                        }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- TOTAL -->
                <v-sheet
                  class="pa-3 pa-md-4 rounded-lg d-flex align-center justify-space-between"
                  color="green-lighten-5"
                >
                  <span class="text-body-1 text-sm-subtitle-1 font-weight-bold"
                    >Total Amount</span
                  >
                  <span
                    class="text-h6 text-sm-h5 font-weight-bold text-green-darken-2"
                  >
                    {{
                      formatPrice(
                        calculateOrderTotal(order.productdetail || [])
                      )
                    }}
                  </span>
                </v-sheet>
              </v-card-text>
            </v-card>
          </div>

          <!-- NO ORDERS FOUND -->
          <v-sheet
            v-else
            class="pa-8 pa-md-12 text-center rounded-lg"
            color="grey-lighten-4"
          >
            <v-icon size="60" size-md="80" color="grey-lighten-1">
              mdi-clipboard-text-off-outline
            </v-icon>
            <div class="text-h6 text-md-h5 mt-4 text-grey-darken-1">
              No Orders Found
            </div>
            <div class="text-body-2 text-grey mt-2">
              No order history found for <strong>{{ searchedTel }}</strong>
            </div>
            <v-btn
              color="deep-purple"
              variant="tonal"
              class="mt-4"
              @click="handleClearSearch"
            >
              <v-icon class="mr-1">mdi-refresh</v-icon>
              Try Another Number
            </v-btn>
          </v-sheet>
        </div>
      </v-expand-transition>

      <!-- INITIAL STATE -->
      <v-sheet
        v-if="!hasSearched && !error"
        class="pa-8 pa-md-12 text-center rounded-lg initial-state"
      >
        <v-avatar
          size="80"
          size-md="100"
          color="deep-purple-lighten-4"
          class="mb-4"
        >
          <v-icon size="48" size-md="60" color="deep-purple"
            >mdi-text-box-search-outline</v-icon
          >
        </v-avatar>
        <div class="text-h6 text-md-h5">Search Your Order History</div>
        <div class="text-body-2 text-grey mt-2">
          Enter your phone number above to view your past orders
        </div>
      </v-sheet>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const {
  orders,
  loading,
  error,
  searchedTel,
  hasSearched,
  searchByTel,
  clearSearch,
} = useSearchCustomer();

const searchPhone = ref("");

const isPhoneValid = computed(() => {
  if (!searchPhone.value) return false;
  const digits = searchPhone.value.replace(/\s+/g, "");
  return /^\d+$/.test(digits) && digits.length >= 8 && digits.startsWith("020");
});

async function handleSearch() {
  const tel = searchPhone.value?.trim();
  if (!tel) {
    error.value = "Please enter a phone number.";
    return;
  }
  if (!isPhoneValid.value) {
    error.value =
      "Phone must be numeric, start with 020 and be at least 8 digits.";
    return;
  }
  await searchByTel(tel, 0, 20);
}

function handleClearSearch() {
  searchPhone.value = "";
  clearSearch();
}

function formatPrice(price: string | number): string {
  const num =
    typeof price === "string"
      ? parseFloat(price.replace(/[^\d.-]/g, ""))
      : price;
  return isNaN(num)
    ? "LAK 0"
    : new Intl.NumberFormat("lo-LA", {
        style: "currency",
        currency: "LAK",
        maximumFractionDigits: 0,
      }).format(num);
}

function formatDate(d: string | null): string {
  if (!d) return "N/A";
  const date = new Date(d);
  return isNaN(date.getTime()) ? d : date.toLocaleDateString("lo-LA");
}

function calculateOrderTotal(products: any[]): number {
  return (products || []).reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const qty = parseFloat(item.qty) || 0;
    return sum + price * qty;
  }, 0);
}

function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    "0": "warning",
    "1": "success",
    "2": "error",
  };
  return map[String(status)] || "grey";
}

function getStatusIcon(status: string): string {
  const map: Record<string, string> = {
    "0": "mdi-clock-outline",
    "1": "mdi-check-circle",
    "2": "mdi-close-circle",
  };
  return map[String(status)] || "mdi-help";
}

function getStatusText(status: string): string {
  const map: Record<string, string> = {
    "0": "ກຳລັງຈັດສົ່ງ",
    "1": "ຈັດສົ່ງສໍາເລັດແລ້ວ",
    "2": "Cancelled",
  };
  return map[String(status)] || "Unknown";
}

const showPaymentDialog = ref(false);
const selectedPaymentImage = ref<string | null>(null);

function openPaymentImage(image: string) {
  selectedPaymentImage.value = image;
  showPaymentDialog.value = true;
}
</script>

<style scoped>
.search-section {
  background: linear-gradient(135deg, #ede7f6 0%, #e8eaf6 100%);
}

.initial-state {
  background: linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%);
}

.order-card {
  border-left: 4px solid #9575cd;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.order-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (min-width: 600px) {
  .info-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.info-item {
  min-width: 0;
}

.products-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #fafafa;
  border-radius: 8px;
  padding: 12px;
}

.product-item {
  padding: 8px;
  background: white;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.product-item:hover {
  background: #f5f5f5;
}

.min-w-0 {
  min-width: 0;
}

.text-no-wrap {
  white-space: nowrap;
}

.gap-2 {
  gap: 8px;
}

.gap-3 {
  gap: 12px;
}

@media (min-width: 600px) {
  .gap-sm-3 {
    gap: 12px;
  }
}
</style>
