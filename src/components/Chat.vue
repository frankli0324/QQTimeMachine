<template>
    <div class="chat-container">
        <div class="top">
            <div class="title">{{ title }}</div>
            <div class="icons"></div>
        </div>
        <div class="board">
            <div v-if="conversation">
                <div v-for="item, i in conversation" :key="item.msgId">
                    <div v-if="renderTime(i)" class="time">
                        {{ new Date(item.time*1000).toLocaleString() }}
                    </div>
                    <Message
                        :uid="item.flag == 1 ? item.uin : self_uin"
                        :name="item.nickName"
                        :msg="item.content"
                        :is_sending="item.flag != 1"
                    />
                </div>
            </div>
        </div>
        <div class="input"></div>
        <div class="sidebar"></div>
    </div>
</template>
<script>
import { defineComponent } from 'vue'
import Message from './Message.vue'

export default defineComponent({
    components: { Message },
    setup() {

    },
    props: {
        'title': String,
        'self_uin': Number,
        'conversation': Array,
        'meta': Object,
    },
    methods: {
        renderTime(idx) {
            if (idx === 0) return false;
            if (this.conversation[idx].time - this.conversation[idx - 1].time > 300)
                return true;
        }
    },
})
</script>

<style scoped>
.chat-container {
    width: 100%;
    height: 100%;
    overflow: scroll;
}
.top {
    display: flex;
    background-color: rgb(254, 254, 254);
    border-bottom: 1px solid rgb(240, 240, 240);
    font-size: 20px;
}
.title {
    width: 33%;
    text-align: left;
    padding-left: 10px;
}
.icons {
    width: 33%;
    margin-left: 33%;
    text-align: right;
    padding-right: 10px;
}
.time {
    color: rgb(165, 165, 165);
    font-size: 14px;
}
.board {
    width: 100%;
    overflow: auto;
    overflow-y: scroll;
    height: 80%;
    border-bottom: 1px solid rgb(240, 240, 240);
}
</style>