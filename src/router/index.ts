import { createRouter, createWebHashHistory } from 'vue-router'
// layout 除了登录等某些页面除外，都是需要加载的，所以不建议懒加载
import Layout from '@/views/layout/index.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path:'/',component:Layout},
        {path:'/login',component:()=>import('@/views/login/index.vue')}
    ],
})

export default router