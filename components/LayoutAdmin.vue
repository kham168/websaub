<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Sidebar -->
      <aside
        :class="[
          'fixed top-0 left-0 z-40 h-screen transition-transform',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          'w-64 bg-white border-r border-gray-200'
        ]"
      >
        <!-- Logo -->
        <div class="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 class="text-xl font-bold text-gray-800">Admin Panel</h1>
          <button
            @click="sidebarOpen = false"
            class="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
  
        <!-- Navigation -->
        <nav class="p-4 space-y-1">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.name"
            :to="item.path"
            @click="sidebarOpen = false"
            :class="[
              'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
              $route.path === item.path
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            ]"
          >
            <component :is="item.icon" class="w-5 h-5 mr-3" />
            {{ item.name }}
          </NuxtLink>
        </nav>
      </aside>
  
      <!-- Main Content -->
      <div class="lg:ml-64">
        <!-- Top Bar -->
        <header class="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div class="flex items-center justify-between h-16 px-6">
            <button
              @click="sidebarOpen = true"
              class="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
  
            <div class="flex-1 max-w-md mx-4">
              <input
                v-model="searchQuery"
                type="search"
                placeholder="Search..."
                class="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
  
            <div class="flex items-center space-x-4">
              <button class="relative text-gray-500 hover:text-gray-700">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div class="flex items-center space-x-3 cursor-pointer">
                <img
                  src="https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff"
                  alt="User"
                  class="w-8 h-8 rounded-full"
                />
                <span class="hidden md:block text-sm font-medium text-gray-700">Admin User</span>
              </div>
            </div>
          </div>
        </header>
  
        <!-- Page Content -->
        <main class="p-6">
          <slot>
            <!-- Default Dashboard Content -->
            
            <!-- Stats Cards -->
            <div class="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
              <div
                v-for="stat in stats"
                :key="stat.label"
                class="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-600">{{ stat.label }}</p>
                    <p class="text-2xl font-bold text-gray-900 mt-2">{{ stat.value }}</p>
                    <p class="text-sm text-green-600 mt-2">{{ stat.change }}</p>
                  </div>
                  <div :class="['w-12 h-12 rounded-full flex items-center justify-center', stat.bgColor]">
                    <component :is="stat.icon" :class="['w-6 h-6', stat.iconColor]" />
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Image Upload Section -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Upload Images</h2>
              
              <div
                @click="triggerFileInput"
                @drop.prevent="handleDrop"
                @dragover.prevent="dragOver = true"
                @dragleave.prevent="dragOver = false"
                :class="[
                  'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
                  dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                ]"
              >
                <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p class="text-sm text-gray-600 mb-2">
                  <span class="font-semibold text-blue-600">Click to upload</span> or drag and drop
                </p>
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
  
              <input
                ref="fileInput"
                type="file"
                multiple
                accept="image/*"
                @change="handleFileSelect"
                class="hidden"
              />
  
              <!-- Preview Uploaded Images -->
              <div v-if="uploadedImages.length" class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div
                  v-for="(img, idx) in uploadedImages"
                  :key="idx"
                  class="relative group"
                >
                  <img
                    :src="img"
                    alt="Uploaded"
                    class="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    @click="removeImage(idx)"
                    class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
  
            <!-- Data Table -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
              <div class="p-6 border-b border-gray-200">
                <div class="flex items-center justify-between flex-wrap gap-4">
                  <h2 class="text-lg font-semibold text-gray-900">Users Management</h2>
                  <button 
                    @click="showAddModal = true"
                    class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Add New User
                    </span>
                  </button>
                </div>
              </div>
  
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" class="rounded border-gray-300" />
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr
                      v-for="user in paginatedUsers"
                      :key="user.id"
                      class="hover:bg-gray-50 transition-colors"
                    >
                      <td class="px-6 py-4 whitespace-nowrap">
                        <input type="checkbox" v-model="user.selected" class="rounded border-gray-300" />
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <img
                            :src="`https://ui-avatars.com/api/?name=${user.name}&background=random`"
                            class="w-10 h-10 rounded-full"
                            :alt="user.name"
                          />
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                            <div class="text-sm text-gray-500">ID: {{ user.id }}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ user.email }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span
                          :class="[
                            'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                            user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                          ]"
                        >
                          {{ user.role }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span
                          :class="[
                            'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                            user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          ]"
                        >
                          {{ user.status }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button @click="editUser(user)" class="text-blue-600 hover:text-blue-900 transition-colors">Edit</button>
                        <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900 transition-colors">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
  
              <!-- Pagination -->
              <div class="px-6 py-4 border-t border-gray-200">
                <div class="flex items-center justify-between flex-wrap gap-4">
                  <div class="text-sm text-gray-700">
                    Showing <span class="font-medium">{{ startIndex + 1 }}</span> to <span class="font-medium">{{ endIndex }}</span> of{' '}
                    <span class="font-medium">{{ tableData.length }}</span> results
                  </div>
                  <div class="flex space-x-2">
                    <button 
                      @click="currentPage--" 
                      :disabled="currentPage === 1"
                      :class="[
                        'px-3 py-1 border rounded-md text-sm transition-colors',
                        currentPage === 1 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 hover:bg-gray-50'
                      ]"
                    >
                      Previous
                    </button>
                    <button 
                      v-for="page in totalPages" 
                      :key="page"
                      @click="currentPage = page"
                      :class="[
                        'px-3 py-1 rounded-md text-sm transition-colors',
                        currentPage === page ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'
                      ]"
                    >
                      {{ page }}
                    </button>
                    <button 
                      @click="currentPage++" 
                      :disabled="currentPage === totalPages"
                      :class="[
                        'px-3 py-1 border rounded-md text-sm transition-colors',
                        currentPage === totalPages ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 hover:bg-gray-50'
                      ]"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </slot>
        </main>
      </div>
  
      <!-- Overlay for mobile -->
      <div
        v-if="sidebarOpen"
        @click="sidebarOpen = false"
        class="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden transition-opacity"
      ></div>
  
      <!-- Add User Modal -->
      <div
        v-if="showAddModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        @click.self="showAddModal = false"
      >
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Add New User</h3>
          <p class="text-sm text-gray-600 mb-4">This is a demo modal. Implement your form here.</p>
          <div class="flex justify-end space-x-3">
            <button
              @click="showAddModal = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              @click="showAddModal = false"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Icons as inline SVG components
  const DashboardIcon = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`
  };
  
  const UsersIcon = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`
  };
  
  const ProductsIcon = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>`
  };
  
  const OrdersIcon = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>`
  };
  
  const AnalyticsIcon = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`
  };
  
  const SettingsIcon = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`
  };
  
  const TrendingUpIcon = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>`
  };
  
  // State
  const sidebarOpen = ref(false);
  const dragOver = ref(false);
  const uploadedImages = ref([]);
  const fileInput = ref(null);
  const searchQuery = ref('');
  const showAddModal = ref(false);
  const selectAll = ref(false);
  const currentPage = ref(1);
  const itemsPerPage = 5;
  
  // Menu Items
  const menuItems = [
    { name: 'Dashboard', icon: DashboardIcon, path: '/admin' },
    { name: 'Users', icon: UsersIcon, path: '/admin/users' },
    { name: 'Products', icon: ProductsIcon, path: '/admin/products' },
    { name: 'Orders', icon: OrdersIcon, path: '/admin/orders' },
    { name: 'Analytics', icon: AnalyticsIcon, path: '/admin/analytics' },
    { name: 'Settings', icon: SettingsIcon, path: '/admin/settings' }
  ];
  
  // Stats
  const stats = [
    {
      label: 'Total Users',
      value: '2,543',
      change: '+12.5% from last month',
      icon: UsersIcon,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      label: 'Revenue',
      value: '$45,231',
      change: '+8.2% from last month',
      icon: TrendingUpIcon,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      label: 'Orders',
      value: '1,234',
      change: '+15.3% from last month',
      icon: OrdersIcon,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      label: 'Products',
      value: '456',
      change: '+5.7% from last month',
      icon: ProductsIcon,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    }
  ];
  
  // Table Data
  const tableData = ref([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', selected: false },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', selected: false },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', selected: false },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Admin', status: 'Active', selected: false },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Active', selected: false },
    { id: 6, name: 'Emma Davis', email: 'emma@example.com', role: 'User', status: 'Active', selected: false },
    { id: 7, name: 'Frank Miller', email: 'frank@example.com', role: 'User', status: 'Inactive', selected: false },
    { id: 8, name: 'Grace Lee', email: 'grace@example.com', role: 'Admin', status: 'Active', selected: false },
    { id: 9, name: 'Henry Taylor', email: 'henry@example.com', role: 'User', status: 'Active', selected: false },
    { id: 10, name: 'Iris White', email: 'iris@example.com', role: 'User', status: 'Inactive', selected: false },
    { id: 11, name: 'Jack Black', email: 'jack@example.com', role: 'Admin', status: 'Active', selected: false },
    { id: 12, name: 'Kelly Green', email: 'kelly@example.com', role: 'User', status: 'Active', selected: false }
  ]);
  
  // Pagination
  const totalPages = computed(() => Math.ceil(tableData.value.length / itemsPerPage));
  const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
  const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, tableData.value.length));
  const paginatedUsers = computed(() => tableData.value.slice(startIndex.value, endIndex.value));
  
  // Functions
  const toggleSelectAll = () => {
    paginatedUsers.value.forEach(user => {
      user.selected = selectAll.value;
    });
  };
  
  const editUser = (user) => {
    console.log('Edit user:', user);
    alert(`Edit user: ${user.name}`);
  };
  
  const deleteUser = (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      const index = tableData.value.findIndex(u => u.id === id);
      if (index !== -1) {
        tableData.value.splice(index, 1);
      }
    }
  };
  
  // Image Upload Functions
  const triggerFileInput = () => {
    fileInput.value?.click();
  };
  
  const handleFileSelect = (event) => {
    const files = event.target.files;
    processFiles(files);
  };
  
  const handleDrop = (event) => {
    dragOver.value = false;
    const files = event.dataTransfer.files;
    processFiles(files);
  };
  
  const processFiles = (files) => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          uploadedImages.value.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  };
  
  const removeImage = (index) => {
    uploadedImages.value.splice(index, 1);
  };
  </script>