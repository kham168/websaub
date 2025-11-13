// services/kho_Tsheb.service.ts
import { http } from '~/services/core/http.service';
import { KHO_TSHEB_ENDPOINTS } from '~/services/endpoints/kho_Tsheb.endpoint';
import type {
  KhoTshebResponse,
  KhoTshebItem,
  TopDataItem,
  TopData,
  Pagination,
} from '~/services/types/kho_Tsheb-type';

class KhoTshebService {
  // Helper function to extract data from response
  private extractData(response: any): { 
    data: KhoTshebItem[], 
    pagination: Pagination | null, 
    topData: TopData | null 
  } {
    console.log('🔍 Extracting data from response...');
    console.log('🔍 Response structure:', response);
    
    // Check different possible structures
    if (response.data && response.data.data) {
      console.log('✅ Found: response.data.data structure');
      return {
        data: this.transformKhoTshebItems(response.data.data),
        pagination: response.data.pagination || null,
        topData: response.data.topData || null
      };
    } else if (response.data) {
      console.log('✅ Found: response.data structure');
      return {
        data: this.transformKhoTshebItems(response.data),
        pagination: response.pagination || null,
        topData: response.topData || null
      };
    } else if (Array.isArray(response)) {
      console.log('✅ Found: array structure');
      return {
        data: this.transformKhoTshebItems(response),
        pagination: null,
        topData: null
      };
    }
    
    console.error('❌ Unknown response structure');
    throw new Error('Cannot extract data from response');
  }

  // Parse image string to array
  private parseImages(imageData: string | string[]): string[] {
    if (Array.isArray(imageData)) {
      return imageData;
    }
    if (typeof imageData === 'string' && imageData) {
      return imageData.split(',').map((img) => img.trim()).filter(Boolean);
    }
    return [];
  }

  // Transform single kho tsheb item
  private transformKhoTshebItem(item: any): KhoTshebItem {
    return {
      ...item,
      image: this.parseImages(item.image),
    };
  }

  // Transform array of kho tsheb items
  private transformKhoTshebItems(items: any[]): KhoTshebItem[] {
    return items.map((item) => this.transformKhoTshebItem(item));
  }

  // Get all kho tsheb with pagination
  async getKhoTsheb(
    page: number = 0,
    limit: number = 15
  ): Promise<any> {
    try {
      console.log('🚀 Service: Fetching kho tsheb:', { page, limit });
      console.log('🚀 Service: Endpoint:', KHO_TSHEB_ENDPOINTS.KHO_TSHEB(page, limit));
      
      const response = await http.get(
        KHO_TSHEB_ENDPOINTS.KHO_TSHEB(page, limit)
      );
      
      // Return response.data which is the actual API response
      return response.data;
    } catch (error) {
      console.error('❌ Service error in getKhoTsheb:', error);
      throw error;
    }
  }

  // Get all items with pagination (alias method)
  async getAllKhoTsheb(
    page: number = 0,
    limit: number = 15
  ): Promise<KhoTshebItem[]> {
    try {
      const response = await this.getKhoTsheb(page, limit);
      const extracted = this.extractData(response);
      return extracted.data;
    } catch (error) {
      console.error('❌ Service error in getAllKhoTsheb:', error);
      throw error;
    }
  }

  // Get item by ID
  async getKhoTshebById(id: string): Promise<KhoTshebItem | null> {
    try {
      console.log('🚀 Service: Fetching kho tsheb by ID:', id);
      
      // Fetch all items and filter by ID (or create a specific endpoint if available)
      const items = await this.getAllKhoTsheb(0, 100);
      return items.find(item => item.id === id) || null;
    } catch (error) {
      console.error('❌ Service error in getKhoTshebById:', error);
      throw error;
    }
  }

  // Get top/featured dormitories
  async getTopDormitories(): Promise<TopDataItem[]> {
    try {
      const response = await this.getKhoTsheb(0, 15);
      const extracted = this.extractData(response);
      return extracted.topData?.Dormitory || [];
    } catch (error) {
      console.error('❌ Service error in getTopDormitories:', error);
      throw error;
    }
  }

  // Get houses from top data
  async getTopHouses(): Promise<TopDataItem[]> {
    try {
      const response = await this.getKhoTsheb(0, 15);
      const extracted = this.extractData(response);
      return extracted.topData?.House || [];
    } catch (error) {
      console.error('❌ Service error in getTopHouses:', error);
      throw error;
    }
  }

  // Get lands from top data
  async getLands(): Promise<TopDataItem[]> {
    try {
      const response = await this.getKhoTsheb(0, 15);
      const extracted = this.extractData(response);
      return extracted.topData?.Land || [];
    } catch (error) {
      console.error('❌ Service error in getLands:', error);
      throw error;
    }
  }

