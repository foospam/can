import Player from '../model/Player.ts';
import State from '../model/auxiliaries/State.ts';
import ContextDataObject from '../model/auxiliaries/ContextDataObject.ts';
import PlaceContainer from '../model/places/PlaceContainer.ts';
import React from 'react';
import MethodAnswers from '../model/MethodAnswers.ts';
import GameSettings from '../model/GameSettings.ts';


interface LoanSharkScreenProps {
    state: State
    switchState: (stateName: string) => void
    player: Player
    contextData: ContextDataObject
    updateContext: (contextData: ContextDataObject) => void
}

function LoanSharkScreen({ state, switchState, player, contextData, updateContext }: LoanSharkScreenProps) {

    const [inputValue, setInputValue] = React.useState(0);
    const [messageValue, setMessageValue] = React.useState("");
    const [done, setDone] = React.useState(false);


    const goBack = () => {
        if (done === true) {
            player.getGameDate().updateDate(1);
            updateContext(new ContextDataObject(player));
        }
        switchState("MainSelectionMenu");
    }

    const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessageValue("");
        setInputValue(Number(event.target.value))
    }

    /* const updateMessageValue = (message : string) => {
        setMessageValue(message);
    } */



    const payBackMoney = () => {
        console.log("Input value: " + inputValue);

        let answer: MethodAnswers = MethodAnswers.SUCCESS;

        if (inputValue == 0) {
            setMessageValue("Please input the amount you want to pay back!")
            return;
        }

        if (inputValue <= player.getCash()) {
            answer = player.payBackDebt(inputValue);
        }
        else {
            setMessageValue("You don't have that much cash!")
        }

        switch (answer) {
            case (MethodAnswers.QUANTITY_NOT_WORTH_THE_FUSS): {
                setMessageValue("Do you think I'm joking? Don't waste my time with dimes, bring me dollars!")
            }
                break;
            case (MethodAnswers.DEBT_CANCELLED): {
                setMessageValue("It's a pleasure to make business with you!")
                updateContext(new ContextDataObject(player))
                setDone(true)
            }
                break;
            case (MethodAnswers.PARTIAL_PAYBACK_OK): {
                setMessageValue("Thank you for the advancement, but you still owe me " + player.getDebtValue() + " bucks. The clock is ticking!")
                updateContext(new ContextDataObject(player))
                setDone(true)
            }
                break;
        }
    }


    const borrowMoney = () => {

        let answer: MethodAnswers = MethodAnswers.SUCCESS;

        console.log("Input value: " + inputValue);
        if (inputValue <= 0) {
            setMessageValue("Don't be shy, how much do you want?")
            return;
        }

        else {
            answer = player.borrowMoney(inputValue);
            updateContext(new ContextDataObject(player));
            const moneyInputElement = document.querySelector("#moneyInput") as HTMLInputElement;
            moneyInputElement.value = "0";
            setInputValue(0);
        }

        switch (answer) {
            case (MethodAnswers.MINIMUM_LOAN_NOT_REACHED): {
                setMessageValue("I'm here to do businees! I don't lend less than " + GameSettings.MIN_LOAN + " bucks.")
            }
                break;
            case (MethodAnswers.MAXIMUM_CREDIT_EXCEEDED): {
                setMessageValue("No, man, that's too risky!")
            }
                break;
            case (MethodAnswers.CURRENT_CREDIT_EXCEEDED): {
                setMessageValue("You have already borrowed too much!")
            }
                break;
            case (MethodAnswers.SUCCESS): {
                setMessageValue("Here you are, friend. Now remember the drill. You have " + player.getDebtDays() + " days to pay me back, or you'll get a visit from my boys.")
                setDone(true);
            }
                break;
        }
    }

    return (



        <div className="row h-100" id="loanSharkScreen">
            <div className="col-12">
                <div className="row grey-background">
                    <div className="col-6 d-flex align-items-center">
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input type="text" className="form-control" aria-label="Amount" id="moneyInput" onChange={updateValue} />
                            <span className="input-group-text">.00</span>
                        </div>
                    </div>
                    <div className="col-2 d-flex align-items-center">
                        <button type="button" className={player.getCash() > 0 ? "btn btn-secondary" : "btn btn-secondary disabled"} id="payBack" onClick={payBackMoney}>
                            Pay back money
                        </button>
                    </div>
                    <div className="col-2 d-flex align-items-center">
                        <button type="button" className="btn btn-secondary" id="borrowMoney" onClick={borrowMoney}>
                            Borrow money
                        </button>
                    </div>
                    <div className="col-2 d-flex align-items-center">
                        <button type="button" className="btn btn-secondary" id="exit" onClick={goBack}>
                            Back
                        </button>
                    </div>
                    <div className="col-10">
                            <label>{messageValue}</label>
                        </div>
                </div>
            </div>
        </div>

    )

    /*     <div className="container h-100" id="busStation">
                <div className="row h-100">
                    {placeRow}
                </div>
            </div>
     */

}


export default LoanSharkScreen;