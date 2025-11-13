// services/api/muag_tshuaj.service.ts
import { http } from '~/services/core/http.service';
import { MUAG_TSHUAJ_ENDPOINTS } from '~/services/endpoints/muag_Tshuaj.endpoint';
import type {
  MuagTshuajItem,
  MuagTshuajResponse,
  TopDataCategory,
  Pagination
} from '~/services/types/muag_Tshuaj-type';

class MuagTshuajService {
  // Helper function to extract data from response
  private extractData(response: any): { data: MuagTshuajItem[], pagination: Pagination | null, topData: TopDataCategory | null } {
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

  // Get all muag tshuaj (medicine items) with pagination
  async getMuagTshuaj(
    page: number = 0,
    limit: number = 15
  ): Promise<any> {
    try {
      console.log('🚀 Service: Fetching muag tshuaj:', { page, limit });
      console.log('🚀 Service: Endpoint:', MUAG_TSHUAJ_ENDPOINTS.Muag_Tshuaj(page, limit));
      
      const response = await http.get(
        MUAG_TSHUAJ_ENDPOINTS.Muag_Tshuaj(page, limit)
      );
      
      // Return response.data which is the actual API response
      return response.data;
    } catch (error) {
      console.error('❌ Service error in getMuagTshuaj:', error);
      throw error;
    }
  }

  // Get all medicine items
  async getMedicineItems(
    page: number = 0,
    limit: number = 15
  ): Promise<MuagTshuajItem[]> {
    try {
      const response = await this.getMuagTshuaj(page, limit);
      const extracted = this.extractData(response);
      return extracted.data;
    } catch (error) {
      console.error('❌ Service error in getMedicineItems:', error);
      throw error;
    }
  }

  // Get top/featured dormitories from topData
  async getTopDormitories(): Promise<MuagTshuajItem[]> {
    try {
      const response = await this.getMuagTshuaj(0, 15);
      const extracted = this.extractData(response);
      return extracted.topData?.Dormitory || [];
    } catch (error) {
      console.error('❌ Service error in getTopDormitories:', error);
      throw error;
    }
  }

  // Get houses from top data
  async getTopHouses(): Promise<MuagTshuajItem[]> {
    try {
      const response = await this.getMuagTshuaj(0, 15);
      const extracted = this.extractData(response);
      return extracted.topData?.House || [];
    } catch (error) {
      console.error('❌ Service error in getTopHouses:', error);
      throw error;
    }
  }

  // Get lands from top data
  async getTopLands(): Promise<MuagTshuajItem[]> {
    try {
      const response = await this.getMuagTshuaj(0, 15);
      const extracted = this.extractData(response);
      return extracted.topData?.Land || [];
    } catch (error) {
      console.error('❌ Service error in getTopLands:', error);
      throw error;
    }
  }

  // Get taxis from top data
  async getTopTaxis(): Promise<MuagTshuajItem[]> {
    try {
      const response = await this.getMuagTshuaj(0, 15);
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
      const response = await this.getMuagTshuaj(0, 15);
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

  // Get medicine item by ID
  async getMedicineById(
    id: string,
    page: number = 0,
    limit: number = 100
  ): Promise<MuagTshuajItem | null> {
    try {
      const response = await this.getMuagTshuaj(page, limit);
      const extracted = this.extractData(response);
      const item = extracted.data.find((item: MuagTshuajItem) => item.id === id);
      return item || null;
    } catch (error) {
      console.error('❌ Service error in getMedicineById:', error);
      throw error;
    }
  }

  // Filter by name
  async filterByName(
    name: string,
    page: number = 0,
    limit: number = 15
  ): Promise<MuagTshuajItem[]> {
    try {
      const response = await this.getMuagTshuaj(page, limit);
      const extracted = this.extractData(response);
      return extracted.data.filter((item: MuagTshuajItem) => 
        item.name.toLowerCase().includes(name.toLowerCase())
      );
    } catch (error) {
      console.error('❌ Service error in filterByName:', error);
      throw error;
    }
  }

  // Filter by price range (Price1)
  async filterByPriceRange(
    minPrice: number,
    maxPrice: number,
    page: number = 0,
    limit: number = 15
  ): Promise<MuagTshuajItem[]> {
    try {
      const response = await this.getMuagTshuaj(page, limit);
      const extracted = this.extractData(response);
      return extracted.data.filter((item: MuagTshuajItem) => {
        const price = parseInt(item.Price1);
        return price >= minPrice && price <= maxPrice;
      });
    } catch (error) {
      console.error('❌ Service error in filterByPriceRange:', error);
      throw error;
    }
  }

  // Search medicine items (by name, detail)
  async searchMedicines(
    searchTerm: string,
    page: number = 0,
    limit: number = 15
  ): Promise<MuagTshuajItem[]> {
    try {
      const response = await this.getMuagTshuaj(page, limit);
      const extracted = this.extractData(response);
      const term = searchTerm.toLowerCase();
      return extracted.data.filter(
        (item: MuagTshuajItem) =>
          item.name?.toLowerCase().includes(term) ||
          item.detail?.toLowerCase().includes(term)
      );
    } catch (error) {
      console.error('❌ Service error in searchMedicines:', error);
      throw error;
    }
  }

  // Get pagination info
  async getPagination(page: number = 0, limit: number = 15): Promise<Pagination | null> {
    try {
      const response = await this.getMuagTshuaj(page, limit);
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
export const muagTshuajService = new MuagTshuajService();

// Export class for testing or custom instances
export default MuagTshuajService;