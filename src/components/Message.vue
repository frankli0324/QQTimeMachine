<template>
    <div :class="['message-container', is_sending ? 'send' : '']">
        <div class="avatar-container">
            <img :src="this.avatar_url()" />
        </div>
        <div class="text-container">
            <div class="text" v-html="this.render_msg(msg)"></div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {

    },
    props: {
        uid: Number,
        msg: [String, Object],
        name: String,
        is_sending: { type: Boolean, default: false },
    },
    methods: {
        avatar_url() {
            return `https://q2.qlogo.cn/headimg_dl?dst_uin=${this.uid}&spec=100`;
        },
        render_msg(msg) {
            let result = '';
            let imbase = 'http://gchat.qpic.cn';
            for (let c of msg) {
                switch (c['msg-type']) {
                    case 0:
                        result += `<pre>${c.text}</pre>`;
                        break;
                    case 1:
                        result += `<img src="${imbase}${c.url}" referrerpolicy="no-referrer" />`;
                        break;
                }
            }
            return result;
        },
    }
})
</script>


<style scoped>
.text > p {
    line-height: 20px;
    margin-top: 0;
    margin-bottom: 0;
}
.message-container {
    height: auto;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 20px 0;
}
.avatar-container {
    height: 36px;
    width: 36px;
    min-height: 36px;
    min-width: 36px;
    border-radius: 50%;
    margin-top: 25px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px 0 20px;
}
.avatar-container img {
    height: 100%;
    width: 100%;
}
.send,
.send * {
    flex-direction: row-reverse;
}
.send .avatar-container {
    margin: 0 20px 0 10px;
}

.text-container {
    width: 70%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.text {
    line-height: 30px;
    padding: 5px;
    display: flex;
    border-radius: 5px;
    text-align: left;
    background: rgb(243, 243, 243);
    word-break: break-all;
}
.text :deep(img) {
    max-width: 30vw;
}
.text :deep(pre) {
    margin: 0 0 0 0;
    font-size: 20px;
}
</style>