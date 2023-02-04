<script setup lang="ts" name="Layout">
import AppTopNav from './components/app-topnav.vue'
import AppHander from './components/app-hander.vue'
import AppFooter from './components/app-footer.vue'
</script>

<template>
    <!-- 顶部 -->
    <AppTopNav></AppTopNav>
    <!-- 头部 -->
    <AppHander></AppHander>
    <!-- 中间 -->
    <main class="app-body">

    </main>
    <!-- 底部 -->
    <AppFooter></AppFooter>
</template>

<style scoped lang="less">
.app-body{
    min-height: 600px;
}
</style>