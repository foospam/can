import TimeListener from "./TimeListener";

class GameDate {
    private listeners: TimeListener[] = [];
    private value: Date;

    constructor() {
        this.value = new Date(1988, 3, 1);
    }

    updateDate(days: number): void {
        this.value.setDate(this.value.getDate() + days);
        this.notify(days);
    }


    subscribe(timeListener: TimeListener): void {
        this.listeners.push(timeListener);
    }

    private notify(days: number): void {
        for (const listener of this.listeners) {
            listener.updateTime(days);
        }
    }

    toString() : string {
        return this.value.toDateString();
    }
}

export default GameDate;