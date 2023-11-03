import MainDisplayArea from "./MainDisplayArea";
import StatsDisplay from "./StatsDisplay";
import Player from "../model/Player.ts";
import React from "react";
import State from "../model/auxiliaries/State.ts";
import ContextDataObject from "../model/auxiliaries/ContextDataObject.ts";


const state = new State();
const newPlayer = new Player();
const contextDataObject = new ContextDataObject(newPlayer);


function App() {

    const [contextData, setContextData] = React.useState(contextDataObject)
    const [date, updateDate] = React.useState(newPlayer.getGameDate().toString());
    const [events, getEvents] = React.useState()

    React.useEffect(() => { 
        if (date !== newPlayer.getGameDate().toString()) {
            updateDate(newPlayer.getGameDate().toString());
            console.log("a new day")
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
                <MainDisplayArea state={state} player={newPlayer} contextData={contextData} updateContext={updateDataObject} />
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