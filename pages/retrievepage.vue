<template>
  <v-container fluid class="pa-0 bg-grey-lighten-4">
    <section class="position-relative">
      <!-- No media -->
      <v-sheet
        v-if="bannerMode === 'none'"
        height="400"
        color="grey-darken-4"
        class="d-flex align-center justify-center"
      >
        <div class="text-center">
          <v-icon size="80" color="grey-darken-2">mdi-image-off-outline</v-icon>
          <p class="text-h6 text-grey-darken-1 mt-4">{{ t("no_media") }}</p>
        </div>
      </v-sheet>

      <!-- Video banner -->
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

      <!-- Image carousel banner -->
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
            :model-value="true"
            persistent
            class="align-center justify-center"
            scrim="black"
            opacity="0.3"
          >
            <div class="text-center text-white px-4">
              <h1 class="text-h3 font-weight-black mb-2 d-none d-sm-block">
                {{ channelStore.channelName || t("ask_question") }}
              </h1>
              <p class="text-h6 font-weight-light">
                {{
                  channelStore.detail || "ສະດວກ, ວ່ອງໄວ, ແລະ ປອດໄພທຸກການເດີນທາງ"
                }}
              </p>
            </div>
          </v-overlay>
        </v-carousel-item>
      </v-carousel>
    </section>

    <!-- ── Search Bar ────────────────────────────────────────────────── -->
    <v-container class="position-relative">
      <div class="d-flex align-center mb-4">
        <v-icon color="primary" class="mr-2">mdi-magnify</v-icon>
        <h2 class="text-h6 font-weight-bold">
          {{ t("search_label") }} {{ channelStore.channelName || "" }}
        </h2>
      </div>

      <v-row dense>
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="selectedProvince"
            :items="provinces"
            :label="t('select_province')"
            item-title="name"
            item-value="code"
            variant="filled"
            rounded="lg"
            prepend-inner-icon="mdi-map-marker-outline"
            density="comfortable"
            flat
          />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="selectedDistrict"
            :items="districtsForSelectedProvince"
            :label="t('select_district')"
            variant="filled"
            rounded="lg"
            prepend-inner-icon="mdi-map-outline"
            density="comfortable"
            flat
            :no-data-text="
              !selectedProvince ? t('select_province_first') : t('no_data')
            "
          />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="searchQuery"
            :label="t('search_placeholder')"
            variant="filled"
            rounded="lg"
            prepend-inner-icon="mdi-magnify"
            density="comfortable"
            flat
            clearable
          />
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-btn
            block
            height="48"
            color="primary"
            rounded="lg"
            elevation="2"
            @click="openCommentDialog"
            prepend-icon="mdi-chat-question"
            class="text-none font-weight-bold"
          >
            {{ t("ask_question") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- ── Product Grid ──────────────────────────────────────────────── -->
    <v-container>
      <!-- Loading -->
      <div v-if="loadings" class="text-center py-16">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
          width="6"
        />
        <p class="mt-4 text-grey">{{ t("loading") }}</p>
      </div>

      <template v-else>
        <!-- Empty state -->
        <div v-if="filteredData.length === 0" class="text-center py-16">
          <v-icon size="80" color="grey-lighten-2">mdi-car-search</v-icon>
          <p class="text-h6 text-grey mt-4">{{ t("not_found") }}</p>
          <p class="text-body-2 text-grey-lighten-1 mt-2">
            {{ t("not_found_hint") }}
          </p>
          <v-btn
            class="mt-6"
            color="primary"
            variant="outlined"
            rounded="lg"
            @click="resetFilter"
          >
            {{ t("clear_search") }}
          </v-btn>
        </div>

        <v-row v-else>
          <v-col
            v-for="(item, index) in filteredData"
            :key="index"
            cols="12"
            sm="6"
            lg="4"
          >
            <v-card
              rounded="xl"
              class="taxi-card h-100 d-flex flex-column border-thin overflow-hidden"
            >
              <!-- Image → opens gallery -->
              <v-hover v-slot="{ isHovering, props }">
                <div
                  v-bind="props"
                  class="overflow-hidden position-relative"
                  style="height: 220px; cursor: zoom-in"
                >
                  <v-img
                    :src="item.image[0]"
                    height="220"
                    cover
                    class="transition-swing"
                    :style="{
                      transform: isHovering ? 'scale(1.05)' : 'scale(1)',
                    }"
                    @click="openGallery(item, 0)"
                  >
                    <template v-slot:placeholder>
                      <v-skeleton-loader type="image" height="220" />
                    </template>
                  </v-img>

                  <!-- Image count badge -->
                  <v-chip
                    v-if="item.image.length > 1"
                    position="absolute"
                    location="top left"
                    class="ma-3"
                    color="black"
                    variant="flat"
                    size="x-small"
                    style="opacity: 0.75"
                  >
                    <v-icon start size="12">mdi-image-multiple</v-icon>
                    {{ item.image.length }}
                  </v-chip>

                  <!-- Price badge — only numeric prices -->
                  <v-chip
                    v-if="
                      isNumericPrice(getItemPrice2(item)) ||
                      isNumericPrice(getItemPrice1(item))
                    "
                    position="absolute"
                    location="top right"
                    class="ma-3 font-weight-bold"
                    color="primary"
                    variant="flat"
                    size="small"
                  >
                    <span
                      v-if="
                        isNumericPrice(getItemPrice1(item)) &&
                        isNumericPrice(getItemPrice2(item)) &&
                        parsePrice(getItemPrice1(item)) >
                          parsePrice(getItemPrice2(item))
                      "
                      class="text-decoration-line-through opacity-70 mr-1 text-caption"
                    >
                      {{ parsePrice(getItemPrice1(item)).toLocaleString() }}
                    </span>
                    {{
                      isNumericPrice(getItemPrice2(item))
                        ? parsePrice(getItemPrice2(item)).toLocaleString()
                        : parsePrice(getItemPrice1(item)).toLocaleString()
                    }}
                    ₭
                  </v-chip>
                </div>
              </v-hover>

              <!-- Card body -->
              <v-card-text class="pa-4 flex-grow-1">
                <!-- Name -->
                <div
                  v-if="getItemName(item)"
                  class="d-flex justify-space-between align-start mb-2"
                >
                  <h3
                    class="text-h6 font-weight-bold text-truncate"
                    style="max-width: 70%"
                  >
                    {{ getItemName(item) }}
                  </h3>
                  <v-icon color="grey-lighten-1">mdi-shield-check</v-icon>
                </div>

                <!-- Numeric prices -->
                <v-list-item
                  v-if="
                    isNumericPrice(getItemPrice1(item)) ||
                    isNumericPrice(getItemPrice2(item))
                  "
                  class="px-0"
                >
                  <template v-slot:prepend>
                    <v-icon color="success">mdi-cash-multiple</v-icon>
                  </template>
                  <v-list-item-title>{{ t("price_label") }}</v-list-item-title>
                  <v-list-item-subtitle class="mt-1">
                    <div class="d-flex align-center ga-2 flex-wrap">
                      <span
                        v-if="
                          isNumericPrice(getItemPrice1(item)) &&
                          isNumericPrice(getItemPrice2(item)) &&
                          parsePrice(getItemPrice1(item)) >
                            parsePrice(getItemPrice2(item))
                        "
                        class="text-body-2 text-red text-decoration-line-through"
                      >
                        {{ parsePrice(getItemPrice1(item)).toLocaleString() }} ₭
                      </span>
                      <span
                        v-if="isNumericPrice(getItemPrice2(item))"
                        class="text-h6"
                      >
                        {{ parsePrice(getItemPrice2(item)).toLocaleString() }} ₭
                      </span>
                      <span
                        v-else-if="isNumericPrice(getItemPrice1(item))"
                        class="text-h6"
                      >
                        {{ parsePrice(getItemPrice1(item)).toLocaleString() }} ₭
                      </span>
                      <v-chip
                        v-if="
                          isNumericPrice(getItemPrice1(item)) &&
                          isNumericPrice(getItemPrice2(item)) &&
                          parsePrice(getItemPrice1(item)) >
                            parsePrice(getItemPrice2(item))
                        "
                        color="red"
                        size="x-small"
                        variant="flat"
                        class="font-weight-bold"
                      >
                        {{ t("discount") }} -{{
                          Math.round(
                            (1 -
                              parsePrice(getItemPrice2(item)) /
                                parsePrice(getItemPrice1(item))) *
                              100
                          )
                        }}%
                      </v-chip>
                    </div>
                  </v-list-item-subtitle>
                </v-list-item>

                <!-- Text prices (non-numeric like "ແຊັດຖາມ") -->
                <div
                  v-else-if="getItemPrice1(item) || getItemPrice2(item)"
                  class="d-flex flex-column ga-1 mt-2 mb-2"
                >
                  <div
                    v-if="getItemPrice1(item)"
                    class="d-flex align-start ga-2"
                  >
                    <v-icon size="16" color="success" class="mt-1"
                      >mdi-cash</v-icon
                    >
                    <span class="text-caption text-grey-darken-2 line-clamp-2">
                      {{ getItemPrice1(item) }}
                    </span>
                  </div>
                  <div
                    v-if="
                      getItemPrice2(item) &&
                      getItemPrice2(item) !== getItemPrice1(item)
                    "
                    class="d-flex align-start ga-2"
                  >
                    <v-icon size="16" color="primary" class="mt-1"
                      >mdi-information-outline</v-icon
                    >
                    <span class="text-caption text-grey-darken-2 line-clamp-2">
                      {{ getItemPrice2(item) }}
                    </span>
                  </div>
                </div>

                <v-divider class="my-3" />

                <!-- Detail -->
                <p
                  v-if="getItemDetail(item)"
                  class="text-caption text-grey-darken-1 line-clamp-2"
                >
                  {{ getItemDetail(item) }}
                </p>
              </v-card-text>

              <!-- Card actions -->
              <v-card-actions class="px-4 pb-4 pt-0">
                <v-btn
                  variant="outlined"
                  color="primary"
                  rounded="lg"
                  class="flex-grow-1 text-none"
                  prepend-icon="mdi-information-outline"
                  @click="openDetail(item)"
                >
                  {{ t("detail_btn") }}
                </v-btn>

                <template v-if="item.typestatus === '1'">
                  <div
                    v-if="cart[item.id]"
                    class="d-flex align-center ga-2 ml-2 flex-grow-1"
                  >
                    <v-btn
                      icon="mdi-minus"
                      size="small"
                      variant="outlined"
                      color="primary"
                      @click.stop="decrementQty(item.id)"
                    />
                    <span class="text-h6 font-weight-bold px-2">{{
                      cart[item.id]
                    }}</span>
                    <v-btn
                      icon="mdi-plus"
                      size="small"
                      variant="flat"
                      color="primary"
                      @click.stop="incrementQty(item.id)"
                    />
                  </div>
                  <v-btn
                    v-else
                    color="primary"
                    variant="flat"
                    rounded="lg"
                    class="flex-grow-1 text-none ml-2"
                    prepend-icon="mdi-cart-plus"
                    @click="addToCart(item)"
                  >
                    <span
                      class="text-truncate d-inline-block"
                      style="max-width: 100px"
                    >
                      {{ t("add_to_cart") }}
                    </span>
                  </v-btn>
                </template>

                <v-btn
                  v-else
                  color="success"
                  variant="flat"
                  rounded="lg"
                  class="flex-grow-1 text-none ml-2"
                  prepend-icon="mdi-whatsapp"
                  @click="openWhatsApp(item)"
                >
                  WhatsApp
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Pagination -->
        <div
          v-if="pagination && pagination.totalPages > 1"
          class="d-flex justify-center mt-8"
        >
          <v-pagination
            v-model="currentPage"
            :length="pagination.totalPages"
            rounded="lg"
            @update:model-value="onPageChange"
          />
        </div>
      </template>

      <v-divider class="my-8" />
      <div v-if="topData && topData.length > 0" class="mt-12">
        <div class="d-flex align-center mb-4 px-2">
          <div class="bg-primary rounded-circle pa-1 mr-3">
            <v-icon color="white" size="">mdi-star</v-icon>
          </div>
          <h2
            class="text-h6 font-weight-bold"
            style="
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              max-width: 100%;
            "
          >
            {{ t("recommended_brands") }}
          </h2>
          >
        </div>

        <TopDataCard :topData="topData" />
      </div>
    </v-container>

    <!-- ── Gallery Dialog ────────────────────────────────────────────── -->
    <v-dialog
      v-model="galleryDialog"
      max-width="960"
      transition="dialog-transition"
    >
      <v-card
        rounded="xl"
        color="grey-darken-4"
        elevation="24"
        class="overflow-hidden"
      >
        <div class="d-flex align-center justify-space-between pa-3 pa-sm-4">
          <div class="d-flex align-center ga-2 min-width-0">
            <v-icon color="white" size="20">mdi-image-multiple</v-icon>
            <span class="text-white font-weight-bold text-body-1 text-truncate">
              {{ getItemName(galleryItem) || t("no_media") }}
            </span>
          </div>
          <div class="d-flex align-center ga-2 flex-shrink-0">
            <v-chip
              color="grey-darken-2"
              variant="flat"
              size="small"
              class="text-white"
            >
              {{ gallerySlide + 1 }} / {{ galleryItem.image?.length || 0 }}
            </v-chip>
            <v-btn
              icon
              size="small"
              variant="text"
              color="white"
              @click="galleryDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>

        <v-carousel
          v-model="gallerySlide"
          :height="galleryHeight"
          hide-delimiters
          show-arrows
          class="gallery-carousel"
        >
          <template v-slot:prev="{ props }">
            <v-btn
              v-bind="props"
              icon
              size="large"
              elevation="6"
              class="gallery-nav-btn"
            >
              <v-icon size="30" color="grey-darken-3">mdi-chevron-left</v-icon>
            </v-btn>
          </template>
          <template v-slot:next="{ props }">
            <v-btn
              v-bind="props"
              icon
              size="large"
              elevation="6"
              class="gallery-nav-btn"
            >
              <v-icon size="30" color="grey-darken-3">mdi-chevron-right</v-icon>
            </v-btn>
          </template>
          <v-carousel-item
            v-for="(img, i) in galleryItem.image"
            :key="`g-${i}`"
          >
            <v-img
              :src="img"
              :height="galleryHeight"
              contain
              class="bg-grey-darken-4"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="white" size="48" />
                </v-row>
              </template>
            </v-img>
          </v-carousel-item>
        </v-carousel>

        <div
          v-if="galleryItem.image && galleryItem.image.length > 1"
          class="thumbnail-strip pa-3 d-flex ga-2 justify-center"
        >
          <div
            v-for="(img, i) in galleryItem.image"
            :key="`t-${i}`"
            class="thumbnail-wrapper"
            :class="{ 'thumbnail-active': gallerySlide === i }"
            @click="gallerySlide = i"
          >
            <v-img
              :src="img"
              width="64"
              height="64"
              cover
              class="rounded-lg"
              style="cursor: pointer"
            />
          </div>
        </div>
      </v-card>
    </v-dialog>

    <!-- ── Detail Dialog ─────────────────────────────────────────────── -->
    <v-dialog
      v-model="detailDialog"
      max-width="700"
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card rounded="xl" elevation="24">
        <div
          class="pa-4 pa-sm-6 d-flex align-center"
          style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        >
          <div class="flex-grow-1 min-width-0">
            <h3 class="text-h6 font-weight-bold text-white text-truncate">
              {{ getItemName(detailItem) || t("detail_btn") }}
            </h3>
          </div>
          <v-btn
            icon
            size="small"
            variant="text"
            color="white"
            @click="detailDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <v-card-text class="pa-0">
          <v-carousel
            v-if="detailItem.image && detailItem.image.length > 0"
            v-model="detailSlide"
            :height="detailCarouselHeight"
            hide-delimiters
            show-arrows
            cycle
            interval="4000"
          >
            <v-carousel-item
              v-for="(img, i) in detailItem.image"
              :key="`di-${i}`"
            >
              <v-img
                :src="img"
                :height="detailCarouselHeight"
                contain
                class="bg-grey-darken-4"
                @click="openGalleryFromDetail(i)"
              />
            </v-carousel-item>
          </v-carousel>

          <div class="pa-4 pa-sm-6">
            <v-list lines="two" class="pa-0 mb-6">
              <!-- Numeric price -->
              <v-list-item
                v-if="
                  isNumericPrice(getItemPrice1(detailItem)) ||
                  isNumericPrice(getItemPrice2(detailItem))
                "
                class="px-0"
              >
                <template v-slot:prepend>
                  <v-icon color="success">mdi-cash-multiple</v-icon>
                </template>
                <v-list-item-title>{{
                  t("detail_dialog_title")
                }}</v-list-item-title>
                <v-list-item-subtitle class="mt-1">
                  <div class="d-flex align-center ga-2 flex-wrap">
                    <span
                      v-if="
                        isNumericPrice(getItemPrice1(detailItem)) &&
                        isNumericPrice(getItemPrice2(detailItem)) &&
                        parsePrice(getItemPrice1(detailItem)) >
                          parsePrice(getItemPrice2(detailItem))
                      "
                      class="text-body-2 text-red text-decoration-line-through"
                    >
                      {{
                        parsePrice(getItemPrice1(detailItem)).toLocaleString()
                      }}
                      ₭
                    </span>
                    <span
                      v-if="isNumericPrice(getItemPrice2(detailItem))"
                      class="text-h6"
                    >
                      {{
                        parsePrice(getItemPrice2(detailItem)).toLocaleString()
                      }}
                      ₭
                    </span>
                    <span
                      v-else-if="isNumericPrice(getItemPrice1(detailItem))"
                      class="text-h6"
                    >
                      {{
                        parsePrice(getItemPrice1(detailItem)).toLocaleString()
                      }}
                      ₭
                    </span>
                    <v-chip
                      v-if="
                        isNumericPrice(getItemPrice1(detailItem)) &&
                        isNumericPrice(getItemPrice2(detailItem)) &&
                        parsePrice(getItemPrice1(detailItem)) >
                          parsePrice(getItemPrice2(detailItem))
                      "
                      color="red"
                      size="x-small"
                      variant="flat"
                      class="font-weight-bold"
                    >
                      {{ t("discount") }} -{{
                        Math.round(
                          (1 -
                            parsePrice(getItemPrice2(detailItem)) /
                              parsePrice(getItemPrice1(detailItem))) *
                            100
                        )
                      }}%
                    </v-chip>
                  </div>
                </v-list-item-subtitle>
              </v-list-item>

              <!-- Text price -->
              <v-list-item
                v-else-if="
                  getItemPrice1(detailItem) || getItemPrice2(detailItem)
                "
                class="px-0"
              >
                <template v-slot:prepend>
                  <v-icon color="success">mdi-cash</v-icon>
                </template>
                <v-list-item-title>{{
                  t("detail_dialog_title")
                }}</v-list-item-title>
                <v-list-item-subtitle class="mt-1">
                  <div class="d-flex flex-column ga-1">
                    <span v-if="getItemPrice1(detailItem)" class="text-body-2">
                      {{ getItemPrice1(detailItem) }}
                    </span>
                    <span
                      v-if="
                        getItemPrice2(detailItem) &&
                        getItemPrice2(detailItem) !== getItemPrice1(detailItem)
                      "
                      class="text-body-2 text-grey-darken-1"
                    >
                      {{ getItemPrice2(detailItem) }}
                    </span>
                  </div>
                </v-list-item-subtitle>
              </v-list-item>

              <v-divider class="my-2" />

              <v-list-item class="px-0">
                <template v-slot:prepend>
                  <v-icon color="grey">mdi-office-building</v-icon>
                </template>

                <v-list-item-title>{{ t("type_text") }}</v-list-item-title>
                <v-list-item-subtitle
                  class="text-body-2 text-grey-darken-2 mt-1"
                  style="white-space: normal; line-height: 1.6"
                >
                  {{ getItemType(detailItem) }}
                </v-list-item-subtitle>
              </v-list-item>
              <!-- Description -->
              <v-list-item class="px-0" v-if="getItemDetail(detailItem)">
                <template v-slot:prepend>
                  <v-icon color="grey">mdi-text-box-outline</v-icon>
                </template>

                <v-list-item-title>{{ t("detail_desc") }}</v-list-item-title>
                <v-list-item-subtitle class="text-body-2 mt-1">
                  {{ getItemDetail(detailItem) }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <v-row dense>
              <v-col cols="6">
                <v-btn
                  color="primary"
                  variant="flat"
                  block
                  rounded="lg"
                  prepend-icon="mdi-phone"
                  @click="callPhone(detailItem.tel)"
                >
                  {{ t("call_btn") }}
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  color="success"
                  variant="flat"
                  block
                  rounded="lg"
                  prepend-icon="mdi-whatsapp"
                  @click="openWhatsApp(detailItem)"
                >
                  WhatsApp
                </v-btn>
              </v-col>

              <v-col
                cols="12"
                class="mt-2"
                v-if="detailItem.typestatus === '1'"
              >
                <div
                  v-if="cart[detailItem.id]"
                  class="d-flex align-center justify-center ga-6 border rounded-lg pa-1"
                  style="min-height: 48px"
                >
                  <v-btn
                    icon="mdi-minus"
                    size="small"
                    variant="text"
                    color="primary"
                    @click.stop="decrementQty(detailItem.id)"
                  />
                  <span class="text-h6 font-weight-bold">{{
                    cart[detailItem.id]
                  }}</span>
                  <v-btn
                    icon="mdi-plus"
                    size="small"
                    variant="text"
                    color="primary"
                    @click.stop="incrementQty(detailItem.id)"
                  />
                </div>
                <v-btn
                  v-else
                  color="orange-darken-2"
                  variant="flat"
                  block
                  size="large"
                  rounded="lg"
                  prepend-icon="mdi-cart-plus"
                  @click="addToCart(detailItem)"
                >
                  {{ t("add_to_cart") }}
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- ── Comment Dialog ────────────────────────────────────────────── -->
    <v-dialog
      v-model="commentDialog"
      max-width="450"
      transition="dialog-bottom-transition"
    >
      <v-card rounded="xl">
        <v-toolbar color="primary" flat>
          <v-toolbar-title class="font-weight-bold">{{
            t("comment_dialog_title")
          }}</v-toolbar-title>
          <v-btn icon @click="commentDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-6">
          <v-text-field
            v-model="telephone"
            :label="t('comment_subject')"
            variant="outlined"
            rounded="lg"
            class="mb-2"
          />
          <v-textarea
            v-model="comment"
            :label="t('comment_detail')"
            variant="outlined"
            rounded="lg"
            rows="4"
          />
          <v-btn
            block
            color="primary"
            size="large"
            rounded="lg"
            class="mt-4"
            @click="submitComment"
          >
            {{ t("comment_submit") }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useDisplay } from "vuetify";
import { useGetChannelById } from "~/composables/useRetrieveByid";
import { useProductSellStore } from "@/stores/index";

const { smAndDown } = useDisplay();
const BASE_URL = "https://service.tsheb.la/api";

const {
  channels,
  topData,
  pagination,
  qr,
  imageadvert,
  video1,
  loadings,
  errors,
  fetchChannelById,
} = useGetChannelById();

const { currentLang, t, langs } = useLanguage();
const store = useProductSellStore();
const route = useRoute();

// ── State ─────────────────────────────────────────────────────────────────────
const channelStore = ref({
  channelId: null,
  channelName: "",
  imageadvert: [],
  video1: "",
  detail: "",
  qr: "",
});

const filteredData = ref([]);
const baseData = ref([]);
const currentPage = ref(1);
const searchQuery = ref("");
const provinces = ref([]);
const districtsForSelectedProvince = ref([]);
const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const cart = ref({});

const galleryDialog = ref(false);
const galleryItem = ref({ image: [] });
const gallerySlide = ref(0);

const detailDialog = ref(false);
const detailItem = ref({ image: [] });
const detailSlide = ref(0);

const commentDialog = ref(false);
const telephone = ref("");
const comment = ref("");
const isMuted = ref(true);

// ── Computed ──────────────────────────────────────────────────────────────────
const galleryHeight = computed(() => (smAndDown.value ? 300 : 520));
const detailCarouselHeight = computed(() => (smAndDown.value ? 240 : 380));

const bannerMode = computed(() => {
  if (channelStore.value.video1) return "video";
  if (channelStore.value.imageadvert?.length > 0) return "image";
  return "none";
});

const bannerImages = computed(() => {
  const data = channelStore.value.imageadvert;
  return Array.isArray(data) ? data : data ? [data] : [];
});

const bannerVideoSrc = computed(() => {
  const id = extractYoutubeID(channelStore.value.video1);
  if (!id) return "";
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=${
    isMuted.value ? 1 : 0
  }&loop=1&playlist=${id}&rel=0`;
});

// ── Universal field helpers ───────────────────────────────────────────────────
const getItemName = (item) =>
  item?.creamname ||
  item?.dormantalname ||
  item?.housename ||
  item?.productname ||
  item?.name ||
  "";

const getItemDetail = (item) => item?.detail || item?.moredetail || "";
const getItemType = (item) => item?.type || item?.types || "";
const getItemPrice1 = (item) => item?.price1 || item?.Price1 || "";
const getItemPrice2 = (item) =>
  item?.price2 || item?.Price2 || item?.price || "";

const isNumericPrice = (val) => {
  if (!val) return false;
  const cleaned = String(val)
    .replace(/[,.\s]/g, "")
    .replace(/kip$/i, "");
  return !isNaN(Number(cleaned)) && Number(cleaned) > 0;
};

const parsePrice = (val) => {
  if (!val) return 0;
  const cleaned = String(val).replace(/[,\s]/g, "").replace(/kip$/i, "");
  return Number(cleaned) || 0;
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function extractYoutubeID(url) {
  if (!url) return "";
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=|shorts\/))([\w-]+)/
  );
  return match ? match[1] : "";
}

function hasValidQr(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function hasValidPrice(price) {
  if (price === null || price === undefined) return false;
  const str = String(price).trim();
  return str !== "" && str !== "undefined" && !isNaN(Number(str));
}

const syncFromComposable = () => {
  if (!channels.value) return;
  const channelQr = hasValidQr(qr.value) ? qr.value : null;
  const processed = channels.value.map((item) => ({
    ...item,
    image: Array.isArray(item.image)
      ? item.image
      : [item.image || "placeholder.jpg"],
    qr: hasValidQr(item.qr) ? item.qr : channelQr,
  }));
  baseData.value = processed;
  filteredData.value = processed;
};

// ── API Search (single source of truth) ──────────────────────────────────────
async function searchChannelData({ districtId = "", detail = "" } = {}) {
  const channelId = route.query.channelId || channelStore.value.channelId;
  if (!channelId) return;
  try {
    const url = `${BASE_URL}/all/searchDataAll?channelId=${channelId}&detail=${encodeURIComponent(
      detail
    )}&dId=${districtId}&vId=`;
    const res = await fetch(url);
    const data = await res.json();
    const raw = data.data || data;
    const channelQr = hasValidQr(qr.value) ? qr.value : null;
    filteredData.value = Array.isArray(raw)
      ? raw.map((item) => ({
          ...item,
          image: Array.isArray(item.image)
            ? item.image
            : [item.image || "placeholder.jpg"],
          qr: hasValidQr(item.qr) ? item.qr : channelQr,
        }))
      : [];
  } catch (e) {
    console.error("❌ Search data fetch error:", e);
  }
}

// ── Dialog helpers ────────────────────────────────────────────────────────────
function openGallery(item, startIndex = 0) {
  galleryItem.value = item;
  gallerySlide.value = startIndex;
  galleryDialog.value = true;
}

function openGalleryFromDetail(index) {
  galleryItem.value = detailItem.value;
  gallerySlide.value = index;
  galleryDialog.value = true;
}

function openDetail(item) {
  detailItem.value = item;
  detailSlide.value = 0;
  detailDialog.value = true;
}

function openCommentDialog() {
  commentDialog.value = true;
}

// ── Pagination ────────────────────────────────────────────────────────────────
const onPageChange = async (page) => {
  if (!channelStore.value.channelId) return;
  await fetchChannelById(channelStore.value.channelId, page - 1);
  syncFromComposable();
};

// ── Reset filter ──────────────────────────────────────────────────────────────
const resetFilter = () => {
  selectedProvince.value = null;
  selectedDistrict.value = null;
  searchQuery.value = "";
  filteredData.value = baseData.value;
};

// ── WhatsApp / Phone ──────────────────────────────────────────────────────────
const callPhone = (tel) => {
  if (tel) window.location.href = `tel:${tel}`;
};

const openWhatsApp = (item) => {
  let tel = (item.tel || "").replace(/\D/g, "");
  if (tel.startsWith("20") && tel.length === 10) tel = "856" + tel;
  if (tel) window.open(`https://wa.me/${tel}`, "_blank");
  else console.error("No phone number available for this item");
};

// ── Cart ──────────────────────────────────────────────────────────────────────
const addToCart = (product) => {
  const selectedPrice =
    product.price2 !== 0 &&
    product.price2 !== null &&
    product.price2 !== undefined
      ? product.price2
      : product.price1;

  const cartItem = {
    ...product,
    quantity: 1,
    unit: "ອັນ",
    price: selectedPrice,
    qr: qr.value,
  };
  store.addToCart(cartItem);
  cart.value[product.id || product.itemid] = 1;
};

const incrementQty = (productId) => {
  const cartItem = store.cartItems?.find((item) => item.id === productId);
  const product = baseData.value?.find((p) => p.id === productId);
  if (!product) return;
  const newQty = (cartItem ? cartItem.quantity : 0) + 1;
  const price =
    product.price2 !== 0 && product.price2 !== null
      ? product.price2
      : product.price1;
  store.updateCart({
    ...(cartItem || product),
    quantity: newQty,
    price,
    id: productId,
  });
  cart.value[productId] = newQty;
};

const decrementQty = (productId) => {
  const cartItem = store.cartItems?.find((item) => item.id === productId);
  if (!cartItem) return;
  const newQty = cartItem.quantity - 1;
  if (newQty > 0) {
    const product = baseData.value?.find((p) => p.id === productId);
    const price =
      product && product.price2 !== 0 && product.price2 !== null
        ? product.price2
        : product?.price1;
    store.updateCart({ ...cartItem, quantity: newQty, price });
    cart.value[productId] = newQty;
  } else {
    store.removeFromCart(productId);
    delete cart.value[productId];
  }
};

// ── Lifecycle ─────────────────────────────────────────────────────────────────
onMounted(async () => {
  const routeState = history.state?.store;
  if (routeState?.channelId) {
    channelStore.value = { ...channelStore.value, ...routeState };
  }

  await fetchChannelById(route.query.channelId, 0);

  if (video1?.value) channelStore.value.video1 = video1.value;
  if (imageadvert?.value) channelStore.value.imageadvert = imageadvert.value;
  if (qr?.value) channelStore.value.qr = qr.value;

  syncFromComposable();

  try {
    const res = await fetch(`${BASE_URL}/province/selectall`);
    const pData = await res.json();
    provinces.value = (pData.data || pData).map((p) => ({
      code: p.provinceid,
      name: p.province,
    }));
  } catch (e) {
    console.error("❌ Province fetch error:", e);
  }
});

// ── Watchers ──────────────────────────────────────────────────────────────────

// Province: load districts + reset district + search with no dId
watch(selectedProvince, async (id) => {
  selectedDistrict.value = null;
  districtsForSelectedProvince.value = [];

  if (!id) {
    filteredData.value = baseData.value;
    searchQuery.value = "";
    return;
  }

  try {
    const res = await fetch(
      `${BASE_URL}/district/selectByProvinceId?provinceId=${id}`
    );
    const dData = await res.json();
    districtsForSelectedProvince.value = (dData.data || dData).map((item) => ({
      title: item.district,
      value: item.districtid,
    }));
  } catch (e) {
    console.error("❌ District fetch error:", e);
  }

  await searchChannelData({ detail: searchQuery.value ?? "" });
});

// District: search with dId (or clear back to province-level)
watch(selectedDistrict, async (districtId) => {
  await searchChannelData({
    districtId: districtId ?? "",
    detail: searchQuery.value ?? "",
  });
});

// Search box: debounced API call with current district
let searchTimer = null;
watch(searchQuery, (val) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(async () => {
    await searchChannelData({
      districtId: selectedDistrict.value ?? "",
      detail: val ?? "",
    });
  }, 400);
});

watch(errors, (err) => {
  if (err) console.error("🚨 Composable Error:", err);
});
// ---------- comnent ----
const submitComment = () => {
  if (!telephone.value && !comment.value) return;

  const WHATSAPP_NUMBER = "2076376363";

  const message = [
    telephone.value ? `📞 ${t("comment_subject")}: ${telephone.value}` : "",
    comment.value   ? `💬 ${t("comment_detail")}: ${comment.value}`   : "",
  ]
    .filter(Boolean)
    .join("\n");

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");

  // Reset & close
  commentDialog.value = false;
  telephone.value = "";
  comment.value = "";
};
</script>
<style scoped>
/* ── Banner ─────────────────────────────────────────────────────────── */
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

/* ── Cards ───────────────────────────────────────────────────────────── */
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
.border-thin {
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
}
.blur-btn {
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(10px);
  color: white !important;
}

/* ── Gallery ─────────────────────────────────────────────────────────── */
.gallery-carousel :deep(.v-window__controls) {
  padding: 0 8px;
}
.gallery-nav-btn {
  background: rgba(255, 255, 255, 0.92) !important;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.3) !important;
  transition: transform 0.15s, background 0.15s;
}
.gallery-nav-btn:hover {
  background: white !important;
  transform: scale(1.1);
}
.thumbnail-strip {
  overflow-x: auto;
  scrollbar-width: none;
}
.thumbnail-strip::-webkit-scrollbar {
  display: none;
}
.thumbnail-wrapper {
  flex-shrink: 0;
  border-radius: 10px;
  overflow: hidden;
  border: 2.5px solid transparent;
  transition: border-color 0.2s, transform 0.2s;
}
.thumbnail-wrapper:hover {
  transform: scale(1.06);
}
.thumbnail-active {
  border-color: #1976d2 !important;
  transform: scale(1.1) !important;
}

/* ── Responsive ──────────────────────────────────────────────────────── */
@media (max-width: 600px) {
  .text-h3 {
    font-size: 1.75rem !important;
  }
}

/* slide topData */
@media (max-width: 959px) {
  .mobile-slider {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 12px;
    padding: 10px 8px 20px 8px;
    scrollbar-width: none; /* Hides scrollbar on Firefox */
  }

  .mobile-slider::-webkit-scrollbar {
    display: none; /* Hides scrollbar on Chrome/Safari */
  }

  /* 
     Ensures the items inside TopDataCard don't shrink 
     and stay a consistent width while sliding 
  */
  :deep(.v-card) {
    min-width: 280px;
    scroll-snap-align: start;
  }
}

/* Desktop Styling: Normal Grid */
@media (min-width: 960px) {
  .desktop-grid {
    display: block; /* Standard layout for your existing TopDataCard grid */
  }
}
</style>
