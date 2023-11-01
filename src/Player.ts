class Player {

    public funds : number;

    public stuffList :  Map<string, number>;
    
    constructor() {
        this.funds = 1000;
        this. stuffList = new Map([
            ["a", 0],
            ["b", 0],
            ["c", 0],
            ["d", 0],
            ["e", 0],
            ["f", 0],
            ["g", 0],
            ["h", 0]
        ])
    }

    public buyStuff = (stuffName : string, quantity : number, unitPrice : number) : void => {
        const totalPrice = quantity * unitPrice;
        if (totalPrice <= this.funds) {
            this.stuffList.set(stuffName, this.stuffList.get(stuffName) + quantity);
            this.funds -= totalPrice;
            console.log(this);
        }

    }

}

export default Player;