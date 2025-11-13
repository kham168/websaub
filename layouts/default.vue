<template>
  <v-app>
    <!-- APP BAR with Vuetify Styling -->
    <v-app-bar height="70" flat elevation="1" class="px-4 gradient-app-bar">
      <v-container class="d-flex align-center justify-space-between" fluid>
        <div class="d-flex align-center">
          <!-- Menu Button for Small Screens -->
          <v-app-bar-nav-icon
            class="d-sm-flex d-md-none text-white"
            @click="drawer = !drawer"
          ></v-app-bar-nav-icon>

          <!-- Logo/Home Icon -->
          <v-icon class="d-none d-md-flex"></v-icon>

          <!-- Desktop Navigation Links (hidden on small screens) -->
          <div class="d-none d-md-flex align-center">
            <v-btn text class="mx-2 text-white" to="/homepage">Home</v-btn>
            <v-btn text class="mx-2 text-white">
              <v-icon left color="red-accent-4" size="30">mdi-youtube</v-icon>
              Tutorials
            </v-btn>
            <v-btn text class="mx-2 text-white">
              <v-icon left color="pink-lighten-2" size="30"
                >mdi-hand-heart</v-icon
              >
              Support Us
            </v-btn>
            <v-btn text class="mx-2 text-white">
              <v-icon left color="blue-darken-3" size="30">mdi-linkedin</v-icon>
              Connect
            </v-btn>
          </div>
        </div>
        <!-- Cart Button with Badge -->

        <v-badge
          v-if="store.cartItems.length > 0"
          :content="store.cartItems.length"
          color="error"
          location="top right"
          class=""
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

        <!-- No badge -->
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

    <!-- NAVIGATION DRAWER for Small Screens -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="left"
      class="gradient-drawer"
    >
      <v-list density="comfortable" class="py-0">
        <!-- Drawer Header -->
        <v-list-item class="pa-4 bg-deep-purple-darken-3">
          <v-list-item-title class="text-h6 font-weight-bold text-white">
            Menu
          </v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <!-- Navigation Items -->
        <v-list-item
          prepend-icon="mdi-home"
          title="Home"
          value="home"
          to="/homepage"
          @click="drawer = false"
          class="text-white"
        ></v-list-item>

        <v-list-item
          value="tutorials"
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
          value="support"
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
          value="connect"
          @click="
            openDialog('linkedin');
            drawer = false;
          "
          class="text-white"
        >
          <template v-slot:prepend>
            <v-icon color="blue-darken-3">mdi-linkedin</v-icon>
          </template>
          <v-list-item-title>Connect</v-list-item-title>
        </v-list-item>

        <v-divider class="my-2"></v-divider>

        <!-- Cart and History in Drawer -->
        <v-list-item
          value="cart"
          @click="
            openDialog('cart');
            drawer = false;
          "
          class="text-white"
        >
          <template v-slot:prepend>
            <v-badge
              v-if="cartStore.dataCart.length !== 0"
              :content="cartStore.dataCart.length"
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
          prepend-icon="mdi-clipboard-text"
          title="History"
          value="history"
          @click="
            openDialog('history');
            drawer = false;
          "
          class="text-white"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- MAIN CONTENT -->
    <v-main class="bg-grey-lighten-3">
      <v-container fluid class="pa-4">
        <NuxtPage />
        <div class="center-toast">
          <Toaster richColors expand />
        </div>
      </v-container>
    </v-main>

    <!-- FOOTER with Vuetify Classes -->
    <v-footer
      color="deep-purple-darken-2"
      class="d-flex justify-center align-center py-6"
      app
    >
      <v-dialog v-model="dialog" max-width="800px" scrollable>
        <template v-slot:activator="{ props: activatorProps }">
          <v-sheet
            color="transparent"
            class="d-flex ga-3 flex-wrap justify-center"
          >
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
              v-bind="
                item.name === 'cart' || item.name === 'history'
                  ? activatorProps
                  : {}
              "
              @click="openDialog(item.name)"
            >
              <template v-if="item.name === 'cart'">
                <v-badge
                  v-if="store.cartCount !== 0"
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
        </template>

        <v-card>
          <v-card-title class="text-h6">Your Cart</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-data-table
              v-if="store.cartItems.length > 0"
              :items="store.cartItems"
              :headers="headers"
              hide-default-footer
              class="elevation-1"
            >
              <!-- Image column -->
              <template v-slot:item.image="{ item }">
                <v-img :src="item.image[0]" width="60" height="60" contain />
              </template>

              <!-- Product name -->
              <template v-slot:item.creamname="{ item }">
                <div>
                  <strong>{{ item.creamname || item.name }}</strong>
                </div>
              </template>

              <!-- Detail -->

              <!-- Unit Select -->
              <template v-slot:item.unit="{ item }">
                {{ item.unit || "ອັນ" }}
              </template>

              <!-- Quantity column -->
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

              <!-- Total column -->
              <template v-slot:item.total="{ item }">
                {{
                  formatPrice(
                    (item.Price3 || item.price || item.Price1) * item.quantity
                  )
                }}
              </template>

              <!-- Action column -->
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

            <!-- Empty cart -->
            <div v-else class="text-center py-10">
              <v-icon size="48">mdi-cart-off</v-icon>
              <p class="text-subtitle-1 mt-2">Your cart is empty.</p>
            </div>
          </v-card-text>

          <v-col>
            <v-row>
              <v-col cols="5" class="text-right">Total:</v-col>
              <v-col cols="5" class="text-right">
                {{ formatPrice(store.totalPrice) }}</v-col
              >
              <v-col cols="2"></v-col>
            </v-row>
          </v-col>
          <v-divider></v-divider>

          <!-- <v-card-actions> -->

          <div>
            <v-col class="d-flex justify-end" cols="12">
              <v-btn
                color="green"
                :disabled="store.cartCount === 0"
                @click="checkoutDialog = true"
              >
                Next
              </v-btn></v-col
            >
            <!-- Checkout Dialog -->
            <v-dialog v-model="checkoutDialog" max-width="600px" persistent>
              <v-card>
                <v-card-title class="text-h5 bg-green text-white">
                  <span>Checkout Information</span>
                  <v-spacer></v-spacer>
                  <v-btn icon dark @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>

                <v-card-text class="pt-6">
                  <v-form ref="checkoutForm" v-model="formValid">
                    <v-container>
                      <v-row>
                        <!-- Shipping Company Field -->
                        <v-col cols="12">
                          <v-select
                            v-model="checkoutData.shippingCompany"
                            :items="shippingCompanies"
                            label="Shipping Company *"
                            :rules="[rules.required]"
                            outlined
                            prepend-inner-icon="mdi-truck"
                          ></v-select>
                        </v-col>
                        <!-- Address Field -->
                        <v-col cols="12">
                          <v-textarea
                            v-model="checkoutData.address"
                            label="Delivery Address *"
                            placeholder="Enter your full delivery address"
                            :rules="[rules.required]"
                            outlined
                            rows="3"
                            prepend-inner-icon="mdi-map-marker"
                          ></v-textarea>
                        </v-col>

                        <!-- Phone Number Field -->
                        <v-col cols="12">
                          <v-text-field
                            v-model="checkoutData.phoneNumber"
                            label="Phone Number *"
                            placeholder="020 XXXX XXXX"
                            :rules="[rules.required, rules.phone]"
                            outlined
                            prepend-inner-icon="mdi-phone"
                            type="tel"
                          ></v-text-field>
                        </v-col>

                        <!-- Shipping Branch Field -->
                        <!-- <v-col cols="12">
                          <v-select
                            v-model="checkoutData.shippingBranch"
                            :items="shippingBranches"
                            label="Shipping Branch *"
                            :rules="[rules.required]"
                            outlined
                            prepend-inner-icon="mdi-store"
                            :disabled="!checkoutData.shippingCompany"
                            placeholder="Select shipping company first"
                          ></v-select>
                        </v-col> -->

                        <!-- Optional Notes -->
                        <v-col cols="12">
                          <v-textarea
                            v-model="checkoutData.notes"
                            label="Additional Notes (Optional)"
                            placeholder="Any special delivery instructions?"
                            outlined
                            rows="2"
                            prepend-inner-icon="mdi-note-text"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions class="pa-4">
                  <v-spacer></v-spacer>
                  <v-btn color="grey" text @click="closeDialog"> Cancel </v-btn>
                  <v-btn
                    color="green"
                    :disabled="!formValid"
                    @click="submitCheckout"
                  >
                    Confirm Order
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <!-- </v-card-actions> -->
        </v-card>
      </v-dialog>
      <!-- ✅ Separate dialog for HandLove.vue -->
      <v-dialog v-model="handLoveDialog" max-width="800px">
        <v-card rounded="xl" elevation="24">
          <v-card-title
            class="bg-deep-purple-darken-2 text-white d-flex align-center py-5 px-6"
          >
            <v-icon class="mr-2" color="pink-lighten-2">mdi-hand-heart</v-icon>
            <span class="text-h6 font-weight-bold">Support Us</span>
          </v-card-title>
          <v-divider></v-divider>
          <HandLove />
        </v-card>
      </v-dialog>

      <!-- ✅ Separate dialog just for playing video -->
      <v-dialog v-model="videoDialog" max-width="1000px">
        <v-card rounded="xl" elevation="24">
          <v-card-title
            class="bg-deep-purple-darken-2 text-white d-flex justify-space-between align-center py-5 px-6"
          >
            <span class="text-h6 font-weight-bold">{{
              currentVideo?.title
            }}</span>
            <v-btn
              icon="mdi-close"
              variant="text"
              color="white"
              @click="videoDialog = false"
            ></v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-responsive :aspect-ratio="16 / 9">
              <iframe
                v-if="currentVideo"
                width="100%"
                height="100%"
                :src="`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1`"
                :title="currentVideo.title"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </v-responsive>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDataCart } from "@/stores";
