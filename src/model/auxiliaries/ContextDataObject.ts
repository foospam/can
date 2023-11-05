import Player from "../Player";
import GameDate from "./GameDate";
import Event from "../events/Event";
import EventQueue from "../events/EventQueue";

class ContextDataObject {

    public stuffPrices: Map<string, number> = new Map<string, number>();
    public stuffNames: string[] = []
    public stuffOnHand: Map<string, number>;
    public userStats: Map<string, number> = new Map<string, number>();
    public date: GameDate;
    public location: string;
    public currentEvent: Event | null;

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
        this.userStats.set("debtOverdue", player.getOverdue())
        this.date = player.getGameDate();
        this.currentEvent = EventQueue.poll();
    }
}

export default ContextDataObject;