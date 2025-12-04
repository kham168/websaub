<template>
  <v-dialog v-model="internalDialog" max-width="750px" scrollable>
    <v-card rounded="xl">
      <!-- Image Header -->
       <!-- {{ selectedProject }} -->
      <v-sheet class="position-relative">
        <div class="pl-16 pr-16 pt-16">
          <v-img
            :src="selectedProject?.image"
            :height="$vuetify.display.xs ? 200 : $vuetify.display.sm ? 250 : 300"
            cover
          >
            <!-- <v-sheet class="position-absolute w-100 h-100 bg-gradient-to-b from-black-alpha-20 to-black-alpha-40" /> -->
          </v-img>
        </div>

        <!-- Close Button -->
        <v-btn
          icon="mdi-close"
          size="default"
          variant="flat"
          class="position-absolute"
          style="top: 16px; right: 16px"
          color="rgba(0,0,0,0.6)"
          @click="closeDialog"
        />
      </v-sheet>

      <!-- Content -->
      <v-card-text class="pa-4 pa-sm-6 pa-md-8">
        <!-- Title -->
        <div class="mb-5">
          <h2 class="text-h5 text-md-h4 font-weight-bold mb-2">
            {{ selectedProject?.title }}
          </h2>
          <p class="text-body-1 text-grey-darken-1">
            {{ selectedProject?.description }}
          </p>
        </div>

        <!-- Dates -->
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

        <!-- Stats -->
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

        <!-- Progress -->
        <v-card variant="outlined" rounded="lg" class="mb-6">
          <v-card-text>
            <div class="d-flex justify-space-between mb-2">
              <span class="font-weight-medium">Goal Progress</span>
              <span class="font-weight-bold text-pink">
                {{ getProgressPercent(selectedProject) }}%
              </span>
            </div>

            <v-progress-linear
              rounded
              :model-value="getProgressPercent(selectedProject)"
              color="pink"
              height="10"
            />
          </v-card-text>
        </v-card>

        <!-- Donations List -->
        <div>
          <div class="d-flex align-center mb-4">
            <v-icon size="20" color="pink" class="mr-2">mdi-heart-multiple</v-icon>
            <h3 class="font-weight-bold">
              Recent Donations ({{ selectedProject?.donations?.length ?? 0 }})
            </h3>
          </div>

          <v-sheet
            v-if="selectedProject?.donations?.length"
            max-height="350"
            class="overflow-y-auto"
          >
            <v-card
              v-for="(donation, idx) in selectedProject?.donations"
              :key="idx"
              rounded="lg"
              class="mb-3"
              variant="outlined"
              hover
            >
              <v-card-text>
                <div class="d-flex align-center">
                  <v-avatar size="48" class="bg-blue-lighten-3 mr-3">
                    <span class="text-white font-weight-bold">
                      {{ getDonorInitials(donation.name) }}
                    </span>
                  </v-avatar>

                  <div class="flex-grow-1">
                    <div class="font-weight-bold">{{ donation.name }}</div>
                    <div class="text-caption text-grey">Generous Supporter</div>
                  </div>

                  <div class="font-weight-bold text-pink">
                    {{ formatCurrency(donation.amount) }}
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-sheet>

          <v-card v-else variant="outlined" rounded="lg" class="text-center pa-6">
            <v-icon size="48" color="grey-lighten-1" class="mb-2">
              mdi-heart-outline
            </v-icon>
            <p class="font-weight-medium">No donations yet</p>
            <p class="text-caption text-grey">
              Be the first to support this project.
            </p>
          </v-card>
        </div>
      </v-card-text>

      <!-- FOOTER -->
      <v-divider />
      <v-card-actions class="bg-blue pa-5 d-flex justify-center">
        <span class="text-white font-weight-bold text-h6 mr-2">
          Thank You! Your Support Matters
        </span>
        <v-icon color="#ff6fa8" size="28">mdi-heart</v-icon>
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
