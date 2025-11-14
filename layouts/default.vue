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
          </div>
        </div>

        <!-- Cart Button with Badge -->
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
      <!-- Footer Buttons -->
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

    <!-- Cart Dialog -->
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
          <v-data-table
            v-if="store.cartItems && store.cartItems.length > 0"
            :items="store.cartItems"
            :headers="headers"
            hide-default-footer
            class="elevation-1"
          >
            <!-- Image column -->
            <template v-slot:item.image="{ item }">
              <v-img
                :src="item.image && item.image[0] ? item.image[0] : ''"
                width="60"
                height="60"
                contain
              />
            </template>

            <!-- Product name -->
            <template v-slot:item.creamname="{ item }">
              <div>
                <strong>{{ item.creamname || item.name }}</strong>
              </div>
            </template>

            <!-- Unit -->
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

        <v-divider></v-divider>

        <v-card-actions class="pa-4">
          <v-row>
            <v-col cols="6" class="text-h6 text-right"> Total: </v-col>
            <v-col cols="6" class="text-h6 text-center text-success">
              {{ formatPrice(store.totalPrice || 0) }}
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
            Next
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Checkout Dialog -->
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
                <!-- Shipping Company Field -->
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

                <!-- Address Field -->
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

                <!-- Phone Number Field -->
                <v-col cols="12">
                  <v-text-field
                    v-model="checkoutData.phoneNumber"
                    label="Phone Number *"
                    placeholder="020 XXXX XXXX"
                    :rules="[rules.required, rules.phone]"
                    variant="outlined"
                    prepend-inner-icon="mdi-phone"
                    color="primary"
                    type="tel"
                    density="comfortable"
                  ></v-text-field>
                </v-col>

                <!-- Optional Notes -->
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
              >
                Cancel
              </v-btn>
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
              >
                Confirm Order
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- WhatsApp Confirmation Dialog -->
    <v-dialog v-model="whatsappDialog" max-width="900px" persistent scrollable>
      <v-card class="whatsapp-dialog">
        <v-card-title class="text-h5 d-flex align-center pa-6 bg-success">
          <v-icon color="white" size="40" class="mr-3">mdi-whatsapp</v-icon>
          <span class="text-white">Send Order to WhatsApp</span>
          <v-spacer></v-spacer>
          <v-btn icon size="small" variant="text" @click="skipWhatsApp">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="px-4 py-6" style="max-height: 600px">
          <div class="text-body-1 mb-4 text-center">
            Review your order details before sending to WhatsApp.
          </div>

          <!-- Customer Info Summary -->
          <v-sheet
            class="pa-4 mb-4 bg-blue-grey-lighten-5 rounded"
            elevation="1"
          >
            <div
              class="text-subtitle-2 mb-3 font-weight-bold d-flex align-center"
            >
              <v-icon color="primary" class="mr-2">mdi-account-circle</v-icon>
              Customer Information
            </div>
            <v-row dense>
              <v-col cols="12" sm="4">
                <div class="text-caption text-grey-darken-2">Phone Number</div>
                <div class="text-body-2 font-weight-medium">
                  {{ checkoutData.phoneNumber }}
                </div>
              </v-col>
              <v-col cols="12" sm="4">
                <div class="text-caption text-grey-darken-2">
                  Shipping Company
                </div>
                <div class="text-body-2 font-weight-medium">
                  {{ checkoutData.shippingCompany }}
                </div>
              </v-col>
              <v-col cols="12" sm="4">
                <div class="text-caption text-grey-darken-2">
                  Delivery Address
                </div>
                <div class="text-body-2 font-weight-medium">
                  {{ checkoutData.address }}
                </div>
              </v-col>
              <v-col v-if="checkoutData.notes" cols="12">
                <v-divider class="my-2"></v-divider>
                <div class="text-caption text-grey-darken-2">Notes</div>
                <div class="text-body-2 font-weight-medium">
                  {{ checkoutData.notes }}
                </div>
              </v-col>
            </v-row>
          </v-sheet>

          <!-- Order Summary -->
          <div class="mb-4">
            <v-sheet class="pa-4 bg-grey-lighten-4 rounded" elevation="2">
              <!-- Order Header -->
              <div
                class="text-subtitle-1 mb-3 font-weight-bold d-flex align-center justify-space-between bg-primary pa-3 rounded"
              >
                <span class="text-white">
                  <v-icon color="white" class="mr-2">mdi-receipt</v-icon>
                  Your Order
                </span>
                <span class="text-white">
                  <v-icon color="white" class="mr-1"
                    >mdi-package-variant</v-icon
                  >
                  {{ store.cartItems?.length || 0 }} items
                </span>
              </div>

              <v-divider class="mb-3"></v-divider>

              <!-- Product Cards -->
              <div class="products-list">
                <v-card
                  v-for="(item, itemIndex) in store.cartItems || []"
                  :key="itemIndex"
                  class="mb-3 product-preview-card"
                  elevation="1"
                >
                  <div class="d-flex pa-3">
                    <!-- Product Image -->
                    <v-img
                      :src="item.image && item.image[0] ? item.image[0] : ''"
                      width="70"
                      height="70"
                      cover
                      class="rounded flex-shrink-0"
                    >
                      <template v-slot:placeholder>
                        <div
                          class="d-flex align-center justify-center fill-height"
                        >
                          <v-progress-circular
                            indeterminate
                            color="primary"
                            size="20"
                          ></v-progress-circular>
                        </div>
                      </template>
                    </v-img>

                    <!-- Product Details -->
                    <div class="ml-3 flex-grow-1">
                      <div class="text-subtitle-2 font-weight-bold mb-1">
                        {{ item.creamname || item.name }}
                      </div>
                      <div
                        v-if="item.channel"
                        class="text-caption text-grey-darken-1 mb-1"
                      >
                        <v-icon size="x-small">mdi-storefront</v-icon>
                        {{ item.channel }}
                      </div>
                      <div
                        v-if="item.detail"
                        class="text-caption text-grey-darken-1 mb-2"
                      >
                        {{ item.detail }}
                      </div>
                      <div class="d-flex align-center justify-space-between">
                        <div class="text-body-2">
                          <span class="text-grey-darken-2">Price:</span>
                          <span class="font-weight-bold ml-1">
                            {{
                              formatPrice(
                                item.Price3 || item.price || item.Price1
                              )
                            }}
                          </span>
                        </div>
                        <v-chip size="small" color="primary" variant="flat">
                          Qty: {{ item.quantity }} {{ item.unit || "ອັນ" }}
                        </v-chip>
                      </div>
                      <div class="text-right mt-1">
                        <span class="text-caption text-grey-darken-2"
                          >Subtotal:</span
                        >
                        <span
                          class="text-body-2 font-weight-bold text-primary ml-1"
                        >
                          {{
                            formatPrice(
                              (item.Price3 || item.price || item.Price1) *
                                item.quantity
                            )
                          }}
                        </span>
                      </div>
                    </div>
                  </div>
                </v-card>
              </div>

              <!-- Order Total -->
              <v-divider class="my-3"></v-divider>
              <div
                class="d-flex justify-space-between align-center bg-success-lighten pa-3 rounded"
              >
                <span class="text-h6 font-weight-bold">Order Total:</span>
                <span class="text-h6 font-weight-bold text-success">
                  {{ formatPrice(store.totalPrice || 0) }}
                </span>
              </div>
            </v-sheet>
          </div>

          <!-- Grand Total -->
          <v-sheet class="pa-4 bg-deep-purple-lighten-5 rounded" elevation="3">
            <div class="d-flex justify-space-between align-center">
              <div>
                <div class="text-h6 font-weight-bold">Grand Total</div>
                <div class="text-caption text-grey-darken-1">
                  {{ store.cartCount || 0 }} total items
                </div>
              </div>
              <span class="text-h5 font-weight-bold text-deep-purple">
                {{ formatPrice(store.totalPrice || 0) }}
              </span>
            </div>
          </v-sheet>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="pa-6">
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-btn
                color="grey-darken-1"
                variant="outlined"
                @click="skipWhatsApp"
                block
                size="x-large"
                prepend-icon="mdi-close-circle"
              >
                No, Cancel
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn
                color="success"
                variant="flat"
                @click="sendToWhatsApp"
                block
                size="x-large"
                prepend-icon="mdi-whatsapp"
                class="whatsapp-btn"
              >
                Yes, Send Order to WhatsApp
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- HandLove Dialog -->
    <v-dialog v-model="handLoveDialog" max-width="800px">
      <v-card rounded="xl" elevation="24">
        <v-card-title
          class="bg-deep-purple-darken-2 text-white d-flex align-center py-5 px-6"
        >
          <v-icon class="mr-2" color="pink-lighten-2">mdi-hand-heart</v-icon>
          <span class="text-h6 font-weight-bold">Support Us</span>
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
        <v-divider></v-divider>
        <v-card-text class="pa-6">
          <HandLove />
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Video Dialog -->
    <v-dialog v-model="videoDialog" max-width="1000px">
      <v-card rounded="xl" elevation="24">
        <v-card-title
          class="bg-deep-purple-darken-2 text-white d-flex justify-space-between align-center py-5 px-6"
        >
          <span class="text-h6 font-weight-bold">{{
            currentVideo?.title
          }}</span>
          <v-btn icon variant="text" color="white" @click="videoDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
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
  </v-app>
