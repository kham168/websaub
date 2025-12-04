<template>
  <v-container fluid class="">
    <v-card class="mb-6 mb-md-8" rounded="xl" elevation="4" color="white">
      <v-card-text class="pa-4 pa-sm-5 pa-md-6">
        <v-row align="center" justify="space-between">
          <!-- Left: Badge & Title -->
          <v-col cols="12" md="7">
            <div class="d-flex align-center ga-3 ga-sm-4">
              <v-avatar
                :size="$vuetify.display.xs ? 50 : 60"
                class="bg-blue from-blue to-pink elevation-8"
              >
                <v-icon :size="$vuetify.display.xs ? 26 : 32" color="#ff6fa8">
                  mdi-heart
                </v-icon>
              </v-avatar>
              <div>
                <h1
                  class="text-h5 text-sm-h4 font-weight-black text-gradient mb-1"
                >
                  Donation Projects
                </h1>
                <p class="text-body-2 text-grey-darken-1 ma-0">
                  Make a difference in our community
                </p>
              </div>
            </div>
          </v-col>

          <!-- Right: Stats -->
          <v-col cols="12" md="5" class="mt-4 mt-md-0">
            <div
              class="d-flex justify-start justify-md-end align-center ga-3 ga-sm-4"
            >
              <v-sheet class="text-center pa-2 px-4 rounded-lg">
                <div class="text-h6 text-sm-h5 text-pink font-weight-bold">
                  {{ projects.length }}
                </div>
                <div class="text-caption text-grey">Projects</div>
              </v-sheet>

              <v-divider
                vertical
                :thickness="2"
                class="mx-2"
                style="height: 40px"
              />

              <v-sheet class="text-center pa-2 px-4 rounded-lg">
                <div class="text-h6 text-sm-h5 text-pink font-weight-bold">
                  {{ formatCurrency(getTotalDonations()) }}
                </div>
                <div class="text-caption text-grey">Raised</div>
              </v-sheet>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-col cols="12" class="d-flex justify-end">
      <v-btn
        class="bg-gradient-to-r from-blue to-pink"
        rounded="xl"
        elevation="4"
        @click="openDonationForm"
      >
        <v-icon start color="white">mdi-hand-heart</v-icon>
        <span class="text-white font-weight-bold">Donate Now</span>
      </v-btn>
    </v-col>

    <!-- Controls Section search -->
    <v-col cols="12" class="d-flex justify-center">
      <div style="width: 400px">
        <v-text-field
          v-model="searchQuery"
          placeholder="Search projects..."
          variant="outlined"
          density="comfortable"
          prepend-inner-icon="mdi-magnify"
          rounded="xl"
          color="pink"
          bg-color="white"
          hide-details
          clearable
        />
      </div>
    </v-col>

    <v-divider class="my-4"></v-divider>

    <v-row>
      <v-col
        v-for="(project, index) in filteredProjects"
        :key="`project-${index}`"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          rounded="xl"
          elevation="3"
          hover
          class="h-100 d-flex flex-column"
          @click="openProject(project)"
        >
          <!-- Image Container -->
          <v-sheet class="position-relative">
            <v-img
              :src="project.image"
              :height="$vuetify.display.xs ? 160 : 180"
              cover
              class="rounded-t-xl"
            >
              <v-sheet
                class="position-absolute w-100 h-100 bg-gradient-to-t from-black-alpha-30 to-transparent"
              />
            </v-img>

            <!-- Progress Badge -->
            <v-chip
              class="position-absolute"
              style="bottom: 12px; left: 12px"
              color="rgba(0,0,0,0.75)"
              size="small"
              label
            >
              <v-icon start size="14" color="white">mdi-chart-line</v-icon>
              <span class="text-white font-weight-bold">
                {{ getProgressPercent(project) }}%
              </span>
            </v-chip>

            <!-- Donor Badge -->
            <v-chip
              class="position-absolute bg-gradient-to-r from-blue to-pink"
              style="top: 12px; right: 12px"
              size="small"
              label
            >
              <v-icon start size="12" color="white"
                >mdi-account-multiple</v-icon
              >
              <span class="text-white font-weight-bold">
                {{ project.donations.length }}
              </span>
            </v-chip>
          </v-sheet>

          <!-- Card Content -->
          <v-card-text class="pa-3 pa-sm-4 flex-grow-1 d-flex flex-column">
            <h3 class="text-subtitle-1 font-weight-bold mb-2 text-truncate-2">
              {{ project.title }}
            </h3>
            <p class="text-caption text-grey mb-3 text-truncate-2">
              {{ project.description }}
            </p>
            <p class="text-caption text-grey mb-3 text-truncate-2">
              Tel:
              <span class="font-weight-bold text-blue">
                {{ project.phone }}</span
              >
            </p>

            <v-spacer />

            <div>
              <div class="d-flex justify-space-between mb-1">
                <span class="text-caption text-grey">Progress</span>
                <span class="text-caption font-weight-bold text-pink">
                  {{ formatCurrency(totalAmount(project)) }}
                </span>
              </div>
              <v-progress-linear
                :model-value="getProgressPercent(project)"
                color="pink"
                height="6"
                rounded
                class="mb-3"
              />

              <v-divider class="mb-3" />

              <div class="d-flex justify-space-between">
                <div class="d-flex align-center">
                  <v-icon size="14" color="grey">mdi-heart-outline</v-icon>
                  <span class="text-caption text-grey ml-1">
                    {{ project.donations.length }} Donors
                  </span>
                </div>
                <div class="d-flex align-center">
                  <v-icon size="14" color="grey">mdi-target</v-icon>
                  <span class="text-caption text-grey ml-1">
                    {{ formatCurrency(project.goal) }}
                  </span>
                </div>
              </div>
            </div>
          </v-card-text>

          <v-card-actions class="pa-2 pa-sm-3 pt-0 justify-end">
            <v-btn
              text
              small
              class="text-blue font-weight-bold d-flex align-center"
              style="text-transform: none; transition: 0.3s"
            >
              More
              <v-icon right color="blue" size="20">mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Empty State -->
      <v-col v-if="filteredProjects.length === 0" cols="12">
        <v-card rounded="xl" elevation="2" color="white">
          <v-card-text class="text-center pa-8 pa-sm-12">
            <v-icon
              :size="$vuetify.display.xs ? 64 : 80"
              color="grey-lighten-2"
              class="mb-4"
            >
              mdi-folder-open-outline
            </v-icon>
            <h3 class="text-h6 font-weight-bold mb-2">No Projects Found</h3>
            <p class="text-body-2 text-grey">
              Try adjusting your search or filters
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Project Details Dialog -->
    <DialogDetailDonate
      v-model="donationsDialog"
      :selectedProject="selectedProject"
    />

    <!-- DONATION FORM DIALOG -->
    <DonationFormDialog
      v-model="donationFormDialog"
      :projects="projects"
      :selected-projects="selectedProjects"
      :payslip-preview="payslipPreview"
      :photo-preview="photoPreview"
      :donation-form="donationForm"
      :step="step"
      @update:model-value="donationFormDialog = $event"
      @update:step="step = $event"
      @toggle-project="toggleProject"
      @update-project-amount="updateProjectAmount"
      @handle-payslip-upload="handlePayslipUpload"
      @remove-payslip="removePayslip"
      @handle-photo-upload="handlePhotoUpload"
      @remove-photo="removePhoto"
      @submit-donation="submitDonation"
      @close-donation-form="closeDonationForm"
    />
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import DialogDetailDonate from "./Dialog/DialogDetailDonate.vue";
import DonationFormDialog from "./Dialog/DonationFormDialog.vue";

