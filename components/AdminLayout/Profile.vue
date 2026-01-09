<template>
  <!-- Full Page Profile View (No Dialog Wrapper) -->
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <!-- Header -->
          <v-card-title class="d-flex align-center bg-primary pa-4 text-white">
            <v-icon size="28" class="mr-3" color="white"
              >mdi-account-circle</v-icon
            >
            <span class="text-h5">{{ profile.name }}</span>
          </v-card-title>

          <v-divider></v-divider>

          <!-- Profile Content -->
          <v-card-text class="pa-6">
            <!-- User Information Section -->
            <v-row>
              <v-col cols="12" md="4" class="text-center">
                <div class="position-relative d-inline-block">
                  <v-avatar size="150" class="mb-4">
                    <v-img
                      :src="profile.avatar || 'https://via.placeholder.com/150'"
                      alt="Profile Picture"
                    ></v-img>
                  </v-avatar>
                  <!-- Edit Avatar Button -->
                  <v-btn
                    icon
                    size="small"
                    color="primary"
                    class="position-absolute avatar-edit-btn"
                    @click="openImageEdit"
                  >
                    <v-icon size="20">mdi-camera</v-icon>
                  </v-btn>
                </div>
                <div class="text-h6">{{ profile.status }}</div>
                <div class="text-caption text-medium-emphasis">
                  {{ profile.email }}
                </div>
              </v-col>

              <v-col cols="12" md="8">
                <v-card variant="outlined" class="mb-4">
                  <v-card-title
                    class="text-subtitle-1 bg-grey-lighten-4 d-flex justify-space-between align-center"
                  >
                    <div>
                      <v-icon class="mr-2">mdi-information</v-icon>
                      Personal Details
                    </div>
                    <v-btn
                      size="small"
                      color="primary"
                      variant="text"
                      prepend-icon="mdi-pencil"
                      @click="editMode = !editMode"
                    >
                      {{ editMode ? "Cancel" : "Edit" }}
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="6">
                        <div class="text-caption text-medium-emphasis">
                          Name
                        </div>
                        <v-text-field
                          v-if="editMode"
                          v-model="editableProfile.name"
                          density="compact"
                          variant="outlined"
                          hide-details
                        ></v-text-field>
                        <div v-else class="text-body-2">{{ profile.name }}</div>
                      </v-col>
                      <v-col cols="6">
                        <div class="text-caption text-medium-emphasis">
                          Surname
                        </div>
                        <v-text-field
                          v-if="editMode"
                          v-model="editableProfile.surName"
                          density="compact"
                          variant="outlined"
                          hide-details
                        ></v-text-field>
                        <div v-else class="text-body-2">
                          {{ profile.surName }}
                        </div>
                      </v-col>
                      <v-col cols="12">
                        <div class="text-caption text-medium-emphasis">
                          Email
                        </div>
                        <v-text-field
                          v-if="editMode"
                          v-model="editableProfile.email"
                          density="compact"
                          variant="outlined"
                          hide-details
                        ></v-text-field>
                        <div v-else class="text-body-2">
                          {{ profile.email }}
                        </div>
                      </v-col>
                    </v-row>
                    <v-row dense class="mt-2">
                      <v-col cols="6">
                        <div class="text-caption text-medium-emphasis">
                          Phone
                        </div>
                        <v-text-field
                          v-if="editMode"
                          v-model="editableProfile.phone"
                          density="compact"
                          variant="outlined"
                          hide-details
                        ></v-text-field>
                        <div v-else class="text-body-2">
                          {{ profile.phone }}
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="text-caption text-medium-emphasis">
                          Role
                        </div>
                        <v-select
                          v-if="editMode"
                          v-model="editableProfile.role"
                          :items="['Administrator', 'Manager', 'User']"
                          density="compact"
                          variant="outlined"
                          hide-details
                        ></v-select>
                        <div v-else class="text-body-2">{{ profile.role }}</div>
                      </v-col>
                      <v-col cols="12">
                        <div class="text-caption text-medium-emphasis">
                          Address
                        </div>
                        <v-textarea
                          v-if="editMode"
                          v-model="editableProfile.address"
                          density="compact"
                          variant="outlined"
                          rows="2"
                          hide-details
                        ></v-textarea>
                        <div v-else class="text-body-2">
                          {{ profile.address }}
                        </div>
                      </v-col>
                    </v-row>

                    <v-divider class="my-3"></v-divider>

                    <!-- Payment Information Section -->
                    <div class="text-subtitle-2 mb-3 font-weight-bold">
                      <v-icon class="mr-2" size="small">mdi-credit-card</v-icon>
                      Payment Information
                    </div>
                    <v-row dense>
                      <v-col cols="12" md="6">
                        <div class="text-caption text-medium-emphasis">
                          Account Number
                        </div>
                        <v-text-field
                          v-if="editMode"
                          v-model="editableProfile.accountNumber"
                          density="compact"
                          variant="outlined"
                          hide-details
                          prepend-inner-icon="mdi-bank"
                        ></v-text-field>
                        <div v-else class="text-body-2">
                          {{ profile.accountNumber || "Not set" }}
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="text-caption text-medium-emphasis">
                          Account Name
                        </div>
                        <v-text-field
                          v-if="editMode"
                          v-model="editableProfile.accountName"
                          density="compact"
                          variant="outlined"
                          hide-details
                          prepend-inner-icon="mdi-account"
                        ></v-text-field>
                        <div v-else class="text-body-2">
                          {{ profile.accountName || "Not set" }}
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="text-caption text-medium-emphasis">
                          Bank Name
                        </div>
                        <v-text-field
                          v-if="editMode"
                          v-model="editableProfile.bankName"
                          density="compact"
                          variant="outlined"
                          hide-details
                          prepend-inner-icon="mdi-bank"
                        ></v-text-field>
                        <div v-else class="text-body-2">
                          {{ profile.bankName || "Not set" }}
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="text-caption text-medium-emphasis">
                          Payment QR Code
                        </div>
                        <div v-if="editMode" class="d-flex gap-2 align-center">
                          <v-text-field
                            v-model="editableProfile.qrCode"
                            density="compact"
                            variant="outlined"
                            hide-details
                            prepend-inner-icon="mdi-qrcode"
                            placeholder="QR Code URL"
                          ></v-text-field>
                          <v-btn
                            icon
                            size="small"
                            color="primary"
                            @click="openQrUpload"
                          >
                            <v-icon>mdi-upload</v-icon>
                          </v-btn>
                        </div>
                        <div v-else>
                          <v-card
                            v-if="profile.qrCode"
                            variant="outlined"
                            max-width="150"
                            @click="showQrPreview = true"
                            class="cursor-pointer"
                          >
                            <v-img
                              :src="profile.qrCode"
                              aspect-ratio="1"
                            ></v-img>
                          </v-card>
                          <div v-else class="text-body-2 text-medium-emphasis">
                            Not set
                          </div>
                        </div>
                      </v-col>
                    </v-row>

                    <!-- Save/Cancel buttons when editing -->
                    <v-row v-if="editMode" class="mt-3">
                      <v-col cols="12" class="d-flex justify-end gap-2">
                        <v-btn color="grey" variant="text" @click="cancelEdit">
                          Cancel
                        </v-btn>
                        <v-btn
                          color="primary"
                          variant="flat"
                          @click="saveProfile"
                        >
                          Save Changes
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card variant="outlined">
                  <v-card-title class="text-subtitle-1 bg-grey-lighten-4">
                    <v-icon class="mr-2">mdi-chart-box</v-icon>
                    Account Statistics
                  </v-card-title>
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="4">
                        <div class="text-center">
                          <div class="text-h4 text-primary font-weight-bold">
                            156
                          </div>
                          <div class="text-caption">Total Orders</div>
                        </div>
                      </v-col>
                      <v-col cols="4">
                        <div class="text-center">
                          <div class="text-h4 text-success font-weight-bold">
                            $12.5K
                          </div>
                          <div class="text-caption">Total Spent</div>
                        </div>
                      </v-col>
                      <v-col cols="4">
                        <div class="text-center">
                          <div class="text-h4 text-warning font-weight-bold">
                            4.8
                          </div>
                          <div class="text-caption">Rating</div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <!-- Sales Channels Section -->
            <div class="mb-4">
              <div
                class="text-h6 mb-3 d-flex align-center justify-space-between"
              >
                <div>
                  <v-icon class="mr-2">mdi-store</v-icon>
                  All Channels
                </div>
                <!-- Show back button when a channel is selected -->
                <v-btn
                  v-if="selectedChannel"
                  color="primary"
                  variant="text"
                  prepend-icon="mdi-arrow-left"
                  @click="clearChannelFilter"
                >
                  Back to All Channels
                </v-btn>
              </div>
              <v-row>
                <v-col
                  v-for="channel in profile.channels"
                  :key="channel.id"
                  cols="12"
                  sm="6"
                  md="3"
                >
                  <v-card
                    variant="outlined"
                    hover
                    @click="selectChannel(channel)"
                    :class="{
                      'elevation-8 border-primary':
                        selectedChannel?.id === channel.id,
                    }"
                    class="cursor-pointer"
                  >
                    <v-card-text class="text-center">
                      <v-avatar size="60" class="mb-2" :color="channel.color">
                        <v-icon size="32" color="white">{{
                          channel.icon
                        }}</v-icon>
                      </v-avatar>
                      <div class="text-subtitle-1 font-weight-medium">
                        {{ channel.name }}
                      </div>
                      <div class="text-caption text-medium-emphasis">
                        {{ channel.status }}
                      </div>
                      <v-chip
                        :color="channel.active ? 'success' : 'grey'"
                        size="small"
                        class="mt-2"
                      >
                        {{ channel.active ? "Active" : "Inactive" }}
                      </v-chip>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <v-divider class="my-4"></v-divider>

            <!-- Products Section -->
            <div>
              <div
                class="text-h6 mb-3 d-flex align-center justify-space-between"
              >
                <div>
                  <v-icon class="mr-2">mdi-package-variant</v-icon>
                  {{
                    selectedChannel
                      ? `${selectedChannel.name} Products`
                      : "My Products"
                  }}
                </div>
                <v-chip color="primary" size="small"
                  >{{ filteredProducts.length }} items</v-chip
                >
              </div>

              <!-- Show message if no products found -->
              <v-alert
                v-if="filteredProducts.length === 0"
                type="info"
                variant="tonal"
                class="mb-4"
              >
                No products found for this channel.
              </v-alert>

              <v-row>
                <v-col
                  v-for="product in filteredProducts"
                  :key="product.id"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-card variant="outlined" hover>
                    <!-- Product Image with Edit Button -->
                    <div class="position-relative">
                      <v-img
                        :src="product.image"
                        height="180"
                        cover
                        class="bg-grey-lighten-2"
                      >
                        <template v-slot:placeholder>
                          <div
                            class="d-flex align-center justify-center fill-height"
                          >
                            <v-progress-circular
                              indeterminate
                            ></v-progress-circular>
                          </div>
                        </template>
                      </v-img>
                      <!-- Edit Product Image Button -->
                      <v-btn
                        icon
                        size="small"
                        color="primary"
                        class="position-absolute product-edit-btn"
                        @click="openProductImageEdit(product)"
                      >
                        <v-icon size="18">mdi-camera</v-icon>
                      </v-btn>
                    </div>
                    <v-card-text>
                      <div class="text-subtitle-2 font-weight-medium mb-1">
                        {{ product.name }}
                      </div>
                      <div class="text-caption text-medium-emphasis mb-2">
                        {{ product.category }}
                      </div>
                      <div
                        class="d-flex justify-space-between align-center mb-2"
                      >
                        <div class="text-h6 text-primary">
                          ${{ product.price }}
                        </div>
                        <v-chip
                          :color="product.stock > 0 ? 'success' : 'error'"
                          size="small"
                        >
                          {{
                            product.stock > 0
                              ? `${product.stock} in stock`
                              : "Out of stock"
                          }}
                        </v-chip>
                      </div>
                      <!-- Show channel badge on product -->
                      <v-chip
                        size="x-small"
                        :color="getChannelColor(product.channelId)"
                        variant="tonal"
                        class="mb-2"
                      >
                        <v-icon start size="x-small">{{
                          getChannelIcon(product.channelId)
                        }}</v-icon>
                        {{ getChannelName(product.channelId) }}
                      </v-chip>

                      <!-- Edit Product Button -->
                      <v-btn
                        block
                        color="primary"
                        variant="outlined"
                        size="small"
                        prepend-icon="mdi-pencil"
                        @click="openProductEdit(product)"
                      >
                        Edit Product
                      </v-btn>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <!-- Footer Actions -->
          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="flat"
              prepend-icon="mdi-pencil"
              size="large"
              @click="editMode = true"
            >
              Edit Profile
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Edit Product Images Dialog -->
    <v-dialog v-model="productEditDialog" max-width="800px" scrollable>
      <v-card>
        <v-card-title
          class="bg-primary text-white d-flex justify-space-between align-center"
        >
          <div>
            <v-icon class="mr-2" color="white">mdi-image-multiple</v-icon>
            Edit Product Images
          </div>
          <v-btn icon variant="text" @click="productEditDialog = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pt-4">
          <div class="text-h6 mb-3">{{ editingProduct.name }}</div>

          <!-- Current Images Grid -->
          <div class="mb-4">
            <div class="text-subtitle-2 mb-2">
              Product Images (Click to replace)
            </div>
            <v-row>
              <!-- Existing/New Images -->
              <v-col
                v-for="(img, index) in productImages"
                :key="index"
                cols="6"
                sm="4"
                md="3"
              >
                <v-card
                  variant="outlined"
                  class="image-card cursor-pointer"
                  @click="selectImageToReplace(index)"
                >
                  <v-img
                    :src="img"
                    height="150"
                    cover
                    class="bg-grey-lighten-2"
                  >
                    <template v-slot:placeholder>
                      <div
                        class="d-flex align-center justify-center fill-height"
                      >
                        <v-progress-circular
                          indeterminate
                        ></v-progress-circular>
                      </div>
                    </template>
                  </v-img>
                  <!-- Overlay with icons -->
                  <div class="image-overlay">
                    <v-btn icon size="small" color="primary" class="ma-1">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      size="small"
                      color="error"
                      class="ma-1"
                      @click.stop="removeImage(index)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </v-card>
              </v-col>

              <!-- Add New Image Button -->
              <v-col cols="6" sm="4" md="3">
                <v-card
                  variant="outlined"
                  class="add-image-card cursor-pointer"
                  height="150"
                  @click="addNewImage"
                >
                  <div
                    class="d-flex flex-column align-center justify-center fill-height"
                  >
                    <v-icon size="48" color="primary">mdi-plus-circle</v-icon>
                    <div class="text-caption mt-2">Add Image</div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <v-divider class="my-4"></v-divider>

          <!-- Upload Options -->
          <div>
            <div class="text-subtitle-2 mb-3">
              {{
                replacingImageIndex !== null
                  ? `Replace Image ${replacingImageIndex + 1}`
                  : "Add New Image"
              }}
            </div>

            <!-- File Upload -->
            <v-file-input
              v-model="imageFile"
              label="Upload Image"
              accept="image/*"
              prepend-icon="mdi-camera"
              variant="outlined"
              @change="handleImageUpload"
              clearable
              show-size
            ></v-file-input>

            <!-- Or URL Input -->
            <div class="text-center my-2 text-caption">OR</div>

            <v-text-field
              v-model="imageUrl"
              label="Paste Image URL"
              variant="outlined"
              prepend-inner-icon="mdi-link"
              clearable
            >
              <template v-slot:append>
                <v-btn
                  color="primary"
                  variant="flat"
                  @click="addImageFromUrl"
                  :disabled="!imageUrl"
                >
                  {{ replacingImageIndex !== null ? "Replace" : "Add" }}
                </v-btn>
              </template>
            </v-text-field>

            <!-- Preview -->
            <v-card v-if="imagePreview" variant="outlined" class="mt-3">
              <v-card-subtitle>Preview</v-card-subtitle>
              <v-img :src="imagePreview" height="200" contain></v-img>
            </v-card>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="pa-4">
          <v-chip color="info" size="small">
            {{ productImages.length }}
            {{ productImages.length === 1 ? "image" : "images" }}
          </v-chip>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="cancelImageEdit">
            Cancel
          </v-btn>
          <v-btn color="primary" variant="flat" @click="saveProductImages">
            Save All Changes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- QR Code Preview Dialog -->
    <v-dialog v-model="showQrPreview" max-width="400px">
      <v-card>
        <v-card-title class="bg-primary text-white">
          <v-icon class="mr-2" color="white">mdi-qrcode</v-icon>
          Payment QR Code
        </v-card-title>
        <v-card-text class="pa-4 text-center">
          <v-img :src="profile.qrCode" max-width="300" class="mx-auto"></v-img>
          <div class="mt-3">
            <div class="text-caption text-medium-emphasis">Scan to pay</div>
            <div class="text-body-2 font-weight-bold">
              {{ profile.accountName }}
            </div>
            <div class="text-caption">{{ profile.bankName }}</div>
          </div>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="flat" @click="showQrPreview = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- QR Code Upload Dialog -->
    <v-dialog v-model="qrUploadDialog" max-width="500px">
      <v-card>
        <v-card-title class="bg-primary text-white">
          <v-icon class="mr-2" color="white">mdi-qrcode-scan</v-icon>
          Upload QR Code
        </v-card-title>
        <v-card-text class="pt-4 text-center">
          <v-avatar size="200" class="mb-4" rounded="0">
            <v-img
              :src="
                tempQrCode || 'https://via.placeholder.com/200?text=QR+Code'
              "
            ></v-img>
          </v-avatar>
          <v-file-input
            v-model="qrFile"
            label="Upload QR Code Image"
            accept="image/*"
            prepend-icon="mdi-qrcode"
            variant="outlined"
            @change="handleQrUpload"
          ></v-file-input>
          <v-text-field
            v-model="tempQrCode"
            label="Or paste QR code image URL"
            variant="outlined"
            prepend-inner-icon="mdi-link"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="qrUploadDialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" variant="flat" @click="saveQrCode">
            Save QR Code
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  profileData: {
    type: Object,
    default: () => ({}),
  },
});

