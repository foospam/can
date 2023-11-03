import State from "../model/auxiliaries/State";
import Shop from "./Shop2";
import { ReactDOM } from 'react-dom/client'
import Player from "../model/Player";
import ContextDataObject from "../model/auxiliaries/ContextDataObject";
import { Modal, Button } from "react-bootstrap";
import React from 'react';

interface MainSelectionMenuProps {
  switchState: (stateName: string) => void
  player: Player
  contextData: ContextDataObject
  updateContext: (context: ContextDataObject) => void
}

interface PopUpModalProps {
  show: boolean
  handleClose: () => void
  text: string
}

function PopUpModal({ show, handleClose, text } : PopUpModalProps) {
  return (
    <Modal show={show} onHide={handleClose} dialog-class-name="modal-center">
{/*       <Modal.Header closeButton>
        <Modal.Title>Let's do nothing</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <p>{text}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function MainSelectionMenu({ switchState, player, contextData, updateContext }: MainSelectionMenuProps) {

  const [showPopup, setShowPopup] = React.useState(false);
  const handleShowPopup = () => setShowPopup(true);
  const handleClosePopup = () => {
    player.getGameDate().updateDate(1);
    updateContext(new ContextDataObject(player));
    setShowPopup(false);}


  const goToShop = () => {
    switchState("BuyShop");
  }

  const goSellStuff = () => {
    switchState("SellStuff");
  }

  const goToBusStation = () => {
    switchState("BusStation");
  }

  const goToBank = () => {
    switchState("Bank");
  }

  const goToLoanShark = () => {
    switchState("LoanSharkScreen");
  }

  const goToHospital = () => {
    switchState("HospitalScreen");
  }

  const layDown = () => {
    setShowPopup(true)
  }






  return (
    <>
      <div className="container h-100" id="mainSelectionMenu">
        <div className="row h-100">
          <div className="col-4 d-flex align-items-center justify-content-center">
            <button className="btn btn-transp btn-block w-100 h-100 p-2" onClick={goToShop}>Buy Candy</button>
          </div>
          <div className="col-4 d-flex align-items-center justify-content-center">
            <button className="btn btn-transp btn-block w-100 h-100 p-2" onClick={goSellStuff}>Sell Candy</button>
          </div>
          <div className="col-4 d-flex align-items-center justify-content-center">
            <button className="btn btn-transp btn-block w-100 h-100 p-2" onClick={goToBusStation}>Change School</button>
          </div>
          <div className="col-4 d-flex align-items-center justify-content-center">
            <button className="btn btn-transp btn-block w-100 h-100 p-2" onClick={goToBank}>Visit the Bank</button>
          </div>
          <div className="col-4 d-flex align-items-center justify-content-center">
            <button className="btn btn-transp btn-block w-100 h-100 p-2" onClick={goToLoanShark}>Go to Loan Office</button>
          </div>
          <div className="col-4 d-flex align-items-center justify-content-center">
            <button className="btn btn-transp btn-block w-100 h-100 p-2" onClick={goToHospital}>See the Doctor</button>
          </div>
          <div className="col-4 d-flex align-items-center justify-content-center">
            <button className="btn btn-transp btn-block w-100 h-100 p-2" onClick={layDown}>Do nothing</button>
          </div>
        </div>
        <PopUpModal show={showPopup} handleClose={handleClosePopup} text={"All right! Let's do nothing and let us see what the new day brings you!"}/>
      </div>
    </>
  )

}

export default MainSelectionMenu;