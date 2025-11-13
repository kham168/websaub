
import { ref } from 'vue'
import { ChannelServices } from '~/services/api/channel.service'
import type { ChannelData } from '~/services/types/channel-type'

export const useChannel = () => {
  const channels = ref<ChannelData[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchChannels = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await ChannelServices.channel()

      // Normalize response to always be an array
      const dataArray = Array.isArray(response.data)
        ? response.data
        : response.data
        ? [response.data]
        : []

      // Map data safely with defaults
      channels.value = dataArray.map((c: any) => ({
        ...c,
        // id: c.id || Math.random().toString(36).substring(2, 10),
        title: c.title || c.channel || 'Untitled Channel',
        image: c.image || [],
        price: c.price ?? 99,
        originalPrice: c.originalPrice ?? null,
        discount: c.discount ?? null,
        rating: c.rating ?? 4.5,
        reviewCount: c.reviewCount ?? 0,
        isBestSeller: c.isBestSeller ?? false,
        ownername: c.ownername || 'No Name',
        email: c.email || 'No Email',
        peopleInForm: c.peopleintorm || 'No Info',
        tel: c.tel || 'No Tel',
        status: c.status || 'No Status',
        cdate: c.cdate || '',
      }))
    } catch (err: any) {
      error.value = err.message || 'Failed to load channels'
      channels.value = []
    } finally {
      loading.value = false
    }
  }

  return {
    channels,
    loading,
    error,
    fetchChannels,
  }
}