// Edit mode state
const editMode = ref(false);
const productEditDialog = ref(false);
const avatarEditDialog = ref(false);
const qrUploadDialog = ref(false);
const showQrPreview = ref(false);
const editingProduct = ref({});
const tempAvatar = ref("");
const tempQrCode = ref("");
const avatarFile = ref(null);
const qrFile = ref(null);

// Product images editing
const productImages = ref([]);
const replacingImageIndex = ref(null);
const imageFile = ref(null);
const imageUrl = ref("");
const imagePreview = ref("");

// Selected channel for filtering
const selectedChannel = ref(null);

// Sample profile data - replace with your actual data
const profile = ref({
  name: "MC Group",
  surName: "MS",
  status: "Admin User",
  email: "admin@company.com",
  phone: "+856 20 5555 0000",
  role: "Administrator",
  address: "Vientiane, Laos",
  avatar: "https://via.placeholder.com/150",
  // Payment Information
  accountNumber: "1234567890",
  accountName: "MC Group Co., Ltd",
  bankName: "BCEL Bank",
  qrCode: "https://via.placeholder.com/300?text=QR+Code",
  channels: [
    {
      id: 1,
      name: "Online Store",
      icon: "mdi-web",
      color: "blue",
      status: "Connected",
      active: true,
    },
    {
      id: 2,
      name: "Facebook Shop",
      icon: "mdi-facebook",
      color: "indigo",
      status: "Connected",
      active: true,
    },
    {
      id: 3,
      name: "Instagram",
      icon: "mdi-instagram",
      color: "pink",
      status: "Pending",
      active: false,
    },
    {
      id: 4,
      name: "Marketplace",
      icon: "mdi-shopping",
      color: "green",
      status: "Connected",
      active: true,
    },
  ],
  products: [
    {
      id: 1,
      name: "Premium Coffee Beans",
      category: "Beverages",
      price: 24.99,
      stock: 150,
      channelId: 1,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400",
      images: [
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400",
        "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400",
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400",
      ],
    },
    {
      id: 2,
      name: "Organic Green Tea",
      category: "Beverages",
      price: 15.99,
      stock: 200,
      channelId: 2,
      image:
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
      images: [
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
      ],
    },
    {
      id: 3,
      name: "Artisan Chocolate",
      category: "Snacks",
      price: 8.99,
      stock: 0,
      channelId: 1,
      image:
        "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400",
      images: [
        "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400",
      ],
    },
    {
      id: 4,
      name: "Honey Jar Set",
      category: "Pantry",
      price: 32.5,
      stock: 45,
      channelId: 4,
      image:
        "https://images.unsplash.com/photo-1587049352846-4a222e784eaf?w=400",
      images: [
        "https://images.unsplash.com/photo-1587049352846-4a222e784eaf?w=400",
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400",
        "https://images.unsplash.com/photo-1471943311424-646960669fbc?w=400",
      ],
    },
    {
      id: 5,
      name: "Herbal Tea Mix",
      category: "Beverages",
      price: 18.99,
      stock: 89,
      channelId: 2,
      image:
        "https://images.unsplash.com/photo-1597318181719-64b8e85677c5?w=400",
      images: [
        "https://images.unsplash.com/photo-1597318181719-64b8e85677c5?w=400",
      ],
    },
    {
      id: 6,
      name: "Spice Collection",
      category: "Pantry",
      price: 45.0,
      stock: 30,
      channelId: 1,
      image:
        "https://images.unsplash.com/photo-1596040033229-a0b3b13d5f06?w=400",
      images: [
        "https://images.unsplash.com/photo-1596040033229-a0b3b13d5f06?w=400",
        "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=400",
      ],
    },
    {
      id: 7,
      name: "Gourmet Pasta",
      category: "Pantry",
      price: 12.99,
      stock: 75,
      channelId: 4,
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
      images: [
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
      ],
    },
    {
      id: 8,
      name: "Smoothie Mix",
      category: "Beverages",
      price: 22.5,
      stock: 110,
      channelId: 3,
      image:
        "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400",
      images: [
        "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400",
        "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400",
      ],
    },
  ],
});

