import StuffContainer from '../goods/StuffContainer.ts';
import Stuff from '../goods/Stuff.ts';
import Point from './Point.ts';
import GameSettings from '../GameSettings.ts';


class Place {
    public name: string;
    private coordinates: Point;
    private stuffContainer: StuffContainer;

    constructor(name: string, coordinates: Point) {
        this.name = name;
        this.coordinates = coordinates;
        this.stuffContainer = new StuffContainer();
    }

    
    distanceTo(other: Place): number {
        return this.coordinates.distance(other.coordinates);
    }

    getStuffPriceByName(stuffName: string): number {
        return this.stuffContainer.getPrice(stuffName);
    }

    getStuffPriceByNumber(index: number): number {
        return this.stuffContainer.getPriceByIndex(index);
    }

    getStuffName(index: number): string {
        return this.stuffContainer.getStuffName(index);
    }

    getStuff(index: number): Stuff {
        return this.stuffContainer.getStuff(index);
    }

    getRandomStuff(): Stuff {
        const randomIndex = Math.floor(Math.random() * this.stuffContainer.getSize());
        return this.getStuff(randomIndex);
    }

    updateStuffPrices(): void {
        this.stuffContainer.updateStuffPrices(GameSettings.RAMDOM_PRICE_VARIATION_PERCENTAGE);
    }

    getStuffPrices(): Map<string, number> {
        return this.stuffContainer.getStuffMap();
    }

    getStuffNames() : string[] {
        return this.stuffContainer.getStuffNameList();
    }

    getName() : string {
        return this.name;
    }

}

export default Place;