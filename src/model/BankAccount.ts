import MethodAnswers from './MethodAnswers.ts'; 

class BankAccount {
    public deposits: number;
    public player: Player;

    constructor(player: Player) {
        this.player = player;
        this.deposits = 0;
    }

    withdraw(amount: number): MethodAnswers {
        if (amount <= this.deposits) {
            this.player.cash -= amount;
            this.deposits -= amount;
            return MethodAnswers.SUCCESS;
        }
        return MethodAnswers.INSUFFICIENT_MONEY;
    }

    deposit(amount: number): MethodAnswers {
        if (this.player.cash >= amount) {
            this.player.cash -= amount;
            this.deposits += amount;
            return MethodAnswers.SUCCESS;
        }
        return MethodAnswers.INSUFFICIENT_MONEY;
    }

    getDeposits(): number {
        return this.deposits;
    }
}

export default BankAccount;