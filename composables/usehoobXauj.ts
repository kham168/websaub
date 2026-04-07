import { ref } from "vue";
import { hoobXaujService } from "~/services/api/hoob_xauj.service";
import type {
  HoobXaujItem,
  TopData,
  HoobXaujServiceResponse,
} from "~/services/types/hoob_xauj-type";

export const useHoobXauj = () => {
  const HoobXauj = ref<HoobXaujItem | null>(null);
  const allHoobXauj = ref<HoobXaujItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const pagination = ref<any>(null);
  const topData = ref<any | null>(null);
  const channelimage = ref<any | null>(null);
  const qr = ref<any | null>(null);

  const fetchHoobXauj = async (page: number = 0, limit: number = 10) => {
    loading.value = true;
    error.value = null;

    try {
      const response: HoobXaujServiceResponse = await hoobXaujService.getAll(
        page,
        limit
      );
      if (!response || !response.data || response.data.length === 0) {
        error.value = "No data received";
        HoobXauj.value = null;
        allHoobXauj.value = [];
        pagination.value = null;
        topData.value = null;
        channelimage.value = null;
        qr.value = null;
        return;
      }
      const topDataResponse = response.topData.topData;
      const qrResponse = response.qr.qr;
      const channelResponse = response.channelimage.channelimage;
      allHoobXauj.value = [...response.data];
      topData.value = topDataResponse;
      channelimage.value = channelResponse;
      qr.value = qrResponse;
    } catch (err: any) {
      error.value = err.message || "Failed to fetch data";
      allHoobXauj.value = [];
      pagination.value = null;
      topData.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    allHoobXauj,
    loading,
    error,
    pagination,
    topData,
    channelimage,
    qr,
    fetchHoobXauj,
  };
};
