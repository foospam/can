import GameSettings from './GameSettings.ts';
import MethodAnswers from './MethodAnswers.ts';


import Hospital from './Hospital.ts';
import BankAccount from './BankAccount.ts';
import Place from './places/Place.ts';
import PlaceContainer from './places/PlaceContainer.ts';
import StuffCarrier from './goods/StuffCarrier.ts';
/* import Fighter from './Fighter';
import EventFactory from './events/EventFactory'; */
import LoanSharkDebt from './LoanSharkDebt.ts';
import Arm from './goods/Arm.ts';
import Holster from './goods/Holster.ts';
import DisplaySymbols from './goods/DisplaySymbols.ts';
import GameDate from './auxiliaries/GameDate.ts';

const stuffNames: string[] = [
    "Berry Bliss Bites",
    "Chocolate Chuckles",
    "Caramel Delight",
    "Fruity Fizz Pops",
    "Rainbow Gummies",
    "Sweetie Swirls",
    "Lemon Drops",
    "Cherry Chews"
]


class Player /* implements Fighter */ {
    private maxHold: number;
    hold: number;
    private health: number;
    private hospital: Hospital;
    private reputation: number;
    private cash: number;
    private debt: LoanSharkDebt;
    private bankAccount: BankAccount;
    private location: Place;
    private stuffOnHand: Map<string, number>;
    private armInHand: Arm;
    private holster: Holster;
    private icon: string = DisplaySymbols.PLAYER;
    private isInBattle: boolean;
    private date : GameDate;

    constructor() {
        this.armInHand = new Arm("Nothing",0,0,0,false);
        this.debt = new LoanSharkDebt();
        this.isInBattle = false;
        this.hospital = new Hospital();
        this.health = GameSettings.INITIAL_HEALTH;
        this.reputation = GameSettings.INITIAL_REPUTATION;
        this.cash = GameSettings.INITIAL_CASH;
        this.maxHold = GameSettings.INITIAL_HOLD;
        this.hold = GameSettings.INITIAL_HOLD;
        this.holster = new Holster();
        this.bankAccount = new BankAccount(this);
        this.location = PlaceContainer.getRandomPlace();
        this.stuffOnHand = new Map<string, number>();
        this.date = new GameDate();
        this.date.subscribe(this.debt);
        for (const name of stuffNames) this.stuffOnHand.set(name, 0);
    }

    buyStuff(stuff: string, quantity: number): MethodAnswers {
        if (quantity === 0) {
            return MethodAnswers.QUANTITY_ZERO;
        }
        const totalCost = this.location.getStuffPriceByName(stuff) * quantity;

        if (totalCost > this.cash) {
            return MethodAnswers.INSUFFICIENT_MONEY;
        } else if (quantity > this.hold) {
            return MethodAnswers.INSUFFICIENT_HOLD;
        } else {
            this.cash -= totalCost;
            const oldQuantityOnHand = this.stuffOnHand.get(stuff) || 0;
            this.stuffOnHand.set(stuff, oldQuantityOnHand + quantity);
            this.hold -= quantity;
            return MethodAnswers.SUCCESS;
        }
    }

    sellStuff(stuff: string, quantity: number): MethodAnswers {
        const totalIncome = this.location.getStuffPriceByName(stuff) * quantity;

        if ((this.stuffOnHand.get(stuff) ?? 0) < quantity) {
            return MethodAnswers.INSUFFICIENT_STASH;
        } else if (quantity === 0) {
            return MethodAnswers.QUANTITY_ZERO;
        } else {
            this.increaseReputationBySale(totalIncome);
            this.cash += totalIncome;
            const oldQuantityOnHand = this.stuffOnHand.get(stuff) || 0;
            this.stuffOnHand.set(stuff, oldQuantityOnHand - quantity);
            this.hold += quantity;
            return MethodAnswers.SUCCESS;
        }
    }

