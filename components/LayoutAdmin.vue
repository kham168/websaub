<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      :rail="rail"
      permanent
      color="primary"
      theme="dark"
    >
      <div class="d-flex align-center justify-space-between pa-3">
        <div v-if="!rail" class="d-flex align-center">
          <v-icon class="mr-2">mdi-view-dashboard</v-icon>
          <span class="text-h6 font-weight-bold">Admin Panel</span>
        </div>
        <v-btn icon variant="text" @click="rail = !rail" size="small">
          <v-icon>{{ rail ? "mdi-chevron-right" : "mdi-chevron-left" }}</v-icon>
        </v-btn>
      </div>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.id"
          :prepend-icon="item.icon"
          :title="item.name"
          :value="item.id"
          :active="activeTab === item.id"
          @click="activeTab = item.id"
          rounded="xl"
        ></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2" v-if="!rail">
          <v-list-item
            prepend-icon="mdi-account-circle"
            title="Admin User"
            subtitle="admin@company.com"
          ></v-list-item>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar color="primary" elevation="2" prominent>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title class="text-h5 font-weight-bold">
        <v-icon class="mr-2">{{ currentMenuItem?.icon }}</v-icon>
        {{ currentMenuItem?.name }}
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-text-field
        v-model="searchQuery"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search..."
        hide-details
        density="compact"
        variant="solo"
        flat
        class="mr-4"
        style="max-width: 350px"
        bg-color="rgba(255, 255, 255, 0.2)"
        rounded="lg"
      ></v-text-field>

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
        <v-list>
          <v-list-item
            prepend-icon="mdi-account-circle"
            title="My Profile"
            subtitle="View your profile"
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
          ></v-list-item>
        </v-list>
      </v-menu>

      <template v-slot:extension>
        <v-tabs v-model="activeTab" align-tabs="start" color="white">
          <v-tab value="dashboard">
            <v-icon start>mdi-view-dashboard</v-icon>
            Dashboard
          </v-tab>
          <v-tab value="sales">
            <v-icon start>mdi-chart-line</v-icon>
            Sales
          </v-tab>
          <v-tab value="products">
            <v-icon start>mdi-package-variant</v-icon>
            Products
          </v-tab>
          <v-tab value="orders">
            <v-icon start>mdi-cart</v-icon>
            Orders
          </v-tab>
          <v-tab value="customers">
            <v-icon start>mdi-account-group</v-icon>
            Customers
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
                      <div class="text-h4 font-weight-bold">
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
                  📊 Weekly Sales Overview
                </v-card-title>
                <v-card-text>
                  <canvas ref="weeklySalesChart" height="300"></canvas>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card elevation="2">
                <v-card-title class="text-h6 font-weight-bold">
                  📈 Sales by Category
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
                    >🏆 Best Selling Products</span
                  >
                  <v-btn color="primary" variant="text">View All</v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-table>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Product</th>
                      <th>Units Sold</th>
                      <th>Revenue</th>
                      <th>Trend</th>
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
                  💰 Detailed Sales Report
                </v-card-title>
                <v-card-text>
                  <canvas ref="salesBarChart" height="400"></canvas>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="mt-4">
            <v-col cols="12" md="4">
              <v-card color="blue-lighten-5" elevation="2">
                <v-card-text>
                  <div class="text-overline text-grey-darken-1">
                    Average Order Value
                  </div>
                  <div class="text-h4 font-weight-bold mt-2">$89.50</div>
                  <div class="text-body-2 text-success mt-2">
                    <v-icon size="small">mdi-trending-up</v-icon> +4.3% from
                    last week
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card color="green-lighten-5" elevation="2">
                <v-card-text>
                  <div class="text-overline text-grey-darken-1">
                    Conversion Rate
                  </div>
                  <div class="text-h4 font-weight-bold mt-2">3.24%</div>
                  <div class="text-body-2 text-success mt-2">
                    <v-icon size="small">mdi-trending-up</v-icon> +0.5% from
                    last week
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card color="purple-lighten-5" elevation="2">
                <v-card-text>
                  <div class="text-overline text-grey-darken-1">
                    Total Transactions
                  </div>
                  <div class="text-h4 font-weight-bold mt-2">1,543</div>
                  <div class="text-body-2 text-success mt-2">
                    <v-icon size="small">mdi-trending-up</v-icon> +12% from last
                    week
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- Products View -->
        <div v-if="activeTab === 'products'">
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

          <v-row class="mt-2" dense>
            <v-col
              v-for="product in sampleProducts"
              :key="product.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card class="pa-3 d-flex flex-column h-100" elevation="3">
                <!-- Image -->
                <v-avatar
                  size="120"
                  class="mx-auto mb-3"
                  color="grey-lighten-3"
                >
                  <span class="text-h4">{{ product.image }}</span>
                </v-avatar>

                <!-- Title -->
                <div class="text-center font-weight-bold text-h6 mb-2">
                  {{ product.name }}
                </div>

                <!-- Category + Phone -->
                <div class="text-center mb-3">
                  <v-chip
                    size="small"
                    color="success"
                    variant="tonal"
                    class="mr-2"
                  >
                    {{ product.category }}
                  </v-chip>
                  <v-chip size="small" color="info" variant="tonal">
                    <v-icon start size="small">mdi-phone</v-icon>
                    {{ product.phone }}
                  </v-chip>
                </div>
                <!-- Chips -->
                <div class="d-flex flex-wrap gap-2 mb-3 justify-center">
                  <v-chip
                    size="x-small"
                    prepend-icon="mdi-map-marker"
                    color="primary"
                    class="mr-2"
                  >
                    {{ product.province }}
                  </v-chip>
                  <v-chip
                    size="x-small"
                    prepend-icon="mdi-office-building"
                    color="primary"
                    class="mr-2"
                  >
                    {{ product.district }}
                  </v-chip>
                  <v-chip
                    size="x-small"
                    prepend-icon="mdi-home-group"
                    color="primary"
                  >
                    {{ product.village }}
                  </v-chip>
                </div>
                <!-- Price & Stock -->
                <div class="d-flex justify-space-around my-2">
                  <div class="text-center">
                    <div class="text-caption text-grey">Price</div>
                    <div class="font-weight-bold text-h6">
                      ${{ product.price }}
                    </div>
                  </div>

                  <div class="text-center">
                    <div class="text-caption text-grey">Stock</div>
                    <div class="font-weight-bold text-h6">
                      {{ product.stock }}
                    </div>
                  </div>
                </div>

                <v-divider class="my-3"></v-divider>

                <!-- Action Buttons -->
                <div class="d-flex justify-center gap-2 flex-wrap">
                  <v-btn
                    color="purple"
                    variant="tonal"
                    size="small"
                    :href="product.videoPath"
                    target="_blank"
                  >
                    <v-icon start>mdi-video</v-icon> Video
                  </v-btn>

                  <v-btn
                    class="ml-2"
                    color="red"
                    variant="tonal"
                    size="small"
                    :href="product.mapUrl"
                    target="_blank"
                  >
                    <v-icon start>mdi-map</v-icon> Map
                  </v-btn>
                </div>

                <!-- Edit + Delete Buttons -->
                <div class="d-flex justify-center gap-2 mt-3">
                  <v-btn
                    color="primary"
                    variant="outlined"
                    size="small"
                    @click="editProduct(product)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                    class="ml-2"
                    color="error"
                    variant="outlined"
                    size="small"
                    @click="deleteProduct(product.id)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- Other Tabs Placeholder -->
        <div
          v-if="
            ['orders', 'customers', 'analytics', 'settings'].includes(activeTab)
          "
        >
          <v-card elevation="2">
            <v-card-title class="text-h6 font-weight-bold">
              {{ currentMenuItem?.name }}
            </v-card-title>
            <v-card-text>
              <v-alert type="info" variant="tonal">
                This section is under development...
              </v-alert>
            </v-card-text>
          </v-card>
        </div>
      </v-container>
    </v-main>

    <!-- Add Product Modal -->
    <v-dialog v-model="showProductModal" max-width="800px" persistent>
      <v-card>
        <v-card-title
          class="text-h5 font-weight-bold d-flex justify-space-between align-center"
        >
          <span>Add New Product</span>
          <v-btn icon variant="text" @click="closeAddModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text class="pt-6">
          <v-form ref="productForm">
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="newProduct.province"
                  label="Province"
                  variant="outlined"
                  prepend-inner-icon="mdi-map-marker"
                  placeholder="e.g., Vientiane"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="newProduct.district"
                  label="District"
                  variant="outlined"
                  prepend-inner-icon="mdi-office-building"
                  placeholder="e.g., Chanthabouly"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="newProduct.village"
                  label="Village"
                  variant="outlined"
                  prepend-inner-icon="mdi-home-group"
                  placeholder="e.g., Phonxay"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newProduct.name"
                  label="Product Name"
                  variant="outlined"
                  required
                  prepend-inner-icon="mdi-package-variant"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="newProduct.type"
                  :items="types"
                  label="Type"
                  variant="outlined"
                  prepend-inner-icon="mdi-shape"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newProduct.price"
                  label="Price ($)"
                  type="number"
                  variant="outlined"
                  prepend-inner-icon="mdi-currency-usd"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newProduct.stock"
                  label="Stock Quantity"
                  type="number"
                  variant="outlined"
                  prepend-inner-icon="mdi-package-variant-closed"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newProduct.phone"
                  label="Phone Number"
                  type="tel"
                  variant="outlined"
                  prepend-inner-icon="mdi-phone"
                  placeholder="+856 20 5555 1234"
                ></v-text-field>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="12">
                <h4>
                  +
                  <v-span class="text-primary text-decoration-underline">
                    Donation Money</v-span
                  >
                </h4>
              </v-col>

              <v-col cols="12" md="5">
                <v-text-field
                  v-model="newProduct.donation_Money"
                  label="Donation Money"
                  type="number"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-menu
                  v-model="startMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                >
                  <template #activator="{ props }">
                    <v-text-field
                      v-bind="props"
                      v-model="newProduct.startDate"
                      label="Start Date"
                      variant="outlined"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                    ></v-text-field>
                  </template>

                  <v-date-picker
                    v-model="startRaw"
                    @update:model-value="(date) => selectStartDate(date)"
                    show-adjacent-months
                    color="primary"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-span class="mt-6 text-blue font-weight-bold">to</v-span>
              <v-col cols="12" md="3">
                <v-menu
                  v-model="endMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                >
                  <template #activator="{ props }">
                    <v-text-field
                      v-bind="props"
                      v-model="newProduct.endDate"
                      label="End Date"
                      variant="outlined"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                    ></v-text-field>
                  </template>

                  <v-date-picker
                    v-model="endRaw"
                    @update:model-value="(date) => selectEndDate(date)"
                    show-adjacent-months
                    color="primary"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="newProduct.Detail_Donation_Money"
                  :items="details_Donations"
                  label="Please select your Donation "
                  variant="outlined"
                  prepend-inner-icon="mdi-shape"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newProduct.videoPath"
                  label="Video URL"
                  type="url"
                  variant="outlined"
                  prepend-inner-icon="mdi-video"
                  placeholder="https://example.com/video.mp4"
                  hint="Enter the full URL to the product video"
                  persistent-hint
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="newProduct.mapUrl"
                  label="Google Maps URL"
                  type="url"
                  variant="outlined"
                  prepend-inner-icon="mdi-map"
                  placeholder="https://maps.google.com/?q=17.9757,102.6331"
                  hint="Enter Google Maps link or coordinates"
                  persistent-hint
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newProduct.name"
                  label="Area"
                  variant="outlined"
                  required
                  prepend-inner-icon="mdi-ruler-square"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="newProduct.description"
                  label="Description"
                  variant="outlined"
                  rows="4"
                  prepend-inner-icon="mdi-text"
                ></v-textarea>
              </v-col>

              <v-col cols="12">
                <v-card variant="outlined" class="pa-4">
                  <v-file-input
                    v-model="productImages"
                    label="Product Images"
                    multiple
                    accept="image/*"
                    prepend-icon="mdi-camera"
                    variant="outlined"
                    show-size
                    @change="handleFileSelect"
                  ></v-file-input>

                  <v-row v-if="uploadedImages.length" class="mt-2">
                    <v-col
                      v-for="(img, idx) in uploadedImages"
                      :key="idx"
                      cols="3"
                    >
                      <v-card>
                        <v-img :src="img" height="100" cover></v-img>
                        <v-card-actions>
                          <v-btn
                            size="small"
                            color="error"
                            block
                            @click="removeImage(idx)"
                          >
                            Remove
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="closeAddModal">
            Cancel
          </v-btn>
          <v-btn color="primary" variant="elevated" @click="handleAddProduct">
            Add Product
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Product Modal -->
    <!-- <v-dialog v-model="showEditModal" max-width="800px" persistent>
      <v-card>
        <v-card-title
          class="text-h5 font-weight-bold d-flex justify-space-between align-center"
        >
          <span>Edit Product</span>
          <v-btn icon variant="text" @click="closeEditModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text class="pt-6" v-if="editingProduct">
          <v-form ref="editProductForm">
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="editingProduct.province"
                  label="Province"
                  variant="outlined"
                  prepend-inner-icon="mdi-map-marker"
                  placeholder="e.g., Vientiane"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="editingProduct.district"
                  label="District"
                  variant="outlined"
                  prepend-inner-icon="mdi-office-building"
                  placeholder="e.g., Chanthabouly"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="editingProduct.village"
                  label="Village"
                  variant="outlined"
                  prepend-inner-icon="mdi-home-group"
                  placeholder="e.g., Phonxay"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="editingProduct.name"
                  label="Product Name"
                  variant="outlined"
                  required
                  prepend-inner-icon="mdi-package-variant"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="editingProduct.category"
                  :items="categories"
                  label="Category"
                  variant="outlined"
                  prepend-inner-icon="mdi-shape"
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingProduct.price"
                  label="Price ($)"
                  type="number"
                  variant="outlined"
                  prepend-inner-icon="mdi-currency-usd"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingProduct.stock"
                  label="Stock Quantity"
                  type="number"
                  variant="outlined"
                  prepend-inner-icon="mdi-package-variant-closed"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingProduct.phone"
                  label="Phone Number"
                  type="tel"
                  variant="outlined"
                  prepend-inner-icon="mdi-phone"
                  placeholder="+856 20 5555 1234"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="editingProduct.videoPath"
                  label="Video URL"
                  type="url"
                  variant="outlined"
                  prepend-inner-icon="mdi-video"
                  placeholder="https://example.com/video.mp4"
                  hint="Enter the full URL to the product video"
                  persistent-hint
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="editingProduct.mapUrl"
                  label="Google Maps URL"
                  type="url"
                  variant="outlined"
                  prepend-inner-icon="mdi-map"
                  placeholder="https://maps.google.com/?q=17.9757,102.6331"
                  hint="Enter Google Maps link or coordinates"
                  persistent-hint
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="editingProduct.description"
                  label="Description"
                  variant="outlined"
                  rows="4"
                  prepend-inner-icon="mdi-text"
                ></v-textarea>
              </v-col>

              <!-- Image Section --
              <v-col cols="12">
                <v-card variant="outlined" class="pa-4">
                  <!-- Existing Images (Read-only) --
                  <div v-if="existingImages.length" class="mb-4">
                    <div class="text-subtitle-2 mb-2 text-grey-darken-1">
                      Current Images
                    </div>
                    <v-row>
                      <v-col
                        v-for="(img, idx) in existingImages"
                        :key="'existing-' + idx"
                        cols="3"
                      >
                        <v-card>
                          <v-img :src="img" height="100" cover></v-img>
                          <v-card-actions>
                            <v-btn
                              size="small"
                              color="error"
                              block
                              @click="removeExistingImage(idx)"
                            >
                              Remove
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>

                  <!-- Add New Images --
                  <v-file-input
                    v-model="editProductImages"
                    label="Add New Images"
                    multiple
                    accept="image/*"
                    prepend-icon="mdi-camera-plus"
                    variant="outlined"
                    show-size
                    @change="handleEditFileSelect"
                  ></v-file-input>

                  <!-- New Images Preview --
                  <v-row v-if="newEditImages.length" class="mt-2">
                    <v-col
                      v-for="(img, idx) in newEditImages"
                      :key="'new-' + idx"
                      cols="3"
                    >
                      <v-card>
                        <v-img :src="img" height="100" cover></v-img>
                        <v-badge
                          color="success"
                          content="NEW"
                          location="top right"
                        >
                        </v-badge>
                        <v-card-actions>
                          <v-btn
                            size="small"
                            color="error"
                            block
                            @click="removeNewEditImage(idx)"
                          >
                            Remove
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="closeEditModal">
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            variant="elevated"
            @click="handleUpdateProduct"
          >
            Update Product
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

    <!-- Edit Product Modal -->
    <v-dialog v-model="showEditModal" max-width="800px" persistent>
      <v-card>
        <v-card-title
          class="text-h5 font-weight-bold d-flex justify-space-between align-center"
        >
          <span>Edit Product</span>
          <v-btn icon variant="text" @click="closeEditModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text class="pt-6" v-if="editingProduct">
          <v-form ref="editProductForm">
            <v-row>
              <!-- Province / District / Village -->
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="editingProduct.province"
                  label="Province"
                  variant="outlined"
                  prepend-inner-icon="mdi-map-marker"
                  placeholder="e.g., Vientiane"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="editingProduct.district"
                  label="District"
                  variant="outlined"
                  prepend-inner-icon="mdi-office-building"
                  placeholder="e.g., Chanthabouly"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="editingProduct.village"
                  label="Village"
                  variant="outlined"
                  prepend-inner-icon="mdi-home-group"
                  placeholder="e.g., Phonxay"
                ></v-text-field>
              </v-col>

              <!-- Product Name / Type -->
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingProduct.name"
                  label="Product Name"
                  variant="outlined"
                  required
                  prepend-inner-icon="mdi-package-variant"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="editingProduct.type"
                  :items="types"
                  label="Type"
                  variant="outlined"
                  prepend-inner-icon="mdi-shape"
                ></v-select>
              </v-col>

              <!-- Price / Stock -->
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingProduct.price"
                  label="Price ($)"
                  type="number"
                  variant="outlined"
                  prepend-inner-icon="mdi-currency-usd"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingProduct.stock"
                  label="Stock Quantity"
                  type="number"
                  variant="outlined"
                  prepend-inner-icon="mdi-package-variant-closed"
                ></v-text-field>
              </v-col>

              <!-- Phone -->
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingProduct.phone"
                  label="Phone Number"
                  type="tel"
                  variant="outlined"
                  prepend-inner-icon="mdi-phone"
                  placeholder="+856 20 5555 1234"
                ></v-text-field>
              </v-col>

              <!-- Donation Money Section -->
              <v-divider></v-divider>
              <v-col cols="12">
                <h4>
                  +
                  <v-span class="text-primary text-decoration-underline">
                    Donation Money
                  </v-span>
                </h4>
              </v-col>
              <v-col cols="12" md="5">
                <v-text-field
                  v-model="editingProduct.donation_Money"
                  label="Donation Money"
                  type="number"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-menu
                  v-model="startMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                >
                  <template #activator="{ props }">
                    <v-text-field
                      v-bind="props"
                      v-model="editingProduct.startDate"
                      label="Start Date"
                      variant="outlined"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="startRaw"
                    @update:model-value="(date) => selectStartDate(date)"
                    show-adjacent-months
                    color="primary"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-span class="mt-6 text-blue font-weight-bold">to</v-span>
              <v-col cols="12" md="3">
                <v-menu
                  v-model="endMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                >
                  <template #activator="{ props }">
                    <v-text-field
                      v-bind="props"
                      v-model="editingProduct.endDate"
                      label="End Date"
                      variant="outlined"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="endRaw"
                    @update:model-value="(date) => selectEndDate(date)"
                    show-adjacent-months
                    color="primary"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="editingProduct.Detail_Donation_Money"
                  :items="details_Donations"
                  label="Please select your Donation"
                  variant="outlined"
                  prepend-inner-icon="mdi-shape"
                ></v-select>
              </v-col>

              <!-- Video / Map / Area -->
              <v-col cols="12">
                <v-text-field
                  v-model="editingProduct.videoPath"
                  label="Video URL"
                  type="url"
                  variant="outlined"
                  prepend-inner-icon="mdi-video"
                  placeholder="https://example.com/video.mp4"
                  hint="Enter the full URL to the product video"
                  persistent-hint
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editingProduct.mapUrl"
                  label="Google Maps URL"
                  type="url"
                  variant="outlined"
                  prepend-inner-icon="mdi-map"
                  placeholder="https://maps.google.com/?q=17.9757,102.6331"
                  hint="Enter Google Maps link or coordinates"
                  persistent-hint
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingProduct.area"
                  label="Area"
                  variant="outlined"
                  required
                  prepend-inner-icon="mdi-ruler-square"
                ></v-text-field>
              </v-col>

              <!-- Description -->
              <v-col cols="12">
                <v-textarea
                  v-model="editingProduct.description"
                  label="Description"
                  variant="outlined"
                  rows="4"
                  prepend-inner-icon="mdi-text"
                ></v-textarea>
              </v-col>

              <!-- Images Section -->
              <v-col cols="12">
                <v-card variant="outlined" class="pa-4">
                  <!-- Existing Images -->
                  <div v-if="existingImages.length" class="mb-4">
                    <div class="text-subtitle-2 mb-2 text-grey-darken-1">
                      Current Images
                    </div>
                    <v-row>
                      <v-col
                        v-for="(img, idx) in existingImages"
                        :key="'existing-' + idx"
                        cols="3"
                      >
                        <v-card>
                          <v-img :src="img" height="100" cover></v-img>
                          <v-card-actions>
                            <v-btn
                              size="small"
                              color="error"
                              block
                              @click="removeExistingImage(idx)"
                            >
                              Remove
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>

                  <!-- Add New Images -->
                  <v-file-input
                    v-model="editProductImages"
                    label="Add New Images"
                    multiple
                    accept="image/*"
                    prepend-icon="mdi-camera-plus"
                    variant="outlined"
                    show-size
                    @change="handleEditFileSelect"
                  ></v-file-input>

                  <!-- New Images Preview -->
                  <v-row v-if="newEditImages.length" class="mt-2">
                    <v-col
                      v-for="(img, idx) in newEditImages"
                      :key="'new-' + idx"
                      cols="3"
                    >
                      <v-card>
                        <v-img :src="img" height="100" cover></v-img>
                        <v-badge
                          color="success"
                          content="NEW"
                          location="top right"
                        >
                        </v-badge>
                        <v-card-actions>
                          <v-btn
                            size="small"
                            color="error"
                            block
                            @click="removeNewEditImage(idx)"
                          >
                            Remove
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="closeEditModal">
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            variant="elevated"
            @click="handleUpdateProduct"
          >
            Update Product
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from "vue";

