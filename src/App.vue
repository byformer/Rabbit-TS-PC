<script setup lang="ts">
import request from '@/utils/request';

async function getTest() {
  const res = await request.get('/home/index')
  console.log(res);
}
getTest()
</script>
<template>
  <div class="box">app</div>
  <h1>111</h1>
  <p>嘎嘎</p>
</template>

<style scoped lang="less">
.box {
  width: 300px;
  height: 300px;
  background-color: @xtxColor;
  .hoverShadow ();
}
</style>