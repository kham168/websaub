
  
 // Main item list
export interface KhoTshebItem {
  id: string
  type: string
  itemname: string
  price1: string
  price2: string
  tel: string
  detail: string
  locationgps: string | null
  donation: string
  image: string[]
}

// Top data items
export interface TopDataItem {
  channelid: String;
  id: string
  name: string
  price1: string
  price2: string | null
  price3?: string | null
  tel: string
  detail: string
  donation: string | null
  image: string[]
  path: string
}

// Pagination
export interface PaginationData {
  page: number
  limit: number
  total: number
  totalPages: number
}

// TopData groups adapted to your API
export interface TopData {
  Dormitory?: TopDataItem[]
  House?: TopDataItem[]
  Land?: TopDataItem[]
  Taxi?: TopDataItem[]
}
export interface KhoTshebResponse {
  rows: KhoTshebItem[]
  pagination: PaginationData
  topData?: TopData
}
// API response
export interface KhoTshebApiResponse {
  status: boolean
  message: string
  data: KhoTshebResponse
  // pagination: PaginationData
  topData?: TopData | null
}

// Service return type
export interface KhoTshebServiceResponse {
  data: KhoTshebItem[]
  pagination: PaginationData | null
  topData:TopData | null | any
}
