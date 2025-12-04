// // // services/api/taxi.service.ts
// // import { http } from "~/services/core/http.service";
// // import { TAXI_ENDPOINTS } from "~/services/endpoints/taxi.endpoint";
// // import type {
// //   TaxiItem,
// //   TaxiApiResponse,
// //   TaxiServiceResponse,
// //   TaxiResponse,
// // } from "~/services/types/taxi-type";

// // class TaxiService {
// //   async getAll(
// //     page: number = 0,
// //     limit: number = 10
// //   ): Promise<TaxiServiceResponse> {
// //     try {
// //       const endpoint = TAXI_ENDPOINTS.TAXI(page, limit);
// //       const response = await http.get<
// //         TaxiResponse | TaxiApiResponse | TaxiItem[]
// //       >(endpoint);

// //       let actualData: TaxiResponse | null = null;
// //       if (this.isTaxiResponse(response.data)) {
// //         actualData = response.data;
// //       } else if (this.isTaxiApiResponse(response.data)) {
// //         actualData = response.data.data;
// //       } else if (Array.isArray(response.data)) {
// //         return {
// //           items: response.data,
// //           pagination: null,
// //           topData: null,
// //         };
// //       }
// //       if (!actualData || !actualData.rows || !Array.isArray(actualData.rows)) {
// //         return {
// //           items: [],
// //           pagination: null,
// //           topData: null,
// //         };
// //       }
// //       return {
// //         items: actualData.rows,
// //         pagination: actualData.pagination || null,
// //         topData: actualData.topData || null,
// //       };
// //     } catch (error) {
// //       throw error;
// //     }
// //   }
// //   private isTaxiResponse(data: any): data is TaxiResponse {
// //     return typeof data === "object" && data !== null && "rows" in data;
// //   }
// //   private isTaxiApiResponse(data: any): data is TaxiApiResponse {
// //     return (
// //       typeof data === "object" &&
// //       data !== null &&
// //       "data" in data &&
// //       "pagination" in data &&
// //       "topData" in data
// //     );
// //   }
// // }
// // export const taxiService = new TaxiService();
// // export default taxiService;
// //   // Helper function to extract data from response
// //   // private extractData(response: any): { data: TaxiItem[], pagination: Pagination | null, topData: TopDataCategory | null } {
// //   //   console.log('🔍 Extracting data from response...')
// //   //   console.log('🔍 Response structure:', response)

// //   //   // Check different possible structures
// //   //   if (response.data && Array.isArray(response.data)) {
// //   //     console.log('✅ Found: response.data structure')
// //   //     return {
// //   //       data: response.data,
// //   //       pagination: response.pagination || null,
// //   //       topData: response.topData || null
// //   //     }
// //   //   } else if (Array.isArray(response)) {
// //   //     console.log('✅ Found: array structure')
// //   //     return {
// //   //       data: response,
// //   //       pagination: null,
// //   //       topData: null
// //   //     }
// //   //   }

// //   //   console.error('❌ Unknown response structure')
// //   //   throw new Error('Cannot extract data from response')
// //   // }

// //   // // Get all taxi with pagination
// //   // async getTaxi(
// //   //   page: number = 0,
// //   //   limit: number = 10
// //   // ): Promise<any> {
// //   //   try {
// //   //     console.log('🚀 Service: Fetching taxi:', { page, limit });
// //   //     console.log('🚀 Service: Endpoint:', TAXI_ENDPOINTS.TAXI(page, limit));

// //   //     const response = await http.get(
// //   //       TAXI_ENDPOINTS.TAXI(page, limit)
// //   //     );

// //   //     // Return response.data which is the actual API response
// //   //     return response.data;
// //   //   } catch (error) {
// //   //     console.error('❌ Service error in getTaxi:', error);
// //   //     throw error;
// //   //   }
// //   // }

// //   // Get all taxi items
// //   // async getTaxiItems(
// //   //   page: number = 0,
// //   //   limit: number = 15
// //   // ): Promise<TaxiItem[]> {
// //   //   try {
// //   //     const response = await this.getTaxi(page, limit);
// //   //     const extracted = this.extractData(response);
// //   //     return extracted.data;
// //   //   } catch (error) {
// //   //     console.error('❌ Service error in getTaxiItems:', error);
// //   //     throw error;
// //   //   }
// //   // }

// //   // Get top/featured dormitories from topData
// //   // async getTopDormitories(): Promise<any[]> {
// //   //   try {
// //   //     const response = await this.getTaxi(0, 15);
// //   //     const extracted = this.extractData(response);
// //   //     return extracted.topData?.Dormitory || [];
// //   //   } catch (error) {
// //   //     console.error('❌ Service error in getTopDormitories:', error);
// //   //     throw error;
// //   //   }
// //   // }

