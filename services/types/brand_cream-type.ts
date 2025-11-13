
export interface BrandCreamItem {
  id: string
  creamname: string
  Price1: string
  Price2: string
  Price3: string
  tel: string
  detail: string
  donation: string
  image: string[]
}

export interface TopDataItem {
  id: string
  name: string
  Price1: string
  Price2: string | null
  Price3: string | null
  tel: string
  detail: string
  donation: string | null
  image: string[]
  path: string
}

export interface PaginationData {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface TopData {
  Cream: TopDataItem[]
  KhoomKhoTsheb: TopDataItem[]
  Muas: TopDataItem[]
  Tshuaj: TopDataItem[]
}

// Direct data structure (what axios returns after unwrapping)
export interface BrandCreamResponse {
  rows: BrandCreamItem[]
  pagination: PaginationData
  topData: TopData
}

// API Response when nested (with status/message wrapper)
export interface BrandCreamApiResponse {
  status: boolean
  message: string
  data: BrandCreamResponse
}

// Service return type
export interface BrandCreamServiceResponse {
  data: BrandCreamItem[]
  pagination: PaginationData | null
  topData: TopData | null
}