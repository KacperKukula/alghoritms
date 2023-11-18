<template>
  <h1 class="header">Algorytm Disktry</h1>
  <v-row>
    <v-col md="5" class="settings">
      <!--SETTINGS-->
      <app-settings class="settings" v-model="points" @append-point="points.push($event)" :animationStarted="!!currentPoint"
        @run="run()" @changeEntryPoint="changeEntryPoint"/>
    </v-col>
    <v-col md="7">
      <div class="diagram">
        <diagram-renderer :points="points" :lines="lines" :rerender="rerenderChart"/>
      </div>
    </v-col>
  </v-row>
  <terminal-logger :content="logger" />
</template>

<script>
import { ref, toRefs, watch, onMounted } from 'vue';
import AppSettings from './components/AppSettings.vue';
import DiagramRenderer from './components/DiagramRenderer.vue';
import Point from './models/Point.ts';
import Line from './models/Line.ts';
import EnumBusEvents from './mods/eventBus/model/EnumBusEvents.ts';
import TerminalLogger from './components/TerminalLogger.vue';
import { dijstraNextStep, renderLine, distanceBetweenPoints } from './dijkstra.ts';
import { deletePoint, changeEntryPoint } from './components/composables/pointComposables.ts';
import { eventBus } from './mods/eventBus/eventBus.js';

export default {
  name: 'App',
  components: {
    AppSettings,
    DiagramRenderer,
    TerminalLogger
   },
  setup() {
    let points = ref([
      new Point('A', 20, 30, true),
      new Point('B', 30, 40),
      new Point('C', 100, 30),
      new Point('D', 60, 10),
    ]);

    let lines = ref([]);
    let currentPoint = null;
    let startedPoint = false;
    let previewsPoint = null;
    let score = ref(0);
    
    let logger = ref([]);
    let rerenderChart = false;

    onMounted(() => {
      eventBus.on(EnumBusEvents.DELETE_POINT, (pointToDelete) => deletePoint(pointToDelete, points) );
      eventBus.on(EnumBusEvents.CHANGE_ENTRY, (pointToEntry) => changeEntryPoint(pointToEntry, points) );
    })

    const run = () => {
      if(!currentPoint) {
        currentPoint = points.value.find(point => point.isEntryPoint === true );
        startedPoint = currentPoint;
      }

      currentPoint.setDone();
      previewsPoint = currentPoint;
      currentPoint = dijstraNextStep(points, currentPoint, lines, logger, score);

      // If didn't find next point, go to start
      if(!currentPoint) {
        logger.value.push('Go to start point');

        renderLine(lines, previewsPoint, startedPoint);
        let result = distanceBetweenPoints(previewsPoint, startedPoint);
        logger.value.push('<span style="color: yellow">' + previewsPoint.name + ' and ' + startedPoint.name + ' is ' + result + '</span>');
        score.value += result;
        startedPoint = false;
        logger.value.push('!!! <span style="color: green;"><b>Final score is: ' + score.value + '</b></span>');
      }

      // Rerender chart
      rerenderChart = !rerenderChart;
    }

    return { 
      points,
      run,
      logger,
      lines,
      rerenderChart,
      changeEntryPoint,
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 3rem;
  letter-spacing: .05rem;
  padding: .5rem 0 1rem .8rem;

  text-shadow: 0px 0px 5px var(--primary-accent);
}
.diagram {
  padding: 2rem;
}
</style>