import {createRouter , createWebHashHistory} from 'vue-router'

import DashBoard from '@/components/DashBoard.vue'
import EmployeeForm from '@/components/EmployeeForm.vue'
import EmployeeList from '@/components/EmployeeList.vue';
import EmployeeReminders from '@/components/EmployeeReminders.vue';
import Department from '@/components/EmployeeDepartment.vue';

const routes = [
    {path : '/' , component : DashBoard},
    {path : '/form' , component : EmployeeForm},
    {path : '/list' , component : EmployeeList},
    {path : '/reminder' ,component : EmployeeReminders},
    {path : '/department' , component : Department}
]
const router = createRouter ({
    history : createWebHashHistory() ,
    routes
})
export default router;