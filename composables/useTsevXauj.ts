import { ref } from "vue";
import { tsevXaujService } from "~/services/api/tsev_xauj.service";
import type {
  HouseServiceResponse,
  TopData,
  HouseItem,
} from "~/services/types/tsev_xauj-type";

export const useTsevXauj = () => {
  const houses = ref<HouseItem | null>(null);
  const allHouses = ref<HouseItem[]>([]);
  const topData = ref<any | null>(null);
  const pagination = ref<any>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchTsevXauj = async (page: number = 0, limit: number = 10) => {
    loading.value = true;
    error.value = null;

    try {
      const response: HouseServiceResponse = await tsevXaujService.getAll(
        page,
        limit
      );

      if (!response || !response.data || response.data.length === 0) {
        error.value = "No house data received.";
        houses.value = null;
        allHouses.value = [];
        pagination.value = null;
        topData.value = null;
        return;
      }
      const topDataResponse = response.topData.topData;
      allHouses.value = [...response.data];
      pagination.value = response.pagination;
      topData.value = topDataResponse;
      if (response.data.length > 0) {
        houses.value = response.data[0];
      }
    } catch (err: any) {
      error.value = err.message || "Failed to fetch house data";
      houses.value = null;
      allHouses.value = [];
      pagination.value = null;
      topData.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    houses,
    allHouses,
    topData,
    pagination,
    loading,
    error,
    fetchTsevXauj,
  };
};
