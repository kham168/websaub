export interface AddUserPayload {
  id?: number;
  tel: string;
  name: string;
  peopleId: string;
  type: string;
  password?: string;
  channel: string;
}
export interface AddUserResponse {
  status: boolean;
  message: string;
  data?: any; // or replace with your actual user structure
}