import HandLove from "@/components/Handlove.vue";
const store = useProductSellStore();

const selectedDialogType = ref("");
const dialog = ref(false);
const handLoveDialog = ref(false);
const drawer = ref(false);
const cartStore = useDataCart();
const router = useRouter();
const loading = ref(false);

// Redirect to homepage on mount if not already there
onMounted(() => {
  if (router.currentRoute.value.path === "/") {
    router.push("/");
  }
});
const icons = [
  { name: "youtube", icon: "mdi-youtube", label: "Tutorials" },
  { name: "hand_love", icon: "mdi-hand-heart", label: "Support" },
  { name: "history", icon: "mdi-clipboard-text", label: "History" },
];

function openDialog(type) {
  const lower = type.toLowerCase();
  selectedDialogType.value = lower;

  if (lower === "hand_love") {
    handLoveDialog.value = true;
    return;
  }

  if (lower === "linkedin") {
    window.open("https://www.linkedin.com", "_blank");
    return;
  }

  dialog.value = true;
}

const videos = ref([
  {
    title: "qhia txog yuav khoom",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
  },
  {
    title: "qhia txog tshev so",
    youtubeId: "5NV6Rdv1a3I",
    thumbnail: "https://img.youtube.com/vi/5NV6Rdv1a3I/0.jpg",
  },
  {
    title: "qhia txog hu tsheb (Cong tsheb)",
    youtubeId: "3JZ_D3ELwOQ",
    thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/0.jpg",
  },
  {
    title: "Tutorial 4",
    youtubeId: "3JZ_D3ELwOQ",
    thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/0.jpg",
  },
  {
    title: "Tutorial 5",
    youtubeId: "3JZ_D3ELwOQ",
    thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/0.jpg",
  },
]);

