{ "02078235636": [ { "id": "c3", "creamname": "Hmong YANG", "Price1": "60000",
"Price2": "55000", "tel": "02078235636", "detail": "siv zoo heev, ib lub no siv
kav ntev heev, poj niam ntxiv neej lo siv tau tas", "donation": "", "image": [
"http://localhost:5151/saub-1761910879330-583035726-creamcnjhsvu.png",
"http://localhost:5151/saub-1761910879341-563903963-creasnjasjddsp.png",
"http://localhost:5151/saub-1761910879349-951857801-creamosskd8.png" ], "slide":
0, "quantity": 2 }, { "id": "ts3", "name": "LOVE", "Price1": "50000", "Price2":
"40000", "tel": "02078235636", "detail": "zoo heev nawb, 2 pob xwb zoo tu qab
tau nawb", "donation": "", "image": [
"http://localhost:5151/saub-1761912809532-220463298-mediasnjsdkpk.png",
"http://localhost:5151/saub-1761912809551-184201310-mediasxshugj.png",
"http://localhost:5151/saub-1761912809579-811300498-mediassasjh.png" ], "slide":
0, "quantity": 1 }, { "id": "ts2", "name": "Sara", "Price1": "50000", "Price2":
"40000", "tel": "02078235636", "detail": "zoo heev nawb, 2 pob xwb zoo tu qab
tau nawb", "donation": "5000", "image": [
"http://localhost:5151/saub-1761912778733-788343297-mediasdsjnkkl.png",
"http://localhost:5151/saub-1761912778742-580424901-mediasdsfffgkk.png",
"http://localhost:5151/saub-1761912778751-513651355-mediacsdjnsadd.png" ],
"slide": 0, "quantity": 1 } ], "02078298242": [ { "id": "ts1", "name": "Para",
"Price1": "50000", "Price2": "35000", "tel": "02078298242", "detail": "thank
you, and see you soon", "donation": "5000", "image": [
"http://localhost:5151/saub-1761912709208-561765962-mediasncksdsdokg.png",
"http://localhost:5151/saub-1761912709217-505295573-mediasnxsjhds.png",
"http://localhost:5151/saub-1761912709221-664700524-medsknckssok.png" ],
"slide": 0, "quantity": 1 } ] }
<template>
  <v-app>
    <!-- APP BAR -->
    <v-app-bar height="70" flat elevation="1" class="px-4 gradient-app-bar">
      <v-container class="d-flex align-center justify-space-between" fluid>
        <div class="d-flex align-center">
          <v-app-bar-nav-icon
            class="d-sm-flex d-md-none text-white"
            @click="drawer = !drawer"
          ></v-app-bar-nav-icon>
          <div class="d-none d-md-flex align-center">
            <v-btn text class="mx-2 text-white" to="/homepage">Home</v-btn>
            <v-btn text class="mx-2 text-white" @click="openDialog('youtube')">
              <v-icon left color="red-accent-4" size="30">mdi-youtube</v-icon>
              Tutorials
            </v-btn>
            <v-btn
              text
              class="mx-2 text-white"
              @click="openDialog('hand_love')"
            >
              <v-icon left color="pink-lighten-2" size="30"
                >mdi-hand-heart</v-icon
              >
              Support Us
            </v-btn>
            <v-btn text class="mx-2 text-white" @click="openDialog('linkedin')">
              <v-icon left color="blue-darken-3" size="30">mdi-linkedin</v-icon>
              Connect
            </v-btn>
            <v-btn text class="mx-2 text-white" @click="openDialog('login')">
              <v-icon left color="green-lighten-2" size="30">mdi-login</v-icon>
              Login
            </v-btn>
          </div>
        </div>
        <v-badge
          v-if="store.cartItems && store.cartItems.length > 0"
          :content="store.cartItems.length"
          color="error"
          location="top right"
        >
          <v-btn
            icon
            variant="text"
            size="small"
            class="rounded-circle bg-grey-lighten-3"
            @click.stop="openDialog('cart')"
          >
            <v-icon>mdi-cart-arrow-down</v-icon>
          </v-btn>
        </v-badge>
        <v-btn
          v-else
          icon
          variant="text"
          size="small"
          class="rounded-circle bg-grey-lighten-3"
          @click.stop="openDialog('cart')"
        >
          <v-icon>mdi-cart-arrow-down</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- NAVIGATION DRAWER -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="left"
      class="gradient-drawer"
    >
      <v-list density="comfortable" class="py-0">
        <v-list-item class="pa-4 bg-deep-purple-darken-3">
          <v-list-item-title class="text-h6 font-weight-bold text-white"
            >Menu</v-list-item-title
          >
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          prepend-icon="mdi-home"
          title="Home"
          to="/homepage"
          @click="drawer = false"
          class="text-white"
        ></v-list-item>
        <v-list-item
          @click="
            openDialog('youtube');
            drawer = false;
          "
          class="text-white"
        >
          <template v-slot:prepend>
            <v-icon color="red-accent-4">mdi-youtube</v-icon>
          </template>
          <v-list-item-title>Tutorials</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="
            openDialog('hand_love');
            drawer = false;
          "
          class="text-white"
        >
          <template v-slot:prepend>
            <v-icon color="pink-lighten-2">mdi-hand-heart</v-icon>
          </template>
          <v-list-item-title>Support Us</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="
            openDialog('login');
            drawer = false;
          "
          class="text-white"
        >
          <template v-slot:prepend>
            <v-icon color="purple-lighten-2">mdi-robot</v-icon>
          </template>
          <v-list-item-title>login</v-list-item-title>
        </v-list-item>
        <v-divider class="my-2"></v-divider>
        <v-list-item
          @click="
            openDialog('cart');
            drawer = false;
          "
          class="text-white"
        >
          <template v-slot:prepend>
            <v-badge
              v-if="store.cartItems && store.cartItems.length > 0"
              :content="store.cartItems.length"
              color="error"
              overlap
            >
              <v-icon>mdi-cart-arrow-down</v-icon>
            </v-badge>
            <v-icon v-else>mdi-cart-arrow-down</v-icon>
          </template>
          <v-list-item-title>Cart</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="
            openDialog('history');
            drawer = false;
          "
          class="text-white"
        >
          <template v-slot:prepend>
            <v-icon color="amber">mdi-clipboard-text-clock</v-icon>
          </template>
          <v-list-item-title>Order History</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- MAIN CONTENT -->
    <v-main class="bg-grey-lighten-3">
      <v-container fluid class="pa-4">
        <NuxtPage />
      </v-container>
    </v-main>

    <!-- FOOTER -->
    <v-footer
      color="deep-purple-darken-2"
      class="d-flex justify-center align-center py-6"
      app
    >
      <v-sheet color="transparent" class="d-flex ga-3 flex-wrap justify-center">
        <v-btn
          v-for="(item, index) in icons"
          :key="index"
          :class="{
            'elevation-8': item.name === 'cart' && store.cartCount > 0,
          }"
          variant="tonal"
          color="white"
          size="large"
          rounded="xl"
          class="d-flex flex-column ga-1 px-6"
          @click="openDialog(item.name)"
        >
          <template v-if="item.name === 'cart'">
            <v-badge
              v-if="store.cartCount > 0"
              :content="store.cartCount"
              color="error"
              overlap
            >
              <v-icon size="28">{{ item.icon }}</v-icon>
            </v-badge>
            <v-icon v-else size="28">{{ item.icon }}</v-icon>
          </template>
          <template v-else>
            <v-icon size="28">{{ item.icon }}</v-icon>
          </template>
          <span class="text-caption font-weight-medium text-uppercase">{{
            item.label
          }}</span>
        </v-btn>
      </v-sheet>
    </v-footer>

    <!-- AI ASSISTANT DIALOG -->
    <v-dialog v-model="aiDialog" max-width="800px" scrollable>
      <v-card rounded="xl" elevation="24">
        <v-card-title
          class="bg-purple-darken-2 text-white d-flex align-center py-5 px-6"
        >
          <v-icon class="mr-3" size="32">mdi-robot</v-icon>
          <span class="text-h6 font-weight-bold">AI Shopping Assistant</span>
          <v-spacer></v-spacer>
          <v-btn icon size="small" variant="text" @click="aiDialog = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-6" style="max-height: 500px">
          <div class="mb-4">
            <v-alert type="info" variant="tonal" class="mb-4">
              <div class="text-subtitle-2">Ask me anything about:</div>
              <ul class="text-caption mt-2">
                <li>Product recommendations</li>
                <li>Order status and tracking</li>
                <li>Shipping information</li>
                <li>Payment methods</li>
              </ul>
            </v-alert>

            <!-- Chat Messages -->
            <div class="chat-container mb-4" ref="chatContainer">
              <div v-for="(msg, idx) in chatMessages" :key="idx" class="mb-3">
                <div
                  :class="msg.role === 'user' ? 'user-message' : 'ai-message'"
                >
                  <div class="message-header">
                    <v-icon size="small" class="mr-2">
                      {{ msg.role === "user" ? "mdi-account" : "mdi-robot" }}
                    </v-icon>
                    <span class="text-caption font-weight-bold">
                      {{ msg.role === "user" ? "You" : "AI Assistant" }}
                    </span>
                  </div>
                  <div class="message-content">{{ msg.content }}</div>
                </div>
              </div>
              <div v-if="aiLoading" class="ai-message">
                <v-progress-circular
                  indeterminate
                  size="20"
                  width="2"
                ></v-progress-circular>
                <span class="ml-2 text-caption">Thinking...</span>
              </div>
            </div>

            <!-- Input Area -->
            <v-textarea
              v-model="aiInput"
              label="Ask me anything..."
              variant="outlined"
              rows="3"
              :disabled="aiLoading"
              @keydown.ctrl.enter="sendToAI"
              @keydown.meta.enter="sendToAI"
            >
              <template v-slot:append>
                <v-btn
                  icon="mdi-send"
                  color="purple"
                  :loading="aiLoading"
                  :disabled="!aiInput.trim()"
                  @click="sendToAI"
                ></v-btn>
              </template>
            </v-textarea>
            <div class="text-caption text-grey">Press Ctrl+Enter to send</div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- =================== LOGIN/REGISTER DIALOG =================== -->
    <v-dialog v-model="loginDialog" max-width="500px" persistent>
      <v-card rounded="xl" elevation="24" class="login-card">
        <v-card-title
          class="bg-gradient-login text-white d-flex align-center justify-center py-8 position-relative"
        >
          <div class="text-center">
            <v-icon size="64" class="mb-2">mdi-account-circle</v-icon>
            <div class="text-h5 font-weight-bold">
              {{ isRegisterMode ? "Create Account" : "Welcome Back" }}
            </div>
            <div class="text-caption mt-1 text-grey-lighten-3">
              {{
                isRegisterMode
                  ? "Join our community today"
                  : "Login to your account"
              }}
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
              :label="
                isRegisterMode ? 'Email Address *' : 'Email or Username *'
              "
              :placeholder="
                isRegisterMode ? 'Enter your email' : 'Enter email or username'
              "
              variant="outlined"
              prepend-inner-icon="mdi-email"
              color="primary"
              density="comfortable"
              class="mb-3"
              :rules="
                isRegisterMode
                  ? [
                      (v) => !!v || 'Email is required',
                      (v) => /.+@.+\..+/.test(v) || 'Invalid email address',
                    ]
                  : [(v) => !!v || 'This field is required']
              "
            ></v-text-field>

            <!-- Register Mode: Phone -->
            <v-text-field
              v-if="isRegisterMode"
              v-model="loginData.phone"
              label="Phone Number *"
              placeholder="020 XXXX XXXX"
              variant="outlined"
              prepend-inner-icon="mdi-phone"
              color="primary"
              type="tel"
              density="comfortable"
              class="mb-3"
              :rules="[
                (v) => !!v || 'Phone number is required',
                (v) =>
                  /^[0-9]{8,15}$/.test(v?.replace(/\s/g, '')) ||
                  'Invalid phone number',
              ]"
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
                  (v && v.length >= 6) ||
                  'Password must be at least 6 characters',
              ]"
              @click:append-inner="showPassword = !showPassword"
            ></v-text-field>

            <!-- Register Mode: Confirm Password -->
            <v-text-field
              v-if="isRegisterMode"
              v-model="loginData.confirmPassword"
              label="Confirm Password *"
              placeholder="Re-enter your password"
              variant="outlined"
              prepend-inner-icon="mdi-lock-check"
              :append-inner-icon="
                showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'
              "
              :type="showConfirmPassword ? 'text' : 'password'"
              color="primary"
              density="comfortable"
              class="mb-3"
              :rules="[
                (v) => !!v || 'Please confirm your password',
                (v) => v === loginData.password || 'Passwords do not match',
              ]"
              @click:append-inner="showConfirmPassword = !showConfirmPassword"
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

            <!-- Register Mode: Terms & Conditions -->
            <v-checkbox
              v-if="isRegisterMode"
              v-model="loginData.agreeTerms"
              color="primary"
              density="compact"
              class="mb-2"
              :rules="[(v) => v === true || 'You must agree to continue']"
            >
              <template v-slot:label>
                <div class="text-caption">
                  I agree to the
                  <a href="#" class="text-primary" @click.prevent
                    >Terms & Conditions</a
                  >
                  and
                  <a href="#" class="text-primary" @click.prevent
                    >Privacy Policy</a
                  >
                </div>
              </template>
            </v-checkbox>
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
                <v-icon left>{{
                  isRegisterMode ? "mdi-account-plus" : "mdi-login"
                }}</v-icon>
                {{ isRegisterMode ? "Create Account" : "Login" }}
              </v-btn>
            </v-col>
            <v-col cols="12" class="text-center mt-2">
              <div class="text-caption">
                {{
                  isRegisterMode
                    ? "Already have an account?"
                    : "Don't have an account?"
                }}
                <v-btn
                  variant="text"
                  color="primary"
                  size="small"
                  class="text-none font-weight-bold px-1"
                  @click="toggleMode"
                >
                  {{ isRegisterMode ? "Login" : "Register Now" }}
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- =================== TUTORIALS DIALOG =================== -->
    <v-dialog v-model="videoDialog" max-width="950px" scrollable>
      <v-card rounded="xl" elevation="24">
        <v-card-title
          class="bg-red-darken-2 text-white d-flex align-center py-5 px-6"
        >
          <v-icon class="mr-3" size="32">mdi-youtube</v-icon>
          <span class="text-h6 font-weight-bold">Video Tutorials</span>
          <v-spacer></v-spacer>
          <v-btn icon size="small" variant="text" @click="videoDialog = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-6">
          <v-expand-transition>
            <v-sheet
              v-if="currentVideo"
              class="mb-6 rounded-lg overflow-hidden"
              elevation="4"
            >
              <div class="bg-grey-darken-3 pa-3 d-flex align-center">
                <v-icon color="red" class="mr-2">mdi-youtube</v-icon>
                <span class="text-white font-weight-medium">{{
                  currentVideo.title
                }}</span>
                <v-spacer></v-spacer>
                <v-btn
                  icon
                  size="small"
                  variant="text"
                  @click="currentVideo = null"
                >
                  <v-icon color="white">mdi-close</v-icon>
                </v-btn>
              </div>
              <v-responsive :aspect-ratio="16 / 9">
                <iframe
                  width="100%"
                  height="100%"
                  :src="`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1`"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </v-responsive>
            </v-sheet>
          </v-expand-transition>
          <v-row>
            <v-col
              v-for="(video, idx) in videos"
              :key="idx"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card
                class="video-card"
                elevation="3"
                rounded="lg"
                @click="playVideo(video)"
              >
                <div class="video-thumbnail">
                  <v-img
                    :src="video.thumbnail"
                    height="160"
                    cover
                    class="rounded-t-lg"
                  >
                    <div
                      class="play-overlay d-flex align-center justify-center fill-height"
                    >
                      <v-btn
                        icon
                        size="x-large"
                        color="red"
                        variant="flat"
                        class="play-btn"
                      >
                        <v-icon size="40">mdi-play</v-icon>
                      </v-btn>
                    </div>
                  </v-img>
                </div>
                <v-card-text class="pa-3">
                  <div class="text-subtitle-2 font-weight-bold text-truncate">
                    {{ video.title }}
                  </div>
                  <div class="text-caption text-grey mt-1">
                    <v-icon size="x-small" class="mr-1"
                      >mdi-clock-outline</v-icon
                    >
                    {{ video.duration }}
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- ============================ SUPPORT US DIALOG====================== -->
    <v-dialog v-model="handLoveDialog" max-width="850px" scrollable>
      <v-card rounded="xl" elevation="24">
        <v-card-title
          class="bg-deep-purple-darken-2 text-white d-flex align-center py-5 px-6"
        >
          <v-icon class="mr-3" size="32">mdi-gift</v-icon>
          <span class="text-h6 font-weight-bold"> Donation Projects</span>
          <v-spacer></v-spacer>
          <v-btn
            icon
            size="small"
            variant="text"
            @click="handLoveDialog = false"
          >
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pa-6">
          <v-alert type="info" variant="tonal" class="mb-4">
            <div class="text-subtitle-2">Support Our Mission</div>
            <p class="text-caption mt-2">
              Your donations help us continue providing quality services and
              support to our community.
            </p>
          </v-alert>

          <v-row>
            <v-col cols="12" md="6">
              <v-card elevation="2" class="pa-4">
                <v-card-title class="text-h6"
                  >Project 1: Community Support</v-card-title
                >
                <v-card-text>
                  Help us support local communities with essential resources.
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" variant="flat">Donate Now</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card elevation="2" class="pa-4">
                <v-card-title class="text-h6"
                  >Project 2: Education Fund</v-card-title
                >
                <v-card-text>
                  Support education initiatives for underprivileged children.
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" variant="flat">Donate Now</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- ==============================HISTORY DIALOG ====================== -->
    <v-dialog v-model="historyDialog" max-width="850px" scrollable>
      <v-card rounded="xl" elevation="24">
        <v-card-title
          class="bg-deep-purple-darken-2 text-white d-flex align-center py-5 px-6"
        >
          <v-icon class="mr-3" size="32">mdi-clipboard-text-clock</v-icon>
          <span class="text-h6 font-weight-bold">Order History</span>
          <v-spacer></v-spacer>
          <v-btn
            icon
            size="small"
            variant="text"
            @click="historyDialog = false"
          >
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pa-6">
          <v-text-field
            v-model="searchPhone"
            label="Search by Phone Number"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            class="mb-4"
          ></v-text-field>

          <div v-if="orderHistory.length === 0" class="text-center py-10">
            <v-icon size="64" color="grey">mdi-history</v-icon>
            <p class="text-h6 mt-4">No order history found</p>
          </div>

          <v-card
            v-for="(order, idx) in orderHistory"
            :key="idx"
            class="mb-3"
            elevation="2"
          >
            <v-card-text>
              <div class="d-flex justify-space-between">
                <div>
                  <div class="text-subtitle-2 font-weight-bold">
                    Order #{{ order.id }}
                  </div>
                  <div class="text-caption">{{ order.date }}</div>
                </div>
                <v-chip
                  :color="order.status === 'Delivered' ? 'success' : 'warning'"
                  size="small"
                >
                  {{ order.status }}
                </v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- ================================== CART DIALOG ====================== -->
    <v-dialog v-model="cartDialog" max-width="800px" scrollable>
      <v-card>
        <v-card-title
          class="text-h6 bg-primary text-white d-flex align-center justify-space-between"
        >
          <span>Your Cart</span>
          <v-btn icon size="small" variant="text" @click="cartDialog = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table
            v-if="store.cartItems && store.cartItems.length > 0"
            :items="store.cartItems"
            :headers="headers"
            hide-default-footer
            class="elevation-1"
          >
            <template v-slot:item.image="{ item }">
              <v-img
                :src="item.image && item.image[0] ? item.image[0] : ''"
                width="60"
                height="60"
                contain
              />
            </template>
            <template v-slot:item.creamname="{ item }">
              <div>
                <strong>{{ item.creamname || item.name }}</strong>
              </div>
            </template>
            <template v-slot:item.unit="{ item }">{{
              item.unit || "ອັນ"
            }}</template>
            <template v-slot:item.quantity="{ item }">
              <div class="d-flex align-center">
                <v-btn
                  icon
                  size="small"
                  elevation="0"
                  @click="decreaseQty(item)"
                >
                  <v-icon small>mdi-minus</v-icon>
                </v-btn>
                <span class="px-2">{{ item.quantity }}</span>
                <v-btn
                  icon
                  size="small"
                  elevation="0"
                  @click="increaseQty(item)"
                >
                  <v-icon small>mdi-plus</v-icon>
                </v-btn>
              </div>
            </template>
            <template v-slot:item.total="{ item }">
              {{
                formatPrice(
                  (item.Price3 || item.price || item.Price1) * item.quantity
                )
              }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
                icon
                size="small"
                elevation="0"
                @click="store.removeFromCart(item.id)"
              >
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
          <div v-else class="text-center py-10">
            <v-icon size="48">mdi-cart-off</v-icon>
            <p class="text-subtitle-1 mt-2">Your cart is empty.</p>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-4">
          <v-row>
            <v-col cols="6" class="text-h6 text-right">Total:</v-col>
            <v-col cols="6" class="text-h6 text-center text-success">
              {{ formatPrice(store.totalPrice || 0) }}
            </v-col>
          </v-row>
        </v-card-actions>
        <v-divider></v-divider>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn
            color="green"
            size="large"
            variant="elevated"
            :disabled="!store.cartItems || store.cartItems.length === 0"
            @click="openCheckout"
          >
            Next <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- CHECKOUT DIALOG -->
    <v-dialog v-model="checkoutDialog" max-width="600px" persistent>
      <v-card class="checkout-card">
        <v-card-title
          class="text-h5 bg-gradient text-white d-flex align-center justify-space-between pa-6"
        >
          <div class="d-flex align-center">
            <v-icon size="32" class="mr-3">mdi-clipboard-check-outline</v-icon>
            <span>Checkout Information</span>
          </div>
          <v-btn icon size="small" variant="text" @click="closeCheckoutDialog">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pt-8 pb-4 px-6">
          <v-form ref="checkoutForm" v-model="formValid">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="checkoutData.shippingCompany"
                    :items="shippingCompanies"
                    label="Shipping Company *"
                    :rules="[rules.required]"
                    variant="outlined"
                    prepend-inner-icon="mdi-truck-delivery"
                    color="primary"
                    density="comfortable"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="checkoutData.address"
                    label="Delivery Address *"
                    placeholder="Enter your full delivery address"
                    :rules="[rules.required]"
                    variant="outlined"
                    rows="3"
                    prepend-inner-icon="mdi-map-marker"
                    color="primary"
                    density="comfortable"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="checkoutData.phoneNumber"
                    label="Phone Number *"
                    placeholder="020 XXXX XXXX"
                    :rules="[rules.required, rules.phone]"
                    variant="outlined"
                    prepend-inner-icon="mdi-phone"
                    color="primary"
                    type="tel"
                    density="comfortable"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="checkoutData.notes"
                    label="Additional Notes (Optional)"
                    placeholder="Any special delivery instructions?"
                    variant="outlined"
                    rows="2"
                    prepend-inner-icon="mdi-note-text"
                    color="primary"
                    density="comfortable"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-6 bg-grey-lighten-5">
          <v-row dense>
            <v-col cols="12" sm="6" class="mb-2 mb-sm-0">
              <v-btn
                color="white"
                variant="outlined"
                size="x-large"
                block
                @click="closeCheckoutDialog"
                prepend-icon="mdi-arrow-left"
                class="text-none bg-red-darken-1"
                >Cancel</v-btn
              >
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn
                color="green"
                variant="flat"
                size="x-large"
                block
                :disabled="!formValid"
                @click="submitCheckout"
                append-icon="mdi-check-circle"
                class="text-none confirm-btn"
                >Confirm Order</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- ================================== WHATSAPP DIALOG ================================== -->
    <v-dialog v-model="whatsappDialog" max-width="900px" persistent scrollable>
      <v-card class="whatsapp-dialog">
        <v-card-title class="text-h5 d-flex align-center pa-6 bg-success">
          <v-icon color="white" size="40" class="mr-3">mdi-whatsapp</v-icon>
          <span class="text-white">Send Order to WhatsApp</span>
          <v-spacer></v-spacer>
          <v-btn
            icon
            size="small"
            variant="text"
            @click="whatsappDialog = false"
          >
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="px-4 py-6" style="max-height: 600px">
          <div class="text-body-1 mb-4 text-center">
            Review your order details before sending to WhatsApp.
          </div>

          <!-- Customer Information -->
          <v-sheet
            class="pa-4 mb-4 bg-blue-grey-lighten-5 rounded"
            elevation="1"
          >
            <div
              class="text-subtitle-2 mb-3 font-weight-bold d-flex align-center"
            >
              <v-icon color="primary" class="mr-2">mdi-account-circle</v-icon>
              Customer Information
            </div>
            <v-row dense>
              <v-col cols="12" sm="4">
                <div class="text-caption text-grey-darken-2">Phone Number</div>
                <div class="text-body-2 font-weight-medium">
                  {{ checkoutData.phoneNumber }}
                </div>
              </v-col>
              <v-col cols="12" sm="4">
                <div class="text-caption text-grey-darken-2">
                  Shipping Company
                </div>
                <div class="text-body-2 font-weight-medium">
                  {{ checkoutData.shippingCompany }}
                </div>
              </v-col>
              <v-col cols="12" sm="4">
                <div class="text-caption text-grey-darken-2">
                  Delivery Address
                </div>
                <div class="text-body-2 font-weight-medium">
                  {{ checkoutData.address }}
                </div>
              </v-col>
              <v-col v-if="checkoutData.notes" cols="12">
                <v-divider class="my-2"></v-divider>
                <div class="text-caption text-grey-darken-2">Notes</div>
                <div class="text-body-2 font-weight-medium">
                  {{ checkoutData.notes }}
                </div>
              </v-col>
            </v-row>
          </v-sheet>

          <!-- Order Details (Grouped) -->
          <div class="mb-4">
            <div v-for="(items, tel) in cartGroup" :key="tel" class="mb-8">
              <v-sheet class="pa-4 bg-grey-lighten-4 rounded" elevation="2">
                <div
                  class="text-subtitle-1 mb-3 font-weight-bold d-flex align-center justify-space-between bg-primary pa-3 rounded"
                >
                  <span class="text-white">
                    <v-icon color="white" class="mr-2">mdi-receipt</v-icon>
                    Your Order — {{ tel }}
                  </span>
                  <span class="text-white">
                    <v-icon color="white" class="mr-1"
                      >mdi-package-variant</v-icon
                    >
                    {{ items.length }} items
                  </span>
                </div>
                <v-divider class="mb-3"></v-divider>

                <!-- Items -->
                <v-card
                  v-for="(item, index) in items"
                  :key="item.id + index"
                  class="mb-3 product-preview-card"
                  elevation="1"
                >
                  <div class="d-flex pa-3">
                    <v-img
                      :src="item.image?.[0] || ''"
                      width="70"
                      height="70"
                      cover
                      class="rounded flex-shrink-0"
                    />
                    <div class="ml-3 flex-grow-1">
                      <div class="text-subtitle-2 font-weight-bold mb-1">
                        {{ item.creamname || item.name }}
                      </div>
                      <div
                        v-if="item.detail"
                        class="text-caption text-grey-darken-1 mb-2"
                      >
                        {{ item.detail }}
                      </div>
                      <div class="d-flex justify-space-between">
                        <span class="text-body-2">
                          Price:
                          <strong>{{
                            formatPrice(
                              item.Price3 || item.price || item.Price1
                            )
                          }}</strong>
                        </span>
                        <v-chip size="small" color="primary" variant="flat">
                          Qty: {{ item.quantity }} {{ item.unit || "ອັນ" }}
                        </v-chip>
                      </div>
                      <div class="text-right mt-1">
                        <span class="text-caption text-grey-darken-2"
                          >Subtotal:</span
                        >
                        <span
                          class="text-body-2 font-weight-bold text-primary ml-1"
                        >
                          {{
                            formatPrice(
                              (item.Price3 || item.price || item.Price1) *
                                item.quantity
                            )
                          }}
                        </span>
                      </div>
                    </div>
                  </div>
                </v-card>

                <!-- Upload Slip -->
                <v-divider class="my-4"></v-divider>
                <div class="mb-2 text-subtitle-2 font-weight-bold">
                  <v-icon class="mr-2" color="success">mdi-upload</v-icon>
                  Upload Payment Slip ({{ tel }})
                </div>
                <v-file-input
                  v-model="slipUploads[tel]"
                  accept="image/*"
                  placeholder="Upload slip image"
                  prepend-icon="mdi-image"
                  show-size
                  @change="previewSlip(tel)"
                ></v-file-input>
                <v-img
                  v-if="slipPreview[tel]"
                  :src="slipPreview[tel]"
                  height="200"
                  class="rounded mt-3"
                  cover
                ></v-img>
                <v-btn
                  v-if="slipPreview[tel]"
                  color="red"
                  variant="text"
                  class="mt-2"
                  @click="removeSlip(tel)"
                >
                  <v-icon class="mr-2">mdi-trash-can</v-icon>
                  Remove Slip
                </v-btn>
              </v-sheet>
            </div>
          </div>

          <!-- Grand Total -->
          <v-sheet class="pa-4 bg-deep-purple-lighten-5 rounded" elevation="3">
            <div class="d-flex justify-space-between align-center">
              <div>
                <div class="text-h6 font-weight-bold">Grand Total</div>
                <div class="text-caption text-grey-darken-1">
                  {{ store.cartCount || 0 }} total items
                </div>
              </div>
              <span class="text-h5 font-weight-bold text-deep-purple">
                {{ formatPrice(store.totalPrice || 0) }}
              </span>
            </div>
          </v-sheet>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-6">
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-btn
                color="grey-darken-1"
                variant="outlined"
                block
                size="x-large"
                prepend-icon="mdi-close-circle"
                @click="whatsappDialog = false"
                >Close</v-btn
              >
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn
                color="success"
                variant="flat"
                block
                size="x-large"
                prepend-icon="mdi-whatsapp"
                @click="sendToWhatsApp"
                >Send to WhatsApp</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from "vue";
import { useRouter } from "vue-router";

// Mock store - replace with your actual store
const store = {
  cartItems: ref([]),
  cartCount: computed(() => store.cartItems.value.length),
  totalPrice: computed(() =>
    store.cartItems.value.reduce(
      (sum, item) =>
        sum + (item.Price3 || item.price || item.Price1) * item.quantity,
      0
    )
  ),
  updateCart: (item) => {
    const index = store.cartItems.value.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      store.cartItems.value[index] = item;
    }
  },
  removeFromCart: (id) => {
    store.cartItems.value = store.cartItems.value.filter(
      (item) => item.id !== id
    );
  },
};

