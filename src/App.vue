<script setup lang="ts">
import  request   from './utils/request';

async function getTest(){
  const res = await request.get('/home/index')
  console.log(res);
}
getTest()
</script>
<template>
  <div>app</div>
</template>
<style scoped>
</style>