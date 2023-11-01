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


    return (
        <div className="container text-center">
            <div className="row">
                <MainDisplayArea state={state} player={newPlayer} contextData={[contextData, setContextData]}/>
                <StatsDisplay player={newPlayer} contextData={[contextData, setContextData]}/>
            </div>
        </div>
    );
}

export default App;