import React, { useState } from 'react';
import Player from "./Player.ts";

const player: Player = new Player();
const priceList = [200, 100, 50, 30];

interface QuantitySelectorProps {
    id: number,
    stuffName: string,
    minusButtonClass: (index: number) => string;
    plusButtonClass: (index: number) => string;
    increaseCountArray: (event: React.MouseEvent<HTMLButtonElement>) => void,
    decreaseCountArray: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function Shop() {


    const stuffList = ["a", "b", "c", "d"]
    const totalFunds = player.funds;

    const [countArray, setCountArray] = useState<number[]>([0, 0, 0, 0]);

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
                />)}
            <BuyButton 
            stuffNameArray={stuffList}
            quantityArray={countArray}
            priceArray={priceList}
            />
        </>
    )


}

interface BuyButtonProps {
    stuffNameArray: string[],
    quantityArray: number[],
    priceArray: number[]
}

function BuyButton({ stuffNameArray, quantityArray, priceArray }: BuyButtonProps) {

    const buyStuff = (): void => {
        quantityArray.map((element: number, index: number) => {
            if (element !== 0) {
                player.buyStuff(stuffNameArray[index], element, priceArray[index]);
            }
        })

    }


    return (
        <button onClick={buyStuff}>Buy</button>
    )
}

function QuantitySelector({ id, stuffName, minusButtonClass, plusButtonClass, increaseCountArray, decreaseCountArray }: QuantitySelectorProps) {


    return (
        <div>
            <label>{stuffName}</label>
            <button className={plusButtonClass(id)} id={String(id)} onClick={increaseCountArray}>+</button>
            <button className={minusButtonClass(id)} id={String(id)} onClick={decreaseCountArray}>-</button>
        </div>
    );

}

export default Shop;