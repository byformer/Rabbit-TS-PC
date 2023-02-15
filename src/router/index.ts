import { createRouter, createWebHashHistory } from 'vue-router'
// layout 除了登录等某些页面除外，都是需要加载的，所以不建议懒加载
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'
import useStore from '@/store'

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
                { path: '/goods/:id', component: () => import('@/views/goods/index.vue') },
                { path: '/cart', component: () => import('@/views/cart/index.vue') },
                { path: '/member/checkout', component: () => import('@/views/member/pay/checkout.vue') },
                { path: '/member/pay', component: () => import('@/views/member/pay/index.vue') },
                { path: '/pay/callback', component: () => import('@/views/member/pay/callback.vue') },

            ]
        },
        { path: '/login', component: () => import('@/views/login/index.vue') },
        { path: '/palyground', component: () => import('@/views/palyground/index.vue') },
        { path: '/login/callback', component: () => import('@/views/login/callback.vue') }

    ],
})

// 配置路由前置守卫
router.beforeEach((to, from, next) => {
    // 判断用户是否登录
    const { cart } = useStore()
    if (cart.isLogin) {
        // 如果用户是登录状态，直接放行
        next()
    } else {
        // 目前是游客状态,需要看看你想去哪儿
        if (to.path.includes('/member')) {
            // 这个不是你随便能访问的
            next({
                path: '/login',
                query: {
                    redirectUrl: to.fullPath
                }
            })
        } else {
            next()
        }

    }

})
export default router