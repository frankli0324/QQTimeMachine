<template>
    <span v-if="part['msg-type'] == 0">
        {{ part['text'].replace('\r\n', '<br />') }}
    </span>
    <VLazyImage v-else-if="part['msg-type'] == 1" :src="convert_url(part)" />
    <div v-else-if="part['msg-type'] == 1019" class="reply">
        <MessagePart :part="part" v-for="part, i in JSON.parse(part['sourceContent'])" :key="i" />
    </div>
    <span v-else-if="part['msg-type'] == 1023" class="at">
        {{ part.text }}
    </span>
    <span v-else-if="part['msg-type'] == 1020">[{{ part.text }}]</span>
    <span v-else>
        <!-- part['msg-type'] -->
    </span>
</template>

<script>
import { defineComponent } from 'vue'
import VLazyImage from "v-lazy-image"

export default defineComponent({
    components: { VLazyImage }, 
    setup() { },
    mounted() { },
    props: {
        part: Object,
    },
    methods: {
        convert_url(part) {
            let scheme = (window && window.process && window.process.versions && window.process.versions.electron) ?
                "qimg" : "/qimg?u=qimg";
            if ((part['url'] || '').startsWith('/gchatpic_new')) {
                let sender = part['url'].split('/')[2];
                return `${scheme}://group/${sender}/${part['md5']}/${part['file-name']}/${part['file-id']}`;
            } else if ((part['url'] || '').startsWith('/offpic_new')) {
                let sender = part['url'].split('/')[2];
                return `${scheme}://user/${sender}/${part['md5']}/${part['file-name']}`;
            } else {
                return '';
            }
        }
    }
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
