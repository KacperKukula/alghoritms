import Point from './Point';

export default function createSvgPoint(pointData: Point, radius = 2, fill = 'blue') {
    let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    circle.setAttribute('cx', pointData.x.toString());
    circle.setAttribute('cy', pointData.y.toString());
    circle.setAttribute('r', radius.toString());
    circle.setAttribute('fill', fill);

    return circle;
}