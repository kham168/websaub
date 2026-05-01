<template>
  <v-container fluid class="pa-0 bg-grey-lighten-4">

    <!-- ── Banner ── -->
    <section class="position-relative">
      <v-sheet
        v-if="bannerMode === 'none'"
        height="400"
        color="grey-darken-4"
        class="d-flex align-center justify-center"
      >
        <div class="text-center">
          <v-icon size="80" color="grey-darken-2">mdi-image-off-outline</v-icon>
          <p class="text-h6 text-grey-darken-1 mt-4">ບໍ່ມີສື່ສຳລັບສະແດງ</p>
        </div>
      </v-sheet>

      <div
        v-else-if="bannerMode === 'video'"
        class="position-relative"
        style="width: 100%; height: 450px; background: #000"
      >
        <iframe
          :src="bannerVideoSrc"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          style="width: 100%; height: 100%; display: block"
        />
        <v-btn
          icon
          position="absolute"
          location="bottom left"
          class="ma-4 blur-btn"
          @click="isMuted = !isMuted"
        >
          <v-icon>{{ isMuted ? "mdi-volume-off" : "mdi-volume-high" }}</v-icon>
        </v-btn>
      </div>

      <v-carousel
        v-else-if="bannerMode === 'image'"
        height="450"
        cycle
        hide-delimiter-background
        show-arrows="hover"
      >
        <v-carousel-item
          v-for="(img, i) in bannerImages"
          :key="i"
          cover
          :src="img"
        >
          <v-overlay
            contained
            model-value="true"
            persistent
            class="align-center justify-center"
            scrim="black"
            opacity="0.3"
          >
            <div class="text-center text-white px-4">
              <h1 class="text-h3 font-weight-black mb-2 d-none d-sm-block">
                ຫ້ອງແຖວໃຫ້ເຊົ່າ
              </h1>
              <p class="text-h6 font-weight-light">
                ສະດວກ, ສະບາຍ, ແລະ ລາຄາເໝາະສົມ
              </p>
            </div>
          </v-overlay>
        </v-carousel-item>
      </v-carousel>
    </section>

    <!-- ── Search ── -->
    <v-container class="position-relative">
      <div class="d-flex align-center mb-4">
        <v-icon color="primary" class="mr-2">mdi-magnify</v-icon>
        <h2 class="text-h6 font-weight-bold">ຄົ້ນຫາຫ້ອງແຖວ</h2>
      </div>

      <v-row dense>
        <v-col cols="12" sm="4">
          <v-select
            v-model="selectedProvince"
            :items="provinces"
            label="ເລືອກແຂວງ"
            variant="filled"
            rounded="lg"
            prepend-inner-icon="mdi-map-marker"
            density="comfortable"
            flat
            clearable
            @update:model-value="onProvinceChange"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <v-select
            v-model="selectedDistrict"
            :items="districts"
            label="ເລືອກເມືອງ"
            variant="filled"
            rounded="lg"
            prepend-inner-icon="mdi-map-marker-outline"
            density="comfortable"
            flat
            clearable
            :disabled="!selectedProvince"
            @update:model-value="onDistrictChange"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <v-select
            v-model="selectedVillage"
            :items="villages"
            label="ເລືອກບ້ານ"
            variant="filled"
            rounded="lg"
            prepend-inner-icon="mdi-home-map-marker"
            density="comfortable"
            flat
            clearable
            :disabled="!selectedDistrict"
          />
        </v-col>
      </v-row>
    </v-container>

    <!-- ── Loading ── -->
    <v-container>
      <div v-if="loading" class="text-center py-16">
        <v-progress-circular indeterminate color="primary" size="64" width="6" />
        <p class="mt-4 text-grey">ກຳລັງໂຫລດຂໍ້ມູນ...</p>
      </div>

      <template v-else>
        <!-- ── Error ── -->
        <v-row v-if="error" justify="center" class="py-10">
          <v-col cols="12" md="6">
            <v-alert
              type="error"
              variant="tonal"
              border="start"
              :text="error"
              icon="mdi-alert-circle"
            >
              <template #append>
                <v-btn
                  color="error"
                  variant="outlined"
                  prepend-icon="mdi-refresh"
                  :loading="refreshing"
                  @click="handleRefresh"
                >
                  ລອງໃໝ່
                </v-btn>
              </template>
            </v-alert>
          </v-col>
        </v-row>

        <!-- ── Empty ── -->
        <v-row
          v-else-if="allHoobXauj.length === 0"
          justify="center"
          class="py-16"
        >
          <v-col cols="12" sm="8" md="4" class="text-center">
            <v-sheet
              rounded="xl"
              color="grey-lighten-4"
              class="pa-10 d-flex flex-column align-center"
            >
              <v-icon size="80" color="grey-lighten-1">
                mdi-store-off-outline
              </v-icon>
              <p class="text-h6 font-weight-medium mt-5 mb-1">ບໍ່ມີຂໍ້ມູນ</p>
              <p class="text-body-2 text-medium-emphasis mb-6">
                ບໍ່ພົບຂໍ້ມູນຫ້ອງແຖວໃນຂະນະນີ້
              </p>
              <v-btn
                color="primary"
                variant="tonal"
                size="large"
                rounded="lg"
                prepend-icon="mdi-refresh"
                :loading="refreshing"
                @click="handleRefresh"
              >
                ໂຫລດໃໝ່
              </v-btn>
            </v-sheet>
          </v-col>
        </v-row>

        <!-- ── Product Grid ── -->
        <v-row v-else>
          <v-col
            v-for="(item, index) in allHoobXauj"
            :key="index"
            cols="12"
            sm="6"
            lg="4"
          >
            <v-card
              rounded="xl"
              class="taxi-card h-100 d-flex flex-column border-thin overflow-hidden"
            >
              <v-hover v-slot="{ isHovering, props }">
                <div
                  v-bind="props"
                  class="overflow-hidden position-relative"
                  style="height: 220px"
                >
                  <v-img
                    :src="item.image[0] || '/favicon.ico'"
                    height="220"
                    cover
                    class="transition-swing"
                    :style="{ transform: isHovering ? 'scale(1.05)' : 'scale(1)' }"
                    style="cursor: pointer"
                    @click="openImageDialog(item.image)"
                  >
                    <template v-slot:placeholder>
                      <v-skeleton-loader type="image" height="220" />
                    </template>
                  </v-img>

                  <v-chip
                    v-if="item.image.length > 1"
                    position="absolute"
                    location="bottom right"
                    class="ma-2 font-weight-bold"
                    color="black"
                    variant="flat"
                    size="small"
                    prepend-icon="mdi-camera"
                  >
                    {{ item.image.length }}
                  </v-chip>
                </div>
              </v-hover>

              <v-card-text class="pa-4 flex-grow-1">
                <div class="d-flex justify-space-between align-start mb-2">
                  <h3 class="text-h6 font-weight-bold text-truncate" style="max-width: 80%">
                    {{ item.dormantalname }}
                  </h3>
                </div>

                <div class="d-flex align-center mb-1">
                  <span class="text-h6 font-weight-bold text-primary">
                    {{ item.price2 }}
                  </span>
                  <span
                    v-if="Number(item.price1) > 0"
                    class="text-caption text-decoration-line-through text-medium-emphasis ml-2"
                  >
                    {{ item.price1 }}
                  </span>
                </div>

                <v-divider class="mb-3 mt-2" />

                <div class="d-flex align-center text-body-2 text-medium-emphasis">
                  <v-icon size="16" color="red" class="mr-1">mdi-map-marker</v-icon>
                  {{ item.province }}, {{ item.district }}
                </div>
              </v-card-text>

              <v-card-actions class="px-4 pb-4 pt-0">
                <v-btn
                  variant="outlined"
                  color="primary"
                  rounded="lg"
                  class="flex-grow-1 text-none"
                  prepend-icon="mdi-eye"
                  @click.stop="showDetailsDialog(item)"
                >
                  ລາຍລະອຽດ
                </v-btn>
                <v-btn
                  color="success"
                  variant="flat"
                  rounded="lg"
                  class="flex-grow-1 text-none ml-2"
                  prepend-icon="mdi-whatsapp"
                  @click.stop="openWhatsAppDirect(item)"
                >
                  WhatsApp
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <v-divider class="my-12" />

      <!-- ── Top Brands ── -->
      <div v-if="topData && topData.length > 0" class="mt-12">
        <div class="d-flex align-center mb-6">
          <div class="bg-primary rounded-circle pa-1 mr-3">
            <v-icon color="white" size="small">mdi-star</v-icon>
          </div>
          <h2 class="text-h5 font-weight-bold">ແນະນຳເບຣນດອື່ນໆ</h2>
          <v-spacer />
          <v-btn icon size="small" variant="outlined" class="mr-1" @click="scrollBrands(-1)">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn icon size="small" variant="outlined" @click="scrollBrands(1)">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>

        <div
          ref="brandsTrack"
          class="d-flex ga-4 pb-2"
          style="overflow-x: auto; scroll-behavior: smooth; scrollbar-width: none; cursor: grab;"
        >
          <TopDataCard :topData="topData" />
        </div>
      </div>
    </v-container>

    <v-dialog v-model="showDialog" max-width="860px" :scrim="'rgba(0,0,0,0.8)'">
    <v-card rounded="xl" color="grey-darken-4" elevation="24">
 
      <!-- Header -->
      <v-toolbar color="transparent" flat class="px-2">
        <v-avatar color="deep-purple" rounded="lg" size="38" class="mr-3">
          <v-icon color="white" size="18">mdi-image-multiple</v-icon>
        </v-avatar>
        <div>
          <v-toolbar-title class="text-white text-body-1 font-weight-bold pa-0">
            ຮູບພາບບັນຍາກາດຂອງຫ້ອງແຖວ
          </v-toolbar-title>
          <p class="text-caption text-grey ml-0 pl-0" style="margin-top:-2px;">
            ຄລິກຮູບຂະໜາດນ້ອຍເພື່ອປ່ຽນ
          </p>
        </div>
        <v-spacer />
        <v-btn
          icon size="small" variant="outlined"
          color="grey-lighten-1"
          @click="showDialog = false"
        >
          <v-icon size="18">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
 
      <v-divider color="grey-darken-3" />
 
      <!-- Main Image -->
      <div class="position-relative">
        <v-carousel
          v-if="selectedImages.length > 0"
          v-model="currentIndex"
          hide-delimiter-background
          hide-delimiters
          height="400"
          :show-arrows="selectedImages.length > 1"
        >
          <v-carousel-item v-for="(img, i) in selectedImages" :key="i">
            <v-img :src="img" height="400" cover />
          </v-carousel-item>
        </v-carousel>
 
        <!-- Counter chip overlaid -->
        <v-chip
          position="absolute"
          location="bottom right"
          class="ma-3 font-weight-bold"
          color="black"
          variant="flat"
          size="small"
          prepend-icon="mdi-camera"
          style="opacity:0.85;"
        >
          {{ currentIndex + 1 }} / {{ selectedImages.length }}
        </v-chip>
      </div>
 
      <!-- Thumbnails -->
      <v-card-text class="py-3 px-4">
        <v-row justify="center" no-gutters class="ga-2">
          <v-col
            v-for="(img, i) in selectedImages"
            :key="i"
            cols="auto"
          >
            <v-img
              :src="img"
              height="52"
              width="72"
              cover
              rounded="lg"
              :class="[
                'cursor-pointer',
                currentIndex === i
                  ? 'border-deep-purple border-opacity-100'
                  : 'opacity-40'
              ]"
              :style="currentIndex === i ? 'border: 2px solid rgb(var(--v-theme-deep-purple)); box-shadow: 0 0 0 3px rgba(103,58,183,0.35);' : 'border: 2px solid transparent;'"
              @click="currentIndex = i"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
 
 
  <!-- ═══════════════════════════════════════════
       DETAILS DIALOG
  ════════════════════════════════════════════ -->
  <v-dialog v-model="showDetails" max-width="860px" scrollable :scrim="'rgba(0,0,0,0.65)'">
    <v-card rounded="xl" elevation="24">
 
      <!-- Gradient Header -->
      <v-card-title
        class="pa-5 pa-sm-6"
        style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); overflow:hidden; position:relative;"
      >
        <!-- Decorative orbs via v-sheet -->
        <v-sheet
          rounded="circle"
          color="white"
          style="opacity:0.07; position:absolute; width:200px; height:200px; top:-70px; right:-50px; pointer-events:none;"
        />
        <v-sheet
          rounded="circle"
          color="white"
          style="opacity:0.05; position:absolute; width:130px; height:130px; bottom:-50px; left:40%; pointer-events:none;"
        />
 
        <div class="d-flex align-center ga-4" style="position:relative; z-index:1;">
          <!-- Avatar -->
          <v-avatar
            size="52"
            rounded="xl"
            color="white"
            style="opacity:0.9; border: 2px solid rgba(255,255,255,0.4); backdrop-filter:blur(8px);"
            class="flex-shrink-0 d-none d-sm-flex"
          >
            <v-icon color="deep-purple" size="24">mdi-home-city</v-icon>
          </v-avatar>
 
          <div class="flex-grow-1 min-width-0">
            <h3 class="text-white font-weight-bold text-h6 text-truncate">
              {{ detailItem?.dormantalname }}
            </h3>
            <div class="d-flex flex-wrap align-center ga-2 mt-2">
              <v-chip size="small" variant="flat" color="success" label>
                <v-icon start size="12">mdi-cash</v-icon>
                {{ detailItem?.price2 || 'N/A' }}
              </v-chip>
              <v-chip size="small" variant="flat" color="white" label>
                <v-icon start size="12" color="red">mdi-map-marker</v-icon>
                <span class="text-grey-darken-2">{{ detailItem?.province }}, {{ detailItem?.district }}</span>
              </v-chip>
            </div>
          </div>
        </div>
      </v-card-title>
 
      <v-divider />
 
      <!-- Scrollable Body -->
      <v-card-text class="pa-0" v-if="detailItem">
 
        <!-- Gallery -->
        <div class="position-relative" v-if="detailItem.image?.length">
          <v-carousel
            height="270"
            cycle
            interval="3000"
            hide-delimiter-background
            show-arrows
          >
            <v-carousel-item
              v-for="(img, i) in detailItem.image"
              :key="i"
              @click="openImageDialog(detailItem.image, i)"
              style="cursor: zoom-in;"
            >
              <v-img :src="img" height="270" cover />
            </v-carousel-item>
          </v-carousel>
 
          <v-chip
            position="absolute"
            location="bottom center"
            class="mb-3 text-caption"
            color="black"
            variant="flat"
            size="small"
            prepend-icon="mdi-magnify-plus-outline"
            style="opacity:0.75; transform:translateX(-50%); left:50%;"
          >
            ຄລິກຮູບເພື່ອຂະຫຍາຍ
          </v-chip>
        </div>
 
        <div class="pa-5 d-flex flex-column ga-4">
 
          <!-- ── Price Card ── -->
          <v-card variant="outlined" rounded="lg">
            <v-card-item class="py-3 px-4 bg-amber-lighten-5">
              <template #prepend>
                <v-avatar size="30" color="amber-lighten-4" rounded="lg">
                  <v-icon size="16" color="amber-darken-3">mdi-currency-usd</v-icon>
                </v-avatar>
              </template>
              <v-card-title class="text-body-2 font-weight-bold pa-0">ລາຍລະອຽດລາຄາ</v-card-title>
            </v-card-item>
 
            <v-divider />
 
            <v-card-text class="pa-4">
              <div v-if="Number(detailItem.price1) > 0" class="d-flex justify-space-between align-center mb-2">
                <span class="text-body-2 text-medium-emphasis">ລາຄາເຕັມ</span>
                <span class="text-body-2 text-medium-emphasis text-decoration-line-through">{{ detailItem.price1 }}</span>
              </div>
              <div class="d-flex justify-space-between align-center">
                <span class="text-body-2 text-medium-emphasis">ລາຄາປັດຈຸບັນ</span>
                <span class="text-h6 font-weight-black text-success">{{ detailItem.price2 }}</span>
              </div>
            </v-card-text>
          </v-card>
 
          <!-- ── Room Info Card ── -->
          <v-card variant="outlined" rounded="lg">
            <v-card-item class="py-3 px-4 bg-deep-purple-lighten-5">
              <template #prepend>
                <v-avatar size="30" color="deep-purple-lighten-4" rounded="lg">
                  <v-icon size="16" color="deep-purple-darken-2">mdi-door-open</v-icon>
                </v-avatar>
              </template>
              <v-card-title class="text-body-2 font-weight-bold pa-0">ລາຍລະອຽດຫ້ອງແຖວ</v-card-title>
            </v-card-item>
 
            <v-divider />
 
            <v-card-text class="pa-4">
              <!-- Stat boxes -->
              <v-row dense class="mb-3">
                <v-col cols="4">
                  <v-sheet rounded="lg" color="red-lighten-5" class="pa-3 text-center">
                    <p class="text-h5 font-weight-black text-red mb-0">{{ detailItem.totalroom || 0 }}</p>
                    <p class="text-caption text-medium-emphasis mt-1">ຫ້ອງທັງໝົດ</p>
                  </v-sheet>
                </v-col>
                <v-col cols="4">
                  <v-sheet rounded="lg" color="orange-lighten-5" class="pa-3 text-center">
                    <p class="text-h5 font-weight-black text-orange mb-0">{{ detailItem.activeroom || 0 }}</p>
                    <p class="text-caption text-medium-emphasis mt-1">ຫ້ອງເຕັມ</p>
                  </v-sheet>
                </v-col>
                <v-col cols="4">
                  <v-sheet rounded="lg" color="green-lighten-5" class="pa-3 text-center">
                    <p class="text-h5 font-weight-black text-green mb-0">{{ availableRooms }}</p>
                    <p class="text-caption text-medium-emphasis mt-1">ຫ້ອງຫວ່າງ</p>
                  </v-sheet>
                </v-col>
              </v-row>
 
              <!-- Type chip -->
              <div v-if="detailItem.type" class="d-flex align-center mb-3">
                <span class="text-body-2 text-medium-emphasis mr-2">ປະເພດ:</span>
                <v-chip size="small" color="primary" variant="tonal">{{ detailItem.type }}</v-chip>
              </div>
 
              <!-- More detail -->
              <v-sheet
                v-if="detailItem.moredetail"
                rounded="lg"
                color="grey-lighten-4"
                class="pa-3"
                style="border-left: 3px solid rgb(var(--v-theme-primary));"
              >
                <p class="text-body-2 text-medium-emphasis mb-0">{{ detailItem.moredetail }}</p>
              </v-sheet>
            </v-card-text>
          </v-card>
 
          <!-- ── Location Card ── -->
          <v-card variant="outlined" rounded="lg">
            <v-card-item class="py-3 px-4 bg-blue-lighten-5">
              <template #prepend>
                <v-avatar size="30" color="blue-lighten-4" rounded="lg">
                  <v-icon size="16" color="blue-darken-2">mdi-map-marker</v-icon>
                </v-avatar>
              </template>
              <v-card-title class="text-body-2 font-weight-bold pa-0">ທີ່ຕັ້ງ</v-card-title>
            </v-card-item>
 
            <v-divider />
 
            <v-card-text class="pa-4">
              <v-row>
                <v-col cols="12" sm="4">
                  <p class="text-caption text-uppercase text-medium-emphasis mb-1" style="letter-spacing:0.5px;">ແຂວງ</p>
                  <p class="text-body-2 font-weight-bold text-high-emphasis">{{ detailItem.province }}</p>
                </v-col>
                <v-col cols="12" sm="4">
                  <p class="text-caption text-uppercase text-medium-emphasis mb-1" style="letter-spacing:0.5px;">ເມືອງ</p>
                  <p class="text-body-2 font-weight-bold text-high-emphasis">{{ detailItem.district }}</p>
                </v-col>
                <v-col cols="12" sm="4">
                  <p class="text-caption text-uppercase text-medium-emphasis mb-1" style="letter-spacing:0.5px;">ບ້ານ</p>
                  <p class="text-body-2 font-weight-bold text-high-emphasis">
                    {{ detailItem.villages?.length ? detailItem.villages.join(', ') : 'N/A' }}
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- ── Contact Card ── -->
          <v-card variant="outlined" rounded="lg">
            <v-card-item class="py-3 px-4 bg-green-lighten-5">
              <template #prepend>
                <v-avatar size="30" color="green-lighten-4" rounded="lg">
                  <v-icon size="16" color="green-darken-2">mdi-star</v-icon>
                </v-avatar>
              </template>
              <v-card-title class="text-body-2 font-weight-bold pa-0">ຂໍ້ມູນຕິດຕໍ່</v-card-title>
            </v-card-item>

            <v-divider />

            <v-card-text class="pa-4">
              <v-row dense>
                <v-btn
          color="deep-purple"
          variant="flat"
          size="large"
          rounded="pill"
          prepend-icon="mdi-phone"
          class="font-weight-bold px-8"
          elevation="2"
          @click="callPhone(detailItem?.contactnumber)"
        >
          ໂທຫາ
        </v-btn>

        <v-btn
          color="success"
          variant="flat"
          size="large"
          rounded="pill"
          prepend-icon="mdi-whatsapp"
          class="font-weight-bold px-8 mt-2 mt-sm-0 ml-sm-2"
          elevation="2"
          @click="openWhatsAppDirect(detailItem)"
        >
          ຕິດຕໍ່ທາງ WhatsApp
        </v-btn>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- ── Video Card (optional) ── -->
          <v-card variant="outlined" rounded="lg" v-if="detailItem.locationvideo">
            <v-card-item class="py-3 px-4 bg-red-lighten-5">
              <template #prepend>
                <v-avatar size="30" color="red-lighten-4" rounded="lg">
                  <v-icon size="16" color="red-darken-2">mdi-play-circle</v-icon>
                </v-avatar>
              </template>
              <v-card-title class="text-body-2 font-weight-bold pa-0">ວິດີໂອສະຖານທີ່</v-card-title>
            </v-card-item>
 
            <v-divider />
 
            <v-card-text class="pa-4">
              <v-btn
                :href="detailItem.locationvideo"
                target="_blank"
                color="red"
                variant="tonal"
                rounded="lg"
                prepend-icon="mdi-youtube"
                class="font-weight-bold"
              >
                ເບີ່ງວິດີໂອ
              </v-btn>
            </v-card-text>
          </v-card>
 
        </div>
      </v-card-text>
      
 
      <v-divider />
 
      <!-- ── Footer Actions (with Close button) ── -->
      <v-card-actions class="pa-5 justify-center ga-3 flex-wrap">
        <!-- <v-btn
          color="deep-purple"
          variant="flat"
          size="large"
          rounded="pill"
          prepend-icon="mdi-phone"
          class="font-weight-bold px-8"
          elevation="2"
          @click="callPhone(detailItem?.contactnumber)"
        >
          ໂທຫາ
        </v-btn>

        <v-btn
          color="success"
          variant="flat"
          size="large"
          rounded="pill"
          prepend-icon="mdi-whatsapp"
          class="font-weight-bold px-8"
          elevation="2"
          @click="openWhatsAppDirect(detailItem)"
        >
          ຕິດຕໍ່ທາງ WhatsApp
        </v-btn> -->

        <v-btn
          color="grey"
          variant="outlined"
          size="large"
          rounded="pill"
          prepend-icon="mdi-close"
          class="font-weight-bold px-8"
          @click="showDetails = false"
        >
          ປິດ
        </v-btn>
      </v-card-actions>
 
    </v-card>
  </v-dialog>
  </v-container>
