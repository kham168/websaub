<template>
  <v-app>
    <!-- APP BAR -->
    <v-app-bar height="70" flat elevation="1" class="px-4 gradient-app-bar">
      <v-container class="d-flex align-center justify-space-between" fluid>
        <div class="d-flex align-center">
          <v-app-bar-nav-icon
            class="d-sm-flex d-md-none text-white"
            @click="drawer = !drawer"
          ></v-app-bar-nav-icon>
          <div class="d-none d-md-flex align-center">
            <v-btn text class="mx-2 text-white" to="/homepage">Home</v-btn>
            <v-btn text class="mx-2 text-white" @click="openDialog('youtube')">
              <v-icon left color="red-accent-4" size="30">mdi-youtube</v-icon>
              Tutorials
            </v-btn>
            <v-btn
              text
              class="mx-2 text-white"
              @click="openDialog('hand_love')"
            >
              <v-icon left color="pink-lighten-2" size="30"
                >mdi-hand-heart</v-icon
              >
              Support Us
            </v-btn>
            <v-btn text class="mx-2 text-white" @click="openDialog('linkedin')">
              <v-icon left color="blue-darken-3" size="30">mdi-linkedin</v-icon>
              Connect
            </v-btn>
            <v-btn text class="mx-2 text-white" @click="openDialog('login')">
              <v-icon left color="green-lighten-2" size="30">mdi-login</v-icon>
              Login
            </v-btn>

            <!-- OR using router directly in template -->
            <!-- <v-btn text class="mx-2 text-white" @click="/pages/chue/sell_Product.vue">
              <v-icon left color="green-lighten-2" size="30">mdi-login</v-icon>
              CH CHANNEL
            </v-btn> -->
            <v-btn text class="mx-2 text-white" :to="'/chue/sell_Product'">
              <v-icon left color="green-lighten-2" size="30">mdi-login</v-icon>
              CH CHANNEL
            </v-btn>
          </div>
        </div>
        <v-badge
          v-if="store.cartItems && store.cartItems.length > 0"
          :content="store.cartItems.length"
          color="error"
          location="top right"
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
        <v-btn
          v-else
          icon
          variant="text"
          size="small"
          class="rounded-circle bg-grey-lighten-3"
          @click.stop="openDialog('cart')"
        >
          <v-icon>mdi-cart-arrow-down</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- NAVIGATION DRAWER -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="left"
      class="gradient-drawer"
    >
      <v-list density="comfortable" class="py-0">
        <v-list-item class="pa-4 bg-deep-purple-darken-3">
          <v-list-item-title class="text-h6 font-weight-bold text-white"
            >Menu</v-list-item-title
          >
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          prepend-icon="mdi-home"
          title="Home"
          to="/homepage"
          @click="drawer = false"
          class="text-white"
        ></v-list-item>
        <v-list-item
          @click="
            openDialog('youtube');
            drawer = false;
          "
          class="text-white"
        >
          <template v-slot:prepend>
            <v-icon color="red-accent-4">mdi-youtube</v-icon>
          </template>
          <v-list-item-title>Tutorials</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="
            openDialog('hand_love');
            drawer = false;
          "
          class="text-white"
        >
          <template v-slot:prepend>
            <v-icon color="pink-lighten-2">mdi-hand-heart</v-icon>
          </template>
          <v-list-item-title>Support Us</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="
            openDialog('login');
            drawer = false;
          "
          class="text-white"
        >
          <template v-slot:prepend>
            <v-icon color="green-lighten-2">mdi-login</v-icon>
          </template>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
        <v-divider class="my-2"></v-divider>
        <v-list-item
          @click="
            openDialog('cart');
            drawer = false;
          "
          class="text-white"
        >
          <template v-slot:prepend>
            <v-badge
              v-if="store.cartItems && store.cartItems.length > 0"
              :content="store.cartItems.length"
              color="error"
              overlap
            >
              <v-icon>mdi-cart-arrow-down</v-icon>
            </v-badge>
            <v-icon v-else>mdi-cart-arrow-down</v-icon>
          </template>
          <v-list-item-title>Cart</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="
            openDialog('history');
            drawer = false;
          "
          class="text-white"
        >
          <template v-slot:prepend>
            <v-icon color="amber">mdi-clipboard-text-clock</v-icon>
          </template>
          <v-list-item-title>Order History</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- =========== MAIN CONTENT========== -->
    <v-main class="bg-grey-lighten-3">
      <v-container fluid class="pa-4">
        <NuxtPage />
      </v-container>
    </v-main>

    <!-- FOOTER -->
    <v-footer
      color="deep-purple-darken-2"
      class="d-flex justify-center align-center py-6"
      app
    >
      <v-sheet color="transparent" class="d-flex ga-3 flex-wrap justify-center">
        <v-btn
          v-for="(item, index) in icons"
          :key="index"
          :class="{
            'elevation-8': item.name === 'cart' && store.cartCount > 0,
          }"
          variant="tonal"
          color="white"
          size="large"
          rounded="xl"
          class="d-flex flex-column ga-1 px-6"
          @click="openDialog(item.name)"
        >
          <template v-if="item.name === 'cart'">
            <v-badge
              v-if="store.cartCount > 0"
              :content="store.cartCount"
              color="error"
              overlap
            >
              <v-icon size="28">{{ item.icon }}</v-icon>
            </v-badge>
            <v-icon v-else size="28">{{ item.icon }}</v-icon>
          </template>
          <template v-else>
            <v-icon size="28">{{ item.icon }}</v-icon>
          </template>
          <span class="text-caption font-weight-medium text-uppercase">{{
            item.label
          }}</span>
        </v-btn>
      </v-sheet>
    </v-footer>
    <!-- =================== LOGIN/REGISTER DIALOG =================== -->
    <v-dialog v-model="loginDialog" max-width="500px">
      <Login />
    </v-dialog>

    <!-- =================== TUTORIALS DIALOG =================== -->
    <v-dialog v-model="videoDialog" max-width="950px" scrollable>
      <v-card rounded="xl" elevation="24">
        <v-card-title
          class="bg-red-darken-2 text-white d-flex align-center py-5 px-6"
        >
          <v-icon class="mr-3" size="32">mdi-youtube</v-icon>
          <span class="text-h6 font-weight-bold">Video Tutorials</span>
          <v-spacer></v-spacer>
          <v-btn icon size="small" variant="text" @click="videoDialog = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-6">
          <v-expand-transition>
            <v-sheet
              v-if="currentVideo"
              class="mb-6 rounded-lg overflow-hidden"
              elevation="4"
            >
              <div class="bg-grey-darken-3 pa-3 d-flex align-center">
                <v-icon color="red" class="mr-2">mdi-youtube</v-icon>
                <span class="text-white font-weight-medium">{{
                  currentVideo.title
                }}</span>
                <v-spacer></v-spacer>
                <v-btn
                  icon
                  size="small"
                  variant="text"
                  @click="currentVideo = null"
                >
                  <v-icon color="white">mdi-close</v-icon>
                </v-btn>
              </div>
              <v-responsive :aspect-ratio="16 / 9">
                <iframe
                  width="100%"
                  height="100%"
                  :src="`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1`"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </v-responsive>
            </v-sheet>
          </v-expand-transition>
          <v-row>
            <v-col
              v-for="(video, idx) in videos"
              :key="idx"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card
                class="video-card"
                elevation="3"
                rounded="lg"
                @click="playVideo(video)"
              >
                <div class="video-thumbnail">
                  <v-img
                    :src="video.thumbnail"
                    height="160"
                    cover
                    class="rounded-t-lg"
                  >
                    <div
                      class="play-overlay d-flex align-center justify-center fill-height"
                    >
                      <v-btn
                        icon
                        size="x-large"
                        color="red"
                        variant="flat"
                        class="play-btn"
                      >
                        <v-icon size="40">mdi-play</v-icon>
                      </v-btn>
                    </div>
                  </v-img>
                </div>
                <v-card-text class="pa-3">
                  <div class="text-subtitle-2 font-weight-bold text-truncate">
                    {{ video.title }}
                  </div>
                  <div class="text-caption text-grey mt-1">
                    <v-icon size="x-small" class="mr-1"
                      >mdi-clock-outline</v-icon
                    >
                    {{ video.duration }}
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- ============================ SUPPORT US DIALOG====================== -->

    <v-dialog v-model="handLoveDialog" max-width="850px" scrollable>
      <v-card rounded="xl" elevation="24">
        <v-card-title
          class="bg-deep-purple-darken-2 text-white d-flex align-center py-5 px-6"
        >
          <v-icon class="mr-3" size="32">mdi-gift</v-icon>
          <span class="text-h6 font-weight-bold"> Donation Projects</span>
          <v-spacer></v-spacer>
          <v-btn
            icon
            size="small"
            variant="text"
            @click="handLoveDialog = false"
          >
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <Handlove />
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- ==============================HISTORY DIALOG ====================== -->
    <v-dialog v-model="historyDialog" max-width="850px" scrollable>
      <v-card rounded="xl" elevation="24">
        <v-card-title
          class="bg-deep-purple-darken-2 text-white d-flex align-center py-5 px-6"
        >
          <v-icon class="mr-3" size="32">mdi-clipboard-text-clock</v-icon>
          <span class="text-h6 font-weight-bold">Order History</span>
          <v-spacer></v-spacer>
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

    <!-- ================================== CART DIALOG ====================== -->
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
        <v-divider></v-divider>
        <v-card-text>
          <!-- {{ store.cartItems }} -->
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
              <div>
                <strong>{{ item.creamname || item.name }}</strong>
              </div>
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
        <v-divider></v-divider>
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
        <v-divider></v-divider>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
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

    <!-- ===============================  DIALOG Input INFORMATION ====================== -->
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
                  ></v-select>
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
                  ></v-textarea>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="checkoutData.custName"
                    label="please enter your name *"
                    placeholder="yuour name"
                    variant="outlined"
                    prepend-inner-icon="mdi-account"
                    color="primary"
                    type="custName"
                    density="comfortable"
                  ></v-text-field>
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
                  ></v-text-field>
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
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
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
    <!-- ================================== WHATSAPP DIALOG ================================== -->
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
import { ref, nextTick, onMounted } from "vue";
import { useRouter } from "vue-router";

