import { createApp } from 'vue'
// 让所有浏览器初始化的样式统一
import 'normalize.css'
import App from './App.vue'
// 导入自己的公共样式
import "@/assets/style/common.less"
import router from '@/router'


createApp(App).use(router).mount('#app')
