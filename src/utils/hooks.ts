import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
// 组件数据懒加载封装
export function useLazyData(apiFn:()=>void) {
    const target = ref(null)
    const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
        if (isIntersecting) {
            stop()
            apiFn()
        }
    },{
        threshold:0
    })
    return target
}