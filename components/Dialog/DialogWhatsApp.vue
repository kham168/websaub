<template>
  <v-card class="whatsapp-dialog">
    <!-- Header -->
    <v-card-title class="text-body-1 d-flex align-center pa-3 bg-success">
      <v-icon color="white" size="22" class="mr-2 flex-shrink-0"
        >mdi-whatsapp</v-icon
      >
      <span class="text-white text-truncate font-weight-bold">{{
        t("whatsapp_title")
      }}</span>
      <v-spacer />
      <v-btn icon size="x-small" variant="text" @click="$emit('close')">
        <v-icon color="white" size="20">mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <v-divider />

    <v-card-text
      class="px-2 py-3"
      style="
        max-height: 65vh;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      "
    >
      <div class="text-caption mb-2 text-center text-grey-darken-1">
        {{ t("review_order") }}
      </div>

      <!-- Customer Information -->
      <v-sheet class="pa-2 mb-2 bg-blue-grey-lighten-5 rounded" elevation="1">
        <div class="text-caption mb-1 font-weight-bold d-flex align-center">
          <v-icon color="primary" size="14" class="mr-1"
            >mdi-account-circle</v-icon
          >
          {{ t("customer_info") }}
        </div>
        <v-row dense>
          <v-col cols="6">
            <div
              class="text-caption text-grey-darken-2"
              style="font-size: 10px"
            >
              {{ t("cust_name_label") }}
            </div>
            <div
              class="text-caption font-weight-medium text-truncate"
              style="font-size: 11px"
            >
              {{ checkoutData.custName || "-" }}
            </div>
          </v-col>
          <v-col cols="6">
            <div
              class="text-caption text-grey-darken-2"
              style="font-size: 10px"
            >
              {{ t("phone_number_label") }}
            </div>
            <div
              class="text-caption font-weight-medium text-truncate"
              style="font-size: 11px"
            >
              {{ checkoutData.phoneNumber || "-" }}
            </div>
          </v-col>
          <v-col cols="6">
            <div
              class="text-caption text-grey-darken-2"
              style="font-size: 10px"
            >
              {{ t("shipping_company_label") }}
            </div>
            <div
              class="text-caption font-weight-medium text-truncate"
              style="font-size: 11px"
            >
              {{ checkoutData.shippingCompany || "-" }}
            </div>
          </v-col>
          <v-col cols="6">
            <div
              class="text-caption text-grey-darken-2"
              style="font-size: 10px"
            >
              {{ t("delivery_address_label") }}
            </div>
            <div
              class="text-caption font-weight-medium text-truncate"
              style="font-size: 11px"
            >
              {{ checkoutData.address || "-" }}
            </div>
          </v-col>
          <v-col v-if="checkoutData.notes" cols="12">
            <v-divider class="my-1" />
            <div
              class="text-caption text-grey-darken-2"
              style="font-size: 10px"
            >
              {{ t("notes_label") }}
            </div>
            <div
              class="text-caption font-weight-medium"
              style="font-size: 11px"
            >
              {{ checkoutData.notes }}
            </div>
          </v-col>
        </v-row>
      </v-sheet>

      <!-- QR Code -->
      <div class="mb-2">
        <v-img
          :src="store?.cartItems[0]?.qr ?? '/favicon.ico'"
          class="cursor-pointer rounded"
          contain
          width="80"
          height="80"
          @click="qrDialog = true"
        />
        <v-dialog v-model="qrDialog" max-width="280">
          <v-card class="pa-0" elevation="2">
            <v-img :src="store.cartItems[0].qr" contain />
          </v-card>
        </v-dialog>
      </div>

      <!-- Order Details (Grouped) -->
      <div class="mb-2">
        <div v-for="(items, tel) in cartGroup" :key="tel" class="mb-3">
          <v-sheet class="pa-2 bg-grey-lighten-4 rounded" elevation="2">
            <!-- Group header -->
            <div
              class="d-flex align-center justify-space-between bg-primary pa-2 rounded mb-2"
            >
              <div class="d-flex align-center min-width-0">
                <v-icon color="white" size="14" class="mr-1 flex-shrink-0"
                  >mdi-receipt</v-icon
                >
                <span
                  class="text-white font-weight-bold text-truncate"
                  style="font-size: 11px"
                >
                  {{ t("your_order") }} — {{ tel }}
                </span>
              </div>
              <div class="d-flex align-center flex-shrink-0 ml-1">
                <v-icon color="white" size="12" class="mr-1"
                  >mdi-package-variant</v-icon
                >
                <span class="text-white" style="font-size: 10px">
                  {{ items.length }} {{ t("items") }}
                </span>
              </div>
            </div>

            <v-divider class="mb-2" />

            <!-- Items -->
            <v-card
              v-for="(item, index) in items"
              :key="item.id + index"
              class="mb-2 product-preview-card"
              elevation="0"
              border
            >
              <div class="d-flex pa-2 ga-2">
                <!-- Image -->
                <v-img
                  :src="item.image?.[0] || ''"
                  width="50"
                  height="60"
                  contain
                  class="rounded flex-shrink-0"
                />
                <!-- Info -->
                <div class="flex-grow-1 min-width-0">
                  <div
                    class="font-weight-bold mb-1 text-truncate"
                    style="font-size: 11px"
                  >
                    {{ item.creamname || item.name }}
                  </div>
                  <div
                    v-if="item.detail"
                    class="text-grey-darken-1 mb-1"
                    style="
                      font-size: 10px;
                      overflow: hidden;
                      display: -webkit-box;
                      -webkit-line-clamp-limit: 2;
                      -webkit-box-orient: vertical;
                    "
                  >
                    {{ item.detail }}
                  </div>
                  <div
                    v-if="toNum(item.price1) > 0"
                    style="font-size: 10px"
                    class="text-grey-darken-1"
                  >
                    <del>{{ formatPrice(item.price1) }}</del>
                  </div>
                  <div
                    class="d-flex align-center justify-space-between mt-1 flex-wrap ga-1"
                  >
                    <span style="font-size: 10px">
                      {{ t("price") }}:
                      <strong class="text-success">{{
                        formatPrice(getItemPrice(item))
                      }}</strong>
                    </span>
                    <v-chip
                      size="x-small"
                      color="primary"
                      variant="flat"
                      style="font-size: 9px"
                    >
                      x{{ item.quantity }} {{ item.unit || "ອັນ" }}
                    </v-chip>
                  </div>
                  <div class="text-right mt-1">
                    <span style="font-size: 10px" class="text-grey-darken-2">
                      {{ t("subtotal") }}:
                    </span>
                    <span
                      style="font-size: 10px"
                      class="font-weight-bold text-primary ml-1"
                    >
                      {{
                        formatPrice(getItemPrice(item) * (item.quantity || 1))
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </v-card>

            <!-- Upload Slip -->
            <v-divider class="my-2" />
            <div
              class="mb-1 font-weight-bold d-flex align-center"
              style="font-size: 11px"
            >
              <v-icon size="14" class="mr-1" color="success">mdi-upload</v-icon>
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
              class="mb-1"
              style="font-size: 11px"
              @change="previewSlip(tel)"
            />
            <v-img
              v-if="slipPreview[tel]"
              :src="slipPreview[tel]"
              height="120"
              class="rounded mt-1"
              cover
            />
            <v-btn
              v-if="slipPreview[tel]"
              color="red"
              variant="text"
              size="x-small"
              class="mt-1 px-0"
              @click="removeSlip(tel)"
            >
              <v-icon size="14" class="mr-1">mdi-trash-can</v-icon>
              {{ t("remove_slip") }}
            </v-btn>
          </v-sheet>
        </div>
      </div>

      <!-- Grand Total -->
      <v-sheet class="pa-2 bg-deep-purple-lighten-5 rounded" elevation="3">
        <div class="d-flex justify-space-between align-center">
          <div>
            <div class="font-weight-bold" style="font-size: 12px">
              {{ t("grand_total") }}
            </div>
            <div class="text-grey-darken-1" style="font-size: 10px">
              {{ totalCartCount }} {{ t("total_items") }}
            </div>
          </div>
          <span
            class="font-weight-black text-deep-purple"
            style="font-size: 16px"
          >
            {{ formatPrice(computedTotal) }}
          </span>
        </div>
      </v-sheet>
    </v-card-text>

    <v-divider />

    <!-- Bottom actions -->
    <v-card-actions class="pa-2">
      <v-row dense no-gutters>
        <v-col cols="6" class="pr-1">
          <v-btn
            color="grey-darken-1"
            variant="outlined"
            block
            size="large"
            prepend-icon="mdi-close-circle"
            class="text-none"
            style="font-size: 12px"
            @click="$emit('close')"
          >
            {{ t("cancel") }}
          </v-btn>
        </v-col>
        <v-col cols="6" class="pl-1">
          <v-btn
            color="success"
            variant="flat"
            block
            size="large"
            prepend-icon="mdi-check-circle"
            class="text-none"
            style="font-size: 12px"
            :loading="isSending"
            @click="confirmOrder"
          >
            {{ t("confirm_order") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>

  <!-- ── After API success → WhatsApp confirm dialog ───────────────────────── -->
  <v-dialog
    v-model="whatsappConfirmDialog"
    :max-width="smAndDown ? '100%' : '380'"
    :fullscreen="smAndDown"
    persistent
    transition="dialog-bottom-transition"
  >
    <v-card
      :rounded="smAndDown ? '0' : 'xl'"
      elevation="8"
      class="overflow-hidden d-flex flex-column"
      style="height: 100%"
    >
      <!-- Green header -->
      <div
        class="pa-4 d-flex flex-column align-center flex-shrink-0"
        style="background: linear-gradient(135deg, #25d366 0%, #128c7e 100%)"
      >
        <div class="success-ring mb-2">
          <v-icon size="36" color="white">mdi-check-circle</v-icon>
        </div>
        <h3 class="text-body-1 font-weight-bold text-white text-center">
          {{ t("order_success") }}
        </h3>
        <p
          class="text-caption text-white mt-1 text-center"
          style="opacity: 0.9"
        >
          {{ t("order_id") }}: <strong>{{ savedOrderId }}</strong>
        </p>
      </div>

      <!-- Body — scrollable on mobile -->
      <v-card-text
        class="pa-3 flex-grow-1"
        style="overflow-y: auto; -webkit-overflow-scrolling: touch"
      >
        <!-- Question -->
        <div
          class="d-flex align-center ga-3 mb-3 pa-2 rounded bg-green-lighten-5"
        >
          <div class="whatsapp-icon-circle flex-shrink-0">
            <v-icon size="22" color="white">mdi-whatsapp</v-icon>
          </div>
          <div class="min-width-0">
            <p class="text-body-2 font-weight-bold mb-0">
              ສົ່ງຄຳສັ່ງຊື້ໄປ WhatsApp ບໍ?
            </p>
            <p class="text-caption text-grey-darken-1 mb-0">
              ກົດ "{{ t("send_whatsapp") }}" ເພື່ອເປີດ WhatsApp
            </p>
          </div>
        </div>

        <!-- WhatsApp targets -->
        <v-sheet class="pa-2 rounded mb-3" color="grey-lighten-4" elevation="0">
          <div class="text-caption font-weight-bold mb-2 text-grey-darken-2">
            <v-icon size="12" class="mr-1">mdi-send</v-icon>
            ສົ່ງຫາ:
          </div>
          <div
            v-for="(items, tel) in cartGroup"
            :key="tel"
            class="d-flex align-center ga-2 mb-1"
          >
            <v-icon size="16" color="success">mdi-whatsapp</v-icon>
            <span class="text-caption font-weight-medium">+856{{ tel }}</span>
            <v-chip size="x-small" color="success" variant="tonal">
              {{ items.length }} {{ t("items") }}
            </v-chip>
          </div>
        </v-sheet>

        <!-- Total summary -->
        <v-sheet
          class="pa-3 rounded d-flex justify-space-between align-center"
          style="background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)"
          elevation="0"
        >
          <div>
            <div class="text-caption text-grey-darken-1">
              {{ t("grand_total") }}
            </div>
            <div class="text-caption text-grey-darken-2">
              {{ totalCartCount }} {{ t("total_items") }}
            </div>
          </div>
          <span class="text-h6 font-weight-black text-success">
            {{ formatPrice(computedTotal) }}
          </span>
        </v-sheet>
      </v-card-text>

      <v-divider />

      <!-- Actions — always visible at bottom -->
      <v-card-actions class="pa-3 flex-shrink-0">
        <v-row dense no-gutters>
          <v-col cols="6" class="pr-1">
            <v-btn
              variant="outlined"
              color="grey-darken-1"
              block
              rounded="lg"
              size="large"
              class="text-none"
              style="font-size: 12px"
              prepend-icon="mdi-close"
              @click="closeAll"
            >
              {{ t("close") }}
            </v-btn>
          </v-col>
          <v-col cols="6" class="pl-1">
            <v-btn
              color="success"
              variant="flat"
              block
              rounded="lg"
              size="large"
              class="text-none"
              style="font-size: 12px"
              prepend-icon="mdi-whatsapp"
              @click="openWhatsApp"
            >
              {{ t("send_whatsapp") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import Swal from "sweetalert2";
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";

const { smAndDown } = useDisplay(); // 👈 detect mobile
const { insertOrder, orderID } = useCustomerOrder();
const store = useProductSellStore();
const { t } = useLanguage();

// ── Props ─────────────────────────────────────────────────────────────────────
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  checkoutData: { type: Object, required: true },
  cartGroup: { type: Object, required: true },
  totalItems: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 },
  qr: { type: String, default: "" },
  cartCount: { type: Number, default: 0 },
});

const emit = defineEmits(["update:modelValue", "send", "close"]);

// ── Local state ───────────────────────────────────────────────────────────────
const qrDialog = ref(false);
const whatsappConfirmDialog = ref(false);
const isSending = ref(false);
const savedOrderId = ref("");
const slipUploads = ref({});
const slipPreview = ref({});

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// ── Helpers ───────────────────────────────────────────────────────────────────
const toNum = (val) => {
  if (val === null || val === undefined || val === "") return 0;
  const cleaned = String(val).replace(/[^0-9.]/g, "");
  const n = Number(cleaned);
  return isNaN(n) ? 0 : n;
};

const formatPrice = (val) => {
  const n = toNum(val);
  if (n === 0) return "0 KIP";
  return n.toLocaleString() + " KIP";
};

const getItemPrice = (item) => {
  if (toNum(item.price3) > 0) return toNum(item.price3);
  if (toNum(item.price2) > 0) return toNum(item.price2);
  if (toNum(item.price) > 0) return toNum(item.price);
  if (toNum(item.price1) > 0) return toNum(item.price1);
  return 0;
};

// ── Computed totals ───────────────────────────────────────────────────────────
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
    const price = getItemPrice(item);
    const subtotal = price * (item.quantity || 1);
    text += `${t("price")}: ${formatPrice(price)}, ${t(
      "subtotal"
    )}: ${formatPrice(subtotal)}\n`;
  });
  text += slipUploads.value[tel]
    ? `\n${t("slip_yes")}\n`
    : `\n${t("slip_no")}\n`;
  text += `\n${t("view_order")}: https://tsheb.la/order?orderID=${id}\n`;
  return encodeURIComponent(text);
};

