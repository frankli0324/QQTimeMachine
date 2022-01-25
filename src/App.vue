<template>
    <HeadBar :uin="self_uin" />
    <div class="row main-container">
        <SideBar />
        <Chat title="Group" :conversation="chat" :self_uin="self_uin" />
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import HeadBar from './components/HeadBar.vue'
import SideBar from './components/SideBar.vue'
import Chat from './components/Chat.vue'

export default defineComponent({
    name: 'App',
    components: {
        Chat, HeadBar, SideBar
    },
    async created() {
        let req = await fetch('http://localhost:8081/group/0')
        this.chat = (await req.json())['data']
    },
    data() {
        return {
            chat: [],
            self_uin: 0,
        }
    },
})
</script>

<style>
#app {
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: fixed;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.main-container {
    height: 100%;
}
.row {
    display: flex;
}
</style>
