class Stuff {
    public name: string;
    public price: number;
    private maxPrice: number;
    private minPrice: number;

    constructor(name: string, maxPrice: number, minPrice: number) {
        this.name = name;
        this.price = 0;
        this.maxPrice = maxPrice;
        this.minPrice = minPrice;
        this.updatePriceWithParams(minPrice, maxPrice);
    }

    updatePriceWithParams(minPrice: number, maxPrice: number): void {
        this.price = Math.floor(Math.random() * (maxPrice - minPrice) + minPrice);
    }

    updatePrice(): void {
        this.updatePriceWithParams(this.minPrice, this.maxPrice);
    }

    randomPriceUpdate(percentage: number): void {
        const randomIncrease = (1 + Math.random() * percentage / 100);
        const randomDecrease = (1 - Math.random() * percentage / 100);
        const randomFactor = Math.random() < 0.5 ? randomIncrease : randomDecrease;
        this.price = Math.floor(this.price * randomFactor);
    }

    priceUp(): void {
        this.updatePriceWithParams(this.price, this.maxPrice);
    }

    priceDown(): void {
        this.updatePriceWithParams(this.minPrice, this.price);
    }

    getPrice(): number {
        return this.price;
    }

    getName(): string {
        return this.name;
    }

    priceUpByPercentage(percent: number): void {
        this.price += Math.floor((this.price * percent) / 100);
        this.price = Math.min(this.price, this.maxPrice);
    }

    priceDownByPercentage(percent: number): void {
        this.price -= Math.floor((this.price * percent) / 100);
        this.price = Math.max(this.price, this.minPrice);
    }
}

export default Stuff;