// //   // Get houses from top data
// //   // async getTopHouses(): Promise<any[]> {
// //   //   try {
// //   //     const response = await this.getTaxi(0, 15);
// //   //     const extracted = this.extractData(response);
// //   //     return extracted.topData?.House || [];
// //   //   } catch (error) {
// //   //     console.error('❌ Service error in getTopHouses:', error);
// //   //     throw error;
// //   //   }
// //   // }

// //   // Get lands from top data
// //   // async getTopLands(): Promise<any[]> {
// //   //   try {
// //   //     const response = await this.getTaxi(0, 15);
// //   //     const extracted = this.extractData(response);
// //   //     return extracted.topData?.Land || [];
// //   //   } catch (error) {
// //   //     console.error('❌ Service error in getTopLands:', error);
// //   //     throw error;
// //   //   }
// //   // }

// //   // Get taxis from top data
// //   // async getTopTaxis(): Promise<TaxiItem[]> {
// //   //   try {
// //   //     const response = await this.getTaxi(0, 15);
// //   //     const extracted = this.extractData(response);
// //   //     return extracted.topData?.Taxi || [];
// //   //   } catch (error) {
// //   //     console.error('❌ Service error in getTopTaxis:', error);
// //   //     throw error;
// //   //   }
// //   // }

// //   // Get all top data at once
// //   // async getTopData(): Promise<TopDataCategory> {
// //   //   try {
// //   //     const response = await this.getTaxi(0, 15);
// //   //     const extracted = this.extractData(response);
// //   //     return extracted.topData || {
// //   //       Dormitory: [],
// //   //       House: [],
// //   //       Land: [],
// //   //       Taxi: []
// //   //     };
// //   //   } catch (error) {
// //   //     console.error('❌ Service error in getTopData:', error);
// //   //     throw error;
// //   //   }
// //   // }

// //   // Get taxi item by ID
// //   //   async getTaxiById(
// //   //     id: string,
// //   //     page: number = 0,
// //   //     limit: number = 100
// //   //   ): Promise<TaxiItem | null> {
// //   //     try {
// //   //       const response = await this.getTaxi(page, limit);
// //   //       const extracted = this.extractData(response);
// //   //       const item = extracted.data.find((item: TaxiItem) => item.id === id);
// //   //       return item || null;
// //   //     } catch (error) {
// //   //       console.error('❌ Service error in getTaxiById:', error);
// //   //       throw error;
// //   //     }
// //   //   }

// //   //   // Filter by name
// //   //   async filterByName(
// //   //     name: string,
// //   //     page: number = 0,
// //   //     limit: number = 15
// //   //   ): Promise<TaxiItem[]> {
// //   //     try {
// //   //       const response = await this.getTaxi(page, limit);
// //   //       const extracted = this.extractData(response);
// //   //       return extracted.data.filter((item: TaxiItem) =>
// //   //         item.name.toLowerCase().includes(name.toLowerCase())
// //   //       );
// //   //     } catch (error) {
// //   //       console.error('❌ Service error in filterByName:', error);
// //   //       throw error;
// //   //     }
// //   //   }

// //   //   // Filter by province
// //   //   async filterByProvince(
// //   //     province: string,
// //   //     page: number = 0,
// //   //     limit: number = 15
// //   //   ): Promise<TaxiItem[]> {
// //   //     try {
// //   //       const response = await this.getTaxi(page, limit);
// //   //       const extracted = this.extractData(response);
// //   //       return extracted.data.filter((item: TaxiItem) => item.province === province);
// //   //     } catch (error) {
// //   //       console.error('❌ Service error in filterByProvince:', error);
// //   //       throw error;
// //   //     }
// //   //   }

// //   //   // Filter by district
// //   //   async filterByDistrict(
// //   //     district: string,
// //   //     page: number = 0,
// //   //     limit: number = 15
// //   //   ): Promise<TaxiItem[]> {
// //   //     try {
// //   //       const response = await this.getTaxi(page, limit);
// //   //       const extracted = this.extractData(response);
// //   //       return extracted.data.filter((item: TaxiItem) => item.district === district);
// //   //     } catch (error) {
// //   //       console.error('❌ Service error in filterByDistrict:', error);
// //   //       throw error;
// //   //     }
// //   //   }

