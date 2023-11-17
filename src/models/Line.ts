import Point from "./Point";

export default class Line {
    posY: [number, number];
    posX: [number, number];

    constructor(start: Point, end: Point) {
        this.posY = [start.y, end.y];
        this.posX = [start.x, end.x];
    }
}