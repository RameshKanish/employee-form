<template>
  <div>
    <h2>Employee List</h2>
    <input
      v-model="searchQuery"
      placeholder="🔍 Search by name or department"
      class="search-box"
    />
      <div v-if="loading" class="loader-overlay">
        <div class="spinner"></div>
        <p>Processing... please wait</p>
      </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emp in filteredEmployees" :key="emp.id">
          <td>{{ emp.firstName }} {{ emp.lastName }}</td>
          <td>{{ emp.email }}</td>
          <td>{{ emp.department.name}}</td>
          <td>
            <button class="delete-btn"  @click="deleteEmployee(emp.id)">❌ Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
const loading = ref(false);

const searchQuery = ref('')
const employees = ref([])

onMounted(async () => {
  const res = await axios.get('http://localhost:8081/api/employee/all')
  employees.value = res.data
})

const fetchEmployees = async () => {
  try {
    const res = await axios.get('http://localhost:8081/api/employee/all')
    employees.value = res.data
  } catch (err) {
    console.error('Error fetching employees:', err)
  }
}

const filteredEmployees = computed(() => {
  return employees.value.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.department}`
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  )
})


const deleteEmployee = async (id) => {
  if (confirm('Are you sure you want to delete this employee?')) {
    try {
      loading.value = true 
      await axios.delete(`http://localhost:8081/api/employee/${id}`)
      await fetchEmployees()
      alert('✅ Employee deleted successfully')
    } catch (error) {
      console.error('Error deleting employee:', error)
      alert('❌ Failed to delete employee. Please try again.')
    }finally{
      loading.value = false
    }
  }
}
</script>

<style scoped>
.search-box {
  padding: 8px;
  width: 300px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.delete-btn {
  background-color:  #e74c3c;
  color: white;
    padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f3f3f3;
}

/* 🌀 Loader overlay */
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>