import React, { useState, useEffect, useRef } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import useSupercluster from "use-supercluster";
//components
import CitySelection from '../../components/CitySelection/CitySelection'
import FilterBox from '../../components/FilterBox/FilterBox';
import CheckCity from '../../components/CitySelection/CheckCity';

//data 
import genres from '../../data/genres.json'
import venues from '../../data/venues.json'

function BarcelonaMapGl({ mapboxApiAccessToken, selectedCity, latitude, longitude, handleSelectCity }) {

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

    const [stateVenue, setVenue] = useState({
        stateVenues: venues
    })

    const [select, setSelect] = useState({
        select: "Select All"
    });


    const handleCheckboxChange = e => {
        
        if (state.checkbox.includes(genres.checked === false)) {
            setSelect({select: "Deselect All"})
        } else {
            setSelect({ select: "Select All" })
        }

        setChecked({
            checkbox: state.checkbox.map(genre => {
                return (e.target.value !== genre.genre) ?
                    genre : { ...genre, checked: !genre.checked }
            })
        })


        setVenue({
            stateVenues: stateVenue.stateVenues.map(venue => {
                var n = venue.genre.includes(e.target.value);
                var m = true;
                for (let i = 0; i < venue.genre.length; i++) {
                    for (let n = 0; n < state.checkbox.length; n++) {
                        if (venue.genre[i] === state.checkbox[n].genre && state.checkbox[n].checked === true) {
                            console.log(state.checkbox[n].genre, "is checked in", venue.name);
                            m = true;
                        } else {
                            console.log(state.checkbox[n].genre, "is not checked in", venue.name)
                            m = false;
                        }
                    }
                    return (n && m ? { ...venue, isVisible: false } : {...venue, isVisible: true})
                }
            }
            )
        })
    }

const handleSelectAll = () => {
    setChecked({
        checkbox: state.checkbox.map(genre => {
            return { ...genre, checked: true }
        })
    })

    setVenue({
        stateVenues: stateVenue.stateVenues.map(venue => {
            return { ...venue, isVisible: true }
        })
    })
}

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

//get the bounds 

const bounds = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null;

//generating the cluster

const { clusters } = useSupercluster({
    points,
    zoom: viewPort.zoom,
    bounds,
    options: { radius: 75, maxZoom: 20, minZoom: 0 }
});

// const test = state.checkbox.map(check => {
//     if (check.checked === false) {
//         return console.log("there is a false in:", check.genre)
//     } else {
//         return console.log("there is a true in:", check.genre)
//     }
// })

//markers code Leigh
const venuesMarker = stateVenue.stateVenues.map(venue =>
    <Marker
        key={venue.id}
        latitude={venue.position[0]}
        longitude={venue.position[1]}
    >
        <div className={venue.isVisible ? "show" : "hide"}>
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
        {/* <div className={venue.genre.forEach(genre => state.checkbox.) === state.checkbox[0].genre && state.checkbox[0].checked !== true ? "hide" : "show"}>
                {venue.name}
                <br />
                <div className={venue.className}
                    onClick={(e) => {
                        e.preventDefault()
                        setSelectedVenue(venue)
                    }}
                >
                </div>
            </div> */}
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
            }}
            onClick={() => setSelectedVenue(null)}
            ref={mapRef}
        >
            {venuesMarker}
            {selectedVenue ? (
                <Popup
                    className="popup"
                    latitude={selectedVenue.position[0]}
                    longitude={selectedVenue.position[1]}
                    onClose={() => setSelectedVenue(null)}
                >
                    <h2>{selectedVenue.name}</h2>
                    <p>{selectedVenue.address}</p>
                    <h4>Genres</h4>
                    <ul>{selectedVenue.genre.map(genre =>
                        <li>{genre}</li>
                    )}</ul>
                </Popup>
            ) : null}
            <FilterBox
                selectedCity={selectedCity}
                latitude={latitude}
                longitude={longitude}
                onChange={handleCheckboxChange}
                onClick={handleSelectAll}
                state={state}
                select={select}
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