</template>

<script setup>
const {
  allHoobXauj,
  loading,
  error,
  video1,
  topData,
  fetchHoobXauj,
  channelimage,
  qr,
} = useHoobXauj();

// ── image dialog ──────────────────────────────────────
const showDialog = ref(false);
const selectedImages = ref([]);
const currentIndex = ref(0);

// ── details dialog ────────────────────────────────────
const showDetails = ref(false);
const detailItem = ref(null);

// ── refresh ───────────────────────────────────────────
const refreshing = ref(false);

// ── search / filter ───────────────────────────────────
const searchQuery = ref("");
const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const selectedVillage = ref(null);
const provinces = ref([]);
const districts = ref([]);
const villages = ref([]);

// ── brands scroll ─────────────────────────────────────
const brandsTrack = ref(null);

const scrollBrands = (dir) => {
  if (brandsTrack.value) {
    brandsTrack.value.scrollLeft += dir * 220;
  }
};

function onProvinceChange() {
  selectedDistrict.value = null;
  selectedVillage.value = null;
}

function onDistrictChange() {
  selectedVillage.value = null;
}

function openImageDialog(images, startIndex = 0) {
  selectedImages.value = images;
  currentIndex.value = startIndex;
  showDialog.value = true;
}

function showDetailsDialog(item) {
  detailItem.value = item;
  showDetails.value = true;
}

