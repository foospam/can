import { Table } from "react-bootstrap";
import Place from "../model/places/Place";
import Player from "../model/Player"
import React from "react";

interface PriceDisplayProps {
    player: Player,
    place: Place
}

function PriceDisplay({
    player,
    place
}: PriceDisplayProps) {

    const [stuffPrices, setStuffPrices] = React.useState<Map<string, number>>(place.getStuffPrices());
    console.log(place.getStuffPrices())
    const [stuffMap, setStuffMap] = React.useState<Map<string, number>>(player.getStuffOnHandMap());
    const [hold, setHold] = React.useState<number>(player.getHold());


    React.useEffect(() => {
        // Replace 'foreignObject' with the actual reference to your foreign TypeScript object
        const newStuffPrices = new Map<string, number>;
        for (const [key, value] of place.getStuffPrices().entries()) {
            newStuffPrices.set(key, value);
          }

        const newStuffMap = player.getStuffOnHandMap();
        for (const [key, value] of player.getStuffOnHandMap().entries()) {
            newStuffMap.set(key, value);
          }

        setStuffPrices(newStuffPrices);
        setStuffMap(newStuffMap);
        setHold(player.hold);
        console.log("Something changed");
      }, [place.getStuffPrices(), player.getStuffOnHandMap(), player.hold]); // You can specify dependencies that trigger the effect



    const stuffAndPrice = (name: string) => {
        return (
            <tr><td>{name}</td><td>{stuffPrices.get(name)}</td><td>{stuffMap.get(name)}</td></tr>
        )
    }

    return (
        <>
        <label id="schoolLabel">Candy prices in {place.name}</label>
        <Table bordered>
            <tbody>
                {stuffAndPrice(place.getStuffName(0))}
                {stuffAndPrice(place.getStuffName(1))}
                {stuffAndPrice(place.getStuffName(2))}
                {stuffAndPrice(place.getStuffName(3))}
                {stuffAndPrice(place.getStuffName(4))}
                {stuffAndPrice(place.getStuffName(5))}
                {stuffAndPrice(place.getStuffName(6))}
                {stuffAndPrice(place.getStuffName(7))}
            </tbody>
        </Table>
        </>
    );
}

export default PriceDisplay;
