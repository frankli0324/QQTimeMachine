<template>
    <span v-if="part['msg-type'] == 0">
        {{ part['text'].replace('\r\n', '<br />') }}
    </span>
    <img v-if="part['msg-type'] == 1" loading="lazy"
        :src="`qimg://${part['url']}#${part['file-name'].split('.').pop()}`" />
    <div v-if="part['msg-type'] == 1019" class="reply">
        <MessagePart :part="part" v-for="part, i in JSON.parse(part['sourceContent'])" :key="i" />
    </div>
    <span v-if="part['msg-type'] == 1023" class="at">
        {{ part.text }}
    </span>
    <span v-if="part['msg-type'] == 1020">[{{ part.text }}]</span>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {

    },
    mounted() {
        if (this.part['msg-type'] == 1019) {
            console.log(this.part);
        }
    },
    props: {
        part: Object,
    },
})
</script>

<style scoped>
span {
    margin: 0 0 0 0;
    font-size: 18px;
}

img {
    max-height: 25vh;
    max-width: 60vw;
}

.at {
    color: darkblue;
    font-size: 17px;
}

.reply {
    font-size: 13px;
    border-radius: 5px;
    background: rgb(230, 230, 230);
    padding-left: 5px;
    padding-right: 5px;
}

.reply:hover {
    cursor: pointer;
    background: rgb(215, 215, 215);
}

.reply:active {
    cursor: pointer;
    background: rgb(210, 210, 210);
}
</style>
