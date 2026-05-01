<template>
  <v-app>
    <!-- APP BAR -->
    <v-app-bar height="50" flat elevation="1" class="px-2 gradient-app-bar">
      <v-container class="d-flex align-center" fluid>
        <div class="d-none d-md-flex align-center flex-grow-1">
          <v-btn text class="mx-2 text-white" to="/">Home</v-btn>
          <v-btn text class="mx-2 text-white" to="/tutorials">
            <v-icon left color="red-accent-4" size="30">mdi-youtube</v-icon>
            Tutorials
          </v-btn>
          <v-btn text class="mx-2 text-white" to="/support_us">
            <v-icon left color="pink-lighten-2" size="30"
              >mdi-hand-heart</v-icon
            >
            Support Us
          </v-btn>
          <v-btn text class="mx-2 text-white" @click="openDialog('login')">
            <v-icon left color="green-lighten-2" size="30">mdi-login</v-icon>
            Login
          </v-btn>

          <v-badge
            v-if="store.cartItems && store.cartItems.length > 0"
            :content="store.cartItems.length"
            color="error"
          >
            <v-btn
              icon
              variant="text"
              size="small"
              class="rounded-circle bg-grey-lighten-3"
              @click.stop="openDialog('cart')"
            >
              <v-icon>mdi-cart-arrow-down</v-icon>
            </v-btn>
          </v-badge>
        </div>

        <v-spacer class="d-flex d-md-none" />

        <div class="d-flex d-md-none align-center">
          <v-btn
            icon
            size="small"
            class="mr-2 text-white"
            @click.stop="openDialog('cart')"
          >
            <v-icon>mdi-cart-arrow-down</v-icon>
          </v-btn>

          <v-app-bar-nav-icon class="text-white" @click="drawer = !drawer" />
        </div>
      </v-container>
    </v-app-bar>

    <!-- NAVIGATION DRAWER -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="left"
      class="gradient-drawer"
      width="200"
    >
      <v-list density="comfortable" class="py-0">
        <v-list-item class="pa-2 bg-deep-purple-darken-3">
          <div class="d-flex align-center justify-space-between w-100">
            <v-list-item-title class="text-h6 font-weight-bold text-white">
              Menu
            </v-list-item-title>

            <v-btn
              icon="mdi-close"
              variant="text"
              color="white"
              size="small"
              @click="drawer = false"
            ></v-btn>
          </div>
        </v-list-item>
        <v-divider />

        <v-list-item to="/homepage" @click="drawer = false" class="text-white">
          <template v-slot:prepend>
            <div style="min-width: 32px">
              <v-icon icon="mdi-home" />
            </div>
          </template>

          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-divider color="white" />
        <v-list-item to="/tutorials" @click="drawer = false" class="text-white">
          <template v-slot:prepend>
            <div style="min-width: 32px">
              <v-icon color="red-accent-4" icon="mdi-youtube" />
            </div>
          </template>
          <v-list-item-title>Tutorials</v-list-item-title>
        </v-list-item>
        <v-divider color="white" />
        <v-list-item
          to="/support_us"
          @click="drawer = false"
          class="text-white"
        >
          <template v-slot:prepend>
            <div style="min-width: 32px">
              <v-icon color="pink-lighten-2" icon="mdi-hand-heart" />
            </div>
          </template>
          <v-list-item-title>Support Us</v-list-item-title>
        </v-list-item>
        <v-divider color="white" />
        <v-list-item
          @click="
            openDialog('login');
            drawer = false;
          "
          class="text-white"
        >
          <template v-slot:prepend>
            <div style="min-width: 32px">
              <v-icon color="green-lighten-2" icon="mdi-login" />
            </div>
          </template>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
        <v-divider color="white" />
        <v-list-item
          @click="
            openDialog('cart');
            drawer = false;
          "
          class="text-white"
        >
          <template v-slot:prepend>
            <div style="min-width: 32px" class="d-flex align-center">
              <v-badge
                v-if="store.cartItems && store.cartItems.length > 0"
                :content="store.cartItems.length"
                color="error"
                offset-x="3"
                offset-y="3"
              >
                <v-icon size="22">mdi-cart-arrow-down</v-icon>
              </v-badge>
              <v-icon v-else size="22">mdi-cart-arrow-down</v-icon>
            </div>
          </template>
          <v-list-item-title>Cart</v-list-item-title>
        </v-list-item>
        <v-divider color="white" />
        <v-list-item
          @click="
            openDialog('history');
            drawer = false;
          "
          class="text-white"
        >
          <template v-slot:prepend>
            <div style="min-width: 32px">
              <v-icon color="amber" icon="mdi-clipboard-text-clock" />
            </div>
          </template>
          <v-list-item-title>History</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- MAIN CONTENT -->
    <v-main class="bg-grey-lighten-3">
      <v-container fluid class="pa-4">
        <NuxtPage />
      </v-container>
    </v-main>

    <!-- =================== LOGIN DIALOG =================== -->
    <v-dialog v-model="loginDialog" max-width="500px">
      <Login />
    </v-dialog>
    <!-- HISTORY DIALOG -->
    <v-dialog v-model="historyDialog" max-width="850px" scrollable>
      <v-card rounded="xl" elevation="24">
        <v-card-title
          class="bg-deep-purple-darken-2 text-white d-flex align-center py-5 px-6"
        >
          <v-icon class="mr-3" size="32">mdi-clipboard-text-clock</v-icon>
          <span class="text-h6 font-weight-bold">Order History</span>
          <v-spacer />
          <v-btn
            icon
            size="small"
            variant="text"
            @click="historyDialog = false"
          >
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <DialogHistory />
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- CART DIALOG -->
    <v-dialog v-model="cartDialog" max-width="800px" scrollable>
      <v-card>
        <v-card-title
          class="text-h6 bg-primary text-white d-flex align-center justify-space-between"
        >
          <span>Your Cart</span>
          <v-btn icon size="small" variant="text" @click="cartDialog = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-data-table
            v-if="store.cartItems && store.cartItems.length > 0"
            :items="store.cartItems"
            :headers="headers"
            hide-default-footer
            class="elevation-1"
          >
            <template v-slot:item.image="{ item }">
              <v-img
                :src="item.image && item.image[0] ? item.image[0] : ''"
                width="60"
                height="60"
                contain
              />
            </template>
            <template v-slot:item.creamname="{ item }">
              <strong>{{ item.creamname || item.name }}</strong>
            </template>
            <template v-slot:item.unit="{ item }">{{
              item.unit || "ອັນ"
            }}</template>
            <template v-slot:item.quantity="{ item }">
              <div class="d-flex align-center">
                <v-btn
                  icon
                  size="small"
                  elevation="0"
                  @click="decreaseQty(item)"
                >
                  <v-icon small>mdi-minus</v-icon>
                </v-btn>
                <span class="px-2">{{ item.quantity }}</span>
                <v-btn
                  icon
                  size="small"
                  elevation="0"
                  @click="increaseQty(item)"
                >
                  <v-icon small>mdi-plus</v-icon>
                </v-btn>
              </div>
            </template>
            <template v-slot:item.total="{ item }">
              {{ formatPrice(item.price * item.quantity) }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
                icon
                size="small"
                elevation="0"
                @click="store.removeFromCart(item.id)"
              >
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
          <div v-else class="text-center py-10">
            <v-icon size="48">mdi-cart-off</v-icon>
            <p class="text-subtitle-1 mt-2">Your cart is empty.</p>
          </div>
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-4">
          <v-row>
            <v-col cols="7" class="text-h6 text-right">Total:</v-col>
            <v-col cols="3" class="text-h6 text-end text-success">
              {{ formatPrice(store.totalPrice || 0) }}
            </v-col>
            <v-col cols="2" class="text-h6 text-success">
              <span class="text-red ml-1">LAK</span>
            </v-col>
          </v-row>
        </v-card-actions>
        <v-divider />
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn
            color="green"
            size="large"
            variant="elevated"
            :disabled="!store.cartItems || store.cartItems.length === 0"
            @click="openCheckout"
          >
            Next <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- CHECKOUT DIALOG -->
    <v-dialog v-model="checkoutDialog" max-width="600px" persistent>
      <v-card class="checkout-card">
        <v-card-title
          class="text-h5 bg-gradient text-white d-flex align-center justify-space-between pa-6"
        >
          <div class="d-flex align-center">
            <v-icon size="32" class="mr-3">mdi-clipboard-check-outline</v-icon>
            <span>Checkout Information</span>
          </div>
          <v-btn icon size="small" variant="text" @click="closeCheckoutDialog">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pt-8 pb-4 px-6">
          <v-form ref="checkoutForm" v-model="formValid">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="checkoutData.shippingCompany"
                    :items="shippingCompanies"
                    label="Shipping Company *"
                    :rules="[rules.required]"
                    variant="outlined"
                    prepend-inner-icon="mdi-truck-delivery"
                    color="primary"
                    density="comfortable"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="checkoutData.address"
                    label="Delivery Address *"
                    placeholder="Enter your full delivery address"
                    :rules="[rules.required]"
                    variant="outlined"
                    rows="3"
                    prepend-inner-icon="mdi-map-marker"
                    color="primary"
                    density="comfortable"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="checkoutData.custName"
                    label="Please enter your name *"
                    placeholder="Your name"
                    variant="outlined"
                    prepend-inner-icon="mdi-account"
                    color="primary"
                    density="comfortable"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="checkoutData.phoneNumber"
                    label="Phone Number *"
                    placeholder="020 XXXX XXXX"
                    :rules="[rules.required, rules.phone, rules.startWith020]"
                    variant="outlined"
                    prepend-inner-icon="mdi-phone"
                    color="primary"
                    type="tel"
                    density="comfortable"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="checkoutData.notes"
                    label="Additional Notes (Optional)"
                    placeholder="Any special delivery instructions?"
                    variant="outlined"
                    rows="2"
                    prepend-inner-icon="mdi-note-text"
                    color="primary"
                    density="comfortable"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-6 bg-grey-lighten-5">
          <v-row dense>
            <v-col cols="12" sm="6" class="mb-2 mb-sm-0">
              <v-btn
                color="white"
                variant="outlined"
                size="x-large"
                block
                @click="closeCheckoutDialog"
                prepend-icon="mdi-arrow-left"
                class="text-none bg-red-darken-1"
                >Cancel</v-btn
              >
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn
                color="green"
                variant="flat"
                size="x-large"
                block
                :disabled="!formValid"
                @click="submitCheckout"
                append-icon="mdi-check-circle"
                class="text-none confirm-btn"
                >Confirm Order</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- WHATSAPP DIALOG -->
    <v-dialog
      v-model="whatsappDialog"
      max-width="900px"
      persistent
      scrollable
      :retain-focus="false"
    >
      <DialogWhatsApp
        :checkout-data="checkoutData"
        :cart-group="cartGroup"
        :total-items="totalItems"
        :total-price="store.totalPrice"
        :qr="store.cartItems?.q"
        :cart-count="store.cartItems.length"
        @close="handleCloseWhatsAppDialog"
      />
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useGuidelineVideo } from "@/composables/useGuidelineVideo";

