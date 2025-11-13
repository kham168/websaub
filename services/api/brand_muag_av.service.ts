// // import { http } from './../core/http.service';
// // import { BRAND_MUAG_AV_ENDPOINTS } from '../endpoints/brand_muag_av.endpoint';
// // import type { Brand_Muag_AV } from '../types/brand_muag_av-type';

// // export class Brand_Muag_AVService {
// //     async brand_muag_av() {
// //         return http.get<Brand_Muag_AV>(BRAND_MUAG_AV_ENDPOINTS.BRAND_MUAG_AV);
// //     }
// // }

// // export const ChannelMuagAvServices = new Brand_Muag_AVService()
// // export default ChannelMuagAvServices

// // import { http } from './../core/http.service';
// // import { BRAND_MUAG_AV_ENDPOINTS } from '../endpoints/brand_muag_av.endpoint';
// // import type { BrandMuagAvResponse, ChannelData } from '../types/brand_muag_av-type';

// // export class BrandMuagAvService {
// //     async getAll(page: number = 0, limit: number = 12): Promise<ChannelData[]> {
// //         try {
// //             const response = await http.get<BrandMuagAvResponse>(
// //                 BRAND_MUAG_AV_ENDPOINTS.BRAND_MUAG_AV(page, limit)
// //             );
// //             // console.log('Fetched brand muag av data:', response);
            
            
// //             // Ensure it's an array
// //             return response.data.lands || [];
// //             // return Array.isArray(response) ? response : [];
// //         } catch (error) {
// //             console.error('Failed to fetch brand muag av data:', error);
// //             throw error;
// //         }
// //     }

// //     async getBySlug(slug: string): Promise<ChannelData | null> {
// //         const channels = await this.getAll();
// //         return channels.find(item => item.path === slug) || null;
// //     }

// //     async getById(id: string): Promise<ChannelData | null> {
// //         const channels = await this.getAll();
// //         return channels.find(item => item.id === id) || null;
// //     }
// // }

// // export const channelMuagAvService = new BrandMuagAvService();
// // export default channelMuagAvService;
// // services/brand_muag_av.service.ts
// import { http } from '../core/http.service';
// import { BRAND_MUAG_AV_ENDPOINTS } from '../endpoints/brand_muag_av.endpoint';
// import type { BrandMuagAvResponse, LandData } from '../types/brand_muag_av-type';

// export class BrandMuagAvService {
  
//     async getAll(page: number = 0, limit: number = 12): Promise<LandData[]> {
//         try {
//             const response = await http.get<BrandMuagAvResponse>(
//                 BRAND_MUAG_AV_ENDPOINTS.BRAND_MUAG_AV(page, limit)
//             );

//             // Return the data array
//             return response.data.data || [];
           
//         } catch (error) {
//             console.error('Failed to fetch brand muag av data:', error);
//             throw error;
//         }
//     }

//     /**
//      * Get a land by its slug/path (if path exists)
//      */
//     async getBySlug(slug: string): Promise<LandData | null> {
//         const lands = await this.getAll();
//         return lands.find(item => item.path === slug) || null;
//     }

//     /**
//      * Get a land by its ID
//      */
//     async getById(id: string): Promise<LandData | null> {
//         const lands = await this.getAll();
//         return lands.find(item => item.id === id) || null;
//     }
// }

// // Singleton instance
// export const brandMuagAvService = new BrandMuagAvService();
// export default brandMuagAvService;
import { http } from '../core/http.service';
import { BRAND_MUAG_AV_ENDPOINTS } from '../endpoints/brand_muag_av.endpoint';
import type { BrandMuagAvResponse, LandData } from '../types/brand_muag_av-type';

export class BrandMuagAvService {
    /**
     * Fetch all lands with pagination
     * @param page Current page number (default 0)
     * @param limit Number of items per page (default 12)
     */
    async getAll(page: number = 0, limit: number = 12): Promise<LandData[]> {
        try {
            console.log('🚀 Fetching brand muag av:', { page, limit });
            console.log('🚀 Endpoint:', BRAND_MUAG_AV_ENDPOINTS.BRAND_MUAG_AV(page, limit));
            
            const response = await http.get<BrandMuagAvResponse>(
                BRAND_MUAG_AV_ENDPOINTS.BRAND_MUAG_AV(page, limit)
            );

            console.log('📦 Raw response:', response);
            console.log('📦 Response.data:', response.data);
            console.log('📦 Response.data.data:', response.data?.data);

            // Check different response structures
            if (response.data?.data && Array.isArray(response.data.data)) {
                console.log('✅ Found data array with length:', response.data.data.length);
                return response.data.data;
            } else if (response.data && Array.isArray(response.data)) {
                console.log('✅ Response.data is array with length:', response.data.length);
                return response.data;
            } else if (Array.isArray(response)) {
                console.log('✅ Response is array with length:', response.length);
                return response;
            }

            console.warn('⚠️ Unexpected response structure, returning empty array');
            return [];
        } catch (error) {
            console.error('❌ Failed to fetch brand muag av data:', error);
            throw error;
        }
    }

    /**
     * Get a land by its slug/path (if path exists)
     */
    async getBySlug(slug: string): Promise<LandData | null> {
        const lands = await this.getAll();
        return lands.find(item => item.path === slug) || null;
    }

    /**
     * Get a land by its ID
     */
    async getById(id: string): Promise<LandData | null> {
        const lands = await this.getAll();
        return lands.find(item => item.id === id) || null;
    }
}

// Singleton instance
export const brandMuagAvService = new BrandMuagAvService();
export default brandMuagAvService;