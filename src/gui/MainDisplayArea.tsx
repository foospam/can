import MainSelectionMenu from "./MainSelectionMenu";
import State from "../model/auxiliaries/State";
import Shop from "./Shop"
import React, { Context } from "react";
import Player from "../model/Player";
import ContextDataObject from "../model/auxiliaries/ContextDataObject";
import SellStuff from "./SellStuff";
import BusStation from "./BusStation"
import Bank from "./Bank";
import LoanSharkScreen from "./LoanSharkScreen";
import HospitalScreen from "./HospitalScreen";

interface MainDisplayAreaProps {
  state: State
  player: Player
  contextData : ContextDataObject
  updateContext: (context : ContextDataObject) => void;
}

function MainDisplayArea({ state, player, contextData, updateContext }: MainDisplayAreaProps) {

  const [internalState, setInternalState] = React.useState<string>("MainSelectionMenu");

  const switchState = (state: string) : void => {
    setInternalState(state);
  }

  const currentState = (internalState : string) => {
    switch (internalState) {
      case "MainSelectionMenu": {
        return (
          <MainSelectionMenu switchState={switchState} player={player} contextData={contextData} updateContext={updateContext}/>
        )
      }
        break;
      case "BuyShop": {
        return (
          <Shop switchState={switchState} player={player} contextData={contextData} updateContext={updateContext}/>
        )
      }
      break;
      case "SellStuff": {
        return (
          <SellStuff switchState={switchState} player={player} contextData={contextData} updateContext={updateContext}/>
        )
      }
      break;
      case "BusStation": {
        return (
          <BusStation switchState={switchState} player={player} contextData={contextData} updateContext={updateContext}/>
        )
      }
      break;
      case "Bank": {
        return (
          <Bank switchState={switchState} player={player} contextData={contextData} updateContext={updateContext}/>
        )
      }
      break;
      case "LoanSharkScreen": {
        return (
          <LoanSharkScreen switchState={switchState} player={player} contextData={contextData} updateContext={updateContext}/>
        )
      }
      break;
      case "HospitalScreen": {
        return (
          <HospitalScreen switchState={switchState} player={player} contextData={contextData} updateContext={updateContext}/>
        )
      }
      break;

    }
  }


  return (

    <div className="col-sm-8" id="MainDisplayArea">
      {currentState(internalState)}
    </div>
  );
}

export default MainDisplayArea;