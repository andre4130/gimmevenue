import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
// import bands from "../../data/bands"
import venues from "../../data/venues.json"



class Barcelona extends React.Component {
    constructor() {
        super()
        console.log(venues)
        console.log("constructor Barcelona.js - venueList", venues)
        this.state = {
           venues: venues
        }
        // this.clickVenue = this.clickVenue.bind(this)
    }

    //click venue function

//    clickVenue (id) {
//     console.log(id, "working", this.id)
//        this.setState(prevState => {
//            const updatedVenues = prevState.venues.map(place => {
//                if (place.id === id) {
//                return {
//                    ...place,
//                    clicked: !place.clicked
//                }
//            }
//            return place
//            })
//            return {
//                venues: updatedVenues
//            }
//        })
//    } 

    render() {
        const position = [41.3852947, 2.1747437]
        // const [activeVenue, setActiveVenue] = React.useState(null);
        const venuesMarker = this.state.venues.map(venue => 
        <Marker key={venue.id} position={venue.position} onClick={console.log("clicked!")}
        />
        )

        return (
            <Map center={position} zoom="14">
               {venuesMarker}
               
                ))
                <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
            </Map>
        )
    }
}


export default Barcelona