import { createApp } from 'vue'
import App from './App.vue'

import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
import router from './router'

createApp(App).use(VueTelInput).use(router).mount('#app');