// ============= DATA =============
const projects = ref([
  {
    id: 1,
    title: "Education Support Program",
    description: "Help provide quality education for underprivileged children",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
    goal: 50000,
    startDate: "2024-01-01",
    expiryDate: "2024-12-31",
    donations: [
      { name: "John Doe", amount: 500 },
      { name: "Jane Smith", amount: 1000 },
    ],
    phone: "303-555-0123",
  },
  {
    id: 2,
    title: "Healthcare Initiative",
    description: "Improve healthcare access in rural communities",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400",
    goal: 75000,
    startDate: "2024-02-01",
    expiryDate: "2024-12-31",
    donations: [{ name: "Mike Johnson", amount: 2000 }],
    phone: "303-555-0147",
  },
  {
    id: 3,
    title: "Clean Water Project",
    description: "Provide clean drinking water to communities in need",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
    goal: 100000,
    startDate: "2024-03-01",
    expiryDate: "2024-12-31",
    donations: [],
    phone: "303-555-0123",
  },
  {
    id: 4,
    title: "Environmental Conservation",
    description: "Protect and restore natural habitats",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400",
    goal: 60000,
    startDate: "2024-01-15",
    expiryDate: "2024-12-31",
    donations: [
      { name: "Sarah Williams", amount: 750 },
      { name: "Tom Brown", amount: 1250 },
    ],
    phone: "303-555-0123",
  },
]);

const searchQuery = ref("");
const donationsDialog = ref(false);
const selectedProject = ref(null);
const donationFormDialog = ref(false);
const step = ref(1);
const selectedProjects = ref({});
const payslipPreview = ref(null);
const photoPreview = ref(null);

