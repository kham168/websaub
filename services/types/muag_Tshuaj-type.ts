
export interface MuagTshuajItem {
    id: string
    name: string
    price1: string
    price2: string | null
    price3?: string | null
    tel: string
    detail: string
    donation: string
    image: string[]
    path?: string
  }
  export interface TopDataItem {
    channelid: String;
    id: string
    name: string
    price1: string
    price2: string | null
    price3: string | null
    tel: string
    detail: string
    donation: string | null
    image: string[]
    path: string
  }
  export interface TopData {
    Dormitory?: MuagTshuajItem[]
    House?: MuagTshuajItem[]
    Land?: MuagTshuajItem[]
    Taxi?: MuagTshuajItem[]
  }
  
  export interface Pagination {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  
  export interface MuagTshuajResponse {
    rows: MuagTshuajItem[]
    pagination: Pagination
    topData?: TopData
  }
  export interface MuagTshuajApiResponse {
    status: boolean
    message: string
    data: MuagTshuajResponse
    topData?: TopData | null
    
  }
  export interface MuagTshuajServiceResponse {
    topData: TopData | null | any
    pagination: Pagination | null
    data: MuagTshuajItem[]
  }