async function handleRefresh() {
  refreshing.value = true;
  try {
    await fetchHoobXauj();
  } catch (err) {
    console.error("Refresh failed:", err);
  } finally {
    refreshing.value = false;
  }
}

const callPhone = (tel) => {
  if (tel) window.location.href = `tel:${String(tel).replace(/\D/g, "")}`;
};

// ── room helpers ──────────────────────────────────────
const availableRooms = computed(() => {
  if (!detailItem.value) return 0;
  return (detailItem.value.totalroom || 0) - (detailItem.value.activeroom || 0);
});

// ── phone helpers ─────────────────────────────────────
const cleanPhoneNumber = (phone) => {
  if (!phone) return "";
  const cleaned = String(phone).replace(/\D/g, "");
  if (cleaned.startsWith("856")) return cleaned;
  if (cleaned.startsWith("20")) return "856" + cleaned;
  return "856" + cleaned;
};

const getWhatsAppLink = (phone) => {
  const cleanedPhone = cleanPhoneNumber(phone);
  if (!cleanedPhone || cleanedPhone.length < 11) return "#";
  const message =
    `ສະບາຍດີ 👋\nຂ້ອຍສົນໃຈຫ້ອງແຖວນີ້:\n` +
    `  ລະຫັດ: ${detailItem.value?.id || "N/A"}\n` +
    `🏨 ຊື່: ${detailItem.value?.dormantalname || "N/A"}\n` +
    `🛏 ຫ້ອງວ່າງ: ${availableRooms.value || 0}\n` +
    `💰 ລາຄາ: ${detailItem.value?.price2 || "N/A"} ກີບ\n` +
    `📍 ສະຖານທີ່: ${detailItem.value?.province || ""}, ${detailItem.value?.district || ""}\n\n` +
    `ກະລຸນາໃຫ້ຂໍ້ມູນເພີ່ມເຕີມ. ຂອບໃຈ!`;
  return `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`;
};

