<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      :rail="rail && !mobile"
      :temporary="mobile"
      color="primary"
      theme="dark"
    >
      <div class="pa-3">
        <div class="d-flex align-center">
          <v-btn
            icon
            variant="text"
            @click="rail = !rail"
            size="small"
            :class="{ 'mx-auto': rail }"
          >
            <v-icon>{{
              rail ? "mdi-chevron-right" : "mdi-chevron-left"
            }}</v-icon>
          </v-btn>

          <transition name="slide-fade">
            <div v-if="!rail || mobile" class="d-flex align-center">
              <div>
                <div class="text-h5 font-weight-bold">ແຜງຄວບຄຸມ</div>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.id"
          :value="item.id"
          :active="activeTab === item.id"
          @click="handleMenuClick(item.id)"
          rounded="xl"
        >
          <template #prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>

          <template #title>
            <div class="d-flex align-center ga-2 w-100">
              <span>{{ item.name }}</span>

              <!-- Badge only for orders -->
              <v-badge
                v-if="item.id === 'orders' && orderStore.orders.length > 0"
                :content="orderStore.orders.length"
                color="red"
                inline
              />
              <v-badge
                v-if="
                  item.id === 'ordersDetail' && sellStore.ordersSell.length > 0
                "
                :content="sellStore.ordersSell.length"
                color="red"
                inline
              />
            </div>
          </template>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2" v-if="!rail || mobile">
          <v-divider class="mb-2"></v-divider>
          <v-list-item
            prepend-icon="mdi-account-circle"
            title="Admin "
            subtitle="02076150054"
            class="px-2"
          >
          </v-list-item>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar color="primary" elevation="2" prominent>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title class="text-h6">
        <v-icon class="mr-2">{{ currentMenuItem?.icon }}</v-icon>
        {{ currentMenuItem?.name }}
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon variant="text">
        <v-badge color="error" content="5">
          <v-icon>mdi-bell-outline</v-icon>
        </v-badge>
      </v-btn>

      <v-btn icon variant="text" class="mx-2">
        <v-icon>mdi-email-outline</v-icon>
        <v-badge color="success" content="12" floating></v-badge>
      </v-btn>

      <v-divider vertical class="mx-3"></v-divider>

      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" variant="text" class="text-none">
            <v-avatar color="white" size="40" class="mr-2">
              <v-icon color="primary">mdi-account</v-icon>
            </v-avatar>
            <div class="text-left d-none d-sm-block">
              <div class="text-body-2 font-weight-bold">Admin User</div>
              <div class="text-caption">Administrator</div>
            </div>
            <v-icon class="ml-2">mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <!--=========== list Profile  and Addmin =========== -->
        <v-list>
          <v-list-item
            prepend-icon="mdi-account-circle"
            title="My Profile"
            subtitle="View your profile"
            @click="showProfile"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-cog"
            title="Settings"
            subtitle="Account settings"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-help-circle"
            title="Help & Support"
          ></v-list-item>
          <v-divider></v-divider>
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            class="text-error"
            @click="logout"
          ></v-list-item>
        </v-list>
      </v-menu>

      <template v-slot:extension>
        <v-tabs v-model="activeTab" align-tabs="start" color="white">
          <v-tab value="dashboard">
            <v-icon start>mdi-view-dashboard</v-icon>
            ໜ້າຫລັກ
          </v-tab>
          <v-tab value="sales">
            <v-icon start>mdi-chart-line</v-icon>
            ລາຍງານການຂາຍ
          </v-tab>
          <v-tab value="products">
            <v-icon start>mdi-package-variant</v-icon>
            ເພີ່ມສິນຄ້າ
          </v-tab>
          <v-tab value="orders">
            <v-icon start>mdi-clock-outline</v-icon>
            ລາຍການສັ່ງຊື້
          </v-tab>
          <v-tab value="ordersDetail">
            <v-icon start>mdi-cart</v-icon>
            ລາຍການຈັດສົ່ງ
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <!-- Dashboard View -->
        <div v-if="activeTab === 'dashboard'">
          <v-row>
            <v-col
              v-for="stat in stats"
              :key="stat.label"
              cols="12"
              sm="6"
              md="3"
            >
              <v-card :color="stat.color" theme="dark" elevation="3">
                <v-card-text>
                  <div class="d-flex justify-space-between align-center">
                    <div>
                      <div class="text-overline mb-1">{{ stat.label }}</div>
                      <div class="text-h5 font-weight-bold">
                        {{ stat.value }}
                      </div>
                      <div class="text-caption mt-2">
                        <v-icon size="small" color="success"
                          >mdi-trending-up</v-icon
                        >
                        {{ stat.change }}
                      </div>
                    </div>
                    <v-avatar size="60" :color="stat.avatarColor">
                      <v-icon size="30">{{ stat.icon }}</v-icon>
                    </v-avatar>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="mt-4">
            <v-col cols="12" md="6">
              <v-card elevation="2">
                <v-card-title class="text-h6 font-weight-bold">
                  📊 ພາບລວມການຂາຍປະຈຳອາທິດ
                </v-card-title>
                <v-card-text>
                  <canvas ref="weeklySalesChart" height="300"></canvas>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card elevation="2">
                <v-card-title class="text-h6 font-weight-bold">
                  📈 ຍອດຂາຍຕາມໝວດໝູ່
                </v-card-title>
                <v-card-text>
                  <canvas ref="categoryPieChart" height="300"></canvas>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="mt-4">
            <v-col cols="12">
              <v-card elevation="2">
                <v-card-title class="d-flex justify-space-between align-center">
                  <span class="text-h6 font-weight-bold"
                    >🏆 ສິນຄ້າທີ່ຂາຍດີທີ່ສຸດ</span
                  >
                  <v-btn color="primary" variant="text">ເບິ່ງທັງໝົດ</v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-table>
                  <!-- <thead>
                    <tr>
                      <th>ອັນດັບ</th>
                      <th>ສິນຄ້າ</th>
                      <th>ຈຳນວນສິນຄ້າທີ່ຂາຍ</th>
                      <th>ລາຍຮັບ</th>
                      <th>ແນວໂນ້ມ</th>
                    </tr>
                  </thead> -->
                  <thead>
                    <tr style="background-color: #1976d2">
                      <th
                        style="
                          color: white;
                          font-size: 16px;
                          font-weight: 600;
                          padding: 16px;
                        "
                      >
                        ອັນດັບ
                      </th>
                      <th
                        style="
                          color: white;
                          font-size: 16px;
                          font-weight: 600;
                          padding: 16px;
                        "
                      >
                        ສິນຄ້າ
                      </th>
                      <th
                        style="
                          color: white;
                          font-size: 16px;
                          font-weight: 600;
                          padding: 16px;
                        "
                      >
                        ຈຳນວນສິນຄ້າທີ່ຂາຍ
                      </th>
                      <th
                        style="
                          color: white;
                          font-size: 16px;
                          font-weight: 600;
                          padding: 16px;
                        "
                      >
                        ລາຍຮັບ
                      </th>
                      <th
                        style="
                          color: white;
                          font-size: 16px;
                          font-weight: 600;
                          padding: 16px;
                        "
                      >
                        ແນວໂນ້ມ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(product, index) in bestSellingProducts"
                      :key="product.id"
                    >
                      <td>
                        <v-avatar
                          :color="
                            index === 0
                              ? 'yellow-darken-2'
                              : index === 1
                              ? 'grey'
                              : index === 2
                              ? 'orange'
                              : 'grey-lighten-1'
                          "
                          size="40"
                        >
                          <span class="text-white font-weight-bold">{{
                            index + 1
                          }}</span>
                        </v-avatar>
                      </td>
                      <td>
                        <div class="d-flex align-center">
                          <span class="text-h6 mr-3">{{ product.image }}</span>
                          <span class="font-weight-medium">{{
                            product.name
                          }}</span>
                        </div>
                      </td>
                      <td>{{ product.sold }}</td>
                      <td class="font-weight-bold">
                        ${{ product.revenue.toLocaleString() }}
                      </td>
                      <td>
                        <v-chip color="success" size="small">{{
                          product.trend
                        }}</v-chip>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- Sales Report View -->
        <div v-if="activeTab === 'sales'">
          <v-row>
            <v-col cols="12">
              <v-card elevation="2">
                <v-card-title class="text-h6 font-weight-bold">
                  💰 ລາຍງານການຂາຍລະອຽດ
                </v-card-title>
                <v-card-text>
                  <canvas ref="salesBarChart" height="400"></canvas>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-card class="mb-4" elevation="2" rounded="lg">
            <v-card-text class="pa-4">
              <v-row align="center">
                <v-col cols="12" md="6">
                  <div class="text-h6 font-weight-bold">
                    <v-icon class="mr-2">mdi-chart-line</v-icon>
                    ສະຫຼຸບລາຍງານ
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <v-btn-toggle
                    v-model="selectedPeriod"
                    color="primary"
                    variant="outlined"
                    divided
                    mandatory
                    class="float-md-right"
                  >
                    <v-btn value="day" size="small">
                      <v-icon start>mdi-calendar-today</v-icon>
                      ມື້ນີ້
                    </v-btn>
                    <v-btn value="week" size="small">
                      <v-icon start>mdi-calendar-week</v-icon>
                      ອາທິດນີ້
                    </v-btn>
                    <v-btn value="month" size="small">
                      <v-icon start>mdi-calendar-month</v-icon>
                      ເດືອນນີ້
                    </v-btn>
                    <v-btn value="year" size="small">
                      <v-icon start>mdi-calendar</v-icon>
                      ປີນີ້
                    </v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Stats Cards -->
          <v-row class="mt-4">
            <v-col cols="12" md="4">
              <v-card color="blue-lighten-5" elevation="2" rounded="lg">
                <v-card-text>
                  <div class="d-flex align-center justify-space-between mb-2">
                    <div class="text-overline text-grey-darken-1">
                      ລາຍຮັບທັງໝົດ
                    </div>
                    <v-icon color="blue">mdi-cash-multiple</v-icon>
                  </div>
                  <div class="text-h4 font-weight-bold mt-2">
                    ${{ salesStats.totalRevenue.toLocaleString() }}
                  </div>
                  <div
                    class="text-body-2 mt-2"
                    :class="
                      salesStats.revenueChange >= 0
                        ? 'text-success'
                        : 'text-error'
                    "
                  >
                    <v-icon size="small">
                      {{
                        salesStats.revenueChange >= 0
                          ? "mdi-trending-up"
                          : "mdi-trending-down"
                      }}
                    </v-icon>
                    {{ salesStats.revenueChange >= 0 ? "+" : ""
                    }}{{ salesStats.revenueChange }}%
                    <span class="text-grey">{{ getPeriodText }}</span>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="4">
              <v-card color="green-lighten-5" elevation="2" rounded="lg">
                <v-card-text>
                  <div class="d-flex align-center justify-space-between mb-2">
                    <div class="text-overline text-grey-darken-1">
                      ອັດຕາການປ່ຽນແປງ
                    </div>
                    <v-icon color="green">mdi-chart-areaspline</v-icon>
                  </div>
                  <div class="text-h4 font-weight-bold mt-2">
                    {{ salesStats.conversionRate }}%
                  </div>
                  <div
                    class="text-body-2 mt-2"
                    :class="
                      salesStats.conversionChange >= 0
                        ? 'text-success'
                        : 'text-error'
                    "
                  >
                    <v-icon size="small">
                      {{
                        salesStats.conversionChange >= 0
                          ? "mdi-trending-up"
                          : "mdi-trending-down"
                      }}
                    </v-icon>
                    {{ salesStats.conversionChange >= 0 ? "+" : ""
                    }}{{ salesStats.conversionChange }}%
                    <span class="text-grey">{{ getPeriodText }}</span>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="4">
              <v-card color="purple-lighten-5" elevation="2" rounded="lg">
                <v-card-text>
                  <div class="d-flex align-center justify-space-between mb-2">
                    <div class="text-overline text-grey-darken-1">
                      ທຸລະກຳທັງໝົດ
                    </div>
                    <v-icon color="purple">mdi-swap-horizontal</v-icon>
                  </div>
                  <div class="text-h4 font-weight-bold mt-2">
                    {{ salesStats.totalTransactions.toLocaleString() }}
                  </div>
                  <div
                    class="text-body-2 mt-2"
                    :class="
                      salesStats.transactionChange >= 0
                        ? 'text-success'
                        : 'text-error'
                    "
                  >
                    <v-icon size="small">
                      {{
                        salesStats.transactionChange >= 0
                          ? "mdi-trending-up"
                          : "mdi-trending-down"
                      }}
                    </v-icon>
                    {{ salesStats.transactionChange >= 0 ? "+" : ""
                    }}{{ salesStats.transactionChange }}%
                    <span class="text-grey">{{ getPeriodText }}</span>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- Products View -->
        <div
          v-if="activeTab === 'products'"
          class="bg-grey-lighten-4 pa-4 rounded-lg mb-4"
        >
          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn
                color="primary"
                size="large"
                prepend-icon="mdi-plus"
                @click="showProductModal = true"
              >
                ເພີ່ມສິນຄ້າ
              </v-btn>
            </v-col>
          </v-row>

          <!-- <v-row class="mt-2">-->
          <div>
            <v-row class="mb-6">
              <v-col cols="12" sm="6" md="3">
                <v-card
                  class="stat-card"
                  color="blue-darken-2"
                  dark
                  elevation="4"
                  rounded="lg"
                >
                  <v-card-text>
                    <div class="d-flex align-center justify-space-between">
                      <div>
                        <p class="text-caption mb-1 opacity-90">ສິນຄ້າທັງໝົດ</p>
                        <h2 class="text-h4 font-weight-bold">
                          <!-- {{ users.length }} -->
                          {{ selectProductsAll.length }}
                        </h2>
                      </div>
                      <v-icon size="48" class="opacity-50">
                        mdi-cart-outline</v-icon
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-card
                  class="stat-card"
                  color="orange"
                  dark
                  elevation="4"
                  rounded="lg"
                >
                  <v-card-text>
                    <div class="d-flex align-center justify-space-between">
                      <div>
                        <p class="text-caption mb-1 opacity-90">
                          ສິນຄ້າທີ່ຍັງເຫຼືອ
                        </p>
                        <h2 class="text-h4 font-weight-bold">
                          <!-- {{ activeUsers }} -->
                          400
                        </h2>
                      </div>
                      <v-icon size="48" class="opacity-50">
                        mdi-package-variant</v-icon
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-card
                  class="stat-card"
                  color="blue-darken-2"
                  dark
                  elevation="4"
                  rounded="lg"
                >
                  <v-card-text>
                    <div class="d-flex align-center justify-space-between">
                      <div>
                        <p class="text-caption mb-1 opacity-90">
                          ສິນຄ້າທີ່ຂາຍແລ້ວ
                        </p>
                        <h2 class="text-h4 font-weight-bold">
                          <!-- {{ inactiveUsers }} -->
                          400
                        </h2>
                      </div>
                      <v-icon size="48" class="opacity-50"
                        >mdi-check-circle</v-icon
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-card
                  class="stat-card"
                  color="green darken-2"
                  dark
                  elevation="4"
                  rounded="lg"
                >
                  <v-card-text>
                    <div class="d-flex align-center justify-space-between">
                      <div>
                        <p class="text-caption mb-1 opacity-90">
                          ສິນຄ້າເພີ່ມໃໝ່
                        </p>
                        <span>ວັນເດືອນປີ: {{ DateTimenow }}</span>
                        <h2 class="text-h4 font-weight-bold">
                          <!-- {{ adminUsers }} -->
                          200
                        </h2>
                      </div>
                      <v-icon size="48" class="opacity-50"
                        >mdi-package-variant-plus</v-icon
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
          <v-divider class="my-4"></v-divider>
          <v-row dense>
            <v-col
              v-for="product in selectProductsAll"
              :key="product.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card
                class="mx-auto pa-4 bg-grey-lighten-4"
                elevation="2"
                hover
              >
                <!-- Image -->
                <v-img
                  :src="product.image?.[0] || '/placeholder.jpg'"
                  height="280"
                  cover
                />
                <v-divider class="my-2"></v-divider>
                <v-card-text>
                  <h3 class="text-h6 font-weight-bold">
                    {{ product.creamname || product.dormantalname }}
                  </h3>
                  <div>
                    <div
                      v-if="
                        Number(product.price1) > 0 &&
                        product.price2 &&
                        product.price2 !== 'undefined'
                      "
                    >
                      ລາຄາເຕັມ:
                      <span
                        class="text-caption text-decoration-line-through text-grey-darken-1"
                        >{{ product.price1 }}</span
                      >
                    </div>

                    <div class="text-h6 font-weight-bold">
                      ລາຄາ:
                      {{
                        product.price2 && product.price2 !== "undefined"
                          ? product.price2
                          : product.price1
                      }}
                    </div>
                  </div>

                  <v-col>
                    <v-row>
                      <div
                        v-if="product.totalroom"
                        class="mt-2 d-flex align-center"
                      >
                        <span class="mr-2">ຫ້ອງທັງໝົດ:</span>
                        <v-chip size="small" color="info">
                          {{ product.totalroom }}
                        </v-chip>
                      </div>
                      <div
                        v-if="product.activeroom"
                        class="mt-2 ml-2 d-flex align-center"
                      >
                        <span class="mr-2">ຫ້ອງເຕັມ:</span>
                        <v-chip size="small" color="green">
                          {{ product.activeroom }}
                        </v-chip>
                      </div>
                    </v-row>
                  </v-col>
                  <div
                    v-if="
                      product.provinceid ||
                      product.districtid ||
                      product.villageid
                    "
                    class="mt-3 d-flex align-start"
                  >
                    <v-icon size="small" color="primary" class="mr-1">
                      mdi-map-marker
                    </v-icon>
                    <span class="text-caption">
                      Province {{ product.provinceid }}, District
                      {{ product.districtid }}, Village {{ product.villageid }}
                    </span>
                  </div>
                </v-card-text>

                <div
                  v-if="product.tel"
                  :href="'tel:' + product.tel"
                  block
                  class="d-flex justify-start"
                >
                  {{ product.tel }}
                </div>

                <div
                  v-if="product.detail || product.moredetail"
                  class="text-medium font-weight-bold text-decoration-underline text-primary"
                >
                  + ລາຍລະອຽດ
                </div>
                <p class="text-body-2 text-medium-emphasis">
                  {{ product.detail || product.moredetail }}
                </p>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- =======================Function AddUser==================== -->
        <div v-if="activeTab === 'user'">
          <!-- Header Section -->
          <AddUsers
            :model-value="userDialog"
            :edited-user="editedUser"
            :is-editing="isEditing"
            @update:model-value="userDialog = $event"
            @save="saveUserFromChild"
          />
        </div>
        <!-- ====================== odersDetails Component ====================== -->
        <div v-if="activeTab === 'ordersDetail'">
          <OrderDetail
            v-model="detailsDialog"
            :order="selectedOrder"
            @print="handlePrintOrder"
          />
        </div>
        <!-- ================== PaddingOrders   =================-->
        <div v-if="activeTab === 'orders'">
          <PaddingOrders
            v-model="detailsDialog"
            :order="selectedOrder"
            @print="handlePrintOrder"
          />
        </div>
        <div v-if="activeTab === 'profile'">
          <ProfileDialog
            v-model="detailsDialog"
            :profileData="userProfile"
            @print="handlePrintOrder"
          />
        </div>
        <div v-if="activeTab === 'history'">
          <HistoryAllSellProduct
            v-model="detailsDialog"
            :order="selectedOrder"
            @print="handlePrintOrder"
          />
        </div>
      </v-container>
    </v-main>
    <!-- ================= Dialog Add Product Modal ================ -->
    <DialogAddProduct
      :show-product-modal="showProductModal"
      :details-donations="details_Donations"
      @close="showProductModal = false"
      @submit="handleAddProduct"
    />
    <!-- ================= Edit Product Modal   =============== -->
    <DialogEditProduct
      :showDetailEditProduct="showDetailEditProduct"
      :editingProduct="selectedProduct"
      @close="showDetailEditProduct = false"
    />
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from "vue";
import DialogAddProduct from "~/components/AdminLayout/DialogAddProduct.vue";
import DialogEditProduct from "~/components/AdminLayout/DialogEditProduct.vue";
import OrderDetail from "~/components/AdminLayout/OrderDetail.vue";
import AddUsers from "~/components/AdminLayout/AddUsers.vue";
import PaddingOrders from "~/components/AdminLayout/PaddingOrder.vue";
import ProfileDialog from "~/components/AdminLayout/Profile.vue";
import HistoryAllSellProduct from "~/components/AdminLayout/HistoryAllSellProduct.vue";
import { useOrderPaddingStore } from "~/stores/orderCount";
import { useProductOrderSellStore } from "~/stores/orderDetailCount";
import { useSelectProduct } from "~/composables/useSelcetProduct";

