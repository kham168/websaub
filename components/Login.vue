<template>
  <v-card rounded="xl" elevation="24" class="login-card">
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
        <!-- <v-icon color="white">mdi-close</v-icon> -->
      </v-btn>
    </v-card-title>

    <v-card-text class="px-8 py-6">
      <v-form ref="loginForm" v-model="loginFormValid">
        <!-- Register Mode: Full Name -->
        <v-text-field
          v-if="isRegisterMode"
          v-model="loginData.fullName"
          label="Full Name *"
          placeholder="Enter your full name"
          variant="outlined"
          prepend-inner-icon="mdi-account"
          color="primary"
          density="comfortable"
          class="mb-3"
          :rules="[(v) => !!v || 'Full name is required']"
        ></v-text-field>

        <!-- Email/Username -->
        <v-text-field
          v-model="loginData.email"
          label="  username *"
          placeholder="Enter your username "
          variant="outlined"
          prepend-inner-icon="mdi-account"
          color="primary"
          density="comfortable"
          class="mb-3"
          :rules="[(v) => !!v || 'This field is required']"
        ></v-text-field>
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
          @click:append-inner="showPassword = !showPassword"
        ></v-text-field>
        <!-- Login Mode: Remember Me & Forgot Password -->
        <div
          v-if="!isRegisterMode"
          class="d-flex justify-space-between align-center mb-4"
        >
          <v-checkbox
            v-model="loginData.rememberMe"
            label="Remember me"
            color="primary"
            density="compact"
            hide-details
          ></v-checkbox>
          <v-btn
            variant="text"
            color="primary"
            size="small"
            class="text-none"
            @click="forgotPassword"
          >
            Forgot Password?
          </v-btn>
        </div>
      </v-form>
      <!-- Social Login (Login Mode Only) -->
      <div v-if="!isRegisterMode">
        <v-divider class="my-4"></v-divider>
        <div class="text-center text-caption text-grey mb-4">
          Or continue with
        </div>
        <v-row dense>
          <v-col cols="6">
            <v-btn
              variant="outlined"
              block
              prepend-icon="mdi-google"
              color="red"
              class="text-none"
              @click="socialLogin('google')"
            >
              Google
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              variant="outlined"
              block
              prepend-icon="mdi-facebook"
              color="blue"
              class="text-none"
              @click="socialLogin('facebook')"
            >
              Facebook
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="pa-6">
      <v-row dense>
        <v-col cols="12">
          <v-btn
            :color="isRegisterMode ? 'success' : 'primary'"
            variant="flat"
            size="x-large"
            block
            :disabled="!loginFormValid"
            :loading="loginLoading"
            @click="handleSubmit"
            class="text-none font-weight-bold submit-btn"
          >
            <v-icon left> mdi-login </v-icon>
            Login
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

// Props & Emits
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits([
  "update:modelValue",
  "login-success",
  "register-success",
]);

// Form References
const loginForm = ref(null);

// Login Form
const loginFormValid = ref(false);
const loginLoading = ref(false);
const loginData = ref({
  email: "",
  password: "",
  rememberMe: false,
});

