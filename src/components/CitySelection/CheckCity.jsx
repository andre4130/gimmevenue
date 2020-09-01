import React, { Fragment } from 'react';

//data
import cities from '../../data/cities.json'

//styles
import styled from 'styled-components'

const StyledSelect = styled.select`
margin: 0.3rem;
padding: 0.1rem;
border-radius: 5px;
background-color:none;
font-size: 1rem;

:dropdown-content {
    border-radius: 5px;
}
`

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
                        <StyledSelect onChange={selectCity}>
                            {cityList}
                        </StyledSelect>
                    </label>
                </form>
            </div>
        </Fragment>
    )
}

export default CheckCity;