const router = useRouter();
const drawer = ref(false);

// Dialog States
const cartDialog = ref(false);
const handLoveDialog = ref(false);
const videoDialog = ref(false);
const historyDialog = ref(false);
const checkoutDialog = ref(false);
const whatsappDialog = ref(false);
const aiDialog = ref(false);

// Login/Register States
const loginDialog = ref(false);
const isRegisterMode = ref(false);
const loginFormValid = ref(false);
const loginLoading = ref(false);
const loginForm = ref(null);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const loginData = ref({
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  rememberMe: false,
  agreeTerms: false,
});

// AI Assistant States
const aiInput = ref("");
const aiLoading = ref(false);
const chatMessages = ref([]);
const chatContainer = ref(null);

// WhatsApp Configuration
const cartGroup = computed(() => {
  const groups = {};
  store.cartItems.value.forEach((item) => {
    const key = item.tel || "default";
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  });
  return groups;
});

const slipUploads = ref({});
const slipPreview = ref({});

// Video Tutorial Data
const videos = ref([
  {
    title: "ວິທີການສັ່ງຊື້ສິນຄ້າ",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
    duration: "3:45",
  },
  {
    title: "ວິທີການຈ່າຍເງິນ",
    youtubeId: "5NV6Rdv1a3I",
    thumbnail: "https://img.youtube.com/vi/5NV6Rdv1a3I/0.jpg",
    duration: "5:20",
  },
  {
    title: "ວິທີການຕິດຕາມສິນຄ້າ",
    youtubeId: "3JZ_D3ELwOQ",
    thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/0.jpg",
    duration: "4:15",
  },
]);
const currentVideo = ref(null);

