import VCO from './vco';
import VCA from './vca';
import LFO from './lfo';
import EnvelopeGenerator from './envelope_generator';

import Range from './range';

import { QwertyHancock } from '../public/js/qwerty-hancock/dist/qwerty-hancock.js';
var context: any = new AudioContext();
var keyboard: any = new QwertyHancock({
    id: 'keyboard',
    width: 720,
    height: 75,
    octaves: 3,
    startNote: 'A3',
    whiteKeyColour: 'black',
    blackKeyColour: 'black',
    borderColour: 'white',
    activeColour: 'pink'
});

var vco = new VCO(context);
var vca = new VCA(context);
var lfo = new LFO(context);
var envelope = new EnvelopeGenerator(context);

lfo.start(context.currentTime);

vco.connect(vca);
envelope.connect(vca.amplitude); 
lfo.volume.connect(vca.amplitude);
vca.connect(lfo.filter);
lfo.filter.connect(context.destination);


keyboard.keyDown = (note, freq, pos) => {
    lfo.setFrequency(freq);
    envelope.trigger();
}

keyboard.keyUp = (note, freq, pos) => {
    envelope.trigger();
}








var boxes: any[] = [];

const canvas: any = document.getElementById('canvas');
const ctx: any = canvas.getContext('2d', { alpha: false });
const WIDTH: number = canvas.width;
const HEIGHT: number = canvas.height;
const ghostcanvas: any = document.createElement('canvas');

ghostcanvas.height = HEIGHT;
ghostcanvas.width = WIDTH;

const gctx: any = ghostcanvas.getContext('2d');

var canvasValid: boolean = false;
var mySel: any;

var offsetx: number;
var offsety: number;

function addArc(ranges) {
    ranges.map((range, i) => {
        var r: any = new Range(...range);
        boxes.push(r);
    })

    invalidate();
}

function init(): void {
    canvas.onselectstart = function (): boolean { return false; }

    requestAnimationFrame(draw)

    canvas.onmousedown = myDown;
    canvas.onmouseup = myUp;

    addArc([
        [65, 72, 32, -3.1, 2 * Math.PI, false, 'white', ctx, canvas, { $: envelope, key: 'attackTime' }, {
            fontSize: 12,
            fontColor: 'white',
            title: 'ATTACK TIME',
            lineWidth: 1.5,
            length: 10
        }],
        [65, 250 - 32, 32, -3.1, 2 * Math.PI, false, 'white', ctx, canvas, { $: envelope, key: 'releaseTime' }, {
            fontSize: 12,
            fontColor: 'white',
            title: 'RELEASE TIME',
            lineWidth: 1.5,
            length: 10
        }],
        [65 + 148, 72, 32, -3.1, 2 * Math.PI, false, 'white', ctx, canvas, { $: lfo.filter.frequency, key: 'value' }, {
            fontSize: 12,
            fontColor: 'white',
            title: 'FILTER FREQUENCY',
            lineWidth: 1.5,
            length: 10
        }],
        [65 + 148, 250 - 32, 32, -3.1, 2 * Math.PI, false, 'white', ctx, canvas, { $: lfo.filter.Q, key: 'value' }, {
          fontSize: 12,
          fontColor: 'white',
          title: 'LFO Q',
          lineWidth: 1,
          length: 10,
          min: 0,
          max: 10,
          step: 0.1
      }],
      [65 + (148 * 2), 72, 32, -3.1, 2 * Math.PI, false, 'white', ctx, canvas, { $: lfo.oscillator.frequency, key: 'value' }, {
        fontSize: 12,
        fontColor: 'white',
        title: 'LFO 2 FREQUENCY',
        lineWidth: 1.5,
        length: 10
    }]
    ]);
}

function clear(c): void {
    c.clearRect(0, 0, WIDTH, HEIGHT);
}

