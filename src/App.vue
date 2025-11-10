<template>
  <div id="app">
    <header>
      <h1>Employee Portal</h1>
      <nav>
        <RouterLink to="/">Dashboard</RouterLink>
        <RouterLink to="/form">Employee Form</RouterLink>
        <RouterLink to="/list">Employee List</RouterLink>
        <RouterLink to="/reminder">Employee BirthDay</RouterLink>
        <RouterLink to="/department">Department</RouterLink>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';

</script>

<style scoped>
header {
  background-color: #2c3e50;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  margin: 0;
}

nav a {
  color: white;
  text-decoration: none;
  margin-left: 15px;
  font-weight: bold;
}

nav a.router-link-active {
  text-decoration: underline;
}

main {
  padding: 20px;
}
</style>