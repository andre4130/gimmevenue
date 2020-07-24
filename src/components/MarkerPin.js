import React from "react"
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
// import venues from "../../data/venues.json"

function MarkerPin (props) {
    return (
        <div className="marker">
            <Marker position={props.venue.position} onClick={() => props.clickVenue(props.item.id)}
            />
            <Popup>
                {props.venue.name}
            </Popup>
        </div>
    )

}

export default MarkerPin