</template>

<script setup>
import { ref, nextTick, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useDataCart } from "@/stores";
import HandLove from "@/components/Handlove.vue";

const store = useProductSellStore();
const cartDialog = ref(false);
const handLoveDialog = ref(false);
const drawer = ref(false);
const cartStore = useDataCart();
const router = useRouter();
const loading = ref(false);

// WhatsApp Configuration - CHANGE THIS TO YOUR WHATSAPP NUMBER
const whatsappNumber = ref("8562078298242"); // Format: country code + number (no + or spaces)

// Redirect to homepage on mount if not already there
onMounted(() => {
  if (router.currentRoute.value.path === "/") {
    router.push("/homepage");
  }
});

const icons = [
  { name: "youtube", icon: "mdi-youtube", label: "Tutorials" },
  { name: "hand_love", icon: "mdi-hand-heart", label: "Support" },
  { name: "history", icon: "mdi-clipboard-text", label: "History" },
];

function openDialog(type) {
  const lower = type.toLowerCase();

  if (lower === "hand_love") {
    handLoveDialog.value = true;
    return;
  }

  if (lower === "linkedin") {
    window.open("https://www.linkedin.com", "_blank");
    return;
  }

  if (lower === "cart") {
    cartDialog.value = true;
    return;
  }

  if (lower === "youtube") {
    videoDialog.value = true;
    if (videos.value.length > 0) {
      currentVideo.value = videos.value[0];
    }
    return;
  }

  if (lower === "history") {
    console.log("Opening history...");
    return;
  }
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
  if (isNaN(num)) return "LAK 0";
  return new Intl.NumberFormat("lo-LA", {
    style: "currency",
    currency: "LAK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

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
const checkoutDialog = ref(false);
const whatsappDialog = ref(false);
const formValid = ref(false);
const checkoutForm = ref(null);

const checkoutData = ref({
  address: "",
  phoneNumber: "",
  shippingCompany: null,
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
  };
  if (checkoutForm.value) {
    checkoutForm.value.reset();
  }
};

const submitCheckout = () => {
  if (formValid.value) {
    console.log("✅ Checkout form is valid, opening WhatsApp dialog...");
    console.log("📦 Cart items:", store.cartItems);
    console.log("💰 Total price:", store.totalPrice);

    // Close checkout dialog
    checkoutDialog.value = false;

    // Use nextTick to ensure the checkout dialog closes before opening WhatsApp dialog
    nextTick(() => {
      whatsappDialog.value = true;
      console.log("📱 WhatsApp dialog opened:", whatsappDialog.value);
    });
  } else {
    console.log("❌ Form is not valid");
  }
};

// Format cart items for WhatsApp message
const formatCartForWhatsApp = () => {
  let message = `*🛒 New Order Request*\n\n`;

  // Customer Information
  message += `*📋 Customer Details:*\n`;
  message += `Phone: ${checkoutData.value.phoneNumber}\n`;
  message += `Address: ${checkoutData.value.address}\n`;
  message += `Shipping: ${checkoutData.value.shippingCompany}\n`;
  if (checkoutData.value.notes) {
    message += `Notes: ${checkoutData.value.notes}\n`;
  }
  message += `\n`;

  // Cart Items
  message += `*🛍️ Order Items:*\n`;
  message += `━━━━━━━━━━━━━━━━\n`;

  let total = 0;
  store.cartItems.forEach((item, index) => {
    const price = parseFloat(item.Price3 || item.price || item.Price1 || 0);
    const quantity = item.quantity || 1;
    const itemTotal = price * quantity;
    total += itemTotal;

    message += `\n${index + 1}. *${
      item.creamname || item.name || "Product"
    }*\n`;
    if (item.channel) {
      message += `   Brand: ${item.channel}\n`;
    }
    message += `   Price: LAK ${price.toLocaleString()}\n`;
    message += `   Qty: ${quantity} ${item.unit || "ອັນ"}\n`;
    message += `   Subtotal: LAK ${itemTotal.toLocaleString()}\n`;
  });

  message += `\n━━━━━━━━━━━━━━━━\n`;
  message += `*💰 Total Amount: LAK ${total.toLocaleString()}*\n\n`;
  message += `_Please confirm this order. Thank you!_ 🙏`;

  return encodeURIComponent(message);
};

const sendToWhatsApp = () => {
  const message = formatCartForWhatsApp();
  const whatsappUrl = `https://wa.me/${whatsappNumber.value}?text=${message}`;

  console.log("📱 Sending to WhatsApp:", whatsappUrl);

  // Open WhatsApp in new tab
  window.open(whatsappUrl, "_blank");

  // Close all dialogs
  whatsappDialog.value = false;
  cartDialog.value = false;

  // Optional: Clear cart after successful order
  // Uncomment the line below if you want to clear the cart
  // store.clearCart();

  // Show success message
  console.log("✅ Order sent to WhatsApp successfully!");

  // Reset form
  resetForm();
};
const skipWhatsApp = () => {
  // Just close the dialog if user doesn't want to use WhatsApp
  whatsappDialog.value = false;
  cartDialog.value = false;

  // Optional: You can still process the order through your regular system here
  console.log("❌ Order cancelled");

  // Reset form
  resetForm();
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

.bg-green {
  background-color: #4caf50 !important;
}

/* Gradient background for checkout */
.bg-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}

/* Checkout Card Styling */
.checkout-card {
  border-radius: 16px;
  overflow: hidden;
}

.checkout-card .v-card-actions {
  background: linear-gradient(to bottom, #fafafa, #f5f5f5);
}

.confirm-btn {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%) !important;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  transition: all 0.3s ease;
}

.confirm-btn:hover {
  box-shadow: 0 6px 16px rgba(76, 175, 80, 0.4);
  transform: translateY(-2px);
}

.confirm-btn:disabled {
  background: grey !important;
  box-shadow: none;
}

/* Form field styling */
.v-text-field--outlined,
.v-textarea--outlined,
.v-select--outlined {
  border-radius: 8px;
}

/* WhatsApp Dialog Styling */
.whatsapp-dialog {
  border-radius: 12px;
  overflow: hidden;
}

.text-white {
  color: white !important;
}

.v-card-actions .v-btn {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.whatsapp-btn {
  background-color: #25d366 !important;
  color: white !important;
}

.whatsapp-btn:hover {
  background-color: #20ba5a !important;
}

.v-sheet {
  border: 1px solid #e0e0e0;
}

.text-body-2 > div {
  padding: 4px 0;
}

/* Product Preview Cards */
.products-list {
  max-height: 300px;
  overflow-y: auto;
  padding-right: 4px;
}

.products-list::-webkit-scrollbar {
  width: 6px;
}

.products-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.products-list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.products-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.product-preview-card {
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.product-preview-card:hover {
  border-left-color: #25d366;
  box-shadow: 0 2px 8px rgba(37, 211, 102, 0.2) !important;
}

.bg-success {
  background-color: #25d366 !important;
}

.bg-success-lighten {
  background-color: #e8f5e9 !important;
}

.center-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.v-dialog > .v-overlay__content {
  animation: fadeIn 0.3s ease-out;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .products-list {
    max-height: 250px;
  }

  .whatsapp-dialog .v-card-text {
    padding: 16px 8px !important;
  }
}

/* Loading states */
.v-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Form styling */
.v-text-field,
.v-textarea,
.v-select {
  margin-bottom: 8px;
}

/* Badge styling */
.v-badge__badge {
  font-weight: bold;
  font-size: 11px;
}

/* Card hover effects */
.v-card {
  transition: all 0.3s ease;
}

.v-card:hover {
  transform: translateY(-2px);
}

/* Success color variations */
.text-success {
  color: #4caf50 !important;
}

/* Primary color variations */
.bg-primary {
  background-color: #42a5f5 !important;
}

/* Footer button styling */
.v-footer .v-btn {
  transition: all 0.3s ease;
}

.v-footer .v-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Table styling */
.v-data-table {
  border-radius: 8px;
  overflow: hidden;
}

/* Dialog overlay */
.v-overlay {
  backdrop-filter: blur(2px);
}

/* Icon animations */
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.elevation-8 {
  animation: pulse 2s infinite;
}
</style>
