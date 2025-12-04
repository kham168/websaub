<!-- components/Dialog/DonationFormDialog.vue -->
<template>
  <v-dialog
    :model-value="modelValue"
    max-width="700px"
    scrollable
    @update:model-value="handleDialogUpdate"
  >
    <v-card rounded="xl">
      <!-- STEP 1: Project Selection -->
      <template v-if="stepLocal === 1">
        <!-- Header -->
        <v-card-title class="pa-0">
          <v-sheet class="bg-gradient-to-r from-blue to-pink pa-6 w-100">
            <div class="d-flex align-center justify-space-between">
              <div>
                <h2 class="text-h5 text-white font-weight-bold mb-1">
                  Select Donation Projects
                </h2>
                <p class="text-white text-body-2 ma-0">
                  Choose projects to support
                </p>
              </div>
              <v-btn
                icon="mdi-close"
                variant="text"
                color="white"
                @click="handleClose"
              />
            </div>
          </v-sheet>
        </v-card-title>

        <!-- Step Indicator -->
        <v-sheet class="pa-6 bg-grey-lighten-4">
          <div class="d-flex align-center justify-center gap-4">
            <div class="d-flex flex-column align-center">
              <v-avatar
                color="blue"
                size="40"
                class="font-weight-bold text-white mb-1"
              >
                1
              </v-avatar>
              <span class="text-blue font-weight-bold text-caption">
                Select
              </span>
            </div>
            <div
              class="flex-grow-1"
              style="height: 2px; background: #90caf9"
            ></div>
            <div class="d-flex flex-column align-center">
              <v-avatar
                color="grey-lighten-1"
                size="40"
                class="font-weight-bold text-grey-darken-1 mb-1"
              >
                2
              </v-avatar>
              <span class="text-grey text-caption">Payment</span>
            </div>
          </div>
        </v-sheet>

        <!-- Content -->
        <v-card-text class="pa-6">
          <h4 class="text-subtitle-1 font-weight-bold mb-4">
            <v-icon size="20" color="pink" class="mr-2">
              mdi-format-list-checks
            </v-icon>
            Select Projects & Enter Amounts
          </h4>

          <!-- Projects List -->
          <div class="mb-6">
            <v-card
              v-for="project in projects"
              :key="project.id"
              :variant="selectedProjects[project.id] ? 'elevated' : 'outlined'"
              rounded="lg"
              class="project-card mb-3 transition-all"
              :class="{
                'selected-project': selectedProjects[project.id],
                'elevation-4': selectedProjects[project.id],
              }"
            >
              <v-card-text class="pa-4">
                <div class="d-flex align-start">
                  <!-- Checkbox -->
                  <v-checkbox
                    :model-value="!!selectedProjects[project.id]"
                    color="pink"
                    hide-details
                    class="mt-0 flex-shrink-0"
                    @update:model-value="toggleProject(project.id)"
                  />

                  <!-- Project Info -->
                  <div
                    class="flex-grow-1 cursor-pointer ml-2"
                    @click="toggleProject(project.id)"
                  >
                    <div class="d-flex align-center mb-1">
                      <v-avatar :size="40" rounded="lg" class="mr-3">
                        <v-img :src="project.image" cover />
                      </v-avatar>
                      <div>
                        <h3 class="text-subtitle-2 font-weight-bold mb-0">
                          {{ project.title }}
                        </h3>
                        <p class="text-caption text-grey ma-0">
                          Goal: {{ formatCurrency(project.goal) }}
                        </p>
                      </div>
                    </div>
                    <p class="text-caption text-grey ml-13 mb-0">
                      {{ project.description }}
                    </p>
                  </div>
                </div>

                <!-- Amount Input (shown when selected) -->
                <v-expand-transition>
                  <div v-if="selectedProjects[project.id]" class="mt-3 ml-13">
                    <v-text-field
                      :model-value="selectedProjects[project.id].amount"
                      type="number"
                      label="Enter Amount"
                      placeholder="0.00"
                      variant="outlined"
                      density="comfortable"
                      color="pink"
                      prefix="$"
                      hide-details
                      @update:model-value="
                        updateProjectAmount(project.id, $event)
                      "
                      @click.stop
                    >
                      <template v-slot:append-inner>
                        <v-icon color="pink">mdi-currency-usd</v-icon>
                      </template>
                    </v-text-field>
                  </div>
                </v-expand-transition>
              </v-card-text>
            </v-card>
          </div>

          <!-- Summary Card -->
          <v-expand-transition>
            <v-card
              v-if="getSelectedCount() > 0"
              class="bg-gradient-to-r from-pink-lighten-5 to-blue-lighten-5 mb-4"
              rounded="lg"
              elevation="2"
            >
              <v-card-text class="pa-4">
                <div class="d-flex justify-space-between align-center mb-3">
                  <div class="d-flex align-center">
                    <v-icon size="20" color="pink" class="mr-2">
                      mdi-file-document-check
                    </v-icon>
                    <span class="text-body-2 font-weight-bold">
                      {{ getSelectedCount() }} Project(s) Selected
                    </span>
                  </div>
                </div>
                <v-divider class="mb-3" />
                <div class="d-flex justify-space-between align-center">
                  <span class="text-h6 font-weight-bold">Total Amount:</span>
                  <span class="text-h5 font-weight-bold text-pink">
                    {{ formatCurrency(getTotalAmount()) }}
                  </span>
                </div>
              </v-card-text>
            </v-card>
          </v-expand-transition>
        </v-card-text>

        <!-- Actions -->
        <v-divider />
        <v-card-actions class="pa-6">
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-btn
                variant="outlined"
                color="grey-darken-1"
                rounded="lg"
                size="large"
                block
                @click="handleClose"
              >
                <v-icon start>mdi-close</v-icon>
                Cancel
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn
                :disabled="!canProceedComputed"
                class="bg-gradient-to-r from-blue to-pink"
                rounded="lg"
                size="large"
                block
                elevation="4"
                @click="nextStep"
              >
                <v-icon start color="white">mdi-chevron-right</v-icon>
                <span class="text-white font-weight-bold">NEXT</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </template>

      <!-- STEP 2: Payment Details -->
      <template v-if="stepLocal === 2">
        <!-- Header -->
        <v-card-title class="pa-0">
          <v-sheet class="bg-gradient-to-r from-blue to-pink pa-6 w-100">
            <div class="d-flex align-center justify-space-between">
              <div>
                <h2 class="text-h5 text-white font-weight-bold mb-1">
                  Complete Your Donation
                </h2>
                <p class="text-white text-body-2 ma-0">
                  Total: {{ formatCurrency(getTotalAmount()) }}
                </p>
              </div>
              <v-btn
                icon="mdi-close"
                variant="text"
                color="white"
                @click="handleClose"
              />
            </div>
          </v-sheet>
        </v-card-title>

        <!-- Step Indicator -->
        <v-sheet class="pa-6 bg-grey-lighten-4">
          <div class="d-flex align-center justify-center gap-4">
            <div class="d-flex flex-column align-center">
              <v-avatar
                color="blue"
                size="40"
                class="font-weight-bold text-white mb-1"
              >
                1
              </v-avatar>
              <span class="text-blue text-caption">Select</span>
            </div>
            <div
              class="flex-grow-1"
              style="height: 2px; background: #90caf9"
            ></div>
            <div class="d-flex flex-column align-center">
              <v-avatar
                color="blue"
                size="40"
                class="font-weight-bold text-white mb-1"
              >
                2
              </v-avatar>
              <span class="text-blue font-weight-bold text-caption">
                Payment
              </span>
            </div>
          </div>
        </v-sheet>

        <!-- Content -->
        <v-card-text class="pa-6">
          <!-- QR Code & Account Info Section -->
          <v-card
            variant="outlined"
            rounded="lg"
            class="mb-6 bg-grey-lighten-4"
          >
            <v-card-text class="pa-6 text-center">
              <v-icon size="64" color="pink" class="mb-3">mdi-qrcode</v-icon>
              <h3 class="text-h6 font-weight-bold mb-2">Payment Information</h3>
              <p class="text-body-2 text-grey mb-4">
                Scan the QR code or use the account details below
              </p>
              <v-divider class="mb-4" />
              <div class="text-left">
                <p class="text-caption text-grey mb-2">Account Number</p>
                <p class="text-body-1 font-weight-bold font-mono mb-4">
                  02076 123456
                </p>
                <p class="text-caption text-grey mb-2">Bank Name</p>
                <p class="text-body-1 font-weight-bold">Community Bank</p>
              </div>
            </v-card-text>
          </v-card>

          <!-- Amount Display -->
          <v-card class="bg-blue-50 mb-6 pa-4" rounded="lg">
            <p class="text-body-2 text-grey mb-2">Donation Amount</p>
            <p class="text-h4 font-weight-bold text-blue">
              {{ formatCurrency(getTotalAmount()) }}
            </p>
          </v-card>

          <v-divider class="mb-6" />

          <!-- Form Section -->
          <div class="mb-6">
            <h4 class="text-subtitle-1 font-weight-bold mb-4">
              <v-icon size="20" color="pink" class="mr-2">mdi-account</v-icon>
              Your Information
            </h4>

            <!-- Phone -->
            <v-text-field
              v-model="donationForm.donorPhone"
              label="Phone Number *"
              placeholder="+1 (555) 000-0000"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              color="pink"
              class="mb-4"
              :rules="[(v) => !!v || 'Phone is required']"
            />

            <!-- Donor Name -->
            <v-text-field
              v-model="donationForm.donorName"
              label="Full Name *"
              placeholder="Your full name"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              color="pink"
              class="mb-4"
              :rules="[(v) => !!v || 'Name is required']"
            />

            <!-- Donor Email -->
            <v-text-field
              v-model="donationForm.donorEmail"
              label="Email Address (Optional)"
              placeholder="your@email.com"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              color="pink"
              class="mb-4"
              type="email"
            />

            <!-- Message -->
            <v-textarea
              v-model="donationForm.message"
              label="Message (Optional)"
              placeholder="Add a message of support..."
              variant="outlined"
              density="comfortable"
              rounded="lg"
              color="pink"
              rows="3"
              class="mb-4"
            />
          </div>

          <!-- File Uploads Section -->
          <div class="mb-6">
            <h4 class="text-subtitle-1 font-weight-bold mb-4">
              <v-icon size="20" color="pink" class="mr-2">
                mdi-file-upload
              </v-icon>
              Upload Documents (Optional)
            </h4>
            <v-row dense>
              <!-- Payslip Upload -->
              <v-col cols="12" sm="6">
                <v-card
                  variant="outlined"
                  rounded="lg"
                  class="pa-4 text-center cursor-pointer hover-card h-100"
                  :class="{ 'border-pink': payslipPreview }"
                  @click="$refs.payslipInput?.click()"
                >
                  <input
                    ref="payslipInput"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    class="d-none"
                    @change="handlePayslipUpload"
                  />
                  <div v-if="!payslipPreview">
                    <v-icon size="48" color="grey-lighten-1" class="mb-2">
                      mdi-file-document
                    </v-icon>
                    <p class="text-body-2 font-weight-bold mb-1">
                      Upload Payslip
                    </p>
                    <p class="text-caption text-grey ma-0">
                      PDF, JPG, PNG (Max 5MB)
                    </p>
                  </div>

                  <!-- Payslip Preview -->
                  <div v-else>
                    <v-img
                      :src="payslipPreview"
                      :height="100"
                      cover
                      rounded="lg"
                      class="mb-2 mx-auto"
                      max-width="200"
                    />
                    <p class="text-caption text-grey mb-2 text-truncate">
                      {{ donationForm.payslipFile?.name }}
                    </p>
                    <v-btn
                      size="small"
                      variant="text"
                      color="red"
                      @click.stop="removePayslip"
                    >
                      <v-icon size="16" start>mdi-close</v-icon>
                      Remove
                    </v-btn>
                  </div>
                </v-card>
              </v-col>

              <!-- Donor Photo Upload -->
              <v-col cols="12" sm="6">
                <v-card
                  variant="outlined"
                  rounded="lg"
                  class="pa-4 text-center cursor-pointer hover-card h-100"
                  :class="{ 'border-pink': photoPreview }"
                  @click="$refs.photoInput?.click()"
                >
                  <input
                    ref="photoInput"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    class="d-none"
                    @change="handlePhotoUpload"
                  />
                  <div v-if="!photoPreview">
                    <v-icon size="48" color="grey-lighten-1" class="mb-2">
                      mdi-camera
                    </v-icon>
                    <p class="text-body-2 font-weight-bold mb-1">
                      Upload Photo
                    </p>
                    <p class="text-caption text-grey ma-0">
                      JPG, PNG (Max 5MB)
                    </p>
                  </div>

                  <!-- Photo Preview -->
                  <div v-else>
                    <v-img
                      :src="photoPreview"
                      :height="100"
                      cover
                      rounded="lg"
                      class="mb-2 mx-auto"
                      max-width="200"
                    />
                    <p class="text-caption text-grey mb-2 text-truncate">
                      {{ donationForm.donorPhotoFile?.name }}
                    </p>
                    <v-btn
                      size="small"
                      variant="text"
                      color="red"
                      @click.stop="removePhoto"
                    >
                      <v-icon size="16" start>mdi-close</v-icon>
                      Remove
                    </v-btn>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-card-text>

        <!-- Actions -->
        <v-divider />
        <v-card-actions class="pa-6">
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-btn
                variant="outlined"
                color="grey-darken-1"
                rounded="lg"
                size="large"
                block
                @click="prevStep"
              >
                <v-icon start>mdi-arrow-left</v-icon>
                Back
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn
                :disabled="!donationForm.donorName || !donationForm.donorPhone"
                class="bg-gradient-to-r from-blue to-pink"
                rounded="lg"
                size="large"
                block
                elevation="4"
                @click="submitDonation"
              >
                <v-icon start color="white">mdi-heart</v-icon>
                <span class="text-white font-weight-bold">
                  Complete Donation
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  projects: {
    type: Array,
    default: () => [],
  },
  selectedProjects: {
    type: Object,
    required: true,
  },
  payslipPreview: {
    type: [String, null],
    default: null,
  },
  photoPreview: {
    type: [String, null],
    default: null,
  },
  donationForm: {
    type: Object,
    required: true,
  },
  step: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits([
  "update:modelValue",
  "update:step",
  "toggle-project",
  "update-project-amount",
  "handle-payslip-upload",
  "remove-payslip",
  "handle-photo-upload",
  "remove-photo",
  "submit-donation",
  "close-donation-form",
]);

