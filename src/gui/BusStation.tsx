import React, { useState } from 'react';
import Player from '../model/Player.ts';
import State from '../model/auxiliaries/State.ts';
import ContextDataObject from '../model/auxiliaries/ContextDataObject.ts';
import PlaceContainer from '../model/places/PlaceContainer.ts';


interface BusStationProps {
    state: State
    switchState: (stateName: string) => void
    player: Player
    contextData: ContextDataObject
    updateContext: (contextData: ContextDataObject) => void
}

function BusStationProps({ state, switchState, player, contextData, updateContext }: ShopProps) {

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




    const minusButtonClass = (index: number): string => {
        return (countArray[index] <= 0) ? "btn btn-primary disabled" : "btn btn-primary active";
    }

    const plusButtonClass = (index: number): string => {
        return ((totalPrice + priceList[index]) > totalFunds) ? "btn btn-primary disabled" : "btn btn-primary active";
    }

    const placeRow = PlaceContainer.getPlaces().map((place) => (
        <div className="col-4 d-flex align-items-center justify-content-center">
            <button className="btn btn-primary btn-block">{place.name}</button>
        </div>
    ));

    return (
        <div className="container h-100">
            <div className="row h-100">
                {placeRow}
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
}

function BuyButton({ stuffNameArray, quantityArray, priceArray, player, switchState, contextData, updateContext }: BuyButtonProps) {

    const buyStuff = (): void => {
        quantityArray.map((element: number, index: number) => {
            if (element !== 0) {
                player.buyStuff(stuffNameArray[index], quantityArray[index]);
            }
        })
        console.log("Hold: " + player.hold);
        updateContext(new ContextDataObject(player));
        switchState("MainSelectionMenu");



    }


    return (
        <button onClick={buyStuff}>Buy</button>
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

export default Shop;