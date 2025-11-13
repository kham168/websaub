// composables/useHoobXauj.ts
import { ref } from "vue";
import { hoobXaujService } from "~/services/api/hoob_xauj.service";
import type {
  ApiResponse,
  Dormitory,
  House,
  Land,
  Taxi,
  DormitoryRow,
  Pagination,
} from "~/services/types/hoob_xauj-type";

export const useHoobXauj = () => {
  const hoobXauj = ref<DormitoryRow | null>(null);
  const allDormitories = ref<DormitoryRow[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const pagination = ref<Pagination | null>(null);
  const topData = ref<{
    Dormitory: Dormitory[];
    House: House[];
    Land: Land[];
    Taxi: Taxi[];
  } | null>(null);

  const fetchHoobXauj = async (page: number = 0, limit: number = 15) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await hoobXaujService.getHoobXauj(page, limit);
      if (!response) {
        throw new Error("Response is null or undefined");
      }

      // Check if response has the expected ApiResponse structure
      // The response should be: { status: boolean, message: string, data: {...} }

      let rows: DormitoryRow[] = [];
      let paginationData: Pagination | null = null;
      let topDataResult: any = null;

      // Try to extract data from different possible structures
      if (response.data && response.data.rows) {
        // Structure: response = { status, message, data: { rows, pagination, topData } }
        // console.log('✅ Found structure: response.data.rows')
        rows = response.data.rows;
        paginationData = response.data.pagination || null;
        topDataResult = response.data.topData || null;
      } else if (response.rows) {
        // Structure: response = { rows, pagination, topData }
        console.log("✅ Found structure: response.rows");
        rows = response.rows;
        paginationData = response.pagination || null;
        topDataResult = response.topData || null;
      } else if (Array.isArray(response)) {
        // Structure: response = [...]
        // console.log('✅ Found structure: array response')
        rows = response;
      } else {
        // console.error('❌ Unknown response structure:', response)
        throw new Error(
          "Invalid API response structure. Cannot find rows data."
        );
      }

      // Validate rows is an array
      if (!Array.isArray(rows)) {
        // console.error('❌ Rows is not an array:', rows)
        throw new Error("Invalid API response: rows must be an array");
      }

      // Set the data
      allDormitories.value = rows;
      pagination.value = paginationData;
      topData.value = topDataResult;

      if (rows.length > 0) {
        hoobXauj.value = rows[0];
        console.log("✅ Selected first property:", hoobXauj.value?.id);
      } else {
        console.warn("⚠️ No properties found in response");
      }

      console.log(
        "✅ Successfully loaded",
        allDormitories.value.length,
        "properties"
      );
    } catch (err: any) {
      if (err.request) {
        error.value = "No response from server. Please check your connection.";
        // console.error('❌ Request made but no response:', err.request)
      } else {
        error.value = err.message || "Failed to load hoob xauj data";
      }

      hoobXauj.value = null;
      allDormitories.value = [];
      pagination.value = null;
      topData.value = null;
    } finally {
      loading.value = false;
    }
  };

  const fetchDormitories = async (page: number = 0, limit: number = 15) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await hoobXaujService.getDormitories(page, limit);
      console.log("📊 Dormitories data:", data);

      allDormitories.value = data;

      if (data.length > 0) {
        hoobXauj.value = data[0];
      }

      console.log("✅ Successfully loaded", data.length, "dormitories");
    } catch (err: any) {
      //   console.error("❌ Error fetching dormitories:", err);
      error.value = err.message || "Failed to load dormitories";
      allDormitories.value = [];
    } finally {
      loading.value = false;
    }
  };

  const fetchTopData = async () => {
    loading.value = true;
    error.value = null;

    try {
      const data = await hoobXaujService.getTopData();
      console.log("📊 Top data:", data);

      topData.value = data;
      //   console.log("✅ Successfully loaded top data");
    } catch (err: any) {
      //   console.error("❌ Error fetching top data:", err);
      error.value = err.message || "Failed to load top data";
      topData.value = null;
    } finally {
      loading.value = false;
    }
  };

  const fetchPropertyById = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await hoobXaujService.getPropertyById(id);
      hoobXauj.value = data;
      //   console.log("✅ Successfully loaded property:", id);
    } catch (err: any) {
      //   console.error("❌ Error fetching property:", err);
      error.value = err.message || "Failed to load property";
      hoobXauj.value = null;
    } finally {
      loading.value = false;
    }
  };

  const filterByProvince = async (
    province: string,
    page: number = 0,
    limit: number = 15
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await hoobXaujService.filterByProvince(
        province,
        page,
        limit
      );
      allDormitories.value = data;

      if (data.length > 0) {
        hoobXauj.value = data[0];
      }

      console.log(
        "✅ Filtered by province:",
        province,
        "-",
        data.length,
        "results"
      );
    } catch (err: any) {
      //   console.error("❌ Error filtering by province:", err);
      error.value = err.message || "Failed to filter by province";
      allDormitories.value = [];
    } finally {
      loading.value = false;
    }
  };

  const filterByDistrict = async (
    district: string,
    page: number = 0,
    limit: number = 15
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await hoobXaujService.filterByDistrict(
        district,
        page,
        limit
      );
      allDormitories.value = data;

      if (data.length > 0) {
        hoobXauj.value = data[0];
      }

      //   console.log(
      //     "✅ Filtered by district:",
      //     district,
      //     "-",
      //     data.length,
      //     "results"
      //   );
    } catch (err: any) {
      //   console.error("❌ Error filtering by district:", err);
      error.value = err.message || "Failed to filter by district";
      allDormitories.value = [];
    } finally {
      loading.value = false;
    }
  };

  const filterByVillages = async (
    villages: string[],
    page: number = 0,
    limit: number = 15
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await hoobXaujService.filterByVillages(
        villages,
        page,
        limit
      );
      allDormitories.value = data;

      if (data.length > 0) {
        hoobXauj.value = data[0];
      }

      //   console.log(
      //     "✅ Filtered by villages:",
      //     villages,
      //     "-",
      //     data.length,
      //     "results"
      //   );
    } catch (err: any) {
      //   console.error("❌ Error filtering by villages:", err);
      error.value = err.message || "Failed to filter by villages";
      allDormitories.value = [];
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
      const data = await hoobXaujService.filterByPriceRange(
        minPrice,
        maxPrice,
        page,
        limit
      );
      allDormitories.value = data;

      if (data.length > 0) {
        hoobXauj.value = data[0];
      }

      //   console.log(
      //     "✅ Filtered by price range:",
      //     minPrice,
      //     "-",
      //     maxPrice,
      //     "-",
      //     data.length,
      //     "results"
      //   );
    } catch (err: any) {
      //   console.error("❌ Error filtering by price range:", err);
      error.value = err.message || "Failed to filter by price range";
      allDormitories.value = [];
    } finally {
      loading.value = false;
    }
  };

  const filterByType = async (
    type: string,
    page: number = 0,
    limit: number = 15
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await hoobXaujService.filterByType(type, page, limit);
      allDormitories.value = data;

      if (data.length > 0) {
        hoobXauj.value = data[0];
      }

      //   console.log("✅ Filtered by type:", type, "-", data.length, "results");
    } catch (err: any) {
      //   console.error("❌ Error filtering by type:", err);
      error.value = err.message || "Failed to filter by type";
      allDormitories.value = [];
    } finally {
      loading.value = false;
    }
  };

  const searchProperties = async (
    searchTerm: string,
    page: number = 0,
    limit: number = 15
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await hoobXaujService.searchProperties(
        searchTerm,
        page,
        limit
      );
      allDormitories.value = data;

      if (data.length > 0) {
        hoobXauj.value = data[0];
      }

      //   console.log(
      //     "✅ Search results for:",
      //     searchTerm,
      //     "-",
      //     data.length,
      //     "results"
      //   );
    } catch (err: any) {
      //   console.error("❌ Error searching properties:", err);
      error.value = err.message || "Failed to search properties";
      allDormitories.value = [];
    } finally {
      loading.value = false;
    }
  };

  const fetchAvailableProperties = async (
    page: number = 0,
    limit: number = 15
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await hoobXaujService.getAvailableProperties(page, limit);
      allDormitories.value = data;

      if (data.length > 0) {
        hoobXauj.value = data[0];
      }

      //   console.log("✅ Available properties:", data.length, "results");
    } catch (err: any) {
      //   console.error("❌ Error loading available properties:", err);
      error.value = err.message || "Failed to load available properties";
      allDormitories.value = [];
    } finally {
      loading.value = false;
    }
  };

  const setSelectedHoobXauj = (item: DormitoryRow) => {
    hoobXauj.value = item;
    console.log("✅ Selected property:", item.id);
  };

  return {
    hoobXauj,
    allDormitories,
    loading,
    error,
    pagination,
    topData,
    fetchHoobXauj,
    fetchDormitories,
    fetchTopData,
    fetchPropertyById,
    filterByProvince,
    filterByDistrict,
    filterByVillages,
    filterByPriceRange,
    filterByType,
    searchProperties,
    fetchAvailableProperties,
    setSelectedHoobXauj,
  };
};
