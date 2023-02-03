<template>
    <div v-if="['msg', 'file'].includes(style)" :class="['message-container', is_sending ? 'send' : 'recv']">
        <div class="avatar-container">
            <img :src="this.avatar_url()" />
        </div>
        <div class="content-container">
            <div class="wrapper">
                <div class="name-container">
                    {{ this.name }}
                </div>
            </div>
            <div class="wrapper">
                <div v-if="style === 'msg'" class="text-container">
                    <div class="text">
                        <MessagePart :part="part" v-for="part, i in msg" :key="i" />
                    </div>
                </div>
                <MessageFile v-else :msg="msg" class="file-container" />
            </div>
        </div>
    </div>
    <div v-else-if="style === 'notify'" class="notify-container">
        {{ msg }}
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import MessagePart from './MessagePart.vue';
import MessageFile from './MessageFile.vue';

export default defineComponent({
    components: { MessagePart, MessageFile },
    setup() {

    },
    data() {
        return {
            style: "",
        };
    },
    mounted() {
        if (typeof this.msg === "string") {
            if (this.msg.startsWith("<?xml")) {
                this.style = "xml";
            }
            else {
                this.style = "notify";
            }
        }
        else if (this.msg instanceof Array) {
            this.style = "msg";
        } else if (this.msg instanceof Object && this.msg.job_id) {
            this.style = "file";
        }
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
    },
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
.send .name-container {
    float: right;
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

.send .file-container {
    float: right;
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
</style>
