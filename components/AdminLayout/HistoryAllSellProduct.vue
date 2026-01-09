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
              <v-chip closable @click:close="removeSearchTag">
                Chue YANg
              </v-chip>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-sheet>

    <!-- Status Chips -->
    <v-sheet class="pa-4 bg-white border-b">
      <v-row dense>
        <v-col cols="auto  ">
          <v-chip
            variant="text"
            @click="filterStatus = 'all'"
            class="bg-primary"
            :content="orders.length"
          >
            ສິນຄ້າທັງໝົດ
            <v-badge inline content="1062" color="grey" class="ml-1"></v-badge>
          </v-chip>
        </v-col>
        <v-col cols="auto">
          <v-chip
            color="green"
            variant="flat"
            @click="filterStatus = 'delivered'"
          >
            ຈັດສົ່ງສຳເລັດ
            <v-badge
              inline
              content="729"
              color="white"
              text-color="primary"
              class="ml-1"
            ></v-badge>
          </v-chip>
        </v-col>
        <v-col cols="auto">
          <v-chip
            variant="text"
            @click="filterStatus = 'returns'"
            class="bg-error"
          >
            ຍົກເລີກການສັ່ງຊື້
            <v-badge inline content="29" color="grey" class="ml-1"></v-badge>
          </v-chip>
        </v-col>
      </v-row>
    </v-sheet>

    <!-- Toolbar  Icons -->
    <v-toolbar density="compact" flat class="border-b">
      <v-toolbar-items>
        <v-btn icon size="small" @click="refreshData" :loading="loading">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <v-btn icon size="small">
          <v-icon>mdi-calendar</v-icon>
        </v-btn>
        <v-btn icon size="small">
          <v-icon>mdi-view-grid</v-icon>
        </v-btn>
        <v-btn icon size="small">
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        <v-btn icon size="small">
          <v-icon>mdi-sort</v-icon>
        </v-btn>
        <v-btn icon size="small">
          <v-icon>mdi-filter</v-icon>
        </v-btn>
        <v-btn icon size="small">
          <v-icon>mdi-printer</v-icon>
        </v-btn>
        <v-btn icon size="small">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-progress-linear
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-linear>

    <!-- Error -->
    <v-alert v-if="error" type="error" class="ma-4">{{ error }}</v-alert>
    <!-- Data Table -->
    <v-data-table
      :headers="headerss"
      :items="orders"
      :items-per-page="15"
      :loadings="loading"
      class="elevation-0 bg-yellow-lighten-4"
      density="compact"
      fixed-header
      height="calc(100vh - 400px)"
    >
      <!-- Checkbox Column -->
      <template #item.checkbox="{ item }">
        <v-checkbox
          v-model="selectedOrders"
          :value="item.id"
          hide-details
          density="compact"
          @click="openDetailsDialog(item.orderid)"
        />
      </template>

      <!-- ID Column -->
      <template #item.id="{ item }">
        <div class="d-flex align-center">
          <a
            :href="`#${item.id}`"
            class="text-primary text-decoration-none font-weight-medium"
          >
            {{ item.id }}
          </a>
        </div>
      </template>

      <!-- Created Date -->
      <template #item.cdate="{ item }">
        <div class="d-flex align-center">
          <span class="mr-2 text-body-2">{{ formatDate(item.cdate) }}</span>
        </div>
      </template>

      <!-- Payment Method -->
      <template #item.paymentMethod="{ item }">
        <div class="d-flex align-center flex-wrap ga-1">
          <v-chip
            :color="
              item.color == 'success'
                ? 'success'
                : 'error'
            "
            size="small"
            variant="flat"
          >
            {{ item.paymenttype }}
          </v-chip>
        </div>
      </template>

      <!-- Phone -->
      <template #item.custtel="{ item }">
        <a
          :href="`tel:${item.custtel}`"
          class="text-decoration-none text-body-2"
        >
          {{ item.custtel }}
        </a>
      </template>

      <!-- Shipping -->
      <template #item.shipping="{ item }">
        <div class="text-truncate text-body-2" style="max-width: 250px">
          {{ item.shipping }}
        </div>
      </template>
      <template #item.actions="{ item }">
        <v-chip
          size="small"
          :color="getSellStatusColor(item.sellstatus)"
          class="font-weight-bold"
          text-color="white"
        >
          {{ getSellStatusLabel(item.sellstatus) }}
        </v-chip>
      </template>
    </v-data-table>
    <!-- Details Dialog -->
    <v-dialog v-model="detailsDialog" max-width="900px" scrollable>
      <v-card v-if="selectedOrder">
        <v-card-title class="d-flex align-center bg-primary text-white pa-4">
          <v-icon class="mr-2">mdi-receipt-text-outline</v-icon>
          <span class="text-h6">ລາຍລະອຽດຄຳສັ່ງຊື້</span>
          <v-spacer></v-spacer>
          <v-btn icon variant="text" @click="detailsDialog = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="pa-6">
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
                      text-color="white"
                    >
                      {{ selectedOrder.paymentMethod }}
                    </v-chip>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="detail-row">
                    <span class="detail-label">ການຊຳລະ:</span>
                    <v-chip
                      :color="getPaymentColor(selectedOrder.sellstatus)"
                      size="small"
                      class="ml-2"
                      text-color="white"
                    >
                      {{ getSellStatusLabel(selectedOrder.sellstatus) }}
                    </v-chip>
                  </div>

                  <v-divider></v-divider>
                  <div>
                    <span class="detail-label">ສາເຫດ:</span>
                    {{ selectedOrder.reason }}
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
                    <v-icon class="mr-2">mdi-image</v-icon> ໃບຊຳລະ
                  </h3>
                  <v-img
                    :src="selectedOrder.paymentImage"
                    height="150"
                    width="150"
                    contain
                    class="cursor-pointer"
                    @click="openImage(selectedOrder.paymentImage)"
                  ></v-img>
                </div>
              </div>
            </v-col>

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
                          class="cursor-pointer"
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
                      <td>{{ formatPrice(product.price) }} ₭</td>
                      <td>
                        {{ formatPrice(product.price * product.quantity) }} ₭
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr class="bg-grey-lighten-4">
                      <td colspan="6" class="text-right font-weight-bold">
                        ລວມທັງໝົດ:
                      </td>
                      <td class="text-right font-weight-bold text-primary">
                        {{ formatPrice(calculateTotal()) }} ₭
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
            color="error"
            variant="outlined"
            @click="detailsDialog = false"
          >
            <v-icon start>mdi-close</v-icon>
            ຍົກເລີກ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Image Preview Dialog -->
    <v-dialog v-model="showImageDialog" max-width="800px">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span>ຮູບພາບ</span>
          <v-btn icon variant="text" @click="showImageDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pa-0">
          <v-img :src="selectedImage" contain max-height="600"></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Footer -->
    <v-sheet class="pa-4 border-t bg-white">
      <v-row align="center">
        <v-col cols="auto">
          <span class="text-body-2">
            COD: <strong class="text-h6">157.284.000 ₭</strong>
            <span class="mx-2">|</span>
            Paid:
            <strong class="text-h6 text-success">1.069.000 ₭</strong>
            <span class="mx-2">|</span>
            Overdue:
            <strong class="text-h6 text-error">5.832.000 ₭</strong>
            <span class="mx-2">|</span>
            Total amount: <strong class="text-h6">895</strong>
          </span>
          <v-btn icon size="x-small" variant="text" class="ml-2">
            <v-icon size="small" color="grey">mdi-information-outline</v-icon>
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn variant="outlined" size="small" class="text-none"> 1 </v-btn>
        </v-col>
        <v-col cols="auto">
          <span class="text-body-2">1000 / Page</span>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script setup>
