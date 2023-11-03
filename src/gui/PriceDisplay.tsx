import { Table } from "react-bootstrap";
import Place from "../model/places/Place";
import Player from "../model/Player"
import React from "react";
import ContextDataObject from "../model/auxiliaries/ContextDataObject";

interface PriceDisplayProps {
    player: Player,
    place: Place
    contextData : ContextDataObject
}

function PriceDisplay({
    player,
    place,
    contextData
}: PriceDisplayProps) {


    const stuffAndPrice = (name: string) => {
        return (
            <tr><td>{name}</td><td>{contextData.stuffPrices.get(name)}</td><td>{contextData.stuffOnHand.get(name)}</td></tr>
        )
    }

    return (
        <>
        <label id="schoolLabel">Candy prices in {place.name}</label>
        <Table>
            <thead>
            <tr><td>Name</td><td>Price</td><td>Stashed</td></tr>
            </thead>
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
