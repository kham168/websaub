// ─── Core Entities ───────────────────────────────────────────────────────────

export interface DormitoryListing {
    channel: number;
    id: string;
    dormantalname: string;
    /** Price option 1 (e.g. "1200000" or "undefined") */
    price1: string;
    /** Price option 2 (e.g. "900000ຕໍ່ເດືອນ" or "undefined") */
    price2: string;
    /** Price option 3 (e.g. "undefined") */
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
    cdate: string;
  }
  
  export interface TopListing {
    channel: number;
    id: string;
    name: string;
    tel: string;
    contactnumber?: string;
    locationvideo?: string;
    locationurl?: string | null;
    moredetail?: string;
    detail?: string;
    province: string;
    district: string;
    villages: string[];
    image: string[];
    cdate: string;
    // Channel 2 specific
    type?: string;
    totalroom?: string;
    activeroom?: number;
    plan_on_next_month?: string;
    // Channel 5 specific
    area?: string;
  }
  
  export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
  
  // ─── API Response ─────────────────────────────────────────────────────────────
  
  export interface DormitoryListResponse {
    status: boolean;
    message: string;
    data: DormitoryListing[];
    pagination: Pagination;
    qr: string | null;
    imageadvert: string | null;
    video1: string | null;
    video2: string | null;
    guidelinevideo: string | null;
    topData: TopListing[];
  }
  
  // ─── Request Params ───────────────────────────────────────────────────────────
  
  export interface GetDormitoriesParams {
    page?: number;
    limit?: number;
    province?: string;
    district?: string;
    village?: string;
    type?: string;
    channel?: number;
  }