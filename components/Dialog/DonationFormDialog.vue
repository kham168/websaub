<template>
  <v-dialog
    :model-value="modelValue"
    max-width="700px"
    scrollable
    @update:model-value="handleDialogUpdate"
  >
    <v-card rounded="xl" class="overflow-hidden">
      <template v-if="stepLocal === 1">
        <v-card-title class="pa-0">
          <v-sheet class="bg-gradient-to-r from-blue to-pink pa-2 w-100 position-relative">
            <div class="d-flex align-center justify-space-between">
              <div>
                <h2 class="text-h6 text-white font-weight-bold mb-1">
                  Select Donation Projects
                </h2>
                <p class="text-white text-body-2 ma-0">
                  Choose projects to support
                </p>
              </div>
              <v-btn
                icon="mdi-close"
                variant="flat"
                size="small"
                class="close-btn-glass"
                @click="handleClose"
              />
            </div>
          </v-sheet>
        </v-card-title>

        <v-sheet class="pa-6 bg-grey-lighten-4">
          <div class="d-flex align-center justify-center gap-4">
            <div class="d-flex flex-column align-center">
              <v-avatar color="blue" size="40" class="font-weight-bold text-white mb-1">1</v-avatar>
              <span class="text-blue font-weight-bold text-caption">Select</span>
            </div>
            <div class="flex-grow-1" style="height: 2px; background: #90caf9"></div>
            <div class="d-flex flex-column align-center">
              <v-avatar color="grey-lighten-1" size="40" class="font-weight-bold text-grey-darken-1 mb-1">2</v-avatar>
              <span class="text-grey text-caption">Payment</span>
            </div>
          </div>
        </v-sheet>

        <v-card-text class="pa-6">
          <h4 class="text-subtitle-1 font-weight-bold mb-4">
            <v-icon size="20" color="pink" class="mr-2">mdi-format-list-checks</v-icon>
            Select Projects & Enter Amounts
          </h4>

          <div class="mb-6">
            <v-card
              v-for="project in projects"
              :key="project.id"
              :variant="selectedProjects[project.id] ? 'elevated' : 'outlined'"
              rounded="lg"
              class="project-card mb-3 transition-all"
              :class="{ 'selected-project': selectedProjects[project.id], 'elevation-4': selectedProjects[project.id] }"
            >
              <v-card-text class="pa-4">
                <div class="d-flex align-start">
                  <v-checkbox
                    :model-value="!!selectedProjects[project.id]"
                    color="pink"
                    hide-details
                    class="mt-0 flex-shrink-0"
                    @update:model-value="toggleProject(project.id)"
                  />
                  <div class="flex-grow-1 cursor-pointer ml-2" @click="toggleProject(project.id)">
                    <div class="d-flex align-center mb-1">
                      <v-avatar :size="40" rounded="lg" class="mr-3">
                        <v-img :src="project.image" cover />
                      </v-avatar>
                      <div>
                        <h3 class="text-subtitle-2 font-weight-bold mb-0">{{ project.title }}</h3>
                        <p class="text-caption text-grey ma-0">Goal: {{ formatCurrency(project.goal) }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <v-expand-transition>
                  <div v-if="selectedProjects[project.id]" class="mt-3 ml-13">
                    <v-text-field
                      :model-value="selectedProjects[project.id].amount"
                      type="number"
                      label="Enter Amount"
                      variant="outlined"
                      density="comfortable"
                      color="pink"
                      prefix="$"
                      hide-details
                      @update:model-value="updateProjectAmount(project.id, $event)"
                      @click.stop
                    />
                  </div>
                </v-expand-transition>
              </v-card-text>
            </v-card>
          </div>

          <v-expand-transition>
            <v-card v-if="getSelectedCount() > 0" class="bg-summary mb-4" rounded="lg" elevation="2">
              <v-card-text class="pa-4">
                <div class="d-flex justify-space-between align-center">
                  <span class="text-h6 font-weight-bold">Total Amount:</span>
                  <span class="text-h5 font-weight-bold text-pink">{{ formatCurrency(getTotalAmount()) }}</span>
                </div>
              </v-card-text>
            </v-card>
          </v-expand-transition>
        </v-card-text>

        <v-divider />
        <v-card-actions class="pa-6">
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-btn variant="outlined" color="grey-darken-1" rounded="lg" size="large" block @click="handleClose">Cancel</v-btn>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn :disabled="!canProceedComputed" class="bg-gradient-to-r from-blue to-pink text-white" rounded="lg" size="large" block @click="nextStep">NEXT</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </template>

      <template v-if="stepLocal === 2">
        <v-card-title class="pa-0">
          <v-sheet class="bg-gradient-to-r from-blue to-pink pa-6 w-100 position-relative">
            <div class="d-flex align-center justify-space-between">
              <div>
                <h2 class="text-h5 text-white font-weight-bold mb-1">Complete Donation</h2>
                <p class="text-white text-body-2 ma-0">Total: {{ formatCurrency(getTotalAmount()) }}</p>
              </div>
              <v-btn icon="mdi-close" variant="flat" size="small" class="close-btn-glass" @click="handleClose" />
            </div>
          </v-sheet>
        </v-card-title>

        <v-sheet class="pa-6 bg-grey-lighten-4">
          <div class="d-flex align-center justify-center gap-4">
            <div class="d-flex flex-column align-center">
              <v-avatar color="blue" size="40" class="text-white mb-1">1</v-avatar>
              <span class="text-blue text-caption">Select</span>
            </div>
            <div class="flex-grow-1" style="height: 2px; background: #2196f3"></div>
            <div class="d-flex flex-column align-center">
              <v-avatar color="blue" size="40" class="text-white mb-1">2</v-avatar>
              <span class="text-blue font-weight-bold text-caption">Payment</span>
            </div>
          </div>
        </v-sheet>

        <v-card-text class="pa-6">
          <v-card variant="outlined" rounded="lg" class="mb-6 bg-grey-lighten-4 text-center pa-6">
            <v-icon size="64" color="pink" class="mb-3">mdi-qrcode</v-icon>
            <h3 class="text-h6 font-weight-bold mb-2">Payment Information</h3>
            <div class="text-left mt-4">
              <p class="text-caption text-grey mb-1">Account Number</p>
              <p class="text-body-1 font-weight-bold font-mono">02076 123456</p>
            </div>
          </v-card>

          <div class="mb-6">
            <h4 class="text-subtitle-1 font-weight-bold mb-4">Your Information</h4>
            <v-text-field v-model="donationForm.donorPhone" label="Phone Number *" variant="outlined" rounded="lg" color="pink" class="mb-4" />
            <v-text-field v-model="donationForm.donorName" label="Full Name *" variant="outlined" rounded="lg" color="pink" class="mb-4" />
            <v-textarea v-model="donationForm.message" label="Message (Optional)" variant="outlined" rounded="lg" color="pink" rows="3" />
          </div>

          <v-row dense>
            <v-col cols="6">
              <v-card variant="outlined" rounded="lg" class="pa-4 text-center cursor-pointer" @click="$refs.payslipInput.click()">
                <input ref="payslipInput" type="file" class="d-none" @change="handlePayslipUpload" />
                <v-icon size="32" color="grey">{{ payslipPreview ? 'mdi-check-circle' : 'mdi-file-document' }}</v-icon>
                <p class="text-caption mt-1">Payslip</p>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card variant="outlined" rounded="lg" class="pa-4 text-center cursor-pointer" @click="$refs.photoInput.click()">
                <input ref="photoInput" type="file" class="d-none" @change="handlePhotoUpload" />
                <v-icon size="32" color="grey">{{ photoPreview ? 'mdi-check-circle' : 'mdi-camera' }}</v-icon>
                <p class="text-caption mt-1">Photo</p>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider />
        <v-card-actions class="pa-6">
          <v-row dense>
            <v-col cols="6"><v-btn variant="outlined" block rounded="lg" size="large" @click="prevStep">Back</v-btn></v-col>
            <v-col cols="6"><v-btn :disabled="!donationForm.donorName || !donationForm.donorPhone" class="bg-gradient-to-r from-blue to-pink text-white" block rounded="lg" size="large" @click="submitDonation">Complete</v-btn></v-col>
          </v-row>
        </v-card-actions>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  modelValue: Boolean,
  projects: Array,
  selectedProjects: Object,
  payslipPreview: String,
  photoPreview: String,
  donationForm: Object,
  step: Number,
});

