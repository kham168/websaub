<template>
  <v-dialog v-model="internalDialog" max-width="750px" scrollable>
    <v-card rounded="xl">
      <v-sheet class="position-relative overflow-hidden" rounded="t-xl">
        <div class="pa-0">
          <v-img
            :src="selectedProject?.image"
            :height="$vuetify.display.xs ? 200 : $vuetify.display.sm ? 250 : 300"
            cover
          />
        </div>
      </v-sheet>

      <v-card-text class="pa-4 pa-sm-6 pa-md-8">
        <div class="mb-5">
          <h2 class="text-h5 text-md-h4 font-weight-bold mb-2">
            {{ selectedProject?.title }}
          </h2>
          <p class="text-body-1 text-grey-darken-1">
            {{ selectedProject?.description }}
          </p>
        </div>

        <v-card variant="outlined" rounded="lg" class="mb-6">
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <div class="d-flex align-center">
                  <v-icon color="pink" class="mr-2">mdi-calendar-start</v-icon>
                  <div>
                    <div class="text-caption text-grey">Start Date</div>
                    <div class="text-body-2 font-weight-medium">
                      {{ formatDate(selectedProject?.startDate) }}
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="d-flex align-center">
                  <v-icon color="pink" class="mr-2">mdi-calendar-end</v-icon>
                  <div>
                    <div class="text-caption text-grey">Expiry Date</div>
                    <div class="text-body-2 font-weight-medium">
                      {{ formatDate(selectedProject?.expiryDate) }}
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-row dense class="mb-6">
          <v-col cols="6">
            <v-card variant="outlined" rounded="lg" color="pink-lighten-5">
              <v-card-text class="text-center pa-3">
                <div class="text-h5 font-weight-bold text-pink">
                  {{ formatCurrency(totalAmount(selectedProject)) }}
                </div>
                <div class="text-caption text-grey">Total Raised</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card variant="outlined" rounded="lg" color="pink-lighten-5">
              <v-card-text class="text-center pa-3">
                <div class="text-h5 font-weight-bold text-pink">
                  {{ selectedProject?.donations?.length ?? 0 }}
                </div>
                <div class="text-caption text-grey">Donors</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <div>
          <div class="d-flex align-center mb-4">
            <v-icon size="20" color="pink" class="mr-2">mdi-heart-multiple</v-icon>
            <h3 class="font-weight-bold">Recent Donations</h3>
          </div>
          <v-sheet v-if="selectedProject?.donations?.length" max-height="300" class="overflow-y-auto">
             <v-card v-for="(donation, idx) in selectedProject?.donations" :key="idx" rounded="lg" class="mb-3" variant="outlined">
               <v-card-text class="pa-3">
                 <div class="d-flex align-center">
                   <v-avatar size="40" color="blue-lighten-4" class="mr-3">{{ getDonorInitials(donation.name) }}</v-avatar>
                   <div class="flex-grow-1">
                     <div class="text-subtitle-2 font-weight-bold">{{ donation.name }}</div>
                   </div>
                   <div class="font-weight-bold text-pink">{{ formatCurrency(donation.amount) }}</div>
                 </div>
               </v-card-text>
             </v-card>
          </v-sheet>
        </div>
      </v-card-text>

      <v-divider />
      <v-card-actions class="pa-4 bg-grey-lighten-5">
        <v-spacer />
        <v-btn
          variant="tonal"
          color="grey-darken-1"
          rounded="lg"
          class="px-6"
          @click="closeDialog"
        >
          Close
        </v-btn>
       
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  selectedProject: Object,
});

const emit = defineEmits(["update:modelValue"]);

// internal state
const internalDialog = ref(false);

watch(
  () => props.modelValue,
  (val) => {
    internalDialog.value = val;
  }
);

watch(internalDialog, (val) => {
  emit("update:modelValue", val);
});

// Close Function
const closeDialog = () => {
  internalDialog.value = false;
};

// Format Helpers
function formatDate(date) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-US");
}
function formatCurrency(value) {
  return "$" + Number(value || 0).toLocaleString();
}
function totalAmount(project) {
  return project?.donations?.reduce((s, d) => s + d.amount, 0) || 0;
}
function getProgressPercent(project) {
  if (!project?.goal) return 0;
  return Math.min(100, Math.floor((totalAmount(project) / project.goal) * 100));
}
function getDonorInitials(name) {
  return name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    ?.toUpperCase();
}
</script>