const {
  historyProductSell,
  pagination,
  loading,
  error,
  fetchHistoryProductSell,
} = useHistoryAllProductSell();

const search = ref("");
const filterStatus = ref("All");
const detailsDialog = ref(false);
const selectedOrder = ref(null);
const showImageDialog = ref(false);
const selectedImage = ref("");

onMounted(async () => {
  await fetchHistoryProductSell();
  console.log("Orders data:", historyProductSell.value);
});

const refreshData = async () => {
  await fetchHistoryProductSell();
};

const props = defineProps({
  activeTab: {
    type: String,
    default: "ordersDetail",
  },
});

const selectedOrders = ref([]);
const headerss = [
  { title: "", value: "checkbox", width: 50, sortable: false },
  { title: "ລະຫັດໃບບິນ", value: "id", width: 100 },
  { title: "ວັນທີ", value: "cdate", width: 180 },
  { title: "ລາຍລະອຽດການຊໍາລະ", value: "paymentMethod", width: 150 },
  { title: "ເບີໂທລະສັບ", value: "custtel", width: 120 },
  { title: "ການຂົນສົ່ງ", value: "shipping", width: 150 },
  { title: "ສະຖານະ", value: "actions", width: 180, sortable: false },
];

// Map orders data
const orders = computed(() =>
  historyProductSell.value.map((order) => {
    let paymentTypeText = "";
    let color = "";

    if (order.paymenttype == "1") {
      paymentTypeText = "ເງິນໂອນ";
      color = "success";
    } else if (order.paymenttype == "2") {
      paymentTypeText = "ຈ່າຍປາຍທາງ";
      color = "success";
    } else if (order.paymenttype == "3") {
      paymentTypeText = "ມີການຊໍາລະແລ້ວ";
      color = "success";
    } else {
      paymentTypeText = "ບໍ່ຮູ້ປະເພດການຊໍາລະ";
      color = "error";
    }

    return {
      id: order.orderid,
      orderid: order.orderid,
      cdate: order.cdate,
      delivery: order.delivery,
      shipping: order.shipping,
      custtel: order.custtel,
      paymentimage: order.paymentimage ? "ມີການຊໍາລະແລ້ວ" : "ຍັງບໍ່ມີການຊໍາລະ",
      paymenttype: paymentTypeText,
      sellstatus: order.sellstatus,
      productdetail: order.productdetail,
      color: color,
    };
  })
);

