import { createApp } from 'vue'
// 让所有浏览器初始化的样式统一
import 'normalize.css'
import App from './App.vue'
// 导入自己的公共样式
import "@/assets/style/common.less"
import router from '@/router'
import { createPinia } from 'pinia'
import Skeleton from '@/components/skeleton/index.vue'
import Carousel from '@/components/carousel/index.vue'
import XtxMore from '@/components/more/index.vue'
import defaultImg from '@/assets/images/200.png'
import { useIntersectionObserver } from '@vueuse/core'
import Bread from './components/bread/index.vue'
import BreadItem from './components/bread/item.vue'
import City from './components/city/index.vue'
import Numbox from './components/numbox/index.vue'
import Button from './components/button/index.vue'
import CheckBox from './components/checkbox/index.vue'
const pinia = createPinia()
const app = createApp(App)
// 注册全局组件
app.component('Skeleton', Skeleton)
app.component('City',City)
app.component('Carousel', Carousel)
app.component('XtxMore', XtxMore)
app.component('Bread', Bread)
app.component('BreadItem', BreadItem)
app.component('Numbox',Numbox)
app.component('Button',Button)
app.component('CheckBox',CheckBox)

// 自定义懒加载组件
app.directive('lazy', {
    mounted(el: HTMLImageElement, { value }) {
      // 图片的懒加载逻辑
      // 参数1：回调函数
      // 参数2：可选的配置
      const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 停止监听
          stop()
          // 给el元素设置src属性
          // value = '123.jpg'
          el.src = value
          // 如果图片加载失败，显示默认的图片
          el.onerror = function () {
            el.src =  defaultImg
          }
        }
      })
    }
  })

// app.mount('lazy')
app.use(pinia)
app.use(router)
app.mount('#app')
