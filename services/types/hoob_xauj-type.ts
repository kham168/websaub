

export interface HoobXaujItem {
  id: string
  price1: string
  price2: string | null
  price3: string | null
  tel: string
  detail: string
  donation: string | null
  image: string[]
  path?: string
}

export interface TopDataItem {
  channelid: String;
  id: string;
  name: string;
  price1: string;
  price2: string | null
  price3: string | null
  tel: string;
  detail: string;
  donation: string | null
  image: string[];
  path: string;
}

export interface PaginationData {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface TopData {
  Dormitory?: TopDataItem[]
  House?: TopDataItem[]
  Land?: TopDataItem[]
  Taxi?: TopDataItem[]
}

// Make topData optional to avoid TS errors when missing
export interface HoobXaujResponse {
  rows: HoobXaujItem[]
  pagination: PaginationData
  topData?: TopData 
}

export interface HoobXaujApiResponse {
  status: boolean
  message: string
  data: HoobXaujResponse
  topData: TopData | null 
}
 export interface HoobXaujServiceResponse {
  data: HoobXaujItem[];
  pagination: PaginationData | null;
  topData?: TopData | null | any;
}