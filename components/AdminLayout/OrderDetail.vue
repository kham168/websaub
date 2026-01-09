<template>
  <v-container fluid class="pa-0">
    <!-- Top Action Bar -->
    <v-sheet class="bg-grey-lighten-4 pa-4">
      <v-row align="center">
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn variant="text" class="text-h6 bg-blue">ສົ່ງຄືນ</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn variant="text" class="text-h6 bg-success">ຈັດສົ່ງສຳເລັດ</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn variant="text" class="text-h6 bg-error">ນຳເຂົ້າ</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn-group variant="outlined" divided>
            <v-btn icon="mdi-dots-vertical"></v-btn>
          </v-btn-group>
        </v-col>
      </v-row>
    </v-sheet>

    <!-- Filters Section -->
    <v-sheet class="pa-4 bg-white border-b">
      <v-row dense>
        <v-col cols="12" md="auto">
          <v-btn
            block
            class="text-h6 bg-orange d-flex justify-space-between align-center text-white"
            variant="elevated"
          >
            <span>ສົ່ງຊັກຊ້າ:</span>
            <span>12</span>
          </v-btn>
        </v-col>

        <v-col cols="12" md="auto">
          <v-btn
            block
            class="text-h6 bg-green d-flex justify-space-between align-center"
            variant="elevated"
          >
            <span>ຂົນສົ່ງທີ່ຍັງຄ້າງຢູ່:</span>
            <span>12</span>
          </v-btn>
        </v-col>
      </v-row>

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
        <v-col cols="auto">
          <v-chip variant="text" @click="filterStatus = 'all'">
            ທັງໝົດ
            <v-badge inline content="1062" color="grey" class="ml-1"></v-badge>
          </v-chip>
        </v-col>
        <v-col cols="auto">
          <v-chip variant="text" @click="filterStatus = 'new'">
            ໃໝ່
            <v-badge inline content="0" color="grey" class="ml-1"></v-badge>
          </v-chip>
        </v-col>
        <v-col cols="auto">
          <v-chip variant="text" @click="filterStatus = 'waiting'">
            ລໍຖ້າສິນຄ້າ
            <v-badge inline content="46" color="grey" class="ml-1"></v-badge>
          </v-chip>
        </v-col>

        <v-col cols="auto">
          <v-chip variant="text" @click="filterStatus = 'ordering'">
            ກຳລັງສັ່ງຊື້
            <v-badge inline content="2" color="grey" class="ml-1"></v-badge>
          </v-chip>
        </v-col>
        <v-col cols="auto">
          <v-chip variant="text" @click="filterStatus = 'pending'">
            ລໍຖ້າການຈັດສົ່ງ
            <v-badge inline content="0" color="grey" class="ml-1"></v-badge>
          </v-chip>
        </v-col>

        <v-col cols="auto">
          <v-chip
            color="primary"
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
          <v-chip variant="text" @click="filterStatus = 'collect'">
            ເກັບເງິນສິນຄ້າ
            <v-badge inline content="0" color="grey" class="ml-1"></v-badge>
          </v-chip>
        </v-col>
        <v-col cols="auto">
          <v-chip variant="text" @click="filterStatus = 'sorting'">
            ກຳລັງເລືອກສິນຄ້າ
            <v-badge inline content="0" color="grey" class="ml-1"></v-badge>
          </v-chip>
        </v-col>
        <v-col cols="auto">
          <v-chip variant="text" @click="filterStatus = 'cancelled'">
            ຍົກເລີກແລ້ວ
            <v-badge inline content="19" color="grey" class="ml-1"></v-badge>
          </v-chip>
        </v-col>
        <v-col cols="auto">
          <v-chip variant="text" @click="filterStatus = 'expired'">
            ໝົດອາຍຸ
            <v-badge inline content="0" color="grey" class="ml-1"></v-badge>
          </v-chip>
        </v-col>
        <v-col cols="auto">
          <v-chip variant="text" @click="filterStatus = 'returns'">
            ຍົກເລີກສິນຄ້າ
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
      :loading="loading"
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
              item.paymentimage === 'ມີການຊໍາລະແລ້ວ' ? 'success' : 'error'
            "
            size="small"
            variant="flat"
          >
            {{ item.paymentimage }}
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

      <!-- Product Code -->
      <!-- <template #item.productCode="{ item }">
        <div class="text-truncate text-body-2" style="max-width: 200px">
          {{ item.delivery }}
        </div>
      </template> -->

      <!-- Details -->
      <!-- <template #item.info="{ item }">
        <v-btn icon size="x-small" variant="text">
          <v-icon
            size="small"
            color="grey"
            @click="openDetailsDialog(item.orderid)"
            >mdi-eye</v-icon
          >
        </v-btn>
      </template> -->
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
                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <v-chip
                          v-bind="props"
                          :color="getPaymentColor(selectedOrder.paymentMethod)"
                          text-color="white"
                          size="small"
                          class="font-weight-bold ml-2"
                          style="cursor: pointer; border-radius: 25px"
                        >
                          {{
                            getPaymentStatusLabel(selectedOrder.paymentMethod)
                          }}
                          <v-icon end size="small">mdi-chevron-down</v-icon>
                        </v-chip>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="option in actionOptionsPayment"
                          :key="option.value"
                          @click="handleDialogPaymentMethodChange(option.value)"
                        >
                          <v-chip
                            :color="getActionColor(option.value)"
                            text-color="white"
                            size="small"
                            class="font-weight-bold"
                            style="
                              width: 100%;
                              border-radius: 25px;
                              justify-content: center;
                            "
                          >
                            {{ option.label }}
                          </v-chip>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="detail-row">
                    <span class="detail-label">ສະຖານະ:</span>
                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <v-chip
                          v-bind="props"
                          :color="getActionColor(selectedOrder.sellstatus)"
                          text-color="white"
                          size="small"
                          class="font-weight-bold ml-2"
                          style="cursor: pointer; border-radius: 25px"
                        >
                          {{ getSellStatusLabel(selectedOrder.sellstatus) }}
                          <v-icon end size="small">mdi-chevron-down</v-icon>
                        </v-chip>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="option in actionOptions"
                          :key="option.value"
                          @click="handleDialogStatusChange(option.value)"
                        >
                          <v-chip
                            :color="getActionColor(option.value)"
                            text-color="white"
                            size="small"
                            class="font-weight-bold"
                            style="
                              width: 100%;
                              border-radius: 25px;
                              justify-content: center;
                            "
                          >
                            {{ option.label }}
                          </v-chip>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                  <v-divider></v-divider>
                  <!-- <div v-if="selectedOrder.sellstatus === 2">
                    <span class="detail-label">ສາເຫດ:</span>

                    <v-textarea
                      v-model="selectedOrder.sellcomment"
                      variant="outlined"
                      rows="3"
                      placeholder="ປ້ອນສາເຫດການຍົກເລີກ..."
                      class="mt-2"
                    />
                  </div> -->
                  <div v-if="selectedOrder.sellstatus === 2">
                    <span class="detail-label">ສາເຫດ:</span>

                    <v-textarea
                      v-model="selectedOrder.sellcomment"
                      variant="outlined"
                      rows="3"
                      placeholder="ປ້ອນສາເຫດການຍົກເລີກ..."
                      class="mt-2"
                    />
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
          <v-btn
            color="error"
            variant="outlined"
            @click="detailsDialog = false"
          >
            <v-icon start>mdi-close</v-icon>
            ຍົກເລີກ
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="outlined" @click="handlePrint">
            <v-icon start>mdi-printer</v-icon>
            ພິມ
          </v-btn>
          <v-btn color="success" variant="flat" @click="handleUpdate">
            <v-icon start>mdi-check</v-icon>
            ອັບເດດ
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
  ordersProductSell,
  pagination,
  loading,
  error,
  fetchOrdersProductSell,
} = useGetAllProductOrderSell();
const { loadings, updateSenndingsuccess, errors, updateSenddingStatus } =
  useUpdateSendingOrderSell();
