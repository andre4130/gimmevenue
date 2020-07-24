import React, {useState, useEffect} from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
//components
import CitySelection from '../../components/CitySelection/CitySelection'
import venues from '../../data/venues.json'
import cities from '../../data/cities.json'

function BarcelonaMapGl ({selectedCity, latitude, longitude}) {
    
    console.log('in BarcelonaMapGl', selectedCity, latitude, longitude)
    const [viewPort, setViewPort] = useState ({
        latitude: 45,
        longitude: 0,
        zoom: 13,
        width: "100vw",
        height: "100vh"
    })
    

    //using the escape key to close the popup
    const [selectedVenue, setSelectedVenue] = useState(null)
    useEffect(() => {
        const listener = e => {
            if(e.key ==="Escape") {
                setSelectedVenue(null)
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener)
        }
    }, [])


    //markers code Leigh
    const venuesMarker = venues.map(venue => 
    <Marker key={venue.id} latitude={venue.position[0]} longitude={venue.position[1]}>
        <div style={{color: "white"}}>
            {venue.name}
            <br/>
            <div className={venue.className}
                    onClick={(e) => {
                        e.preventDefault()
                        setSelectedVenue(venue)
                    }}>
            </div>
        </div>
    </Marker>
    )

    //checkcity function

    const seeCity = (selectedCity, lat, long) => {
        setViewPort({...viewPort, latitude: lat, longitude: long})
        console.log(selectedCity, lat, long)
    }

    return (
    <div>
        <ReactMapGL
                {...viewPort}
                mapboxApiAccessToken={"pk.eyJ1IjoiYW5kcmU0MTMwIiwiYSI6ImNrY25qMjVhZDBicnUycmxobTZwdDRlYzMifQ.4OTMiqEr3gZDmRZJY-ByHA"}
                mapStyle="mapbox://styles/andre4130/ckcnjsgto2nrb1inpf706l90s"
                onViewportChange={viewport => {
                    setViewPort(viewport);
                    console.log('in mapGl', viewport)
                }}
                onClick={() => setSelectedVenue(null)}
                >
        {venuesMarker}
        {selectedVenue ? (
            <Popup latitude={selectedVenue.position[0]}
                   longitude={selectedVenue.position[1]}
                   onClose={() => setSelectedVenue(null)}
            >
                <h2>{selectedVenue.name}</h2>
                <p>{selectedVenue.address}</p>
            </Popup>
        ) : null}
        <button onClick={() => seeCity(selectedCity, latitude, longitude)}>check city</button>
        </ReactMapGL>
    </div>

    )
}

export default BarcelonaMapGl