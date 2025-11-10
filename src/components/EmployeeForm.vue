<template>
  <div class="theme-toggle">
    <label class="switch">
      <input type="checkbox" v-model="isDarkMode" />
      <span class="slider" />
    </label>
    <span>{{ isDarkMode ? 'Dark Mode' : 'Light Mode' }}</span>
  </div>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <h2>Employee Form</h2>

      <div class="form-group">
        <label>First Name</label>
        <input v-model="employee.firstName" type="text" placeholder="Enter your first name" required />
      </div>

      <div class="form-group">
        <label>Last Name</label>
        <input v-model="employee.lastName" type="text" placeholder="Enter your last name" required />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input v-model="employee.email" type="email" placeholder="Enter your email id" required />
      </div>

      <div class="form-group">
        <label>Address</label>
        <input v-model="employee.address" type="text" placeholder="Type your address" required />
      </div>

      <div class="form-group">
        <label>Phone Number</label>
        <vue-tel-input v-model="employee.phoneNumber" mode="international" default-country="IN"
          placeholder="Enter your phone number" :key="formKey" />
      </div>

      <div class="form-group">
        <label placeholder="Department">Department</label>
        <select v-model="employee.departmentId" required class="border rounded px-3 py-2 w-full">
          <option disabled value="">Select Department</option>
          <option v-for="dept in departments" :key="dept.id" :value="dept.id">
            {{ dept.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Date Of Birth</label>
        <input type="date" v-model="employee.dob" :max="today" required />
        <small v-if="dobError" class="error">{{ dobError }}</small>
      </div>

      <div class="button-group">
        <button type="submit" class="submit-btn">Submit</button>
        <button type="button" class="reset-btn" @click="resetForm">Reset</button>
      </div>

      <form @submit.prevent="uploadImage">
        <input type="file" accept="image/png, image/jpeg" @change="onFileChange" />
        <button type="submit">Submit</button>
      </form>

    </form>
  </div>
</template>

<script setup>
const onFileChange = (e) => {
  console.log(e.target);
}
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'

// eslint-disable-next-line no-unused-vars
import { RouterLink, useRoute, useRouter } from 'vue-router'
const router = useRouter();
const employee = ref({
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  phoneNumber: '',
  department: '',
  dob: ''
})

const dobError = ref('')
const formKey = ref(0)
const today = computed(() => {
  const now = new Date()
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
})


const departments = ref([])

const fetchDepartments = async () =>{
  try{
    const res = await axios.get('http://localhost:8081/api/department');
    departments.value = res.data;
  }catch(error){
    console.log("Error" , error);
  }
}
onMounted(fetchDepartments)

const resetForm = () => {
  employee.value = {
    departmentId : '', 
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: '',
    department: '',
    dob: ''
  }
  dobError.value = ''
  formKey.value++
}
const handleSubmit = async () => {
  dobError.value = ''
  if (new Date(employee.value.dob) > new Date(today.value)) {
    dobError.value = 'Date of birth cannot be in the future'
    return
  }

  const age = new Date().getFullYear() - new Date(employee.value.dob).getFullYear()
  if (age < 18) {
    dobError.value = 'Employee should be at least 18 years old'
    return
  }
  alert(`
    ✅ Employee Created Successfully!
    Name: ${employee.value.firstName} ${employee.value.lastName}
    Email: ${employee.value.email}
    Department: ${employee.value.department}
    Address: ${employee.value.address}
    Phone: ${employee.value.phoneNumber}
    DOB: ${employee.value.dob}
    `)
  try {
    // eslint-disable-next-line no-unused-vars
    const payload = {
      ...employee.value ,
      departMentId : departments.value.id
    }
    const res = axios.post('http://localhost:8081/api/employee/createEmployee',payload, {
      headers: { 'Content-Type': 'application/json' }
    })
    console.log("Res" , res);
    resetForm()
    router.push("/list")
  } catch (error) {
    console.error('Error creating employee:', error)
    alert('❌ Failed to create employee.')
  }
}


const isDarkMode = ref(false);
onMounted(() => {
  const saveTheme = localStorage.getItem('theme');
  if (saveTheme === 'dark') {
    isDarkMode.value = true;
    document.body.classList.add('dark');
  }
});
watch(isDarkMode, (newVal) => {
  if (newVal) {
    document.body.classList.add('dark')
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark')
    localStorage.setItem('theme', 'light');
  }
});

</script>

<style scoped>
body {
  background-color: #f5f7fa;
  font-family: 'Poppins', sans-serif;
}

.form-container {
  max-width: 400px;
  background: #fff;
  margin: 60px auto;
  padding: 30px 40px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 25px;
  font-weight: 600;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 500;
  color: #34495e;
  margin-bottom: 6px;
}

input,
select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  transition: 0.3s;
}

input:focus,
select:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 5px rgba(66, 184, 131, 0.4);
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.submit-btn {
  background-color: #3498db;
  color: white;
}

.submit-btn:hover {
  background-color: #2980b9;
}

.reset-btn {
  background-color: #e74c3c;
  color: white;
}

.reset-btn:hover {
  background-color: #c0392b;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}

body.dark {
  background-color: #121212;
  color: #e0e0e0;
}

body.dark input,
body.dark select,
body.dark textarea {
  background-color: #1f1f1f;
  color: white;
  border: 1px solid #555;
}

body.dark table {
  background-color: #1c1c1c;
}

/* Toggle Switch Style */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  margin-right: 10px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked+.slider {
  background-color: #2196f3;
}

input:checked+.slider:before {
  transform: translateX(26px);
}
</style>