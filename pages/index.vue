<template>
  <v-app>
    <v-container fluid class="pa-0">
      <v-carousel
        cycle
        v-model="carouselIndex"
        show-arrows
        hide-delimiters
        interval="3000"
        height="500"
        class="hero-carousel"
      >
        <v-carousel-item
          v-for="(img, index) in profileImageitems[0]?.image"
          :key="index"
        >
          <v-img
            :src="img"
            height="500"
            cover
            gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,.5)"
          />
        </v-carousel-item>
      </v-carousel>
    </v-container>

    <v-divider class="my-2" />

    <v-container fluid class="pa-0">
      <div class="text-center mb-8">
        <h2 class="text-h6 font-weight-bold mb-3">ບໍລິການຂອງພວກເຮົາ</h2>
        <p class="text-h6 text-grey-darken-1">ເລືອກບໍລິການທີ່ທ່ານຕ້ອງການ</p>
      </div>

      <v-divider class="my-4" />

      <!-- Loading State -->
      <v-row v-if="loading" class="text-center py-16">
        <v-col cols="12">
          <v-progress-circular indeterminate color="primary" size="64" />
          <p class="mt-4 text-h6">ກຳລັງໂຫລດ...</p>
        </v-col>
      </v-row>

      <!-- Error State -->
      <v-row v-else-if="error" class="text-center py-16">
        <v-col cols="12">
          <v-icon size="80" color="error">mdi-alert-circle-outline</v-icon>
          <p class="mt-4 text-h6 text-error">{{ error }}</p>
          <v-btn
            color="error"
            variant="tonal"
            prepend-icon="mdi-refresh"
            class="mt-4"
            @click="fetchChannels"
          >
            ລອງໃໝ່
          </v-btn>
        </v-col>
      </v-row>

      <!-- Empty State -->
      <v-row v-else-if="channels.length === 0" class="text-center py-16">
        <v-col cols="12">
          <v-icon size="80" color="grey-lighten-1">mdi-store-off-outline</v-icon>
          <p class="mt-4 text-h6 text-grey">ບໍ່ມີຂໍ້ມູນໃນຂະນະນີ້</p>
          <p class="text-body-2 text-grey-lighten-1 mb-4">
            ກະລຸນາລອງໃໝ່ພາຍຫຼັງ
          </p>
          <v-btn
            color="primary"
            variant="tonal"
            prepend-icon="mdi-refresh"
            @click="fetchChannels"
          >
            ໂຫລດໃໝ່
          </v-btn>
        </v-col>
      </v-row>

      <!-- Categories Cards -->
      <v-row v-else>
        <v-col
          v-for="(item, index) in channels"
          :key="item.id || index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          class="mb-4"
        >
          <v-card
            elevation="2"
            rounded="lg"
            hover
            class="h-100 d-flex flex-column cursor-pointer"
            :to="`/retrievepage?channelId=${item.id}`"
          >
            <v-img :src="item.image[0]" aspect-ratio="1" cover>
              <template #default>
                <div class="d-flex flex-column fill-height justify-space-between">
                  <div class="d-flex justify-end pa-2">
                    <v-chip
                      v-if="item.image.length > 1"
                      size="small"
                      color="black"
                      variant="flat"
                      class="text-white"
                    >
                      <v-icon size="small" class="mr-1">mdi-camera</v-icon>
                      {{ item.image.length }}
                    </v-chip>
                  </div>
                  <div class="d-flex justify-start pa-2">
                    <v-chip
                      v-if="item.isBestSeller"
                      size="small"
                      color="deep-orange"
                      variant="flat"
                      class="text-white font-weight-bold"
                    >
                      #1 ຍອດນິຍົມ
                    </v-chip>
                  </div>
                </div>
              </template>
            </v-img>

            <v-card-text class="pa-4">
              <h3 class="text-h6 font-weight-bold text-primary">
                {{ item.channel }}
              </h3>
              <p v-if="item.detail" class="text-body-2 text-grey-darken-1 mb-1">
                {{ item.detail }}
              </p>
            </v-card-text>

            <v-card-actions class="pa-4 pt-0">
              <v-btn
                block
                color="primary"
                variant="flat"
                prepend-icon="mdi-arrow-right-circle"
              >
                ເບິ່ງລາຍລະອຽດ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const { channels, fetchChannels, loading, error } = useChannel();
const router = useRouter();
const carouselIndex = ref(0);
const { fetchProfileImages, profileImageitems } = useProfileImage();

onMounted(async () => {
  await fetchChannels();
  await fetchProfileImages();
});

// ─── Navigate: pass channelId via history.state to the detail page ────────────
</script>

<style scoped>
.hero-carousel :deep(.v-btn--icon) {
  background-color: rgba(25, 118, 210, 0.8) !important;
  color: white !important;
  border-radius: 50%;
}
.hero-carousel :deep(.v-btn--icon:hover) {
  background-color: rgba(25, 118, 210, 1) !important;
}
</style>