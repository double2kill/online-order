import './assets/css/bootstrap.min.css'
import './assets/css/style.css'

import { createApp } from 'vue'  // 只需导入一次

import router from './router'
import App from './App.vue'
import Antd from 'ant-design-vue'


const app = createApp(App)

app.use(router)
app.use(Antd)
app.mount('#app')