definePageMeta({
  middleware: "guest",
  requiresGuest: true,
});

const store = useProductSellStore();
const drawer = ref(false);
const router = useRouter();

// Dialog States
const cartDialog = ref(false);
const handLoveDialog = ref(false);
const videoDialog = ref(false);
const historyDialog = ref(false);
const checkoutDialog = ref(false);
const whatsappDialog = ref(false);

// WhatsApp Configuration

// group of cart items
const cartGroup = computed(() => {
  const groups = {};
  store.cartItems.forEach((item) => {
    const key = item.tel;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  });
  return groups;
});
const handleCloseWhatsAppDialog = () => {
  console.log("🔵 Parent: Closing WhatsApp dialog");
  whatsappDialog.value = false;
};
// Video Tutorial Data
const videos = ref([
  {
    title: "ວິທີການສັ່ງຊື້ສິນຄ້າ",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
    duration: "3:45",
  },
  {
    title: "ວິທີການຈ່າຍເງິນ",
    youtubeId: "5NV6Rdv1a3I",
    thumbnail: "https://img.youtube.com/vi/5NV6Rdv1a3I/0.jpg",
    duration: "5:20",
  },
  {
    title: "ວິທີການຕິດຕາມສິນຄ້າ",
    youtubeId: "3JZ_D3ELwOQ",
    thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/0.jpg",
    duration: "4:15",
  },
]);
const currentVideo = ref(null);

