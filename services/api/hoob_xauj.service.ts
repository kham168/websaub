// services/api/hoob_xauj.service.ts
import { http } from '~/services/core/http.service';
import { HOOB_XAUJ_ENDPOINTS } from '~/services/endpoints/hoob_xauj.endpoint';
import type {
  ApiResponse,
  Dormitory,
  House,
  Land,
  Taxi,
  DormitoryRow,
} from '~/services/types/hoob_xauj-type';

class HoobXaujService {
  // Helper function to extract data from response
  private extractData(response: any): { rows: DormitoryRow[], pagination: any, topData: any } {
    console.log('🔍 Extracting data from response...')
    console.log('🔍 Response structure:', response)
    
    // Check different possible structures
    if (response.data && response.data.rows) {
      console.log('✅ Found: response.data.rows structure')
      return {
        rows: response.data.rows,
        pagination: response.data.pagination || null,
        topData: response.data.topData || null
      }
    } else if (response.rows) {
      console.log('✅ Found: response.rows structure')
      return {
        rows: response.rows,
        pagination: response.pagination || null,
        topData: response.topData || null
      }
    } else if (Array.isArray(response)) {
      console.log('✅ Found: array structure')
      return {
        rows: response,
        pagination: null,
        topData: null
      }
    }
    
    console.error('❌ Unknown response structure')
    throw new Error('Cannot extract data from response')
  }

  // Get all hoob xauj (rental properties) with pagination
  async getHoobXauj(
    page: number = 0,
    limit: number = 15
  ): Promise<any> {
    try {
      console.log('🚀 Service: Fetching hoob xauj:', { page, limit });
      console.log('🚀 Service: Endpoint:', HOOB_XAUJ_ENDPOINTS.HOOB_XAUJ(page, limit));
      
      const response = await http.get(
        HOOB_XAUJ_ENDPOINTS.HOOB_XAUJ(page, limit)
      );
      
      // console.log('=== SERVICE RESPONSE DEBUG START ===')
      // console.log('📦 Raw axios response:', response);
      // console.log('📦 Response type:', typeof response);
      // console.log('📦 Response keys:', response ? Object.keys(response) : 'N/A');
      // console.log('📦 Response.data:', response.data);
      // console.log('📦 Response.data type:', typeof response.data);
      // console.log('📦 Response.data keys:', response.data ? Object.keys(response.data) : 'N/A');
      // console.log('=== SERVICE RESPONSE DEBUG END ===')
      
      // Return response.data which is the actual API response
      return response.data;
    } catch (error) {
      console.error('❌ Service error in getHoobXauj:', error);
      throw error;
    }
  }

  // Get dormitories only
  async getDormitories(
    page: number = 0,
    limit: number = 15
  ): Promise<DormitoryRow[]> {
    try {
      const response = await this.getHoobXauj(page, limit);
      const extracted = this.extractData(response);
      return extracted.rows;
    } catch (error) {
      console.error('❌ Service error in getDormitories:', error);
      throw error;
    }
  }

  // Get top/featured dormitories
  async getTopDormitories(): Promise<Dormitory[]> {
    try {
      const response = await this.getHoobXauj(0, 15);
      const extracted = this.extractData(response);
      return extracted.topData?.Dormitory || [];
    } catch (error) {
      console.error('❌ Service error in getTopDormitories:', error);
      throw error;
    }
  }

  // Get houses from top data
  async getHouses(): Promise<House[]> {
    try {
      const response = await this.getHoobXauj(0, 15);
      const extracted = this.extractData(response);
      return extracted.topData?.House || [];
    } catch (error) {
      console.error('❌ Service error in getHouses:', error);
      throw error;
    }
  }

  // Get lands from top data
  async getLands(): Promise<Land[]> {
    try {
      const response = await this.getHoobXauj(0, 15);
      const extracted = this.extractData(response);
      return extracted.topData?.Land || [];
    } catch (error) {
      console.error('❌ Service error in getLands:', error);
      throw error;
    }
  }

  // Get taxis from top data
  async getTaxis(): Promise<Taxi[]> {
    try {
      const response = await this.getHoobXauj(0, 15);
      const extracted = this.extractData(response);
      return extracted.topData?.Taxi || [];
    } catch (error) {
      console.error('❌ Service error in getTaxis:', error);
      throw error;
    }
  }

