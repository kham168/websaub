<template>
  <div>
    <v-slide-group  class="pa-0">
      <v-slide-group-item
        v-for="(item, index) in topData"
        :key="index"
      >
        <v-card
          width="300"
          rounded="xl"
          class="ma-3 overflow-hidden"
          elevation="0"
          border
          @click="selectItem(item)"
          style="cursor: pointer;"
        >
          <!-- Image -->
          <v-img
            :src="item.image[0] || '/favicon.ico'"
            height="180"
            cover
            gradient="to bottom, transparent 40%, rgba(0,0,0,0.7) 100%"
          >
            <!-- Image count chip -->
            <!-- <template v-slot:default>
              <div class="d-flex justify-end pa-0">
                <v-chip
                  v-if="item.image.length > 1"
                  size="x-small"
                  color="black"
                  variant="flat"
                  class="opacity-80"
                  prepend-icon="mdi-camera"
                >
                  {{ item.image.length }}
                </v-chip>
              </div>
            </template> -->
          </v-img>

          <v-card-text class="pa-3">
            <!-- Name -->
            <p
              class="text-body-2 font-weight-bold text-truncate mb-1"
              style="color: rgb(var(--v-theme-on-surface));"
            >
              {{ item.name }}
            </p>

            <!-- Phone -->
            <!-- <div class="d-flex align-center mb-1 ga-1">
              <v-icon size="13" color="primary">mdi-phone</v-icon>
              <span class="text-caption text-primary font-weight-medium">
                {{ item.tel }}
              </span>
            </div> -->

            <!-- Location -->
            <div
              v-if="item.province || item.district"
              class="d-flex align-center ga-1"
            >
              <v-icon size="13" color="grey">mdi-map-marker-outline</v-icon>
              <span class="text-caption text-medium-emphasis text-truncate">
                {{ [item.province, item.district].filter(Boolean).join(", ") }}
              </span>
            </div>
          </v-card-text>

          <!-- Action -->
          <v-card-actions class="pa-3 pt-0">
            <v-btn
              block
              rounded="lg"
              color="primary"
              variant="tonal"
              size="small"
              class="text-none font-weight-bold"
              append-icon="mdi-arrow-right"
            >
              ເບິ່ງເພີ່ມ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  topData: {
    type: Array,
    default: () => [],
  },
});

const router = useRouter();

const selectItem = (item) => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const route = getRoute(item);
  if (route) router.push(route);
};

const getRoute = (item) => {
  const channelRoutes = {
    1: "/muag_cream/home_muagcreams",
    2: "/hoob_xauj/home_hoobXauj",
    3: "/tsev_xauj/home_tsevXauj",
    4: "/muag_alaij_khoTsheb/home_alaij",
    5: "/muag_av/home_muagav",
    6: "/muag_tshuaj/home_muagtshuaj",
    7: "/taxi/home_taxi",
    8: "/muas/home_muas",
  };
  return channelRoutes[item.channel] || null;
};
</script>