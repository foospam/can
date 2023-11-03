import React, { useState } from 'react';
import Player from '../model/Player.ts';
import State from '../model/auxiliaries/State.ts';
import ContextDataObject from '../model/auxiliaries/ContextDataObject.ts';
import { QuantitySelector, QuantitySelectorProps } from './CommercialTransaction.tsx';


interface ShopProps {
    state: State
    switchState: (stateName: string) => void
    player: Player
    contextData: ContextDataObject
    updateContext: (contextData: ContextDataObject) => void
}

function Shop({ state, switchState, player, contextData, updateContext }: ShopProps) {

    console.log("Shop: contextData length " + contextData.length)
    console.log("Shop: contextData type " + contextData.class)

    const [done, setDone] = React.useState(false);


    const priceList: number[] = []

    for (let i: number = 0; i < 8; i++) {
        priceList.push(player.getLocation().getStuffPriceByNumber(i))
    }

    const stuffList: string[] = [];
    for (let i: number = 0; i < 8; i++) {
        stuffList.push(player.getLocation().getStuffName(i))
    }

    const totalFunds = player.getCash();

    const [countArray, setCountArray] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);
    const [totalPrice, setTotalPrice] = useState<number>(0)


    const updateTotal = (quantityArray: number[], priceArray: number[]): void => {
        let total: number = 0;
        quantityArray.map((element: number, index: number) => {
            total += element * priceArray[index];
        })
        setTotalPrice(total);
        console.log(total);
    }


    const increaseCountArray = (event: React.MouseEvent<HTMLButtonElement>) => {
        const index = Number(event.target.id);
        const newValueArray = [...countArray];
        newValueArray[index] += 1;
        setCountArray(newValueArray);
        console.log(newValueArray);
        updateTotal(newValueArray, priceList);
    }

    const decreaseCountArray = (event: React.MouseEvent<HTMLButtonElement>): void => {
        const index = Number(event.target.id);
        const newValueArray = [...countArray];
        newValueArray[index] -= 1;
        setCountArray(newValueArray);
        console.log(newValueArray);
        updateTotal(newValueArray, priceList);
    }

    const minusButtonClass = (index: number): string => {
        return (countArray[index] <= 0) ? "btn btn-primary disabled" : "btn btn-primary active";
    }

    const plusButtonClass = (index: number): string => {
        return ((totalPrice + priceList[index]) > totalFunds) ? "btn btn-primary disabled" : "btn btn-primary active";
    }

    const goBack = () => {
        if (done === true) {
            player.getGameDate().updateDate(1);
            updateContext(new ContextDataObject(player));
        }
        switchState("MainSelectionMenu");
    }

    return (
        <div className='row h-100' id="buyStuff">
        <div className='col-8'>
            <div className="row">
            {stuffList.map((element, index) =>
                <QuantitySelector
                    id={index}
                    stuffName={element}
                    minusButtonClass={minusButtonClass}
                    plusButtonClass={plusButtonClass}
                    increaseCountArray={increaseCountArray}
                    decreaseCountArray={decreaseCountArray}
                    selectedQuantity={countArray[index]}
                />)}
            <BuyButton
                stuffNameArray={stuffList}
                quantityArray={countArray}
                priceArray={priceList}
                player={player}
                switchState={switchState}
                contextData={contextData}
                updateContext={updateContext}
                setDone={setDone}
            />
            <button type="button" id="exit" onClick={goBack}>
                Back
            </button>
            <label>{player.hold}</label>
        </div>
        </div>
        </div>
    )


}

interface BuyButtonProps {
    stuffNameArray: string[],
    quantityArray: number[],
    priceArray: number[],
    player: Player
    switchState: (stateName: string) => void
    contextData: ContextDataObject
    updateContext: (contextData: ContextDataObject) => void
    setDone: (bool: boolean) => void
}

function BuyButton({ stuffNameArray, quantityArray, priceArray, player, switchState, contextData, updateContext, setDone }: BuyButtonProps) {

    const buyStuff = (): void => {
        quantityArray.map((element: number, index: number) => {
            if (element !== 0) {
                player.buyStuff(stuffNameArray[index], quantityArray[index]);
            }
        })
        console.log("Hold: " + player.hold);
        setDone(true);
        updateContext(new ContextDataObject(player));
    }


    return (
        <button onClick={buyStuff}>Buy</button>
    )
}

export default Shop;