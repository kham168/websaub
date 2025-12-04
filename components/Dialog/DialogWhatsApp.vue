<template>
  <v-card class="whatsapp-dialog">
    <v-card-title class="text-h5 d-flex align-center pa-6 bg-success">
      <v-icon color="white" size="40" class="mr-3">mdi-whatsapp</v-icon>
      <span class="text-white">Send Order to WhatsApp</span>
      <v-spacer></v-spacer>
      <v-btn icon size="small" variant="text" @click="$emit('close')">
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="px-4 py-6" style="max-height: 600px">
      <div class="text-body-1 mb-4 text-center">
        Review your order details before sending to WhatsApp.
      </div>

      <!-- Customer Information -->
      <v-sheet class="pa-4 mb-4 bg-blue-grey-lighten-5 rounded" elevation="1">
        <div class="text-subtitle-2 mb-3 font-weight-bold d-flex align-center">
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
            <div class="text-caption text-grey-darken-2">Shipping Company</div>
            <div class="text-body-2 font-weight-medium">
              {{ checkoutData.shippingCompany }}
            </div>
          </v-col>
          <v-col cols="12" sm="4">
            <div class="text-caption text-grey-darken-2">Delivery Address</div>
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
      <!-- <div>
            <v-img :src="store.cartItems[0].qrimage" class="" contain width="150" height="150"></v-img>
          </div> -->
      <div>
        <!-- Image that triggers the popup -->
        <v-img
          :src="qrimage"
          class="cursor-pointer"
          contain
          width="150"
          height="150"
          @click="dialog = true"
        ></v-img>

        <!-- Popup dialog -->
        <v-dialog v-model="dialog" max-width="350">
          <v-card class="pa-0" elevation="2">
            <!-- <v-card-title class="text-h6">QR Code</v-card-title> -->
            <!-- <v-card-text class="text-center"> -->
            <v-img :src="qrimage" contain></v-img>
            <!-- </v-card-text> -->
            <!-- <v-card-actions class="justify-end">
                  <v-btn text @click="dialog = false">Close</v-btn>
                </v-card-actions> -->
          </v-card>
        </v-dialog>
      </div>
      <!-- Order Details (Grouped) -->
      <div class="mb-4">
        <div v-for="(items, tel) in cartGroup" :key="tel" class="mb-8">
          <v-sheet class="pa-4 bg-grey-lighten-4 rounded" elevation="2">
            <div
              class="text-subtitle-1 mb-3 font-weight-bold d-flex align-center justify-space-between bg-primary pa-3 rounded"
            >
              <span class="text-white">
                <v-icon color="white" class="mr-2">mdi-receipt</v-icon>
                Your Order — {{ tel }}
              </span>
              <span class="text-white">
                <v-icon color="white" class="mr-1">mdi-package-variant</v-icon>
                {{ items.length }} items
              </span>
            </div>
            <v-divider class="mb-3"></v-divider>

            <!-- Items -->
            <v-card
              v-for="(item, index) in items"
              :key="item.id + index"
              class="mb-3 product-preview-card"
              elevation="1"
            >
              <div class="d-flex pa-3 ">
                <v-img
                  :src="item.image?.[0] || ''"
                  width="70"
                  height="120"
                  contain
                  class="rounded flex-shrink-0"
                />
                <div class="ml-3 flex-grow-1">
                  <div class="text-subtitle-2 font-weight-bold mb-1">
                    {{ item.creamname || item.name }}
                  </div>
                  <div
                    v-if="item.detail"
                    class="text-caption text-grey-darken-1 mb-2"
                  >
                    {{ item.detail }}
                  </div>
                  <div
                    v-if="item.Price2 != 0 || item.Price2 != null"
                    class="d-flex justify-space-between"
                  >
                    <span class="text-body-2">
                      Full-Price:
                      <del class="text-grey">{{
                        formatPrice(item.Price1)
                      }}</del>
                    </span>
                  </div>
                  <div class="d-flex justify-space-between">
                    <span class="text-body-2">
                      Price:
                      <strong>{{ formatPrice(item.price) }}</strong>
                    </span>
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

            <!-- Upload Slip -->
            <v-divider class="my-4"></v-divider>
            <div class="mb-2 text-subtitle-2 font-weight-bold">
              <v-icon class="mr-2" color="success">mdi-upload</v-icon>
              Upload Payment Slip ({{ tel }})
            </div>
            <v-file-input
              v-model="slipUploads[tel]"
              accept="image/*"
              placeholder="Upload slip image"
              prepend-icon="mdi-image"
              show-size
              @change="previewSlip(tel)"
            ></v-file-input>
            <v-img
              v-if="slipPreview[tel]"
              :src="slipPreview[tel]"
              height="200"
              class="rounded mt-3"
              cover
            ></v-img>
            <v-btn
              v-if="slipPreview[tel]"
              color="red"
              variant="text"
              class="mt-2"
              @click="removeSlip(tel)"
            >
              <v-icon class="mr-2">mdi-trash-can</v-icon>
              Remove Slip
            </v-btn>
          </v-sheet>
        </div>
      </div>

      <!-- Grand Total -->
      <v-sheet class="pa-4 bg-deep-purple-lighten-5 rounded" elevation="3">
        <div class="d-flex justify-space-between align-center">
          <div>
            <div class="text-h6 font-weight-bold">Grand Total</div>
            <div class="text-caption text-grey-darken-1">
              {{ cartCount || 0 }} total items
            </div>
          </div>
          <span class="text-h5 font-weight-bold text-deep-purple">
            {{ formatPrice(totalPrice || 0) }}
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
            block
            size="x-large"
            prepend-icon="mdi-close-circle"
            @click="$emit('close')"
            >Close</v-btn
          >
        </v-col>
        <v-col cols="12" sm="6">
          <v-btn
            color="success"
            variant="flat"
            block
            size="x-large"
            prepend-icon="mdi-whatsapp"
            @click="sendToWhatsApp"
            >Send to WhatsApp</v-btn
          >
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import Swal from "sweetalert2";
import { ref, computed } from "vue";
const { insertOrder,orderID } = useCustomerOrder();

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  checkoutData: {
    type: Object,
    required: true,
  },
  cartGroup: {
    type: Object,
    required: true,
  },
  totalItems: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  qrimage: {
    type: String,
    default: "",
  },
  cartCount: {
    type: Number,
    default: 0,
  },
});