const search = ref("");
const filterStatus = ref("All");
const detailsDialog = ref(false);
const selectedOrder = ref(null);
const showImageDialog = ref(false);
const selectedImage = ref("");

onMounted(async () => {
  await fetchOrdersProductSell();
  console.log("Orders data:", ordersProductSell.value);
});

const refreshData = async () => {
  await fetchOrdersProductSell();
};

const handleUpdate = async () => {
  if (!selectedOrder.value?.id) {
    return;
  }

  // Validate sellStatus
  if (
    selectedOrder.value.sellstatus === undefined ||
    selectedOrder.value.sellstatus === null
  ) {
    return;
  }

  try {
    await updateSenddingStatus(
      selectedOrder.value.id,
      selectedOrder.value.sellstatus,
      selectedOrder.value.sellcomment || "",
      selectedOrder.value.paymentMethod
    );
    if (!errors.value) {
      detailsDialog.value = false;
      await fetchOrdersProductSell();
    }
  } catch (error) {}
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
  ordersProductSell.value.map((order) => ({
    id: order.orderid,
    orderid: order.orderid,
    cdate: order.cdate,
    delivery: order.delivery,
    shipping: order.shipping,
    custtel: order.custtel,
    paymentimage: order.paymentimage ? "ມີການຊໍາລະແລ້ວ" : "ຍັງບໍ່ມີການຊໍາລະ",
    sellstatus: order.sellstatus,
    productdetail: order.productdetail,
  }))
);
const getSellStatusLabel = (sellstatus) => {
  const statusMap = {
    0: " ກຳລັງຈັດສົ່ງ",
    1: "ຈັດສົ່ງສຳເລັດ",
    2: "ຍົກເລີກ",
  };
  return statusMap[sellstatus];
};
const actionOptions = [
  { label: "ກຳລັງຈັດສົ່ງ", value: 0 },
  { label: "ຈັດສົ່ງສຳເລັດ", value: 1 },
  { label: "ຍົກເລີກ", value: 2 },
];

