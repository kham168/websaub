// services/types/taxi-type.ts

export interface TaxiItem {
    id: string
    name: string
    Price1: string
    Price2: string
    tel: string
    detail: string
    province: string
    district: string
    villages: string[]
    image: string[]
    path?: string
    cdate?: string
  }
  
  export interface DormitoryItem {
    id: string
    name: string
    price1: string
    price2: string
    price3: string
    type: string
    totalroom: string
    activeroom: number
    locationvideo: string
    tel: string
    contactnumber: string
    moredetail: string
    province: string
    district: string
    villages: string[]
    image: string[]
    plan_on_next_month: string
    path: string
    cdate: string
  }
  
  export interface HouseItem {
    id: string
    name: string
    price1: string
    price2: string
    price3: string
    tel: string
    contactnumber: string
    locationvideo: string
    moredetail: string
    province: string
    district: string
    villages: string[]
    image: string[]
    path: string
    cdate: string
  }
  
  export interface LandItem {
    id: string
    name: string
    area: string
    price: string
    tel: string
    contactnumber: string
    locationurl: string
    locationvideo: string
    moredetail: string
    province: string
    district: string
    villages: string[]
    image: string[]
    path: string
    cdate: string
  }
  
  export interface TopDataCategory {
    Dormitory: DormitoryItem[]
    House: HouseItem[]
    Land: LandItem[]
    Taxi: TaxiItem[]
  }
  
  export interface Pagination {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  
  export interface TaxiResponse {
    status: boolean
    message: string
    data: TaxiItem[]
    pagination: Pagination
    topData: TopDataCategory
  }
  
  export interface TaxiQuery {
    page?: number
    limit?: number
  }
  
  export interface TaxiState {
    items: TaxiItem[]
    topData: TopDataCategory | null
    pagination: Pagination | null
    loading: boolean
    error: string | null
  }