const sellStore = useProductOrderSellStore();

const orderStore = useOrderPaddingStore();

let Chart = null;
const showProductModal = ref(false);
const showDetailEditProduct = ref(false);
const selectedProduct = ref(null);
const { selectProductsAll, pagination, loading, error, fetchSelectProducts } =
  useSelectProduct();
// State
const drawer = ref(true);
const rail = ref(false);
const activeTab = ref("dashboard");

const detailsDialog = ref(false);
const selectedOrder = ref(null);
// Chart refs
const weeklySalesChart = ref(null);
const categoryPieChart = ref(null);
const salesBarChart = ref(null);

function openEdit(product) {
  selectedProduct.value = JSON.parse(JSON.stringify(product)); // deep copy
  showDetailEditProduct.value = true;
}
const userProfile = ref({
  name: "Admin User",
  email: "admin@company.com",
  phone: "+856 20 5555 0000",
  role: "Administrator",
  address: "Vientiane, Laos",
  avatar: "https://via.placeholder.com/150",
  // Add actual data from your auth system
});

// Update showProfile function
const showProfile = () => {
  activeTab.value = "profile"; // This now works!
};

const details_Donations = [
  "Health",
  "Children Education",
  "Animals",
  "General Charity",
];

onMounted(async () => {
  await orderStore.fetchOrdersPadding(0, 0, 1000);
  await sellStore.fetchOrders(0, 0, 1000);
  // await fetchSelectProducts();
  // console.log("📦 Products Loaded:", selectProductsAll.value);
});

