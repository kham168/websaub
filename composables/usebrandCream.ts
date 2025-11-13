// import { ref } from "vue";
// import { channelCreamService } from "../services/api/brand_cream.service";
// import type { BrandCreamItem } from "../services/types/brand_cream-type";

// export const useBrandCream = () => {
//   const brandCream = ref<BrandCreamItem | null>(null);
//   const allCreams = ref<BrandCreamItem[]>([]);
//   const loading = ref(false);
//   const error = ref<string | null>(null);
//   const pagination = ref<any>(null);
//   const topData = ref<TopDataItem[]>([]);

//   const fetchBrandCream = async (page: number = 0, limit: number = 10) => {
//     loading.value = true;
//     error.value = null;

//     try {
//       const response = await channelCreamService.getAll(page, limit);

//       // console.log('Service response:', response)

//       if (!response || !response.data || response.data.length === 0) {
//         error.value = "No brand cream data received.";
//         brandCream.value = null;
//         allCreams.value = [];
//         pagination.value = null;
//         topData.value = null;
//         return;
//       }

//       allCreams.value = response.data;
//       pagination.value = response.pagination;
//       topData.value = response.topData;

//       // Set first item as selected if needed
//       if (response.data.length > 0) {
//         brandCream.value = response.data[0];
//       }
//     } catch (err: any) {
//       error.value = err.message || "Failed to load brand cream data";
//       brandCream.value = null;
//       allCreams.value = [];
//       pagination.value = null;
//       topData.value = null;
//     } finally {
//       loading.value = false;
//     }
//   };

//   return {
//     brandCream,
//     allCreams,
//     loading,
//     error,
//     pagination,
//     topData,
//     fetchBrandCream,
//   };
// };
import { ref } from "vue";
import { channelCreamService } from "../services/api/brand_cream.service";
import type {
  BrandCreamItem,
  BrandCreamServiceResponse,
  TopData,
} from "../services/types/brand_cream-type";

export const useBrandCream = () => {
  const brandCream = ref<BrandCreamItem | null>(null);
  const allCreams = ref<BrandCreamItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const pagination = ref<any>(null);
  const topData = ref<TopData | null>(null);

  const fetchBrandCream = async (page: number = 0, limit: number = 10) => {
    loading.value = true;
    error.value = null;

    try {
      const response: BrandCreamServiceResponse = await channelCreamService.getAll(page, limit);

      if (!response || !response.data || response.data.length === 0) {
        error.value = "No brand cream data received.";
        brandCream.value = null;
        allCreams.value = [];
        pagination.value = null;
        topData.value = null;
        return;
      }

      allCreams.value = response.data;
      pagination.value = response.pagination;
      topData.value = response.topData;

      // Set first item as selected if needed
      if (response.data.length > 0) {
        brandCream.value = response.data[0];
      }
    } catch (err: any) {
      error.value = err.message || "Failed to load brand cream data";
      brandCream.value = null;
      allCreams.value = [];
      pagination.value = null;
      topData.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    brandCream,
    allCreams,
    loading,
    error,
    pagination,
    topData,
    fetchBrandCream,
  };
};