// //   //   // Filter by villages
// //   //   async filterByVillages(
// //   //     villages: string[],
// //   //     page: number = 0,
// //   //     limit: number = 15
// //   //   ): Promise<TaxiItem[]> {
// //   //     try {
// //   //       const response = await this.getTaxi(page, limit);
// //   //       const extracted = this.extractData(response);
// //   //       return extracted.data.filter((item: TaxiItem) =>
// //   //         item.villages.some((village: string) => villages.includes(village))
// //   //       );
// //   //     } catch (error) {
// //   //       console.error('❌ Service error in filterByVillages:', error);
// //   //       throw error;
// //   //     }
// //   //   }

// //   //   // Search taxi items (by name, detail, province, district, villages)
// //   //   async searchTaxis(
// //   //     searchTerm: string,
// //   //     page: number = 0,
// //   //     limit: number = 15
// //   //   ): Promise<TaxiItem[]> {
// //   //     try {
// //   //       const response = await this.getTaxi(page, limit);
// //   //       const extracted = this.extractData(response);
// //   //       const term = searchTerm.toLowerCase();
// //   //       return extracted.data.filter(
// //   //         (item: TaxiItem) =>
// //   //           item.name?.toLowerCase().includes(term) ||
// //   //           item.detail?.toLowerCase().includes(term) ||
// //   //           item.province.toLowerCase().includes(term) ||
// //   //           item.district.toLowerCase().includes(term) ||
// //   //           item.villages.some((v: string) => v.toLowerCase().includes(term))
// //   //       );
// //   //     } catch (error) {
// //   //       console.error('❌ Service error in searchTaxis:', error);
// //   //       throw error;
// //   //     }
// //   //   }

// //   //   // Get pagination info
// //   //   async getPagination(page: number = 0, limit: number = 15): Promise<Pagination | null> {
// //   //     try {
// //   //       const response = await this.getTaxi(page, limit);
// //   //       const extracted = this.extractData(response);
// //   //       return extracted.pagination;
// //   //     } catch (error) {
// //   //       console.error('❌ Service error in getPagination:', error);
// //   //       throw error;
// //   //     }
// //   //   }

// //   //   // Get image URL with proper base path
// //   //   getImageUrl(imagePath: string): string {
// //   //     if (imagePath.startsWith('http')) {
// //   //       return imagePath;
// //   //     }
// //   //     return `${process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:5151'}${imagePath}`;


// // // Export singleton instance
// // // export const taxiService = new TaxiService();

// // // // Export class for testing or custom instances
// // // export default TaxiService;
// import { http } from "~/services/core/http.service";
// import { TAXI_ENDPOINTS } from "~/services/endpoints/taxi.endpoint";
// import type {
//   TaxiItem,
//   TaxiApiResponse,
//   TaxiServiceResponse,
//   TaxiResponse,
// } from "~/services/types/taxi-type";

// class TaxiService {
//   async getAll(
//     page: number = 0,
//     limit: number = 10
//   ): Promise<TaxiServiceResponse> {
//     try {
//       const endpoint = TAXI_ENDPOINTS.TAXI(page, limit);
//       console.log('🔗 Service: Calling endpoint:', endpoint);
      
//       // ✅ FIXED: Added missing '<' bracket
//       const response = await http.get<
//         TaxiResponse | TaxiApiResponse | TaxiItem[]
//       >(endpoint);

//       console.log('📦 Service: Raw response:', response);
//       console.log('📦 Service: Response.data type:', typeof response.data);
//       console.log('📦 Service: Response.data:', response.data);

//       let actualData: TaxiResponse | null = null;
      
//       if (this.isTaxiResponse(response.data)) {
//         console.log('✅ Service: Detected TaxiResponse format (has rows)');
//         actualData = response.data;
//       } else if (this.isTaxiApiResponse(response.data)) {
//         console.log('✅ Service: Detected TaxiApiResponse format (has status and data)');
//         console.log('📦 Service: response.data.data:', response.data.data);
//         console.log('📦 Service: response.data.pagination:', response.data.pagination);
//         console.log('📦 Service: response.data.topData:', response.data.topData);
        
//         // ✅ FIXED: Transform your API response to match TaxiResponse interface
//         actualData = {
//           rows: response.data.data, // Array of taxi items
//           pagination: response.data.pagination || null,
//           topData: response.data.topData || null
//         };
        
//         console.log('✅ Service: Transformed actualData:', actualData);
//       } else if (Array.isArray(response.data)) {
//         console.log('✅ Service: Detected direct array format');
//         return {
//           items: response.data,
//           pagination: null,
//           topData: null,
//         };
//       } else {
//         console.error('❌ Service: Unknown response format');
//         console.error('❌ Response.data:', response.data);
//       }

