
import { ref } from 'vue';
import { taxiService } from "~/services/api/taxi.service";
import type { TaxiItem, PaginationItem } from "~/services/types/taxi-type";

export const useTaxi = () => {
  const items = ref<TaxiItem | null>(null);
  const allitems = ref<TaxiItem[]>([]);
  const topData = ref<any | null>(null);
  const pagination = ref<PaginationItem | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  
  // Banner State
  const video1 = ref<string | null>(null);
  const channelimage = ref<string | null>(null);

  const fetchTaxi = async (page: number = 0, limit: number = 10) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await taxiService.getAll(page, limit);

      if (!response) {
        error.value = "No taxi data received.";
        return;
      }

      video1.value = response.video1;
      channelimage.value = response.channelimage;

     

      allitems.value = response.items || [];
      topData.value = response.topData || null;
      pagination.value = response.pagination || null;

      if (allitems.value.length > 0) {
        items.value = allitems.value[0];
      }

    } catch (err: any) {
      error.value = err?.message || "Failed to load taxi data";
      video1.value = null;
      channelimage.value = null;
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
    video1,
    channelimage,
    fetchTaxi,
  };
};