const handleSubmit = async () => {
  const token = useCookie("token", {
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  token.value = "123456"; // SAVE TOKEN
  return navigateTo("/admin");
};
</script>

<style scoped>
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

.from-pink {
  --v-theme-pink: #e91e63;
}

.to-purple {
  --v-theme-purple: #9c27b0;
}

.w-100 {
  width: 100%;
}

.gap-3 {
  gap: 1rem;
}

.position-absolute {
  position: absolute;
}

.v-window {
  background: transparent;
}

:deep(.v-window-item) {
  background: transparent;
}
</style>
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
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.login-card :deep(.v-text-field) {
  transition: all 0.3s ease;
}

.login-card :deep(.v-text-field:focus-within) {
  transform: translateY(-2px);
}

.submit-btn {
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}
/* App Bar & Drawer */
.gradient-app-bar {
  background: linear-gradient(to right, #42a5f5, #7e57c2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.gradient-drawer {
  background: linear-gradient(to bottom, #7e57c2, #5e35b1);
}
.gradient-drawer .v-list-item {
  transition: background-color 0.3s ease;
}
.gradient-drawer .v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Video Tutorial Styles */
.video-card {
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}
.video-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15) !important;
}
.video-thumbnail {
  position: relative;
  overflow: hidden;
}
.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.video-card:hover .play-overlay {
  opacity: 1;
}
.play-btn {
  transform: scale(0.8);
  transition: transform 0.3s ease;
}
.video-card:hover .play-btn {
  transform: scale(1);
}

/* Support Dialog Styles */
.support-header {
  background: linear-gradient(135deg, #7b1fa2 0%, #e91e63 100%);
}
.support-qr-section {
  background: linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%);
}
.qr-container {
  background: white;
  border: 2px dashed #e91e63;
}
.heart-pulse {
  animation: heartPulse 1.5s ease-in-out infinite;
}
@keyframes heartPulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
}

/* History Dialog Styles */
.search-section {
  background: linear-gradient(135deg, #ede7f6 0%, #e8eaf6 100%);
}
.order-history-card {
  transition: all 0.2s ease;
  border-left: 4px solid transparent;
}
.order-history-card:hover {
  border-left-color: #7e57c2;
  transform: translateX(4px);
}
.initial-state {
  background: linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%);
}

/* Checkout & WhatsApp Styles */
.bg-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}
.checkout-card {
  border-radius: 16px;
  overflow: hidden;
}
.confirm-btn {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%) !important;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}
.confirm-btn:hover {
  box-shadow: 0 6px 16px rgba(76, 175, 80, 0.4);
  transform: translateY(-2px);
}
.whatsapp-btn {
  background-color: #25d366 !important;
}
.whatsapp-btn:hover {
  background-color: #20ba5a !important;
}
.products-list {
  max-height: 300px;
  overflow-y: auto;
}
.products-list::-webkit-scrollbar {
  width: 6px;
}
.products-list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}
.product-preview-card {
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}
.product-preview-card:hover {
  border-left-color: #25d366;
}
.bg-success-lighten {
  background-color: #e8f5e9 !important;
}

/* Footer */
.v-footer .v-btn {
  transition: all 0.3s ease;
}
.v-footer .v-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* General */
.rounded-circle {
  border-radius: 50%;
}
.center-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}
.elevation-8 {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Responsive */
@media (max-width: 600px) {
  .products-list {
    max-height: 250px;
  }
}

/* Glass card small */
.glass-card-small {
  backdrop-filter: blur(18px);
  background: rgba(255, 255, 255, 0.75);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  animation: fadeUpSmall 0.35s ease;
}

/* Small Header */
.dialog-header-small {
  background: linear-gradient(135deg, #ff7ca9, #ff92c2);
  padding: 14px 18px;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

/* Small Icon */
.header-icon-small {
  font-size: 32px;
  color: white;
}

.section-title-small {
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 8px;
}

/* Small Project Card */
.project-card-small {
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: 0.2s ease;
}
.project-card-small:hover {
  background: #ffe6f0;
}

/* Project text small */
.project-title-small {
  font-size: 14px;
  font-weight: 600;
}
.project-sub-small {
  font-size: 12px;
  color: #666;
}

/* Footer small */
.footer-bar-small {
  padding: 10px 0;
  background: #fff1f7;
}

/* Thank you button small */
.shine-btn-small {
  background: #ff80ab !important;
  color: white !important;
  padding: 0 20px !important;
  text-transform: none;
}

/* Donation list small */
.donation-item-small {
  padding: 6px 0;
}

.no-data-small {
  text-align: center;
  font-size: 13px;
  color: #999;
  padding-top: 8px;
}

/* Animation */
@keyframes fadeUpSmall {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.dialog-card {
  max-height: 80vh;
  overflow-y: auto;
}
.donations-list {
  max-height: 250px;
  overflow-y: auto;
}
/* Login Dialog Styles */
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
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.login-card :deep(.v-text-field) {
  transition: all 0.3s ease;
}

.login-card :deep(.v-text-field:focus-within) {
  transform: translateY(-2px);
}
</style>
