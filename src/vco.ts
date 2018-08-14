export default class VCO {
    context: any;
    oscillator: any;
    input: any;
    output: any;
    lfo: any;
    constructor(context: any) {
        this.context = context;
        this.oscillator = context.createOscillator();
        this.oscillator.type = 'sawtooth';

        this.start(this.context.currentTime);
    
        this.input  = this.oscillator;
        this.output = this.oscillator;
    }
    connect(node: any): void {
        if (node.hasOwnProperty('input')) {
            this.output.connect(node.input);
        } else {
            this.output.connect(node);
        };
    }
    start(time: number): void {
        this.oscillator.start(time);
    }
    stop(time: number): void {
        this.oscillator.stop(time);
    }
    setFrequency(frequency: number): void {
        this.oscillator.frequency.setValueAtTime(frequency, this.context.currentTime);
    }
}