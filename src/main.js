import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from "axios"
import VueAxios from 'vue-axios'

const app= createApp(App)
app.use(router)
app.use(VueAxios,axios)
app.use(ElementPlus)
app.use(store)
app.mount('#app')
