import Player from "./Player.ts";
import MethodAnswers from "./MethodAnswers.ts";

class Hospital {

    public heal(player : Player) : MethodAnswers {
        const healingCost : number = this.getHealingCost(player);

        if (player.getCash() < healingCost) {
            return MethodAnswers.INSUFFICIENT_MONEY;
        } else {
            player.setHealth(100);
            player.setCash(player.getCash() - healingCost);
            return MethodAnswers.SUCCESS;
        }
    }

    public getHealingTime(player : Player) : number {
        const lifePointDiff = 100 - player.getHealth();
        return Math.floor(lifePointDiff / 10);
    }

    public getHealingCost(player : Player) : number {
        const lifePointDiff = 100 - player.getHealth();
        return Math.pow(2, 3 + lifePointDiff / 10);
    }
}

export default Hospital;