// Editable profile copy
const editableProfile = ref({ ...profile.value });

// Computed property to filter products by selected channel
const filteredProducts = computed(() => {
  if (!selectedChannel.value) {
    return profile.value.products;
  }
  return profile.value.products.filter(
    (product) => product.channelId === selectedChannel.value.id
  );
});

// Function to select a channel
const selectChannel = (channel) => {
  selectedChannel.value = channel;
};

// Function to clear channel filter
const clearChannelFilter = () => {
  selectedChannel.value = null;
};

// Helper functions to get channel info
const getChannelName = (channelId) => {
  const channel = profile.value.channels.find((c) => c.id === channelId);
  return channel ? channel.name : "Unknown";
};

const getChannelColor = (channelId) => {
  const channel = profile.value.channels.find((c) => c.id === channelId);
  return channel ? channel.color : "grey";
};

const getChannelIcon = (channelId) => {
  const channel = profile.value.channels.find((c) => c.id === channelId);
  return channel ? channel.icon : "mdi-store";
};

// Edit profile functions
const saveProfile = () => {
  profile.value = { ...editableProfile.value };
  editMode.value = false;
  console.log("Profile saved:", profile.value);
  // Here you would typically send the data to your backend
};

const cancelEdit = () => {
  editableProfile.value = { ...profile.value };
  editMode.value = false;
};

