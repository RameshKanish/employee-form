<template>
  <div class="dashboard">

    <div class="card">
      <h3>Total Employees</h3>
      <p>{{ totalEmployees }}</p>
    </div>

    <div class="card">
      <h3>Departments</h3>
      <ul>
        <li v-for="(count, dept) in departmentCount" :key="dept">
          {{ dept }}: {{ count }}
        </li>
      </ul>
    </div>

    <div class="card">
      <h3>Recent Join</h3>
      <p>{{ recentJoinName }}</p>
    </div>
    
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'

const employees = ref([])

// Fetch all employees
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8081/api/employee/all')
    employees.value = response.data
  } catch (error) {
    console.error('Error fetching employees:', error)
  }
})

// Computed properties
const totalEmployees = computed(() => employees.value.length)

const departmentCount = computed(() => {
  const counts = {}
  employees.value.forEach(emp => {
    const dept = emp.department || 'Unassigned'
    counts[dept] = (counts[dept] || 0) + 1
  })
  return counts
})

// Show most recently joined employee
const recentJoinName = computed(() => {
  if (employees.value.length === 0) return '—'
  const sorted = [...employees.value].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )
  return `${sorted[0].firstName} ${sorted[0].lastName}`
})
</script>

<style scoped>
.dashboard {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.card {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 250px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.card ul {
  list-style-type: none;
  padding: 0;
}

.card li {
  font-size: 14px;
  margin-top: 5px;
}
</style>