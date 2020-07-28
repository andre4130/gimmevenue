import React, { Fragment } from 'react';

//data
import cities from '../../data/cities.json'

function CheckCity({ selectedCity, latitude, longitude, setViewPort, viewPort, handleSelectCity }) {

    //Select City Function

    const selectCity = (e) => {

        const currentCity = cities.filter(city => city.id === e.target.value);
        console.log('in selectCity function', currentCity);
        console.log('selected', e.target.value);
        handleSelectCity(currentCity);
        setViewPort({ ...viewPort, latitude: currentCity[0].coordinates[0], longitude: currentCity[0].coordinates[1] })
    }


    const cityList = cities.map(city =>
        <option key={city.idNumber} value={city.id}>
            {city.id}
        </option>
    )

    return (
        <Fragment>
            <div className="checkcity">
                <form>
                    <label>
                        Select your City:
                        <select onChange={selectCity}>
                            {cityList}
                        </select>
                    </label>
                </form>
            </div>
        </Fragment>
    )
}

export default CheckCity;