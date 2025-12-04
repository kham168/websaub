import { PROFILE_IMAGE_ENDPOINTS } from '~/services/endpoints/profileimage.endpoint'
import { getFullUrl } from '~/services/config/api.config'
import type { ProfilImageItem } from '~/services/types/profile_image-type'

interface ApiResponse<T> {
  status: boolean
  message: string
  data: T
}

export const useProfileImageService = () => {
  const baseUrl = getFullUrl(PROFILE_IMAGE_ENDPOINTS.PROFILE_IMAGE)

  const getAllProfileImages = async (): Promise<ProfilImageItem[]> => {
    try {
      const response = await $fetch<ApiResponse<ProfilImageItem[]>>(baseUrl, { method: 'GET' })

      return response.data   // <-- FIXED: return data.data, not whole response
    } catch (error) {
      console.error('Error fetching profile images:', error)
      return []
    }
  }

  return {
    getAllProfileImages
  }
}
