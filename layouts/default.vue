<template>
  <v-app>
    <!-- APP BAR (desktop only) -->
    <v-app-bar v-if="mdAndUp" height="70" flat elevation="1" class="gradient-app-bar">
      <v-container
        class="d-flex align-center justify-space-between flex-row-reverse flex-md-row"
        fluid
      >
        <!-- GROUP A: Desktop Nav Links (Hidden on Mobile) -->
        <div class="d-none d-md-flex align-center">
          <v-btn text class="mx-2 text-white" to="/">{{ t("home") }}</v-btn>

          <v-btn text class="mx-2 text-white" :to="`/tutorials`">
            <v-icon left color="red-accent-4" class="mr-1" size="30"
              >mdi-youtube</v-icon
            >
            {{ t("tutorials") }}
          </v-btn>

          <v-btn text class="mx-2 text-white" :to="`/support_us`">
            <v-icon left color="pink-lighten-2" class="mr-1" size="30"
              >mdi-hand-heart</v-icon
            >
            {{ t("support") }}
          </v-btn>

          <v-btn text class="mx-2 text-white" :to="`/history`">
            <v-icon left color="yellow-lighten-2" class="mr-1" size="30"
              >mdi-clipboard-text-clock</v-icon
            >
            {{ t("history") }}
          </v-btn>

          <v-btn text class="mx-2 text-white" @click="openDialog('login')">
            <v-icon left color="green-lighten-2" class="mr-1" size="30"
              >mdi-login</v-icon
            >
            {{ t("login") }}
          </v-btn>

          <!-- LANGUAGE SWITCHER -->
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn text class="mx-2 text-white" v-bind="props">
                <span class="mr-1">{{
                  langs.find((l) => l.value === currentLang)?.flag
                }}</span>
                {{ langs.find((l) => l.value === currentLang)?.title }}
                <v-icon right>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="lang in langs"
                :key="lang.value"
                @click="currentLang = lang.value"
                :active="currentLang === lang.value"
              >
                <v-list-item-title>
                  <span class="mr-2">{{ lang.flag }}</span
                  >{{ lang.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-btn class="mx-2 text-white" to="/register_randon">register </v-btn>
        </div>

        <!-- GROUP B: Mobile Menu Icon (Hidden on Desktop) -->
        <v-app-bar-nav-icon
          class="d-md-none text-white"
          @click="drawer = !drawer"
        />

        <!-- GROUP C: THE CART (This will flip sides automatically) -->
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
            <v-icon color="black">mdi-cart-arrow-down</v-icon>
          </v-btn>
        </v-badge>
      </v-container>
    </v-app-bar>

    <!-- ── SIDE DRAWER (compact, right) ─────────────────────────────── -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="right"
      width="260"
      class="drawer-panel"
    >
      <!-- Header -->
      <div class="drawer-header d-flex align-center justify-space-between px-4 py-3">
        <div class="d-flex align-center ga-2">
          <v-icon color="white" size="22">mdi-apps</v-icon>
          <span class="text-subtitle-1 font-weight-bold text-white">Menu</span>
        </div>
        <v-btn icon size="x-small" variant="text" color="white" @click="drawer = false">
          <v-icon size="18">mdi-close</v-icon>
        </v-btn>
      </div>
      <v-divider opacity="0.3" />

      <!-- Nav items -->
      <v-list density="compact" class="py-2 px-2">
        <v-list-item
          v-for="item in drawerItems"
          :key="item.label"
          :to="item.to"
          :active="item.to ? route.path === item.to : false"
          active-color="white"
          rounded="lg"
          class="drawer-item mb-1"
          @click="item.action ? item.action() : (drawer = false)"
        >
          <template v-slot:prepend>
            <v-icon :color="item.iconColor || 'white'" size="20">{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title class="text-white text-body-2 font-weight-medium">
            {{ item.label }}
          </v-list-item-title>
          <template v-if="item.badge && store.cartItems.length > 0" v-slot:append>
            <v-chip size="x-small" color="error" variant="flat">{{ store.cartItems.length }}</v-chip>
          </template>
        </v-list-item>
      </v-list>

      <v-divider opacity="0.3" class="mx-3" />

      <!-- Language picker compact -->
      <div class="px-3 py-2">
        <p class="text-caption text-white opacity-60 mb-2 pl-1">{{ t("language") || "Language" }}</p>
        <v-menu location="bottom start">
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              variant="outlined"
              color="white"
              size="default"
              rounded="lg"
              block
              class="lang-dropdown-btn"
            >
              <v-icon start size="20">mdi-translate</v-icon>
              <span class="mr-1 text-body-1">{{ langs.find(l => l.value === currentLang)?.flag }}</span>
              <span class="text-body-2 font-weight-medium">{{ langs.find(l => l.value === currentLang)?.title }}</span>
              <v-icon end size="20">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list density="compact" rounded="lg" min-width="160">
            <v-list-item
              v-for="lang in langs"
              :key="lang.value"
              :active="currentLang === lang.value"
              active-color="primary"
              @click="currentLang = lang.value; drawer = false"
            >
              <v-list-item-title class="d-flex align-center ga-2">
                <span>{{ lang.flag }}</span>
                <span>{{ lang.title }}</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-navigation-drawer>

    <!-- ── MAIN CONTENT ──────────────────────────────────────────────── -->
    <v-main class="bg-grey-lighten-3">
      <v-container fluid class="pa-0 pa-md-4 main-content">
        <NuxtPage />
      </v-container>
    </v-main>

    <!-- ── MOBILE BOTTOM NAV ─────────────────────────────────────────── -->
    <div class="bottom-nav d-md-none">
      <button class="bottom-nav-item" @click="$router.push('/')">
        <v-icon :color="route.path === '/' ? '#7e57c2' : '#757575'" size="22">mdi-home</v-icon>
        <span :class="route.path === '/' ? 'active-label' : 'nav-label'">{{ t("home") }}</span>
      </button>

      <button class="bottom-nav-item" @click="$router.push('/history')">
        <v-icon :color="route.path === '/history' ? '#7e57c2' : '#757575'" size="22">mdi-clipboard-text-clock</v-icon>
        <span :class="route.path === '/history' ? 'active-label' : 'nav-label'">{{ t("history") }}</span>
      </button>

      <button class="bottom-nav-item bottom-cart-btn" @click="openDialog('cart')">
        <div class="cart-fab">
          <v-icon color="white" size="24">mdi-cart-arrow-down</v-icon>
          <span v-if="store.cartItems.length > 0" class="cart-fab-badge">{{ store.cartItems.length }}</span>
        </div>
      </button>

      <button class="bottom-nav-item" @click="$router.push('/tutorials')">
        <v-icon :color="route.path === '/tutorials' ? '#7e57c2' : '#757575'" size="22">mdi-youtube</v-icon>
        <span :class="route.path === '/tutorials' ? 'active-label' : 'nav-label'">{{ t("tutorials") }}</span>
      </button>

      <button class="bottom-nav-item" @click="drawer = !drawer">
        <v-icon color="#757575" size="22">mdi-menu</v-icon>
        <span class="nav-label">{{ t("menu") || "Menu" }}</span>
      </button>
    </div>

    <v-dialog v-model="loginDialog" max-width="500px" persistent>
      <Login v-model="loginDialog" @login-success="handleLoginSuccess" />
    </v-dialog>

    <!-- CART DIALOG -->
    <v-dialog v-model="cartDialog" max-width="800px" scrollable>
      <v-card>
        <v-card-title
          class="text-h6 bg-primary text-white d-flex align-center justify-space-between"
        >
          <span
            class="text-truncate d-inline-block"
            :style="{
              maxWidth: $vuetify.display.smAndDown ? '350px' : '500px',
            }"
          >
            {{ t("cart") }}
          </span>
          <v-btn icon size="small" variant="text" @click="cartDialog = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider />

        <v-card-text class="pa-0 pa-sm-3">
          <v-data-table
            v-if="store.cartItems && store.cartItems.length > 0"
            :items="store.cartItems"
            :headers="headers"
            hide-default-footer
            class="elevation-0"
          >
            <template v-slot:item.image="{ item }">
              <v-img
                :src="item.image && item.image[0] ? item.image[0] : ''"
                width="50"
                height="50"
                contain
                class="cursor-pointer rounded"
                style="cursor: zoom-in"
                @click="openCartImagePreview(item)"
              />
            </template>

            <template v-slot:item.creamname="{ item }">
              <div class="text-truncate" style="max-width: 150px">
                <strong>{{ item.creamname || item.name }}</strong>
              </div>
            </template>

            <template v-slot:item.unit="{ item }">
              {{ item.unit || "ອັນ" }}
            </template>

            <!-- ✅ FIX: show resolved price per item -->
            <template v-slot:item.price="{ item }">
              <span class="text-no-wrap text-success font-weight-bold">
                {{ formatPrice(getItemPrice(item)) }} KIP
              </span>
            </template>

            <template v-slot:item.quantity="{ item }">
              <div class="d-flex align-center">
                <v-btn
                  icon
                  size="x-small"
                  variant="outlined"
                  @click="decreaseQty(item)"
                >
                  <v-icon size="16">mdi-minus</v-icon>
                </v-btn>
                <span class="px-2 font-weight-bold">{{ item.quantity }}</span>
                <v-btn
                  icon
                  size="x-small"
                  variant="outlined"
                  @click="increaseQty(item)"
                >
                  <v-icon size="16">mdi-plus</v-icon>
                </v-btn>
              </div>
            </template>

            <!-- ✅ FIX: use getItemPrice() instead of item.price directly -->
            <template v-slot:item.total="{ item }">
              <span class="text-no-wrap font-weight-bold text-primary">
                {{ formatPrice(getItemPrice(item) * (item.quantity || 1)) }} KIP
              </span>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn
                icon
                size="small"
                variant="text"
                @click="store.removeFromCart(item.id)"
              >
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>

          <!-- Empty Cart State -->
          <div v-else class="text-center py-10">
            <v-icon size="64" color="grey-lighten-1">mdi-cart-off</v-icon>
            <p class="text-h6 text-grey mt-2">{{ t("cart_empty") }}</p>
            <v-btn color="primary" variant="text" @click="cartDialog = false">
              {{ t("continue_shopping") }}
            </v-btn>
          </div>
        </v-card-text>

        <template v-if="store.cartItems && store.cartItems.length > 0">
          <v-divider />
          <v-card-actions class="pa-4 bg-grey-lighten-4">
            <v-row no-gutters align="center">
              <v-col
                cols="6"
                class="text-subtitle-1 font-weight-bold text-right pr-4"
              >
                {{ t("total") }}:
              </v-col>
              <!-- ✅ FIX: use computedCartTotal instead of store.totalPrice -->
              <v-col
                cols="6"
                class="text-h6 text-end text-success font-weight-black"
              >
                {{ formatPrice(computedCartTotal) }}
                <span class="text-red text-caption ml-1">LAK</span>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-divider />
          <v-card-actions class="pa-4">
            <v-spacer />
            <v-btn
              color="green"
              block
              size="large"
              variant="elevated"
              @click="openCheckout"
            >
              {{ t("checkout") }} <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </template>
      </v-card>
    </v-dialog>

    <!-- Cart Image Preview Dialog -->
    <v-dialog
      v-model="cartImageDialog"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card rounded="xl" color="grey-darken-4" class="overflow-hidden">
        <div class="d-flex align-center justify-space-between pa-3">
          <div class="d-flex align-center ga-2 min-width-0">
            <v-icon color="white" size="18">mdi-image</v-icon>
            <span class="text-white text-body-2 font-weight-bold text-truncate">
              {{ cartPreviewItem?.creamname || cartPreviewItem?.name || "" }}
            </span>
          </div>
          <div class="d-flex align-center ga-2 flex-shrink-0">
            <v-chip
              v-if="cartPreviewItem?.image?.length > 1"
              color="grey-darken-2"
              variant="flat"
              size="small"
              class="text-white"
            >
              {{ cartPreviewSlide + 1 }} / {{ cartPreviewItem.image.length }}
            </v-chip>
            <v-btn
              icon
              size="small"
              variant="text"
              color="white"
              @click="cartImageDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>

        <template v-if="cartPreviewItem?.image?.length === 1">
          <v-img
            :src="cartPreviewItem.image[0]"
            max-height="420"
            contain
            class="bg-grey-darken-4"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="white" size="40" />
              </v-row>
            </template>
          </v-img>
        </template>

        <template v-else-if="cartPreviewItem?.image?.length > 1">
          <v-carousel
            v-model="cartPreviewSlide"
            height="380"
            hide-delimiters
            show-arrows
            class="gallery-carousel"
          >
            <template v-slot:prev="{ props }">
              <v-btn
                v-bind="props"
                icon
                size="large"
                elevation="4"
                class="gallery-nav-btn"
              >
                <v-icon size="26" color="grey-darken-3"
                  >mdi-chevron-left</v-icon
                >
              </v-btn>
            </template>
            <template v-slot:next="{ props }">
              <v-btn
                v-bind="props"
                icon
                size="large"
                elevation="4"
                class="gallery-nav-btn"
              >
                <v-icon size="26" color="grey-darken-3"
                  >mdi-chevron-right</v-icon
                >
              </v-btn>
            </template>
            <v-carousel-item
              v-for="(img, i) in cartPreviewItem.image"
              :key="`cp-${i}`"
            >
              <v-img :src="img" height="380" contain class="bg-grey-darken-4">
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="white"
                      size="40"
                    />
                  </v-row>
                </template>
              </v-img>
            </v-carousel-item>
          </v-carousel>
          <div class="thumbnail-strip pa-3 d-flex ga-2 justify-center">
            <div
              v-for="(img, i) in cartPreviewItem.image"
              :key="`cpt-${i}`"
              class="thumbnail-wrapper"
              :class="{ 'thumbnail-active': cartPreviewSlide === i }"
              @click="cartPreviewSlide = i"
            >
              <v-img
                :src="img"
                width="56"
                height="56"
                cover
                class="rounded-lg"
                style="cursor: pointer"
              />
            </div>
          </div>
        </template>
      </v-card>
    </v-dialog>

    <!-- CHECKOUT DIALOG -->
    <v-dialog v-model="checkoutDialog" max-width="600px" persistent>
      <v-card class="checkout-card">
        <v-card-title
          class="text-h5 bg-gradient text-white d-flex align-center justify-space-between pa-6"
        >
          <div class="d-flex align-center min-width-0">
            <v-icon size="32" class="mr-3 flex-shrink-0"
              >mdi-clipboard-check-outline</v-icon
            >
            <span
              class="text-truncate d-inline-block"
              :style="{
                maxWidth: $vuetify.display.smAndDown ? '120px' : '300px',
              }"
            >
              {{ t("checkout") }}
            </span>
          </div>
          <v-btn
            icon
            size="small"
            variant="text"
            @click="closeCheckoutDialog"
            class="flex-shrink-0"
          >
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
                    :label="t('shipping_company')"
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
                    :label="t('delivery_address')"
                    :placeholder="t('delivery_address_placeholder')"
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
                    :label="t('your_name')"
                    :placeholder="t('your_name_placeholder')"
                    variant="outlined"
                    prepend-inner-icon="mdi-account"
                    color="primary"
                    density="comfortable"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="checkoutData.phoneNumber"
                    :label="t('phone_number')"
                    :placeholder="t('phone_placeholder')"
                    :rules="[rules.required, rules.phone, rules.startWith20]"
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
                    :label="t('notes')"
                    :placeholder="t('notes_placeholder')"
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
              >
                {{ t("cancel") }}
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
                {{ t("confirm_order") }}
              </v-btn>
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
        :total-price="computedCartTotal"
        :qr="store.cartItems?.[0]?.qr"
        :cart-count="store.cartItems.length"
        @close="handleCloseWhatsAppDialog"
      />
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from "vue";
import { useDisplay } from "vuetify";
import { useRouter, useRoute } from "vue-router";

definePageMeta({
  middleware: "guest",
  requiresGuest: true,
});

// ============ COMPOSABLES ============
const store = useProductSellStore();
const router = useRouter();
const route = useRoute();
const { currentLang, t, langs } = useLanguage();
const { mdAndUp } = useDisplay();

// ============ UI STATE ============
const drawer = ref(false);

// ============ DRAWER ITEMS ============
const drawerItems = computed(() => [
  { label: t("home"),      icon: "mdi-home",                  to: "/",           iconColor: "white" },
  { label: t("tutorials"), icon: "mdi-youtube",               to: "/tutorials",  iconColor: "#FF5252" },
  { label: t("support"),   icon: "mdi-hand-heart",            to: "/support_us", iconColor: "#F48FB1" },
  { label: t("history"),   icon: "mdi-clipboard-text-clock",  to: "/history",    iconColor: "#FFD740" },
  { label: t("login"),     icon: "mdi-login",                 action: () => { openDialog("login"); drawer.value = false; }, iconColor: "#69F0AE" },
  { label: "Register",     icon: "mdi-account-plus",          to: "/register_randon", iconColor: "#80D8FF" },
  { label: t("cart"),      icon: "mdi-cart-arrow-down",       action: () => { openDialog("cart");  drawer.value = false; }, iconColor: "white", badge: true },
]);

// ============ DIALOG STATES ============
const cartDialog = ref(false);
const handLoveDialog = ref(false);
const videoDialog = ref(false);
const historyDialog = ref(false);
const checkoutDialog = ref(false);
const whatsappDialog = ref(false);
const loginDialog = ref(false);

// ============ CART IMAGE PREVIEW ============
const cartImageDialog = ref(false);
const cartPreviewItem = ref(null);
const cartPreviewSlide = ref(0);

const openCartImagePreview = (item) => {
  cartPreviewItem.value = item;
  cartPreviewSlide.value = 0;
  cartImageDialog.value = true;
};

// ========close Login Dialog on successful login========

const handleLoginSuccess = () => {
  console.log("User logged in successfully!");
  // Any additional logic after login
};
// ============ PRICE HELPERS ============
// ✅ Strip currency text/commas → plain number
// e.g. "40,000kip" → 40000  |  40000 → 40000  |  null → 0
const toNum = (val) => {
  if (val === null || val === undefined || val === "") return 0;
  const cleaned = String(val).replace(/[^0-9.]/g, "");
  const n = Number(cleaned);
  return isNaN(n) ? 0 : n;
};

// ✅ Price priority: price3 → price2 → price → price1
// Handles strings like "40,000kip" or plain numbers
const getItemPrice = (item) => {
  if (toNum(item.price3) > 0) return toNum(item.price3);
  if (toNum(item.price2) > 0) return toNum(item.price2);
  if (toNum(item.price) > 0) return toNum(item.price);
  if (toNum(item.price1) > 0) return toNum(item.price1);
  return 0;
};

// ✅ Format number with commas (no KIP suffix — added inline in template)
const formatPrice = (val) => {
  const n = toNum(val);
  if (n === 0) return "0";
  return n.toLocaleString();
};

// ============ CART COMPUTED ============
const cartGroup = computed(() => {
  const groups = {};
  store.cartItems.forEach((item) => {
    const key = item.tel;
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });
  return groups;
});

const totalItems = computed(() =>
  store.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)
);

