// // composables/useKhoTsheb.ts
// import { ref, computed } from 'vue';
// import { KhoTshebService } from '~/services/api/kho_Tsheb.service';
// import type { 
//   KhoTshebResponse, 
//   KhoTshebItem, 
//   KhoTshebQueryParams,
//   TopData 
// } from '~/services/types/kho_Tsheb-type';

// export const useKhoTsheb = () => {
//   // State
//   const khoTshebData = ref<KhoTshebItem[]>([]);
//   const topData = ref<TopData | null>(null);
//   const pagination = ref({
//     page: 0,
//     limit: 15,
//     total: 0,
//     totalPages: 0,
//   });
//   const loading = ref(false);
//   const error = ref<string | null>(null);

//   // Computed
//   const hasData = computed(() => khoTshebData.value.length > 0);
//   const hasNextPage = computed(() => pagination.value.page < pagination.value.totalPages - 1);
//   const hasPrevPage = computed(() => pagination.value.page > 0);

//   /**
//    * Fetch all Kho Tsheb items
//    */
//   const fetchKhoTsheb = async (params: KhoTshebQueryParams = {}) => {
//     loading.value = true;
//     error.value = null;

//     try {
//       const response: KhoTshebResponse = await KhoTshebService.getAllKhoTsheb(params);
      
//       khoTshebData.value = response.data;
//       topData.value = response.topData;
//       pagination.value = response.pagination;
//       console.log('useKhoTsheb response:', response.data);

//       return response;
//     } catch (err) {
//       error.value = err instanceof Error ? err.message : 'Failed to fetch Kho Tsheb data';
//       console.error('useKhoTsheb fetch error:', err);
//       throw err;
//     } finally {
//       loading.value = false;
//     }
//   };

//   /**
//    * Fetch specific page
//    */
//   const fetchPage = async (page: number) => {
//     return await fetchKhoTsheb({
//       page,
//       limit: pagination.value.limit,
//     });
//   };

//   /**
//    * Go to next page
//    */
//   const nextPage = async () => {
//     if (hasNextPage.value) {
//       return await fetchPage(pagination.value.page + 1);
//     }
//   };

//   /**
//    * Go to previous page
//    */
//   const prevPage = async () => {
//     if (hasPrevPage.value) {
//       return await fetchPage(pagination.value.page - 1);
//     }
//   };

//   /**
//    * Refresh current page
//    */
//   const refresh = async () => {
//     return await fetchPage(pagination.value.page);
//   };

//   /**
//    * Get item by ID
//    */
//   const getItemById = (id: string): KhoTshebItem | undefined => {
//     return khoTshebData.value.find((item) => item.id === id);
//   };

//   /**
//    * Search items by name (client-side)
//    */
//   const searchByName = (query: string): KhoTshebItem[] => {
//     if (!query) return khoTshebData.value;
    
//     return khoTshebData.value.filter((item) =>
//       item.name.toLowerCase().includes(query.toLowerCase())
//     );
//   };

//   /**
//    * Filter items by price range
//    */
//   const filterByPriceRange = (minPrice: number, maxPrice: number): KhoTshebItem[] => {
//     return khoTshebData.value.filter((item) => {
//       const price1 = parseInt(item.Price1);
//       const price2 = parseInt(item.Price2);
//       const minItemPrice = Math.min(price1, price2);
//       const maxItemPrice = Math.max(price1, price2);
      
//       return minItemPrice >= minPrice && maxItemPrice <= maxPrice;
//     });
//   };

//   /**
//    * Reset state
//    */
//   const reset = () => {
//     khoTshebData.value = [];
//     topData.value = null;
//     pagination.value = {
//       page: 0,
//       limit: 15,
//       total: 0,
//       totalPages: 0,
//     };
//     error.value = null;
//   };

//   return {
//     // State
//     khoTshebData,
//     topData,
//     pagination,
//     loading,
//     error,
    
//     // Computed
//     hasData,
//     hasNextPage,
//     hasPrevPage,
    
//     // Methods
//     fetchKhoTsheb,
//     fetchPage,
//     nextPage,
//     prevPage,
//     refresh,
//     getItemById,
//     searchByName,
//     filterByPriceRange,
//     reset,
//   };
// };
// composables/useKhoTsheb.ts
import { ref, computed } from 'vue';
import { khoTshebService } from '~/services/api/kho_Tsheb.service';
import type { 
  KhoTshebResponse, 
  KhoTshebItem, 
  TopData,
  Pagination
} from '~/services/types/kho_Tsheb-type';

