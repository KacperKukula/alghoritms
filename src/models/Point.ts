export default class Point {
    readonly name: string;
    readonly x: number;
    readonly y: number;
    done = false;
    isEntryPoint: boolean = false;

    constructor(name: string, x: number, y: number, isEntryPoint: boolean = false) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.isEntryPoint = isEntryPoint;
    }

    reset() {
        this.done = false;
    } 

    setDone() {
        this.done = true;
    }
}