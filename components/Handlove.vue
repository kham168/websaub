<template>
  <!-- 🔹 Show list of projects directly on page -->
  <v-card>
    <v-card-title class="d-flex justify-between">
      Projects
    </v-card-title>

    <v-card-text style="max-height:70vh; overflow-y:auto;">
      <v-list dense>
        <v-list-item
          v-for="(project, index) in projects"
          :key="index"
          @click="openProject(project)"
          class="hover:bg-gray-100 rounded cursor-pointer"
        >
          <!-- 👇 Each project shows its own image -->
          <v-list-item-avatar size="60">
            <v-img :src="project.image" alt="Project image" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="font-semibold">
              {{ project.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              Total: <strong>{{ formatCurrency(totalAmount(project)) }}</strong>
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon color="blue">mdi-chevron-right</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>

      <div v-if="projects.length === 0" class="text-center mt-4 text-gray-500">
        No projects yet. Add one! 🌱
      </div>
    </v-card-text>
  </v-card>

  <!-- 🔹 Second dialog: Donation details of one project -->
  <v-dialog v-model="donationsDialog" max-width="600px">
    <v-card>
      <v-card-title class="d-flex justify-between">
        {{ selectedProject?.title }}
       </v-card-title>

      <v-card-text style="max-height:70vh; overflow-y:auto;">
        <v-list dense>
          <v-list-item
            v-for="(donation, index) in selectedProject?.donations"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title>{{ donation.name }}</v-list-item-title>
              <v-list-item-subtitle>
                Amount: <strong>{{ formatCurrency(donation.amount) }}</strong>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon color="green">mdi-cash</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>

        <div
          v-if="!selectedProject?.donations?.length"
          class="text-center mt-4 text-gray-500"
        >
          No donations yet. Be the first to help! 💖
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue"
 
const donationsDialog = ref(false)
const selectedProject = ref(null)

// ✅ Each project has its own image
const projects = ref([
  {
    title: "Build a School",
    image: "https://picsum.photos/200/100?random=1",
    donations: [
      { name: "Mr. Somchai", amount: 100 },
      { name: "Mrs. Keo", amount: 50 },
      { name: "Anonymous", amount: 20 }
    ]
  },
  {
    title: "Support Farmers",
    image: "https://picsum.photos/200/100?random=5",
    donations: [
      { name: "Mr Moua", amount: 30 },
      { name: "Mrs See", amount: 20 }
    ]
  },
  {
    title: "Medical Help",
    image: "https://picsum.photos/200/100?random=7",
    donations: []
  },
  {
    title: "Help Dongdok primary school",
    image: "https://picsum.photos/200/100?random=8",
     donations: [
      { name: "Mr Yang", amount: 30 },
      { name: "Mrs Vang", amount: 25 }
    ]
  },
  {
    title: "Help Tanmeesay Hight School",
    image: "https://picsum.photos/200/100?random=6",
     donations: [
      { name: "Mr Hmong", amount: 30 },
      { name: "Mrs Lee", amount: 30 }
    ]
  }
])

function totalAmount(project) {
  return project.donations.reduce((sum, d) => sum + d.amount, 0)
}

function openProject(project) {
  selectedProject.value = project
  donationsDialog.value = true
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value)
}
</script>
