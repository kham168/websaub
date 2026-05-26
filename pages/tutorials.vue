<template>
  <v-container fluid class="pa-0 tutorials-page">

    <!-- ── PLAYER SECTION ── -->
    <div v-if="currentVideo" class="player-section">
      <!-- Video Player (16:9) -->
      <div class="player-bg">
        <div v-if="playerLoading" class="player-loading">
          <v-progress-circular indeterminate color="white" size="52" />
          <p class="mt-3 text-white text-body-1">ກຳລັງໂຫລດວິດີໂອ...</p>
        </div>
        <v-responsive v-show="!playerLoading" :aspect-ratio="16 / 9">
          <iframe
            :key="currentVideo.video"
            width="100%"
            height="100%"
            :src="getEmbedUrl(currentVideo.video)"
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style="display: block"
            @load="onPlayerLoaded"
            @error="onPlayerError"
          />
        </v-responsive>
      </div>

      <!-- Video Info Bar -->
      <div class="player-info pa-3 pa-md-4">
        <p class="text-subtitle-1 font-weight-bold mb-2 player-title">
          {{ currentVideo.detail }}
        </p>
        <div class="d-flex align-center justify-space-between flex-wrap ga-2">
          <div class="d-flex align-center ga-2">
            <v-avatar color="red-darken-2" size="34">
              <v-icon color="white" size="20">mdi-youtube</v-icon>
            </v-avatar>
            <div>
              <p class="text-body-2 font-weight-bold ma-0">TSHEB.LA</p>
              <p class="text-caption text-grey ma-0">Official Channel</p>
            </div>
          </div>
          <div class="d-flex ga-2">
            <v-btn
              size="small"
              variant="tonal"
              color="grey-darken-3"
              prepend-icon="mdi-thumb-up-outline"
              rounded="pill"
            >ຖືກໃຈ</v-btn>
            <v-btn
              size="small"
              variant="outlined"
              color="grey-darken-2"
              prepend-icon="mdi-share-variant-outline"
              rounded="pill"
              :href="getYoutubeUrl(currentVideo.video)"
              target="_blank"
            >ແຊ</v-btn>
            <v-btn
              size="small"
              variant="text"
              color="grey"
              icon
              @click="closePlayer"
            >
              <v-icon size="20">mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
      </div>

      <v-divider />
    </div>

    <!-- ── VIDEO LIST ── -->
    <div class="pa-3 pa-md-4 pb-footer">

      <!-- Section Header -->
      <div class="d-flex align-center mb-4">
        <v-icon color="red-darken-2" size="30" class="mr-2">mdi-youtube</v-icon>
        <span class="text-h6 font-weight-bold">ວີດີໂອສອນທັງໝົດ</span>
      </div>

      <!-- Loading -->
      <div v-if="videoLoading" class="text-center py-16">
        <v-progress-circular indeterminate color="red-darken-2" size="56" />
        <p class="mt-4 text-body-1 text-grey">ກຳລັງໂຫລດລາຍການ...</p>
      </div>

      <!-- Error -->
      <div v-else-if="videoError" class="text-center py-16">
        <v-icon size="64" color="error">mdi-alert-circle-outline</v-icon>
        <p class="mt-4 text-body-1 text-error">{{ videoError }}</p>
        <v-btn color="red" variant="tonal" class="mt-4" prepend-icon="mdi-refresh" @click="fetchGuidelineVideos">
          ລອງໃໝ່
        </v-btn>
      </div>

      <!-- Video Cards -->
      <v-row v-else dense>
        <v-col
          v-for="(video, idx) in guidelineVideos"
          :key="video.id || idx"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
            flat
            rounded="lg"
            class="yt-card"
            :class="{ 'yt-card--active': currentVideo?.id === video.id }"
            @click="handleSelectVideo(video)"
          >
            <!-- Thumbnail -->
            <div class="yt-thumb-wrapper">
              <v-img
                :src="getYoutubeThumbnail(video.video)"
                :aspect-ratio="16 / 9"
                cover
                class="yt-thumb"
              >
                <template #placeholder>
                  <div class="yt-thumb-fallback">
                    <v-icon size="52" color="white" class="opacity-80">mdi-play-circle</v-icon>
                  </div>
                </template>
                <!-- Play overlay on hover -->
                <div class="yt-overlay">
                  <div class="yt-play-circle">
                    <v-icon size="38" color="white">mdi-play</v-icon>
                  </div>
                </div>
              </v-img>
            </div>

            <!-- Card Info -->
            <div class="pa-2 d-flex align-start ga-2">
              <v-avatar color="red-darken-2" size="36" class="flex-shrink-0 mt-1">
                <v-icon color="white" size="20">mdi-youtube</v-icon>
              </v-avatar>
              <div class="min-width-0 flex-grow-1">
                <p class="text-body-2 font-weight-bold yt-title mb-1">{{ video.detail }}</p>
                <p class="text-caption text-grey-darken-1 ma-0">TSHEB.LA</p>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

    </div>
  </v-container>
</template>

<script setup>
import { onMounted } from "vue";

const {
  guidelineVideos,
  videoLoading,
  videoError,
  currentVideo,
  playerLoading,
  fetchGuidelineVideos,
  getEmbedUrl,
  getYoutubeUrl,
  extractYoutubeId,
  playVideo,
  onPlayerLoaded,
  onPlayerError,
} = useGuidelineVideo();

onMounted(async () => {
  await fetchGuidelineVideos();
  if (guidelineVideos.value?.length > 0) {
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

const getYoutubeThumbnail = (url) => {
  const id = extractYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
};
</script>

<style scoped>
.tutorials-page {
  background: #f9f9f9;
  min-height: 100dvh;
}

/* ── Player ── */
.player-bg {
  background: #000;
  width: 100%;
}
.player-loading {
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.player-info {
  background: #fff;
}
.player-title {
  line-height: 1.5;
}

/* ── Footer padding ── */
@media (max-width: 959px) {
  .pb-footer {
    padding-bottom: 74px !important;
  }
}

/* ── YouTube-style cards ── */
.yt-card {
  cursor: pointer;
  background: #fff;
  transition: box-shadow 0.2s ease;
  border: 1px solid #e0e0e0;
}
.yt-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12) !important;
}
.yt-card--active {
  border: 2px solid #c62828 !important;
}

/* Thumbnail */
.yt-thumb-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
}
.yt-thumb-fallback {
  height: 100%;
  background: linear-gradient(135deg, #1a237e 0%, #c62828 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Hover overlay */
.yt-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.yt-thumb-wrapper:hover .yt-overlay {
  opacity: 1;
}
.yt-play-circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Title 2-line clamp */
.yt-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.min-width-0 {
  min-width: 0;
}
.opacity-80 {
  opacity: 0.8;
}
</style>
