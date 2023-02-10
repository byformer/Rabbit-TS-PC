<script setup lang="ts">
import FnMessage from '@/components/message/index'
const fn = () => {
    FnMessage({
        type: 'success',
        text: '登录成功',
        // duration:2000
    })
   
}
</script>
<template>
    <div class="box">
        <button @click="fn">登录</button>
    </div>
  
</template>
<style scoped>

</style>