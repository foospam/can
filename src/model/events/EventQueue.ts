import Event from "./Event";
import { EventName, EventType } from "./EventName";

class EventQueue {
    static nonLocalPlaceEvents: Event[];
    static randomUserEvents: Event[];
    static localPlaceEvents: Event[];
    static triggeredUserEvents: Event[];
    static gameOverEvent: boolean;

    static {
        EventQueue.nonLocalPlaceEvents = [];
        EventQueue.randomUserEvents = [];
        EventQueue.localPlaceEvents = [];
        EventQueue.triggeredUserEvents = [];
        EventQueue.gameOverEvent = false;
        console.log("Event Queue initialized")
    }

    public static poll(): Event | null {
        if (EventQueue.gameOverEvent !== false) {
            const result = new Event(EventName.GAME_OVER_EVENT, EventType.GAME_OVER_EVENT, []);
            EventQueue.gameOverEvent = false;
            return result;
        } else if (EventQueue.nonLocalPlaceEvents.length > 0) {
            return EventQueue.nonLocalPlaceEvents.shift() ?? null;
        } else if (EventQueue.randomUserEvents.length > 0) {
            return EventQueue.randomUserEvents.shift() ?? null;
        } else if (EventQueue.localPlaceEvents.length > 0) {
            return EventQueue.localPlaceEvents.shift() ?? null;
        } else if (EventQueue.triggeredUserEvents.length > 0) {
            return EventQueue.triggeredUserEvents.shift() ?? null;
        }
        return null;
    }

    public static isEmpty(): boolean {
        return (
            (EventQueue.gameOverEvent === false) &&
            (EventQueue.nonLocalPlaceEvents.length === 0) &&
            (EventQueue.randomUserEvents.length === 0) &&
            (EventQueue.localPlaceEvents.length === 0) &&
            (EventQueue.triggeredUserEvents.length === 0));
    }

    public static add(event: Event): void {
        if (event.eventType === EventType.RANDOM_PLACE_EVENT) {
            if (event.isLocalEvent() && !EventQueue.localPlaceEvents.includes(event)) {
                EventQueue.localPlaceEvents.push(event);
                console.log("Local place event added");
            } else {
                EventQueue.nonLocalPlaceEvents.push(event);
                console.log("Non-local place event added");
            }
        } else if (event.eventType === EventType.RANDOM_USER_EVENT) {
            EventQueue.randomUserEvents.push(event);
            console.log("Random user event added");
        }
        else if (event.eventType === EventType.RECLAIM_DEBT_EVENT) {
            EventQueue.triggeredUserEvents.push(event);
            console.log("Reclaim debt event added");
        }
        else {
            EventQueue.gameOverEvent = true;
            console.log("Game over event added");
        }

    }
}


export default EventQueue;