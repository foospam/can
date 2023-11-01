
import Player from "../Player";

class ContextDataObject {

    stuffPrices: Map<string, number> = new Map<string, number>();
    stuffNames: string[] = []
    stuffOnHand: Map<string, number>;
    userStats: Map<string, number> = new Map<string, number>();
    date: Date = new Date();
    location: string;

    constructor(player: Player) {
        this.stuffPrices = player.getStuffOnHandMap();
        this.stuffNames = player.getLocation().getStuffNames();
        this.stuffOnHand = player.getStuffOnHandMap();
        this.location = player.getLocation().getName();
        this.userStats.set("health", player.getHealth());
        this.userStats.set("reputation", player.getReputation());
        this.userStats.set("cash", player.getCash());
        this.userStats.set("deposits", player.getDeposits());
        this.userStats.set("debtValue", player.getDebtValue());
        this.userStats.set("debtDays", player.getDebtDays());
        this.userStats.set("hold", player.getHold());
    }
}

export default ContextDataObject;