<template>
  <v-app>
    <v-container fluid class="pa-0">

      <!-- ✅ SMART BANNER: Video = play in place | Images = carousel slide -->

      <!-- CASE 1: Single Video (no carousel, just plays) -->
      <div
        v-if="isVideoMode"
        class="position-relative"
        style="width: 100%; height: 500px; background: #000"
      >
        <iframe
          v-if="videoSrc"
          :src="videoSrc"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          style="width: 100%; height: 100%; display: block"
        />

        <!-- Overlay Text -->
        <div
          class="position-absolute w-100 h-100 d-flex align-center justify-center"
          style="
            top: 0; left: 0;
            background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6));
            pointer-events: none;
            z-index: 1;
          "
        >
          <div class="text-center px-4">
            <h1 class="text-h3 text-white font-weight-bold mb-4">
              ບໍລິການລົດແທັກຊີ່
            </h1>
            <p class="text-h6 text-white mb-6">
              ລາຄາສົມເຫດສົມຜົນ • ປອດໄພ • ໄວ
            </p>
          </div>
        </div>

        <!-- Sound Toggle -->
        <v-btn
          icon
          class="position-absolute bg-white"
          style="bottom: 20px; left: 20px; z-index: 2"
          elevation="2"
          @click="isMuted = !isMuted"
        >
          <v-icon color="grey-darken-2">
            {{ isMuted ? "mdi-volume-off" : "mdi-volume-high" }}
          </v-icon>
        </v-btn>
      </div>

      <!-- CASE 2: Multiple Videos = carousel (each plays on slide) -->
      <v-carousel
        v-else-if="videoBanners.length > 1"
        v-model="currentVideoSlide"
        height="500"
        hide-delimiter-background
        show-arrows
        cycle
        interval="6000"
      >
        <template v-slot:prev="{ props }">
          <v-btn icon="mdi-chevron-left" size="large" v-bind="props" color="white" elevation="3" class="bg-blue-darken-2" />
        </template>
        <template v-slot:next="{ props }">
          <v-btn icon="mdi-chevron-right" size="large" v-bind="props" color="white" elevation="3" class="bg-blue-darken-2" />
        </template>

        <v-carousel-item v-for="(video, i) in videoBanners" :key="`video-${i}`">
          <div class="position-relative fill-height">
            <iframe
              v-if="videoSrcs[i]"
              :src="videoSrcs[i]"
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              style="width: 100%; height: 100%; display: block"
            />

            <!-- Overlay -->
            <div
              class="position-absolute w-100 h-100 d-flex align-center justify-center"
              style="
                top: 0; left: 0;
                background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6));
                pointer-events: none;
                z-index: 1;
              "
            >
              <div class="text-center px-4">
                <h1 class="text-h3 text-white font-weight-bold mb-4">
                  ບໍລິການລົດແທັກຊີ່
                </h1>
                <p class="text-h6 text-white mb-6">
                  ລາຄາສົມເຫດສົມຜົນ • ປອດໄພ • ໄວ
                </p>
              </div>
            </div>

            <!-- Sound Toggle -->
            <v-btn
              icon
              class="position-absolute bg-white"
              style="bottom: 20px; left: 20px; z-index: 2"
              elevation="2"
              @click="isMuted = !isMuted"
            >
              <v-icon color="grey-darken-2">
                {{ isMuted ? "mdi-volume-off" : "mdi-volume-high" }}
              </v-icon>
            </v-btn>
          </div>
        </v-carousel-item>
      </v-carousel>

      <!-- CASE 3: Image Carousel (1 or more images) -->
      <v-carousel
        v-else-if="imageBanners.length > 0"
        v-model="currentImageSlide"
        height="500"
        :cycle="imageBanners.length > 1"
        :show-arrows="imageBanners.length > 1"
        :hide-delimiters="imageBanners.length <= 1"
        hide-delimiter-background
        interval="4000"
      >
        <template v-slot:prev="{ props }">
          <v-btn icon="mdi-chevron-left" size="large" v-bind="props" color="white" elevation="3" class="bg-blue-darken-2" />
        </template>
        <template v-slot:next="{ props }">
          <v-btn icon="mdi-chevron-right" size="large" v-bind="props" color="white" elevation="3" class="bg-blue-darken-2" />
        </template>

        <v-carousel-item v-for="(img, i) in imageBanners" :key="`img-${i}`">
          <div class="position-relative fill-height">
            <v-img :src="img" class="fill-height" cover />

            <!-- Overlay -->
            <div
              class="position-absolute w-100 h-100 d-flex align-center justify-center"
              style="
                top: 0; left: 0;
                background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6));
                pointer-events: none;
                z-index: 1;
              "
            >
              <div class="text-center px-4">
                <h1 class="text-h3 text-white font-weight-bold mb-4">
                  ບໍລິການລົດແທັກຊີ່
                </h1>
                <p class="text-h6 text-white mb-6">
                  ລາຄາສົມເຫດສົມຜົນ • ປອດໄພ • ໄວ
                </p>
              </div>
            </div>
          </div>
        </v-carousel-item>
      </v-carousel>

      <!-- CASE 4: Nothing to show -->
      <v-sheet
        v-else
        height="500"
        color="grey-lighten-3"
        class="d-flex align-center justify-center"
      >
        <div class="text-center">
          <v-icon size="64" color="grey-lighten-1">mdi-image-off-outline</v-icon>
          <p class="text-body-1 text-medium-emphasis mt-3">ບໍ່ມີສື່ສຳລັບສະແດງ</p>
        </div>
      </v-sheet>

      <!-- 🔍 Search & Filter Section -->
      <v-container class="py-8">
        <v-card elevation="3" rounded="lg" class="pa-6">
          <h2 class="text-h5 font-weight-bold mb-6">
            <v-icon color="primary" class="mr-2">mdi-magnify</v-icon>
            ຄົ້ນຫາລົດແທັກຊີ່
          </h2>

          <v-row>
            <v-col cols="12" sm="6" md="3">
              <v-select
                v-model="selectedProvince"
                :items="provinces"
                label="ເລືອກແຂວງ"
                item-title="name"
                item-value="code"
                clearable
                variant="outlined"
                prepend-inner-icon="mdi-map-marker"
                density="comfortable"
              />
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-select
                v-model="selectedDistrict"
                :items="districtsForSelectedProvince"
                label="ເລືອກເມືອງ"
                item-title="name"
                item-value="code"
                clearable
                variant="outlined"
                prepend-inner-icon="mdi-map"
                density="comfortable"
                :disabled="!selectedProvince"
              />
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <v-btn
                block
                color="primary"
                size="large"
                :disabled="!selectedProvince || !selectedDistrict"
                prepend-icon="mdi-magnify"
                @click="queryByLocation"
              >
                ຄົ້ນຫາ
              </v-btn>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="searchQuery"
                label="ຄົ້ນຫາຕາມຊື່..."
                variant="outlined"
                clearable
                prepend-inner-icon="mdi-magnify"
                density="comfortable"
              />
            </v-col>

            <v-col cols="12" md="1" class="d-flex align-center">
              <v-btn
                block
                color="success"
                variant="tonal"
                prepend-icon="mdi-comment-question"
                @click="openCommentDialog"
              >
                ສອບຖາມ
              </v-btn>
            </v-col>
          </v-row>

          <!-- Active Filters -->
          <v-row v-if="selectedProvince || selectedDistrict" class="mt-2">
            <v-col cols="12">
              <div class="d-flex align-center ga-2 flex-wrap">
                <span class="text-subtitle-2 text-grey-darken-1">ຕົວກອງ:</span>
                <v-chip
                  v-if="selectedProvince"
                  closable
                  color="primary"
                  variant="flat"
                  size="small"
                  @click:close="selectedProvince = null"
                >
                  {{ provinces.find((p) => p.code === selectedProvince)?.name }}
                </v-chip>
                <v-chip
                  v-if="selectedDistrict"
                  closable
                  color="primary"
                  variant="flat"
                  size="small"
                  @click:close="selectedDistrict = null"
                >
                  {{ districtsForSelectedProvince.find((d) => d.code === selectedDistrict)?.name }}
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-container>

      <!-- 📊 Results Summary -->
      <v-container>
        <div class="d-flex justify-space-between align-center mb-4">
          <h3 class="text-h5 font-weight-bold">ຜົນການຄົ້ນຫາ</h3>
          <v-chip color="primary" size="large">
            <v-icon start>mdi-car-multiple</v-icon>
            {{ filteredData.length }} ລົດ
          </v-chip>
        </div>
      </v-container>

      <!-- 🚖 Taxi Cards -->
      <v-container class="pb-12">

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
              @click="fetchTaxi"
            >
              ລອງໃໝ່
            </v-btn>
          </v-col>
        </v-row>

        <!-- Empty State -->
        <v-row v-else-if="filteredData.length === 0" justify="center" class="py-16">
          <v-col cols="12" sm="8" md="4" class="text-center">
            <v-sheet
              rounded="xl"
              color="grey-lighten-4"
              class="pa-10 d-flex flex-column align-center"
            >
              <v-icon size="80" color="grey-lighten-1">mdi-taxi</v-icon>
              <p class="text-h6 font-weight-medium mt-5 mb-1">
                ບໍ່ພົບຂໍ້ມູນລົດແທັກຊີ່
              </p>
              <p class="text-body-2 text-medium-emphasis mb-6">
                ກະລຸນາລອງຄົ້ນຫາໃໝ່
              </p>
              <v-btn
                color="primary"
                variant="tonal"
                size="large"
                rounded="lg"
                prepend-icon="mdi-refresh"
                @click="fetchTaxi"
              >
                ໂຫລດໃໝ່
              </v-btn>
            </v-sheet>
          </v-col>
        </v-row>

        <!-- Taxi Cards -->
        <v-row v-else>
          <v-col
            v-for="(taxi, index) in filteredData"
            :key="taxi.id || index"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card elevation="2" rounded="lg" hover class="h-100 d-flex flex-column">

              <!-- Image with manual prev/next arrows -->
              <v-img
                :src="
                  taxi.image[taxi.currentSlide ?? 0]?.startsWith('http')
                    ? taxi.image[taxi.currentSlide ?? 0]
                    : imageBaseUrl + taxi.image[taxi.currentSlide ?? 0]
                "
                :aspect-ratio="16 / 9"
                cover
                class="cursor-pointer"
                @click="openZoom(taxi, taxi.currentSlide ?? 0)"
                @error="handleImageError"
              >
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey-lighten-5" />
                  </v-row>
                </template>

                <template v-slot:error>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <div class="text-center">
                      <v-icon size="40" color="grey-lighten-2">mdi-image-off</v-icon>
                      <p class="text-caption text-grey mt-1">ບໍ່ມີຮູບພາບ</p>
                    </div>
                  </v-row>
                </template>

                <!-- Prev / Next arrows -->
                <div class="d-flex align-center justify-space-between fill-height px-2">
                  <v-btn
                    v-if="taxi.image.length > 1"
                    icon="mdi-chevron-left"
                    size="x-small"
                    variant="plain"
                    color="white"
                    style="background: rgba(0,0,0,0.35)"
                    @click.stop="
                      taxi.currentSlide =
                        taxi.currentSlide > 0
                          ? taxi.currentSlide - 1
                          : taxi.image.length - 1
                    "
                  />
                  <div v-else />

                  <v-btn
                    v-if="taxi.image.length > 1"
                    icon="mdi-chevron-right"
                    size="x-small"
                    variant="plain"
                    color="white"
                    style="background: rgba(0,0,0,0.35)"
                    @click.stop="
                      taxi.currentSlide =
                        taxi.currentSlide < taxi.image.length - 1
                          ? taxi.currentSlide + 1
                          : 0
                    "
                  />
                  <div v-else />
                </div>

                <!-- Image counter top-right -->
                <div class="position-absolute" style="top: 8px; right: 8px">
                  <v-chip
                    size="x-small"
                    color="black"
                    variant="flat"
                    class="text-white opacity-80"
                  >
                    <v-icon size="x-small" class="mr-1">mdi-camera</v-icon>
                    {{ (taxi.currentSlide ?? 0) + 1 }}/{{ taxi.image.length }}
                  </v-chip>
                </div>
              </v-img>

              <!-- Card Content -->
              <v-card-text class="pa-3 pa-sm-4 flex-grow-1">
                <h4 class="text-body-1 text-sm-h6 font-weight-bold mb-2 text-primary text-truncate">
                  {{ taxi.name }}
                </h4>

                <!-- Pricing -->
                <v-sheet border="s-lg" color="transparent" class="border-success pl-3 mb-3">
                  <v-chip
                    color="success"
                    variant="flat"
                    :size="smAndDown ? 'small' : 'default'"
                    class="mb-1"
                  >
                    <v-icon start size="small">mdi-cash</v-icon>
                    {{ taxi.price1 ? Number(taxi.price1).toLocaleString() : "ສອບຖາມລາຄາ" }} ₭
                  </v-chip>
                  <p class="text-caption text-grey-darken-1">ລາຄາສາມາດລົມໄດ້ຕາມໄລຍະທາງ</p>
                </v-sheet>

                <!-- Contact -->
                <div
                  class="d-flex align-center ga-2 mb-3 cursor-pointer"
                  @click="callPhone(taxi.tel)"
                >
                  <v-icon color="primary" :size="smAndDown ? 'x-small' : 'small'">mdi-phone</v-icon>
                  <span class="text-primary font-weight-medium text-caption text-sm-body-2">
                    {{ taxi.tel }}
                  </span>
                </div>

                <!-- Collapsible Details -->
                <v-expand-transition>
                  <div v-if="taxi.showDetails">
                    <v-divider class="mb-2" />
                    <p class="text-caption text-sm-body-2 text-grey-darken-2">
                      {{ taxi.detail }}
                    </p>
                  </div>
                </v-expand-transition>
              </v-card-text>

              <!-- Card Actions -->
              <v-card-actions class="pa-3 pa-sm-4 pt-0">
                <v-btn
                  variant="text"
                  color="primary"
                  :size="smAndDown ? 'x-small' : 'small'"
                  @click="taxi.showDetails = !taxi.showDetails"
                >
                  {{ taxi.showDetails ? "ຫຼຸດລົງ" : "ລາຍລະອຽດເພີ່ມ" }}
                  <v-icon end>
                    {{ taxi.showDetails ? "mdi-chevron-up" : "mdi-chevron-down" }}
                  </v-icon>
                </v-btn>

                <v-spacer />

                <v-btn
                  color="success"
                  variant="flat"
                  :size="smAndDown ? 'x-small' : 'small'"
                  prepend-icon="mdi-whatsapp"
                  @click="openWhatsApp(taxi)"
                >
                  {{ smAndDown ? "" : "WhatsApp" }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- Recommended Section -->
          <v-col cols="12" class="mt-4">
            <v-divider class="mb-4" />
            <div class="d-flex align-center mb-4">
              <v-icon color="primary" class="mr-2">mdi-plus-circle</v-icon>
              <span class="text-h5">ແນະນຳເບຣນດອື່ນໆ</span>
            </div>
            <v-divider class="mb-4" />
          </v-col>

          <v-col cols="12">
            <TopDataCard :topData="topData" />
          </v-col>
        </v-row>
      </v-container>

      <!-- 📝 Comment Dialog -->
      <v-dialog v-model="commentDialog" max-width="600">
        <v-card rounded="lg">
          <v-card-title class="bg-primary text-white pa-4">
            <v-icon class="mr-2">mdi-comment-question</v-icon>
            ສອບຖາມຂໍ້ມູນ
          </v-card-title>

          <v-card-text class="pa-6">
            <v-text-field
              v-model="telephone"
              label="ເບີໂທຕິດຕໍ່"
              type="tel"
              variant="outlined"
              clearable
              prepend-inner-icon="mdi-phone"
              :error="telephoneError"
              :error-messages="telephoneError ? ['ກະລຸນາປ້ອນເບີໂທ'] : []"
              class="mb-4"
            />
            <v-textarea
              v-model="comment"
              label="ຂໍ້ຄວາມ"
              variant="outlined"
              rows="5"
              auto-grow
              clearable
              prepend-inner-icon="mdi-message-text"
              :error="commentError"
              :error-messages="commentError ? ['ກະລຸນາປ້ອນຂໍ້ຄວາມ'] : []"
            />
          </v-card-text>

          <v-card-actions class="pa-4">
            <v-spacer />
            <v-btn variant="text" @click="commentDialog = false">ຍົກເລີກ</v-btn>
            <v-btn color="primary" variant="flat" @click="submitComment">ສົ່ງ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 🔍 Image Zoom Dialog -->
      <v-dialog v-model="zoomDialog" max-width="1200" transition="dialog-transition">
        <v-card rounded="xl" elevation="24">

          <!-- Header -->
          <v-card-title
            class="pa-4 pa-sm-6 d-flex align-center"
            style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          >
            <v-avatar color="white" size="40" class="mr-3 d-none d-sm-flex">
              <v-icon color="primary" size="24">mdi-car-side</v-icon>
            </v-avatar>

            <div class="flex-grow-1 min-width-0">
              <h3 class="text-body-1 text-sm-h5 font-weight-bold text-white text-truncate">
                {{ zoomItem.name }}
              </h3>
              <div class="d-flex align-center mt-1 ga-1 ga-sm-2 flex-wrap">
                <v-chip color="success" variant="flat" size="small">
                  <v-icon start size="small">mdi-cash</v-icon>
                  {{ Number(zoomItem.price1 || 0).toLocaleString() }} ₭
                </v-chip>
                <v-chip
                  color="white"
                  variant="flat"
                  size="small"
                  style="cursor: pointer"
                  @click="callPhone(zoomItem.tel)"
                >
                  <v-icon start size="small" color="primary">mdi-phone</v-icon>
                  {{ zoomItem.tel }}
                </v-chip>
              </div>
            </div>

            <v-btn
              icon
              size="small"
              variant="text"
              color="white"
              class="ml-2 flex-shrink-0"
              @click="zoomDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-divider />

          <!-- Zoom Carousel -->
          <v-carousel
            v-model="zoomSlide"
            :height="carouselHeight"
            hide-delimiters
            show-arrows
            cycle
            interval="4000"
            class="rounded-xl "
          >
            <template v-slot:prev="{ props }">
              <v-btn icon v-bind="props" :size="smAndDown ? 'small' : 'large'" elevation="4" class="bg-white">
                <v-icon :size="smAndDown ? 18 : 32" color="grey-darken-2">mdi-chevron-left</v-icon>
              </v-btn>
            </template>
            <template v-slot:next="{ props }">
              <v-btn icon v-bind="props" :size="smAndDown ? 'small' : 'large'" elevation="4" class="bg-white">
                <v-icon :size="smAndDown ? 18 : 32" color="grey-darken-2">mdi-chevron-right</v-icon>
              </v-btn>
            </template>

            <v-carousel-item
              v-for="(img, i) in zoomItem.image"
              :key="`zoom-${i}`"
            >
              <v-img
                :src="img.startsWith('http') ? img : imageBaseUrl + img"
                :height="carouselHeight"
                contain
                class="rounded-xl "
              >
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="primary" size="64" width="6" />
                  </v-row>
                </template>

                <!-- Counter -->
                <div class="d-flex justify-end pa-2 pa-sm-3">
                  <v-chip
                    color="black"
                    variant="flat"
                    :size="smAndDown ? 'small' : 'default'"
                    class="text-white font-weight-bold opacity-80"
                  >
                    <v-icon start size="small">mdi-image-multiple</v-icon>
                    {{ i + 1 }} / {{ zoomItem.image?.length || 0 }}
                  </v-chip>
                </div>

                <!-- Play/Pause + Dots -->
                <div
                  class="position-absolute w-100 d-flex align-center justify-space-between pa-2 pa-sm-3"
                  style="bottom: 0"
                >
                  <v-btn icon size="small" elevation="2" class="bg-white" @click.stop="toggleZoomAutoplay">
                    <v-icon size="18" color="grey-darken-2">
                      {{ isZoomPlaying ? "mdi-pause" : "mdi-play" }}
                    </v-icon>
                  </v-btn>

                  <div class="d-flex align-center ga-1">
                    <v-icon
                      v-for="(_, dotIndex) in zoomItem.image"
                      :key="dotIndex"
                      :size="dotIndex === i ? 10 : 7"
                      :color="dotIndex === i ? 'white' : 'grey-lighten-1'"
                    >
                      mdi-circle
                    </v-icon>
                  </div>

                  <div style="width: 32px" />
                </div>
              </v-img>
            </v-carousel-item>
          </v-carousel>

          <v-divider />

          <!-- Footer Actions -->
          <v-card-actions class="pa-4 pa-sm-6 justify-center ga-2 ga-sm-4 flex-wrap">
            <v-btn
              color="primary"
              :size="$vuetify.display.smAndDown ? 'large' : 'x-large'"
              elevation="2"
              prepend-icon="mdi-phone"
              :block="$vuetify.display.smAndDown"
              class="px-4 px-sm-8"
              @click="callPhone(zoomItem.tel)"
            >
              ໂທຫາ
            </v-btn>
            <v-btn
              color="success"
              :size="$vuetify.display.smAndDown ? 'large' : 'x-large'"
              elevation="2"
              prepend-icon="mdi-whatsapp"
              :block="$vuetify.display.smAndDown"
              class="px-4 px-sm-8"
              @click="openWhatsApp(zoomItem)"
            >
              ຕິດຕໍ່ທາງ WhatsApp
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-container>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useDisplay } from "vuetify";

