<template>
  <v-container fluid class="pa-0">
    <!-- Filters Section -->
    <v-sheet class="pa-4 bg-white border-b">
      <!-- Search Bar -->
      <v-row class="mt-2">
        <v-col cols="12">
          <v-text-field
            v-model="search"
            placeholder="ໃສ່ລະຫັດພັດສະດຸ :"
            variant="outlined"
            density="compact"
            hide-details
            clearable
          >
            <template #prepend-inner>
              <v-chip closable @click:close="removeSearchTag">Chue YANg</v-chip>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-sheet>

    <!-- Status Chips -->
    <v-sheet class="pa-4 bg-white border-b">
      <v-row dense>
        <v-col cols="auto">
          <v-chip variant="flat" @click="filterStatus = 'all'" color="red">
            ທັງໝົດ
            <v-badge
              inline
              :content="orders.length"
              color="white"
              class="ml-1"
            ></v-badge>
          </v-chip>
        </v-col>

        <v-col cols="auto">
          <v-chip
            color="yellow lighten-4"
            variant="flat"
            @click="filterStatus = 'delivered'"
          >
            ຍັງບໍ່ໄດ້ເບິ່ງ
            <v-badge
              inline
              :content="orders.length"
              color="white"
              text-color="primary"
              class="ml-1"
            ></v-badge>
          </v-chip>
        </v-col>

        <v-col cols="auto">
          <v-chip
            color="orange lighten-4"
            variant="flat"
            @click="filterStatus = 'notPaid'"
          >
            ຍັງບໍ່ໄດ້ຈ່າຍ
            <v-badge
              inline
              :content="totalNotPaid"
              color="white"
              text-color="primary"
              class="ml-1"
            ></v-badge>
          </v-chip>
        </v-col>

        <v-col cols="auto">
          <v-chip
            color="green lighten-4"
            variant="flat"
            @click="filterStatus = 'paid'"
          >
            ຈ່າຍແລ້ວ
            <v-badge
              inline
              :content="totalPaid"
              color="white"
              text-color="primary"
              class="ml-1"
            ></v-badge>
          </v-chip>
        </v-col>
      </v-row>
    </v-sheet>

    <!-- Toolbar Icons -->
    <v-toolbar density="compact" flat class="border-b">
      <v-toolbar-items>
        <v-btn icon size="small" @click="refreshData" :loading="loading">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <v-btn icon size="small"><v-icon>mdi-calendar</v-icon></v-btn>
        <v-btn icon size="small"><v-icon>mdi-view-grid</v-icon></v-btn>
        <v-btn icon size="small"><v-icon>mdi-view-list</v-icon></v-btn>
        <v-btn icon size="small"><v-icon>mdi-sort</v-icon></v-btn>
        <v-btn icon size="small"><v-icon>mdi-filter</v-icon></v-btn>
        <v-btn icon size="small"><v-icon>mdi-printer</v-icon></v-btn>
        <v-btn icon size="small"><v-icon>mdi-delete</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- Loading -->
    <v-progress-linear
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-linear>

    <!-- Error -->
    <v-alert v-if="error" type="error" class="ma-4">{{ error }}</v-alert>

    <!-- Orders Table -->
    <v-data-table
      :headers="headerss"
      :items="orders"
      :items-per-page="15"
      :loading="loading"
      class="elevation-0 bg-yellow-lighten-4"
      density="compact"
      fixed-header
      height="calc(100vh - 400px)"
      @click:row="onRowClick"
    >
    
      <!-- Checkbox -->
      <template #item.checkbox="{ item }">
        <v-checkbox
          v-model="selectedOrders"
          :value="item.id"
          hide-details
          density="compact"
          @change="openDetailsDialog(item.orderid)"
          @click.stop
        />
      </template>

      <!-- Order ID -->
      <template #item.orderid="{ item }">
        <div class="d-flex align-center">
          <a
            :href="`#${item.orderid}`"
            class="text-primary text-decoration-none font-weight-medium"
          >
            {{ item.orderid }}
          </a>
        </div>
      </template>

      <!-- Date -->
      <template #item.cdate="{ item }">
        <div class="d-flex align-center">
          <span class="mr-2 text-body-2">{{ formatDate(item.cdate) }}</span>
        </div>
      </template>

      <!-- Payment Image -->
      <template #item.paymentimage="{ item }">
        <div class="d-flex align-center flex-wrap ga-1">
          <v-chip
            variant="text"
            :class="getPaymentImageColor(item.paymentimage)"
          >
            ● {{ item.paymentimage }}
          </v-chip>
        </div>
      </template>

      <!-- Customer Phone with WhatsApp -->
      <template #item.custtel="{ item }">
        <div class="d-flex align-center ga-2">
          <a
            :href="`tel:${item.custtel}`"
            class="text-decoration-none text-body-2"
            @click.stop
          >
            {{ item.custtel }}
          </a>
          <v-btn
            icon
            size="x-small"
            variant="text"
            color="green"
            @click.stop="sendWhatsApp(item)"
          >
            <v-icon size="small">mdi-whatsapp</v-icon>
          </v-btn>
        </div>
      </template>

      <!-- Shipping -->
      <template #item.shipping="{ item }">
        <div class="text-truncate text-body-2" style="max-width: 250px">
          {{ item.shipping }}
        </div>
      </template>

      <!-- Sell Status -->
      <template #item.sellstatus="{ item }">
        <div class="d-flex align-start flex-wrap ga-1">
          <v-chip variant="text" class="text-red">{{ item.sellstatus }}</v-chip>
        </div>
      </template>

      <!-- Info Button -->
      <template #item.info="{ item }">
        <v-btn
          icon
          size="x-small"
          variant="text"
          @click.stop="openDetailsDialog(item.orderid)"
        >
          <v-icon size="small" color="grey">mdi-eye</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Details Dialog -->
    <v-dialog v-model="detailsDialog" max-width="900px" scrollable>
      <v-card>
        <v-card-title class="d-flex align-center bg-primary text-white pa-4">
          <v-icon class="mr-2">mdi-receipt-text-outline</v-icon>
          <span class="text-h6">ລາຍລະອຽດຄຳສັ່ງຊື້</span>
          <v-spacer></v-spacer>
          <v-btn icon variant="text" @click="detailsDialog = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="pa-6" v-if="selectedOrder">
          <v-row>
            <!-- Left Column: Order Info -->
            <v-col cols="12" md="6">
              <div class="detail-section">
                <h3 class="text-h6 mb-3 text-primary">
                  <v-icon class="mr-2">mdi-information</v-icon> ຂໍ້ມູນຄຳສັ່ງຊື້
                </h3>
                <v-card variant="outlined" class="pa-4">
                  <div class="detail-row">
                    <span class="detail-label">ລະຫັດ:</span>
                    <span class="detail-value font-weight-bold">{{
                      selectedOrder.id
                    }}</span>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="detail-row">
                    <span class="detail-label">ວັນທີສັ່ງ:</span>
                    <span class="detail-value">{{
                      selectedOrder.created
                    }}</span>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="detail-row">
                    <span class="detail-label">ການຊຳລະ:</span>
                    <v-chip
                      :color="getPaymentColor(selectedOrder.paymentMethod)"
                      size="small"
                      class="ml-2"
                    >
                      {{ selectedOrder.paymentMethod }}
                    </v-chip>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="detail-row">
                    <span class="detail-label">ສະຖານະ:</span>
                    <v-chip
                      :color="getActionColor(selectedOrder.actionStatus)"
                      size="small"
                      class="ml-2"
                      text-color="white"
                    >
                      {{ selectedOrder.actionStatus }}
                    </v-chip>
                  </div>
                </v-card>
              </div>
            </v-col>

            <!-- Right Column: Customer Info -->
            <v-col cols="12" md="6">
              <div class="detail-section">
                <h3 class="text-h6 mb-3 text-primary">
                  <v-icon class="mr-2">mdi-account</v-icon> ຂໍ້ມູນລູກຄ້າ
                </h3>
                <v-card variant="outlined" class="pa-4">
                  <div class="detail-row">
                    <span class="detail-label">Customer Name:</span>
                    <span class="detail-value">{{
                      selectedOrder.custName || "N/A"
                    }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">ເບີໂທ:</span>
                    <span class="detail-value">{{ selectedOrder.phone }}</span>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="detail-row">
                    <span class="detail-label">ທີ່ຢູ່ຈັດສົ່ງ:</span>
                  </div>
                  <div class="mt-2 pa-3 bg-grey-lighten-4 rounded">
                    <v-icon size="small" class="mr-2">mdi-map-marker</v-icon>
                    <span class="detail-value"
                      >{{ selectedOrder.deliveryInfo }}:
                      {{ selectedOrder.delivery }}</span
                    >
                  </div>
                </v-card>
                <div v-if="selectedOrder.paymentImage" class="mt-4">
                  <h3 class="text-h6 mb-3 text-primary">
                    <v-icon class="mr-2">mdi-image</v-icon> playslip
                  </h3>
                  <v-img
                    :src="selectedOrder.paymentImage"
                    height="150"
                    width="150"
                    contain
                    @click="openImage(selectedOrder.paymentImage)"
                  ></v-img>
                </div>
              </div>
            </v-col>
            <!-- show Dialog payslip  -->
            <v-dialog v-model="showImageDialog" max-width="600">
              <v-card rounded="xl">
                <v-card-title class="d-flex justify-space-between align-center">
                  <span class="text-h6">Image Preview</span>
                  <v-btn icon variant="text" @click="showImageDialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>

                <v-divider />

                <v-card-text class="pa-4 text-center">
                  <v-img
                    v-if="selectedImage"
                    :src="selectedImage"
                    max-height="500"
                    contain
                  >
                    <template #placeholder>
                      <v-progress-circular indeterminate />
                    </template>

                    <template #error>
                      <v-icon size="64" color="grey">mdi-image-broken</v-icon>
                    </template>
                  </v-img>
                </v-card-text>
              </v-card>
            </v-dialog>
            <!-- Products Table -->
            <v-col cols="12">
              <v-card variant="outlined">
                <v-table>
                  <thead>
                    <tr class="bg-grey-lighten-3">
                      <th>ລຳດັບ</th>
                      <th>ຮູບພາບ</th>
                      <th>ຊື່ສິນຄ້າ</th>
                      <th>ລະຫັດ</th>
                      <th>ຈຳນວນ</th>
                      <th>ລາຄາ</th>
                      <th>ລວມ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(product, index) in selectedOrder.products"
                      :key="index"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>
                        <v-avatar
                          size="50"
                          rounded
                          @click="openImage(product.image)"
                        >
                          <v-img
                            v-if="product.image"
                            :src="product.image"
                            cover
                          ></v-img>
                          <v-icon v-else size="40" color="grey-lighten-1"
                            >mdi-image-off-outline</v-icon
                          >
                        </v-avatar>
                      </td>
                      <td>{{ product.name }}</td>
                      <td>{{ product.code }}</td>
                      <td>{{ product.quantity }}</td>
                      <td>{{ formatPrice(product.price) }}</td>
                      <td>
                        {{ formatPrice(product.price * product.quantity) }}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr class="bg-grey-lighten-4">
                      <td colspan="6" class="text-right font-weight-bold">
                        ລວມທັງໝົດ:
                      </td>
                      <td class="text-right font-weight-bold text-primary">
                        {{ formatPrice(calculateTotal()) }}
                      </td>
                    </tr>
                  </tfoot>
                </v-table>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>

        <!-- Footer -->
        <v-card-actions class="pa-4 bg-grey-lighten-5">
          <v-spacer></v-spacer>
          <v-btn
            color="white"
            class="bg-green"
            variant="outlined"
            @click="handleConfirm"
          >
            confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// Composables
const { ordersPadding, loading, error, fetchOrdersPadding } =
  useSelectAllCustomerOrderPadding();
const { updateOrderStatus } = useUpdatePaddingOrderReView();

const search = ref("");
const filterStatus = ref("all");
const selectedOrders = ref([]);
const detailsDialog = ref(false);
const selectedOrder = ref(null);
const showImageDialog = ref(false);
const selectedImage = ref(null);

onMounted(async () => {
  await fetchOrdersPadding();
});
const headerss = [
  { title: "", value: "checkbox", width: 50, sortable: false },
  { title: "ລະຫັດໃບບິນ", value: "orderid", width: 100 },
  { title: "ວັນທີ", value: "cdate", width: 130 },
  { title: "ລາຍລະອຽດການຊໍາລະ", value: "paymentimage", width: 150 },
  { title: "ເບີໂທລະສັບ", value: "custtel", width: 120 },
  { title: "ການຂົນສົ່ງ", value: "shipping", width: 200 },
  { title: "ສະຖານະ", value: "sellstatus", width: 150 },
];

// Transform API data
const orders = computed(() =>
  ordersPadding.value.map((order) => ({
    id: order.orderid,
    orderid: order.orderid,
    cdate: order.cdate,
    delivery: order.delivery,
    shipping: order.shipping,
    custtel: order.custtel,
    custname: order.custname,
    paymentimage: order.paymentimage ? "ມີການຊໍາລະແລ້ວ" : "ຈ່າຍປາຍທາງ",
    sellstatus: order.sellstatus === 0 ? " ເບິ່ງແລ້ວ" : "ຍັງບໍ່ໄດ້ເບິ່ງ",
    actionStatus: order.sellstatus === 0 ? "pending" : "ຈັດສົ່ງສຳເລັດ",
    productdetail: order.productdetail,
  }))
);

const refreshData = async () => {
  await fetchOrdersPadding();
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${date.getFullYear()} ${String(date.getHours()).padStart(
    2,
    "0"
  )}:${String(date.getMinutes()).padStart(2, "0")}`;
};

const calculateTotal = () =>
  selectedOrder.value?.products?.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  ) || 0;

const formatPrice = (v) => Number(v).toLocaleString();

const totalNotPaid = computed(
  () => ordersPadding.value.filter((order) => !order.paymentimage).length
);
const totalPaid = computed(
  () => ordersPadding.value.filter((order) => order.paymentimage).length
);

const getPaymentImageColor = (status) =>
  status === "ຈ່າຍປາຍທາງ" ? "text-red" : "text-green";
const getPaymentColor = (status) =>
  status === "ຈ່າຍປາຍທາງ" ? "red" : "green";
const getActionColor = (status) =>
  status.includes("ຍັງບໍ່ໄດ້ເບິ່ງ") ? "red" : "green";

// Open dialog by order ID
const openDetailsDialog = (orderId) => {
  const order = ordersPadding.value.find((o) => o.orderid === orderId);
  if (!order) return;

  selectedOrder.value = {
    id: order.orderid,
    created: formatDate(order.cdate),
    delivery: order.delivery,
    phone: order.custtel,
    paymentMethod: order.paymentimage ? "ມີການຊໍາລະແລ້ວ" : "ຈ່າຍປາຍທາງ",
    paymentImage: order.paymentimage || null,
    deliveryInfo: order.shipping,
    actionStatus: order.sellstatus === 0 ? "ເບິ່ງແລ້ວ" : "ຍັງບໍ່ໄດ້ເບິ່ງ",
    custName: order.custname,
    products: order.productdetail.map((p) => ({
      name: p.productname,
      code: p.productid,
      quantity: parseInt(p.qty) || 0,
      price: parseFloat(p.price) || 0,
      image: p.image,
    })),
  };
  detailsDialog.value = true;
};

// Open dialog when clicking anywhere on row
const onRowClick = (row) => {
  if (!row) return;
  openDetailsDialog(row.orderid || row.id);
};

function openImage(img) {
  if (!img) return;
  selectedImage.value = img;
  showImageDialog.value = true;
}

const handleConfirm = async () => {
  if (!selectedOrder.value?.id) return;

  await updateOrderStatus(selectedOrder.value.id, true);

  if (!error.value) {
    detailsDialog.value = false;
    await fetchOrdersPadding();
  }
};

// Send WhatsApp message with order details
const sendWhatsApp = (item) => {
  const order = ordersPadding.value.find((o) => o.orderid === item.orderid);
  if (!order) {
    console.error("Order not found");
    return;
  }

  console.log("Original phone number:", order.custtel);

  // Format products list
  const productsList = order.productdetail
    .map(
      (p, index) =>
        `${index + 1}. ${p.productname} (${p.productid})
   ຈຳນວນ: ${p.qty} x ${formatPrice(p.price)} ກີບ = ${formatPrice(
          p.qty * p.price
        )} ກີບ`
    )
    .join("\n\n");

  // Calculate total
  const total = order.productdetail.reduce(
    (sum, p) => sum + p.qty * p.price,
    0
  );

  // Create message
  const message = `ສະບາຍດີ, ນີ້ແມ່ນລາຍລະອຽດຄຳສັ່ງຊື້ຂອງທ່ານ:

📋 ລະຫັດໃບບິນ: ${order.orderid}
📅 ວັນທີ: ${formatDate(order.cdate)}
👤 ຊື່: ${order.custname || "N/A"}
📞 ເບີໂທ: ${order.custtel}
🚚 ການຂົນສົ່ງ: ${order.shipping}
📍 ທີ່ຢູ່ຈັດສົ່ງ: ${order.delivery}

🛒 ສິນຄ້າ:
${productsList}

💰 ລວມທັງໝົດ: ${formatPrice(total)} ກີບ

${order.paymentimage ? "✅ ຊຳລະແລ້ວ" : "⚠️ ຍັງບໍ່ໄດ້ຊຳລະ"}`;

  // Format phone number
  let phoneNumber = order.custtel.replace(/\D/g, ""); // Remove all non-digits
  
  // If number doesn't start with country code, add Laos country code (856)
  if (!phoneNumber.startsWith("856")) {
    // Remove leading 0 if present
    if (phoneNumber.startsWith("0")) {
      phoneNumber = phoneNumber.substring(1);
    }
    phoneNumber = "856" + phoneNumber;
  }

  console.log("Formatted phone number:", phoneNumber);
  console.log("Message:", message);

  // Open WhatsApp with pre-filled message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  
  console.log("WhatsApp URL:", whatsappUrl);
  
  window.open(whatsappUrl, "_blank");
};
</script>

<style scoped>
.border-b {
  border-bottom: 1px solid #e0e0e0;
}
.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}
.detail-label {
  font-weight: 500;
  color: #666;
  min-width: 120px;
}
.detail-value {
  flex: 1;
  text-align: right;
  color: #333;
}
:deep(.v-table) {
  border-radius: 4px;
}
:deep(.v-table thead th) {
  padding: 12px 16px !important;
}
:deep(.v-table tbody td) {
  padding: 12px 16px !important;
}
</style>