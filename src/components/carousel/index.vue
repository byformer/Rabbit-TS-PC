<script lang="ts" setup name="XtxCarousel">
import { BannerItem } from '@/types/data'
import { PropType, ref, onMounted, onUnmounted } from 'vue'
// 父传子
const props = defineProps({
  slider: {
    type: Array as PropType<BannerItem[]>,
    required: true,
  },
  autopaly:{
    type:Boolean,
    default:false
  },
  duration:{
    type:Number,
    default:3000
  }
})

// 新版语法
// const props = defineProps<{
//   slider: BannerItem[]
//   autopaly?: boolean,
//   duration?: number,
// }>()
// 控制下标
const active = ref(0)

const onPrev = () => {
  active.value--
  // 如果active达到最小值 归下标最大值
  if (active.value < 0) {
    
    
    active.value = props.slider.length - 1
  }
}
const onNext = () => {
  active.value++
  // 如果active达到下标最大值 归下标0
  if (active.value >=props.slider.length) {
    active.value = 0
  }
}
// 移入暂停、播放
const stop = () => {
  clearInterval(timer)
}
const paly = () => {
  // 在模块环境中，定时器、延时器，编辑器会识别成 node 中的定时器和延时器
  // 我们要的是浏览器端的，所以加window
  clearInterval(timer)
  timer = window.setInterval(() => {
    onNext()
  }, props.duration)
}

// 定时器控制轮播
let timer: number = -1
onMounted(() => {

  paly()
})

onUnmounted(() => {
  stop()
})


</script>

<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="paly">
    <!-- 轮播图 -->
    <ul class="carousel-body">
      <li v-for="(item, index) in slider" :key="item.id" class="carousel-item " :class="{ fade: active === index }">
        <RouterLink to="/">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
      </li>

    </ul>
    <!-- 左边箭头 -->
    <a href="javascript:;" class="carousel-btn prev" @click="onPrev">
      <i class="iconfont icon-angle-left"></i></a>
    <!-- 右边箭头 -->
    <a href="javascript:;" class="carousel-btn next" @click="onNext">
      <i class="iconfont icon-angle-right"></i></a>
    <!-- 小圆点 -->
    <div class="carousel-indicator">
      <span v-for="(item, index) in slider" :key="item.id" :class="{ active: active === index }"
        @click="active = index"></span>

    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;

  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }

    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;

      &.fade {
        opacity: 1;
        z-index: 1;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;

      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;

        ~span {
          margin-left: 12px;
        }

        &.active {
          background: #fff;
        }
      }
    }

    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;

      &.prev {
        left: 20px;
      }

      &.next {
        right: 20px;
      }
    }
  }

  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>