// services/api/taxi.service.ts
import { http } from '~/services/core/http.service';
import { TAXI_ENDPOINTS } from '~/services/endpoints/taxi.endpoint';
import type {
  TaxiItem,
  TaxiResponse,
  TopDataCategory,
  Pagination
} from '~/services/types/taxi-type';

class TaxiService {
  // Helper function to extract data from response
  private extractData(response: any): { data: TaxiItem[], pagination: Pagination | null, topData: TopDataCategory | null } {
    console.log('🔍 Extracting data from response...')
    console.log('🔍 Response structure:', response)
    
    // Check different possible structures
    if (response.data && Array.isArray(response.data)) {
      console.log('✅ Found: response.data structure')
      return {
        data: response.data,
        pagination: response.pagination || null,
        topData: response.topData || null
      }
    } else if (Array.isArray(response)) {
      console.log('✅ Found: array structure')
      return {
        data: response,
        pagination: null,
        topData: null
      }
    }
    
    console.error('❌ Unknown response structure')
    throw new Error('Cannot extract data from response')
  }

  // Get all taxi with pagination
  async getTaxi(
    page: number = 0,
    limit: number = 15
  ): Promise<any> {
    try {
      console.log('🚀 Service: Fetching taxi:', { page, limit });
      console.log('🚀 Service: Endpoint:', TAXI_ENDPOINTS.TAXI(page, limit));
      
      const response = await http.get(
        TAXI_ENDPOINTS.TAXI(page, limit)
      );
      
      // Return response.data which is the actual API response
      return response.data;
    } catch (error) {
      console.error('❌ Service error in getTaxi:', error);
      throw error;
    }
  }

  // Get all taxi items
  async getTaxiItems(
    page: number = 0,
    limit: number = 15
  ): Promise<TaxiItem[]> {
    try {
      const response = await this.getTaxi(page, limit);
      const extracted = this.extractData(response);
      return extracted.data;
    } catch (error) {
      console.error('❌ Service error in getTaxiItems:', error);
      throw error;
    }
  }

  // Get top/featured dormitories from topData
  async getTopDormitories(): Promise<any[]> {
    try {
      const response = await this.getTaxi(0, 15);
      const extracted = this.extractData(response);
      return extracted.topData?.Dormitory || [];
    } catch (error) {
      console.error('❌ Service error in getTopDormitories:', error);
      throw error;
    }
  }

  // Get houses from top data
  async getTopHouses(): Promise<any[]> {
    try {
      const response = await this.getTaxi(0, 15);
      const extracted = this.extractData(response);
      return extracted.topData?.House || [];
    } catch (error) {
      console.error('❌ Service error in getTopHouses:', error);
      throw error;
    }
  }

  // Get lands from top data
  async getTopLands(): Promise<any[]> {
    try {
      const response = await this.getTaxi(0, 15);
      const extracted = this.extractData(response);
      return extracted.topData?.Land || [];
    } catch (error) {
      console.error('❌ Service error in getTopLands:', error);
      throw error;
    }
  }

  // Get taxis from top data
  async getTopTaxis(): Promise<TaxiItem[]> {
    try {
      const response = await this.getTaxi(0, 15);
      const extracted = this.extractData(response);
      return extracted.topData?.Taxi || [];
    } catch (error) {
      console.error('❌ Service error in getTopTaxis:', error);
      throw error;
    }
  }

  // Get all top data at once
  async getTopData(): Promise<TopDataCategory> {
    try {
      const response = await this.getTaxi(0, 15);
      const extracted = this.extractData(response);
      return extracted.topData || {
        Dormitory: [],
        House: [],
        Land: [],
        Taxi: []
      };
    } catch (error) {
      console.error('❌ Service error in getTopData:', error);
      throw error;
    }
  }

  // Get taxi item by ID
  async getTaxiById(
    id: string,
    page: number = 0,
    limit: number = 100
  ): Promise<TaxiItem | null> {
    try {
      const response = await this.getTaxi(page, limit);
      const extracted = this.extractData(response);
      const item = extracted.data.find((item: TaxiItem) => item.id === id);
      return item || null;
    } catch (error) {
      console.error('❌ Service error in getTaxiById:', error);
      throw error;
    }
  }

  // Filter by name
  async filterByName(
    name: string,
    page: number = 0,
    limit: number = 15
  ): Promise<TaxiItem[]> {
    try {
      const response = await this.getTaxi(page, limit);
      const extracted = this.extractData(response);
      return extracted.data.filter((item: TaxiItem) => 
        item.name.toLowerCase().includes(name.toLowerCase())
      );
    } catch (error) {
      console.error('❌ Service error in filterByName:', error);
      throw error;
    }
  }

  // Filter by province
  async filterByProvince(
    province: string,
    page: number = 0,
    limit: number = 15
  ): Promise<TaxiItem[]> {
    try {
      const response = await this.getTaxi(page, limit);
      const extracted = this.extractData(response);
      return extracted.data.filter((item: TaxiItem) => item.province === province);
    } catch (error) {
      console.error('❌ Service error in filterByProvince:', error);
      throw error;
    }
  }

  // Filter by district
  async filterByDistrict(
    district: string,
    page: number = 0,
    limit: number = 15
  ): Promise<TaxiItem[]> {
    try {
      const response = await this.getTaxi(page, limit);
      const extracted = this.extractData(response);
      return extracted.data.filter((item: TaxiItem) => item.district === district);
    } catch (error) {
      console.error('❌ Service error in filterByDistrict:', error);
      throw error;
    }
  }

  // Filter by villages
  async filterByVillages(
    villages: string[],
    page: number = 0,
    limit: number = 15
  ): Promise<TaxiItem[]> {
    try {
      const response = await this.getTaxi(page, limit);
      const extracted = this.extractData(response);
      return extracted.data.filter((item: TaxiItem) =>
        item.villages.some((village: string) => villages.includes(village))
      );
    } catch (error) {
      console.error('❌ Service error in filterByVillages:', error);
      throw error;
    }
  }

  // Search taxi items (by name, detail, province, district, villages)
  async searchTaxis(
    searchTerm: string,
    page: number = 0,
    limit: number = 15
  ): Promise<TaxiItem[]> {
    try {
      const response = await this.getTaxi(page, limit);
      const extracted = this.extractData(response);
      const term = searchTerm.toLowerCase();
      return extracted.data.filter(
        (item: TaxiItem) =>
          item.name?.toLowerCase().includes(term) ||
          item.detail?.toLowerCase().includes(term) ||
          item.province.toLowerCase().includes(term) ||
          item.district.toLowerCase().includes(term) ||
          item.villages.some((v: string) => v.toLowerCase().includes(term))
      );
    } catch (error) {
      console.error('❌ Service error in searchTaxis:', error);
      throw error;
    }
  }

  // Get pagination info
  async getPagination(page: number = 0, limit: number = 15): Promise<Pagination | null> {
    try {
      const response = await this.getTaxi(page, limit);
      const extracted = this.extractData(response);
      return extracted.pagination;
    } catch (error) {
      console.error('❌ Service error in getPagination:', error);
      throw error;
    }
  }

  // Get image URL with proper base path
  getImageUrl(imagePath: string): string {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `${process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:5151'}${imagePath}`;
  }
}

// Export singleton instance
export const taxiService = new TaxiService();

// Export class for testing or custom instances
export default TaxiService;