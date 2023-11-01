import { Table } from "react-bootstrap";
import Player from "../model/Player.ts";
import PriceDisplay from "./PriceDisplay.tsx";


interface StatsDisplayProps {
    player: Player;
}

function StatsDisplay({
    player
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
                    {getPlayerStat("Health", player.getHealth())}
                    {getPlayerStat("Reputation", player.getReputation())}
                    {getPlayerStat("Cash", player.getCash())}
                    {getPlayerStat("Deposits", player.getDeposits())}
                    {getPlayerStat("Debt", player.getDebtValue())}
                    {getPlayerStat("Days", player.getDebtDays())}
                    {getPlayerStat("Hold", player.getHold())}
                </tbody>
            </Table>
            <PriceDisplay player={player} place={player.getLocation()} />
        </div>
    );
}

export default StatsDisplay;
