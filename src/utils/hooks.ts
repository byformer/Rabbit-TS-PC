import { ref } from 'vue'
import { useIntersectionObserver,useIntervalFn } from '@vueuse/core'

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

export function useCountDown(count: number = 60) {
    const time = ref(0) // 倒计时的秒数
    const { pause, resume } = useIntervalFn(
      () => {
        time.value--
        if (time.value <= 0) pause()
      },
      1000,
      {
        immediate: false,
      }
    )
    const start = () => {
      // 初始化倒计时的秒数, 并开始倒计时
      time.value = count
      resume()
    }
    // 如果组件被卸载了, 也要清除定时器 -- 需要考虑的, 这边不用写
    // onUnmounted(() => {
    //   pause()
    // })
    return {
      time,
      start,
    }
  }