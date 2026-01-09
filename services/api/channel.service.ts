// services/api/auth.service.ts

import { http } from '../core/http.service'
import { CHANNCEL_ENDPOINTS } from '../endpoints/channel.endpoint'
import type { Channel } from '../types/channel-type'


class ChannelService {
  async channel (){
    return http.get<Channel>(CHANNCEL_ENDPOINTS.CHANNEL)
  }
  async getChannelId (){
    return http.get<Channel>(CHANNCEL_ENDPOINTS.CHANNEL)
  }

}

export const ChannelServices = new ChannelService()
export default ChannelServices