function draw(): void {
    if (canvasValid == false) {
        clear(ctx);

        var l = boxes.length;

        for (var i = 0; i < l; i++) {
            drawshape(ctx, boxes[i]);
        }

        canvasValid = true;
    }

    requestAnimationFrame(draw);
}

function drawshape(context, arc): void {
    if (arc.out.x > WIDTH || arc.out.y > HEIGHT) return;
    if (arc.out.x + arc.out.radius < 0 || arc.out.y + arc.out.radius < 0) return;
    if (arc.in.x > WIDTH || arc.in.y > HEIGHT) return;
    if (arc.in.x + arc.in.radius < 0 || arc.in.y + arc.in.radius < 0) return;

    arc.draw(canvas);    
}

function myMove(e): void {
    if (mySel && mySel.active) {
        var target = mySel.target.$;
        var param = mySel.target.key;
        var mouse = mySel.getMousePos(e);
        var mx = mouse.mx;
        var my = mouse.my;

        var calcX = mx - offsetx;
        var calcY = my - offsety;

        var rotate = Math.atan2(calcY, calcX);

        mySel.out.startAngle = rotate - Math.PI;
        mySel.out.endAngle   = rotate + Math.PI * 2;

        mySel.in.startAngle = mySel.out.startAngle;
        mySel.in.endAngle   = mySel.out.endAngle;

        if (param == "value") {
            if (calcX > mySel.min) {
              target[param] += mySel.step;
              target[param] = target[param] % mySel.max;
            }

            if (rotate < mySel.min) {
              target[param] -= mySel.step;
              target[param] = target[param] % mySel.min;
            }
            if (calcX < 0) {
                target[param] += 1;
            } else {
                target[param] -= 1;
            }

          //   if (calcY < 0) {
          //     target[param] += 1;
          // } else {
          //     target[param] -= 1;
          // }
        }

        if (target[param] == 0.9) {
            rotate = Math.floor(Math.abs(+rotate.toFixed(1)) + 1);
        }

        if (target[param] == 1.9) {
            rotate = Math.floor(Math.abs(+rotate.toFixed(1)) + 1);
        }

        if (target[param] == 2.9) {
            rotate = Math.floor(Math.abs(+rotate.toFixed(1)) + 1);
        }

        if (target[param] == 3.7) {
            rotate = Math.floor(Math.abs(+rotate.toFixed(1)) + 1);
        }

        // var calculated: number = +rotate.toFixed(1);
        // target[param] = Math.floor(Math.abs(+rotate);
        if (target[param] > 0 && target[param] < 0.7) {
            target[param] = Math.abs(rotate);
        }
        if (target[param] > 0.7 && target[param] < 1.1) {
            target[param] = Math.abs(rotate) + 0.3;
        }

        if (target[param] > 1.1 && target[param] < 2.1) {
            target[param] = Math.abs(rotate) + 0.4;
        }
        if (target[param] > 2 && target[param] < 3.1) {
            target[param] = Math.abs(rotate) + 0.6;
        }

        if (target[param] > 3.1 && target[param] < 4.3) {
            target[param] = Math.abs(rotate) + 0.9;
        }

        invalidate();
    }
}

function myDown(e): void {
    canvas.onmousemove = myMove;

    boxes.map((arc, i) => {
        var mouse = arc.getMousePos(e);
        var mx = mouse.mx;
        var my = mouse.my;

        drawshape(gctx, arc);

        if ((mx >= arc.out.x / 2 && mx <= arc.out.x + arc.out.radius) && (my >= arc.out.y / 2 && my <= arc.out.y + arc.out.radius)) {
            mySel = boxes[i];

            offsetx = (mx - mySel.out.startAngle);
            offsety = (my - mySel.out.endAngle);

            arc.toggleActive(true);

            invalidate();
            clear(gctx);
            return;
        } else {
            // mySel = null;
        }
    });

    clear(gctx);
    invalidate();
}

function myUp(): void {
    mySel.toggleActive(false);
    canvas.onmousemove = null;
}

function invalidate(): void {
    canvasValid = false;
}

init();

