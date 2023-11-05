import Player from "../model/Player";
import { Modal, Button } from "react-bootstrap";
import GameSettings from "../model/GameSettings";
import ContextDataObject from "../model/auxiliaries/ContextDataObject";


interface PopUpModalProps {
    show: boolean
    handleClose: () => void
    text: string
}

function PopUpModal({ show, handleClose, text }: PopUpModalProps) {
    return (
        <Modal show={show} onHide={handleClose} dialog-class-name="modal-center">
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

interface ReclaimDebtEventModalProps {
    player: Player;
    updateContext: (context: ContextDataObject) => void;
}

export function ReclaimDebtEventModal({ player, updateContext }: ReclaimDebtEventModalProps) {

     

    const handleClose = () => {
        const harm = player.getOverdue() * GameSettings.DEBITOR_HARM;
        player.getDebt()?.extendPaymentPeriod();
        player.setHarm(harm);
        updateContext(new ContextDataObject(player));
    }

    const timesHit = (player.getOverdue() < 2) ? "once " : player.getOverdue()+ " times ";
    const text = "A group of suspicious kids round you up in a dark corridor...\n"+
    "Before you know it, they hit you from behind " + timesHit +
    "with a foam sword.\n"+
    "The loan shark steps from behind.\n"+
    "-Bring me my money! Next time my guys won't be so gentle!" ;

    return (
        <div className="container h100">
            <div className="row h-100">
                <div className="col-12 d-flex align-items-center justify-content-center">
                    <Modal show={true} onHide={handleClose} dialog-class-name="modal-center">
                        <Modal.Body>
                            <p>{text}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    )
}


export function GameOverEventModal() {

    const text = "You have been injured very badly. You must go to the real hospital and explain it to your parents. "+
    "\nYour days as a candy smuggler are over!! Push F5 to start a new game. "

    return (
        <div className="container h100">
            <div className="row h-100">
                <div className="col-12 d-flex align-items-center justify-content-center">
                    <Modal show={true} onHide={() => {}} dialog-class-name="modal-center">
                        <Modal.Body>
                            <p>{text}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => {}}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    )

}