  // Get all top data at once
  async getTopData(): Promise<{
    Dormitory: Dormitory[];
    House: House[];
    Land: Land[];
    Taxi: Taxi[];
  }> {
    try {
      const response = await this.getHoobXauj(0, 15);
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

  // Get property by ID (search through all data)
  async getPropertyById(
    id: string,
    page: number = 0,
    limit: number = 100
  ): Promise<DormitoryRow | null> {
    try {
      const response = await this.getHoobXauj(page, limit);
      const extracted = this.extractData(response);
      const property = extracted.rows.find((item: DormitoryRow) => item.id === id);
      return property || null;
    } catch (error) {
      console.error('❌ Service error in getPropertyById:', error);
      throw error;
    }
  }

  // Filter by province
  async filterByProvince(
    province: string,
    page: number = 0,
    limit: number = 15
  ): Promise<DormitoryRow[]> {
    try {
      const response = await this.getHoobXauj(page, limit);
      const extracted = this.extractData(response);
      return extracted.rows.filter((item: DormitoryRow) => item.province === province);
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
  ): Promise<DormitoryRow[]> {
    try {
      const response = await this.getHoobXauj(page, limit);
      const extracted = this.extractData(response);
      return extracted.rows.filter((item: DormitoryRow) => item.district === district);
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
  ): Promise<DormitoryRow[]> {
    try {
      const response = await this.getHoobXauj(page, limit);
      const extracted = this.extractData(response);
      return extracted.rows.filter((item: DormitoryRow) =>
        item.villages.some((village: string) => villages.includes(village))
      );
    } catch (error) {
      console.error('❌ Service error in filterByVillages:', error);
      throw error;
    }
  }

  // Filter by price range (price1)
  async filterByPriceRange(
    minPrice: number,
    maxPrice: number,
    page: number = 0,
    limit: number = 15
  ): Promise<DormitoryRow[]> {
    try {
      const response = await this.getHoobXauj(page, limit);
      const extracted = this.extractData(response);
      return extracted.rows.filter((item: DormitoryRow) => {
        const price = parseInt(item.price1);
        return price >= minPrice && price <= maxPrice;
      });
    } catch (error) {
      console.error('❌ Service error in filterByPriceRange:', error);
      throw error;
    }
  }

  // Filter by type
  async filterByType(
    type: string,
    page: number = 0,
    limit: number = 15
  ): Promise<DormitoryRow[]> {
    try {
      const response = await this.getHoobXauj(page, limit);
      const extracted = this.extractData(response);
      return extracted.rows.filter((item: DormitoryRow) => item.type === type);
    } catch (error) {
      console.error('❌ Service error in filterByType:', error);
      throw error;
    }
  }

  // Get available rooms (activeroom > 0)
  async getAvailableProperties(
    page: number = 0,
    limit: number = 15
  ): Promise<DormitoryRow[]> {
    try {
      const response = await this.getHoobXauj(page, limit);
      const extracted = this.extractData(response);
      return extracted.rows.filter((item: DormitoryRow) => item.activeroom > 0);
    } catch (error) {
      console.error('❌ Service error in getAvailableProperties:', error);
      throw error;
    }
  }

  // Search properties (by name, detail, location)
  async searchProperties(
    searchTerm: string,
    page: number = 0,
    limit: number = 15
  ): Promise<DormitoryRow[]> {
    try {
      const response = await this.getHoobXauj(page, limit);
      const extracted = this.extractData(response);
      const term = searchTerm.toLowerCase();
      return extracted.rows.filter(
        (item: DormitoryRow) =>
          item.dormantalname?.toLowerCase().includes(term) ||
          item.name?.toLowerCase().includes(term) ||
          item.moredetail?.toLowerCase().includes(term) ||
          item.province.toLowerCase().includes(term) ||
          item.district.toLowerCase().includes(term) ||
          item.villages.some((v: string) => v.toLowerCase().includes(term))
      );
    } catch (error) {
      console.error('❌ Service error in searchProperties:', error);
      throw error;
    }
  }

  // Get pagination info
  async getPagination(page: number = 0, limit: number = 15) {
    try {
      const response = await this.getHoobXauj(page, limit);
      const extracted = this.extractData(response);
      return extracted.pagination;
    } catch (error) {
      console.error('❌ Service error in getPagination:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const hoobXaujService = new HoobXaujService();

// Export class for testing or custom instances
export default HoobXaujService;