const { smAndDown } = useDisplay();

const { items, allitems, topData, pagination, loading, error, fetchTaxi } = useTaxi();

defineProps({
  store: { type: Object, required: false, default: () => ({}) },
});

const imageBaseUrl = "http://localhost:5151/";

// ── State ──────────────────────────────────────────
const filteredData = ref([]);
const searchQuery = ref("");
const provinces = ref([]);
const districtsForSelectedProvince = ref([]);
const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const commentDialog = ref(false);
const telephone = ref("");
const comment = ref("");
const telephoneError = ref(false);
const commentError = ref(false);
const zoomDialog = ref(false);
const zoomItem = ref({ image: [] });
const zoomSlide = ref(0);
const isZoomPlaying = ref(true);
const isMuted = ref(true);
const currentVideoSlide = ref(0);
const currentImageSlide = ref(0);

// ── Banner Data ─────────────────────────────────────
// Set videoBanners OR imageBanners — video takes priority if set
const videoBanners = ref([
  "https://youtu.be/KTd1yYVoMpE?si=GPO0xlvZHjYZyecB",
  // Add more video URLs here, or leave as empty array [] to use images instead
]);

const imageBanners = ref([
  // Add image URLs here if no video, e.g: "/images/banner1.jpg"
]);

// ── Banner Logic ────────────────────────────────────
// Video mode = at least 1 video URL is provided
const isVideoMode = computed(() => videoBanners.value.length === 1);

