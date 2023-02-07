<script lang="ts" name="TopCategory" setup>
import useStore from '@/store';
import { useRoute } from 'vue-router'
import { watchEffect } from 'vue'
const routes = useRoute()
const { category,home } = useStore()
// 由于路由切换，组件没有切换，还是同一个分类组件，只是根据不同的id渲染不同的分类
// setup只会执行一次，就应该监听路由的变化，路由只要变了，就应该发送请求
// watch(
//     () => routes.params.id,
//     (newVal)=>{
//         if(!newVal) return
//         category.getCategory(routes.params.id as string)
//     },{
//         immediate:true,
//     }
// )

// 优化 使用watchEffect
watchEffect(()=>{
    // 如果用的到数据，确实都需要依赖，依赖了就有变化 => watchEffect
    // 有参数才发请求
    if(!routes.params.id) return
     // 这个请求只在一级目录发
    if(routes.fullPath !== `/category/${routes.params.id}`) return
    // 获取一级分类的数据
    category.getCategory(routes.params.id as string)
    // 获取展示的轮播图数据
    home.getBannerList()
})
</script>

<template>
    <div class="top-category">
        <div class="container">
            <Bread>
                <BreadItem to="/">去首页</BreadItem>
                <BreadItem>{{ category.topCategory.name }}</BreadItem>
            </Bread>

            <Carousel :slider="home.bannerList" 
                      style="height:500px" autopaly>
            </Carousel>
        </div>
    </div>

</template>
  
<style>

</style>