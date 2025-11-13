import { ref } from 'vue';
import { tsevXaujService } from '~/services/api/tsev_xauj.service';
import type { HouseRow, Pagination, TopData } from '~/services/types/tsev_xauj-type';

export const useTsevXauj = () => {
  const houses = ref<HouseRow[]>([]);
  const topData = ref<TopData | null>(null);
  const pagination = ref<Pagination | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchTsevXauj = async (page: number = 0, limit: number = 15) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await tsevXaujService.getTsevXauj(page, limit);

      if (!response) throw new Error('Empty response from server');

      let rows: HouseRow[] = [];
      let paginationData: Pagination | null = null;
      let topDataResult: TopData | null = null;

      if (response.data && response.data.rows) {
        rows = response.data.rows;
        paginationData = response.data.pagination || null;
        topDataResult = response.data.topData || null;
      } else if (response.rows) {
        rows = response.rows;
        paginationData = response.pagination || null;
        topDataResult = response.topData || null;
      } else if (Array.isArray(response)) {
        rows = response;
      } else {
        throw new Error('Invalid response structure');
      }

      houses.value = rows;
      pagination.value = paginationData;
      topData.value = topDataResult;

      console.log('✅ Loaded', rows.length, 'houses');
    } catch (err: any) {
      console.error('❌ Error fetching houses:', err);

      if (err.response && err.response.status === 404) {
        error.value = 'API endpoint not found (404). Check tsev_xauj.service.ts URL.';
      } else if (err.response && err.response.status === 500) {
        error.value = 'Server error (500). Check your backend logs.';
      } else if (err.message.includes('Unexpected token')) {
        error.value = 'Server returned HTML instead of JSON. Verify API URL.';
      } else {
        error.value = err.message || 'Unknown error fetching houses';
      }

      houses.value = [];
      pagination.value = null;
      topData.value = null;
    } finally {
      loading.value = false;
    }
  };

  const fetchTopData = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await tsevXaujService.getTopData();
      if (response && response) {
        topData.value = response;
      } else {
        throw new Error('Invalid top data response');
      }
    } catch (err: any) {
      console.error('❌ Error fetching top data:', err);
      error.value = err.message || 'Failed to fetch top data';
      topData.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    houses,
    topData,
    pagination,
    loading,
    error,
    fetchTsevXauj,
    fetchTopData,
  };
};