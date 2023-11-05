import { EventName, EventType} from "./EventName";

class Event {
    public eventName : EventName;
    public eventType : EventType;
    public eventValues : Array<string>;
    public local : boolean;

    constructor (eventName : EventName, eventType : EventType, eventValues : Array<string>) 
    {
        this.eventName = eventName;
        this.eventType = eventType;
        this.eventValues = eventValues;
        this.local = false;
    }


    public setLocal(placeName : string){
        if (this.eventType === EventType.RANDOM_PLACE_EVENT && this.eventValues[0] === placeName) {
            this.local = true;
        }
        else {
            this.local = false;
        }
    }

    public isLocalEvent() {
        return this.local;
    }
}

export default Event;