const OptionsPay = [
  { label: "ຍັງບໍ່ມີການຊໍາລະ", value: 0 },
  { label: "ຈັດສົ່ງສຳເລັດ", value: 1 },
  { label: "ຍົກເລີກ", value: 2 },
];
const getPaymentLabel = (value) => {
  const found = OptionsPay.find((p) => p.value === value);
  return found ? found.label : "ບໍ່ຮູ້ການຊຳລະ";
};

const handleDialogStatusChange = async (newStatus) => {
  if (!selectedOrder.value) return;

  try {
    selectedOrder.value.sellstatus = newStatus;
    const orderInList = ordersProductSell.value.find(
      (o) => o.orderid === selectedOrder.value.id
    );
    if (orderInList) {
      orderInList.sellstatus = newStatus;
    }

    console.log();
  } catch (error) {}
};
const handleDialogPaymentMethodChange = async (newStatus) => {
  if (!selectedOrder.value) return;

  try {
    selectedOrder.value.paymentMethod = newStatus;
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

// Open dialog by order ID
const openDetailsDialog = (orderId) => {
  const order = ordersProductSell.value.find((o) => o.orderid === orderId);
  if (!order) {
    console.log("Order not found:", orderId);
    return;
  }

  selectedOrder.value = {
    id: order.orderid,
    created: formatDate(order.cdate),
    delivery: order.delivery,
    phone: order.custtel,
    paymentMethod: order.paymentimage ? 3 : 0,
    paymentImage: order.paymentimage || null,
    deliveryInfo: order.shipping,
    sellstatus: order.sellstatus,
    sellcomment: order.sellcomment,
    paymenttype: order.paymenttype,
    // paymentMethod: Number(order.paymentmethod),
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
const getPaymentStatusLabel = (sellstatus) => {
  console.log(sellstatus);
  const statusMap = {
    0: "ຍັງບໍ່ມີການຊໍາລະ",
    1: "ເງີນໂອນ",
    2: "ຈ່າຍປາຍທາງ",
    3: "ມີການຊໍາລະແລ້ວ",
  };
  return statusMap[sellstatus];
};
const actionOptionsPayment = [
  { label: "ຍັງບໍ່ມີການຊໍາລະ", value: 0 },
  { label: "ເງີນໂອນ", value: 1 },
  { label: "ຈ່າຍປາຍທາງ", value: 2 },
  // { label: "ມີການຊໍາລະແລ້ວ", value: 3 },
];
// Update getActionColor to handle numeric values
const getActionColor = (status) => {
  const colors = {
    0: "#FFC107",
    1: "#4CAF50",
    2: "#D32F2F",
  };
  return colors[status] || "#FFC107";
};
const getPaymentColor = (status) => {
  const colors = {
    0: "#FFC107",
    1: "#4CAF50",
    2: "#4CAF50",
  };
  return colors[status] || "#FFC107";
};
const getSellStatusColor = (status) => {
  const colors = {
    0: "orange",
    1: "green",
    2: "red",
  };
  return colors[status] || "blue";
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
