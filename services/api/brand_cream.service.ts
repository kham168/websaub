
import { http } from './../core/http.service'
import { BRAND_CREAM_ENDPOINTS } from '../endpoints/brand_cream.endpoint'
import type { 
  BrandCreamApiResponse, 
  BrandCreamResponse, 
  BrandCreamItem,
  BrandCreamServiceResponse 
} from '../types/brand_cream-type'

export class BrandCreamService {
  async getAll(page: number = 0, limit: number = 10): Promise<BrandCreamServiceResponse> {
    try {
      const endpoint = BRAND_CREAM_ENDPOINTS.BRAND_CREAM(page, limit)
      console.log('🔍 Fetching from endpoint:', endpoint)

      const response = await http.get<BrandCreamApiResponse | BrandCreamResponse | BrandCreamItem[]>(endpoint)
      console.log('✅ Raw API response:', response)

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
          topData: response.result,
          // qrimage: response.qrimage
          
          
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
        topData: actualData.topData || null,
        // qrimage: response.qrimage
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
