import { ReactElement } from "react";
import MainSelectionMenu from "../../gui/MainSelectionMenu";

class State {
    
    private value : string;

    constructor() {
        this.value = "BuyShop";
    }
    
    public setValue(stateName : string) : void {
        this.value = stateName;
    }

    public getValue() : string {
        return this.value;
    }

}

export default State;