<script setup lang="ts">
import { ref } from 'vue';

const dialogVisible = ref(false)
</script>
<template>
    <button @click="dialogVisible = true">按钮</button>
    <Teleport to="body">


        <Dialog title="hello" v-model:visible="dialogVisible">
            <ul>
                <li>11111</li>
                <li>11111</li>
                <li>11111</li>
                <li>11111</li>
                <li>11111</li>
                <li>11111</li>
                <li>11111</li>
                <li>11111</li>
                <li>11111</li>
            </ul>
            <template #footer>
                <Button type="gray" style="margin-right:20px">否</Button>
                <Button type="primary">是</Button>
            </template>
        </Dialog>
    </Teleport>
</template>
<style scoped>

</style>