export default class Arc {
    x: number;
    y: number;
    radius: number;
    startAngle: number;
    endAngle: number;
    anticlockwise: boolean;
    color: string;
    constructor(x, y, r, sA, eA, acw, c) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.startAngle = sA;
        this.endAngle = eA;
        this.anticlockwise = acw;
        this.color = c;
    }
}