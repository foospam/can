import StuffCarrier from "./StuffCarrier.js";

const stuffCarriers: StuffCarrier[] = [
    new StuffCarrier("Old trenchcoat", 15, 500),
    new StuffCarrier("Big trenchcoat", 20, 1000),
    new StuffCarrier("Deluxe trenchcoat", 40, 2000),
    new StuffCarrier("Army backpack", 60, 5000),
    new StuffCarrier("Trombone casing", 100, 8000)
]

export class StuffCarrierContainer {
    private static valueList: StuffCarrier[] = [];
    private static valueMap: Map<string, StuffCarrier> = new Map();

    static setValues() {
        StuffCarrierContainer.valueList = [];
        StuffCarrierContainer.valueMap.clear();

        stuffCarriers.forEach((carrier) => {
            StuffCarrierContainer.valueList.push(carrier);
            StuffCarrierContainer.valueMap.set(carrier.getName(), carrier)
        })

    }

    static getRandomCarrier(): StuffCarrier | null {
        const index = Math.floor(Math.random() * StuffCarrierContainer.valueList.length);
        const carrier = StuffCarrierContainer.valueList[index];
        return carrier;

    }

    static getCarrierByName(name: string): StuffCarrier {
        return StuffCarrierContainer.valueMap.get(name) ?? new StuffCarrier("Default carrier", 10, 500);
    }
}