// const getSellStatusLabel = (status) => {
//   const statusMap = {
//     1: "ຈັດສົ່ງສຳເລັດ",
//     2: "ຍົກເລີກ",
//   };
//   console.log("================>", status);
//   return statusMap[status];
// };
// const actionOptions = [
//   { label: "ຈັດສົ່ງສຳເລັດ", value: 0 },
//   { label: "ກຳລັງຈັດສົ່ງ", value: 1 },
//   { label: "ຍົກເລີກ", value: 2 },
// ];

const handleDialogStatusChange = async (newStatus) => {
  if (!selectedOrder.value) return;

  try {
    selectedOrder.value.sellstatus = newStatus;
    const orderInList = historyProductSell.value.find(
      (o) => o.orderid === selectedOrder.value.id
    );
    if (orderInList) {
      orderInList.sellstatus = newStatus;
    }

    console.log();
  } catch (error) {}
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

const getPaymentColor = (status) =>
  status === "ຍັງບໍ່ມີການຊໍາລະ" ? "error" : "success";

// Open dialog by order ID
const openDetailsDialog = (orderId) => {
  const order = historyProductSell.value.find((o) => o.orderid === orderId);
  if (!order) {
    console.log("Order not found:", orderId);
    return;
  }

  selectedOrder.value = {
    id: order.orderid,
    created: formatDate(order.cdate),
    delivery: order.delivery,
    phone: order.custtel,
    paymentMethod: order.paymentimage ? "ມີການຊໍາລະແລ້ວ" : "ຍັງບໍ່ມີການຊໍາລະ",
    paymentImage: order.paymentimage || null,
    deliveryInfo: order.shipping,
    reason: order.sellcomment,
    // sellstatus: order.sellstatus == 1,
    sellstatus: Number(order.sellstatus),
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
// Update getActionColor to handle numeric values
// const getActionColor = (status) => {
//   const colors = {
//     1: "#4CAF50",
//     2: "#D32F2F",
//   };
//   return colors[status] || "#FFC107";
// };
// const getSellStatusColor = (status) => {
//   const colors = {
//     1: "green",
//     2: "red",
//   };
//   return colors[status] || "blue";
// }
const getSellStatusLabel = (status) => {
  const statusMap = {
    1: "ຈັດສົ່ງສຳເລັດ",
    2: "ຍົກເລີກ",
  };

  return statusMap[status];
};

const getSellStatusColor = (status) => {
  if (status == 1) return "green";
  if (status == 2) return "red";
  return "orange";
};

function openImage(img) {
  if (!img) return;
  selectedImage.value = img;
  showImageDialog.value = true;
}
</script>
<style scoped>
.border-b {
  border-bottom: 1px solid #e0e0e0;
}
/* user */
.stat-card {
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
}

.user-table :deep(.v-data-table__td) {
  padding: 12px 16px !important;
}

.user-table :deep(.v-data-table__th) {
  font-weight: 600 !important;
  background: #f5f5f5 !important;
}

.action-select {
  min-width: 160px;
  max-width: 200px;
}

.action-select :deep(.v-field) {
  border-radius: 25px;
  box-shadow: none;
}

.action-select :deep(.v-field__input) {
  padding: 0;
  min-height: 40px;
}

.action-select :deep(.v-field__append-inner) {
  padding-top: 8px;
}

.detail-section {
  margin-bottom: 20px;
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

.product-row:hover {
  background-color: #f5f5f5;
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