definePageMeta({
  middleware: "guest",
  requiresGuest: true,
});

const store = useProductSellStore();
const drawer = ref(false);
const router = useRouter();

// ============ GUIDELINE VIDEO ============
const {
  guidelineVideos,
  videoLoading,
  videoError,
  currentVideo,
  playerLoading, // ← add
  playerError, // ← add
  fetchGuidelineVideos,
  getEmbedUrl,
  getYoutubeUrl,
  extractYoutubeId,
  playVideo,
  onPlayerLoaded, // ← add
  onPlayerError, // ← add
} = useGuidelineVideo();

// ============ DIALOG STATES ============
const cartDialog = ref(false);
const handLoveDialog = ref(false);
const videoDialog = ref(false);
const historyDialog = ref(false);
const checkoutDialog = ref(false);
const whatsappDialog = ref(false);
const loginDialog = ref(false);

// ============ CART ============
const cartGroup = computed(() => {
  const groups = {};
  store.cartItems.forEach((item) => {
    const key = item.tel;
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });
  return groups;
});

const handleCloseWhatsAppDialog = () => {
  whatsappDialog.value = false;
};

// ============ SEARCH ============
const searchPhone = ref("");
const hasSearched = ref(false);
const orderHistory = ref([]);

// ============ CHECKOUT ============
const formValid = ref(false);
const checkoutForm = ref(null);
const checkoutData = ref({
  address: "",
  phoneNumber: "",
  shippingCompany: null,
  notes: "",
  custName: "",
});
const shippingCompanies = [
  "Lao Post",
  "DHL Laos",
  "Kerry Express",
  "Flash Express",
  "Ninja Van",
];
const rules = {
  required: (value) => !!value || "Required",
  phone: (value) => /^[0-9\s]+$/.test(value) || "Numbers only",
  startWith020: (value) => value?.startsWith("020") || "Must start with 020",
};
const headers = [
  { text: "Image", value: "image", width: 70 },
  { text: "Product", value: "creamname" },
  { text: "Price", value: "price" },
  { text: "Unit", value: "unit" },
  { text: "Quantity", value: "quantity" },
  { text: "Total", value: "total" },
  { text: "Action", value: "actions", width: 70 },
];