// History Search Data
const searchPhone = ref("");
const hasSearched = ref(false);
const orderHistory = ref([]);

// Footer icons
const icons = [
  { name: "youtube", icon: "mdi-youtube", label: "Tutorials" },
  { name: "hand_love", icon: "mdi-hand-heart", label: "Support" },
  { name: "history", icon: "mdi-clipboard-text-clock", label: "History" },
  { name: "cart", icon: "mdi-cart", label: "Cart" },
];

// Checkout form
const formValid = ref(false);
const checkoutForm = ref(null);
const checkoutData = ref({
  address: "",
  phoneNumber: "",
  shippingCompany: null,
  notes: "",
});
const shippingCompanies = [
  "Lao Post",
  "DHL Laos",
  "Kerry Express",
  "Flash Express",
  "Ninja Van",
];
const rules = {
  required: (v) => !!v || "This field is required",
  phone: (v) =>
    /^[0-9]{8,15}$/.test(v?.replace(/\s/g, "")) || "Invalid phone number",
};

const headers = [
  { text: "Image", value: "image", width: 70 },
  { text: "Product", value: "creamname" },
  { text: "Price", value: "Price2" },
  { text: "Unit", value: "unit" },
  { text: "Quantity", value: "quantity" },
  { text: "Total", value: "total" },
  { text: "Action", value: "actions", width: 70 },
];

