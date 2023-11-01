
import Player from "../Player";

class ContextDataObject {

    public stuffPrices: Map<string, number> = new Map<string, number>();
    public stuffNames: string[] = []
    public stuffOnHand: Map<string, number>;
    public userStats: Map<string, number> = new Map<string, number>();
    public date: Date = new Date();
    public location: string;

    constructor(player: Player) {
        this.stuffPrices = player.getLocation().getStuffPrices();
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