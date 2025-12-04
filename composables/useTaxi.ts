import { taxiService } from "~/services/api/taxi.service";
import type {
  PaginationItem,
  TaxiItem,
  TaxiServiceResponse,
} from "~/services/types/taxi-type";

export const useTaxi = () => {
  // State
  const items = ref<TaxiItem | null>(null);
  const allitems = ref<TaxiItem[]>([]);
  const topData = ref<any | null>(null);
  const pagination = ref<PaginationItem | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Actions
  const fetchTaxi = async (page: number = 0, limit: number = 10) => {
    loading.value = true;
    error.value = null;

    try {
      const response: TaxiServiceResponse = await taxiService.getAll(
        page,
        limit
      );

      if (!response || !response.items || response.items.length === 0) {
        error.value = "No taxi data received.";
        allitems.value = [];
        topData.value = null;
        pagination.value = null;
        return;
      }
      const topDataResponse = response.topData;
      allitems.value = [...response.items];
      topData.value = topDataResponse;
      pagination.value = response.pagination;
      if (response.items.length > 0) {
        items.value = response.items[0];
      }
    } catch (err: any) {
      error.value = err?.message || "Failed to load brand data";
      allitems.value = [];
      topData.value = null;
      pagination.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    items,
    allitems,
    topData,
    pagination,
    loading,
    error,
    fetchTaxi,
  };
};