// Product edit functions
const openProductEdit = (product) => {
  editingProduct.value = { ...product };

  // Initialize product images array
  if (Array.isArray(product.images) && product.images.length > 0) {
    productImages.value = [...product.images];
  } else if (product.image) {
    // If single image string, convert to array
    productImages.value = [product.image];
  } else {
    productImages.value = [];
  }

  replacingImageIndex.value = null;
  imageFile.value = null;
  imageUrl.value = "";
  imagePreview.value = "";
  productEditDialog.value = true;
};

const openProductImageEdit = (product) => {
  openProductEdit(product);
};

const selectImageToReplace = (index) => {
  replacingImageIndex.value = index;
  imageFile.value = null;
  imageUrl.value = "";
  imagePreview.value = productImages.value[index];
};

const addNewImage = () => {
  replacingImageIndex.value = null;
  imageFile.value = null;
  imageUrl.value = "";
  imagePreview.value = "";
};

const handleImageUpload = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;

      // Automatically add or replace image
      if (replacingImageIndex.value !== null) {
        productImages.value[replacingImageIndex.value] = e.target.result;
      } else {
        productImages.value.push(e.target.result);
      }

      // Reset after adding
      imageFile.value = null;
      imagePreview.value = "";
      replacingImageIndex.value = null;
    };
    reader.readAsDataURL(file);
  }
};

