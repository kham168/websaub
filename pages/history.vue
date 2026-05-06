<template>
  <!-- Using fluid for full-width background coverage -->
  <v-container fluid class="fill-height bg-grey-lighten-4 pa-0">
    <v-row justify="center" no-gutters class="w-100">
      <v-col cols="12" sm="10" md="8" lg="7" xl="6" class="pa-4 pa-md-8">
        <!-- SEARCH HEADER SECTION -->
        <v-card rounded="xl" elevation="4" class="mb-6 overflow-hidden">
          <v-toolbar color="deep-purple-darken-1" flat>
            <v-icon start class="ml-4">mdi-magnify-scan</v-icon>
            <v-toolbar-title class="font-weight-bold"
              >Order Tracking</v-toolbar-title
            >
          </v-toolbar>

          <v-card-text class="pa-6">
            <p class="text-subtitle-1 text-grey-darken-1 mb-4">
              Enter the phone number used during checkout to retrieve your order
              details.
            </p>

            <v-form @submit.prevent="handleSearch">
              <v-row dense>
                <v-col cols="12" sm="9">
                  <v-text-field
                    v-model="searchPhone"
                    label="Phone Number"
                    placeholder="20 XXXX XXXX"
                    variant="filled"
                    rounded="lg"
                    prepend-inner-icon="mdi-phone-outline"
                    color="deep-purple"
                    hide-details="auto"
                    :error-messages="error ? [error] : []"
                    @keyup.enter="handleSearch"
                  />
                </v-col>
                <v-col cols="12" sm="3">
                  <v-btn
                    block
                    height="56"
                    color="deep-purple-accent-4"
                    rounded="lg"
                    elevation="2"
                    :loading="loading"
                    :disabled="!isPhoneValid"
                    @click="handleSearch"
                  >
                    Search
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>

        <!-- RESULTS AREA -->
        <v-expand-transition>
          <div v-if="hasSearched">
            <!-- CASE: ORDERS FOUND -->
            <div v-if="orders.length > 0">
              <div class="d-flex align-center mb-4">
                <v-icon color="success" class="mr-2">mdi-check-all</v-icon>
                <span class="text-h6 font-weight-medium"
                  >Found {{ orders.length }} Orders</span
                >
              </div>

              <v-card
                v-for="(order, idx) in orders"
                :key="idx"
                rounded="xl"
                elevation="2"
                class="mb-6 border-s-xl"
                :style="{
                  borderInlineStartColor:
                    getStatusHex(order.sellstatus) + ' !important',
                }"
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

                <!-- CUSTOMER INFO SECTION -->
                <v-card-text class="pa-4 pa-md-6">
                  <v-row>
                    <v-col cols="6" sm="3">
                      <div class="text-overline text-grey">Date</div>
                      <div class="text-body-1 font-weight-bold">
                        {{ formatDate(order.cdate) }}
                      </div>
                    </v-col>
                    <v-col cols="6" sm="3">
                      <div class="text-overline text-grey">Customer</div>
                      <div class="text-body-1 font-weight-bold text-truncate">
                        {{ order.custname }}
                      </div>
                    </v-col>
                    <v-col cols="6" sm="3">
                      <div class="text-overline text-grey">Shipping</div>
                      <div class="text-body-1 font-weight-bold">
                        {{ order.shipping }}
                      </div>
                    </v-col>
                    <v-col cols="6" sm="3" v-if="order.paymentimage">
                      <v-btn
                        variant="tonal"
                        color="deep-purple"
                        size="small"
                        prepend-icon="mdi-image"
                        @click="openPaymentImage(order.paymentimage)"
                      >
                        Receipt
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-divider class="my-6" />

                  <!-- PRODUCTS TABLE/LIST -->
                  <v-list class="bg-transparent pa-0">
                    <v-list-item
                      v-for="(item, i) in order.productdetail"
                      :key="i"
                      class="px-0 mb-2"
                    >
                      <template v-slot:prepend>
                        <v-avatar rounded="lg" size="50" color="grey-lighten-3">
                          <!-- Fix: Use logical OR to provide a fallback string if image is null -->
                          <v-img :src="item.image || ''" cover />
                        </v-avatar>
                      </template>

                      <v-list-item-title class="font-weight-bold">
                        {{ item.productname }}
                      </v-list-item-title>

                      <v-list-item-subtitle>
                        Qty: {{ item.qty }} x {{ formatPrice(item.price) }}
                      </v-list-item-subtitle>

                      <template v-slot:append>
                        <span class="font-weight-black text-deep-purple">
                          <!-- Fix: Wrap variables in Number() to ensure arithmetic works -->
                          {{
                            formatPrice(Number(item.price) * Number(item.qty))
                          }}
                        </span>
                      </template>
                    </v-list-item>
                  </v-list>

                  <!-- ORDER SUMMARY FOOTER -->
                  <v-card
                    rounded="lg"
                    color="deep-purple-lighten-5"
                    class="mt-6 pa-4 border-dashed border-deep-purple"
                  >
                    <div class="d-flex justify-space-between align-center">
                      <span class="text-h6 font-weight-bold"
                        >Total Payable</span
                      >
                      <span
                        class="text-h5 font-weight-black text-deep-purple-darken-4"
                      >
                        {{
                          formatPrice(calculateOrderTotal(order.productdetail))
                        }}
                      </span>
                    </div>
                  </v-card>
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
                <v-btn
                  color="deep-purple"
                  variant="outlined"
                  @click="handleClearSearch"
                  >Try Again</v-btn
                >
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
      </v-col>
    </v-row>

    <!-- LIGHTBOX FOR PAYMENT -->
    <v-dialog v-model="showPaymentDialog" max-width="500">
      <v-card rounded="xl">
        <v-img :src="selectedPaymentImage" max-height="80vh" />
        <v-card-actions class="bg-white">
          <v-spacer />
          <v-btn
            color="deep-purple"
            variant="text"
            @click="showPaymentDialog = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useSearchCustomer } from "~/composables/useSearchCustomer";

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

// FORMATTERS
const formatPrice = (p: any) =>
  new Intl.NumberFormat("lo-LA").format(p) + " LAK";
const formatDate = (d: any) => new Date(d).toLocaleDateString("lo-LA");
const calculateOrderTotal = (items: any[]) =>
  items.reduce((s, i) => s + i.price * i.qty, 0);

// STATUS HELPERS (Design logic)
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
/* Vuetify helper for dashed borders not included by default */
.border-dashed {
  border: 2px dashed currentColor !important;
}
.border-s-xl {
  border-inline-start-width: 8px !important;
}
</style>
