<template>
  <div id="app">
    <div class="container">
      <!-- Sidebar -->
      <aside class="sidebar">
        <h2>Employee Portal</h2>
        <nav>
          <RouterLink to="/">Dashboard</RouterLink>
          <RouterLink to="/form">Employee Form</RouterLink>
          <RouterLink to="/list">Employee List</RouterLink>
          <RouterLink to="/reminder">Employee BirthDay</RouterLink>
          <RouterLink to="/department">Department</RouterLink>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

/* Sidebar styling */
.sidebar {
  width: 220px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.sidebar h2 {
  margin-bottom: 20px;
  font-size: 18px;
  text-align: center;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
}

.sidebar nav a {
  color: white;
  text-decoration: none;
  margin: 10px 0;
  font-weight: bold;
  padding: 8px 10px;
  border-radius: 6px;
  transition: background 0.3s;
}

.sidebar nav a:hover {
  background: #34495e;
}

.sidebar nav a.router-link-active {
  background: #1abc9c;
}

/* Main content styling */
.content {
  flex: 1;
  padding: 30px;
  background-color: #f4f6f8;
  overflow-y: auto;
}
</style>