export function pitchNote(frequency: number, pos: number): number {
    return (frequency / 2) / (frequency / pos) % 4000;
}