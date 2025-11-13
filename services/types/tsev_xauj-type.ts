// tsev_xauj-type.ts

export interface TsevXaujResponse {
    status: boolean;
    message: string;
    data: TsevXaujData;
  }
  
  export interface TsevXaujData {
    rows: HouseRow[];
    pagination: Pagination;
    topData: TopData;
  }
  
  export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
  
  // 🏠 Houses (main rows)
  export interface HouseRow {
    id: string;
    housename: string;
    price1: string;
    price2: string;
    price3: string;
    tel: string;
    contactnumber: string;
    locationvideo: string;
    moredetail: string;
    province: string;
    district: string;
    villages: string[];
    image: string; // raw string format from API
    images: string[]; // parsed image URLs
    cdate: string;
  }
  
  // 🏠 TopData section
  export interface TopData {
    Dormitory: DormitoryItem[];
    House: HouseItem[];
    Land: LandItem[];
    Taxi: TaxiItem[];
  }
  
  // 🏘️ Dormitory
  export interface DormitoryItem {
    id: string;
    name: string;
    price1: string;
    price2: string;
    price3: string;
    type: string;
    totalroom: string;
    activeroom: number;
    locationvideo: string;
    tel: string;
    contactnumber: string;
    moredetail: string;
    province: string;
    district: string;
    villages: string[];
    image: string[]; // array of URLs
    plan_on_next_month: string;
    path: string;
    cdate: string;
  }
  
  // 🏠 House (TopData)
  export interface HouseItem {
    id: string;
    name: string;
    price1: string;
    price2: string;
    price3: string;
    tel: string;
    contactnumber: string;
    locationvideo: string;
    moredetail: string;
    province: string;
    district: string;
    villages: string[];
    image: string[];
    path: string;
    cdate: string;
  }
  
  // 🌍 Land
  export interface LandItem {
    id: string;
    name: string;
    area: string;
    price: string;
    tel: string;
    contactnumber: string;
    locationurl: string;
    locationvideo: string;
    moredetail: string;
    province: string;
    district: string;
    villages: string[];
    image: string[];
    path: string;
    cdate: string;
  }
  
  // 🚕 Taxi
  export interface TaxiItem {
    id: string;
    name: string;
    Price1: string;
    Price2: string;
    tel: string;
    detail: string;
    province: string;
    district: string;
    villages: string[];
    image: string[];
    path: string;
    cdate: string;
  }
  