// ✅ FIX: compute total directly from cart items using getItemPrice()
// Never rely on store.totalPrice (which may use wrong field)
const computedCartTotal = computed(() => {
  return store.cartItems.reduce((sum, item) => {
    return sum + getItemPrice(item) * (item.quantity || 1);
  }, 0);
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
  startWith20: (value) => value?.startsWith("20") || "Must start with 20",
};

const headers = [
  { title: "Image", value: "image", width: 70 },
  { title: "Product", value: "creamname" },
  { title: "Price", value: "price" },
  { title: "Unit", value: "unit" },
  { title: "Quantity", value: "quantity" },
  { title: "Total", value: "total" },
  { title: "Action", value: "actions", width: 70 },
];

// ============ LIFECYCLE ============
onMounted(() => {
  if (router.currentRoute.value.path === "/") router.push("/");
});

// ============ DIALOG HANDLER ============
function openDialog(type) {
  const lower = type.toLowerCase();
  if (lower === "hand_love") handLoveDialog.value = true;
  else if (lower === "linkedin")
    window.open("https://www.linkedin.com", "_blank");
  else if (lower === "cart") cartDialog.value = true;
  else if (lower === "youtube") videoDialog.value = true;
  else if (lower === "history") {
    historyDialog.value = true;
    clearSearch();
  } else if (lower === "login") loginDialog.value = true;
}

function clearSearch() {
  searchPhone.value = "";
  hasSearched.value = false;
  orderHistory.value = [];
}

// ============ CART ACTIONS ============
const increaseQty = (product) =>
  store.updateCart({ ...product, quantity: (product.quantity || 0) + 1 });

const decreaseQty = (product) => {
  if (product.quantity > 1)
    store.updateCart({ ...product, quantity: product.quantity - 1 });
  else store.removeFromCart(product.id);
};

// ============ CHECKOUT ACTIONS ============
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
</script>

<style scoped>
/* ── App bar ─────────────────────────────────────────────────────────── */
.gradient-app-bar {
  background: linear-gradient(to right, #42a5f5, #7e57c2);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* ── Side drawer ─────────────────────────────────────────────────────── */
.drawer-panel {
  background: linear-gradient(160deg, #5c35b1 0%, #3949ab 100%) !important;
}
.drawer-header {
  background: rgba(0,0,0,0.15);
  min-height: 52px;
}
.drawer-item {
  color: rgba(255,255,255,0.9) !important;
}
.drawer-item:hover {
  background: rgba(255,255,255,0.12) !important;
}
.drawer-item.v-list-item--active {
  background: rgba(255,255,255,0.2) !important;
}
.lang-dropdown-btn {
  border-color: rgba(255,255,255,0.4) !important;
  text-transform: none !important;
}

/* ── Bottom navigation bar ───────────────────────────────────────────── */
.bottom-nav {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: 58px;
  background: #fff;
  border-top: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100;
  box-shadow: 0 -2px 12px rgba(0,0,0,0.08);
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
.bottom-nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 0;
  position: relative;
}
.nav-label {
  font-size: 10px;
  color: #757575;
  font-weight: 500;
}
.active-label {
  font-size: 10px;
  color: #7e57c2;
  font-weight: 700;
}

/* FAB cart button (center) */
.bottom-cart-btn { position: relative; }
.cart-fab {
  width: 46px; height: 46px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7e57c2, #42a5f5);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 12px rgba(126,87,194,0.4);
  margin-top: -14px;
}
.cart-fab-badge {
  position: absolute; top: -4px; right: 8px;
  background: #f44336; color: #fff;
  font-size: 10px; font-weight: 700;
  min-width: 16px; height: 16px;
  border-radius: 8px; padding: 0 4px;
  display: flex; align-items: center; justify-content: center;
}

/* Push page content above bottom nav on mobile */
.main-content {
  padding-bottom: 0;
}
@media (max-width: 959px) {
  .main-content { padding-bottom: 70px !important; }
}

/* ── Misc ────────────────────────────────────────────────────────────── */
.bg-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}
.checkout-card { border-radius: 16px; overflow: hidden; }
.confirm-btn {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%) !important;
  box-shadow: 0 4px 12px rgba(76,175,80,0.3);
}
.rounded-circle { border-radius: 50%; }
.min-width-0 { min-width: 0; }
</style>
