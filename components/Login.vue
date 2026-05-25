<template>
  <v-card rounded="xl" elevation="24" class="login-card">
    <!-- Beautiful Loading Overlay -->
    <v-overlay
      :model-value="loginLoading"
      contained
      class="align-center justify-center loading-overlay"
      persistent
    >
      <div class="loading-container">
        <v-progress-circular
          color="primary"
          size="80"
          width="6"
          indeterminate
        ></v-progress-circular>
        <div class="loading-text mt-4">Logging in...</div>
      </div>
    </v-overlay>

    <!-- Header -->
    <v-card-title
      class="bg-gradient-login text-white d-flex align-center justify-center py-8 position-relative"
    >
      <div class="text-center">
        <v-icon size="64" class="mb-2">mdi-account-circle</v-icon>
        <div class="text-h5 font-weight-bold">Welcome Back</div>
        <div class="text-caption mt-1 text-grey-lighten-3">
          Login to your account
        </div>
      </div>

      <!-- CLOSE BUTTON -->
      <v-btn
        icon
        size="small"
        variant="text"
        class="position-absolute"
        style="top: 10px; right: 10px"
        @click="closeLoginDialog"
      >
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <!-- FORM -->
    <v-card-text class="px-8 py-6">
      <v-form ref="loginForm" v-model="loginFormValid">
        <v-text-field
          v-model="loginData.tel"
          label="tel *"
          placeholder="Enter your tel"
          variant="outlined"
          prepend-inner-icon="mdi-account"
          color="primary"
          density="comfortable"
          class="mb-3"
          :rules="[(v) => !!v || 'tel is required']"
          :error-messages="telError"
          @input="telError = ''"
        />

        <v-text-field
          v-model="loginData.password"
          label="Password *"
          placeholder="Enter your password"
          variant="outlined"
          prepend-inner-icon="mdi-lock"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          color="primary"
          density="comfortable"
          class="mb-3"
          :rules="[
            (v) => !!v || 'Password is required',
            (v) => (v && v.length >= 6) || 'At least 6 characters',
          ]"
          :error-messages="passwordError"
          @click:append-inner="showPassword = !showPassword"
          @input="passwordError = ''"
        />

        <div class="d-flex justify-space-between align-center mb-4">
          <v-checkbox
            v-model="loginData.rememberMe"
            label="Remember me"
            color="primary"
            density="compact"
            hide-details
          />
        </div>
      </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="pa-6">
      <v-btn
        color="primary"
        variant="flat"
        size="x-large"
        block
        :disabled="!loginFormValid || loginLoading"
        :loading="loginLoading"
        @click="handleSubmit"
        class="text-none font-weight-bold submit-btn"
      >
        <v-icon left class="mr-2">mdi-login</v-icon>
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
// Ensure this path is correct for your project structure
import { useLogin } from "@/composables/useLogin";

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue", "login-success"]);

const router = useRouter();
const { login, loading: loginLoading, error } = useLogin();

const loginFormValid = ref(false);
const loginForm = ref(null);
const showPassword = ref(false);
const telError = ref("");
const passwordError = ref("");

const loginData = ref({
  tel: "",
  password: "",
  rememberMe: false,
});

// FIXED: Sends signal to parent to close dialog
const closeLoginDialog = () => {
  emit("update:modelValue", false);
};

const handleSubmit = async () => {
  const { valid } = await loginForm.value.validate();
  if (!valid) return;

  telError.value = "";
  passwordError.value = "";

  const success = await login({
    tel: loginData.value.tel,
    password: loginData.value.password,
  });

  if (success) {
    emit("login-success");
    closeLoginDialog(); // Close on success
    router.push("/admin");
  } else {
    // Error logic
    if (error.value) {
      const errorData = error.value.data || error.value;
      if (errorData.message?.toLowerCase().includes("tel")) {
        telError.value = "Tel number not found";
      } else {
        passwordError.value = "Incorrect password";
      }
    } else {
      passwordError.value = "Incorrect password";
    }
  }
};
</script>

<style scoped>
.login-card { overflow: hidden; }
.bg-gradient-login {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}
.submit-btn {
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}
.loading-overlay {
  backdrop-filter: blur(4px);
  background-color: rgba(255, 255, 255, 0.9) !important;
}
.loading-text {
  color: #667eea;
  font-size: 18px;
  font-weight: 600;
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
</style>