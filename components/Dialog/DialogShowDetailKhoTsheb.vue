<template>
  <v-dialog
    :model-value="showDetails"
    max-width="900px"
    scrollable
    @update:model-value="closeDialog"
  >
    <v-card>
      <!-- HEADER -->
      <v-card-title class="d-flex justify-space-between align-center bg-primary">
        <span class="text-h5 text-white">Property Details</span>

        <v-btn icon variant="text" @click="closeDialog">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <!-- CONTENT -->
      <v-card-text class="pa-6" v-if="detailItem">
        <!-- Image Gallery -->
        <div class="mb-4">
          <v-carousel
            v-if="detailItem.image && detailItem.image.length"
            height="300"
            cycle
            interval="3000"
            show-arrows
          >
            <v-carousel-item
              v-for="(img, index) in detailItem.image"
              :key="index"
            >
              <v-img :src="img" height="300" cover></v-img>
            </v-carousel-item>
          </v-carousel>
        </div>

        <!-- Property Information -->
        <v-card class="mb-4 pa-4" elevation="1">
          <h3 class="mb-3">Property Information</h3>

          <v-row>
            <v-col cols="12" sm="6">
              <div class="mb-1">
                <strong>Type:</strong>
                <v-chip size="small" color="primary" class="ml-2">
                  {{ detailItem.type || "-" }}
                </v-chip>
              </div>
            </v-col>

            <v-col cols="12" sm="12">
              <div class="mb-0">
                <strong>Details:</strong>
                <v-divider></v-divider>
                <div>
                  <span class="ml-2 text-red font-weight-bold">
                    {{ detailItem.detail }}
                  </span>
                </div>
              </div>
            </v-col>

            <v-col cols="12" v-if="detailItem.name">
              <div class="mb-2">
                <strong>Title:</strong>
                <span class="ml-2">{{ detailItem.name }}</span>
              </div>
            </v-col>
          </v-row>
        </v-card>

        <!-- Location -->
        <v-card class="mb-4 pa-4" elevation="1">
          <h3 class="mb-3">
            <v-icon color="primary" class="mr-2">mdi-map-marker</v-icon>
            Location
          </h3>

          <v-row>
            <v-col cols="12">
              <strong>GPS Location:</strong>
              <div class="mt-1">
                {{ detailItem.locationgps || "N/A" }}
              </div>
            </v-col>
          </v-row>
        </v-card>

        <!-- Contact Info -->
        <v-card class="mb-4 pa-4 bg-blue-lighten-5" elevation="1">
          <h3 class="mb-3">
            <v-icon color="primary" class="mr-2">mdi-phone</v-icon>
            Contact Information
          </h3>

          <v-row>
            <v-col cols="12">
              <div class="mb-2">
                <a
                  :href="'tel:' + detailItem.tel"
                  class="ml-2 text-blue text-decoration-none"
                >
                  <v-icon size="small" class="mr-1">mdi-phone</v-icon>
                  {{ detailItem.tel }}
                </a>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-card-text>

      <!-- FOOTER -->
      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="flat" @click="closeDialog">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  showDetails: {
    type: Boolean,
    required: true,
  },
  detailItem: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:show-details"]);

const closeDialog = () => {
  emit("update:show-details", false);
};
</script>
