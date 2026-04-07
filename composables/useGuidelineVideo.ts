import { ref, nextTick } from "vue";
import type {
  GuidelineVideo,
  GuidelineVideoResponse,
} from "~/services/types/guidelineVideo-type";
import { GUIDELINE_VIDEO_ENDPOINTS } from "~/services/endpoints/guidelineVideo.endpoint";
import { getFullUrl } from "~/services/config/api.config";

export const useGuidelineVideo = () => {
  const guidelineVideos = ref<GuidelineVideo[]>([]);
  const videoLoading = ref(false);
  const videoError = ref<string | null>(null);
  const currentVideo = ref<GuidelineVideo | null>(null);
  const playerLoading = ref(false); // loading state when clicking a video card
  const playerError = ref(false); // error state when iframe fails to load

  const extractYoutubeId = (rawUrl: string): string => {
    if (!rawUrl) return "";
    const cleanUrl = rawUrl.replace("https://service.tsheb.la/", "");
    const match = cleanUrl.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=|shorts\/))([\w-]+)/
    );
    return match ? match[1] : "";
  };

  const getEmbedUrl = (rawUrl: string, muted = false): string => {
    const id = extractYoutubeId(rawUrl);
    if (!id) return "";
    return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&mute=${
      muted ? 1 : 0
    }&playsinline=1`;
  };

  const getYoutubeUrl = (rawUrl: string): string => {
    const id = extractYoutubeId(rawUrl);
    if (!id) return "";
    return `https://www.youtube.com/watch?v=${id}`;
  };

  const playVideo = (video: GuidelineVideo): void => {
    currentVideo.value = null;
    playerLoading.value = true;
    playerError.value = false;

    setTimeout(() => {
      currentVideo.value = video;
      nextTick(() => {
        const cardText = document.querySelector(
          ".video-tutorial-card .v-card-text"
        );
        if (cardText) {
          cardText.scrollTo({ top: 0, behavior: "smooth" });
        }

        setTimeout(() => {
          if (playerLoading.value) {
            playerLoading.value = false;
            playerError.value = true;
          }
        }, 8000);
      });
    }, 50);
  };

  const onPlayerLoaded = (): void => {
    playerLoading.value = false;
    playerError.value = false;
  };

  const onPlayerError = (): void => {
    playerLoading.value = false;
    playerError.value = true;
  };

  const fetchGuidelineVideos = async (): Promise<void> => {
    videoLoading.value = true;
    videoError.value = null;

    try {
      const url = getFullUrl(GUIDELINE_VIDEO_ENDPOINTS.GET_ALL);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch videos: ${response.status}`);
      }

      const result: GuidelineVideoResponse = await response.json();

      if (result.status && Array.isArray(result.data)) {
        guidelineVideos.value = result.data.filter((v) => v.status === "1");
      } else {
        guidelineVideos.value = [];
      }
    } catch (err) {
      videoError.value =
        err instanceof Error ? err.message : "ເກີດຂໍ້ຜິດພາດໃນການໂຫລດວິດີໂອ";
    } finally {
      videoLoading.value = false;
    }
  };

  return {
    guidelineVideos,
    videoLoading,
    videoError,
    currentVideo,
    playerLoading,
    playerError,
    fetchGuidelineVideos,
    getEmbedUrl,
    getYoutubeUrl,
    extractYoutubeId,
    playVideo,
    onPlayerLoaded,
    onPlayerError,
  };
};