const openWhatsAppDirect = (item) => {
  if (!item?.tel) return;
  let cleanNumber = String(item.tel).replace(/\D/g, "");
  if (cleanNumber.startsWith("0")) cleanNumber = cleanNumber.substring(1);
  const message = encodeURIComponent(
    `ສະບາຍດີ 👋\nຂ້ອຍສົນໃຈຫ້ອງແຖວ: ${item.dormantalname || ""}\n💰 ລາຄາ: ${item.price2 || "N/A"}`
  );
  window.open(`https://wa.me/856${cleanNumber}?text=${message}`, "_blank");
};

// ── banner ────────────────────────────────────────────
const isMuted = ref(true);

function extractYoutubeID(url) {
  if (!url) return "";
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=|shorts\/))([\w-]+)/
  );
  return match ? match[1] : "";
}

const bannerMode = computed(() => {
  if (video1.value) return "video";
  if (channelimage.value) return "image";
  return "none";
});

const bannerImages = computed(() => {
  if (!channelimage.value) return [];
  return Array.isArray(channelimage.value)
    ? channelimage.value
    : [channelimage.value];
});

const bannerVideoSrc = computed(() => {
  const id = extractYoutubeID(video1.value);
  if (!id) return "";
  return (
    `https://www.youtube-nocookie.com/embed/${id}` +
    `?autoplay=1&mute=${isMuted.value ? 1 : 0}&loop=1&playlist=${id}&rel=0`
  );
});

// ── lifecycle ─────────────────────────────────────────
onMounted(async () => {
  try {
    await fetchHoobXauj();
    console.log("✅ video1:", video1.value);
    console.log("✅ channelimage:", channelimage.value);
    console.log("✅ bannerMode:", bannerMode.value);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
});
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
.transition-swing {
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp-limit: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.taxi-card {
  transition: all 0.3s ease;
  border-color: rgba(0, 0, 0, 0.05) !important;
}
.taxi-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1) !important;
}
.blur-btn {
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(10px);
  color: white !important;
}
.border-thin {
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
}
@media (max-width: 600px) {
  .text-h3 {
    font-size: 1.75rem !important;
  }
}
.d-flex[style*="overflow-x"]::-webkit-scrollbar {
  display: none;
}
</style>