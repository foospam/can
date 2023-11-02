import React, { MouseEventHandler, useState } from 'react';
import Player from '../model/Player.ts';
import State from '../model/auxiliaries/State.ts';
import ContextDataObject from '../model/auxiliaries/ContextDataObject.ts';
import PlaceContainer from '../model/places/PlaceContainer.ts';


interface BusStationProps {
    state: State
    switchState: (stateName: string) => void
    player: Player
    contextData: ContextDataObject
    updateContext: (contextData: ContextDataObject) => void
}

function BusStation({ state, switchState, player, contextData, updateContext }: BusStationProps) {

    const ticketPrices : number[] = PlaceContainer.returnTicketPrices(player.getLocation().name);

    const placeRow = PlaceContainer.getPlaces().map((place, index) => {

        return (
        <div className="col-4 d-flex align-items-center justify-content-center">
            <button className={ticketPrices[index] <= player.getCash() ?  "btn btn-primary btn-block" : "btn btn-primary btn-block disabled"} onClick={() => {
                player.travel(place, ticketPrices[index]);
                updateContext(new ContextDataObject(player));
                switchState("MainSelectionMenu");
            }}>
                <span>{place.name}</span><br/>
                <span>{place.name != player.getLocation().name ? 
                ticketPrices[index]+" $" : 
                "(You are here)"}</span></button>
        </div>
    )});

    return (
        <div className="container h-100" id="busStation">
            <div className="row h-100">
                {placeRow}
            </div>
        </div>
    )


}


export default BusStation;