// ============ LIFECYCLE ============
onMounted(() => {
  if (router.currentRoute.value.path === "/") router.push("/homepage");
});

// ============ DIALOG HANDLER ============
function openDialog(type) {
  const lower = type.toLowerCase();
  if (lower === "hand_love") handLoveDialog.value = true;
  else if (lower === "linkedin")
    window.open("https://www.linkedin.com", "_blank");
  else if (lower === "cart") cartDialog.value = true;
  else if (lower === "youtube") {
    currentVideo.value = null; // reset player on open
    videoDialog.value = true;
    fetchGuidelineVideos();
  } else if (lower === "history") {
    historyDialog.value = true;
    clearSearch();
  } else if (lower === "login") loginDialog.value = true;
}

function clearSearch() {
  searchPhone.value = "";
  hasSearched.value = false;
  orderHistory.value = [];
}

const increaseQty = (product) =>
  store.updateCart({ ...product, quantity: (product.quantity || 0) + 1 });

const decreaseQty = (product) => {
  if (product.quantity > 1)
    store.updateCart({ ...product, quantity: product.quantity - 1 });
  else store.removeFromCart(product.id);
};

const openCheckout = () => {
  cartDialog.value = false;
  checkoutDialog.value = true;
};

const closeCheckoutDialog = () => {
  checkoutDialog.value = false;
  resetForm();
};

const resetForm = () => {
  checkoutData.value = {
    address: "",
    phoneNumber: "",
    shippingCompany: null,
    notes: "",
    custName: "",
  };
  checkoutForm.value?.reset();
};

const submitCheckout = () => {
  if (formValid.value) {
    checkoutDialog.value = false;
    nextTick(() => {
      whatsappDialog.value = true;
    });
  }
};

const formatPrice = (price) => Number(price || 0).toLocaleString();
</script>

<style scoped>
.gradient-app-bar {
  background: linear-gradient(to right, #42a5f5, #7e57c2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.gradient-drawer {
  background: linear-gradient(to bottom, #7e57c2, #5e35b1);
}
.gradient-drawer .v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.bg-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}
.checkout-card {
  border-radius: 16px;
  overflow: hidden;
}
.confirm-btn {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%) !important;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}
.rounded-circle {
  border-radius: 50%;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
