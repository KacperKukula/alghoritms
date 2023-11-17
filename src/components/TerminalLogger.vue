<template>
    <div class="terminalContainer">
        <v-card class="terminal" ref="terminala">
            <h2 class="pb-3">Terminal</h2>
            <div v-html="logs"></div>
        </v-card>
    </div>
</template>

<script>
import { watch, ref } from 'vue';

export default {
    props: {
        content: {
            type: Array,
        },
    },
    setup(props) {
        const logs = ref('');

        watch(() => props.content, (newLogs) => {
            logs.value += newLogs.map(str => `<p>${str}</p>`).join('');
        }, { deep: true });

        return { logs }
    }
}
</script>

<style scoped>
.terminalContainer {
    width: 100%;
    min-height: 100px;
    padding: 0.8rem .4rem 0;
}
.terminal {
    background-color: rgb(11, 11, 11);
    padding: .8rem;
    color: white;
    font-size: .8rem;
    height: 100%;
    line-height: 1.15rem;
}
</style>