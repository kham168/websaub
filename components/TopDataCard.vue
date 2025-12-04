<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col
        v-for="(item, index) in topData"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <v-card
          class="product-card d-flex flex-column"
          elevation="1"
          hover
          @click="selectItem(item)"
        >
          <div class="image-container position-relative">
            <v-img
              :src="item.image[0] || '/favicon.ico'"
              aspect-ratio="1"
              cover
              class="product-image"
              height="200"
            />

            <div v-if="item.image.length > 1" class="image-count-badge">
              <v-icon size="small" class="mr-1">mdi-camera</v-icon>
              {{ item.image.length }}
            </div>
          </div>

          <v-card-text class="flex-grow-1 pa-3">
            <div class="mb-1 font-weight-medium">
              {{ item.name }}
            </div>
            <div class="mb-1 text-blue font-weight-medium">
              {{ item.tel }}
            </div>
            <div v-if="item.province && item.district">
              <v-icon icon color="grey"> mdi-map-marker</v-icon>
              <span>{{ item.province }},</span>
              <span>{{ item.district }}</span>
            </div>
            <!-- ============== route to  other page =============== -->

            <!-- <div class="justify-end d-flex mt-4">
              <NuxtLink
                v-if="getRoute(item)"
                :to="getRoute(item)"
                class="text-none text-blue"
                style="text-decoration: underline; cursor: pointer"
              >
                Go to page
              </NuxtLink>
            </div> -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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

/* CLICK SELECT */
// const selectItem = (item) => {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// };

const selectItem = (item) => {
  const route = getRoute(item);

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  // If route exists → navigate
  if (route) {
    router.push(route);
  }
};

/* AUTO ROUTE MAPPING */
const getRoute = (item) => {
  // Route by channelid
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

  // Route by item.id
  // const idRoutes = {
  //   "m3": "/muag_av/home_muagav",
  //   "ts3": "/taxi/home_taxi",
  // };

  if (channelRoutes[item.channelid]) return channelRoutes[item.channelid];
  // if (idRoutes[item.id]) return idRoutes[item.id];

  return null; // no route available
};
</script>

<style scoped>
.product-card {
  height: 100%;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  transform: translateY(-2px);
}

.image-container {
  background: #f8f8f8;
  overflow: hidden;
  position: relative;
  border-radius: 8px 8px 0 0;
}

.product-image {
  transition: transform 0.3s ease;
  border-radius: 12px;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.image-count-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  font-size: 12px;
}

.active-thumbnail {
  border: 2px solid green;
  border-radius: 4px;
}

.best-seller-badge {
  position: absolute;
  bottom: 8px;
  left: 8px;
  background: #ff6b35;
  color: white;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  border-radius: 4px;
  z-index: 2;
}
</style>
