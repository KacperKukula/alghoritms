<template>
    <div class="graphContainer" ref="graphContainer"></div>
</template>
    
<script>
import { onMounted, ref, watch } from 'vue';
import createSvgPoint from '../models/pointDomFactory.ts';
import Point from '../models/Point.ts';
import renderDiagram from './composables/diagramRenderer.ts';

export default {
    name: 'DiagramRenderer',
    props: {
        points: {
            type: Array,
            required: true,
        },
        lines: {
            type: Array,
            required: true,
        },
        rerender: {
            type: Boolean,
            required: false,
            default: false,
        }
    },
    setup(props) {
        const graphContainer = ref(null);

        let getGraphWidth = () => {
            return graphContainer.value.clientWidth;
        }

        let getGraphHeight = () => {
            return graphContainer.value.clientHeight;
        }

        const rerenderDiagram = () => {
            renderDiagram(getGraphWidth(), getGraphHeight(), props.points, props.lines, graphContainer.value);
        }

        onMounted(() => {
            rerenderDiagram();
        })

        watch(() => props.points, () => {
            rerenderDiagram();
        }, { deep: true });

        return {
            rerenderDiagram,
            graphContainer,
            getGraphHeight,
            getGraphWidth
        }
    }
};
</script>

<style scoped>
.graphContainer {
    width: 100%;
    height: 80vh;
    overflow: visible;
}
</style>