// // // import { ref } from 'vue'
// // // import { ChannelMuagAvServices } from './../services/api/brand_muag_av.service'
// // // import { http } from './../services/core/http.service'
// // // import type { Brand_Muag_AV } from '../services/types/brand_muag_av-type'

// // // export const useBrandMuagAv = () => {
// // //   const brandMuagAv = ref<Brand_Muag_AV | null>(null)
// // //   const loading = ref(false)
// // //   const error = ref<string | null>(null)

// // //   const fetchBrandMuagAv = async () => {
// // //     loading.value = true
// // //     error.value = null

// // //     try {
// // //       const response = await ChannelMuagAvServices.brand_muag_av()
// // //       const result = response?.data || null

// // //       if (!result || !Array.isArray(result.data) || result.data.length === 0) {
// // //         error.value = 'No brand data received.'
// // //         brandMuagAv.value = null
// // //         return
// // //       }

// // //       // ✅ Get the first channel item
// // //       const data = result.data[0]

// // //       // ✅ Generate slug like "brand_muag_av-type"
// // //       const slugChannel =
// // //         'brand_' +
// // //         (data.channel || '')
// // //           .split(' ')
// // //           .slice(0, 2)
// // //           .join('_')
// // //           .toLowerCase()
// // //           .replace(/[^a-z0-9_]/g, '') +
// // //         '-type'

// // //       // ✅ Map data into your type-safe object
// // //     //   brandMuagAv.value = {
// // //     //     ...data,
// // //     //     slug: slugChannel,
// // //     //     title: data.channel || 'Untitled Brand',
// // //     //     image: data.image || [],
// // //     //     ownername: data.ownername || 'No Name',
// // //     //     email: data.email || 'No Email',
// // //     //     peopleintorm: data.peopleintorm || 'No Info',
// // //     //     tel: data.tel || 'No Tel',
// // //     //     status: (data.status === '1' ) as boolean,
// // //     //     cdate: data.cdate || '',
// // //     //   }
// // //     brandMuagAv.value = {
// // //         ...data,
// // //         slug: slugChannel,
// // //         title: data.channel || 'Untitled Brand',
// // //         image: data.image || [],
// // //         ownername: data.ownername || 'No Name',
// // //         email: data.email || 'No Email',
// // //         peopleintorm: data.peopleintorm || 'No Info',
// // //         tel: data.tel || 'No Tel',
// // //         status: data.status === '1', // boolean
// // //         cdate: data.cdate || '',
// // //       }
// // //     } catch (err: any) {
// // //       error.value = err.message || 'Failed to load brand data'
// // //       brandMuagAv.value = null
// // //     } finally {
// // //       loading.value = false
// // //     }
// // //   }

// // // }
// // import { ref } from "vue";
// // import { channelMuagAvService } from "./../services/api/brand_muag_av.service";
// // import type { ChannelData } from "../services/types/brand_muag_av-type";

// // export const useBrandMuagAv = () => {
// //   const brandMuagAv = ref<ChannelData | null>(null);
// //   const allChannels = ref<ChannelData[]>([]);
// //   const loading = ref(false);
// //   const error = ref<string | null>(null);

// //   const fetchBrandMuagAv = async (page: number, limit: number) => {
// //     loading.value = true;
// //     error.value = null;

// //     try {
// //       const response = await channelMuagAvService.getAll(page, limit);
// //       // console.log('response===',response);
// //       if (!response || response.length === 0) {
// //         error.value = "No brand data received.";
// //         brandMuagAv.value = null;
// //         allChannels.value = [];
// //         return;
// //       }

// //       allChannels.value = response;

// //       // ✅ Get the first channel item
// //       const data = response[0];
// //     } catch (err: any) {
// //       error.value = err.message || "Failed to load brand data";
// //       brandMuagAv.value = null;
// //       allChannels.value = [];
// //     } finally {
// //       loading.value = false;
// //     }
// //   };

// //   return {
// //     brandMuagAv,
// //     allChannels,
// //     loading,
// //     error,
// //     fetchBrandMuagAv,
// //   };
// // };
// import { ref, onMounted } from "vue";
// import { brandMuagAvService } from "./../services/api/brand_muag_av.service";
// import type { LandData } from "../services/types/brand_muag_av-type";

// export const useBrandMuagAv = () => {
//   const brandMuagAv = ref<LandData | null>(null);
//   const allChannels = ref<LandData[]>([]);
//   const loading = ref(false);
//   const error = ref<string | null>(null);

//   const fetchBrandMuagAv = async (page: number = 0, limit: number = 12) => {
//     loading.value = true;
//     error.value = null;

//     try {
//       const response = await brandMuagAvService.getAll(page, limit);

//       if (!response || response.length === 0) {
//         error.value = "No brand data received.";
//         brandMuagAv.value = null;
//         allChannels.value = [];
//         return;
//       }

//       allChannels.value = response;
//       brandMuagAv.value = response[0];
//     } catch (err: any) {
//       error.value = err.message || "Failed to load brand data";
//       brandMuagAv.value = null;
//       allChannels.value = [];
//     } finally {
//       loading.value = false;
//     }
//   };

//   // ✅ Fetch only on client to avoid hydration mismatch
//   onMounted(() => {
//     fetchBrandMuagAv();
//   });

//   return {
//     brandMuagAv,
//     allChannels,
//     loading,
//     error,
//     fetchBrandMuagAv,
//   };
// };
import { ref } from "vue";
import { brandMuagAvService } from "./../services/api/brand_muag_av.service";
import type { LandData } from "../services/types/brand_muag_av-type";

export const useBrandMuagAv = () => {
  const brandMuagAv = ref<LandData | null>(null);
  const allChannels = ref<LandData[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchBrandMuagAv = async (page: number = 0, limit: number = 12) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await brandMuagAvService.getAll(page, limit);

      if (!response || response.length === 0) {
        error.value = "No brand data received.";
        brandMuagAv.value = null;
        allChannels.value = [];
        return;
      }

      allChannels.value = response;
      brandMuagAv.value = response[0];
    } catch (err: any) {
      error.value = err.message || "Failed to load brand data";
      brandMuagAv.value = null;
      allChannels.value = [];
    } finally {
      loading.value = false;
    }
  };

  return {
    brandMuagAv,
    allChannels,
    loading,
    error,
    fetchBrandMuagAv,
  };
};