import Arc from './arc';

export default class Range {
    out: any;
    in: any;
    context: any;
    options: any;
    active: boolean;
    element: any;
    target: any;
    offsetx: number;
    offsety: number;
    constructor(x, y, r, sA, eA, acw, color, context, canvas, target, options) {
        this.context = context;
        this.options = options;
        this.active = false;
        this.element = canvas;
        this.target = target;
        this.out = new Arc(x, y, r, sA, eA, acw, color);
        this.in  = new Arc(x, y, r - 7, sA, eA, acw, color);
        this.offsetx = 0;
        this.offsety = 0;
    }
    draw(canvas: any): void {
       var ctx = this.context;
       var fontSize = this.options.fontSize;
       var fontColor = this.options.fontColor;
       var title = this.options.title;
       var lineWidth = this.options.lineWidth;
       var len = this.options.length;
       var radius = this.out.radius + len;

        ctx.font = fontSize + "px menlo";
        ctx.fillStyle = fontColor;

        ctx.fillText(title, this.out.x - (ctx.measureText(title).width / 2), this.out.y + (radius + fontSize));
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = this.out.color;
        
        ctx.arc(this.out.x, this.out.y, this.out.radius, this.out.startAngle, this.out.endAngle, this.out.anticlockwise);
        ctx.arc(this.in.x, this.in.y, this.in.radius, this.in.startAngle, this.in.endAngle, this.in.anticlockwise);
        
        ctx.stroke();
        ctx.closePath();

        var context2 = canvas.getContext('2d', { alpha: false });

        context2.beginPath();
        context2.lineWidth = 1;
        context2.strokeStyle = this.out.color;
        context2.font = "10px menlo";
        context2.fillStyle = 'white';

        context2.fillText(this.target.$[this.target.key].toFixed(1), this.out.x - 7.5, this.out.y + 2.5);
    
        context2.arc(this.out.x, this.out.y, radius, 2 * Math.PI / 2, 2 * Math.PI, false);
        context2.moveTo(this.out.x - (radius - 1), this.out.y);
        context2.lineTo((this.out.x - radius) - len, this.out.y);
        context2.fillText("0", ((this.out.x - radius) - len) - fontSize, this.out.y);

        // context2.moveTo((this.out.x - radius), (this.out.y - radius) + 6);
        // context2.lineTo(((this.out.x - radius) + len), ((this.out.y - radius) + len) + 5);
        // context2.fillText("1", ((this.out.x - radius) - len), (this.out.y - radius) + 2.5);

        context2.moveTo(this.out.x, this.out.y - radius - len);
        context2.lineTo(this.out.x, this.out.y - (radius - (len / 2) + 5));
        context2.fillText("2", this.out.x - 3, this.out.y - (radius + len) - 5);


        // context2.moveTo(this.out.x + radius, (this.out.y - radius) + 6);
        // context2.lineTo(((this.out.x + radius) - len), ((this.out.y - radius) + len) + 5);
        // context2.fillText("3", ((this.out.x + radius) - len) + (fontSize + 5), (this.out.y - radius) + 2);

        context2.moveTo(this.out.x + (radius - 1 ), this.out.y);
        context2.lineTo((this.out.x + radius) + len, this.out.y);
        context2.fillText("4", ((this.out.x + radius) + len) + 5, this.out.y);

        context2.stroke();
    }
    toggleActive(active: boolean): void {
        this.active = active;
    }
    getMousePos(e): any {
        var element: any = this.element;
        var offsetX: number = 0;
        var offsetY: number = 0;
    
        if (element.offsetParent) {
            do {
                offsetX += element.offsetLeft;
                offsetY += element.offsetTop;
            } while ((element = element.offsetParent));
        }
    
        var mx: number = (e.pageX - offsetX);
        var my: number = (e.pageY - offsetY);
        
        return {
            mx: mx,
            my: my
        }
    }
}