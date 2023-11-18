import Point from '../../models/Point';
import { Ref } from 'vue';

export function deletePoint(pointToDelete: Point, pointsRef: Ref<Point[]>) {
    pointsRef.value.splice(pointsRef.value.indexOf(pointToDelete), 1);
}

export function changeEntryPoint(clickedPoint: Point, pointsRef: Ref<Point[]>) {
    if(clickedPoint.isEntryPoint === true)
        return;
    
    pointsRef.value.forEach(point => point.isEntryPoint = false);
    clickedPoint.isEntryPoint = true;
}