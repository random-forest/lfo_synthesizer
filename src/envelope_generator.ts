export default class EnvelopeGenerator {
    context: any;
    attackTime: number;
    releaseTime: number;
    param: any;
    constructor(context: any) {
        this.context = context;
        this.attackTime = 0.1;
        this.releaseTime = 0.1;
    }
    trigger(): void {
        var now = this.context.currentTime;
        this.param.cancelScheduledValues(now);
        this.param.setValueAtTime(0, now);
        this.param.linearRampToValueAtTime(1, now + this.attackTime);
        this.param.linearRampToValueAtTime(0, now + this.attackTime + this.releaseTime); 
    }
    connect(param: any): void {
        this.param = param;
    }
}