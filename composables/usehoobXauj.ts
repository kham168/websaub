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
        return;
      }
      const topDataResponse = response.topData.topData;
      allHoobXauj.value = [...response.data];
      topData.value = topDataResponse;
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
    fetchHoobXauj,
  };
};