const emit = defineEmits([
  "update:modelValue", "update:step", "toggle-project", "update-project-amount",
  "handle-payslip-upload", "remove-payslip", "handle-photo-upload", "remove-photo",
  "submit-donation", "close-donation-form"
]);

const stepLocal = ref(props.step);
watch(() => props.step, (val) => stepLocal.value = val);

const totalAmount = computed(() => {
  return Object.values(props.selectedProjects).reduce((t, p) => t + (parseFloat(p?.amount) || 0), 0);
});

const canProceedComputed = computed(() => totalAmount.value > 0);
const handleDialogUpdate = (val) => emit("update:modelValue", val);
const handleClose = () => { emit("close-donation-form"); stepLocal.value = 1; };
const nextStep = () => { stepLocal.value = 2; emit("update:step", 2); };
const prevStep = () => { stepLocal.value = 1; emit("update:step", 1); };

const toggleProject = (id) => emit("toggle-project", id);
const updateProjectAmount = (id, amt) => emit("update-project-amount", { projectId: id, amount: amt });
const handlePayslipUpload = (e) => emit("handle-payslip-upload", e);
const handlePhotoUpload = (e) => emit("handle-photo-upload", e);
const submitDonation = () => emit("submit-donation");

const formatCurrency = (amt) => "$" + Number(amt).toLocaleString();
const getSelectedCount = () => Object.keys(props.selectedProjects).length;
const getTotalAmount = () => totalAmount.value;
</script>

<style scoped>
.bg-gradient-to-r {
  background: linear-gradient(to right, #2196f3, #e91e63);
}

.close-btn-glass {
  background-color: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.close-btn-glass:hover {
  background-color: rgba(255, 255, 255, 0.4) !important;
  transform: rotate(90deg);
}

.selected-project {
  border-color: #ec407a !important;
  background-color: #fce4ec !important;
}

.bg-summary {
  background: linear-gradient(to right, #fce4ec, #e3f2fd);
}

.font-mono {
  font-family: 'Courier New', monospace;
}

.cursor-pointer {
  cursor: pointer;
}
</style>