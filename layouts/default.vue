<template>
  <v-app>
    <!-- APP BAR -->
    <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>
        <!-- 🔗 Home Button -->
        <NuxtLink to="/homepage">
          <v-btn 
            class="ml-4 text-none"
            color="primary"
            variant="tonal"
          >
            Home  
          </v-btn>
        </NuxtLink>
      </v-app-bar-title>
 
    </v-app-bar>

    <!-- DRAWER -->
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-star"
        title="Starred"
        value="starred"
        @click="goToMyFile('/tshuaj')"
      ></v-list-item>
    </v-list> 

    <!-- MAIN CONTENT -->
    <v-main class="class-main">
      <NuxtPage />
    </v-main>
  
    <!-- FOOTER -->
 <v-footer
  class="text-center d-flex flex-column ga-0 py-4"
  color="indigo-lighten-1"
  app
> 
  <!-- Main dialog -->
  <v-dialog v-model="dialog" max-width="800px">
    <template v-slot:activator="{ props: activatorProps }">
      <div class="d-flex ga-3">
        <v-btn
          v-for="(item, index) in icons"
          :key="index"
          density="comfortable"
          variant="text"
          v-bind="item.name === 'cart' || item.name === 'history' ? activatorProps : {}"
          @click="openDialog(item.name)"
        >
          <template v-if="item.name === 'cart'">
            <v-badge
              v-if="cartStore.dataCart.length !== 0"
              :content="cartStore.dataCart.length"
              color="red"
              overlap
            >
              <v-icon>{{ item.icon }}</v-icon>
            </v-badge>
            <v-icon v-else>{{ item.icon }}</v-icon>
          </template>
          <template v-else>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
        </v-btn>
      </div>
    </template>

    <!-- ✅ Dialog Content -->
    <v-card>
      <template v-if="selectedDialogType === 'cart'">
        <v-card-title>ກະຕ່າ (My Cart)</v-card-title>
        <Cart />
      </template>

      <template v-else-if="selectedDialogType === 'history'">
        <v-card-title>ປະຫວັດທຸລະກຳ (History)</v-card-title>
        <History />
      </template>

      <template v-else-if="selectedDialogType === 'youtube'"> 
<v-card-title class="text-sm font-semibold">
  Video qhia koj siv ...
</v-card-title>
        <v-card-text style="max-height:70vh; overflow-y:auto;">
          <v-row>
            <v-col
              v-for="(video, index) in videos"
              :key="index"
              cols="12" sm="6" md="4"
            >
              <v-card
                class="hover:shadow-lg transition cursor-pointer"
                @click="openVideoDialog(video)"
              >
                <v-img :src="video.thumbnail" height="130px"></v-img>
              
<v-card-title class="text-xs text-gray-700">
  {{ video.title }}
</v-card-title>

              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </template>
    </v-card>
  </v-dialog>

  <!-- ✅ Separate dialog for HandLove.vue -->
  <v-dialog v-model="handLoveDialog" max-width="800px">
    <HandLove />
  </v-dialog>

  <!-- ✅ Separate dialog just for playing video -->
  <v-dialog v-model="videoDialog" max-width="900px">
    <v-card>
      <v-card-title class="d-flex justify-between">
        {{ currentVideo?.title }}
      </v-card-title>
      <v-card-text>
        <iframe
          v-if="currentVideo"
          width="100%"
          height="500"
          :src="`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1`"
          :title="currentVideo.title"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-divider class="my-2" thickness="2" width="30"></v-divider>
</v-footer>
  
  </v-app>
</template>
 
<script setup>import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useDataCart } from '@/stores'  
import HandLove from '@/components/Handlove.vue'  // ✅ Fixed case to match filename

const selectedDialogType = ref('')
const dialog = ref(false)
const handLoveDialog = ref(false)  // ✅ will now show HandLove.vue
const cartStore = useDataCart()
const router = useRouter()
const loading = ref(false)
const drawer = ref(false)
const searchQuery = ref('')

const icons = [
  { name: 'youtube', icon: 'mdi-youtube' },
  { name: 'hand_love', icon: 'mdi-hand-heart' },
  { name: 'linkedin', icon: 'mdi-linkedin' },
  { name: 'cart', icon: 'mdi-cart-arrow-down' },
  { name: 'history', icon: 'mdi-clipboard-text' }
]

function openDialog(type) {
  const lower = type.toLowerCase()
  selectedDialogType.value = lower

  if (lower === 'hand_love') {
    handLoveDialog.value = true
    return
  }

  dialog.value = true
}
 

const videos = ref([
  {
    title: "qhia txog yuav khoom",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg"
  },
  {
    title: "qhia txog tshev so",
    youtubeId: "5NV6Rdv1a3I",
    thumbnail: "https://img.youtube.com/vi/5NV6Rdv1a3I/0.jpg"
  },
  {
    title: "qhia txog hu tsheb (Cong tsheb)",
    youtubeId: "3JZ_D3ELwOQ",
    thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/0.jpg"
  },
  {
    title: "qhia txog hu tsheb (Cong tsheb)",
    youtubeId: "3JZ_D3ELwOQ",
    thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/0.jpg"
  },
  {
    title: "qhia txog hu tsheb (Cong tsheb)",
    youtubeId: "3JZ_D3ELwOQ",
    thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/0.jpg"
  }
])

const videoDialog = ref(false)

function openVideoDialog(video) {
  currentVideo.value = { ...video }
  videoDialog.value = true
}


const currentVideo = ref(null)

function playVideo(video) {
  currentVideo.value = video
}
  

function goToMyFile(value) {
  router.push(value)
}

async function onClick() {
  await nextTick()
  if (!searchQuery.value) return
  loading.value = true
  router.push({
    path: '/form_query',
    query: { q: searchQuery.value }
  }).finally(() => {
    loading.value = false
  })
}

function inserted() {
  console.log('insert data', cartStore.dataCart)
  dialog.value = false
  cartStore.dataCart.splice(0, cartStore.dataCart.length)
}
</script>

<style>
.class-main {
  background-color: white; /* ✅ Set solid white background */
  background-image: none;  /* ✅ Remove the image */
}
</style>