    travel(destination: Place, ticketPrice: number): MethodAnswers {
        if (ticketPrice > this.cash) return MethodAnswers.INSUFFICIENT_MONEY;
        else if (destination === this.location) return MethodAnswers.SAME_ORIGIN_AND_DESTINATION;
        else {
            this.cash -= ticketPrice;
            this.location = destination;
            return MethodAnswers.SUCCESS;
        }
    }

    withdrawMoney(amount: number): MethodAnswers {
        return this.bankAccount.withdraw(amount);
    }

    setDeposits(amount: number): MethodAnswers {
        return this.bankAccount.deposit(amount);
    }

    heal(): MethodAnswers {
        return this.hospital.heal(this);
    }

    borrowMoney(amount: number): MethodAnswers {
        return this.debt.borrow(this, amount);
    }

    payBackDebt(amount: number): MethodAnswers {
        return this.debt.payBack(this, amount);
    }

    buyStuffCarrier(carrier: StuffCarrier): MethodAnswers {
        const hold = carrier.getHold();
        const price = carrier.getPrice();

        if (price > this.cash) {
            return MethodAnswers.INSUFFICIENT_MONEY;
        } else {
            this.cash -= price;
            this.maxHold = hold;
            return MethodAnswers.SUCCESS;
        }
    }

    buyArm(arm: Arm, quantity: number): MethodAnswers {
        const totalPrice = arm.getPrice() * quantity;

        if (totalPrice > this.cash) {
            return MethodAnswers.INSUFFICIENT_MONEY;
        } else {
            this.cash -= totalPrice;
            for (let i = 0; i < quantity; i++) {
                this.holster.add(arm);
            }
            return MethodAnswers.SUCCESS;
        }
    }

/*     shootRandomEnemy(enemies: Fighter[]): [string, string, number] {
        const enemy = enemies[Math.floor(Math.random() * enemies.length)];
        return this.armInHand.shoot(enemy, this.getName());
    }

    escapeEnemies(enemies: Fighter[]): [boolean, string] {
        for (const enemy of enemies) {
            const fighterRoll = this.gunRoll();
            const enemyRoll = enemy.gunRoll();
            if (enemyRoll > fighterRoll) {
                return [false, this.getName()];
            }
        }
        this.isInBattle = false;
        return [true, this.getName()];
    } */

    gunRoll(): number {
        return Math.floor(Math.random() * this.armInHand.getAccuracy()) + Math.floor(Math.random() * this.armInHand.getHarm());
    }

    harmRoll(): number {
        return Math.floor(Math.random() * this.armInHand.getHarm());
    }

    giveArmInHand(): Arm {
        const arm = this.armInHand;
        this.armInHand = new Arm("", 0, 0, 0, false);
        return arm;
    }

    pickArm(arm: Arm): void {
        this.holster.add(arm);
    }

    combatInfoString(): string {
        return `${this.icon} You: ${this.armInHand.toString()}, ${this.health} health points`;
    }

    translateStuffIndexToName(index: number): string {
        return this.location.getStuffName(index);
    }

    emptyHold(): number {
        let robbedStuff = 0;

        for (const [key, stuffQuantity] of this.stuffOnHand) {
            if (stuffQuantity > 0) {
                const robberyPercent = Math.floor(
                    Math.random() * (GameSettings.MIN_STUFF_ROBBERY_PERCENT - GameSettings.MAX_STUFF_ROBBERY_PERCENT + 1) +
                    GameSettings.MAX_STUFF_ROBBERY_PERCENT
                );
                let robbedQuantity = (stuffQuantity * robberyPercent) / 100;
                // The thief always takes something, even if the result of the operation is 0.
                robbedQuantity = Math.max(1, robbedQuantity);
                this.stuffOnHand.set(key, stuffQuantity - robbedQuantity);
                this.hold += robbedQuantity;
                robbedStuff += robbedQuantity;
            }
        }

        return robbedStuff;
    }

