<template>
  <div class="history-page">

    <!-- SEARCH HEADER -->
    <div class="search-header pa-4 pb-3">
      <div class="d-flex align-center mb-3">
        <v-icon color="deep-purple" class="mr-2">mdi-magnify-scan</v-icon>
        <span class="text-h6 font-weight-bold">Order Tracking</span>
      </div>
      <p class="text-body-2 text-grey-darken-1 mb-3">
        Enter the phone number used during checkout to retrieve your order details.
      </p>
      <v-form @submit.prevent="handleSearch">
        <div class="d-flex ga-2">
          <v-text-field
            v-model="searchPhone"
            label="Phone Number"
            placeholder="20 XXXX XXXX"
            variant="outlined"
            density="comfortable"
            rounded="lg"
            prepend-inner-icon="mdi-phone-outline"
            color="deep-purple"
            hide-details="auto"
            :error-messages="error ? [error] : []"
            @keyup.enter="handleSearch"
            class="flex-grow-1"
          />
          <v-btn
            height="48"
            color="deep-purple-accent-4"
            rounded="lg"
            elevation="2"
            :loading="loading"
            :disabled="!isPhoneValid"
            @click="handleSearch"
            min-width="80"
          >
            Search
          </v-btn>
        </div>
      </v-form>
    </div>

    <v-divider />

    <!-- RESULTS AREA -->
    <div class="pa-3 pa-md-4">
      <v-expand-transition>
        <div v-if="hasSearched">

          <!-- CASE: ORDERS FOUND -->
          <div v-if="orders.length > 0">
            <div class="d-flex align-center mb-3">
              <v-icon color="success" class="mr-2">mdi-check-all</v-icon>
              <span class="text-subtitle-1 font-weight-medium">Found {{ orders.length }} Orders</span>
            </div>

            <v-card
              v-for="(order, idx) in orders"
              :key="idx"
              rounded="xl"
              elevation="2"
              class="mb-4 border-s-xl"
              :style="{ borderInlineStartColor: getStatusHex(order.sellstatus) + ' !important' }"
            >
              <!-- TOP STRIP: ID & STATUS -->
              <v-card-item class="bg-grey-lighten-5">
                <template v-slot:prepend>
                  <v-icon color="deep-purple">mdi-barcode-scan</v-icon>
                </template>
                <v-card-title class="text-uppercase font-weight-black">
                  {{ order.orderid }}
                </v-card-title>
                <template v-slot:append>
                  <v-chip
                    :color="getStatusColor(order.sellstatus)"
                    variant="flat"
                    size="small"
                    class="font-weight-bold"
                  >
                    {{ getStatusText(order.sellstatus) }}
                  </v-chip>
                </template>
              </v-card-item>

              <v-divider />

              <!-- CUSTOMER INFO -->
              <v-card-text class="pa-3 pa-md-5">
                <v-row dense>
                  <v-col cols="6" sm="3">
                    <div class="text-overline text-grey">Date</div>
                    <div class="text-body-2 font-weight-bold">{{ formatDate(order.cdate) }}</div>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <div class="text-overline text-grey">Customer</div>
                    <div class="text-body-2 font-weight-bold text-truncate">{{ order.custname }}</div>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <div class="text-overline text-grey">Shipping</div>
                    <div class="text-body-2 font-weight-bold">{{ order.shipping }}</div>
                  </v-col>
                  <v-col cols="6" sm="3" v-if="order.paymentimage">
                    <div class="text-overline text-grey mb-1">Receipt</div>
                    <v-btn
                      variant="tonal"
                      color="deep-purple"
                      size="small"
                      prepend-icon="mdi-image"
                      @click="openPaymentImage(order.paymentimage)"
                    >
                      View
                    </v-btn>
                  </v-col>
                </v-row>

                <v-divider class="my-3" />

                <!-- PRODUCTS LIST -->
                <v-list class="bg-transparent pa-0">
                  <v-list-item
                    v-for="(item, i) in order.productdetail"
                    :key="i"
                    class="px-0 mb-2"
                  >
                    <template v-slot:prepend>
                      <v-avatar rounded="lg" size="56" color="grey-lighten-3">
                        <v-img :src="item.image || ''" cover />
                      </v-avatar>
                    </template>
                    <v-list-item-title class="font-weight-bold text-body-2">
                      {{ item.productname }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Qty: {{ item.qty }} × {{ formatPrice(item.price) }}
                    </v-list-item-subtitle>
                    <template v-slot:append>
                      <span class="font-weight-black text-deep-purple text-body-2">
                        {{ formatPrice(Number(item.price) * Number(item.qty)) }}
                      </span>
                    </template>
                  </v-list-item>
                </v-list>

                <!-- TOTAL FOOTER -->
                <div class="total-box rounded-lg mt-3 pa-3 d-flex justify-space-between align-center">
                  <span class="text-subtitle-1 font-weight-bold">Total Payable</span>
                  <span class="text-h6 font-weight-black text-deep-purple-darken-4">
                    {{ formatPrice(calculateOrderTotal(order.productdetail)) }}
                  </span>
                </div>
              </v-card-text>
            </v-card>
          </div>

          <!-- CASE: NO RESULTS -->
          <v-empty-state
            v-else
            icon="mdi-magnify-minus-outline"
            title="No Orders Found"
            text="We couldn't find any orders associated with that phone number."
            class="mt-10"
          >
            <template v-slot:actions>
              <v-btn color="deep-purple" variant="outlined" @click="handleClearSearch">Try Again</v-btn>
            </template>
          </v-empty-state>
        </div>

        <!-- INITIAL LANDING STATE -->
        <v-empty-state
          v-else-if="!error"
          icon="mdi-history"
          title="Your Order History"
          text="Ready to check your orders? Enter your phone number above."
          class="mt-10"
        />
      </v-expand-transition>
    </div>

    <!-- LIGHTBOX FOR PAYMENT -->
    <v-dialog v-model="showPaymentDialog" max-width="500">
      <v-card rounded="xl">
        <v-img :src="selectedPaymentImage" max-height="80vh" />
        <v-card-actions class="bg-white">
          <v-spacer />
          <v-btn color="deep-purple" variant="text" @click="showPaymentDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const { orders, loading, error, hasSearched, searchByTel, clearSearch } =
  useSearchCustomer();
const searchPhone = ref("");
const showPaymentDialog = ref(false);
const selectedPaymentImage = ref("");

const isPhoneValid = computed(
  () => searchPhone.value.startsWith("20") && searchPhone.value.length >= 8
);

const handleSearch = () => searchByTel(searchPhone.value, 0, 10);
const handleClearSearch = () => {
  searchPhone.value = "";
  clearSearch();
};

const formatPrice = (p: any) =>
  new Intl.NumberFormat("lo-LA").format(p) + " LAK";
const formatDate = (d: any) => new Date(d).toLocaleDateString("lo-LA");
const calculateOrderTotal = (items: any[]) =>
  items.reduce((s, i) => s + i.price * i.qty, 0);

const getStatusText = (s: any) =>
  s == "1" ? "Delivered" : s == "0" ? "Processing" : "Cancelled";
const getStatusColor = (s: any) =>
  s == "1" ? "green-darken-1" : s == "0" ? "orange-darken-1" : "red-darken-1";
const getStatusHex = (s: any) =>
  s == "1" ? "#43A047" : s == "0" ? "#FB8C00" : "#E53935";

function openPaymentImage(img: string) {
  selectedPaymentImage.value = img;
  showPaymentDialog.value = true;
}
</script>

<style scoped>
.history-page {
  min-height: 100dvh;
  background: #f5f5f5;
}

.search-header {
  background: white;
}

.total-box {
  background: #ede7f6;
  border: 2px dashed #7e57c2;
}

.border-s-xl {
  border-inline-start-width: 8px !important;
}
</style>
