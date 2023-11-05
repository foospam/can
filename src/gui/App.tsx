import MainDisplayArea from "./MainDisplayArea";
import StatsDisplay from "./StatsDisplay";
import Player from "../model/Player.ts";
import React from "react";
import State from "../model/auxiliaries/State.ts";
import ContextDataObject from "../model/auxiliaries/ContextDataObject.ts";
import PlaceContainer from "../model/places/PlaceContainer.ts";
import EventQueue from "../model/events/EventQueue.ts";
import { EventType } from "../model/events/EventName.ts";
import Event from "../model/events/Event.ts";

const state = new State();
const newPlayer = new Player();
const contextDataObject = new ContextDataObject(newPlayer);


function App() {


    console.log("EXECUTING: APP");

    const [contextData, setContextData] = React.useState(contextDataObject)
    const [date, updateDate] = React.useState(newPlayer.getGameDate().toString());
    const [eventQueue, setEventQueue] = React.useState<Event[]>([])

    React.useEffect(() => {
        if (date !== newPlayer.getGameDate().toString()) {
            updateDate(newPlayer.getGameDate().toString());
            console.log("a new day")
            PlaceContainer.randomUpdateStuffPrices();
            setContextData(new ContextDataObject(newPlayer));
            
            const newEventQueue: Event[] = [];
            while (!EventQueue.isEmpty()) {
                const newEvent: Event | null = EventQueue.poll();
                if (newEvent !== null) {
                    newEventQueue.push(newEvent);
                }
            }
            setEventQueue(newEventQueue);
        }
    },
        [contextData]
    )

    const updateDataObject = (context: ContextDataObject): void => {
        setContextData(context);
    }



    return (
        <div className="container h-100 main-container">
            <div className="row">
                <MainDisplayArea state={state} player={newPlayer} contextData={contextData} updateContext={updateDataObject} eventQueue={eventQueue}/>
                <StatsDisplay
                    player={newPlayer}
                    contextData={contextData}
                    updateContext={updateDataObject} />
            </div>
        </div>
    );
}


function Other() {
    return (
        <>
            <h1 ref={AppRef}></h1>
        </>
    )
}

export default App;