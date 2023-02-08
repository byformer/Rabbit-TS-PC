import { createRouter, createWebHashHistory } from 'vue-router'
// layout 除了登录等某些页面除外，都是需要加载的，所以不建议懒加载
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'

const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => {
        return {
          top: 0,
        }
      },
    routes: [
        {
            path: '/', component: Layout, children: [
                { path: '', component: Home },
                { path: '/category/:id', component: () => import('@/views/category/index.vue') },
                { path: '/category/sub/:id', component: () => import('@/views/category/sub.vue') },
                {path:'/goods/:id', component:()=>import('@/views/goods/index.vue')}
            ]
        },
        { path: '/login', component: () => import('@/views/login/index.vue') },
        {path:'/palyground',component:()=>import('@/views/palyground/index.vue')}
    ],
})

export default router