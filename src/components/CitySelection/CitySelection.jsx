import React, { Fragment, useState } from 'react'
//data 
import cities from '../../data/cities.json'


function CitySelection({handleSelectCity}) {


const selectCity = (e) => {
    
    const currentCity = cities.filter( city => city.id === e.target.value);
    console.log(currentCity);
    console.log('selected', e.target.value);
    handleSelectCity(currentCity);
}

const cityList = cities.map(city =>
    <option key={city.idNumber} value={city.id}>
        {city.id}
    </option>
    )

return (
    <form>
    <label>
      Select your City:
      <select onChange={selectCity}>
          {cityList}
      </select>
    </label>
  </form>
)
}

export default CitySelection