// For single video: build iframe src with mute/autoplay
const videoSrc = computed(() => {
  if (!isVideoMode.value) return null;
  const id = extractYoutubeID(videoBanners.value[0]);
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}?autoplay=1&loop=1&playlist=${id}&mute=${isMuted.value ? 1 : 0}`;
});

// For multiple videos in carousel
const videoSrcs = computed(() =>
  videoBanners.value.map((url) => {
    const id = extractYoutubeID(url);
    if (!id) return "";
    return `https://www.youtube.com/embed/${id}?autoplay=1&loop=1&playlist=${id}&mute=${isMuted.value ? 1 : 0}`;
  })
);

// ── Carousel height responsive ──────────────────────
const carouselHeight = computed(() => (smAndDown.value ? 280 : 520));

// ── Helpers ─────────────────────────────────────────
function extractYoutubeID(url) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=))([\w-]+)/
  );
  return match ? match[1] : "";
}

function parseImageArray(imageData) {
  if (!imageData) return ["placeholder.jpg"];
  if (Array.isArray(imageData))
    return imageData.length > 0 ? imageData : ["placeholder.jpg"];
  if (typeof imageData === "string") {
    try {
      const parsed = JSON.parse(imageData);
      return Array.isArray(parsed) ? parsed : [imageData];
    } catch {
      const result = imageData.includes(",")
        ? imageData.split(",").map((s) => s.trim()).filter((s) => s)
        : [imageData];
      return result.length > 0 ? result : ["placeholder.jpg"];
    }
  }
  return ["placeholder.jpg"];
}

