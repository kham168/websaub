// // import { http } from "~/services/core/http.service";
// // import { HOOB_XAUJ_ENDPOINTS } from "~/services/endpoints/hoob_xauj.endpoint";
// // import type {
// //   HoobXaujApiResponse,
// //   HoobXaujResponse,
// //   HoobXaujItem,
// //   HoobXaujServiceResponse,
// // } from "~/services/types/hoob_xauj-type";

// // export class HoobXaujService {
// //   async getAll(
// //     page: number = 0,
// //     limit: number = 10
// //   ): Promise<HoobXaujServiceResponse> {
// //     try {
// //       const endpoint = HOOB_XAUJ_ENDPOINTS.HOOB_XAUJ(page, limit);
// //       const response = await http.get<
// //         HoobXaujApiResponse | HoobXaujResponse | HoobXaujItem[]
// //       >(endpoint);

// //       let actualData: HoobXaujResponse | null = null;
// //       if (this.isHoobXaujResponse(response.data)) {
// //         actualData = response.data;
// //       } else if (this.isHoobXaujApiResponse(response.data)) {
// //         actualData = response.data.data;
        
// //       } else if (Array.isArray(response.data)) {
// //         return {
// //           data: response.data,
// //           pagination: null,
// //           topData: response.result,
// //           qr: response.result,
// //           channelimage: response.result,
// //           video1:  actualData?.video1 || null,
// //         };
        
// //       }

// //       if (!actualData || !actualData.rows) {
// //         return { data: [], pagination: null, topData: null, qr: null ,channelimage: null, video1: null};
// //       }

// //       return {
// //         data: actualData.rows,
// //         pagination: actualData.pagination || null,
// //         topData: actualData.topData || null,
// //         channelimage: actualData.channelimage || null,
// //         qr: actualData.qr || null,
// //         video1: actualData.video1 || null,
// //       };
// //     } catch (error) {
// //       throw error;
// //     }
// //   }
// //   private isHoobXaujResponse(data: any): data is HoobXaujResponse {
// //     return (
// //       data &&
// //       typeof data === "object" &&
// //       "rows" in data &&
// //       Array.isArray(data.rows)
// //     );
// //   }

// //   private isHoobXaujApiResponse(data: any): data is HoobXaujApiResponse {
// //     return (
// //       data &&
// //       typeof data === "object" &&
// //       "status" in data &&
// //       "data" in data &&
// //       data.data &&
// //       "rows" in data.data
// //     );
// //   }
// // }

// // export const hoobXaujService = new HoobXaujService();
// // export default hoobXaujService;
// import { http } from "~/services/core/http.service";
// import { HOOB_XAUJ_ENDPOINTS } from "~/services/endpoints/hoob_xauj.endpoint";
// import type { HoobXaujServiceResponse } from "~/services/types/hoob_xauj-type";

// export class HoobXaujService {
//   async getAll(
//     page: number = 0,
//     limit: number = 10
//   ): Promise<HoobXaujServiceResponse> {
//     try {
//       const endpoint = HOOB_XAUJ_ENDPOINTS.HOOB_XAUJ(page, limit);
//       const response = await http.get<any>(endpoint) as any;  // ✅ cast to any
//       const raw: any = response?.data ?? response;            // ✅ typed as any
//       console.log("=== raw.video1 ===", raw?.video1);
//       console.log("=== SERVICE RAW response ===", response);
//       console.log("=== SERVICE raw ===", raw);

//       if (this.isHoobXaujApiResponse(raw)) {
//         const actualData: any = raw.data;
//         return {
//           data: actualData?.rows ?? [],
//           pagination: actualData?.pagination || null,
//           topData: raw.topData || actualData?.topData || null,
//           qr: raw.qr || actualData?.qr || null,
//           channelimage: raw.channelimage || actualData?.channelimage || null,
//           video1: raw.video1 || actualData?.video1 || null,
//         };

//       } else if (this.isHoobXaujResponse(raw)) {
//         return {
//           data: raw.rows ?? [],
//           pagination: raw.pagination || null,
//           topData: raw.topData || null,
//           qr: raw.qr || null,
//           channelimage: raw.channelimage || null,
//           video1: raw.video1 || null,
//         };

//       } else if (Array.isArray(raw)) {
//         return {
//           data: raw,
//           pagination: null,
//           topData: null,
//           qr: null,
//           channelimage: null,
//           video1: null,
//         };
//       }

//       return {
//         data: [],
//         pagination: null,
//         topData: null,
//         qr: null,
//         channelimage: null,
//         video1: null,
//       };

//     } catch (error) {
//       throw error;
//     }
//   }

//   private isHoobXaujResponse(data: any): boolean {
//     return (
//       data &&
//       typeof data === "object" &&
//       !Array.isArray(data) &&
//       "rows" in data &&
//       Array.isArray(data.rows)
//     );
//   }

//   private isHoobXaujApiResponse(data: any): boolean {
//     return (
//       data &&
//       typeof data === "object" &&
//       !Array.isArray(data) &&
//       "status" in data &&
//       "data" in data &&
//       data.data &&
//       "rows" in data.data
//     );
//   }
// }

// export const hoobXaujService = new HoobXaujService();
// export default hoobXaujService;
import { http } from "~/services/core/http.service";
import { HOOB_XAUJ_ENDPOINTS } from "~/services/endpoints/hoob_xauj.endpoint";
import type { HoobXaujServiceResponse } from "~/services/types/hoob_xauj-type";

export class HoobXaujService {
  async getAll(
    page: number = 0,
    limit: number = 10
  ): Promise<HoobXaujServiceResponse> {
    try {
      const endpoint = HOOB_XAUJ_ENDPOINTS.HOOB_XAUJ(page, limit);
      const response = await http.get<any>(endpoint) as any;

      console.log("🔍 response:", response);
      console.log("🔍 response.result:", response?.result);

      // ✅ data is in response.data (array)
      // ✅ channelimage, video1, qr, topData are in response.result
      const rows = response?.data ?? [];
      const result = response?.result ?? {};

      console.log("✅ rows:", rows);
      console.log("✅ result:", result);
      console.log("✅ result.video1:", result?.video1);
      console.log("✅ result.channelimage:", result?.channelimage);

      if (!Array.isArray(rows) || rows.length === 0) {
        return {
          data: [],
          pagination: null,
          topData: result?.topData || null,
          qr: result?.qr || null,
          channelimage: result?.channelimage || null,
          video1: result?.video1 || null,
        };
      }

      return {
        data: rows,
        pagination: response?.pagination || null,
        topData: result?.topData || null,
        qr: result?.qr || null,
        channelimage: result?.channelimage || null,
        video1: result?.video1 || null,
      };

    } catch (error) {
      throw error;
    }
  }
}

export const hoobXaujService = new HoobXaujService();
export default hoobXaujService;