onMounted(() => {
  if (router.currentRoute.value.path === "/") router.push("/homepage");
});

// Open Dialog Handler
function openDialog(type) {
  const lower = type.toLowerCase();
  if (lower === "hand_love") handLoveDialog.value = true;
  else if (lower === "linkedin")
    window.open("https://www.linkedin.com", "_blank");
  else if (lower === "cart") cartDialog.value = true;
  else if (lower === "youtube") {
    videoDialog.value = true;
    currentVideo.value = null;
  } else if (lower === "history") {
    historyDialog.value = true;
    clearSearch();
  } else if (lower === "login") loginDialog.value = true;
  else if (lower === "ai") aiDialog.value = true;
}

// Video Methods
function playVideo(video) {
  currentVideo.value = video;
  nextTick(() => {
    const dialogContent = document.querySelector(".v-card-text");
    if (dialogContent) dialogContent.scrollTop = 0;
  });
}

function clearSearch() {
  searchPhone.value = "";
  hasSearched.value = false;
  orderHistory.value = [];
}

// Cart & Checkout Methods
const formatPrice = (price) => {
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return "LAK 0";
  return new Intl.NumberFormat("lo-LA", {
    style: "currency",
    currency: "LAK",
    minimumFractionDigits: 0,
  }).format(num);
};