function processTaxiItems(items) {
  if (!items || !Array.isArray(items)) return [];
  return items.map((item) => ({
    ...item,
    image: parseImageArray(item.image || item.images || item.photo),
    currentSlide: 0,
    showDetails: false,
  }));
}

// ── Lifecycle ────────────────────────────────────────
onMounted(async () => {
  await fetchTaxi();
  if (allitems.value?.length > 0)
    filteredData.value = processTaxiItems(allitems.value);
  if (topData.value?.length > 0)
    topData.value = processTaxiItems(topData.value);

  try {
    const resProvince = await fetch("http://localhost:5151/api/province/selectall");
    if (!resProvince.ok) throw new Error(`Province API failed: ${resProvince.status}`);
    const provinceData = await resProvince.json();
    const provinceList = Array.isArray(provinceData) ? provinceData : provinceData.data ?? [];
    if (provinceList.length > 0) {
      provinces.value = provinceList.map((p) => ({
        code: p.provinceid || p.id || p.code,
        name: p.province || p.name || p.province_name,
      }));
    }
  } catch (err) {
    console.error("❌ Failed to fetch provinces:", err);
  }
});

// ── Watchers ─────────────────────────────────────────
watch(
  allitems,
  (newItems) => {
    if (newItems?.length > 0) filteredData.value = processTaxiItems(newItems);
  },
  { deep: true }
);

