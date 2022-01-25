<template>
    <div class="sidebar-container">
    </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {

    },
})
</script>
<style scoped>
.sidebar-container {
    height: 100%;
    width: 200px;
    box-sizing: border-box;
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    background: rgba(255, 255, 255, 0.15);
    overflow: scroll;
    color: white;
}
</style>