const increaseQty = (product) =>
  store.updateCart({ ...product, quantity: (product.quantity || 0) + 1 });
const decreaseQty = (product) => {
  if (product.quantity > 1)
    store.updateCart({ ...product, quantity: product.quantity - 1 });
  else store.removeFromCart(product.id);
};

const openCheckout = () => {
  cartDialog.value = false;
  checkoutDialog.value = true;
};
const closeCheckoutDialog = () => {
  checkoutDialog.value = false;
  resetForm();
};
const resetForm = () => {
  checkoutData.value = {
    address: "",
    phoneNumber: "",
    shippingCompany: null,
    notes: "",
  };
  checkoutForm.value?.reset();
};

const submitCheckout = () => {
  if (formValid.value) {
    checkoutDialog.value = false;
    nextTick(() => {
      whatsappDialog.value = true;
    });
  }
};

// Login/Register Methods
const toggleMode = () => {
  isRegisterMode.value = !isRegisterMode.value;
  resetLoginForm();
};

const resetLoginForm = () => {
  loginData.value = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
    agreeTerms: false,
  };
  loginForm.value?.reset();
};

const closeLoginDialog = () => {
  loginDialog.value = false;
  setTimeout(() => {
    resetLoginForm();
    isRegisterMode.value = false;
  }, 300);
};