    emptyPockets(): number {
        const robberyPercent = Math.floor(
            Math.random() * (GameSettings.MIN_CASH_ROBBERY_PERCENT - GameSettings.MAX_CASH_ROBBERY_PERCENT + 1) +
            GameSettings.MAX_CASH_ROBBERY_PERCENT
        );
        this.cash -= (this.cash * robberyPercent) / 100;
        return robberyPercent;
    }

    extendPaymentPeriod(): void {
        this.debt.extendPaymentPeriod();
    }

    increaseReputation(): void {
        this.reputation++;
    }

    decreaseReputation(): void {
        this.reputation--;
    }

    private increaseReputationBySale(income: number): void {
        if (this.reputation > 0 && income + this.cash + this.getDeposits() > this.reputation * 10000) {
            while (this.reputation * 10000 < income + this.cash) {
                this.increaseReputation();
            }
        } else if (this.reputation === 0 && income > this.cash + this.debt.value) {
            this.increaseReputation();
        }
    }

    getHealth(): number {
        return this.health;
    }

    setHealth(health: number): void {
        if (health > 0) {
            this.health = health;
        } else {
            this.health = 0;
            this.isInBattle = false;
            /* EventFactory.pushGameOverEvent(); */
        }
    }


    getReputation(): number {
        return this.reputation;
    }

    setReputation(reputation: number): void {
        this.reputation = reputation;
    }

    getCash(): number {
        return this.cash;
    }

    setCash(cash: number): void {
        this.cash = cash;
    }

    getDeposits(): number {
        return this.bankAccount.getDeposits();
    }

    getDebt(): LoanSharkDebt | undefined {
        return this.debt;
    }

    setDebt(debt: LoanSharkDebt): void {
        this.debt = debt;
    }

    getDebtValue(): number {
        if (this.debt) return this.debt.value;
        return 0;
    }

    getDebtDays(): number {
        if (this.debt) return this.debt.paymentPeriod;
        return 0;
    }

    getHold(): number {
        return this.hold;
    }

    setHold(hold: number): void {
        this.hold = hold;
    }

    getMaxHold(): number {
        return this.maxHold;
    }

    setMaxHold(maxHold: number): void {
        this.maxHold = maxHold;
    }

    getHealingCost(): number {
        return this.hospital.getHealingCost(this);
    }

    getHealingDays(): number {
        return this.hospital.getHealingTime(this);
    }

    getStuffOnHand(index: number): number {
        const stuff = this.translateStuffIndexToName(index);
        return this.stuffOnHand.get(stuff) || 0;
    }

    getAllStuffOnHand() : Map<string, number> {
        return this.stuffOnHand;
    }

    setStuffOnHand(stuffOnHand: Map<string, number>): void {
        this.stuffOnHand = stuffOnHand;
    }

    getStuffOnHandMap(): Map<string, number> {
        const newStuffOnHand : Map<string, number> = new Map<string, number>();
        for(const [key, value] of this.stuffOnHand.entries()){
            newStuffOnHand.set(key, value);
        }
        return this.stuffOnHand;
    }

    getLocation(): Place {
        return this.location;
    }

    setLocation(location: Place): void {
        this.location = location;
    }

/*     setHarm(harm: number): void {
        this.setHealth(this.health - harm);
    } */

    getOverdue(): number {
        return this.debt.overdue;
    }

    setArmInHand(armInHand: Arm): void {
        this.armInHand = armInHand;
    }

    getName(): string {
        return 'You';
    }

    getTopGun(): Arm {
        return this.holster.getTopGun();
    }

    isDead(): boolean {
        return this.health === 0;
    }

    getIsInBattle(): boolean {
        return this.isInBattle;
    }

    getArmInHand(): Arm | undefined {
        return this.armInHand;
    }

    getHolster(): Holster {
        return this.holster;
    }

    setHolster(holster: Holster): void {
        this.holster = holster;
    }

    getActiveCredit(): boolean {
        return this.debt.activeCredit;
    }

    getGameDate() : GameDate {
        return this.date;
    }
}

export default Player;