const addImageFromUrl = () => {
  if (imageUrl.value) {
    if (replacingImageIndex.value !== null) {
      productImages.value[replacingImageIndex.value] = imageUrl.value;
    } else {
      productImages.value.push(imageUrl.value);
    }

    // Reset after adding
    imageUrl.value = "";
    imagePreview.value = "";
    replacingImageIndex.value = null;
  }
};

const removeImage = (index) => {
  if (confirm("Are you sure you want to remove this image?")) {
    productImages.value.splice(index, 1);
  }
};

const cancelImageEdit = () => {
  productEditDialog.value = false;
  productImages.value = [];
  replacingImageIndex.value = null;
  imageFile.value = null;
  imageUrl.value = "";
  imagePreview.value = "";
};

const saveProductImages = () => {
  const index = profile.value.products.findIndex(
    (p) => p.id === editingProduct.value.id
  );
  if (index !== -1) {
    // Save images array to product
    profile.value.products[index].images = [...productImages.value];
    // Also update the main image (first image in array)
    profile.value.products[index].image = productImages.value[0] || "";
  }

  productEditDialog.value = false;
  console.log("Product images saved:", productImages.value);
  // Here you would typically send the data to your backend
};

// Avatar edit functions
const openImageEdit = () => {
  tempAvatar.value = profile.value.avatar;
  avatarEditDialog.value = true;
};