const handleSubmit = async () => {
  if (!loginFormValid.value) return;

  loginLoading.value = true;

  setTimeout(() => {
    if (isRegisterMode.value) {
      alert(
        `✅ Registration successful!\n\nWelcome, ${loginData.value.fullName}!\nEmail: ${loginData.value.email}`
      );
      console.log("Register data:", {
        fullName: loginData.value.fullName,
        email: loginData.value.email,
        phone: loginData.value.phone,
      });
    } else {
      alert(
        `✅ Login successful!\n\nWelcome back!\nEmail/Username: ${loginData.value.email}`
      );
      console.log("Login data:", {
        email: loginData.value.email,
        rememberMe: loginData.value.rememberMe,
      });
    }

    loginLoading.value = false;
    closeLoginDialog();
  }, 1500);
};

const forgotPassword = () => {
  alert(
    "🔑 Forgot Password\n\nRedirecting to password reset page...\n(Implement your password reset logic here)"
  );
};

const socialLogin = (provider) => {
  alert(
    `🔐 Social Login with ${provider}\n\nImplement OAuth flow here\n(Connect to ${provider} authentication)`
  );
  console.log(`Logging in with ${provider}`);
};

// WhatsApp Methods
const previewSlip = (tel) => {
  const file = slipUploads.value[tel];
  if (!file) {
    slipPreview.value[tel] = null;
    return;
  }
  slipPreview.value[tel] = URL.createObjectURL(file);
};