const handleAddProduct = (data) => {
  console.log("📌 Product Submitted:", data);
  showProductModal.value = false;
};
const DateTimenow = new Date().toLocaleString();

const userRole = useCookie("type").value;

const menuItems = computed(() => {
  let list = [];
  if (userRole === "admin") {
    list = [
      { id: "dashboard", name: "ໜ້າຫລັກ", icon: "mdi-view-dashboard" },
      { id: "sales", name: "ລາຍງານການຂາຍ", icon: "mdi-chart-line" },
      { id: "products", name: "ເພີ່ມສິນຄ້າ", icon: "mdi-package-variant" },
      { id: "orders", name: "ລາຍການສັ່ງຊື້", icon: "mdi-clock-outline" },
      { id: "ordersDetail", name: "ລາຍການຈັດສົ່ງ", icon: "mdi-cart" },
      { id: "history", name: "ປະຫວັດ", icon: "mdi-history" },
      { id: "user", name: "ເພີ່ມຜູ້ໃຊ້", icon: "mdi-account-plus" },
    ];
  } else {
    list = [
      { id: "dashboard", name: "ໜ້າຫລັກ", icon: "mdi-view-dashboard" },
      { id: "products", name: "ເພີ່ມສິນຄ້າ", icon: "mdi-package-variant" },
      { id: "orders", name: "ລາຍການສັ່ງຊື້", icon: "mdi-clock-outline" },
      { id: "ordersDetail", name: "ລາຍການຈັດສົ່ງ", icon: "mdi-cart" },
      { id: "history", name: "ປະຫວັດ", icon: "mdi-history" },
    ];
  }
  return list;
});
// Computed
const currentMenuItem = computed(() => {
  return menuItems.value.find((item) => item.id === activeTab.value);
});
// Stats
const stats = [
  {
    label: "ລາຍຮັບທັງໝົດ",
    value: "LAK 124,563",
    change: "+12%",
    icon: "mdi-currency-usd",
    color: "blue",
    avatarColor: "blue-lighten-4",
  },
  {
    label: "ຍອດສັ່ງຊື້ທັງໝົດ",
    value: "1,543",
    change: "+8%",
    icon: "mdi-cart",
    color: "green",
    avatarColor: "green-lighten-4",
  },
  {
    label: "ສິນຄ້າທີ່ຂາຍ",
    value: "8,234",
    change: "+15%",
    icon: "mdi-package-variant",
    color: "purple",
    avatarColor: "purple-lighten-4",
  },
  {
    label: "ລູກຄ້າໃໝ່",
    value: "456",
    change: "+5%",
    icon: "mdi-account-multiple",
    color: "orange",
    avatarColor: "orange-lighten-4",
  },
];

