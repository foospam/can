import State from "../model/auxiliaries/State";
import Shop from "./Shop";
import {ReactDOM}  from 'react-dom/client'
import Player from "../model/Player";
import ContextDataObject from "../model/auxiliaries/ContextDataObject";

interface MainSelectionMenuProps {
  switchState : (stateName : string) => void
  player : Player
  contextData : ContextDataObject
  updateContext : (context : ContextDataObject) => void
}

function MainSelectionMenu({switchState, player, contextData, updateContext} : MainSelectionMenuProps){

  const goToShop = () => {
    switchState("BuyShop");
  }

  const goSellStuff = () => {
    switchState("SellStuff");
  }

  const goToBusStation = () => {
    switchState("BusStation");
  }


    return (
        <div className="container h-100">
            <div className="row h-100">
              <div className="col-4 d-flex align-items-center justify-content-center">
                <button className="btn btn-primary btn-block" onClick={goToShop}>Buy stuff</button>
              </div>
              <div className="col-4 d-flex align-items-center justify-content-center">
                <button className="btn btn-primary btn-block" onClick={goSellStuff}>SellStuff</button>
              </div>
              <div className="col-4 d-flex align-items-center justify-content-center">
                <button className="btn btn-primary btn-block" onClick={goToBusStation}>Go to bus station</button>
              </div>
              <div className="col-4 d-flex align-items-center justify-content-center">
                <button className="btn btn-primary btn-block">Button 4</button>
              </div>
              <div className="col-4 d-flex align-items-center justify-content-center">
                <button className="btn btn-primary btn-block">Button 5</button>
              </div>
              <div className="col-4 d-flex align-items-center justify-content-center">
                <button className="btn btn-primary btn-block">Button 6</button>
              </div>
              <div className="col-4 d-flex align-items-center justify-content-center">
                <button className="btn btn-primary btn-block">Button 7</button>
              </div>
              <div className="col-4 d-flex align-items-center justify-content-center">
                <button className="btn btn-primary btn-block">Button 8</button>
              </div>
              <div className="col-4 d-flex align-items-center justify-content-center">
                <button className="btn btn-primary btn-block">Button 9</button>
              </div>
            </div>
          </div>
    )

}

export default MainSelectionMenu;