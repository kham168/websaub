// import { ref } from "vue";
// import { retrieveByidService } from "~/services/api/retrieve_chByid.service";
// import type { 
//   DormitoryListing, 
//   TopListing, 
//   Pagination 
// } from "~/services/types/retrieve_chByid-type";

// export const useGetChannelById = () => {
//   // We explicitly define the types here so the red lines disappear
//   const channels = ref<DormitoryListing[]>([]);
//   const topData = ref<TopListing[] | null>(null);
//   const pagination = ref<Pagination | null>(null);
//   const qr = ref<string | null>(null);
//   const channelimage = ref<string[] | string | null>(null);
//   const video1 = ref<string | null>(null);
//   const loadings = ref(false);
//   const errors = ref<string | null>(null);

//   const fetchChannelById = async (id: string, page: number = 0, limit: number = 10) => {
//     loadings.value = true;
//     errors.value = null;

//     try {
//       // We cast the response to 'any' temporarily if the service returns a generic type
//       const response = await retrieveByidService.getRetrieveByid(id, page, limit) as any;

//       if (!response) {
//         errors.value = "No response from server";
//         return;
//       }

//       // Mapping data based on your DormitoryListResponse interface
//       channels.value = response.data || [];
      
//       // Mapping from the 'result' or response body
//       // Note: adjust 'response.result' vs 'response' based on your actual API structure
//       const metaSource = response.result || response;
      
//       topData.value = metaSource.topData || null;
//       qr.value = metaSource.qr || null;
//       channelimage.value = metaSource.channelimage || metaSource.imageadvert || null;
//       video1.value = metaSource.video1 || null;
      
//       pagination.value = response.pagination || null;

//       console.log("🔍 Fetch Success:=========", channels.value.length, "items");
      
//     } catch (err: any) {
//       errors.value = err?.message || "Failed to fetch channel";
//       channels.value = [];
//     } finally {
//       loadings.value = false;
//     }
//   };

//   return {
//     channels,
//     topData,
//     pagination,
//     qr,
//     channelimage,
//     video1,
//     loadings,
//     errors,
//     fetchChannelById,
//   };
// };
import { ref } from "vue";
import { retrieveByidService } from "~/services/api/retrieve_chByid.service";
// Import your existing types
import type { 
  DormitoryListing, 
  TopListing, 
  Pagination 
} from "~/services/types/retrieve_chByid-type";

export const useGetChannelById = () => {
  // Use types in refs to prevent "never[]" or "any" errors
  const channels = ref<DormitoryListing[]>([]);
  const topData = ref<TopListing[] | null>(null);
  const pagination = ref<Pagination | null>(null);
  const qr = ref<string | null>(null);
  const channelimage = ref<string | string[] | null>(null);
  const video1 = ref<string | null>(null);
  const loadings = ref(false);
  const errors = ref<string | null>(null);

  const fetchChannelById = async (id: string, page: number = 0, limit: number = 10) => {
    if (!id) {
      console.warn("⚠️ fetchChannelById: Missing ID");
      return;
    }

    loadings.value = true;
    errors.value = null;

    try {
      console.log(`📡 Fetching ID: ${id}`);
      // Cast response to 'any' temporarily to handle dynamic nesting safely
      const response = await retrieveByidService.getRetrieveByid(id, page, limit) as any;
      
      console.log("📥 API Response:", response);

      if (!response) throw new Error("Empty response from server");

      // 1. Safe Mapping for the list of channels
      // Checks for response.data.data (paginated) OR response.data (simple list)
      const rawData = response.data?.data || response.data || [];
      channels.value = Array.isArray(rawData) ? rawData : [];
      
      // 2. Safe Mapping for Metadata (Banner, QR, etc.)
      // Checks for response.result OR fallback to the root response object
      const meta = response.result || response;
      
      qr.value = meta.qr || null;
      channelimage.value = meta.channelimage || meta.imageadvert || null;
      video1.value = meta.video1 || null;
      topData.value = meta.topData || null;
      pagination.value = response.pagination || null;

      console.log("✅ Sync Complete:", { items: channels.value.length });

    } catch (err: any) {
      console.error("❌ Composable Error:", err);
      errors.value = err.message || "Connection Error";
      channels.value = [];
    } finally {
      loadings.value = false;
    }
  };

  return { 
    channels, 
    topData, 
    pagination, 
    qr, 
    channelimage, 
    video1, 
    loadings, 
    errors, 
    fetchChannelById 
  };
};