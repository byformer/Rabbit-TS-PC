<script lang="ts" name="TopCategory" setup>

import { useRoute } from 'vue-router'
const routes = useRoute()

</script>

<template>
    <div class="category">分类组件{{ routes.params }}</div>
</template>
  
  
  
<style>

</style>