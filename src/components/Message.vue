<template>
    <div v-if="style === 'msg'" :class="['message-container', is_sending ? 'send' : 'recv']">
        <div class="avatar-container">
            <img :src="this.avatar_url()" />
        </div>
        <div class="content-container">
            <div class="name-container">
                {{ this.name }}
            </div>
            <div class="text-container">
                <div class="text" v-html="this.render_msg(msg)"></div>
            </div>
        </div>
    </div>
    <div v-if="style === 'notify'" class="notify-container">
        {{ msg }}
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {

    },
    data() {
        return {
            style: '',
        }
    },
    mounted() {
        if (typeof this.msg === 'string') {
            if (this.msg.startsWith('<?xml')) {
                this.style = 'xml';
            } else {
                this.style = 'notify';
            }
        } else if (this.msg instanceof Array) {
            this.style = 'msg';
        }
        console.log(this.style);
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
            for (let c of msg) {
                switch (c['msg-type']) {
                    case 0:
                        result += `<span>${c.text.replace('\r\n', '<br/>')}</span>`;
                        break;
                    case 1:
                        result += (function() {
                            let ext = c['file-name'].split('.').pop()
                            let imbase = 'http://gchat.qpic.cn';
                            let url1 = `http://localhost:8000/${c['md5']}.${ext}`;
                            let url2 = `${imbase}${c.url}`;
                            return `<img src="${url1}" referrerpolicy="no-referrer" onerror="
                                if (!this.fallback) { this.src = '${url2}'; this.fallback = true; }
                            " />`;
                        })()
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
.notify-container {
    font-size: 14px;
    width: fit-content;
    margin: 5px auto;
    color: rgb(165, 165, 165);
    padding: 3px 5px;
    border-radius: 5px;
    background: rgb(248, 248, 248);
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
    width: fit-content;
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
    max-height: 25vh;
    max-width: 60vw;
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
