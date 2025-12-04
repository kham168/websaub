<template>
  <v-container>
    <!-- <v-card rounded="xl" elevation="24">
        <v-divider></v-divider> -->
    <v-container class="pa-6">
      <v-sheet class="pa-5 mb-5 rounded-xl search-section" elevation="0">
        <div class="text-subtitle-1 font-weight-bold mb-4 d-flex align-center">
          <v-avatar size="36" color="deep-purple"
            ><v-icon color="white">mdi-phone-search</v-icon></v-avatar
          >
          <span class="ml-3">Search Order by Phone Number</span>
        </div>
        <v-form @submit.prevent="searchHistory">
          <v-row align="center">
            <v-col cols="12" sm="8">
              <v-text-field
                v-model="searchPhone"
                label="Enter Phone Number"
                placeholder="020 XXXX XXXX"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-phone"
                clearable
                hide-details
                color="deep-purple"
                @keyup.enter="searchHistory"
                @click:clear="clearSearch"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-btn
                color="deep-purple"
                variant="flat"
                size="large"
                block
                :loading="searchLoading"
                @click="searchHistory"
              >
                <v-icon left>mdi-magnify</v-icon> Search
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-sheet>

      <v-expand-transition>
        <div v-if="hasSearched">
          <div v-if="orderHistory.length > 0">
            <div class="d-flex align-center mb-4">
              <v-chip
                color="success"
                variant="flat"
                prepend-icon="mdi-check-circle"
              >
                Found {{ orderHistory.length }} order(s) for
                {{ searchPhone }}
              </v-chip>
            </div>
            <v-card
              v-for="(order, idx) in orderHistory"
              :key="idx"
              class="mb-4 order-history-card"
              elevation="2"
              rounded="xl"
            >
              <v-card-title
                class="bg-grey-lighten-4 py-3 px-4 d-flex align-center flex-wrap"
              >
                <v-icon color="deep-purple" class="mr-2">mdi-receipt</v-icon>
                <span class="text-subtitle-1 font-weight-bold">{{
                  order.id
                }}</span>
                <v-spacer></v-spacer>
                <v-chip
                  :color="getStatusColor(order.status)"
                  size="small"
                  label
                  class="font-weight-bold"
                >
                  <v-icon start size="small">{{
                    getStatusIcon(order.status)
                  }}</v-icon>
                  {{ order.status }}
                </v-chip>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="pa-4">
                <v-row dense class="mb-3">
                  <v-col cols="6" sm="3">
                    <div class="text-caption text-grey">Order Date</div>
                    <div class="text-body-2 font-weight-medium">
                      {{ order.date }}
                    </div>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <div class="text-caption text-grey">Phone</div>
                    <div class="text-body-2 font-weight-medium">
                      {{ order.phone }}
                    </div>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <div class="text-caption text-grey">Shipping</div>
                    <div class="text-body-2 font-weight-medium">
                      {{ order.shipping }}
                    </div>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <div class="text-caption text-grey">Items</div>
                    <div class="text-body-2 font-weight-medium">
                      {{ order.items.length }} products
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="text-caption text-grey">Delivery Address</div>
                    <div class="text-body-2 font-weight-medium">
                      {{ order.address }}
                    </div>
                  </v-col>
                </v-row>
                <v-divider class="my-3"></v-divider>
                <div class="text-caption text-grey mb-2 font-weight-bold">
                  ORDER ITEMS
                </div>
                <v-list
                  density="compact"
                  class="bg-grey-lighten-5 rounded-lg pa-0"
                >
                  <v-list-item
                    v-for="(item, itemIdx) in order.items"
                    :key="itemIdx"
                    class="px-3"
                  >
                    <template v-slot:prepend>
                      <v-avatar size="45" rounded="lg" class="mr-3">
                        <v-img :src="item.image">
                          <template v-slot:placeholder
                            ><v-icon>mdi-image</v-icon></template
                          >
                        </v-img>
                      </v-avatar>
                    </template>
                    <v-list-item-title class="text-body-2 font-weight-medium">{{
                      item.name
                    }}</v-list-item-title>
                    <v-list-item-subtitle class="text-caption">
                      {{ item.quantity }} × {{ formatPrice(item.price) }}
                    </v-list-item-subtitle>
                    <template v-slot:append>
                      <span
                        class="text-body-2 font-weight-bold text-deep-purple"
                        >{{ formatPrice(item.price * item.quantity) }}</span
                      >
                    </template>
                  </v-list-item>
                </v-list>
                <v-sheet
                  class="d-flex justify-space-between align-center mt-4 pa-4 rounded-lg"
                  color="green-lighten-5"
                >
                  <span class="text-subtitle-1 font-weight-bold"
                    >Total Amount</span
                  >
                  <span class="text-h6 font-weight-bold text-green-darken-2">{{
                    formatPrice(order.total)
                  }}</span>
                </v-sheet>
              </v-card-text>
            </v-card>
          </div>
          <v-sheet
            v-else
            class="pa-10 text-center rounded-xl"
            color="grey-lighten-4"
          >
            <v-icon size="80" color="grey-lighten-1"
              >mdi-clipboard-text-off-outline</v-icon
            >
            <div class="text-h6 mt-4 text-grey-darken-1">No Orders Found</div>
            <div class="text-body-2 text-grey mt-2">
              No order history found for: <strong>{{ searchPhone }}</strong>
            </div>
            <v-btn
              color="deep-purple"
              variant="tonal"
              class="mt-4"
              @click="clearSearch"
            >
              <v-icon left>mdi-refresh</v-icon> Try Another Number
            </v-btn>
          </v-sheet>
        </div>
      </v-expand-transition>
      <v-sheet
        v-if="!hasSearched"
        class="pa-10 text-center rounded-xl initial-state"
      >
        <v-avatar size="100" color="deep-purple-lighten-4" class="mb-4">
          <v-icon size="60" color="deep-purple"
            >mdi-text-box-search-outline</v-icon
          >
        </v-avatar>
        <div class="text-h6">Search Your Order History</div>
        <div class="text-body-2 text-grey mt-2">
          Enter your phone number above to view your past orders
        </div>
      </v-sheet>
    </v-container>
    <!-- </v-card> -->
  </v-container>
