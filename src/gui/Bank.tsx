import Player from '../model/Player.ts';
import State from '../model/auxiliaries/State.ts';
import ContextDataObject from '../model/auxiliaries/ContextDataObject.ts';
import PlaceContainer from '../model/places/PlaceContainer.ts';
import React from 'react';


interface BankProps {
    state: State
    switchState: (stateName: string) => void
    player: Player
    contextData: ContextDataObject
    updateContext: (contextData: ContextDataObject) => void
}

function Bank({ state, switchState, player, contextData, updateContext }: BankProps) {

    const [inputValue, setInputValue] = React.useState(0);
    const [messageValue, setMessageValue] = React.useState("");

    const updateValue = (event : React.ChangeEvent<HTMLInputElement>) => {
        setMessageValue("");
        setInputValue(Number(event.target.value))
    }

    const depositMoney = () => {
        console.log("Input value: "+inputValue);

        if (inputValue == 0) {
            setMessageValue("Please input the amount you want to deposit!")
            return;
        }

        if (inputValue <= player.getCash()) {
            player.setDeposits(inputValue);
            updateContext(new ContextDataObject(player));
            const moneyInputElement = document.querySelector("#moneyInput") as HTMLInputElement;
            moneyInputElement.value = "0";
            setInputValue(0);

            setMessageValue("Thank you for your deposits!")
        }
        else {
            setMessageValue("You don't have that much cash!")
        }
    }

    const withdrawMoney = () => {
        console.log("Input value: "+inputValue);
        if (inputValue == 0) {
            setMessageValue("Please input the amount you want to withdraw!")
            return;
        }


        if (inputValue <= player.getDeposits()) {
            player.withdrawMoney(inputValue);
            updateContext(new ContextDataObject(player));
            const moneyInputElement = document.querySelector("#moneyInput") as HTMLInputElement;
            moneyInputElement.value = "0";
            setInputValue(0);

            setMessageValue("We are sorry to see your money leave, but hava a good day!")
        }
        else {
            setMessageValue("You only have "+player.getDeposits()+" $ in your account!")
        }
    }

    const goBack = () => {
        switchState("MainSelectionMenu");
    }

    return (


        <div className="container h-100">
            <div className="row h-100">
                <div className="d-flex align-items-center justify-content-center">
                    <div className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <input type="text" className="form-control" aria-label="Amount" id="moneyInput" onChange={updateValue} />
                        <span className="input-group-text">.00</span>
                    </div>
                    <button type="button" className={player.getCash() > 0 ? "btn btn-secondary" : "btn btn-secondary disabled"} id="deposit" onClick={depositMoney}>
                        Deposit
                    </button>
                    <button type="button" className={player.getDeposits() > 0 ? "btn btn-secondary" : "btn btn-secondary disabled"} id="withdraw" onClick={withdrawMoney}>
                        Withdraw
                    </button>
                    <button type="button" className="btn btn-secondary" id="exit" onClick={goBack}>
                        Back
                    </button>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                <label>{messageValue}</label>
                </div>
            </div>
        </div>
    )


}


export default Bank;