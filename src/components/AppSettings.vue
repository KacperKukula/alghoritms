<template>
    <div class="settingCard">
      <!--SHOW POINTS-->
      <h2>Dostępne punkty:</h2>
      <div class="pointCard_container">
        <v-card v-for="point in modelValue" :key="point.id" variant="tonal">
          <point-tale :point="point" />
        </v-card>
      </div>

      <!--ADD POINT-->
      <v-row class="pt-5" :class="'pointAdd'">
        <v-col md="12">
          <v-text-field v-model="newPoint.name" label="Name" variant="outlined" hide-details></v-text-field>
        </v-col>
        <v-col md="6">
          <v-text-field v-model="newPoint.x" label="X position" variant="outlined" hide-details></v-text-field>
        </v-col>
        <v-col md="6">
          <v-text-field v-model="newPoint.y" label="Y position" variant="outlined" hide-details></v-text-field>
        </v-col>
        <v-btn class="ml-5 mt-2" width="30%" color="rgb(192, 192, 194)" variant="flat" @click="appendPoint()" :disabled="animationStarted">+</v-btn>
      </v-row>

      <!--RUN-->
      <div class="settingCard_nextBtn" @click="run()">{{ animationStarted ? 'RUN!' : 'NEXT STEP' }}</div>
    </div>
</template>
  
<script>
import Point from '../models/Point.ts';
import PointTale from './PointTale.vue';
import { ref } from 'vue';

export default {
  name: 'AppSettings',
  props: {
    modelValue: {
      type: Array,
    },
    animationStarted: {
      type: Boolean,
    },
  },
  components: {
    PointTale,
  },
  setup(props, { emit }) {
    const newPoint = ref(new Point('', 0, 0));
    let nextMove = '';

    const appendPoint = () => {
      emit('append-point', newPoint.value);
      newPoint.value = new Point('', 0, 0);
    };

    const run = () => { emit('run'); };

    return {
      newPoint,
      appendPoint,
      run
    }
  }
}
</script>

<style scoped>
.settingCard {
  background-color: rgba(29, 29, 29, 0.645);
  border-radius: 30px;
  padding: 1rem 1.2rem;
}
h2 {
  font-size: 1.2rem;
  padding-bottom: 1rem;
}
.pointCard.entryPoint {
  cursor: pointer;
  background-color: rgb(36, 36, 41);
  border: #0c510c 2px solid;
}
.pointCard_container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .4rem;
}
.settingCard_nextBtn {
  margin-top: 1.8rem;
  cursor: pointer;
  border-top: 2px solid rgba(183, 183, 183, 0.6);
  padding: 12px 0 4px;
  width: 100%;
  text-align: center;
  transition: all .15s ease-in-out;
  border-radius: 0 0 2rem 2rem;
}
.settingCard_nextBtn:hover {
  background-color: rgba(198, 198, 207, 0.3);
}


</style>