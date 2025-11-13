

// import { http } from './../core/http.service'
// import { BRAND_CREAM_ENDPOINTS } from '../endpoints/brand_cream.endpoint'
// import type { 
//   BrandCreamApiResponse, 
//   BrandCreamResponse, 
//   BrandCreamItem,
//   BrandCreamServiceResponse 
// } from '../types/brand_cream-type'

// export class BrandCreamService {
//   async getAll(page: number = 0, limit: number = 25): Promise<BrandCreamServiceResponse> {
//     try {
//       // 🔍 Log the endpoint being called
//       const endpoint = BRAND_CREAM_ENDPOINTS.BRAND_CREAM(page, limit)
//       console.log('🔍 Fetching from endpoint:', endpoint)

//       const response = await http.get<BrandCreamApiResponse | BrandCreamResponse>(endpoint)

//       console.log('✅ Raw API response:', response.data)

//       // ✅ Handle both response formats with proper type checking
//       let actualData: BrandCreamResponse | null = null

//       // Type guard to check if it's BrandCreamResponse (direct format)
//       if (this.isBrandCreamResponse(response.data)) {
//         actualData = response.data
//         console.log('📦 Direct format detected')
//       }
//       // Type guard to check if it's BrandCreamApiResponse (nested format)
//       else if (this.isBrandCreamApiResponse(response.data)) {
//         actualData = response.data.data
//         console.log('📦 Nested format detected')
//       }

//       if (!actualData || !actualData.rows || !Array.isArray(actualData.rows)) {
//         console.error('❌ Unexpected response shape:', response.data)
//         return { data: [], pagination: null, topData: null }
//       }

//       console.log(`✅ Successfully fetched ${actualData.rows.length} items`)

//       return {
//         data: actualData.rows,
//         pagination: actualData.pagination || null,
//         topData: actualData.topData || null
//       }
//     } catch (error) {
//       console.error('❌ Failed to fetch brand cream data:', error)
//       throw error
//     }
//   }

//   // Type guard for BrandCreamResponse
//   private isBrandCreamResponse(data: any): data is BrandCreamResponse {
//     return data && 
//            typeof data === 'object' && 
//            'rows' in data && 
//            Array.isArray(data.rows)
//   }

//   // Type guard for BrandCreamApiResponse
//   private isBrandCreamApiResponse(data: any): data is BrandCreamApiResponse {
//     return data && 
//            typeof data === 'object' && 
//            'status' in data && 
//            'data' in data &&
//            data.data &&
//            'rows' in data.data
//   }

//   async getByName(name: string): Promise<BrandCreamItem | null> {
//     const result = await this.getAll()
//     return result.data.find((item: BrandCreamItem) => item.creamname === name) || null
//   }

//   async getById(id: string): Promise<BrandCreamItem | null> {
//     const result = await this.getAll()
//     return result.data.find((item: BrandCreamItem) => item.id === id) || null
//   }
// }

// export const channelCreamService = new BrandCreamService()
// export default channelCreamService

import { http } from './../core/http.service'
import { BRAND_CREAM_ENDPOINTS } from '../endpoints/brand_cream.endpoint'
import type { 
  BrandCreamApiResponse, 
  BrandCreamResponse, 
  BrandCreamItem,
  BrandCreamServiceResponse 
} from '../types/brand_cream-type'

export class BrandCreamService {
  async getAll(page: number = 0, limit: number = 25): Promise<BrandCreamServiceResponse> {
    try {
      const endpoint = BRAND_CREAM_ENDPOINTS.BRAND_CREAM(page, limit)
      console.log('🔍 Fetching from endpoint:', endpoint)

      const response = await http.get<BrandCreamApiResponse | BrandCreamResponse | BrandCreamItem[]>(endpoint)
      console.log('✅ Raw API response:', response.data)

      let actualData: BrandCreamResponse | null = null

      // ✅ 1️⃣ Direct format: { rows: [...] }
      if (this.isBrandCreamResponse(response.data)) {
        actualData = response.data
        console.log('📦 Direct format detected')
      }
      // ✅ 2️⃣ Nested format: { status: true, data: { rows: [...] } }
      else if (this.isBrandCreamApiResponse(response.data)) {
        actualData = response.data.data
        console.log('📦 Nested format detected')
      }
      // ✅ 3️⃣ Plain array format: [ {...}, {...} ]
      else if (Array.isArray(response.data)) {
        console.log('📦 Plain array format detected')
        return {
          data: response.data,
          pagination: null,
          topData: null
        }
      }

      if (!actualData || !actualData.rows || !Array.isArray(actualData.rows)) {
        console.error('❌ Unexpected response shape:', response.data)
        return { data: [], pagination: null, topData: null }
      }

      console.log(`✅ Successfully fetched ${actualData.rows.length} items`)

      return {
        data: actualData.rows,
        pagination: actualData.pagination || null,
        topData: actualData.topData || null
      }
    } catch (error) {
      console.error('❌ Failed to fetch brand cream data:', error)
      throw error
    }
  }

  private isBrandCreamResponse(data: any): data is BrandCreamResponse {
    return data && typeof data === 'object' && 'rows' in data && Array.isArray(data.rows)
  }

  private isBrandCreamApiResponse(data: any): data is BrandCreamApiResponse {
    return data && typeof data === 'object' && 'status' in data && 'data' in data && data.data && 'rows' in data.data
  }

  async getByName(name: string): Promise<BrandCreamItem | null> {
    const result = await this.getAll()
    return result.data.find((item: BrandCreamItem) => item.creamname === name) || null
  }

  async getById(id: string): Promise<BrandCreamItem | null> {
    const result = await this.getAll()
    return result.data.find((item: BrandCreamItem) => item.id === id) || null
  }
}

export const channelCreamService = new BrandCreamService()
export default channelCreamService
