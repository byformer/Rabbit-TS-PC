<script setup lang="ts" name="Layout">
import AppTopNav from './components/app-topnav.vue'
import AppHander from './components/app-hander.vue'
import AppFooter from './components/app-footer.vue'
import AppHanderSkitky from './components/app-hander-skitky.vue';
</script>

<template>
    <!-- 顶部 -->
    <AppTopNav></AppTopNav>
    <!-- 头部 -->
    <!-- 默认导航 -->
    <AppHander></AppHander>
    <!-- 顶部距离超过78px显示 -->
    <AppHanderSkitky></AppHanderSkitky>
    <!-- 中间 -->
    <main class="app-body">
        <!-- 给路由出口 -->
         <RouterView></RouterView>
    </main>
    <!-- 底部 -->
    <AppFooter></AppFooter>
</template>

<style scoped lang="less">
.app-body{
    min-height: 600px;
}
</style>