const handleAvatarChange = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      tempAvatar.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const saveAvatar = () => {
  if (tempAvatar.value) {
    profile.value.avatar = tempAvatar.value;
    editableProfile.value.avatar = tempAvatar.value;
  }
  avatarEditDialog.value = false;
  console.log("Avatar saved");
  // Here you would typically upload the image to your backend
};

// QR Code functions
const openQrUpload = () => {
  tempQrCode.value = editableProfile.value.qrCode || "";
  qrUploadDialog.value = true;
};

const handleQrUpload = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      tempQrCode.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const saveQrCode = () => {
  if (tempQrCode.value) {
    editableProfile.value.qrCode = tempQrCode.value;
  }
  qrUploadDialog.value = false;
  console.log("QR Code saved");
  // Here you would typically upload the QR code to your backend
};
</script>

<style scoped>
.v-card-title {
  font-weight: 600;
}

.cursor-pointer {
  cursor: pointer;
  transition: all 0.3s ease;
}

.cursor-pointer:hover {
  transform: translateY(-4px);
}

.border-primary {
  border: 2px solid rgb(var(--v-theme-primary)) !important;
}

.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}

.avatar-edit-btn {
  bottom: 10px;
  right: 10px;
}

.product-edit-btn {
  top: 8px;
  right: 8px;
}
.image-card {
  position: relative;
  overflow: hidden;
}
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.image-card:hover .image-overlay {
  opacity: 1;
}
.add-image-card {
  border: 2px dashed #ccc;
  transition: all 0.3s ease;
}
.add-image-card:hover {
  border-color: rgb(var(--v-theme-primary));
  background-color: rgba(var(--v-theme-primary), 0.05);
}
</style>
