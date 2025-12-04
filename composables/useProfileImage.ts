import { useProfileImageService } from "~/services/api/profile_image.service";
import type { ProfilImageItem } from "~/services/types/profile_image-type";

export const useProfileImage = () => {
  const service = useProfileImageService();
  const profileImageitems = ref<ProfilImageItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchProfileImages = async () => {
    loading.value = true;
    error.value = null;

    try {
      const data = await service.getAllProfileImages();
      profileImageitems.value = data;
    } catch (err: any) {
      error.value = err.message || "Failed to load profile images";
    } finally {
      loading.value = false;
    }
  };

  return {
    profileImageitems,
    loading,
    error,
    fetchProfileImages,
  };
};
