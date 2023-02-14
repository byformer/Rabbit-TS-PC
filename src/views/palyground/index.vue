<script setup lang="ts">
import Confirm from '@/components/confirm';
const logout = ()=>{
    Confirm({
        text:'你确定退出嘛？？', 
        title:'温馨提示'
    }).then(()=>{
        console.log('成功');
        
    }).catch(()=>{
        console.log('失败');
        
    })
}
</script>
<template>
    <button @click="logout">退出</button>
</template>
<style scoped>
</style>