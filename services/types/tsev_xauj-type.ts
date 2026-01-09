export interface HouseItem {
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
  image: string[];
  cdate: string;
}

export interface TopDataItem {
  channel: String;
  id: string;
  name: string;
  price1?: string;
  price2?: string | null;
  price3?: string | null;
  area?: string | null;
  totalroom?: string | null;
  activeroom?: number | null;
  type?: string | null;
  tel: string;
  contactnumber?: string | null;
  locationvideo?: string | null;
  locationurl?: string | null;
  detail?: string | null;
  moredetail?: string | null;
  province: string;
  district: string;
  villages: string[];
  image: string[];
  path: string;
  cdate: string;
}

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TopData {
  Dormitory?: TopDataItem[];
  House?: TopDataItem[];
  Land?: TopDataItem[];
  Taxi?: TopDataItem[];
}

export interface HouseResponse {
  rows: HouseItem[];
  pagination: PaginationData;
  topData?: TopData;
  qr?: Result;
  channelimage?: Result;
}
export interface HouseApiResponse {
  status: boolean;
  message: string;
  data: HouseResponse;
  pagination: PaginationData;
  topData?: TopData | null;
  qr?: Result | null;
  channelimage?: Result | null;
}

export interface HouseServiceResponse {
  data: HouseItem[];
  pagination: PaginationData | null;
  topData: TopData | null | any;
  qr: Result | any | null;
  channelimage: Result | any | null;
}

export interface Result {
  qr: string;
  channelimage: string[];
  video1: string | null;
  video2: string | null;
  guidelinevideo: string | null;
}
