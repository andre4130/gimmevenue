import React from 'react'
import { Map, Marker, Popup, TileLayer, LayerGroup, Circle } from 'react-leaflet'
import { Icon } from 'leaflet'
import '../../App.css';
import Navbar from '../../components/Navbar';

// import bands from "../../data/bands"

import venues from "../../data/venues.json"




function BarcelonaExample () {
    const position = [41.3852947, 2.1747437];
    const [activeVenue, setActiveVenue] = React.useState(null);
    const guitar = new Icon({
        iconUrl: require('../../assets/svg/guitar.svg'),
        iconRetinaUrl: require('../../assets/svg/guitar.svg'),
        iconSize: [30,30]
    })
    const venuesMarker = venues.map(venue => 
        <Marker key={venue.id} position={venue.position} onClick={() => {setActiveVenue(venue)}} icon={guitar}
        />
        )
    return (
        <div>
        <Map center={position} zoom="14">
        <Navbar></Navbar>
        {venuesMarker}
           {activeVenue && (
               <Popup position={activeVenue.position} onClose={() => setActiveVenue(null)}>
                   <div>
                        <h2>{activeVenue.name}</h2>
                        <p>{activeVenue.address}</p>
                        <p>{activeVenue.link}</p>
                   </div>
               </Popup>
           )}
            ))
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        </Map>
        </div>
    )
}

export default BarcelonaExample