// Local step state
const stepLocal = ref(props.step);

// Watch parent step changes
watch(
  () => props.step,
  (newVal) => {
    stepLocal.value = newVal;
  }
);

// Computed properties for reactivity
const totalAmount = computed(() => {
  return Object.values(props.selectedProjects).reduce((total, project) => {
    if (!project) return total;
    return total + (parseFloat(project.amount) || 0);
  }, 0);
});

const selectedCount = computed(() => {
  return Object.keys(props.selectedProjects).length;
});

const canProceedComputed = computed(() => {
  return selectedCount.value > 0 && totalAmount.value > 0;
});

// Dialog update
const handleDialogUpdate = (val) => {
  emit("update:modelValue", val);
};

// Close handler
const handleClose = () => {
  emit("close-donation-form");
  emit("update:modelValue", false);
  stepLocal.value = 1;
};

// Step navigation
const nextStep = () => {
  stepLocal.value = 2;
  emit("update:step", 2);
};

const prevStep = () => {
  stepLocal.value = 1;
  emit("update:step", 1);
};

// Project management
const toggleProject = (projectId) => {
  emit("toggle-project", projectId);
};

const updateProjectAmount = (projectId, amount) => {
  emit("update-project-amount", {
    projectId,
    amount: parseFloat(amount) || 0,
  });
};

// File handlers
const handlePayslipUpload = (event) => {
  emit("handle-payslip-upload", event);
};

const removePayslip = () => {
  emit("remove-payslip");
};

const handlePhotoUpload = (event) => {
  emit("handle-photo-upload", event);
};

const removePhoto = () => {
  emit("remove-photo");
};

// Submission
const submitDonation = () => {
  emit("submit-donation");
};

// Helper functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const getTotalAmount = () => {
  return totalAmount.value;
};

const getSelectedCount = () => {
  return selectedCount.value;
};
</script>

<style scoped>
.selected-project {
  border-color: #ec407a !important;
}

.hover-card {
  transition: all 0.3s ease;
}

.transition-all {
  transition: all 0.3s ease;
}

.cursor-pointer {
  cursor: pointer;
}

.font-mono {
  font-family: "Courier New", monospace;
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

.from-pink-lighten-5 {
  --from-color: #fce4ec;
}

.to-blue-lighten-5 {
  --to-color: #e3f2fd;
}

.bg-blue-50 {
  background-color: #e3f2fd !important;
}

.w-100 {
  width: 100%;
}
</style>
