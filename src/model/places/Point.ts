class Point {
    public x : number;
    public y : number;

    public distance(other : Point) : number {
        const deltaX = this.x - other.x;
        const deltaY = this.y - other.y;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    constructor (x : number, y : number){
        this.x = x;
        this.y = y;
    }
}

export default Point;