// Emits
const emit = defineEmits(["update:modelValue", "send", "close"]);

// Local state
const slipUploads = ref({});
const slipPreview = ref({});

// Computed
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});


const previewSlip = (tel) => {
  const file = slipUploads.value[tel];
  if (!file) {
    slipPreview.value[tel] = null;
    return;
  }
  slipPreview.value[tel] = URL.createObjectURL(file);
};

const removeSlip = (tel) => {
  slipUploads.value[tel] = null;
  slipPreview.value[tel] = null;
};
const formatCartForWhatsAppGroup = (tel, items, orderID) => {
  let text = `Your Order — ${orderID}\n`;

  items.forEach((item) => {
    text += `\n${item.creamname || item.name}\n`;
    if (item.detail) text += `${item.detail}\n`;
    text += `Qty: ${item.quantity} ${item.unit || "ອັນ"}\n`;

    const price = item.Price3 || item.price || item.Price1;
    const subtotal = price * item.quantity;

    text += `Price: ${price}, Subtotal: ${subtotal}\n`;
  });

  if (slipUploads.value[tel]) {
    text += `\nPayment Slip uploaded: Yes\n`;
  } else {
    text += `\nPayment Slip uploaded: No\n`;
  }

  // -----------------------------------
  // ✔ ADD CLICKABLE LINK FOR WHATSAPP
  // -----------------------------------
  const orderLink = `https://yourdomain.com/order?orderID=${orderID}`;
  text += `\nView Order Details: ${orderLink}\n`;

  return encodeURIComponent(text);
};

const sendToWhatsApp = async () => {
  if(!slipUploads.value){
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please upload at least one payment slip before sending the order.",
    })
    return;
  }
  const responses = await insertOrder(
    props.checkoutData,
    props.cartGroup,
    slipUploads.value
  );

  const allSuccess = responses.every(r => r && r.success === true);

  if (!allSuccess) {
    alert("Order failed to save. Please try again.");
    return;
  }

  // After all orders saved successfully → Send WhatsApp
  for (const [tel, items] of Object.entries(props.cartGroup)) {
    const message = formatCartForWhatsAppGroup(tel, items,orderID.value);
    window.open(`https://wa.me/856${tel}?text=${message}`, "_blank");
  }

  emit("send");
  close();
};


const close = () => {
  emit("close");
  emit("update:modelValue", false);
};
</script>

<style scoped>
.whatsapp-dialog {
  border-radius: 16px;
  overflow: hidden;
}

.product-preview-card {
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.product-preview-card:hover {
  border-left-color: #25d366;
}
@media (max-width: 600px) {
  .v-card-text {
    max-height: 500px !important;
  }
}
</style>
