export default class LFO {
    context: any;
    volume: any;
    oscillator: any;
    filter: any;
    input: any;
    output: any;
    constructor(context: any) {
        this.context = context;
        this.volume = this.context.createGain();

        this.oscillator = this.context.createOscillator();
        this.oscillator.type = "sawtooth";

        this.filter = this.context.createBiquadFilter();
        this.filter.type = "lowpass";
        this.filter.frequency.value = 200;


        this.oscillator.frequency.value = 1;
        this.volume.gain.value = 1;

        this.input  = this.oscillator;
        this.output = this.oscillator;

        this.connect(this.volume);
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