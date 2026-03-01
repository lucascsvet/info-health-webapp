import { createApp } from 'vue'
import { MaskInput } from 'vue-3-mask'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('MaskInput', MaskInput)
app.use(router).mount('#app')