watch(selectedProvince, async (provinceId) => {
  selectedDistrict.value = null;
  districtsForSelectedProvince.value = [];
  if (!provinceId) return;
  try {
    const res = await fetch("http://localhost:5151/api/district/selectbyprovinceid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provinceid: provinceId }),
    });
    if (!res.ok) throw new Error(`District API failed: ${res.status}`);
    const districtData = await res.json();
    const districtList = Array.isArray(districtData) ? districtData : districtData.data ?? [];
    if (districtList.length > 0) {
      districtsForSelectedProvince.value = districtList.map((d) => ({
        code: d.districtid || d.id || d.code,
        name: d.district || d.name || d.district_name,
      }));
    }
  } catch (err) {
    console.error("❌ Failed to fetch districts:", err);
  }
});

watch(searchQuery, async (val) => {
  if (!val) {
    filteredData.value = processTaxiItems(allitems.value);
    return;
  }
  try {
    const res = await fetch("http://localhost:5151/api/taxi/searchbyname", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: val }),
    });
    const responseData = await res.json();
    filteredData.value =
      responseData.status && Array.isArray(responseData.data)
        ? processTaxiItems(responseData.data)
        : [];
  } catch (err) {
    console.error("❌ Failed to search taxis:", err);
    filteredData.value = [];
  }
});

