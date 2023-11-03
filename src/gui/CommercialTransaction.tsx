

export interface QuantitySelectorProps {
    id: number,
    stuffName: string,
    minusButtonClass: (index: number) => string;
    plusButtonClass: (index: number) => string;
    increaseCountArray: (event: React.MouseEvent<HTMLButtonElement>) => void,
    decreaseCountArray: (event: React.MouseEvent<HTMLButtonElement>) => void,
    selectedQuantity: number
}

export function QuantitySelector({ id, stuffName, minusButtonClass, plusButtonClass, increaseCountArray, decreaseCountArray, selectedQuantity }: QuantitySelectorProps) {


    return (
        <div className="col-6">
            <div className="row">
                <div className="col-8">
            <label>{stuffName   } : {selectedQuantity}</label>
            </div>
            <div className="col-2">
            <button className={plusButtonClass(id)} id={String(id)} onClick={increaseCountArray}>+</button>
            </div>
            <div className="col-2">
            <button className={minusButtonClass(id)} id={String(id)} onClick={decreaseCountArray}>-</button>
            </div>
            </div>
        </div>
    );

}