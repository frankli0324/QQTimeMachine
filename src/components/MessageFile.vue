<template>
    <div class="file-container">
        <div class="file-image"></div>
        <div class="file-name">
            {{ msg.file_name }}
        </div>
        <div class="file-info">
            <div>{{ human_size(msg.file_size) }}</div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {

    },
    props: {
        msg: Object,
    },
    methods: {
        human_size(size) {
            if (size === 0) return '0';
            var i = Math.floor(Math.log(size) / Math.log(1024));
            return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
        },
    }
})
</script>

<style scoped>
.file-container {
    width: 300px;
    height: 150px;
    border: 1px solid rgb(225, 225, 225);
    border-radius: 3px;
    overflow: hidden;
}
.file-image {
    width: 100%;
    height: 65%;
    border-bottom: 1px solid rgb(225, 225, 225);
    margin-bottom: 5px;
}
.file-name {
    width: 100%;
    text-align: left;
    padding-left: 10px;
    font-size: 15px;
}
.file-info {
    width: 100%;
    text-align: left;
    padding-left: 10px;
    color: gray;
    font-size: 14px;
}
</style>