// Best selling products
const bestSellingProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    sold: 234,
    revenue: 46800,
    trend: "+12%",
    image: "🎧",
  },
  {
    id: 2,
    name: "Smart Watch",
    sold: 189,
    revenue: 56700,
    trend: "+8%",
    image: "⌚",
  },
  {
    id: 3,
    name: "Laptop Stand",
    sold: 156,
    revenue: 15600,
    trend: "+15%",
    image: "💻",
  },
  {
    id: 4,
    name: "USB-C Cable",
    sold: 312,
    revenue: 9360,
    trend: "+22%",
    image: "🔌",
  },
  {
    id: 5,
    name: "Phone Case",
    sold: 267,
    revenue: 8010,
    trend: "+5%",
    image: "📱",
  },
];

// Weekly data
const weeklyData = [
  { day: "Mon", sales: 14200000, orders: 45 },
  { day: "Tue", sales: 138000000, orders: 38 },
  { day: "Wed", sales: 510000000, orders: 52 },
  { day: "Thu", sales: 46000000, orders: 48 },
  { day: "Fri", sales: 620000000, orders: 65 },
  { day: "Sat", sales: 750000000, orders: 78 },
  { day: "Sun", sales: 580000000, orders: 60 },
];

// Category data
const categoryData = [
  { name: "Electronics", value: 45231, color: "#3b82f6" },
  { name: "Accessories", value: 32450, color: "#10b981" },
  { name: "Clothing", value: 21890, color: "#f59e0b" },
  { name: "Home", value: 18765, color: "#6366f1" },
  { name: "Sports", value: 15432, color: "#ec4899" },
];

