export default class VCA {
    context: any;
    gain: any;
    input: any;
    output: any;
    amplitude: Object;
    constructor(context: any) {
        this.context = context;
        this.gain = context.createGain();
        this.gain.gain.value = 0;
        this.input = this.gain;
        this.output = this.gain;
        this.amplitude = this.gain.gain;        
    }
    connect(node: any): void {
        if (node.hasOwnProperty('input')) {
            this.output.connect(node.input);
        } else {
            this.output.connect(node);
        };
    }
}