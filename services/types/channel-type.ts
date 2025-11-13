
export interface Channel {
    status: number      // ✅ the API returns 200, not true/false
    success: boolean    // ✅ include this because your API has it
    message: string
    data?: ChannelData[]
  }
    export interface ChannelData {
        id: string;
        channel: string;
        detail: string;
        ownername: string;
        peopleintorm: string;
        tel: string;
        email: string;
        status: string;
        cdate: string;
        path: string;
        image_urls: string[];
}