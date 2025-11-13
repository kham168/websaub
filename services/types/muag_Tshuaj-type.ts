// types/muag_Tshuaj-type.ts

export interface MuagTshuajItem {
    id: string
    name: string
    Price1: string
    Price2: string | null
    Price3?: string | null
    tel: string
    detail: string
    donation: string
    image: string[]
    path?: string
  }
  
  export interface TopDataCategory {
    Dormitory: MuagTshuajItem[]
    House: MuagTshuajItem[]
    Land: MuagTshuajItem[]
    Taxi: MuagTshuajItem[]
  }
  
  export interface Pagination {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  
  export interface MuagTshuajResponse {
    status: boolean
    message: string
    data: MuagTshuajItem[]
    pagination: Pagination
    topData: TopDataCategory
  }
  
  export interface MuagTshuajQuery {
    page?: number
    limit?: number
  }
  
  export interface MuagTshuajState {
    items: MuagTshuajItem[]
    topData: TopDataCategory | null
    pagination: Pagination | null
    loading: boolean
    error: string | null
  }