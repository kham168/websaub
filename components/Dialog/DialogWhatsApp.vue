<template>
  <v-card class="whatsapp-dialog">
    <v-card-title class="text-h6 d-flex align-center pa-4 bg-success">
      <v-icon color="white" size="28" class="mr-2 flex-shrink-0">mdi-whatsapp</v-icon>
      <span class="text-white text-truncate">{{ t("whatsapp_title") }}</span>
      <v-spacer />
      <v-btn icon size="small" variant="text" @click="$emit('close')">
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <v-divider />

    <v-card-text class="px-3 py-4" style="max-height: 70vh; overflow-y: auto;">
      <div class="text-body-2 mb-3 text-center text-grey-darken-1">
        {{ t("review_order") }}
      </div>

      <!-- Customer Information -->
      <v-sheet class="pa-3 mb-3 bg-blue-grey-lighten-5 rounded" elevation="1">
        <div class="text-caption mb-2 font-weight-bold d-flex align-center">
          <v-icon color="primary" size="16" class="mr-1">mdi-account-circle</v-icon>
          {{ t("customer_info") }}
        </div>
        <v-row dense>
          <v-col cols="6">
            <div class="text-caption text-grey-darken-2">{{ t("cust_name_label") }}</div>
            <div class="text-caption font-weight-medium text-truncate">
              {{ checkoutData.custName || "-" }}
            </div>
          </v-col>
          <v-col cols="6">
            <div class="text-caption text-grey-darken-2">{{ t("phone_number_label") }}</div>
            <div class="text-caption font-weight-medium text-truncate">
              {{ checkoutData.phoneNumber || "-" }}
            </div>
          </v-col>
          <v-col cols="6">
            <div class="text-caption text-grey-darken-2">{{ t("shipping_company_label") }}</div>
            <div class="text-caption font-weight-medium text-truncate">
              {{ checkoutData.shippingCompany || "-" }}
            </div>
          </v-col>
          <v-col cols="6">
            <div class="text-caption text-grey-darken-2">{{ t("delivery_address_label") }}</div>
            <div class="text-caption font-weight-medium text-truncate">
              {{ checkoutData.address || "-" }}
            </div>
          </v-col>
          <v-col v-if="checkoutData.notes" cols="12">
            <v-divider class="my-1" />
            <div class="text-caption text-grey-darken-2">{{ t("notes_label") }}</div>
            <div class="text-caption font-weight-medium text-truncate">
              {{ checkoutData.notes }}
            </div>
          </v-col>
        </v-row>
      </v-sheet>

      <!-- QR Code -->
      <div class="mb-3">
        <v-img
          :src="store?.cartItems[0]?.qr ?? '/favicon.ico'"
          class="cursor-pointer rounded"
          contain
          width="100"
          height="100"
          @click="dialog = true"
        />
        <v-dialog v-model="dialog" max-width="320">
          <v-card class="pa-0" elevation="2">
            <v-img :src="store.cartItems[0].qr" contain />
          </v-card>
        </v-dialog>
      </div>

      <!-- Order Details (Grouped) -->
      <div class="mb-3">
        <div v-for="(items, tel) in cartGroup" :key="tel" class="mb-4">
          <v-sheet class="pa-3 bg-grey-lighten-4 rounded" elevation="2">

            <!-- Group header -->
            <div class="d-flex align-center justify-space-between bg-primary pa-2 rounded mb-2">
              <div class="d-flex align-center min-width-0">
                <v-icon color="white" size="16" class="mr-1 flex-shrink-0">mdi-receipt</v-icon>
                <span class="text-white text-caption font-weight-bold text-truncate">
                  {{ t("your_order") }} — {{ tel }}
                </span>
              </div>
              <div class="d-flex align-center flex-shrink-0 ml-2">
                <v-icon color="white" size="14" class="mr-1">mdi-package-variant</v-icon>
                <span class="text-white text-caption">{{ items.length }} {{ t("items") }}</span>
              </div>
            </div>

            <v-divider class="mb-2" />

            <!-- Items -->
            <v-card
              v-for="(item, index) in items"
              :key="item.id + index"
              class="mb-2 product-preview-card"
              elevation="1"
            >
              <div class="d-flex pa-2 ga-2">
                <!-- Image -->
                <v-img
                  :src="item.image?.[0] || ''"
                  width="60"
                  height="80"
                  contain
                  class="rounded flex-shrink-0"
                />

                <!-- Info -->
                <div class="flex-grow-1 min-width-0">
                  <!-- Name -->
                  <div class="text-caption font-weight-bold mb-1 text-truncate">
                    {{ item.creamname || item.name }}
                  </div>

                  <!-- Detail with 2-line clamp -->
                  <div
                    v-if="item.detail"
                    class="text-caption text-grey-darken-1 mb-1"
                    style="overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;"
                  >
                    {{ item.detail }}
                  </div>

                  <!-- price1 strikethrough -->
                  <div v-if="toNum(item.price1) > 0" class="text-caption text-grey-darken-1">
                    <del>{{ formatPrice(item.price1) }}</del>
                  </div>

                  <!-- Selling price + qty row -->
                  <div class="d-flex align-center justify-space-between mt-1 flex-wrap ga-1">
                    <span class="text-caption">
                      {{ t("price") }}:
                      <strong class="text-success">{{ formatPrice(getItemPrice(item)) }}</strong>
                    </span>
                    <v-chip size="x-small" color="primary" variant="flat">
                      x{{ item.quantity }} {{ item.unit || "ອັນ" }}
                    </v-chip>
                  </div>

                  <!-- Subtotal -->
                  <div class="text-right mt-1">
                    <span class="text-caption text-grey-darken-2">{{ t("subtotal") }}: </span>
                    <span class="text-caption font-weight-bold text-primary">
                      {{ formatPrice(getItemPrice(item) * (item.quantity || 1)) }}
                    </span>
                  </div>
                </div>
              </div>
            </v-card>

            <!-- Upload Slip -->
            <v-divider class="my-3" />
            <div class="mb-1 text-caption font-weight-bold">
              <v-icon size="16" class="mr-1" color="success">mdi-upload</v-icon>
              {{ t("upload_slip") }} ({{ tel }})
            </div>
            <v-file-input
              v-model="slipUploads[tel]"
              accept="image/*"
              :placeholder="t('upload_slip_placeholder')"
              prepend-icon="mdi-image"
              show-size
              density="compact"
              hide-details
              class="mb-2"
              @change="previewSlip(tel)"
            />
            <v-img
              v-if="slipPreview[tel]"
              :src="slipPreview[tel]"
              height="160"
              class="rounded mt-2"
              cover
            />
            <v-btn
              v-if="slipPreview[tel]"
              color="red"
              variant="text"
              size="small"
              class="mt-1 px-0"
              @click="removeSlip(tel)"
            >
              <v-icon size="16" class="mr-1">mdi-trash-can</v-icon>
              {{ t("remove_slip") }}
            </v-btn>
          </v-sheet>
        </div>
      </div>

      <!-- Grand Total — computed from cartGroup directly so it's always correct -->
      <v-sheet class="pa-3 bg-deep-purple-lighten-5 rounded" elevation="3">
        <div class="d-flex justify-space-between align-center">
          <div>
            <div class="text-body-2 font-weight-bold">{{ t("grand_total") }}</div>
            <div class="text-caption text-grey-darken-1">
              {{ totalCartCount }} {{ t("total_items") }}
            </div>
          </div>
          <span class="text-h6 font-weight-bold text-deep-purple">
            {{ formatPrice(computedTotal) }}
          </span>
        </div>
      </v-sheet>
    </v-card-text>

    <v-divider />

    <v-card-actions class="pa-3">
      <v-row dense no-gutters>
        <v-col cols="6" class="pr-1">
          <v-btn
            color="grey-darken-1"
            variant="outlined"
            block
            size="large"
            prepend-icon="mdi-close-circle"
            class="text-none"
            @click="$emit('close')"
          >
            {{ t("close") }}
          </v-btn>
        </v-col>
        <v-col cols="6" class="pl-1">
          <v-btn
            color="success"
            variant="flat"
            block
            size="large"
            prepend-icon="mdi-whatsapp"
            class="text-none"
            @click="sendToWhatsApp"
          >
            {{ t("send_whatsapp") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import Swal from "sweetalert2";
import { ref, computed } from "vue";

const { insertOrder, orderID } = useCustomerOrder();
const store = useProductSellStore();
const { t } = useLanguage();

// ── Props ─────────────────────────────────────────────────────────────────────
const props = defineProps({
  modelValue:   { type: Boolean, default: false },
  checkoutData: { type: Object,  required: true },
  cartGroup:    { type: Object,  required: true },
  totalItems:   { type: Number,  default: 0 },
  totalPrice:   { type: Number,  default: 0 },
  qr:           { type: String,  default: "" },
  cartCount:    { type: Number,  default: 0 },
});

const emit = defineEmits(["update:modelValue", "send", "close"]);

// ── Local state ───────────────────────────────────────────────────────────────
const dialog     = ref(false);
const slipUploads = ref({});
const slipPreview = ref({});

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// ── Helpers ───────────────────────────────────────────────────────────────────
// Strip non-numeric chars: "40000kip" → 40000
const toNum = (val) => {
  if (val === null || val === undefined || val === "") return 0;
  const cleaned = String(val).replace(/[^0-9.]/g, "");
  const n = Number(cleaned);
  return isNaN(n) ? 0 : n;
};

// Format with commas + KIP
const formatPrice = (val) => {
  const n = toNum(val);
  if (n === 0) return "0 KIP";
  return n.toLocaleString() + " KIP";
};

// Price priority: price3 → price2 → price → price1
const getItemPrice = (item) => {
  if (toNum(item.price3) > 0) return toNum(item.price3);
  if (toNum(item.price2) > 0) return toNum(item.price2);
  if (toNum(item.price)  > 0) return toNum(item.price);
  if (toNum(item.price1) > 0) return toNum(item.price1);
  return 0;
};

// ── Computed totals from cartGroup directly (never relies on store.totalPrice) ─
const computedTotal = computed(() => {
  let total = 0;
  for (const items of Object.values(props.cartGroup)) {
    for (const item of items) {
      total += getItemPrice(item) * (item.quantity || 1);
    }
  }
  return total;
});

const totalCartCount = computed(() => {
  let count = 0;
  for (const items of Object.values(props.cartGroup)) {
    for (const item of items) {
      count += item.quantity || 1;
    }
  }
  return count;
});

// ── Slip helpers ──────────────────────────────────────────────────────────────
const previewSlip = (tel) => {
  const file = slipUploads.value[tel];
  slipPreview.value[tel] = file ? URL.createObjectURL(file) : null;
};

const removeSlip = (tel) => {
  slipUploads.value[tel] = null;
  slipPreview.value[tel] = null;
};

// ── WhatsApp message builder ──────────────────────────────────────────────────
const formatCartForWhatsAppGroup = (tel, items, id) => {
  let text = `${t("your_order")} — ${id}\n`;

  items.forEach((item) => {
    text += `\n${item.creamname || item.name}\n`;
    if (item.detail) text += `${item.detail}\n`;
    text += `${t("qty")}: ${item.quantity} ${item.unit || "ອັນ"}\n`;

    if (toNum(item.price1) > 0) {
      text += `${t("full_price")}: ${formatPrice(item.price1)}\n`;
    }

    const price    = getItemPrice(item);
    const subtotal = price * (item.quantity || 1);
    text += `${t("price")}: ${formatPrice(price)}, ${t("subtotal")}: ${formatPrice(subtotal)}\n`;
  });

  text += slipUploads.value[tel]
    ? `\n${t("slip_yes")}\n`
    : `\n${t("slip_no")}\n`;

  text += `\n${t("view_order")}: https://yourdomain.com/order?orderID=${id}\n`;

  return encodeURIComponent(text);
};

// ── Send flow ─────────────────────────────────────────────────────────────────
const sendToWhatsApp = async () => {
  const channel = store.cartItems[0].channel;

  try {
    const firstSlip = Object.values(slipUploads.value).find(
      (slip) => slip !== null && slip !== undefined
    );

    const response = await insertOrder(
      props.checkoutData,
      props.cartGroup,
      firstSlip ? { file: firstSlip } : null,
      channel
    );

    if (!response || response.success !== true) {
      Swal.fire({
        icon: "error",
        title: t("order_failed"),
        text: response?.message || t("order_failed"),
      });
      return;
    }

    await Swal.fire({
      icon: "success",
      title: t("order_success"),
      text: `${t("order_id")}: ${orderID.value}`,
      timer: 2000,
      showConfirmButton: false,
    });

    try {
      for (const [tel, items] of Object.entries(props.cartGroup)) {
        const message = formatCartForWhatsAppGroup(tel, items, orderID.value);
        window.open(`https://wa.me/856${tel}?text=${message}`, "_blank");
      }
    } catch (whatsappError) {
      console.error("WhatsApp open error:", whatsappError);
    }

    try {
      store.clearCart();
    } catch (clearError) {
      console.error("Clear cart error:", clearError);
    }

    slipUploads.value = {};
    slipPreview.value = {};

    emit("send");
    close();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: t("unexpected_error"),
      text: `${error?.message || t("unexpected_error")}. The order may have been saved.`,
      confirmButtonText: t("close_dialog"),
    }).then(() => close());
  }
};

// ── Close ─────────────────────────────────────────────────────────────────────
const close = () => {
  try {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    emit("close");
    emit("update:modelValue", false);
  } catch (closeError) {
    console.error("❌ Error closing dialog:", closeError);
  }
};
</script>

<style scoped>
.whatsapp-dialog {
  border-radius: 12px;
  overflow: hidden;
}
.product-preview-card {
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}
.product-preview-card:hover {
  border-left-color: #25d366;
}
.min-width-0 {
  min-width: 0;
}
</style>