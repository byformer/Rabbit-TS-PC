import { createApp } from 'vue'
// 让所有浏览器初始化的样式统一
import 'normalize.css'
import App from './App.vue'
// 导入自己的公共样式
import "@/assets/style/common.less"
import router from '@/router'
import {createPinia} from  'pinia'
import Skeleton from'@/components/skeleton/index.vue'
import Carousel from '@/components/carousel/index.vue'

const pinia = createPinia()
const app = createApp(App)
// 注册全局组件
app.component ('Skeleton',Skeleton)
app.component('Carousel',Carousel)

app.use(pinia)
app.use(router)
app.mount('#app')
