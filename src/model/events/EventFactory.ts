import { Controller } from './controller';
import { Player } from './player';
import { Place, PlaceContainer } from './places';
import EventName from './EventName';
import GameSettings from '/src/model/GameSettings.ts';


class EventFactory {
    static randomPlaceEvents: EventName[] = [];
    static randomUserEvents: EventName[] = [];
    static reclaimDebtEvent: Event;
    static gameOverEvent: GameOverEvent;

    private constructor() { }

    public static initializeEvents(player: Player): void {
        EventFactory.addEventWithFrequency(EventFactory.randomPlaceEvents, EventName.PRICE_DECREASE_EVENT);
        EventFactory.addEventWithFrequency(EventFactory.randomPlaceEvents, EventName.PRICE_INCREASE_EVENT);

        EventFactory.addEventWithFrequency(EventFactory.randomUserEvents, EventName.BUY_STUFF_CARRIER_EVENT);
        EventFactory.addEventWithFrequency(EventFactory.randomUserEvents, EventName.BUY_ARM_EVENT);
        EventFactory.addEventWithFrequency(EventFactory.randomUserEvents, EventName.MONEY_ROBBERY_EVENT);
        EventFactory.addEventWithFrequency(EventFactory.randomUserEvents, EventName.STUFF_ROBBERY_EVENT);
        EventFactory.addEventWithFrequency(EventFactory.randomUserEvents, EventName.POLICE_COMBAT_EVENT);

        EventFactory.reclaimDebtEvent = new ReclaimDebtEvent(player);

        EventFactory.gameOverEvent = new GameOverEvent(player);
    }

    private static addEventWithFrequency(eventList: EventName[], eventName: EventName): void {
        for (let i = 0; i < GameSettings.EVENT_FREQUENCY[eventName]; i++) {
            eventList.push(eventName);
        }
    }

    private static pushRandomPlaceEvent(place: Place, player: Player): void {
        if (Math.random() < GameSettings.RANDOM_PLACE_EVENT_FREQ) {
            Controller.pushEventMessage(new EventMessage(
                EventFactory.ofName(
                    EventFactory.randomPlaceEvents[Math.floor(Math.random() * EventFactory.randomPlaceEvents.length)],
                    player
                ),
                place
            ));
        }
    }

    public static pushRandomUserEvents(player: Player): void {
        if (Math.random() < GameSettings.RANDOM_USER_EVENT_FREQ) {
            Controller.pushEventMessage(new EventMessage(
                EventFactory.ofName(
                    EventFactory.randomUserEvents[Math.floor(Math.random() * EventFactory.randomUserEvents.length)],
                    player
                ),
                player.getLocation()
            ));
        }
    }

    public static pushRandomPlaceEvents(player: Player): void {
        PlaceContainer.getAllPlaces().forEach((place) => {
            EventFactory.pushRandomPlaceEvent(place, player);
        });
    }

    public static pushDailyPriceUpdateEvent(player: Player): void {
        Controller.pushEventMessage(new EventMessage(new UpdatePricesDailyEvent(player), null));
    }

    public static pushDebtEvent(): void {
        Controller.pushEventMessage(new EventMessage(EventFactory.reclaimDebtEvent, null));
    }

    public static pushGameOverEvent(): void {
        Controller.pushEventMessage(new EventMessage(EventFactory.gameOverEvent, null));
    }

    private static ofName(name: EventName, player: Player): Event {
        switch (name) {
            case EventName.PRICE_DECREASE_EVENT:
                return new PriceDecreaseEvent(player);
            case EventName.PRICE_INCREASE_EVENT:
                return new PriceIncreaseEvent(player);
            case EventName.BUY_ARM_EVENT:
                return new BuyArmEvent(player);
            case EventName.BUY_STUFF_CARRIER_EVENT:
                return new BuyStuffCarrierEvent(player);
            case EventName.POLICE_COMBAT_EVENT:
                return new PoliceCombatEvent(player);
            case EventName.GAME_OVER_EVENT:
                return EventFactory.gameOverEvent;
            case EventName.RECLAIM_DEBT_EVENT:
                return EventFactory.reclaimDebtEvent;
            case EventName.MONEY_ROBBERY_EVENT:
                return new MoneyRobberyEvent(player);
            case EventName.STUFF_ROBBERY_EVENT:
                return new StuffRobberyEvent(player);
            case EventName.DAILY_PRICE_UPDATE_EVENT:
                return new UpdatePricesDailyEvent(player);
        }
    }
}

export default EventFactory;