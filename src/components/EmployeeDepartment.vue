<template>
    <div class="p-6 max-w-md mx-auto bg-gray-50 rounded-2xl shadow-md">
        <h2 class="text-2xl font-semibold text-center mb-6">🏢 Add Department</h2>
        <form @submit.prevent="addDepartment">
            <div class="mb-4">
                <label class="block font-medium mb-2">Department Name</label>
                <input v-model="departmentName" type="text" placeholder="Enter Department Name"
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" />
            </div>
            <div class="flex justify-center">
                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
                    ➕ Add Department
                </button>
            </div>
        </form>
        <div v-if="message" class="mt-4 text-center text-green-600 font-medium">
            {{ message }}
        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue'

const departmentName = ref('')
const message = ref('')
const addDepartment = async () => {
    if(!departmentName.value.trim()){
        message.value = '⚠️ Please enter a department name.'
        return;
    }
    try{
        const response = await axios.post('http://localhost:8081/api/department/createDept' , {
            name : departmentName.value
        });
        console.log("Response" , response);
        
        if(response.status == 200){
            message.value = '✅ Department added successfully!'
            departmentName.value = '';
        }
    }catch(error){
        console.log("Error" , error);
        message.value = '❌ Error adding department. Please try again.';
    }
}
</script>