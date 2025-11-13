<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <nav class="bg-[#1a3b5d] w-20 flex flex-col items-center py-6 space-y-6 text-white">
      <router-link to="/dashboard" class="text-2xl hover:text-blue-300">🏠</router-link>
      <router-link to="/employee-list" class="text-2xl hover:text-blue-300">👥</router-link>
      <router-link to="/employee-form" class="text-2xl hover:text-blue-300">📁</router-link>
      <router-link to="/department" class="text-2xl hover:text-blue-300">💰</router-link>
      <router-link to="/employee-birthday" class="text-2xl hover:text-blue-300">📊</router-link>
    </nav>
    <main class="flex-1 bg-[#f8fbff] p-8 overflow-y-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup>
// No logic needed for now
</script>

<style scoped>
.router-link-active {
  color: #7fc3ff;
  transform: scale(1.1);
}
</style>