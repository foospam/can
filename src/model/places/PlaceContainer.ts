import GameSettings from '../GameSettings.ts';
import Point from './Point.ts';
import Place from './Place';

const placeNames: string[] = [
    "St. Cecilia's Academy of Fine Arts",
    "St. Augustine's Preparatory School",
    "St. Ambrose's Grammar School",
    "Our Lady of Guadalupe College",
    "St. Ignatius Jesuit Academy",
    "St. Michael's Archangel School",
    "St. Benedict's Preparatory College",
    "Divine Mercy Preparatory School"
  ];

class PlaceContainer {
    private static places: Place[] = [];
    private static placeDict : Map<string, Place>;

    static initializePlaces(): void {
        PlaceContainer.places = [];
        PlaceContainer.placeDict = new Map<string, Place>;
        const points: Point[] = PlaceContainer.getPoints();

        for (let i = 0; i < GameSettings.NUMBER_OF_PLACES; i++) {
            const placeName = placeNames[i];
            const placeCoordinates = points[i];
            const place = new Place(placeName, placeCoordinates);
            PlaceContainer.places.push(place);
            PlaceContainer.placeDict.set(placeName, place);
        }
    }

    static returnTicketPrices(origin: number | string): number[] {
        let originPlace : Place;

        if (typeof origin === 'number') {
            const placeIndex = origin;
            originPlace = PlaceContainer.places[placeIndex];
        } else if (typeof origin === 'string') {
            originPlace = PlaceContainer.getPlaceByName(origin);
        }

        const ticketPrices: number[] = PlaceContainer.places.map((place) =>
            Math.floor(originPlace.distanceTo(place) * GameSettings.PRICE_PER_KM)
        );

        return ticketPrices;
    }

    static getPlaceByName(name: string): Place {
        const selectedPlace = PlaceContainer.placeDict.get(name);
        if (selectedPlace instanceof Place) {
            return selectedPlace;
        }
        else return new Place("Nowhere", new Point(0,0))
    }

    private static getPoints(): Point[] {
        const points: Point[] = [PlaceContainer.getRandomPoint()];

        externalloop: while (points.length < GameSettings.NUMBER_OF_PLACES) {
            const point = PlaceContainer.getRandomPoint();
            for (const point2 of points) {
                if (point.distance(point2) < GameSettings.MIN_DISTANCE) continue externalloop;
            }
            points.push(point);
        }

        return points;
    }

    private static getRandomPoint(): Point {
        return new Point (
            Math.floor(Math.random() * GameSettings.WORLD_SIZE),
            Math.floor(Math.random() * GameSettings.WORLD_SIZE))
    }

    static getRandomPlace(): Place {
        const randomIndex = Math.floor(Math.random() * PlaceContainer.places.length);
        return PlaceContainer.places[randomIndex];
    }

    static getPlaceName(index: number): string {
        return PlaceContainer.places[index].name;
    }

    static getPlaceByIndex(index: number): Place {
        return PlaceContainer.places[index];
    }

    static randomUpdateStuffPrices(): void {
        for (const place of PlaceContainer.places) {
            place.updateStuffPrices();
        }
    }

    static setPlaces(placeArray: Place[]): void {
        PlaceContainer.places = placeArray;
    }
}

export default PlaceContainer;