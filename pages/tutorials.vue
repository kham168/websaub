<template>
    <v-container fluid class="pa-4 pa-sm-6">
      <div class="d-flex align-center mb-6">
        <v-icon color="indigo-darken-2" size="32" class="mr-3">mdi-play-circle-outline</v-icon>
        <span class="text-h6 ">Qhia Hu Tsheb Thiab yuav khoom</span>
      </div>
  
      <v-divider class="mb-6" />
  
      <v-expand-transition>
        <v-sheet
          v-if="currentVideo"
          class="mb-8 rounded-xl overflow-hidden"
          elevation="6"
          border
        >
          <div class="bg-grey-darken-4 pa-3 d-flex align-center">
            <v-icon color="indigo-lighten-2" class="mr-2">mdi-movie-play-outline</v-icon>
            <span class="text-white font-weight-medium text-truncate flex-grow-1">
              {{ currentVideo.detail }}
            </span>
            <v-btn
              icon
              size="small"
              variant="text"
              :href="getYoutubeUrl(currentVideo.video)"
              target="_blank"
              class="mr-1"
            >
              <v-icon color="grey-lighten-1">mdi-open-in-new</v-icon>
            </v-btn>
            <v-btn icon size="small" variant="text" @click="closePlayer">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
          </div>
  
          <div style="position: relative; background-color: #000">
            <div
              v-if="playerLoading"
              class="d-flex flex-column align-center justify-center"
              style="height: 400px"
            >
              <v-progress-circular indeterminate color="indigo-lighten-1" size="56" />
              <p class="mt-4 text-white text-body-2">ກຳລັງໂຫລດວິດີໂອ...</p>
            </div>
  
            <v-responsive
              v-show="!playerLoading && !playerError"
              :aspect-ratio="14/ 6"
            >
              <iframe
                :key="currentVideo.video"
                width="100%"
                height="100%"
                :src="getEmbedUrl(currentVideo.video)"
                frameborder="0"
                allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                style="display: block"
                @load="onPlayerLoaded"
                @error="onPlayerError"
              ></iframe>
            </v-responsive>
          </div>
  
          <div class="bg-grey-darken-4 pa-2 d-flex align-center justify-end">
            <span class="text-caption text-grey mr-3">ວິດີໂອບໍ່ສະແດງ?</span>
            <v-btn
              color="indigo-darken-1"
              size="x-small"
              variant="flat"
              :href="getYoutubeUrl(currentVideo.video)"
              target="_blank"
              prepend-icon="mdi-launch"
            >
              ເປີດຜ່ານ Browser
            </v-btn>
          </div>
        </v-sheet>
      </v-expand-transition>
  
      <v-row v-if="videoLoading" class="text-center py-16">
        <v-col cols="12">
          <v-progress-circular indeterminate color="indigo" size="56" />
          <p class="mt-4 text-body-1 text-grey">ກຳລັງໂຫລດລາຍການ...</p>
        </v-col>
      </v-row>
  
      <v-row v-else-if="videoError" class="text-center py-16">
        <v-col cols="12">
          <v-icon size="64" color="error">mdi-alert-circle-outline</v-icon>
          <p class="mt-4 text-body-1 text-error">{{ videoError }}</p>
          <v-btn color="indigo" variant="tonal" class="mt-4" @click="fetchGuidelineVideos">ລອງໃໝ່</v-btn>
        </v-col>
      </v-row>
  
      <v-row v-else>
        <v-col
          v-for="(video, idx) in guidelineVideos"
          :key="video.id || idx"
          cols="12" sm="6" md="4"
        >
          <v-card
            elevation="2"
            rounded="lg"
            hover
            class="video-card"
            @click="handleSelectVideo(video)"
          >
            <div class="video-thumbnail-placeholder">
              <div class="play-button-ring">
                <v-icon size="36" color="white">mdi-play</v-icon>
              </div>
              <span class="play-text">ກົດເພື່ອເບິ່ງ</span>
            </div>
  
            <v-card-text class="pa-4">
              <div class="text-subtitle-2 font-weight-bold video-title">
                {{ video.detail }}
              </div>
              <div class="d-flex align-center justify-space-between mt-3">
                <div class="d-flex align-center">
                  <v-icon size="x-small" color="indigo" class="mr-1">mdi-check-decagram</v-icon>
                  <span class="text-caption text-grey">Official Guide</span>
                </div>
                <v-btn
                  size="x-small"
                  variant="text"
                  color="indigo-darken-2"
                  :href="getYoutubeUrl(video.video)"
                  target="_blank"
                  @click.stop
                >
                  ເປີດໃນໃຫມ່
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { useGuidelineVideo } from "@/composables/useGuidelineVideo";
  import { onMounted } from "vue";
  
  const {
    guidelineVideos,
    videoLoading,
    videoError,
    currentVideo,
    playerLoading,
    playerError,
    fetchGuidelineVideos,
    getEmbedUrl,
    getYoutubeUrl,
    playVideo,
    onPlayerLoaded,
    onPlayerError,
  } = useGuidelineVideo();
  
  onMounted(async () => {
    await fetchGuidelineVideos();
    // Auto-play the first video if list is ready
    if (guidelineVideos.value && guidelineVideos.value.length > 0) {
      playVideo(guidelineVideos.value[0]);
    }
  });
  
  const handleSelectVideo = (video) => {
    playVideo(video);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const closePlayer = () => {
    currentVideo.value = null;
  };
  </script>
  
  <style scoped>
  .video-card {
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    overflow: hidden;
  }
  
  .video-card:hover {
    transform: translateY(-4px);
  }
  
  .video-thumbnail-placeholder {
    height: 180px;
    background: linear-gradient(135deg, #1a237e 0%, #3f51b5 50%, #7986cb 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  
  .play-button-ring {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .play-text {
    color: white;
    font-size: 13px;
    font-weight: 300;
  }
  
  .video-title {
    display: -webkit-box;
    -webkit-line-clamp-limit: 2; /* Fixed this */
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.5;
    height: 3em;
  }
  </style>