//       if (!actualData) {
//         console.error('❌ Service: actualData is null');
//         return {
//           items: [],
//           pagination: null,
//           topData: null,
//         };
//       }

//       if (!actualData.rows) {
//         console.error('❌ Service: actualData.rows is missing');
//         console.error('❌ actualData keys:', Object.keys(actualData));
//         return {
//           items: [],
//           pagination: null,
//           topData: null,
//         };
//       }

//       if (!Array.isArray(actualData.rows)) {
//         console.error('❌ Service: actualData.rows is not an array');
//         return {
//           items: [],
//           pagination: null,
//           topData: null,
//         };
//       }

//       console.log('✅ Service: Returning', actualData.rows.length, 'items');
//       console.log('✅ Service: Has pagination:', !!actualData.pagination);
//       console.log('✅ Service: Has topData:', !!actualData.topData);
//       console.log('📦 Service: topData value:', actualData.topData);

//       const result = {
//         items: actualData.rows,
//         pagination: actualData.pagination || null,
//         topData: actualData.topData || null,
//       };

//       console.log('📤 Service: Final return value:', result);

//       return result;
//     } catch (error) {
//       console.error('❌ Taxi Service Error:', error);
//       throw error;
//     }
//   }

//   private isTaxiResponse(data: any): data is TaxiResponse {
//     return typeof data === "object" && data !== null && "rows" in data;
//   }

//   private isTaxiApiResponse(data: any): data is TaxiApiResponse {
//     return (
//       typeof data === "object" &&
//       data !== null &&
//       "data" in data &&
//       "pagination" in data &&
//       "topData" in data
//     );
//   }
// }

// export const taxiService = new TaxiService();
// export default taxiService;
import { http } from "~/services/core/http.service";
import { TAXI_ENDPOINTS } from "~/services/endpoints/taxi.endpoint";
import type {
  TaxiItem,
  TaxiApiResponse,
  TaxiServiceResponse,
  TaxiResponse,
} from "~/services/types/taxi-type";

class TaxiService {
  async getAll(
    page: number = 0,
    limit: number = 10
  ): Promise<TaxiServiceResponse> {
    try {
      const endpoint = TAXI_ENDPOINTS.TAXI(page, limit);
      console.log('🔗 Service: Calling endpoint:', endpoint);
      
      const response = await http.get<any>(endpoint);

      console.log('📦 Service: Full response:', response);
      
      // ✅ YOUR ACTUAL STRUCTURE:
      // response = {
      //   data: [...],        // ← items array (shortcut)
      //   status: 200,
      //   success: true,
      //   result: {           // ← THE REAL DATA IS HERE!
      //     data: [...],
      //     pagination: {...},
      //     topData: {...}    // ← WE NEED THIS!
      //   }
      // }
      
      // ✅ FIXED: Get from response.result (not response.data.result)
      const apiResult = response.result || response.data?.result || response.data;
      
      console.log('📦 Service: apiResult:', apiResult);
      console.log('📦 Service: apiResult.data:', apiResult?.data);
      console.log('📦 Service: apiResult.pagination:', apiResult?.pagination);
      console.log('📦 Service: apiResult.topData:', apiResult?.topData);

      if (!apiResult || typeof apiResult !== 'object') {
        console.error('❌ Invalid API response structure');
        return {
          items: [],
          pagination: null,
          topData: null,
        };
      }

      // Extract items from result.data
      const items = Array.isArray(apiResult.data) ? apiResult.data : [];
      console.log('✅ Service: Extracted', items.length, 'items');

      // Extract topData from result.topData
      const topData = apiResult.topData || null;
      console.log('✅ Service: Extracted topData:', topData);
      if (topData) {
        console.log('  📊 Dormitory:', topData.Dormitory?.length || 0);
        console.log('  📊 House:', topData.House?.length || 0);
        console.log('  📊 Land:', topData.Land?.length || 0);
        console.log('  📊 Taxi:', topData.Taxi?.length || 0);
      }

      // Extract pagination from result.pagination
      const pagination = apiResult.pagination || null;
      console.log('✅ Service: Extracted pagination:', pagination);

      const result = {
        items,
        pagination,
        topData,
      };

      console.log('📤 Service: Final return value:', result);
      console.log('📤 Service: topData in result:', result.topData);

      return result;
    } catch (error) {
      console.error('❌ Taxi Service Error:', error);
      throw error;
    }
  }
}

export const taxiService = new TaxiService();
export default taxiService;