let Chart = null;

// State
const drawer = ref(true);
const rail = ref(false);
const activeTab = ref("dashboard");
const showProductModal = ref(false);
const showEditModal = ref(false);
const searchQuery = ref("");
const productImages = ref([]);
const uploadedImages = ref([]);
const editingProduct = ref(null);

// Edit image refs
const editProductImages = ref([]);
const existingImages = ref([]); // Original images from the product
const newEditImages = ref([]); // New images being added

// Chart refs
const weeklySalesChart = ref(null);
const categoryPieChart = ref(null);
const salesBarChart = ref(null);

// New product form
const newProduct = ref({
  name: "",
  Detail_Donation_Money: "",
  type: "",
  price: "",
  stock: "",
  donation_Money: 0,
  description: "",
  province: "",
  district: "",
  village: "",
  phone: "",
  videoPath: "",
  mapUrl: "",
  image: "📦",
  area: "",
  startDate: "",
  endDate: "",
});
// function date format
const startMenu = ref(false);
const endMenu = ref(false);
const startRaw = ref(null);
const endRaw = ref(null);
function selectStartDate(date) {
  const formatted = new Date(date).toDateString();

  newProduct.startDate = formatted;
  startMenu.value = false;
}

function selectEndDate(date) {
  const formatted = new Date(date).toDateString();

  newProduct.endDate = formatted;
  endMenu.value = false;
}