const videoDialog = ref(false);
const currentVideo = ref(null);

async function onClick() {
  await nextTick();
  if (!searchQuery.value) return;
  loading.value = true;
  router
    .push({
      path: "/form_query",
      query: { q: searchQuery.value },
    })
    .finally(() => {
      loading.value = false;
    });
}

// Format price
const formatPrice = (price) => {
  const num = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("lo-LA", {
    style: "currency",
    currency: "LAK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};
// const totalPrice = computed(() => {
//   return store.cartItems.reduce((sum, item) => {
//     const price = item.Price3 || item.price || item.Price1 || 0;
//     const qty = item.quantity || 0;
//     return sum + price * qty;
//   }, 0);
// });

// Increase quantity
const increaseQty = (product) => {
  store.updateCart({ ...product, quantity: (product.quantity || 0) + 1 });
};

// Decrease quantity
const decreaseQty = (product) => {
  if (product.quantity > 1) {
    store.updateCart({ ...product, quantity: product.quantity - 1 });
  } else {
    store.removeFromCart(product.id);
  }
};

// Checkout action
// const checkout = () => {
//   alert("Checkout clicked! Total: " + formatPrice(store.totalPrice));
// };

const headers = [
  { text: "Image", value: "image", width: 70 },
  { text: "Product", value: "creamname" },
  { text: "Price", value: "Price3" },
  { text: "Unit", value: "unit" },
  { text: "Quantity", value: "quantity" },
  { text: "Total", value: "total" },
  { text: "Action", value: "actions", width: 70 },
];

// Checkout dialog and form
const props = defineProps({
  store: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["checkout-confirmed"]);

const checkoutDialog = ref(false);
const formValid = ref(false);
const checkoutForm = ref(null);

const checkoutData = ref({
  address: "",
  phoneNumber: "",
  shippingCompany: null,
  shippingBranch: null,
  notes: "",
});

const shippingCompanies = [
  "Lao Post",
  "DHL Laos",
  "Kerry Express",
  "Flash Express",
  "Ninja Van",
];

const rules = {
  required: (value) => !!value || "This field is required",
  phone: (value) => {
    const pattern = /^[0-9]{8,15}$/;
    return pattern.test(value?.replace(/\s/g, "")) || "Invalid phone number";
  },
};

const shippingBranches = computed(() => {
  if (!checkoutData.value.shippingCompany) return [];

  // Example branches based on selected company
  const branches = {
    "Lao Post": [
      "Main Branch",
      "Vientiane Center",
      "Thadeua Branch",
      "Dongdok Branch",
    ],
    "DHL Laos": ["City Center", "Airport Branch", "Thadeua Branch"],
    "Kerry Express": [
      "Central Branch",
      "Dongpaina Branch",
      "Sikhottabong Branch",
    ],
    "Flash Express": ["Main Hub", "North Branch", "South Branch"],
    "Ninja Van": ["Vientiane Hub", "Thadeua Point", "Dongdok Point"],
  };

  return branches[checkoutData.value.shippingCompany] || [];
});

const openCheckoutDialog = () => {
  checkoutDialog.value = true;
};

const closeDialog = () => {
  checkoutDialog.value = false;
  resetForm();
};

const resetForm = () => {
  checkoutData.value = {
    address: "",
    phoneNumber: "",
    shippingCompany: null,
    shippingBranch: null,
    notes: "",
  };
  if (checkoutForm.value) {
    checkoutForm.value.reset();
  }
};

const submitCheckout = () => {
  if (formValid.value) {
    // Handle checkout submission
    console.log("Checkout Data:", checkoutData.value);

    // Emit event with checkout data
    emit("checkout-confirmed", checkoutData.value);

    // Show success message
    // You can use Vuetify snackbar or your notification system
    alert("Order confirmed! We will contact you soon.");

    // Close dialog and clean all fields after successful submission
    closeDialog();
  }
};
</script>

<style scoped>
.video-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.video-card:hover {
  transform: translateY(-8px);
}

.video-thumbnail {
  position: relative;
}

.video-thumbnail :deep(.v-img__img) {
  transition: transform 0.3s ease;
}

.video-card:hover .video-thumbnail :deep(.v-img__img) {
  transform: scale(1.1);
}

.play-overlay {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-card:hover .play-overlay {
  opacity: 1 !important;
}

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

/*  design cart  */
.hover-elevate {
  transition: all 0.2s ease;
}

.hover-elevate:hover {
  background: linear-gradient(to right, #7e57c2, #42a5f5);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.rounded-circle {
  border-radius: 50%;
}
/* design cart */
.bg-green {
  background-color: #4caf50 !important;
}
</style>
