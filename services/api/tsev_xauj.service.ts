// services/tsev_xauj.service.ts
import { http } from '~/services/core/http.service';
import { TSEV_XAUJ_ENDPOINTS } from '~/services/endpoints/tsev_xauj.endpoint';
import type {
  TsevXaujResponse,
  HouseRow,
  DormitoryItem,
  HouseItem,
  LandItem,
  TaxiItem,
} from '~/services/types/tsev_xauj-type';

class TsevXaujService {
  // Helper function to extract data from response
  private extractData(response: any): { 
    rows: HouseRow[], 
    pagination: any, 
    topData: any 
  } {
    console.log('🔍 Extracting data from response...');
    console.log('🔍 Response structure:', response);
    
    // Check different possible structures
    if (response.data && response.data.rows) {
      console.log('✅ Found: response.data.rows structure');
      return {
        rows: this.transformHouseRows(response.data.rows),
        pagination: response.data.pagination || null,
        topData: response.data.topData || null
      };
    } else if (response.rows) {
      console.log('✅ Found: response.rows structure');
      return {
        rows: this.transformHouseRows(response.rows),
        pagination: response.pagination || null,
        topData: response.topData || null
      };
    } else if (Array.isArray(response)) {
      console.log('✅ Found: array structure');
      return {
        rows: this.transformHouseRows(response),
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

  // Parse villages string to array
  private parseVillages(villagesData: string | string[]): string[] {
    if (Array.isArray(villagesData)) {
      return villagesData;
    }
    if (typeof villagesData === 'string' && villagesData) {
      return villagesData.split(',').map((v) => v.trim()).filter(Boolean);
    }
    return [];
  }

  // Transform single house row
  private transformHouseRow(house: any): HouseRow {
    return {
      ...house,
      images: this.parseImages(house.image),
      villages: this.parseVillages(house.villages),
    };
  }

  // Transform array of house rows
  private transformHouseRows(houses: any[]): HouseRow[] {
    return houses.map((house) => this.transformHouseRow(house));
  }

  // Get all tsev xauj (houses for rent) with pagination
  async getTsevXauj(
    page: number = 0,
    limit: number = 15
  ): Promise<any> {
    try {
      console.log('🚀 Service: Fetching tsev xauj:', { page, limit });
      console.log('🚀 Service: Endpoint:', TSEV_XAUJ_ENDPOINTS.TSEV_XAUJ(page, limit));
      
      const response = await http.get(
        TSEV_XAUJ_ENDPOINTS.TSEV_XAUJ(page, limit)
      );
      
      // Return response.data which is the actual API response
      return response.data;
    } catch (error) {
      console.error('❌ Service error in getTsevXauj:', error);
      throw error;
    }
  }

  // Get all houses with pagination
  async getHouses(
    page: number = 0,
    limit: number = 15
  ): Promise<HouseRow[]> {
    try {
      const response = await this.getTsevXauj(page, limit);
      const extracted = this.extractData(response);
      return extracted.rows;
    } catch (error) {
      console.error('❌ Service error in getHouses:', error);
      throw error;
    }
  }

  // Get house by ID
//   async getHouseById(id: string): Promise<HouseRow | null> {
//     try {
//       console.log('🚀 Service: Fetching house by ID:', id);
      
//       const response = await http.get(TSEV_XAUJ_ENDPOINTS.HOUSE_BY_ID(id));
      
//       if (response.data?.data) {
//         return this.transformHouseRow(response.data.data);
//       } else if (response.data) {
//         return this.transformHouseRow(response.data);
//       }
      
//       return null;
//     } catch (error) {
//       console.error('❌ Service error in getHouseById:', error);
//       throw error;
//     }
//   }

  // Get top/featured dormitories
  async getTopDormitories(): Promise<DormitoryItem[]> {
    try {
      const response = await this.getTsevXauj(0, 15);
      const extracted = this.extractData(response);
      return extracted.topData?.Dormitory || [];
    } catch (error) {
      console.error('❌ Service error in getTopDormitories:', error);
      throw error;
    }
  }

  // Get houses from top data
  async getTopHouses(): Promise<HouseItem[]> {
    try {
      const response = await this.getTsevXauj(0, 15);
      const extracted = this.extractData(response);
      return extracted.topData?.House || [];
    } catch (error) {
      console.error('❌ Service error in getTopHouses:', error);
      throw error;
    }
  }

  // Get lands from top data
  async getLands(): Promise<LandItem[]> {
    try {
      const response = await this.getTsevXauj(0, 15);
      const extracted = this.extractData(response);
      return extracted.topData?.Land || [];
    } catch (error) {
      console.error('❌ Service error in getLands:', error);
      throw error;
    }
  }

  // Get taxis from top data
  async getTaxis(): Promise<TaxiItem[]> {
    try {
      const response = await this.getTsevXauj(0, 15);
      const extracted = this.extractData(response);
      return extracted.topData?.Taxi || [];
    } catch (error) {
      console.error('❌ Service error in getTaxis:', error);
      throw error;
    }
  }

  // Get all top data at once
  async getTopData(): Promise<{
    Dormitory: DormitoryItem[];
    House: HouseItem[];
    Land: LandItem[];
    Taxi: TaxiItem[];
  }> {
    try {
      const response = await this.getTsevXauj(0, 15);
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

  // Filter by province
  async filterByProvince(
    province: string,
    page: number = 0,
    limit: number = 15
  ): Promise<HouseRow[]> {
    try {
      const response = await this.getTsevXauj(page, limit);
      const extracted = this.extractData(response);
      return extracted.rows.filter((item: HouseRow) => item.province === province);
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
  ): Promise<HouseRow[]> {
    try {
      const response = await this.getTsevXauj(page, limit);
      const extracted = this.extractData(response);
      return extracted.rows.filter((item: HouseRow) => item.district === district);
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
  ): Promise<HouseRow[]> {
    try {
      const response = await this.getTsevXauj(page, limit);
      const extracted = this.extractData(response);
      return extracted.rows.filter((item: HouseRow) =>
        item.villages.some((village: string) => villages.includes(village))
      );
    } catch (error) {
      console.error('❌ Service error in filterByVillages:', error);
      throw error;
    }
  }

  // Filter by price range
  async filterByPriceRange(
    minPrice: number,
    maxPrice: number,
    priceType: 'price1' | 'price2' | 'price3' = 'price1',
    page: number = 0,
    limit: number = 15
  ): Promise<HouseRow[]> {
    try {
      const response = await this.getTsevXauj(page, limit);
      const extracted = this.extractData(response);
      return extracted.rows.filter((item: HouseRow) => {
        const price = parseInt(item[priceType] || '0');
        return price >= minPrice && price <= maxPrice;
      });
    } catch (error) {
      console.error('❌ Service error in filterByPriceRange:', error);
      throw error;
    }
  }

  // Search properties (by housename, moredetail, location)
  async searchProperties(
    searchTerm: string,
    page: number = 0,
    limit: number = 15
  ): Promise<HouseRow[]> {
    try {
      const response = await this.getTsevXauj(page, limit);
      const extracted = this.extractData(response);
      const term = searchTerm.toLowerCase();
      return extracted.rows.filter(
        (item: HouseRow) =>
          item.housename?.toLowerCase().includes(term) ||
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
      const response = await this.getTsevXauj(page, limit);
      const extracted = this.extractData(response);
      return extracted.pagination;
    } catch (error) {
      console.error('❌ Service error in getPagination:', error);
      throw error;
    }
  }

  // Get provinces list (extract unique provinces from data)
  async getProvinces(
    page: number = 0,
    limit: number = 100
  ): Promise<string[]> {
    try {
      const response = await this.getTsevXauj(page, limit);
      const extracted = this.extractData(response);
      const provinces = new Set<string>();
      
      extracted.rows.forEach((item: HouseRow) => {
        if (item.province) provinces.add(item.province);
      });
      
      return Array.from(provinces).sort();
    } catch (error) {
      console.error('❌ Service error in getProvinces:', error);
      throw error;
    }
  }

  // Get districts by province
  async getDistricts(
    province: string,
    page: number = 0,
    limit: number = 100
  ): Promise<string[]> {
    try {
      const response = await this.getTsevXauj(page, limit);
      const extracted = this.extractData(response);
      const districts = new Set<string>();
      
      extracted.rows
        .filter((item: HouseRow) => item.province === province)
        .forEach((item: HouseRow) => {
          if (item.district) districts.add(item.district);
        });
      
      return Array.from(districts).sort();
    } catch (error) {
      console.error('❌ Service error in getDistricts:', error);
      throw error;
    }
  }

  // Create new house (if API supports POST)
//   async createHouse(data: Partial<HouseRow>): Promise<HouseRow> {
//     try {
//       console.log('🚀 Service: Creating house:', data);
      
//       const response = await http.post(TSEV_XAUJ_ENDPOINTS.CREATE_HOUSE, data);
      
//       if (response.data?.data) {
//         return this.transformHouseRow(response.data.data);
//       } else if (response.data) {
//         return this.transformHouseRow(response.data);
//       }
      
//       throw new Error('Failed to create house');
//     } catch (error) {
//       console.error('❌ Service error in createHouse:', error);
//       throw error;
//     }
//   }

  // Update house (if API supports PUT)
//   async updateHouse(id: string, data: Partial<HouseRow>): Promise<HouseRow> {
//     try {
//       console.log('🚀 Service: Updating house:', id, data);
      
//       const response = await http.put(TSEV_XAUJ_ENDPOINTS.UPDATE_HOUSE(id), data);
      
//       if (response.data?.data) {
//         return this.transformHouseRow(response.data.data);
//       } else if (response.data) {
//         return this.transformHouseRow(response.data);
//       }
      
//       throw new Error('Failed to update house');
//     } catch (error) {
//       console.error('❌ Service error in updateHouse:', error);
//       throw error;
//     }
//   }

  // Delete house (if API supports DELETE)
//   async deleteHouse(id: string): Promise<boolean> {
//     try {
//       console.log('🚀 Service: Deleting house:', id);
      
//       const response = await http.delete(TSEV_XAUJ_ENDPOINTS.DELETE_HOUSE(id));
      
//       return response.data?.status === true;
//     } catch (error) {
//       console.error('❌ Service error in deleteHouse:', error);
//       throw error;
//     }
//   }

  // Upload images (if API supports multipart/form-data)
//   async uploadImages(files: File[]): Promise<string[]> {
//     try {
//       console.log('🚀 Service: Uploading images:', files.length);
      
//       const formData = new FormData();
//       files.forEach((file) => {
//         formData.append('images', file);
//       });

//       const response = await http.post(
//         TSEV_XAUJ_ENDPOINTS.UPLOAD_IMAGES,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
      
//       return response.data?.data || response.data || [];
//     } catch (error) {
//       console.error('❌ Service error in uploadImages:', error);
//       throw error;
//     }
//   }
}

// Export singleton instance
export const tsevXaujService = new TsevXaujService();

// Export class for testing or custom instances
export default TsevXaujService;