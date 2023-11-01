import { Table } from "react-bootstrap";
import Player from "../model/Player.ts";
import PriceDisplay from "./PriceDisplay.tsx";
import ContextDataObject from "../model/auxiliaries/ContextDataObject.ts";


interface StatsDisplayProps {
    player: Player;
    contextData : ContextDataObject
    updateContext : (contextData : ContextDataObject) => void
}

function StatsDisplay({
    player,
    contextData,
    updateContext
}: StatsDisplayProps) {


    const getPlayerStat = (key: string, value: string | number) => {
        return (
            <tr>
                    <td width="20%">
                    {/* <img src={iconUrl1} alt="Icon 1" width="80%" height="80%" /> */}
                </td>
                <td width="80%">{key}: {value}</td>
            </tr>
        )
    }


    return (
        <div className="col-sm-4">
            <Table striped bordered className="statsTable">
                <tbody>
                    {getPlayerStat("Health", contextData.userStats.get("health") ?? 100)}
                    {getPlayerStat("Reputation", contextData.userStats.get("reputation") ?? 1)}
                    {getPlayerStat("Cash", contextData.userStats.get("cash") ?? 500)}
                    {getPlayerStat("Deposits", contextData.userStats.get("deposits") ?? 0)}
                    {getPlayerStat("Debt", contextData.userStats.get("debtValue") ?? 0)}
                    {getPlayerStat("Days", contextData.userStats.get("debtDays") ?? 0)}
                    {getPlayerStat("Hold", contextData.userStats.get("hold") ?? 10)}
                </tbody>
            </Table>
            <PriceDisplay player={player} place={player.getLocation()} contextData={contextData} />
        </div>
    );
}

export default StatsDisplay;