// ── Step 1: Confirm → call API ────────────────────────────────────────────────
const confirmOrder = async () => {
  isSending.value = true;
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

    // ✅ Success — show WhatsApp dialog
    savedOrderId.value = orderID.value;
    whatsappConfirmDialog.value = true;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: t("unexpected_error"),
      text: error?.message || t("unexpected_error"),
      confirmButtonText: t("close_dialog"),
    });
  } finally {
    isSending.value = false;
  }
};

// ── Step 2: Open WhatsApp ─────────────────────────────────────────────────────
const openWhatsApp = () => {
  try {
    for (const [tel, items] of Object.entries(props.cartGroup)) {
      const message = formatCartForWhatsAppGroup(
        tel,
        items,
        savedOrderId.value
      );
      window.open(`https://wa.me/856${tel}?text=${message}`, "_blank");
    }
  } catch (e) {
    console.error("WhatsApp open error:", e);
  }
  closeAll();
};

// ── Close everything ──────────────────────────────────────────────────────────
const closeAll = () => {
  whatsappConfirmDialog.value = false;

  try {
    store.clearCart();
  } catch (e) {
    console.error(e);
  }

  slipUploads.value = {};
  slipPreview.value = {};

  emit("send");

  try {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    emit("close");
    emit("update:modelValue", false);
  } catch (e) {
    console.error("Close error:", e);
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
.success-ring {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  border: 3px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse-ring 1.5s ease-out infinite;
}
.whatsapp-icon-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #25d366, #128c7e);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(37, 211, 102, 0.35);
}
@keyframes pulse-ring {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 14px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

/* Mobile overrides */
@media (max-width: 600px) {
  .whatsapp-dialog {
    border-radius: 0;
  }
}
</style>
