pages/taxi/home_taxi.vue<template>
    <v-container fluid class="pa-0 bg-grey-lighten-4">
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
                  ບໍລິການລົດແທັກຊີ່
                </h1>
                <p class="text-h6 font-weight-light">
                  ສະດວກ, ວ່ອງໄວ, ແລະ ປອດໄພທຸກການເດີນທາງ
                </p>
              </div>
            </v-overlay>
          </v-carousel-item>
        </v-carousel>
      </section>
  
      <v-container class="position-relative">
        <v-card rounded="xl" elevation="12" class="pa-4 pa-md-6 border-thin">
          <div class="d-flex align-center mb-4">
            <v-icon color="primary" class="mr-2">mdi-magnify</v-icon>
            <h2 class="text-h6 font-weight-bold">ຄົ້ນຫາລົດແທັກຊີ່</h2>
          </div>
  
          <v-row dense>
            <v-col cols="12" sm="6" md="3">
              <v-select
                v-model="selectedProvince"
                :items="provinces"
                label="ເລືອກແຂວງ"
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
                label="ເລືອກເມືອງ"
                variant="filled"
                rounded="lg"
                prepend-inner-icon="mdi-map-outline"
                density="comfortable"
                flat
                :no-data-text="
                  !selectedProvince ? 'ກະລຸນາເລືອກແຂວງກ່ອນ' : 'ບໍ່ມີຂໍ້ມູນ'
                "
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="searchQuery"
                label="ຄົ້ນຫາຕາມຊື່ ຫຼື ເບີໂທ..."
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
                ສອບຖາມ
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
  
      <v-container class="py-8">
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-16">
          <v-progress-circular
            indeterminate
            color="primary"
            size="64"
            width="6"
          />
          <p class="mt-4 text-grey">ກຳລັງໂຫລດຂໍ້ມູນ...</p>
        </div>
  
        <template v-else>
          <!-- Not Found State — shows when district selected but no results -->
          <div
            v-if="filteredData.length === 0 && selectedDistrict"
            class="text-center py-16"
          >
            <v-icon size="80" color="grey-lighten-2">mdi-car-search</v-icon>
            <p class="text-h6 text-grey mt-4">
              ບໍ່ພົບລົດແທັກຊີ່ໃນເມືອງທີ່ທ່ານເລືອກ
            </p>
            <p class="text-body-2 text-grey-lighten-1 mt-2">
              ກະລຸນາລອງເລືອກເມືອງອື່ນ ຫຼື ຄົ້ນຫາດ້ວຍຄຳອື່ນ
            </p>
            <v-btn
              class="mt-6"
              color="primary"
              variant="outlined"
              rounded="lg"
              @click="resetFilter"
            >
              ລ້າງການຄົ້ນຫາ
            </v-btn>
          </div>
  
          <!-- Not Found State — shows when search query has no results -->
          <div
            v-else-if="filteredData.length === 0 && searchQuery"
            class="text-center py-16"
          >
            <v-icon size="80" color="grey-lighten-2">mdi-magnify-close</v-icon>
            <p class="text-h6 text-grey mt-4">
              ບໍ່ພົບຜົນການຄົ້ນຫາສຳລັບ "{{ searchQuery }}"
            </p>
            <p class="text-body-2 text-grey-lighten-1 mt-2">
              ກະລຸນາລອງຄົ້ນຫາດ້ວຍຊື່ ຫຼື ເບີໂທອື່ນ
            </p>
            <v-btn
              class="mt-6"
              color="primary"
              variant="outlined"
              rounded="lg"
              @click="resetFilter"
            >
              ລ້າງການຄົ້ນຫາ
            </v-btn>
          </div>
  
          <!-- Results Grid -->
          <v-row v-else>
            <v-col
              v-for="(taxi, index) in filteredData"
              :key="index"
              cols="12"
              sm="6"
              lg="4"
            >
              <v-card
                rounded="xl"
                elevation="2"
                class="taxi-card h-100 d-flex flex-column border-thin overflow-hidden"
              >
                <v-hover v-slot="{ isHovering, props }">
                  <div
                    v-bind="props"
                    class="overflow-hidden position-relative"
                    style="height: 220px"
                  >
                    <v-img
                      :src="taxi.image[0]"
                      height="220"
                      cover
                      class="transition-swing"
                      :style="{
                        transform: isHovering ? 'scale(1.05)' : 'scale(1)',
                      }"
                      @click="openZoom(taxi, 0)"
                    >
                      <template v-slot:placeholder>
                        <v-skeleton-loader type="image" height="220" />
                      </template>
                    </v-img>
                    <v-chip
                      position="absolute"
                      location="top right"
                      class="ma-3 font-weight-bold"
                      color="primary"
                      variant="flat"
                      size="small"
                    >
                      {{ Number(taxi.price1 || 0).toLocaleString() }} ₭
                    </v-chip>
                  </div>
                </v-hover>
  
                <v-card-text class="pa-4 flex-grow-1">
                  <div class="d-flex justify-space-between align-start mb-2">
                    <h3
                      class="text-h6 font-weight-bold text-truncate"
                      style="max-width: 70%"
                    >
                      {{ taxi.name }}
                    </h3>
                    <v-icon color="grey-lighten-1">mdi-shield-check</v-icon>
                  </div>
  
                  <div class="d-flex align-center mb-3">
                    <v-icon size="small" color="primary" class="mr-1"
                      >mdi-phone-outline</v-icon
                    >
                    <span class="text-body-2 font-weight-medium">{{
                      taxi.tel
                    }}</span>
                  </div>
  
                  <v-divider class="mb-3" />
  
                  <p class="text-caption text-grey-darken-1 line-clamp-2">
                    {{ taxi.detail || "ບໍ່ມີລາຍລະອຽດເພີ່ມເຕີມ" }}
                  </p>
                </v-card-text>
  
                <v-card-actions class="px-4 pb-4 pt-0">
                  <v-btn
                    variant="outlined"
                    color="primary"
                    rounded="lg"
                    class="flex-grow-1 text-none"
                    @click="openZoom(taxi, 0)"
                  >
                    ລາຍລະອຽດ
                  </v-btn>
                  <v-btn
                    color="success"
                    variant="flat"
                    rounded="lg"
                    class="flex-grow-1 text-none ml-2"
                    prepend-icon="mdi-whatsapp"
                    @click="openWhatsApp(taxi)"
                  >
                    WhatsApp
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </template>
  
        <v-divider class="my-12" />
  
        <div v-if="topData && topData.length > 0" class="mt-12">
          <div class="d-flex align-center mb-6">
            <div class="bg-primary rounded-circle pa-1 mr-3">
              <v-icon color="white" size="small">mdi-star</v-icon>
            </div>
            <h2 class="text-h5 font-weight-bold">ແນະນຳເບຣນດອື່ນໆ</h2>
          </div>
          <TopDataCard :topData="topData" />
        </div>
      </v-container>
  
      <v-dialog
        v-model="commentDialog"
        max-width="450"
        transition="dialog-bottom-transition"
      >
        <v-card rounded="xl">
          <v-toolbar color="primary" flat>
            <v-toolbar-title class="font-weight-bold"
              >ສົ່ງຂໍ້ຄວາມສອບຖາມ</v-toolbar-title
            >
            <v-btn icon @click="commentDialog = false"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </v-toolbar>
          <v-card-text class="pa-6">
            <v-text-field
              v-model="telephone"
              label="ຫົວຂໍ້ສອບຖາມ"
              variant="outlined"
              rounded="lg"
              class="mb-2"
            />
            <v-textarea
              v-model="comment"
              label="ລາຍລະອຽດ"
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
              >ສົ່ງຂໍ້ມູນ</v-btn
            >
          </v-card-text>
        </v-card>
      </v-dialog>
  
      <v-dialog
        v-model="zoomDialog"
        max-width="1200"
        transition="dialog-transition"
      >
        <v-card rounded="xl" elevation="24">
          <v-card-title
            class="pa-4 pa-sm-6 d-flex align-center"
            style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          >
            <v-avatar color="white" size="40" class="mr-3 d-none d-sm-flex">
              <v-icon color="primary" size="24">mdi-car-side</v-icon>
            </v-avatar>
  
            <div class="flex-grow-1 min-width-0">
              <h3
                class="text-body-1 text-sm-h5 font-weight-bold text-white text-truncate"
              >
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
              @click="zoomDialog = false"
              size="small"
              variant="text"
              color="white"
              class="ml-2 flex-shrink-0"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
  
          <v-divider />
  
          <v-carousel
            v-model="zoomSlide"
            :height="carouselHeight"
            hide-delimiters
            show-arrows
            cycle
            interval="4000"
            class="rounded-xl elevation-8"
          >
            <template v-slot:prev="{ props }">
              <v-btn
                icon
                v-bind="props"
                :size="smAndDown ? 'small' : 'large'"
                elevation="4"
                class="bg-white"
              >
                <v-icon :size="smAndDown ? 18 : 32" color="grey-darken-2">
                  mdi-chevron-left
                </v-icon>
              </v-btn>
            </template>
  
            <template v-slot:next="{ props }">
              <v-btn
                icon
                v-bind="props"
                :size="smAndDown ? 'small' : 'large'"
                elevation="4"
                class="bg-white"
              >
                <v-icon :size="smAndDown ? 18 : 32" color="grey-darken-2">
                  mdi-chevron-right
                </v-icon>
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
                class="rounded-xl bg-grey-darken-4"
              >
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular
                      indeterminate
                      color="primary"
                      size="64"
                      width="6"
                    />
                  </v-row>
                </template>
  
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
  
                <div
                  class="position-absolute w-100 d-flex align-center justify-space-between pa-2 pa-sm-3"
                  style="bottom: 0"
                >
                  <v-btn
                    icon
                    size="small"
                    elevation="2"
                    class="bg-white"
                    @click.stop="toggleZoomAutoplay"
                  >
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
  
          <v-card-actions
            class="pa-4 pa-sm-6 justify-center ga-2 ga-sm-4 flex-wrap"
          >
            <v-btn
              color="primary"
              :size="$vuetify.display.smAndDown ? 'large' : 'x-large'"
              @click="callPhone(zoomItem.tel)"
              prepend-icon="mdi-phone"
              elevation="2"
              :block="$vuetify.display.smAndDown"
              class="px-4 px-sm-8"
            >
              ໂທຫາ
            </v-btn>
            <v-btn
              color="success"
              :size="$vuetify.display.smAndDown ? 'large' : 'x-large'"
              @click="openWhatsApp(zoomItem)"
              prepend-icon="mdi-whatsapp"
              elevation="2"
              :block="$vuetify.display.smAndDown"
              class="px-4 px-sm-8"
            >
              ຕິດຕໍ່ທາງ WhatsApp
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from "vue";
  import { useDisplay } from "vuetify";
  
  const { smAndDown } = useDisplay();
  const { allitems, fetchTaxi, video1, channelimage, loading, topData } =
    useTaxi();
  
  const props = defineProps({
    store: { type: Object, default: () => ({}) },
  });
  
  const imageBaseUrl = "https://service.tsheb.la/";
  const filteredData = ref([]);
  const baseData = ref([]);
  const searchQuery = ref("");
  const provinces = ref([]);
  const districtsForSelectedProvince = ref([]);
  const selectedProvince = ref(null);
  const selectedDistrict = ref(null);
  const commentDialog = ref(false);
  const telephone = ref("");
  const comment = ref("");
  
  const zoomDialog = ref(false);
  const zoomItem = ref({});
  const zoomSlide = ref(0);
  const isZoomPlaying = ref(true);
  
  const isMuted = ref(true);
  const selectedChannel = ref({ video1: "", channelimage: "" });
  
  const carouselHeight = computed(() => (smAndDown.value ? 280 : 550));
  
  const openCommentDialog = () => {
    telephone.value = "";
    comment.value = "";
    commentDialog.value = true;
  };
  
  const submitComment = () => {
    if (!telephone.value || !comment.value) {
      alert("ກະລຸນາໃສ່ຂໍ້ມູນໃຫ້ຄົບຖ້ວນ");
      return;
    }
    console.log("Sending Inquiry:", {
      title: telephone.value,
      detail: comment.value,
    });
    commentDialog.value = false;
  };
  
  const toggleZoomAutoplay = () => {
    isZoomPlaying.value = !isZoomPlaying.value;
  };
  
  const openZoom = (item, index = 0) => {
    zoomItem.value = item;
    zoomSlide.value = index;
    zoomDialog.value = true;
  };
  
  function extractYoutubeID(url) {
    if (!url) return "";
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=|shorts\/))([\w-]+)/
    );
    return match ? match[1] : "";
  }
  
  const bannerMode = computed(() => {
    const v = selectedChannel.value.video1 || video1.value;
    const i = selectedChannel.value.channelimage || channelimage.value;
    if (v) return "video";
    if (i) return "image";
    return "none";
  });
  
  const bannerImages = computed(() => {
    const data = selectedChannel.value.channelimage || channelimage.value;
    if (!data) return [];
    return Array.isArray(data) ? data : [data];
  });
  
  const bannerVideoSrc = computed(() => {
    const rawUrl = selectedChannel.value.video1 || video1.value;
    const id = extractYoutubeID(rawUrl);
    if (!id) return "";
    return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=${
      isMuted.value ? 1 : 0
    }&loop=1&playlist=${id}&rel=0`;
  });
  
  function processTaxiItems(raw) {
    return (raw || []).map((item) => ({
      ...item,
      image: Array.isArray(item.image)
        ? item.image
        : [item.image || "placeholder.jpg"],
      showDetails: false,
    }));
  }
  
  // Reset all filters back to default
  const resetFilter = () => {
    selectedProvince.value = null;
    selectedDistrict.value = null;
    searchQuery.value = "";
    baseData.value = processTaxiItems(allitems.value);
    filteredData.value = processTaxiItems(allitems.value);
  };
  
  const queryByLocation = async (districtId) => {
    const dId = districtId || selectedDistrict.value;
    if (!selectedProvince.value || !dId) return;
  
    loading.value = true;
    searchQuery.value = "";
  
    try {
      const url = `https://service.tsheb.la/api/taxi/selectByDistrictId?districtId=${dId}&page=0&limit=100`;
      const res = await fetch(url, { method: "GET" });
  
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
  
      const result = await res.json();
      const finalData = result.data || result;
      const processed = processTaxiItems(
        Array.isArray(finalData) ? finalData : []
      );
      baseData.value = processed;
      filteredData.value = processed;
    } catch (e) {
      console.error("queryByLocation error:", e);
      // Show empty on error so user sees not-found state
      baseData.value = [];
      filteredData.value = [];
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(async () => {
    if (props.store && Object.keys(props.store).length > 0) {
      selectedChannel.value = props.store;
    }
  
    await fetchTaxi();
    const processed = processTaxiItems(allitems.value);
    baseData.value = processed;
    filteredData.value = processed;
  
    try {
      const res = await fetch("https://service.tsheb.la/api/province/selectall");
      if (!res.ok) throw new Error("Failed to fetch provinces");
      const pData = await res.json();
      provinces.value = (pData.data || pData).map((p) => ({
        code: p.provinceid,
        name: p.province,
      }));
    } catch (e) {}
  });
  
  // Watch province change → load districts
  watch(selectedProvince, async (id) => {
    selectedDistrict.value = null;
    districtsForSelectedProvince.value = [];
    baseData.value = processTaxiItems(allitems.value);
    filteredData.value = processTaxiItems(allitems.value);
    searchQuery.value = "";
  
    if (!id) return;
  
    try {
      const url = `https://service.tsheb.la/api/district/selectByProvinceId?provinceId=${id}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
  
      if (!res.ok) return;
  
      const dData = await res.json();
      const rawList = dData.data || dData;
  
      if (Array.isArray(rawList)) {
        districtsForSelectedProvince.value = rawList.map((item) => ({
          title: item.district,
          value: item.districtid,
        }));
      }
    } catch (e) {
      console.error("Province watch error:", e);
    }
  });
  
  // Watch district change → fetch taxis for that district
  watch(selectedDistrict, (newDistrict) => {
    if (newDistrict && selectedProvince.value) {
      queryByLocation(newDistrict);
    }
  });
  
  // Watch search query → filter from baseData
  watch(searchQuery, (q) => {
    if (!q || q.trim() === "") {
      filteredData.value = baseData.value;
      return;
    }
    const lower = q.toLowerCase().trim();
    filteredData.value = baseData.value.filter(
      (item) =>
        (item.name && item.name.toLowerCase().includes(lower)) ||
        (item.tel &&
          item.tel.replace(/\D/g, "").includes(lower.replace(/\D/g, "")))
    );
  });
  
  const callPhone = (tel) => {
    if (tel) window.location.href = `tel:${tel.replace(/\D/g, "")}`;
  };
  
  const openWhatsApp = (item) => {
    if (!item?.tel) return;
    let cleanNumber = item.tel.replace(/\D/g, "");
    if (cleanNumber.startsWith("0")) cleanNumber = cleanNumber.substring(1);
    const encodedMessage = encodeURIComponent("ສະບາຍດີ");
    window.open(`https://wa.me/856${cleanNumber}?text=${encodedMessage}`, "_blank");
  };
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
  .z-index-2 {
    z-index: 2;
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
    .mt-n16 {
      margin-top: 30px !important;
    }
    .text-h3 {
      font-size: 1.75rem !important;
    }
  }
  </style>