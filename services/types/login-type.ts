export interface LoginPayload {
    tel: string;
    password: string;
  }
  
  export interface LoginUser {
    id: number;
    name: string;
    type: string;
    channel: number;
  }
  
  export interface LoginResponse {
    // status: boolean;
    // message: string;
    data?: any;
    // token?: string;
    result?:any
  }
  