// Chart instances
let weeklyChartInstance = null;
let categoryChartInstance = null;
let salesChartInstance = null;

// Initialize charts
const initCharts = () => {
  if (weeklySalesChart.value) {
    if (weeklyChartInstance) weeklyChartInstance.destroy();

    weeklyChartInstance = new Chart(weeklySalesChart.value, {
      type: "line",
      data: {
        labels: weeklyData.map((d) => d.day),
        datasets: [
          {
            label: "ຂາຍ (ກີບ)",
            data: weeklyData.map((d) => d.sales),
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "ລູກຄ້າສັ່ງຊື້ສິນຄ້າ",
            data: weeklyData.map((d) => d.orders),
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });
  }

  if (categoryPieChart.value) {
    if (categoryChartInstance) categoryChartInstance.destroy();

    categoryChartInstance = new Chart(categoryPieChart.value, {
      type: "doughnut",
      data: {
        labels: categoryData.map((d) => d.name),
        datasets: [
          {
            data: categoryData.map((d) => d.value),
            backgroundColor: categoryData.map((d) => d.color),
            borderWidth: 2,
            borderColor: "#fff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  }

  if (salesBarChart.value) {
    if (salesChartInstance) salesChartInstance.destroy();

    salesChartInstance = new Chart(salesBarChart.value, {
      type: "bar",
      data: {
        labels: categoryData.map((d) => d.name),
        datasets: [
          {
            label: "ຍອດຂາຍ (ກີບ)",
            data: categoryData.map((d) => d.value),
            backgroundColor: "#3b82f6",
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });
  }
};

const deleteProduct = (productId) => {
  if (confirm("Are you sure you want to delete this product?")) {
    const index = selectProductsAll.value.findIndex((p) => p.id === productId);
    if (index > -1) {
      selectProductsAll.value.splice(index, 1);
    }
  }
};

// Watch for tab changes and reinitialize charts
watch(activeTab, async () => {
  await nextTick();
  initCharts();
});

// Lifecycle
onMounted(async () => {
  if (!window.Chart) {
    await loadChartJS();
  }
  Chart = window.Chart;

  nextTick(() => {
    initCharts();
  });
});

watch(
  activeTab,
  async (newTab) => {
    if (newTab === "products") {
      await fetchSelectProducts();
      console.log("📦 Products Loaded:", selectProductsAll.value);
    }
  },
  { immediate: true }
);

// Load Chart.js from CDN
const loadChartJS = () => {
  return new Promise((resolve, reject) => {
    if (window.Chart) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Dialogs
const userDialog = ref(false);
const isEditing = ref(false);

const logout = () => {
  const token = useCookie("token");
  token.value = null;

  localStorage.removeItem("user");

  setTimeout(() => {
    navigateTo("/");
  }, 50);
};
import { useDisplay } from "vuetify";

// Vuetify display breakpoints
const { mobile } = useDisplay();

// Toggle drawer behavior

// Handle menu item click
const handleMenuClick = (itemId) => {
  activeTab.value = itemId;

  // Close drawer on mobile after selection
  if (mobile.value) {
    drawer.value = false;
  }
};

// Watch for screen size changes
watch(mobile, (newVal) => {
  if (newVal) {
    // Mobile: close drawer and disable rail
    drawer.value = false;
    rail.value = false;
  } else {
    // Desktop: open drawer
    drawer.value = true;
  }
});

const selectedPeriod = ref("week"); // Default to week

// Mock data - Replace with your API calls
const statsData = {
  day: {
    totalRevenue: 12450,
    revenueChange: 8.5,
    conversionRate: 2.8,
    conversionChange: 0.3,
    totalTransactions: 145,
    transactionChange: 15.2,
  },
  week: {
    totalRevenue: 89500,
    revenueChange: 4.3,
    conversionRate: 3.24,
    conversionChange: 0.5,
    totalTransactions: 1543,
    transactionChange: 12,
  },
  month: {
    totalRevenue: 356000,
    revenueChange: -2.1,
    conversionRate: 3.45,
    conversionChange: -0.8,
    totalTransactions: 5420,
    transactionChange: 8.5,
  },
  year: {
    totalRevenue: 4250000,
    revenueChange: 18.6,
    conversionRate: 3.67,
    conversionChange: 1.2,
    totalTransactions: 68540,
    transactionChange: 22.4,
  },
};

// FIXED: Add computed property for stats based on selected period
const salesStats = computed(() => {
  return statsData[selectedPeriod.value];
});

const getPeriodText = computed(() => {
  const periods = {
    day: "ຈາກມື້ກ່ອນ",
    week: "ຈາກອາທິດກ່ອນ",
    month: "ຈາກເດືອນກ່ອນ",
    year: "ຈາກປີກ່ອນ",
  };
  return periods[selectedPeriod.value];
});

// Watch for period changes and fetch data
watch(selectedPeriod, async (newPeriod) => {});
</script>
