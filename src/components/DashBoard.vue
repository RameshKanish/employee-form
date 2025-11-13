<template>
  <div class="main-container">
    <!-- Sidebar -->

    <!-- Main Content -->
    <div class="content">
      <!-- Hero Section -->
      <section class="hero">
        <h2>Hi Ramesh Ramasamy Sankararaj</h2>
        <p>Growth is a continuous journey.</p>
      </section>

      <!-- Cards Section -->
      <section class="cards">
        <div class="card">
          <h3>Total Employees</h3>
          <p class="number">{{ totalEmployees }}</p>
        </div>

        <div class="card">
          <h3>Departments</h3>
          <ul>
            <li v-for="(count, dept) in departmentCount" :key="dept">
              <strong>{{ count }}</strong>
            </li>
          </ul>
        </div>

        <div class="card">
          <h3>Recent Join</h3>
          <p>{{ recentJoinName }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'

const employees = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8081/api/employee/all')
    employees.value = response.data
  } catch (error) {
    console.error('Error fetching employees:', error)
  }
})

const totalEmployees = computed(() => employees.value.length)

const departmentCount = computed(() => {
  const counts = {}
  employees.value.forEach(emp => {
    const dept = emp.department || 'Unassigned'
    counts[dept] = (counts[dept] || 0) + 1
  })
  return counts
})

const recentJoinName = computed(() => {
  if (employees.value.length === 0) return '—'
  const sorted = [...employees.value].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )
  return `${sorted[0].firstName} ${sorted[0].lastName}`
})
</script>

<style scoped>
/* Layout */
.main-container {
  display: flex;
  min-height: 100vh;
  background-color: #f7faff;
  font-family: 'Segoe UI', sans-serif;
}

/* Sidebar */
.sidebar {
  width: 70px;
  background-color: #1f5a7f;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}

.sidebar .logo {
  font-size: 24px;
  margin-bottom: 30px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 25px 0;
  font-size: 22px;
  cursor: pointer;
  opacity: 0.8;
}

.sidebar li.active,
.sidebar li:hover {
  opacity: 1;
}

/* Main Content */
.content {
  flex: 1;
  padding: 30px 40px;
}

/* Hero Section */
.hero {
  background: linear-gradient(to right, #a3d8ff, #e0f7fa);
  border-radius: 15px;
  padding: 25px 35px;
  margin-bottom: 30px;
  color: #004a6e;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.hero h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.hero p {
  margin-top: 5px;
  font-size: 16px;
  opacity: 0.9;
}

/* Cards Section */
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
}

.card {
  flex: 1;
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  min-width: 250px;
  text-align: center;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-3px);
}

.card h3 {
  color: #0078b7;
  margin-bottom: 10px;
}

.card .number {
  font-size: 28px;
  font-weight: bold;
  color: #004a6e;
}

.card ul {
  padding: 0;
  list-style: none;
}

.card li {
  font-size: 14px;
  margin-top: 5px;
}
</style>