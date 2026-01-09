import { ref } from "vue";
import { channelCreamService } from "../services/api/brand_cream.service";
import type {
  BrandCreamItem,
  BrandCreamServiceResponse,
  TopData,
  Result,
} from "../services/types/brand_cream-type";

export const useBrandCream = () => {
  const brandCream = ref<BrandCreamItem | null>(null);
  const allCreams = ref<BrandCreamItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const pagination = ref<any>(null);
  const topData = ref<any | null>(null);
  const channelimage = ref<any | null>(null);
  const qr = ref<any | null>(null);
  const totalItems = ref<number>(0);

  const fetchBrandCream = async (page: number = 0, limit: number = 12) => {
    loading.value = true;
    error.value = null;

    try {
      const response: BrandCreamServiceResponse =
        await channelCreamService.getAll(page, limit);

      if (!response || !response.data || response.data.length === 0) {
        error.value = "No brand cream data received.";
        brandCream.value = null;
        allCreams.value = [];
        pagination.value = null;
        topData.value = null;
        channelimage.value = null;
        qr.value = null;
        return;
      }
      const topDataResponse = response.topData.topData;
      const qrResponse = response.qr.qr;
      const channelResponse = response.channelimage.channelimage;
      // const channelDataResponse = {channelimage: response.channelimage.results, qr: response.qr.results};

      allCreams.value = [...response.data];
      pagination.value = response.pagination;
      topData.value = topDataResponse;
      channelimage.value = channelResponse;
      qr.value = qrResponse;

      totalItems.value = response.topData.pagination.total;

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
  const seeMore = async (page: number, limit: number | 10) => {
    const resp = await channelCreamService.getAll(page, limit);
    allCreams.value = [...allCreams.value, ...resp.data];
  };

  return {
    brandCream,
    allCreams,
    loading,
    error,
    pagination,
    topData,
    channelimage,
    qr,
    fetchBrandCream,
    seeMore,
    totalItems,
  };
};