const details_Donations = [
  "Electronics",
  "Accessories",
  "Clothing",
  "Home",
  "Sports",
];
const types = ["Electronics", "Accessories", "Clothing", "Home", "Sports"];

// Menu items
const menuItems = [
  { id: "dashboard", name: "Dashboard", icon: "mdi-view-dashboard" },
  { id: "sales", name: "Sales Report", icon: "mdi-chart-line" },
  { id: "products", name: "Products", icon: "mdi-package-variant" },
  { id: "orders", name: "Orders", icon: "mdi-cart" },
  { id: "customers", name: "Customers", icon: "mdi-account-group" },
  { id: "analytics", name: "Analytics", icon: "mdi-chart-bar" },
  { id: "settings", name: "Settings", icon: "mdi-cog" },
];

// Stats
const stats = [
  {
    label: "Total Revenue",
    value: "$124,563",
    change: "+12%",
    icon: "mdi-currency-usd",
    color: "blue",
    avatarColor: "blue-lighten-4",
  },
  {
    label: "Total Orders",
    value: "1,543",
    change: "+8%",
    icon: "mdi-cart",
    color: "green",
    avatarColor: "green-lighten-4",
  },
  {
    label: "Products Sold",
    value: "8,234",
    change: "+15%",
    icon: "mdi-package-variant",
    color: "purple",
    avatarColor: "purple-lighten-4",
  },
  {
    label: "New Customers",
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

// Sample products
const sampleProducts = ref([
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 199,
    stock: 45,
    image: "🎧",
    province: "Vientiane",
    district: "Chanthabouly",
    village: "Phonxay",
    phone: "+856 20 5555 1234",
    videoPath: "https://example.com/video1.mp4",
    mapUrl: "https://maps.google.com/?q=17.9757,102.6331",
    images: [],
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 299,
    stock: 32,
    image: "⌚",
    province: "Vientiane",
    district: "Sisattanak",
    village: "Nongbone",
    phone: "+856 20 5555 5678",
    videoPath: "https://example.com/video2.mp4",
    mapUrl: "https://maps.google.com/?q=17.9689,102.6137",
    images: [],
  },
  {
    id: 3,
    name: "Laptop Stand",
    category: "Accessories",
    price: 89,
    stock: 67,
    image: "💻",
    province: "Vientiane",
    district: "Xaysettha",
    village: "Dongdok",
    phone: "+856 20 5555 9012",
    videoPath: "https://example.com/video3.mp4",
    mapUrl: "https://maps.google.com/?q=18.0285,102.6428",
    images: [],
  },
  {
    id: 4,
    name: "USB-C Cable",
    category: "Accessories",
    price: 29,
    stock: 120,
    image: "🔌",
    province: "Vientiane",
    district: "Hadxaifong",
    village: "Dongpaina",
    phone: "+856 20 5555 3456",
    videoPath: "https://example.com/video4.mp4",
    mapUrl: "https://maps.google.com/?q=18.0735,102.5644",
    images: [],
  },
]);

// Weekly data
const weeklyData = [
  { day: "Mon", sales: 4200, orders: 45 },
  { day: "Tue", sales: 3800, orders: 38 },
  { day: "Wed", sales: 5100, orders: 52 },
  { day: "Thu", sales: 4600, orders: 48 },
  { day: "Fri", sales: 6200, orders: 65 },
  { day: "Sat", sales: 7500, orders: 78 },
  { day: "Sun", sales: 5800, orders: 60 },
];

// Category data
const categoryData = [
  { name: "Electronics", value: 45231, color: "#3b82f6" },
  { name: "Accessories", value: 32450, color: "#10b981" },
  { name: "Clothing", value: 21890, color: "#f59e0b" },
  { name: "Home", value: 18765, color: "#6366f1" },
  { name: "Sports", value: 15432, color: "#ec4899" },
];

// Computed
const currentMenuItem = computed(() => {
  return menuItems.find((item) => item.id === activeTab.value);
});

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
            label: "Sales ($)",
            data: weeklyData.map((d) => d.sales),
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "Orders",
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
            label: "Sales Amount ($)",
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

// File handling for Add Product
const handleFileSelect = (event) => {
  const files = productImages.value;
  if (files && files.length) {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedImages.value.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }
};

const removeImage = (index) => {
  uploadedImages.value.splice(index, 1);
};

// File handling for Edit Product
const handleEditFileSelect = (event) => {
  const files = editProductImages.value;
  if (files && files.length) {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newEditImages.value.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }
};

const removeExistingImage = (index) => {
  existingImages.value.splice(index, 1);
};

const removeNewEditImage = (index) => {
  newEditImages.value.splice(index, 1);
};

// Product functions
const handleAddProduct = () => {
  if (
    newProduct.value.name &&
    newProduct.value.price &&
    newProduct.value.stock
  ) {
    const product = {
      ...newProduct.value,
      id: Date.now(),
      price: parseFloat(newProduct.value.price),
      stock: parseInt(newProduct.value.stock),
      images: uploadedImages.value,
    };
    sampleProducts.value.push(product);
    closeAddModal();
  }
};

const editProduct = (product) => {
  editingProduct.value = { ...product };

  // Separate existing images from the product
  if (product.images && Array.isArray(product.images)) {
    existingImages.value = [...product.images];
  } else {
    existingImages.value = [];
  }

  // Clear new images
  newEditImages.value = [];
  editProductImages.value = [];
  showEditModal.value = true;
};

const deleteProduct = (productId) => {
  if (confirm("Are you sure you want to delete this product?")) {
    const index = sampleProducts.value.findIndex((p) => p.id === productId);
    if (index > -1) {
      sampleProducts.value.splice(index, 1);
    }
  }
};

const handleUpdateProduct = () => {
  if (editingProduct.value) {
    const index = sampleProducts.value.findIndex(
      (p) => p.id === editingProduct.value.id
    );
    if (index > -1) {
      // Combine existing images with new images
      const allImages = [...existingImages.value, ...newEditImages.value];

      sampleProducts.value[index] = {
        ...editingProduct.value,
        images: allImages,
      };
    }
    closeEditModal();
  }
};

const closeAddModal = () => {
  showProductModal.value = false;
  newProduct.value = {
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    province: "",
    district: "",
    village: "",
    phone: "",
    videoPath: "",
    mapUrl: "",
    image: "📦",
  };
  uploadedImages.value = [];
  productImages.value = [];
};

const closeEditModal = () => {
  showEditModal.value = false;
  editingProduct.value = null;
  existingImages.value = [];
  newEditImages.value = [];
  editProductImages.value = [];
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
</script>

<style scoped>
.border-b {
  border-bottom: 1px solid #e0e0e0;
}
</style>