// ── Methods ──────────────────────────────────────────
async function queryByLocation() {
  if (!selectedProvince.value || !selectedDistrict.value) return;
  try {
    const res = await fetch(
      "http://localhost:5151/api/taxi/selectbyprovinceanddistrictid",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provinceid: selectedProvince.value,
          districtid: selectedDistrict.value,
        }),
      }
    );
    if (!res.ok) throw new Error(`Search API failed: ${res.status}`);
    const responseData = await res.json();
    if (responseData.status && Array.isArray(responseData.data)) {
      filteredData.value = processTaxiItems(responseData.data);
      if (filteredData.value.length === 0)
        alert("ບໍ່ພົບລົດແທັກຊີ່ໃນເຂດທີ່ເລືອກ");
    } else {
      filteredData.value = [];
    }
  } catch (err) {
    console.error("❌ Failed to fetch taxis by location:", err);
    alert("ເກີດຂໍ້ຜິດພາດໃນການຄົ້ນຫາ: " + err.message);
  }
}

function openCommentDialog() {
  commentDialog.value = true;
  telephoneError.value = false;
  commentError.value = false;
}

function submitComment() {
  telephoneError.value = !telephone.value.trim();
  commentError.value = !comment.value.trim();
  if (telephoneError.value || commentError.value) return;
  telephone.value = "";
  comment.value = "";
  commentDialog.value = false;
}