  // Get taxis from top data
  async getTaxis(): Promise<TopDataItem[]> {
    try {
      const response = await this.getKhoTsheb(0, 15);
      const extracted = this.extractData(response);
      return extracted.topData?.Taxi || [];
    } catch (error) {
      console.error('❌ Service error in getTaxis:', error);
      throw error;
    }
  }

  // Get all top data at once
  async getTopData(): Promise<TopData> {
    try {
      const response = await this.getKhoTsheb(0, 15);
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

  // Search kho tsheb by name
  async searchByName(
    searchTerm: string,
    page: number = 0,
    limit: number = 15
  ): Promise<KhoTshebItem[]> {
    try {
      const response = await this.getKhoTsheb(page, limit);
      const extracted = this.extractData(response);
      const term = searchTerm.toLowerCase();
      
      return extracted.data.filter(
        (item: KhoTshebItem) =>
          item.name?.toLowerCase().includes(term) ||
          item.detail?.toLowerCase().includes(term)
      );
    } catch (error) {
      console.error('❌ Service error in searchByName:', error);
      throw error;
    }
  }

  // Filter by price range
  async filterByPriceRange(
    minPrice: number,
    maxPrice: number,
    priceType: 'Price1' | 'Price2' = 'Price1',
    page: number = 0,
    limit: number = 15
  ): Promise<KhoTshebItem[]> {
    try {
      const response = await this.getKhoTsheb(page, limit);
      const extracted = this.extractData(response);
      
      return extracted.data.filter((item: KhoTshebItem) => {
        const price = parseInt(item[priceType] || '0');
        return price >= minPrice && price <= maxPrice;
      });
    } catch (error) {
      console.error('❌ Service error in filterByPriceRange:', error);
      throw error;
    }
  }

  // Filter by donation status
  async filterByDonation(
    hasDonation: boolean,
    page: number = 0,
    limit: number = 15
  ): Promise<KhoTshebItem[]> {
    try {
      const response = await this.getKhoTsheb(page, limit);
      const extracted = this.extractData(response);
      
      return extracted.data.filter((item: KhoTshebItem) => {
        const isDonation = item.donation && item.donation !== '';
        return hasDonation ? isDonation : !isDonation;
      });
    } catch (error) {
      console.error('❌ Service error in filterByDonation:', error);
      throw error;
    }
  }

  // Get pagination info
  async getPagination(page: number = 0, limit: number = 15): Promise<Pagination | null> {
    try {
      const response = await this.getKhoTsheb(page, limit);
      const extracted = this.extractData(response);
      return extracted.pagination;
    } catch (error) {
      console.error('❌ Service error in getPagination:', error);
      throw error;
    }
  }

  // Get complete response (data + pagination + topData)
  async getCompleteResponse(
    page: number = 0,
    limit: number = 15
  ): Promise<KhoTshebResponse> {
    try {
      const response = await this.getKhoTsheb(page, limit);
      const extracted = this.extractData(response);
      
      return {
        status: true,
        message: 'Success',
        data: extracted.data,
        pagination: extracted.pagination || {
          page: 0,
          limit: 15,
          total: 0,
          totalPages: 0
        },
        topData: extracted.topData || {
          Dormitory: [],
          House: [],
          Land: [],
          Taxi: []
        }
      };
    } catch (error) {
      console.error('❌ Service error in getCompleteResponse:', error);
      
      return {
        status: false,
        message: error instanceof Error ? error.message : 'Unknown error',
        data: [],
        pagination: {
          page: 0,
          limit: 15,
          total: 0,
          totalPages: 0
        },
        topData: {
          Dormitory: [],
          House: [],
          Land: [],
          Taxi: []
        }
      };
    }
  }

  // Get statistics
  async getStatistics(): Promise<{
    total: number;
    withDonation: number;
    withoutDonation: number;
    averagePrice1: number;
    averagePrice2: number;
  }> {
    try {
      const items = await this.getAllKhoTsheb(0, 1000);
      
      const withDonation = items.filter(item => item.donation && item.donation !== '').length;
      const totalPrice1 = items.reduce((sum, item) => sum + parseInt(item.Price1 || '0'), 0);
      const totalPrice2 = items.reduce((sum, item) => sum + parseInt(item.Price2 || '0'), 0);
      
      return {
        total: items.length,
        withDonation,
        withoutDonation: items.length - withDonation,
        averagePrice1: items.length > 0 ? totalPrice1 / items.length : 0,
        averagePrice2: items.length > 0 ? totalPrice2 / items.length : 0,
      };
    } catch (error) {
      console.error('❌ Service error in getStatistics:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const khoTshebService = new KhoTshebService();

// Export class for testing or custom instances
export default KhoTshebService;