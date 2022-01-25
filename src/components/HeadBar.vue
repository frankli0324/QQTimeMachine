<template>
    <div class="top-container">
        <div class="nav-contaier"></div>
        <div class="avatar-container">
            <img :src="`https://q2.qlogo.cn/headimg_dl?dst_uin=${this.uin}&spec=100`" />
        </div>
    </div>
</template>

<script>

export default {
    props: ['uin'],
};
</script>

<style scoped>
.top-container {
    height: 5%;
    min-height: 40px;
    width: 100%;
    background: rgb(240, 240, 240);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.avatar-container {
    margin: 0 10px;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.avatar-container img {
    height: 100%;
    width: 100%;
}
</style>