import Player from '../model/Player.ts';
import State from '../model/auxiliaries/State.ts';
import ContextDataObject from '../model/auxiliaries/ContextDataObject.ts';
import PlaceContainer from '../model/places/PlaceContainer.ts';
import React from 'react';
import MethodAnswers from '../model/MethodAnswers.ts';
import GameSettings from '../model/GameSettings.ts';


interface HospitalScreenProps {
    state: State
    switchState: (stateName: string) => void
    player: Player
    contextData: ContextDataObject
    updateContext: (contextData: ContextDataObject) => void
}

function HospitalScreen({ state, switchState, player, contextData, updateContext }: HospitalScreenProps) {

    const [messageValue, setMessageValue] = React.useState("");

    /* const updateMessageValue = (message : string) => {
        setMessageValue(message);
    } */

    const payFees = () => {

        const healingTime = player.getHealingDays();
        const answer: MethodAnswers = player.heal();


        switch (answer) {
            case (MethodAnswers.SUCCESS): {
                setMessageValue("All right, we have fixed you up. Just remain here for " + healingTime + " days and you will be as good as new");
                updateContext(new ContextDataObject(player))
                break;
            }
            case (MethodAnswers.INSUFFICIENT_MONEY): {
                setMessageValue("Come back when you have the money!")
                break;
            }

        }
    }


    const goBack = () => {
        switchState("MainSelectionMenu");
    }

    return (


        
            <div className="row h-100">
                <div className="d-flex align-items-center justify-content-center">
                    <label>Welcome to the hospital!
                        <br></br>
                        We can fix you up, but it will cost you {player.getHealingCost()} bucks.
                    </label>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <button type="button" className="btn btn-secondary" id="borrowMoney" onClick={payFees}>
                        Heal me
                    </button>
                    <button type="button" className="btn btn-secondary" id="exit" onClick={goBack}>
                        Back
                    </button>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <label>{messageValue}</label>
                </div>
            </div>
        

    )


}


export default HospitalScreen;