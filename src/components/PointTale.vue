<template>
    <v-card-item variant="tonal" class="pointCard" :class="point.isEntryPoint ? 'entryPoint' : ''"
        @click.stop="changeEntryPoint(point)">
        <v-card-title>
            {{ point.name }}
        </v-card-title>
        <v-card-text>
            {{ "X: " + point.x + " Y: " + point.y }}
        </v-card-text>
        <div class="pointCard_delete">
            <v-icon size="small" @click.stop="deletePoint(point)">mdi-close-circle</v-icon>
        </div>
    </v-card-item>
</template>

<script>
import Point from '../models/Point.ts';
import '@mdi/font/css/materialdesignicons.css';
import { eventBus } from '../mods/eventBus/eventBus.js';
import EnumBusEvents from '../mods/eventBus/model/EnumBusEvents.ts';

export default {
    props: {
        point: {
            type: Point,
            required: true,
        },
    },
    setup(props, { emit }) {
        const deletePoint = (point) => {
            eventBus.emit(EnumBusEvents.DELETE_POINT, point);
        }

        const changeEntryPoint = (point) => {
            eventBus.emit(EnumBusEvents.CHANGE_ENTRY, point);
        }

        return { deletePoint, changeEntryPoint };
    }
}
</script>

<style>
.pointCard {
  padding: .3rem .6rem;
  border: 2px solid rgba(42, 42, 42, 0.6);
  border-radius: .6rem;
  background-color: rgba(27, 27, 27, 0.6);
  max-width: 15rem;
  position: relative;
}
.pointCard_delete {
    position: absolute;
    top: 10%;
    right: 10%;
    font-size: .8rem;
}
</style>