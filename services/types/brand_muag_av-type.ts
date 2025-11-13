// export interface Brand_Muag_AV {
//   status: boolean; // true if API call successful
//   message: string;
//   data?: ChannelData[];
// }

// // brand_muag_av-type.ts
// export interface ChannelData {
//   id: string;
//   channel: string;
//   detail: string;
//   ownername: string;
//   peopleintorm: string;
//   tel: string;
//   email: string | null;
//   status: string;
//   path: string;
//   pathproductdetail: string[];
//   image: string[];
//   images: [];
//   video1: string | null;
//   video2: string | null;
//   guidelinevideo: string | null;
//   peoplecarimagepath: string | null;
//   cdate: string;
// }

// // The API returns an array directly, not wrapped
// export interface BrandMuagAvResponse {
//   lands: ChannelData[]
//   "pagination": {
//             "page": number|0,
//             "limit": number|12,
//             "total": number|3,
//             "totalPages": number|1
//         }
// };
// brand-muag-av-type.ts

export interface BrandMuagAvResponse {
  status: boolean;
  message: string;
  data: LandData[];
  pagination: Pagination;
  topData: TopData;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// ======================
// 🔹 DATA (main list)
// ======================
export interface LandData {
  id: string;
  productname: string;
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
  cdate: string;
  path?: string;
}

// ======================
// 🔹 TOP DATA
// ======================
export interface TopData {
  Dormitory: DormitoryItem[];
  House: HouseItem[];
  Land: LandItem[];
  Taxi: TaxiItem[];
}

// ===== Dormitory =====
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
  image: string[];
  plan_on_next_month: string;
  path: string;
  cdate: string;
}

// ===== House =====
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

// ===== Land =====
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

// ===== Taxi =====
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
