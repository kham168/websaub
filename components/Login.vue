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
        <!-- Username -->
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

        <!-- Password -->
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
            (v) =>
              (v && v.length >= 6) || 'Password must be at least 6 characters',
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

    <!-- Submit Button -->
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
        <v-icon left>mdi-login</v-icon>
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useLogin } from "@/composables/useLogin";
import { useRouter } from "vue-router";

// Props & Emits
const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue", "login-success"]);

// Router
const router = useRouter();

// Composable
const { login, loading: loginLoading, error } = useLogin();

// Form
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

// Close dialog
const closeLoginDialog = () => {
  emit("update:modelValue", false);
};

// Submit Login
const handleSubmit = async () => {
  const isValid = await loginForm.value.validate();
  if (!isValid) return;

  // Clear previous errors
  telError.value = "";
  passwordError.value = "";

  const success = await login({
    tel: loginData.value.tel,
    password: loginData.value.password,
  });

  console.log("Login successful", success);

  if (success) {
    emit("login-success");
    closeLoginDialog();
    router.push("/admin");
  } else {
    // Check if the error object has specific error information
    if (error.value) {
      const errorData = error.value.data || error.value;

      // Check for specific error types from backend
      if (
        errorData.field === "tel" ||
        errorData.message?.includes("tel") ||
        errorData.message?.includes("Tel")
      ) {
        telError.value = errorData.message || "Tel number not found";
      } else if (
        errorData.field === "password" ||
        errorData.message?.includes("password") ||
        errorData.message?.includes("Password")
      ) {
        passwordError.value = errorData.message || "Incorrect password";
      } else {
        // If tel is correct but password is wrong, show password error only
        passwordError.value = "Incorrect password";
      }
    } else {
      // Default: assume password is incorrect (most common case)
      passwordError.value = "Incorrect password";
    }
  }
};
</script>

<style scoped>
.login-card {
  overflow: hidden;
}

.bg-gradient-login {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.bg-gradient-login::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 70%
  );
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.3s ease-in;
}

.loading-text {
  color: #667eea;
  font-size: 18px;
  font-weight: 600;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}
</style>
