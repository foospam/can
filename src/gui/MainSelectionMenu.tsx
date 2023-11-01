import State from "../model/auxiliaries/State";
import Shop from "./Shop";
import {ReactDOM}  from 'react-dom/client'
import Player from "../model/Player";

interface MainSelectionMenuProps {
  switchState : (stateName : string) => void
  player : Player
}

function MainSelectionMenu({switchState} : MainSelectionMenuProps){


  const goToShop = () => {
    switchState("BuyShop");
  }


    return (
        <div className="container h-100">
            <div className="row h-100">
              <div className="col-4 d-flex align-items-center justify-content-center">
                <button className="btn btn-primary btn-block" onClick={goToShop}>Buy stuff</button>
              </div>
              <div className="col-4 d-flex align-items-center justify-content-center">
                <button className="btn btn-primary btn-block">Button 2</button>
              </div>
              <div className="col-4 d-flex align-items-center justify-content-center">
                <button className="btn btn-primary btn-block">Button 3</button>
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