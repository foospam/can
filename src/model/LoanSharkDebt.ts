import MethodAnswers from './MethodAnswers.ts';
import GameSettings from './GameSettings.ts';
import Player from './Player.ts';
/* import EventFactory from "/model/events/EventFactory.ts";
import TimeListener from "/model/controller/TimeListener.ts"; */

class LoanSharkDebt implements TimeListener {
    public activeCredit: boolean;
    public value: number;
    public overdue: number;
    public paymentPeriod: number;

    constructor() {
        this.value = 0;
        this.paymentPeriod = 0;
        this.overdue = 0;
        this.activeCredit = false;
    }

    borrow(player: Player, quantity: number): MethodAnswers {
        if (quantity < GameSettings.MIN_LOAN) {
            return MethodAnswers.MINIMUM_LOAN_NOT_REACHED;
        } else if (quantity > this.getMaxCredit(player)) {
            return MethodAnswers.MAXIMUM_CREDIT_EXCEEDED;
        } else if (quantity > (this.getMaxCredit(player) - this.value)) {
            return MethodAnswers.CURRENT_CREDIT_EXCEEDED;
        } else {
            this.value += quantity;
            player.cash += quantity;
            this.paymentPeriod = this.getInitialPaymentPeriod(player, quantity);
            this.activeCredit = true;
            return MethodAnswers.SUCCESS;
        }
    }

    payBack(player: Player, quantity: number): MethodAnswers {
        if (quantity > player.cash) {
            return MethodAnswers.INSUFFICIENT_MONEY;
        } else if (quantity < this.value / 10) {
            return MethodAnswers.QUANTITY_NOT_WORTH_THE_FUSS;
        } else {
            if (quantity > this.value) {
                player.cash -= this.value;
                this.value = 0;
            } else {
                this.value -= quantity;
                player.cash -= quantity;
            }

            if (this.value == 0) {
                this.cancelDebt();
                return MethodAnswers.DEBT_CANCELLED;
            } else {
                return MethodAnswers.PARTIAL_PAYBACK_OK;
            }
        }
    }

    updatePaymentPeriod(days: number): void {
        this.paymentPeriod -= days;
        if (this.paymentPeriod == -1) {
            this.overdue += 1;
            EventFactory.pushDebtEvent();
        }
    }

    public raiseDebt(): void {
        this.value = this.value * (1 + GameSettings.INTEREST_RATE / 100);
    }

    private getMaxCredit(player: Player): number {
        const reputation = player.reputation;
        if (reputation <= 0) {
            return Math.min(GameSettings.MIN_LOAN * 2, GameSettings.BASIC_LOAN / 2);
        } else {
            return player.reputation * GameSettings.BASIC_LOAN - 1;
        }
    }

    private getInitialPaymentPeriod(player: Player, quantity: number): number {
        if (player.reputation <= 0) {
            return GameSettings.MAX_PAYMENT_PERIOD / 2;
        }

        const maxCredit = this.getMaxCredit(player);
        const variablePaymentPeriod = GameSettings.MAX_PAYMENT_PERIOD - GameSettings.MIN_PAYMENT_PERIOD;
        const normalizedQuantity = (maxCredit - quantity) / maxCredit;
        const factor = 1 / Math.pow(variablePaymentPeriod, normalizedQuantity);
        const initialPaymentPeriod = variablePaymentPeriod * (1 - factor) + GameSettings.MIN_PAYMENT_PERIOD;

        if (this.paymentPeriod <= 0) {
            return initialPaymentPeriod;
        } else {
            return Math.min(this.paymentPeriod, initialPaymentPeriod);
        }
    }

    private cancelDebt(): void {
        this.activeCredit = false;
        this.paymentPeriod = 0;
    }

    extendPaymentPeriod(): void {
        this.paymentPeriod = 10;
    }

    updateTime(days: number): void {
        if (this.activeCredit) {
            for (let i = 0; i < days; i++) {
                this.raiseDebt();
                this.updatePaymentPeriod(1);
            }
        }
    }
}

export default LoanSharkDebt;