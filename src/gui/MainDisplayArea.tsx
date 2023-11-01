import MainSelectionMenu from "./MainSelectionMenu";
import State from "../model/auxiliaries/State";
import Shop from "./Shop"
import React from "react";
import Player from "../model/Player";

interface MainDisplayAreaProps {
  state: State
  player: Player
}

function MainDisplayArea({ state, player }: MainDisplayAreaProps) {

  const [internalState, setInternalState] = React.useState<string>("MainSelectionMenu");

  const switchState = (state: string) : void => {
    setInternalState(state);
  }

  const currentState = (internalState : string) => {
    switch (internalState) {
      case "MainSelectionMenu": {
        return (
          <MainSelectionMenu switchState={switchState} player={player}/>
        )
      }
        break;
      case "BuyShop": {
        return (
          <Shop switchState={switchState} player={player}/>
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