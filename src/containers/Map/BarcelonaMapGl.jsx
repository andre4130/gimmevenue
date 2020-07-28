import React, { useState, useEffect, useRef } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import useSupercluster from "use-supercluster";
//components
import CitySelection from '../../components/CitySelection/CitySelection'
import venues from '../../data/venues.json'
import FilterBox from '../../components/FilterBox/FilterBox';
import CheckCity from '../../components/CitySelection/CheckCity';

//data 
import genres from '../../data/genres.json'

function BarcelonaMapGl({ mapboxApiAccessToken, selectedCity, latitude, longitude, handleSelectCity }) {

    console.log('in BarcelonaMapGl', mapboxApiAccessToken.token[0].token, selectedCity, latitude, longitude)
    const [viewPort, setViewPort] = useState({
        latitude: 41.386991,
        longitude: 2.169987,
        zoom: 13,
        width: "100vw",
        height: "95vh"
    })

    //setting the genre filter state function
        const [state, setChecked] = useState({
        checkbox: genres
        })

    const handleCheckboxChange = e => {
        setChecked({
            checkbox: state.checkbox.map(genre => {
                return (e.target.value !== genre.genre) ?
                    genre : { ...genre, checked: !genre.checked }

            })        
        })
    }

    console.log("state check", state)
    //using the escape key to close the popup
    const [selectedVenue, setSelectedVenue] = useState(null);

    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setSelectedVenue(null)
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener)
        }
    }, []);


    const mapRef = useRef();

    //Generating a Supercluster of venues


    //Load and prepare the data
    const points = venues.map(venue => ({
        type: "Feature",
        id: venue.id,
        properties: { cluster: false, venueID: venue.id, category: venue.className },
        geometry: { type: "Point", coordinates: [venue.position[0], venue.position[1]] },
    }));

    console.log('loading the points function:', points)

    //get the bounds 

    const bounds = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null;

    //generating the cluster

    const { clusters } = useSupercluster({
        points,
        zoom: viewPort.zoom,
        bounds,
        options: { radius: 75, maxZoom: 20, minZoom: 0 }
    });

    console.log('check clusters:', clusters)

    //markers code Leigh
    const venuesMarker = venues.map(venue =>
        <Marker
            key={venue.id}
            latitude={venue.position[0]}
            longitude={venue.position[1]}
        >                
        {/* generating a ternary operator in order to hide and show depending on filter selected */}
            <div className={ !state.checkbox.checked ? "show" : "hide"}>
                {venue.name}
                <br />

                <div className={venue.className}
                    onClick={(e) => {
                        e.preventDefault()
                        setSelectedVenue(venue)
                    }}
                >
                </div>
            </div>
        </Marker>
    )

    return (
        <div>
            <ReactMapGL
                {...viewPort}
                mapboxApiAccessToken={mapboxApiAccessToken.token[0].token}
                mapStyle="mapbox://styles/andre4130/ckcnjsgto2nrb1inpf706l90s"
                onViewportChange={viewport => {
                    setViewPort(viewport);
                    console.log('in mapGl', viewport)
                    console.log('clusters:', clusters)
                }}
                onClick={() => setSelectedVenue(null)}
                ref={mapRef}
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
                <FilterBox
                    selectedCity={selectedCity}
                    latitude={latitude}
                    longitude={longitude}
                    onChange={handleCheckboxChange}
                    state={state}
                />
                <CheckCity
                    selectedCity={selectedCity}
                    latitude={latitude}
                    longitude={longitude}
                    setViewPort={setViewPort}
                    viewPort={viewPort}
                    handleSelectCity={handleSelectCity}
                />
            </ReactMapGL>
        </div>

    )
}

export default BarcelonaMapGl