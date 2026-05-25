<template>
    <v-container fluid class="pa-0 pa-sm-4 min-height-screen">
      <v-row justify="center" align="start" class="ma-0">
        <v-col cols="12" sm="10" md="7" lg="6" class="pa-0 pa-sm-3">
  
          <!-- Top App Bar -->
          <v-toolbar flat color="deep-purple-darken-4">
            <v-btn icon @click="$router.back()">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title class="text-white font-weight-bold">
              Member Registration
            </v-toolbar-title>
          </v-toolbar>
  
          <v-card :rounded="$vuetify.display.smAndUp ? 'xl' : '0'" elevation="4">
  
            <!-- Header Banner -->
            <v-sheet class="text-center pa-6 bg-deep-purple-darken-4">
              <v-icon size="44" color="purple-lighten-3" class="mb-2">mdi-account-plus</v-icon>
              <div class="text-h6 font-weight-bold text-white">Create Your Account</div>
              <div class="text-body-2 text-purple-lighten-3 mt-1">
                Fill in your details to register
              </div>
            </v-sheet>
  
            <v-divider />
  
            <v-card-text class="pa-4 pa-sm-6">
              <v-form ref="formRef" @submit.prevent="handleSubmit">
                <v-row dense>
  
                  <!-- First Name -->
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.firstName"
                      label="First Name"
                      placeholder="e.g. Somchai"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-account"
                      :rules="[required]"
                      color="deep-purple"
                    />
                  </v-col>
  
                  <!-- Surname -->
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.surname"
                      label="Surname"
                      placeholder="e.g. Bounmy"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-account-outline"
                      :rules="[required]"
                      color="deep-purple"
                    />
                  </v-col>
  
                  <!-- Tel -->
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.tel"
                      label="Phone Number"
                      placeholder="20########"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-phone"
                      :rules="[required]"
                      color="deep-purple"
                      type="tel"
                      inputmode="numeric"
                    />
                  </v-col>
  
                  <!-- Province -->
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.province"
                      label="Province"
                      placeholder="e.g. Vientiane"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-map-marker"
                      :rules="[required]"
                      color="deep-purple"
                    />
                  </v-col>
  
                  <!-- District -->
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.district"
                      label="District"
                      placeholder="e.g. Chanthabouli"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-map-marker-radius"
                      :rules="[required]"
                      color="deep-purple"
                    />
                  </v-col>
  
                  <!-- Village -->
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.village"
                      label="Village"
                      placeholder="e.g. Ban Phonxay"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-home-city"
                      :rules="[required]"
                      color="deep-purple"
                    />
                  </v-col>
  
                  <!-- Subscribe Section -->
                  <v-col cols="12">
                    <v-sheet rounded="lg" border class="pa-4">
  
                      <div class="text-caption text-medium-emphasis font-weight-bold text-uppercase mb-3">
                        <v-icon size="14" class="mr-1">mdi-bell</v-icon>
                        Subscribe to
                      </div>
  
                      <!-- Toggle full width on mobile -->
                      <v-btn-toggle
                        v-model="form.subscribeType"
                        mandatory
                        variant="outlined"
                        divided
                        rounded="lg"
                        color="deep-purple"
                        class="mb-4 w-100"
                      >
                        <v-btn value="tiktok" size="small" class="flex-grow-1">
                          <v-icon start size="16">mdi-music-note</v-icon>
                          TikTok
                        </v-btn>
                        <v-btn value="facebook" size="small" class="flex-grow-1">
                          <v-icon start size="16">mdi-facebook</v-icon>
                          Facebook
                        </v-btn>
                        <v-btn value="both" size="small" class="flex-grow-1">
                          <v-icon start size="16">mdi-star</v-icon>
                          Both
                        </v-btn>
                      </v-btn-toggle>
  
                      <!-- TikTok Field -->
                      <v-expand-transition>
                        <div v-if="showTiktok">
                          <v-text-field
                            v-model="form.tiktok"
                            label="TikTok Username"
                            placeholder="your_tiktok"
                            variant="outlined"
                            density="comfortable"
                            prepend-inner-icon="mdi-music-note"
                            prefix="@"
                            color="pink"
                            class="mb-2"
                            :rules="showTiktok ? [required] : []"
                          />
                        </div>
                      </v-expand-transition>
  
                      <!-- Facebook Field -->
                      <v-expand-transition>
                        <div v-if="showFacebook">
                          <v-text-field
                            v-model="form.facebook"
                            label="Facebook Page / Profile"
                            placeholder="yourpage"
                            variant="outlined"
                            density="comfortable"
                            prepend-inner-icon="mdi-facebook"
                            prefix="fb.com/"
                            color="blue"
                            :rules="showFacebook ? [required] : []"
                          />
                        </div>
                      </v-expand-transition>
  
                    </v-sheet>
                  </v-col>
  
                  <!-- Submit -->
                  <v-col cols="12">
                    <v-btn
                      type="submit"
                      block
                      size="large"
                      color="deep-purple"
                      variant="elevated"
                      rounded="lg"
                      append-icon="mdi-check-circle"
                      :loading="loading"
                      class="mt-1"
                    >
                      Confirm Registration
                    </v-btn>
                  </v-col>
  
                </v-row>
              </v-form>
            </v-card-text>
  
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Success Snackbar -->
      <v-snackbar
        v-model="submitted"
        color="success"
        location="bottom center"
        rounded="lg"
        :timeout="4000"
      >
        <v-icon start>mdi-check-circle</v-icon>
        Registration submitted successfully!
        <template #actions>
          <v-btn variant="text" @click="submitted = false">Close</v-btn>
        </template>
      </v-snackbar>
  
    </v-container>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const formRef = ref(null)
  const submitted = ref(false)
  const loading = ref(false)
  
  const form = ref({
    firstName: '',
    surname: '',
    tel: '',
    province: '',
    district: '',
    village: '',
    subscribeType: 'tiktok',
    tiktok: '',
    facebook: '',
  })
  
  const required = (v) => !!v || 'This field is required'
  
  const showTiktok = computed(() =>
    form.value.subscribeType === 'tiktok' || form.value.subscribeType === 'both'
  )
  const showFacebook = computed(() =>
    form.value.subscribeType === 'facebook' || form.value.subscribeType === 'both'
  )
  
  async function handleSubmit() {
    const { valid } = await formRef.value.validate()
    if (!valid) return
  
    loading.value = true
    await new Promise((r) => setTimeout(r, 800))
    loading.value = false
  
    console.log('Form submitted:', form.value)
    submitted.value = true
  }
  </script>
  
  <style scoped>
  .min-height-screen {
    min-height: 100dvh;
  }
  </style>