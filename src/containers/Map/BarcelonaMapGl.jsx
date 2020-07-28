import React, {useState, useEffect, useRef} from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import useSupercluster from "use-supercluster";
//components
import CitySelection from '../../components/CitySelection/CitySelection'
import venues from '../../data/venues.json'
import FilterBox from '../../components/FilterBox/FilterBox';
import CheckCity from '../../components/CitySelection/CheckCity';

function BarcelonaMapGl ({selectedCity, latitude, longitude, handleSelectCity}) {
    
    console.log('in BarcelonaMapGl', selectedCity, latitude, longitude)
    const [viewPort, setViewPort] = useState ({
        latitude: 41.386991, 
        longitude: 2.169987,
        zoom: 13,
        width: "100vw",
        height: "95vh"
    })
    
    //using the escape key to close the popup
    const [selectedVenue, setSelectedVenue] = useState(null);

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
    }, []);


        const mapRef = useRef();

//Generating a Supercluster of venues


    //Load and prepare the data
    const points = venues.map(venue => ({
            type: "Feature",
            id: venue.id,
            properties: {cluster: false, venueID: venue.id, category: venue.className},
            geometry: {type: "Point", coordinates: [venue.position[0], venue.position[1]]},
    }));

    console.log('loading the points function:', points)

    //get the bounds 

    const bounds =  mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null;

    //generating the cluster

    const { clusters } = useSupercluster({
        points, 
        zoom: viewPort.zoom, 
        bounds,
        options: {radius: 75, maxZoom: 20, minZoom:0}
    });
    
    console.log('check clusters:', clusters)

    //markers code Leigh
    const venuesMarker = venues.map(venue => 
    <Marker 
        key={venue.id} 
        latitude={venue.position[0]} 
        longitude={venue.position[1]}
    >
        <div style={{color: "white"}}>
            {venue.name}
            <br/>
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
                mapboxApiAccessToken={"pk.eyJ1IjoiYW5kcmU0MTMwIiwiYSI6ImNrY25qMjVhZDBicnUycmxobTZwdDRlYzMifQ.4OTMiqEr3gZDmRZJY-ByHA"}
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