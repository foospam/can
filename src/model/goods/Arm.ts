import Fighter from '/combat/Fighter';

class Arm {
    private name: string;
    private harm: number;
    private accuracy: number;
    private price: number;
    private isDefault: boolean;

    constructor(name: string, harm: number, accuracy: number, price: number, isDefault: boolean) {
        this.name = name;
        this.harm = harm;
        this.accuracy = accuracy;
        this.price = price;
        this.isDefault = isDefault;
    }

    shoot(target: Fighter, shooterName: string): [string, string, number] {
        const die = Math.floor(Math.random() * 100);
        if (die <= this.accuracy) {
            target.setHarm(this.harm);
            return [shooterName, target.getName(), this.harm];
        }
        return [shooterName, target.getName(), -1];
    }

    compareObjects(a : Arm, b: Arm): number {
        if (a.harm * a.accuracy > b.harm * b.accuracy) return 1;
        else if (a.harm * a.accuracy < b.harm * b.accuracy) return -1;
        else return 0;
    }

    getHarm(): number {
        return this.harm;
    }

    getAccuracy(): number {
        return this.accuracy;
    }

    getPrice(): number {
        return this.price;
    }

    getName(): string {
        return this.name;
    }

    getIsDefault(): boolean {
        return this.isDefault;
    }
}

export default Arm;