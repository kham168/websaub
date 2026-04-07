import { ref, computed } from "vue";
import { khoTshebService } from "~/services/api/kho_Tsheb.service";
import type {
  KhoTshebServiceResponse,
  KhoTshebItem,
  TopData,
} from "~/services/types/kho_Tsheb-type";

export const useKhoTsheb = () => {
  const khoTshebData = ref<KhoTshebItem | null>(null);
  const allkhoTshebData = ref<KhoTshebItem[]>([]);
  const topData = ref<any | null>(null);
  const pagination = ref<any>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const channelimage = ref<any | null>(null);
  const qr = ref<any | null>(null);
  const fetchKhoTsheb = async (page: number = 0, limit: number = 10) => {
    loading.value = true;
    error.value = null;

    try {
      const response: KhoTshebServiceResponse = await khoTshebService.getAll(
        page,
        limit
      );

      if (!response || !response.data || response.data.length === 0) {
        error.value = "No Kho Tsheb data received.";
        khoTshebData.value = null;
        allkhoTshebData.value = [];
        pagination.value = null;
        topData.value = null;
        channelimage.value = null;
        qr.value = null;
        return;
      }

      const topDataResponse = response.topData.topData;
      const qrResponse = response.qr.qr;
      const channelResponse = response.channelimage.channelimage;
      allkhoTshebData.value = [...response.data];
      pagination.value = response.pagination;
      topData.value = topDataResponse;
      channelimage.value = channelResponse;
      qr.value = qrResponse;
      if (response.data.length > 0) {
        khoTshebData.value = response.data[0];
      }
    } catch (err: any) {
      error.value = err.message || "Failed to fetch Kho Tsheb. Something ";
      khoTshebData.value = null;
      allkhoTshebData.value = [];
      pagination.value = null;
      topData.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    allkhoTshebData,
    khoTshebData,
    topData,
    pagination,
    loading,
    error,
    channelimage,
    qr,
    fetchKhoTsheb,
  };
};
