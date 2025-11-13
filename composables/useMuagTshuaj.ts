// composables/useMuagTshuaj.ts

import { muagTshuajService } from '~/services/api/muag_Tshuaj.service';
import type { 
  MuagTshuajItem, 
  TopDataCategory,
  Pagination
} from '~/services/types/muag_Tshuaj-type';

export const useMuagTshuaj = () => {
  // State
  const items = ref<MuagTshuajItem[]>([]);
  const topData = ref<TopDataCategory | null>(null);
  const pagination = ref<Pagination | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Computed properties
  const hasMore = computed(() => {
    if (!pagination.value) return false;
    return pagination.value.page + 1 < pagination.value.totalPages;
  });

  const currentPage = computed(() => pagination.value?.page ?? 0);
  const totalItems = computed(() => pagination.value?.total ?? 0);
  const totalPages = computed(() => pagination.value?.totalPages ?? 0);

  // Top data computed properties
  const dormitoryItems = computed(() => topData.value?.Dormitory || []);
  const houseItems = computed(() => topData.value?.House || []);
  const landItems = computed(() => topData.value?.Land || []);
  const taxiItems = computed(() => topData.value?.Taxi || []);

  // Actions
  const fetchMuagTshuaj = async (page: number = 0, limit: number = 15) => {
    loading.value = true;
    error.value = null;

    try {
      console.log('🔄 Composable: Fetching muag tshuaj...', { page, limit });
      
      const response = await muagTshuajService.getMuagTshuaj(page, limit);
      
      console.log('✅ Composable: Response received:', response);
      console.log('✅ Response type:', typeof response);
      console.log('✅ Is Array?:', Array.isArray(response));
      
      // Handle array response
      if (Array.isArray(response)) {
        items.value = response;
        topData.value = null;
        pagination.value = null;
        
        console.log('✅ State updated (array):', {
          itemsCount: items.value.length
        });
      }
      // Handle object response with status
      else if (response && typeof response === 'object') {
        if (response.status !== undefined && !response.status) {
          throw new Error(response.message || 'Failed to fetch data');
        }
        
        items.value = response.data || [];
        topData.value = response.topData || null;
        pagination.value = response.pagination || null;
        
        console.log('✅ State updated (object):', {
          itemsCount: items.value.length,
          hasTopData: !!topData.value,
          hasPagination: !!pagination.value
        });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err: any) {
      error.value = err?.message || 'An unknown error occurred';
      console.error('❌ Composable error in fetchMuagTshuaj:', err);
    } finally {
      loading.value = false;
    }
  };

  const loadMore = async () => {
    if (!hasMore.value || loading.value) {
      console.log('⚠️ Cannot load more:', { hasMore: hasMore.value, loading: loading.value });
      return;
    }

    const nextPage = pagination.value ? pagination.value.page + 1 : 1;
    const limit = pagination.value?.limit || 15;

    loading.value = true;
    error.value = null;

    try {
      console.log('🔄 Loading more items...', { nextPage, limit });
      
      const response = await muagTshuajService.getMuagTshuaj(nextPage, limit);

      // Handle array response
      if (Array.isArray(response)) {
        items.value = [...items.value, ...response];
        console.log('✅ More items loaded (array):', items.value.length);
      }
      // Handle object response
      else if (response && typeof response === 'object') {
        if (response.status !== undefined && !response.status) {
          throw new Error(response.message || 'Failed to load more data');
        }
        
        items.value = [...items.value, ...(response.data || [])];
        pagination.value = response.pagination || null;
        if (response.topData) {
          topData.value = response.topData;
        }
        
        console.log('✅ More items loaded (object):', items.value.length);
      }
    } catch (err: any) {
      error.value = err?.message || 'An unknown error occurred';
      console.error('❌ Error loading more:', err);
    } finally {
      loading.value = false;
    }
  };

  const refresh = async () => {
    console.log('🔄 Refreshing data...');
    await fetchMuagTshuaj(0, pagination.value?.limit || 15);
  };

  const fetchTopData = async () => {
    loading.value = true;
    error.value = null;

    try {
      console.log('🔄 Fetching top data...');
      const data = await muagTshuajService.getTopData();
      topData.value = data;
      console.log('✅ Top data loaded:', data);
    } catch (err: any) {
      error.value = err?.message || 'Failed to fetch top data';
      console.error('❌ Error fetching top data:', err);
    } finally {
      loading.value = false;
    }
  };

  const searchMedicines = async (searchTerm: string, page: number = 0, limit: number = 15) => {
    loading.value = true;
    error.value = null;

    try {
      console.log('🔍 Searching medicines:', searchTerm);
      const results = await muagTshuajService.searchMedicines(searchTerm, page, limit);
      items.value = results;
      console.log('✅ Search results:', results.length);
    } catch (err: any) {
      error.value = err?.message || 'Search failed';
      console.error('❌ Search error:', err);
    } finally {
      loading.value = false;
    }
  };

  const filterByPriceRange = async (
    minPrice: number,
    maxPrice: number,
    page: number = 0,
    limit: number = 15
  ) => {
    loading.value = true;
    error.value = null;

    try {
      console.log('🔍 Filtering by price:', { minPrice, maxPrice });
      const results = await muagTshuajService.filterByPriceRange(minPrice, maxPrice, page, limit);
      items.value = results;
      console.log('✅ Filter results:', results.length);
    } catch (err: any) {
      error.value = err?.message || 'Filter failed';
      console.error('❌ Filter error:', err);
    } finally {
      loading.value = false;
    }
  };

  const getItemById = async (id: string): Promise<MuagTshuajItem | null> => {
    try {
      console.log('🔍 Fetching item by ID:', id);
      const item = await muagTshuajService.getMedicineById(id);
      console.log('✅ Item found:', item);
      return item;
    } catch (err: any) {
      error.value = err?.message || 'Failed to fetch item';
      console.error('❌ Error fetching item:', err);
      return null;
    }
  };

  const getImageUrl = (imagePath: string): string => {
    return muagTshuajService.getImageUrl(imagePath);
  };

  const reset = () => {
    console.log('🔄 Resetting state...');
    items.value = [];
    topData.value = null;
    pagination.value = null;
    loading.value = false;
    error.value = null;
  };

  return {
    // State
    items: readonly(items),
    topData: readonly(topData),
    pagination: readonly(pagination),
    loading: readonly(loading),
    error: readonly(error),
    
    // Computed
    hasMore,
    currentPage,
    totalItems,
    totalPages,
    dormitoryItems,
    houseItems,
    landItems,
    taxiItems,

    // Actions
    fetchMuagTshuaj,
    loadMore,
    refresh,
    fetchTopData,
    searchMedicines,
    filterByPriceRange,
    getItemById,
    getImageUrl,
    reset,
  };
};