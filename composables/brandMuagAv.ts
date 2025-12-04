import { ref } from "vue";
import { brandMuagAvService } from "./../services/api/brand_muag_av.service";
import type {
  BrandMuagAvItem,
  BrandMuagAvServiceResponse,
  TopData,
} from "../services/types/brand_muag_av-type";

export const useBrandMuagAv = () => {
  const brandMuagAv = ref<BrandMuagAvItem | null>(null);
  const allbrandMuagAv = ref<BrandMuagAvItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const pagination = ref<any>(null);
  const topData = ref<any | null>(null);

  const fetchBrandMuagAv = async (page: number = 0, limit: number = 10) => {
    loading.value = true;
    error.value = null;

    try {
      const response: BrandMuagAvServiceResponse =
        await brandMuagAvService.getAll(page, limit);

      if (!response || !response.data || response.data.length === 0) {
        error.value = "No brand data received.";
        brandMuagAv.value = null;
        allbrandMuagAv.value = [];
        pagination.value = null;
        topData.value = null;
        return;
      }
      const topDataResponse = response.topData.topData;
      allbrandMuagAv.value = [...response.data];
      pagination.value = response.pagination;
      topData.value = topDataResponse;
      if (response.data.length > 0) {
        brandMuagAv.value = response.data[0];
      }
    } catch (err: any) {
      error.value = err.message || "Failed to load brand data";
      brandMuagAv.value = null;
      allbrandMuagAv.value = [];
      pagination.value = null;
      topData.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    brandMuagAv,
    allbrandMuagAv,
    pagination,
    topData,
    loading,
    error,
    fetchBrandMuagAv,
  };
};
