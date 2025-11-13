<template>
  <div class="p-8 max-w-3xl mx-auto bg-gray-50 rounded-2xl shadow-md border border-gray-200">
    <h2 class="text-3xl font-bold text-center mb-8 text-gray-800">🏢 Add Department</h2>

    <!-- Form Section -->
    <form @submit.prevent="addDepartment" class="space-y-4">
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Department Name</label>
        <input
          v-model="departmentName"
          type="text"
          placeholder="Enter Department Name"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      <div class="flex justify-center">
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition font-medium shadow-sm"
        >
          ➕ Add Department
        </button>
      </div>
    </form>

    <!-- Toast Message -->
    <transition name="fade">
      <div
        v-if="message"
        class="mt-4 text-center bg-green-100 text-green-700 py-2 rounded-lg font-medium shadow-sm"
      >
        {{ message }}
      </div>
    </transition>

    <!-- Department List -->
    <div class="mt-10">
      <h3 class="text-2xl font-semibold mb-5 text-gray-800 flex items-center gap-2">
        📋 Department List
      </h3>

      <div
        v-if="departments.length"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      >
        <div
          v-for="dept in departments"
          :key="dept.id"
          class="p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition hover:scale-105 text-center font-medium text-gray-700"
        >
          {{ dept.name }}
        </div>
      </div>

      <p v-else class="text-gray-500 text-center mt-6">No departments found.</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const departmentName = ref("");
const message = ref("");
const departments = ref([]);

const addDepartment = async () => {
  if (!departmentName.value.trim()) {
    message.value = "⚠️ Please enter a department name.";
    return;
  }
  try {
    const response = await axios.post(
      "http://localhost:8081/api/department/createDept",
      { name: departmentName.value }
    );

    if (response.status === 200) {
      message.value = "✅ Department added successfully!";
      departmentName.value = "";
      await getAllDepartment();

      // Hide success message after 2 seconds
      setTimeout(() => (message.value = ""), 2000);
    }
  } catch (error) {
    console.error("Error", error);
    message.value = "❌ Error adding department. Please try again.";
  }
};

const getAllDepartment = async () => {
  try {
    const response = await axios.get("http://localhost:8081/api/department");
    departments.value = response.data;
  } catch (error) {
    console.error("Error ", error);
  }
};

onMounted(() => {
  getAllDepartment();
});


</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>