const removeSlip = (tel) => {
  slipUploads.value[tel] = null;
  slipPreview.value[tel] = null;
};

const formatCartForWhatsAppGroup = (tel, items) => {
  let text = `Your Order — ${tel}\n`;
  items.forEach((item) => {
    text += `\n${item.creamname || item.name}\n`;
    if (item.detail) text += `${item.detail}\n`;
    text += `Qty: ${item.quantity} ${item.unit || "ອັນ"}\n`;
    const price = item.Price3 || item.price || item.Price1;
    const subtotal = price * item.quantity;
    text += `Price: ${price}, Subtotal: ${subtotal}\n`;
  });

  if (slipUploads.value[tel]) {
    text += `\nPayment Slip uploaded: Yes\n`;
  } else {
    text += `\nPayment Slip uploaded: No\n`;
  }

  return encodeURIComponent(text);
};

const sendToWhatsApp = () => {
  for (const [tel, items] of Object.entries(cartGroup.value)) {
    const message = formatCartForWhatsAppGroup(tel, items);
    window.open(`https://wa.me/856${tel}?text=${message}`, "_blank");
  }

  whatsappDialog.value = false;
  cartDialog.value = false;
  resetForm();
};

// AI Assistant Methods
const sendToAI = () => {
  if (!aiInput.value.trim()) return;

  chatMessages.value.push({
    role: "user",
    content: aiInput.value,
  });

  const userMessage = aiInput.value;
  aiInput.value = "";
  aiLoading.value = true;

  setTimeout(() => {
    chatMessages.value.push({
      role: "assistant",
      content: `Thank you for your question: "${userMessage}". I'm here to help you with your shopping needs!`,
    });
    aiLoading.value = false;

    nextTick(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    });
  }, 1000);
};
</script>

