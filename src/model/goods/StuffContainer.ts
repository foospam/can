import Stuff from "./Stuff";

const stuffNames : string[] = [
    "Berry Bliss Bites",
    "Chocolate Chuckles",
    "Caramel Delight",
    "Fruity Fizz Pops",
    "Rainbow Gummies",
    "Sweetie Swirls",
    "Lemon Drops",
    "Cherry Chews"
]

class StuffContainer {
    stuffMap: Map<string, number>;
    stuffList: Stuff[];

    constructor() {
        this.stuffList = [];
        this.stuffMap = new Map();
        this.fillStuffList();
    }

    private fillStuffList() {
        for (let i = 0; i < stuffNames.length; i++) {
            const stuffName = stuffNames[i];
            const newStuff = new Stuff(stuffName, 3 ** (stuffNames.length + 2 - i), 3 ** (stuffNames.length + 1 - i));
            this.stuffList.push(newStuff);
            this.stuffMap.set(stuffName, i);
        }
    }

    getPrice(name: string): number {
        return this.stuffList[this.stuffMap.get(name)!].price;
    }

    getPriceByIndex(index: number): number {
        return this.stuffList[index].price;
    }

    getStuffName(index: number): string {
        return this.stuffList[index].name;
    }

    getStuff(index: number): Stuff {
        return this.stuffList[index];
    }

    getSize(): number {
        return this.stuffList.length;
    }

    updateStuffPrices(percentage: number): void {
        for (const stuff of this.stuffList) {
            stuff.randomPriceUpdate(percentage);
        }
    }

    getStuffMap() {
        return this.stuffMap;
    }

    getStuffNameList() : string[] {
        return this.stuffList.map(element => element.name);
    }
}

export default StuffContainer;