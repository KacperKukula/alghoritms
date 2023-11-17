import Point from "./models/Point";
import Line from "./models/Line";
import { Ref } from 'vue';

/**
 * MAIN ENTRY FOR ALGORITHM
 * Generete a next step of dijkstra algorithm
 * @param pointsArray   - reference to points array
 * @param currentPoint  - current point (no reference)
 * @param linesArray    - reference to lines array
 * @param logger        - reference to logger array
 * @returns             - next point (no reference)
 */
export function dijstraNextStep(pointsArray: Ref<Point[]>, currentPoint: Point, linesArray: Ref<Line[]>, logger: Ref<string[]>) {
    
    logger.value = [ ];
    logger.value.push('... Next step ...');

    let nextPoint: Point | null = null;
    let bestDistance: number | null = null;
    pointsArray.value.forEach(point => {
        if(point.done) return;
        if(!nextPoint) nextPoint = point;
        if(point.name === currentPoint.name) return;

        logger.value.push('Computing distance between ' + currentPoint.name + ' and ' + point.name + '...');

        let result = distanceBetweenPoints(currentPoint, point)

        logger.value.push('<span style="color: yellow">' + currentPoint.name + ' and ' + point.name + ' is ' + result + '</span>');

        if(!bestDistance || bestDistance > result) {
            nextPoint = point;
            bestDistance = result;
        }
    })

    // Mark current point as done
    if(nextPoint) {
        logger.value.push('<span style="color: green">Best distance is ' + bestDistance + ' between ' + currentPoint.name + ' and ' + (nextPoint as Point).name + '</span>');
        renderLine(linesArray, currentPoint, nextPoint);
        return nextPoint;
    } else {
        logger.value.push('<span style="color: red">No next point found</span>');
        return null;
    }
}

/* UTILS */

export function renderLine(linesRef: Ref<Line[]>, firstPoint: Point, secondPoint: Point) {
    linesRef.value.push(new Line(firstPoint, secondPoint));
}

/**
 * Get distance between two points
 * @param point1 
 * @param point2 
 * @returns 
 */
function distanceBetweenPoints(point1: Point, point2: Point) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))
}