// types/getAllUser-type.ts

export interface GetAllUserItem {
    id: number;
    tel: string;
    name: string;
    peopleid: string;
    type: string;
    channel: number;
    cdate: string; // ISO string date
  }
  
  export interface GetAllUserResponse {
    // status: boolean;
    // message: string;
    data: any;
    result?: any;
  }
  