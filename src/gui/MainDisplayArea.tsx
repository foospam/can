import MainSelectionMenu from "./MainSelectionMenu";
import State from "../model/auxiliaries/State";
import React, { Context } from "react";
import Player from "../model/Player";
import ContextDataObject from "../model/auxiliaries/ContextDataObject";
import Shop from "./Shop";
import BusStation from "./BusStation"
import Bank from "./Bank";
import LoanSharkScreen from "./LoanSharkScreen";
import HospitalScreen from "./HospitalScreen";
import { ReclaimDebtEventModal } from "./EventScreens";
import EventQueue from "../model/events/EventQueue";
import { EventType } from "../model/events/EventName";
import Event from "../model/events/Event";

interface MainDisplayAreaProps {
  state: State
  player: Player
  contextData: ContextDataObject
  updateContext: (context: ContextDataObject) => void;
  eventQueue: Event[];
}

function MainDisplayArea({ state, player, contextData, updateContext, eventQueue }: MainDisplayAreaProps) {

  /* 
    const MainDisplayArea = React.useRef();
    MainDisplayArea.current = {
      addEvent : (event : Event) => setEventList()
    } */


    console.log("EXECUTING: MAIN DISPLAY AREA");

  const [internalState, setInternalState] = React.useState<string>("MainSelectionMenu");
  const switchState = (state: string): void => {
    setInternalState(state);
  }

  const currentState = (internalState: string) => {
    switch (internalState) {
      case "MainSelectionMenu": {
        return (
          <MainSelectionMenu switchState={switchState} player={player} contextData={contextData} updateContext={updateContext} eventQueue={eventQueue}/>
        )
      }
        break;
      case "BuyShop": {
        return (
          <Shop switchState={switchState} player={player} contextData={contextData} updateContext={updateContext} mode="buy" />
        )
      }
        break;
      case "SellStuff": {
        return (
          <Shop switchState={switchState} player={player} contextData={contextData} updateContext={updateContext} mode="sell" />
        )
      }
        break;
      case "BusStation": {
        return (
          <BusStation switchState={switchState} player={player} contextData={contextData} updateContext={updateContext} />
        )
      }
        break;
      case "Bank": {
        return (
          <Bank switchState={switchState} player={player} contextData={contextData} updateContext={updateContext} />
        )
      }
        break;
      case "LoanSharkScreen": {
        return (
          <LoanSharkScreen switchState={switchState} player={player} contextData={contextData} updateContext={updateContext} />
        )
      }
        break;
      case "HospitalScreen": {
        return (
          <HospitalScreen switchState={switchState} player={player} contextData={contextData} updateContext={updateContext} />
        )
      }
        break;

    }
  }


  return (

    <div className="col-8" id="mainDisplayArea">
      {currentState(internalState)}
    </div>
  );
}

export default MainDisplayArea;