// History Search Data
const searchPhone = ref("");
const hasSearched = ref(false);
const orderHistory = ref([]);

// Footer icons
const icons = [
  { name: "youtube", icon: "mdi-youtube", label: "Tutorials" },
  { name: "hand_love", icon: "mdi-hand-heart", label: "Support" },
  { name: "history", icon: "mdi-clipboard-text-clock", label: "History" },
];

// Checkout form
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
  required: (value) => !!value || "Phone number is required",
  phone: (value) => {
    const phoneRegex = /^[0-9\s]+$/;
    return phoneRegex.test(value) || "Phone number must contain only numbers";
  },
  startWith020: (value) => {
    return value.startsWith("020") || "Phone number must start with 020";
  },
};

const headers = [
  { text: "Image", value: "image", width: 70 },
  { text: "Product", value: "creamname" },
  { text: "price", value: "price" },
  { text: "Unit", value: "unit" },
  { text: "Quantity", value: "quantity" },
  { text: "Total", value: "total" },
  { text: "Action", value: "actions", width: 70 },
];

onMounted(() => {
  if (router.currentRoute.value.path === "/") router.push("/homepage");
});

// Open Dialog Handler
function openDialog(type) {
  const lower = type.toLowerCase();
  if (lower === "hand_love") handLoveDialog.value = true;
  else if (lower === "linkedin")
    window.open("https://www.linkedin.com", "_blank");
  else if (lower === "cart") cartDialog.value = true;
  else if (lower === "youtube") {
    videoDialog.value = true;
    currentVideo.value = null;
  } else if (lower === "history") {
    historyDialog.value = true;
    clearSearch();
  } else if (lower === "login") loginDialog.value = true;
  else if (lower === "ai") aiDialog.value = true;
}

// Video Methods
function playVideo(video) {
  currentVideo.value = video;
  this.$nextTick(() => {
    const dialogContent = this.$el.querySelector(".v-card-text");
    dialogContent.scrollTop = 0;
  });
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

// login
// Login/Register Methods
const loginDialog = ref(false);
</script>

<style scoped>
/* App Bar & Drawer */
.gradient-app-bar {
  background: linear-gradient(to right, #42a5f5, #7e57c2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.gradient-drawer {
  background: linear-gradient(to bottom, #7e57c2, #5e35b1);
}
.gradient-drawer .v-list-item {
  transition: background-color 0.3s ease;
}
.gradient-drawer .v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.video-thumbnail {
  position: relative;
  overflow: hidden;
}
.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Checkout & WhatsApp Styles */
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
.confirm-btn:hover {
  box-shadow: 0 6px 16px rgba(76, 175, 80, 0.4);
  transform: translateY(-2px);
}

/* General */
.rounded-circle {
  border-radius: 50%;
}
.elevation-8 {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
</style>
