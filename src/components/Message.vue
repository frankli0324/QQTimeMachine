<template>
    <div :class="['message-container', is_sending ? 'send' : 'recv']">
        <div class="avatar-container">
            <img :src="this.avatar_url()" />
        </div>
        <div class="content-container">
            <div class="name-container">
                <div>{{ this.name }}</div>
            </div>
            <div class="text-container">
                <div class="text" v-html="this.render_msg(msg)"></div>
            </div>
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
        avatar_url(uid) {
            return `https://q2.qlogo.cn/headimg_dl?dst_uin=${uid || this.uid}&spec=100`;
        },
        render_msg(msg) {
            let result = '';
            let imbase = 'http://gchat.qpic.cn';
            for (let c of msg) {
                switch (c['msg-type']) {
                    case 0:
                        result += `<span>${c.text}</span>`;
                        break;
                    case 1:
                        result += `<img src="${imbase}${c.url}" referrerpolicy="no-referrer" />`;
                        break;
                    case 1019:
                        result = `<div class="reply">
                            ${this.render_msg(JSON.parse(c.sourceContent))}
                        </div>` + result;
                        break;
                    case 1020:
                        result += `[${c.text}]`;
                        break;
                    case 1023:
                        result += `<span style="color: darkblue; font-size: 17px;">${c.text}</span>`;
                        break;
                    default:
                        console.log(c['msg-type']);
                }
            }
            return result;
        },
    }
})
</script>


<style scoped>
.message-container {
    height: auto;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 15px 0;
}
.recv {
    flex-direction: row;
}
.send {
    flex-direction: row-reverse;
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
/* .send .avatar-container {
    margin: 0 20px 0 10px;
} */

.content-container {
    display: flex;
    flex-direction: column;
    width: 70%;
}

.name-container {
    text-align: left;
    font-size: 14px;
    color: rgb(175, 168, 197);
    width: 100%;
}

.text-container {
    width: 100%;
    display: flex;
    align-items: center;
}
.recv .text-container {
    justify-content: flex-start;
}
.send .text-container {
    justify-content: flex-end;
}

.text {
    line-height: 30px;
    padding: 5px;
    flex-direction: column;
    border-radius: 5px;
    text-align: left;
    background: rgb(243, 243, 243);
    word-break: break-all;
}
.text :deep(img) {
    max-height: 25vw;
}
.text :deep(span) {
    margin: 0 0 0 0;
    font-size: 18px;
}
.text :deep(.reply) {
    font-size: 13px;
    border-radius: 5px;
    background: rgb(230, 230, 230);
    padding-left: 5px;
    padding-right: 5px;
}
.text :deep(.reply:hover) {
    cursor: pointer;
    background: rgb(215, 215, 215);
}
.text :deep(.reply:active) {
    cursor: pointer;
    background: rgb(210, 210, 210);
}
</style>
