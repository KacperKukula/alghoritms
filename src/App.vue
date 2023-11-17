<template>
  <h1 class="header">Algorytm Disktry</h1>
  <v-row>
    <v-col md="5" class="settings">
      <!--SETTINGS-->
      <app-settings class="settings" v-model="points" @append-point="points.push($event)" @run="run()" :started="started"
        @changeEntryPoint="changeEntryPoint" :animationStarted="!!currentPoint"/>
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
import { ref, toRefs, watch } from 'vue';
import AppSettings from './components/AppSettings.vue';
import DiagramRenderer from './components/DiagramRenderer.vue';
import Point from './models/Point.ts';
import Line from './models/Line.ts';
import TerminalLogger from './components/TerminalLogger.vue';
import { dijstraNextStep, renderLine } from './dijkstra.ts';

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
    
    let logger = ref([]);
    let rerenderChart = false;

    const run = () => {
      if(!currentPoint) {
        currentPoint = points.value.find(point => point.isEntryPoint === true );
        startedPoint = currentPoint;
      }

      currentPoint.setDone();
      previewsPoint = currentPoint;
      currentPoint = dijstraNextStep(points, currentPoint, lines, logger);

      // If didn't find next point, go to start
      if(!currentPoint) {
        currentPoint = renderLine(lines, previewsPoint, startedPoint);
        startedPoint = false;
      }

      // Rerender chart
      rerenderChart = !rerenderChart;
    }

    const changeEntryPoint = (clickedPoint) => {
      if(clickedPoint.isEntryPoint === true) return;
      points.value.forEach(point => point.isEntryPoint = false);
      clickedPoint.isEntryPoint = true;
      console.log(points.value)
    }

    watch(logger, ()=> {
      console.log('logger changed');
    });

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
  padding: 0 2rem;
}
</style>