function openZoom(item, index) {
  zoomItem.value = item;
  zoomSlide.value = index;
  zoomDialog.value = true;
  isZoomPlaying.value = true;
}

function toggleZoomAutoplay() {
  isZoomPlaying.value = !isZoomPlaying.value;
}

function callPhone(tel) {
  if (!tel) { alert("❌ ບໍ່ມີເບີໂທ"); return; }
  window.location.href = `tel:${tel.replace(/\D/g, "")}`;
}

function openWhatsApp(item) {
  if (!item.tel) { alert("❌ ບໍ່ມີເບີໂທ"); return; }
  const cleanPhone = item.tel.replace(/\D/g, "").replace(/^0+/, "");
  window.open(
    `https://wa.me/856${cleanPhone}?text=${encodeURIComponent("ສະບາຍດີ! ຂ້ອຍຕ້ອງການລົດ")}`,
    "_blank"
  );
}

function handleImageError(event) {
  const imgSrc = event.target.src;
  if (!imgSrc.includes("/uploads/")) {
    event.target.src = imageBaseUrl + "uploads/" + imgSrc.split("/").pop();
  } else if (!imgSrc.includes("/images/")) {
    event.target.src = imageBaseUrl + "images/" + imgSrc.split("/").pop();
  } else {
    event.target.src =
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="20"%3ENo Image%3C/text%3E%3C/svg%3E';
  }
}
</script>

<style scoped>
:deep(.v-carousel__controls .v-btn),
:deep(.v-window__controls .v-btn) {
  background-color: rgba(0, 0, 0, 0.1) !important;
  color: white !important;
  width: 36px !important;
  height: 36px !important;
  border-radius: 50% !important;
  backdrop-filter: blur(4px) !important;
  box-shadow: none !important;
}
:deep(.v-carousel__controls .v-btn:hover),
:deep(.v-window__controls .v-btn:hover) {
  background-color: rgba(0, 0, 0, 0.6) !important;
}
</style>