const donationForm = ref({
  donorPhone: "",
  donorName: "",
  donorEmail: "",
  message: "",
  payslipFile: null,
  donorPhotoFile: null,
});

// ============= COMPUTED =============
const filteredProjects = computed(() => {
  if (!searchQuery.value) return projects.value;

  const query = searchQuery.value.toLowerCase();
  return projects.value.filter(
    (project) =>
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query)
  );
});

// ============= METHODS =============

// Formatting
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Donation calculations
const totalAmount = (project) => {
  return (
    project?.donations?.reduce((sum, donation) => sum + donation.amount, 0) || 0
  );
};

const getProgressPercent = (project) => {
  if (!project) return 0;
  const total = totalAmount(project);
  return Math.min(Math.round((total / project.goal) * 100), 100);
};

const getTotalDonations = () => {
  return projects.value.reduce((sum, project) => sum + totalAmount(project), 0);
};

// Dialog management
const openProject = (project) => {
  selectedProject.value = project;
  donationsDialog.value = true;
};

const openDonationForm = () => {
  donationFormDialog.value = true;
  step.value = 1;
};

// Project selection
const toggleProject = (projectId) => {
  if (selectedProjects.value[projectId]) {
    const { [projectId]: _, ...rest } = selectedProjects.value;
    selectedProjects.value = rest;
  } else {
    selectedProjects.value[projectId] = { amount: 0 };
  }
};

// UPDATE PROJECT AMOUNT - KEY FIX
const updateProjectAmount = ({ projectId, amount }) => {
  if (selectedProjects.value[projectId]) {
    // Force reactivity by creating a new object
    selectedProjects.value = {
      ...selectedProjects.value,
      [projectId]: {
        ...selectedProjects.value[projectId],
        amount: parseFloat(amount) || 0,
      },
    };
  }
};

// Selected projects helpers
const getTotalAmount = () => {
  return Object.values(selectedProjects.value).reduce((sum, project) => {
    return sum + (parseFloat(project?.amount) || 0);
  }, 0);
};

const getSelectedCount = () => {
  return Object.keys(selectedProjects.value).length;
};

const canProceed = () => {
  const hasSelections = getSelectedCount() > 0;
  const hasValidAmounts = Object.values(selectedProjects.value).every(
    (p) => p.amount && parseFloat(p.amount) > 0
  );
  return hasSelections && hasValidAmounts && getTotalAmount() > 0;
};

// File uploads
const handlePayslipUpload = (e) => {
  const file = e.target.files?.[0];
  if (file && file.size <= 5 * 1024 * 1024) {
    donationForm.value.payslipFile = file;
    const reader = new FileReader();
    reader.onload = (event) => {
      payslipPreview.value = event.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const removePayslip = () => {
  donationForm.value.payslipFile = null;
  payslipPreview.value = null;
};

const handlePhotoUpload = (e) => {
  const file = e.target.files?.[0];
  if (file && file.size <= 5 * 1024 * 1024) {
    donationForm.value.donorPhotoFile = file;
    const reader = new FileReader();
    reader.onload = (event) => {
      photoPreview.value = event.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const removePhoto = () => {
  donationForm.value.donorPhotoFile = null;
  photoPreview.value = null;
};

// Form submission
const closeDonationForm = () => {
  step.value = 1;
  selectedProjects.value = {};
  donationForm.value = {
    donorPhone: "",
    donorName: "",
    donorEmail: "",
    message: "",
    payslipFile: null,
    donorPhotoFile: null,
  };
  payslipPreview.value = null;
  photoPreview.value = null;
  donationFormDialog.value = false;
};

const submitDonation = () => {
  if (donationForm.value.donorName && donationForm.value.donorPhone) {
    // Add donations to selected projects
    Object.keys(selectedProjects.value).forEach((projectId) => {
      const project = projects.value.find((p) => p.id === parseInt(projectId));
      if (project) {
        project.donations.push({
          name: donationForm.value.donorName,
          amount: parseFloat(selectedProjects.value[projectId].amount),
        });
      }
    });

    alert("🎉 Donation submitted successfully! Thank you for your generosity!");
    closeDonationForm();
  }
};
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.bg-gradient-to-r {
  background: linear-gradient(
    to right,
    var(--v-theme-blue),
    var(--v-theme-pink)
  );
}

.from-blue {
  --v-theme-blue: #2196f3;
}

.to-pink {
  --v-theme-pink: #e91e63;
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bg-gradient-to-t {
  background: linear-gradient(to top, var(--from-color), var(--to-color));
}

.from-black-alpha-30 {
  --from-color: rgba(0, 0, 0, 0.3);
}

.to-transparent {
  --to-color: transparent;
}

.w-100 {
  width: 100%;
}
</style>
