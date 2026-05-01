// import { ref } from "vue";
// import { hoobXaujService } from "~/services/api/hoob_xauj.service";
// import type {
//   HoobXaujItem,
//   HoobXaujServiceResponse,
// } from "~/services/types/hoob_xauj-type";

// export const useHoobXauj = () => {
//   const HoobXauj = ref<HoobXaujItem | null>(null);
//   const allHoobXauj = ref<HoobXaujItem[]>([]);
//   const loading = ref(false);
//   const error = ref<string | null>(null);
//   const pagination = ref<any>(null);
//   const topData = ref<any | null>(null);
//   const qr = ref<any | null>(null);
//   const video1 = ref<string | null>(null);
//   const channelimage = ref<string | null>(null);

//   const fetchHoobXauj = async (page: number = 0, limit: number = 10) => {
//     loading.value = true;
//     error.value = null;

//     try {
//       const response: HoobXaujServiceResponse = await hoobXaujService.getAll(
//         page,
//         limit
//       );
      
//       if (!response || !response.data || response.data.length === 0) {
//         error.value = "No data received";
//         HoobXauj.value = null;
//         allHoobXauj.value = [];
//         pagination.value = null;
//         topData.value = null;
//         channelimage.value = null;
//         video1.value = null;
//         qr.value = null;

//         return;
//       }
//       const topDataResponse = response.topData.topData;
//       const qrResponse = response.qr.qr;
//       const channelResponse = response.channelimage.channelimage;
//       allHoobXauj.value = [...response.data];
//       topData.value = topDataResponse;
//       channelimage.value = channelResponse;
//       qr.value = qrResponse;
//       video1.value = response?.reviewTxai?.video1 ?? null;
//       console.log("reviewTxai block:===", response?.reviewTxai);
//     } catch (err: any) {
//       error.value = err.message || "Failed to fetch data";
//       allHoobXauj.value = [];
//       pagination.value = null;
//       topData.value = null;
//     } finally {
//       loading.value = false;
//     }
//   };

//   return {
//     allHoobXauj,
//     loading,
//     error,
//     pagination,
//     topData,
//     channelimage,
//     video1,
//     qr,
//     fetchHoobXauj,
//   };
// };
import { ref } from "vue";
import { hoobXaujService } from "~/services/api/hoob_xauj.service";
import type {
  HoobXaujItem,
  HoobXaujServiceResponse,
} from "~/services/types/hoob_xauj-type";

export const useHoobXauj = () => {
  const HoobXauj = ref<HoobXaujItem | null>(null);
  const allHoobXauj = ref<HoobXaujItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const pagination = ref<any>(null);
  const topData = ref<any[]>([]);
  const qr = ref<any | null>(null);
  const video1 = ref<string | null>(null);
  const channelimage = ref<string[]>([]);  // ✅ array, not string

  const fetchHoobXauj = async (page: number = 0, limit: number = 10) => {
    loading.value = true;
    error.value = null;

    try {
      const response: HoobXaujServiceResponse = await hoobXaujService.getAll(
        page,
        limit
      );

      console.log("=== RAW RESPONSE ===", JSON.stringify(response, null, 2));

      if (!response || !response.data || response.data.length === 0) {
        error.value = "No data received";
        HoobXauj.value = null;
        allHoobXauj.value = [];
        pagination.value = null;
        topData.value = [];
        channelimage.value = [];
        video1.value = null;
        qr.value = null;
        return;
      }

      allHoobXauj.value = [...response.data];

      // ✅ topData — handle nested or flat
      topData.value =
        response?.topData?.topData ??
        response?.topData ??
        [];

      // ✅ qr — handle nested or flat
      qr.value =
        response?.qr?.qr ??
        response?.qr ??
        null;

      // ✅ channelimage — API returns a single string URL, wrap in array
      const rawChannel =
        response?.channelimage?.channelimage ??
        response?.channelimage ??
        null;
      channelimage.value = rawChannel
        ? Array.isArray(rawChannel)
          ? rawChannel
          : [rawChannel]
        : [];

      // ✅ video1 — API returns it as top-level string
      video1.value =
      (response.video1 as any)?.video1 ??
      (typeof response.video1 === "string" ? response.video1 : null) ??
      null;

      console.log("✅ channelimage:", channelimage.value);
      console.log("✅ video1:", video1.value);
      console.log("✅ topData:", topData.value);

    } catch (err: any) {
      error.value = err.message || "Failed to fetch data";
      allHoobXauj.value = [];
      pagination.value = null;
      topData.value = [];
    } finally {
      loading.value = false;
    }
  };

  return {
    HoobXauj,
    allHoobXauj,
    loading,
    error,
    pagination,
    topData,
    channelimage,
    video1,
    qr,
    fetchHoobXauj,
  };
};