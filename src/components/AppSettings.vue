<template>
    <div class="settingCard">
      <!--SHOW POINTS-->
      <h2>Dostępne punkty:</h2>
      <div class="pointCard_container">
        <v-card v-for="point in modelValue" :key="point.id" variant="tonal" class="pointCard" :class="point.isEntryPoint ? 'entryPoint' : ''"
          @click="changeEntryPoint(point)">
          <p>{{ "Nazwa: " + point.name }}</p>
          <p>{{ "X: " + point.x + ", Y: " + point.y }}</p>
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
      <v-btn class="mt-10" color="white" @click="run()" outlined>{{ started ? 'RUN!' : 'NEXT STEP' }}</v-btn>
    </div>
</template>
  
<script>
import Point from '../models/Point.ts';
import { ref } from 'vue';

export default {
  props: {
    modelValue: {
      type: Array,
    },
    animationStarted: {
      type: Boolean,
    },
  },
  name: 'AppSettings',
  setup(props, { emit }) {
    const newPoint = ref(new Point('', 0, 0));
    let nextMove = '';

    const appendPoint = () => {
      emit('append-point', newPoint.value);
      newPoint.value = new Point('', 0, 0);
    };

    const run = () => { emit('run'); };
    const changeEntryPoint = (point) => { emit('change-entry-point', point); };

    return {
      newPoint,
      appendPoint,
      changeEntryPoint,
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
.pointCard {
  padding: 0.6rem 1rem;
  border: 2px solid rgba(42, 42, 42, 0.6);
  border-radius: .6rem;
  background-color: rgba(27, 27, 27, 0.6);
  max-width: 15rem;
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
</style>