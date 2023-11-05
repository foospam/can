import React, { useState } from 'react';
import Player from '../model/Player.ts';
import State from '../model/auxiliaries/State.ts';
import ContextDataObject from '../model/auxiliaries/ContextDataObject.ts';
import { QuantitySelector } from './CommercialTransaction.tsx';



interface ShopProps {
    state: State
    switchState: (stateName: string) => void
    player: Player
    contextData: ContextDataObject
    updateContext: (contextData: ContextDataObject) => void
    mode: string
}

function Shop({ state, switchState, player, contextData, updateContext, mode }: ShopProps) {

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
    const [done, setDone] = useState<boolean>(false)


    const updateTotal = (quantityArray: number[], priceArray: number[]): void => {
        let total: number = 0;
        quantityArray.map((element: number, index: number) => {
            total += element * priceArray[index];
        })
        setTotalPrice(total);
        console.log(total);
    }
    const goBack = () => {
        if (done === true) {
            player.getGameDate().updateDate(1);
            updateContext(new ContextDataObject(player));
        }
        switchState("MainSelectionMenu");
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

    const minusButtonClassSell = (index: number): string => {
        return (countArray[index] <= 0) ? "btn btn-shop disabled" : "btn btn-shop active";
    }

    const plusButtonClassSell = (index: number): string => {
        const stuffName = contextData.stuffNames[index];
        const qtyInHand = contextData.stuffOnHand.get(stuffName) ?? 0;
        const selectedQty = countArray[index];
        return (qtyInHand <= selectedQty) ? "btn btn-shop disabled" : "btn btn-shop active";
    }

    const minusButtonClassBuy = (index: number): string => {
        return (countArray[index] <= 0) ? "btn btn-shop disabled" : "btn btn-shop active";
    }

    const plusButtonClassBuy = (index: number): string => {
        return ((totalPrice + priceList[index]) > totalFunds) ? "btn btn-shop disabled" : "btn btn-shop active";
    }


    const sellStuff = (): void => {
        countArray.map((element: number, index: number) => {
            if (element !== 0) {
                console.log("Selling " + element + " " + index)
                player.sellStuff(stuffList[index], countArray[index]);
            }
        })

        setDone(true);
        updateContext(new ContextDataObject(player));
    }

    const buyStuff = (): void => {
        countArray.map((element: number, index: number) => {
            if (element !== 0) {
                player.buyStuff(stuffList[index], countArray[index]);
            }
        })
        console.log("Hold: " + player.hold);
        setDone(true);
        updateContext(new ContextDataObject(player));
    }

    return (
        <div className='row h-100' id={mode == "buy" ? "buyStuff" : "sellStuff"}>
            <div className='col-8'>
                <div className="row shopRow">
                    {stuffList.map((element, index) =>
                        <QuantitySelector
                            id={index}
                            stuffName={element}
                            minusButtonClass={mode === "buy" ? minusButtonClassBuy : minusButtonClassSell}
                            plusButtonClass={mode === "buy" ? plusButtonClassBuy : plusButtonClassSell}
                            increaseCountArray={increaseCountArray}
                            decreaseCountArray={decreaseCountArray}
                            selectedQuantity={countArray[index]}
                        />)}
                </div>
                <div className="row">
                    <div className="col-6">
                        <button type="button" id="exit" onClick={mode === "buy" ? buyStuff : sellStuff}>
                            {mode === "buy" ? "Buy" : "Sell"}
                        </button>
                    </div>
                    <div className="col-6">
                        <button type="button" id="exit" onClick={goBack}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default Shop;