import React, { useState } from 'react';
import Player from '../model/Player.ts';
import State from '../model/auxiliaries/State.ts';
import ContextDataObject from '../model/auxiliaries/ContextDataObject.ts';


interface QuantitySelectorProps {
    id: number,
    stuffName: string,
    minusButtonClass: (index: number) => string;
    plusButtonClass: (index: number) => string;
    increaseCountArray: (event: React.MouseEvent<HTMLButtonElement>) => void,
    decreaseCountArray: (event: React.MouseEvent<HTMLButtonElement>) => void,
    selectedQuantity: number
}

interface SellStuffProps {
    state: State
    switchState: (stateName: string) => void
    player: Player
    contextData : ContextDataObject
    updateContext : (contextData : ContextDataObject) => void
}

function SellStuff({ state, switchState, player, contextData, updateContext}: SellStuffProps) {

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
        const stuffName = contextData.stuffNames[index];
        const qtyInHand = contextData.stuffOnHand.get(stuffName) ?? 0;
        const selectedQty = countArray[index];
        return (qtyInHand <= selectedQty) ? "btn btn-primary disabled" : "btn btn-primary active";
    }

    return (
        <>
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
            <SellButton
                stuffNameArray={stuffList}
                quantityArray={countArray}
                priceArray={priceList}
                player={player}
                switchState={switchState}
                contextData={contextData}
                updateContext={updateContext}
            />
            <label>{player.hold}</label>
        </>
    )


}

interface BuyButtonProps {
    stuffNameArray: string[],
    quantityArray: number[],
    priceArray: number[],
    player: Player
    switchState : (stateName : string) => void
    contextData : ContextDataObject
    updateContext : (contextData : ContextDataObject) => void
}

function SellButton({ stuffNameArray, quantityArray, priceArray, player, switchState, contextData, updateContext }: BuyButtonProps) {

    const sellStuff = (): void => {
        quantityArray.map((element: number, index: number) => {
            if (element !== 0) {
                console.log("Selling "+element+" "+index)
                player.sellStuff(stuffNameArray[index], quantityArray[index]);
            }
        })

        updateContext(new ContextDataObject(player));
        switchState("MainSelectionMenu");



    }


    return (
        <button onClick={sellStuff}>Sell</button>
    )
}

function QuantitySelector({ id, stuffName, minusButtonClass, plusButtonClass, increaseCountArray, decreaseCountArray, selectedQuantity }: QuantitySelectorProps) {


    return (
        <div>
            <label>{stuffName} : {selectedQuantity}</label>
            <button className={plusButtonClass(id)} id={String(id)} onClick={increaseCountArray}>+</button>
            <button className={minusButtonClass(id)} id={String(id)} onClick={decreaseCountArray}>-</button>
        </div>
    );

}

export default SellStuff;