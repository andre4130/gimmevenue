import React, {useState, useEffect, useRef} from 'react'
import ReactMapGL, {Marker, Popup, FlyToInterpolator} from 'react-map-gl'
import useSuperCluster from "use-supercluster";
//components
import CitySelection from '../../components/CitySelection/CitySelection'
import venues from '../../data/venues.json'
import cities from '../../data/cities.json'

function BarcelonaMapGl ({selectedCity, latitude, longitude}) {
    
    console.log('in BarcelonaMapGl', selectedCity, latitude, longitude)
    const [viewPort, setViewPort] = useState ({
        latitude: 41.386991, 
        longitude: 2.169987,
        zoom: 13,
        width: "100vw",
        height: "90vh"
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
            id: venue.id,
            city: venue.city,
            position:[venue.position[0],venue.position[1]],
            className: venue.className,
            cluster: false,
            type: "Point",
    }));

    //get the bounds 

    const bounds =  mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null;

    //generating the cluster

    const {clusters} = useSuperCluster({
        points, 
        zoom: viewPort.zoom, 
        bounds,
        options: {radius: 75, maxZoom: 20}
    })


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
        <button onClick={() => seeCity(selectedCity, latitude, longitude)}>check city</button>
        </ReactMapGL>
    </div>

    )
}

export default BarcelonaMapGl