export const useKhoTsheb = () => {
  // State
  const khoTshebData = ref<KhoTshebItem[]>([]);
  const topData = ref<TopData | null>(null);
  const pagination = ref<Pagination>({
    page: 0,
    limit: 15,
    total: 0,
    totalPages: 0,
  });
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Computed
  const hasData = computed(() => khoTshebData.value.length > 0);
  const hasNextPage = computed(() => pagination.value.page < pagination.value.totalPages - 1);
  const hasPrevPage = computed(() => pagination.value.page > 0);
  const isEmpty = computed(() => !loading.value && khoTshebData.value.length === 0);

  /**
   * Fetch all Kho Tsheb items with complete response
   */
  const fetchKhoTsheb = async (page: number = 0, limit: number = 15) => {
    loading.value = true;
    error.value = null;

    try {
      console.log('🚀 Composable: Fetching kho tsheb:', { page, limit });
      
      const response = await khoTshebService.getCompleteResponse(page, limit);
      
      if (response.status) {
        khoTshebData.value = response.data;
        topData.value = response.topData;
        pagination.value = response.pagination;
        console.log('✅ Composable: Data loaded successfully:', {
          items: response.data.length,
          page: response.pagination.page,
          total: response.pagination.total
        });
      } else {
        error.value = response.message || 'Failed to fetch data';
        console.error('❌ API returned error:', response.message);
      }

      return response;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch Kho Tsheb data';
      console.error('❌ Composable fetch error:', err);
      
      // Set empty data on error
      khoTshebData.value = [];
      topData.value = { Dormitory: [], House: [], Land: [], Taxi: [] };
      
      // Return empty response instead of throwing
      return {
        status: false,
        message: error.value,
        data: [],
        pagination: { page: 0, limit: 15, total: 0, totalPages: 0 },
        topData: { Dormitory: [], House: [], Land: [], Taxi: [] }
      } as KhoTshebResponse;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Fetch specific page
   */
  const fetchPage = async (page: number) => {
    return await fetchKhoTsheb(page, pagination.value.limit);
  };

  /**
   * Go to next page
   */
  const nextPage = async () => {
    if (hasNextPage.value) {
      return await fetchPage(pagination.value.page + 1);
    }
    return null;
  };

  /**
   * Go to previous page
   */
  const prevPage = async () => {
    if (hasPrevPage.value) {
      return await fetchPage(pagination.value.page - 1);
    }
    return null;
  };

  /**
   * Go to first page
   */
  const firstPage = async () => {
    if (pagination.value.page !== 0) {
      return await fetchPage(0);
    }
    return null;
  };

  /**
   * Go to last page
   */
  const lastPage = async () => {
    const lastPageIndex = pagination.value.totalPages - 1;
    if (pagination.value.page !== lastPageIndex) {
      return await fetchPage(lastPageIndex);
    }
    return null;
  };

  /**
   * Refresh current page
   */
  const refresh = async () => {
    return await fetchPage(pagination.value.page);
  };

  /**
   * Get item by ID from current data or fetch from service
   */
  const getItemById = async (id: string): Promise<KhoTshebItem | null> => {
    try {
      // First check in current data
      const localItem = khoTshebData.value.find(item => item.id === id);
      if (localItem) {
        console.log('✅ Found item in local data:', id);
        return localItem;
      }

      // If not found, fetch from service
      console.log('🔍 Fetching item from service:', id);
      return await khoTshebService.getKhoTshebById(id);
    } catch (err) {
      console.error('❌ Error getting item by ID:', err);
      return null;
    }
  };

  /**
   * Search items by name (server-side)
   */
  const searchByName = async (query: string, page: number = 0, limit: number = 15) => {
    loading.value = true;
    error.value = null;

    try {
      console.log('🔍 Searching by name:', query);
      const results = await khoTshebService.searchByName(query, page, limit);
      khoTshebData.value = results;
      console.log('✅ Search results:', results.length);
      return results;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Search failed';
      console.error('❌ Error searching:', err);
      return [];
    } finally {
      loading.value = false;
    }
  };

  /**
   * Filter items by price range (server-side)
   */
  const filterByPriceRange = async (
    minPrice: number, 
    maxPrice: number,
    priceType: 'Price1' | 'Price2' = 'Price1',
    page: number = 0,
    limit: number = 15
  ) => {
    loading.value = true;
    error.value = null;

    try {
      console.log('💰 Filtering by price range:', { minPrice, maxPrice, priceType });
      const results = await khoTshebService.filterByPriceRange(minPrice, maxPrice, priceType, page, limit);
      khoTshebData.value = results;
      console.log('✅ Filter results:', results.length);
      return results;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Filter failed';
      console.error('❌ Error filtering by price:', err);
      return [];
    } finally {
      loading.value = false;
    }
  };

  /**
   * Filter by donation status
   */
  const filterByDonation = async (hasDonation: boolean, page: number = 0, limit: number = 15) => {
    loading.value = true;
    error.value = null;

    try {
      console.log('🎁 Filtering by donation:', hasDonation);
      const results = await khoTshebService.filterByDonation(hasDonation, page, limit);
      khoTshebData.value = results;
      console.log('✅ Donation filter results:', results.length);
      return results;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Filter failed';
      console.error('❌ Error filtering by donation:', err);
      return [];
    } finally {
      loading.value = false;
    }
  };

  /**
   * Get top data (featured items)
   */
  const fetchTopData = async () => {
    try {
      console.log('⭐ Fetching top data...');
      const data = await khoTshebService.getTopData();
      topData.value = data;
      console.log('✅ Top data loaded:', {
        dormitories: data.Dormitory.length,
        houses: data.House.length,
        lands: data.Land.length,
        taxis: data.Taxi.length
      });
      return data;
    } catch (err) {
      console.error('❌ Error fetching top data:', err);
      return {
        Dormitory: [],
        House: [],
        Land: [],
        Taxi: []
      };
    }
  };

  /**
   * Get all top dormitories
   */
  const fetchTopDormitories = async () => {
    try {
      const dormitories = await khoTshebService.getTopDormitories();
      console.log('✅ Top dormitories loaded:', dormitories.length);
      return dormitories;
    } catch (err) {
      console.error('❌ Error fetching top dormitories:', err);
      return [];
    }
  };

  /**
   * Get all top houses
   */
  const fetchTopHouses = async () => {
    try {
      const houses = await khoTshebService.getTopHouses();
      console.log('✅ Top houses loaded:', houses.length);
      return houses;
    } catch (err) {
      console.error('❌ Error fetching top houses:', err);
      return [];
    }
  };

  /**
   * Get all lands
   */
  const fetchLands = async () => {
    try {
      const lands = await khoTshebService.getLands();
      console.log('✅ Lands loaded:', lands.length);
      return lands;
    } catch (err) {
      console.error('❌ Error fetching lands:', err);
      return [];
    }
  };

  /**
   * Get all taxis
   */
  const fetchTaxis = async () => {
    try {
      const taxis = await khoTshebService.getTaxis();
      console.log('✅ Taxis loaded:', taxis.length);
      return taxis;
    } catch (err) {
      console.error('❌ Error fetching taxis:', err);
      return [];
    }
  };

  /**
   * Get statistics
   */
  const fetchStatistics = async () => {
    try {
      console.log('📊 Fetching statistics...');
      const stats = await khoTshebService.getStatistics();
      console.log('✅ Statistics loaded:', stats);
      return stats;
    } catch (err) {
      console.error('❌ Error fetching statistics:', err);
      return {
        total: 0,
        withDonation: 0,
        withoutDonation: 0,
        averagePrice1: 0,
        averagePrice2: 0
      };
    }
  };

  /**
   * Client-side search in current data
   */
  const searchLocal = (query: string): KhoTshebItem[] => {
    if (!query) return khoTshebData.value;
    
    const term = query.toLowerCase();
    return khoTshebData.value.filter(item =>
      item.name?.toLowerCase().includes(term) ||
      item.detail?.toLowerCase().includes(term) ||
      item.tel?.includes(term)
    );
  };

  /**
   * Client-side filter by price in current data
   */
  const filterLocalByPrice = (minPrice: number, maxPrice: number): KhoTshebItem[] => {
    return khoTshebData.value.filter(item => {
      const price1 = parseInt(item.Price1 || '0');
      const price2 = parseInt(item.Price2 || '0');
      const minItemPrice = Math.min(price1, price2);
      const maxItemPrice = Math.max(price1, price2);
      
      return minItemPrice >= minPrice && maxItemPrice <= maxPrice;
    });
  };

  /**
   * Reset all state
   */
  const reset = () => {
    console.log('🔄 Resetting state...');
    khoTshebData.value = [];
    topData.value = null;
    pagination.value = {
      page: 0,
      limit: 15,
      total: 0,
      totalPages: 0,
    };
    error.value = null;
    loading.value = false;
  };

  /**
   * Clear error
   */
  const clearError = () => {
    error.value = null;
  };

  return {
    // State
    khoTshebData,
    topData,
    pagination,
    loading,
    error,
    
    // Computed
    hasData,
    hasNextPage,
    hasPrevPage,
    isEmpty,
    
    // Fetch Methods
    fetchKhoTsheb,
    fetchPage,
    fetchTopData,
    fetchTopDormitories,
    fetchTopHouses,
    fetchLands,
    fetchTaxis,
    fetchStatistics,
    
    // Navigation Methods
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    refresh,
    
    // Query Methods
    getItemById,
    searchByName,
    filterByPriceRange,
    filterByDonation,
    
    // Local/Client-side Methods
    searchLocal,
    filterLocalByPrice,
    
    // Utility Methods
    reset,
    clearError,
  };
};