<style scoped>
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

/* Footer */
.v-footer .v-btn {
  transition: all 0.3s ease;
}
.v-footer .v-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* AI Chat Styles */
.chat-container {
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
}
.chat-container::-webkit-scrollbar {
  width: 6px;
}
.chat-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}
.user-message,
.ai-message {
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 8px;
}
.user-message {
  background: #e3f2fd;
  margin-left: 20%;
}
.ai-message {
  background: #f5f5f5;
  margin-right: 20%;
}
.message-header {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}
.message-content {
  font-size: 14px;
  line-height: 1.5;
}

/* General */
.rounded-circle {
  border-radius: 50%;
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
  .user-message {
    margin-left: 10%;
  }
  .ai-message {
    margin-right: 10%;
  }
}
</style>
<style scoped>
/* login */
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
</style>



"House": [
            {
                "id": "k3",
                "name": "Honda",
                "tel": "02078235636",
                "detail": "zoo, kho, pheej yig, many thing good more",
                "donation": "",
                "image": [
                    "http://localhost:5151/saub-1761912151082-22842126-carcjsdnfhkjdi23u.png",
                    "http://localhost:5151/saub-1761912151089-602865159-carnjsdjfheus90.png",
                    "http://localhost:5151/saub-1761912151097-883018552-carcd8cjsdj21.png"
                ],
                "path": "khoomKhoTsheb/selectAll",
                'url_web':'/muag_alaij_khoTsheb/home_alaij'
            }
        ],



        <v-container fluid class="pa-4">
          <v-row>
            <v-col
              v-for="(item, index) in allDataMuagTshuaj"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              xl="2"
            >
              <v-card class="product-card d-flex flex-column" elevation="1" hover @click="selectItem(item)">
                <!-- Image -->
                <div class="image-container position-relative">
                  <v-img
                    :src="item.image[0]"
                    aspect-ratio="1"
                    cover
                    class="product-image"
                    height="200"
                  />
  
                  <div v-if="item.image.length > 1" class="image-count-badge">
                    <v-icon size="small" class="mr-1">mdi-camera</v-icon>
                    {{ item.image.length }}
                  </div>
  
                  <div v-if="item.isBestSeller" class="best-seller-badge">
                    #1 Best Seller
                  </div>
                </div>
  
                <!-- Product Info -->
                <!-- Product Info - When locationgps is null (show price) -->
                <v-card-text class="flex-grow-1" v-if="!item.locationgps">
                  <div class="text-primary text-h6 font-weight-medium">
                    {{ item.name }}
                  </div>
                  <div class="text-primary font-weight-medium">
                    {{ item.type }}
                  </div>
                  <div class="mb-2">
                    <div class="d-flex align-center">
                      <span class="text-red">LAK</span>
                      <span class="text-h6 ml-1">{{
                        formatPrice(item.Price2)
                      }}</span>
                      <span
                        class="text-body-3 align-self-start text-decoration-line-through text-grey-darken-1"
                        >{{ formatPrice(item.Price1) }}</span
                      >
                    </div>
                  </div>
                  <div class="d-flex align-center mt-2">
                    <v-icon color="grey">mdi-phone</v-icon>
                    <span class="font-weight-bold text-blue ml-2">
                      {{ item.tel }}
                    </span>
                  </div>
                  <div class="ml-6 mt-1">{{ item.detail }}</div>
                </v-card-text>
                <!-- ========== Product Info - When locationgps has value (hide price, show location) ========== -->
                <v-card-text class="flex-grow-1" v-else>
                  <div class="text-primary text-h6 font-weight-medium">
                    {{ item.name }}
                  </div>
                  <div class="text-primary font-weight-medium">
                    {{ item.type }}
                  </div>
  
                  <div class="d-flex align-center mt-2">
                    <v-icon color="grey">mdi-phone</v-icon>
                    <span class="font-weight-bold text-blue ml-2">
                      {{ item.tel }}
                    </span>
                  </div>
                  <div class="d-flex align-center mt-2">
                    <v-icon color="grey">mdi-map-marker</v-icon>
                    <span class="font-weight-bold text-blue ml-2">
                      {{ item.locationgps }}
                    </span>
                  </div>
                  <div class="ml-6 mt-1">{{ item.detail }}</div>
                </v-card-text>
  
                <!-- Button: View Gallery -->
                <v-card-actions class="pa-3 pt-0">
                  <v-btn
                    block
                    color="primary"
                    variant="outlined"
                    class="text-none font-weight-medium"
                    size="small"
                @click.stop="showDetailsDialog(item)""
                  >
                    <v-icon size="small" class="mr-1">mdi-eye</v-icon>
                    View Gallery
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>