</template>

<script setup>
import { ref } from "vue";

// State
const searchPhone = ref("");
const searchLoading = ref(false);
const hasSearched = ref(false);
const orderHistory = ref([]);
const emit = defineEmits(["close"]);
// Sample order data (replace with your API)
const sampleOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    phone: "020 5555 1234",
    status: "Delivered",
    shipping: "Lao Post",
    address: "ບ້ານ ດົງໂດກ, ນະຄອນຫຼວງວຽງຈັນ",
    total: 450000,
    items: [
      {
        name: "ຄີມບຳລຸງຜິວໜ້າ",
        quantity: 2,
        price: 150000,
        image: "https://via.placeholder.com/45",
      },
      {
        name: "ເຊລັ່ມວິຕາມິນ C",
        quantity: 1,
        price: 150000,
        image: "https://via.placeholder.com/45",
      },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-20",
    phone: "020 5555 1234",
    status: "Shipping",
    shipping: "Kerry Express",
    address: "ບ້ານ ໂພນຕ້ອງ, ວຽງຈັນ",
    total: 280000,
    items: [
      {
        name: "ຄີມກັນແດດ SPF50",
        quantity: 1,
        price: 180000,
        image: "https://via.placeholder.com/45",
      },
      {
        name: "ໂຟມລ້າງໜ້າ",
        quantity: 1,
        price: 100000,
        image: "https://via.placeholder.com/45",
      },
    ],
  },
];

// Methods
const formatPrice = (price) => {
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return "LAK 0";
  return new Intl.NumberFormat("lo-LA", {
    style: "currency",
    currency: "LAK",
    minimumFractionDigits: 0,
  }).format(num);
};
async function searchHistory() {
  if (!searchPhone.value || searchPhone.value.length < 8) {
    alert("Please enter a valid phone number");
    return;
  }

  searchLoading.value = true;
  hasSearched.value = false;

  await new Promise((r) => setTimeout(r, 1000));

  if (searchPhone.value.includes("020")) {
    orderHistory.value = sampleOrders;
  } else {
    orderHistory.value = [];
  }

  hasSearched.value = true;
  searchLoading.value = false;
}

function clearSearch() {
  searchPhone.value = "";
  hasSearched.value = false;
  orderHistory.value = [];
}

function emitClose() {
  clearSearch();
  emit("close");
}

function getStatusColor(status) {
  return (
    {
      Pending: "warning",
      Confirmed: "info",
      Shipping: "primary",
      Delivered: "success",
      Cancelled: "error",
    }[status] || "grey"
  );
}

function getStatusIcon(status) {
  return (
    {
      Pending: "mdi-clock-outline",
      Confirmed: "mdi-check",
      Shipping: "mdi-truck-delivery",
      Delivered: "mdi-check-circle",
      Cancelled: "mdi-close-circle",
    }[status] || "mdi-help"
  );
}
</script>

<style scoped>
.search-section {
  background: linear-gradient(135deg, #ede7f6 0%, #e8eaf6 100%);
}

.order-history-card {
  transition: all 0.2s ease;
  border-left: 4px solid transparent;
}
</style>
