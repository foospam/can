import Player from "./Player.ts";
import MethodAnswers from "./MethodAnswers.ts";

class Hospital {

    public heal(player : Player) : MethodAnswers {
        const healingCost : number = this.getHealingCost(player);

        if (player.cash < healingCost) {
            return MethodAnswers.INSUFFICIENT_MONEY;
        } else {
            player.health = 100;
            player.cash -= healingCost;
            return MethodAnswers.SUCCESS;
        }
    }

    public getHealingTime(player : Player) : number {
        const lifePointDiff = 100 - player.health;
        return Math.floor(lifePointDiff / 10);
    }

    public getHealingCost(player : Player) : number {
        const lifePointDiff = 100 - player.health;
        return Math.pow(2, 3 + lifePointDiff / 10);
    }
}

export default Hospital;