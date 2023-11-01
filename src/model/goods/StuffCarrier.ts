class StuffCarrier {
    private name: string;
    private hold: number;
    private price: number;

    constructor(name: string, hold: number, price: number) {
        this.name = name;
        this.hold = hold;
        this.price = price;
    }

    getName(): string {
        return this.name;
    }

    getHold(): number {
        return this.hold;
    }

    getPrice(): number {
        return this.price;
    }
}

export default StuffCarrier;