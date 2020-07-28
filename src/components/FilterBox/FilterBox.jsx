import React, { Fragment, useState } from 'react'

//data
import genres from '../../data/genres.json'

function FilterBox({ selectedCity, latitude, longitude }) {

    //checked function

    const [state, setChecked] = useState({
        // checkbox: genres.map(genre => {
        //     genre.checked = true;
        //     return genre; 
        checkbox: genres
        })


console.log("out of the function", state)

    const handleCheckboxChange = e => {
        setChecked({
            checkbox: state.checkbox.map(genre => {
                console.log(genre.genre)
                return (e.target.value !== genre.genre) ? 
                genre : {...genre, checked: !genre.checked} 
                
            })
        })

        console.log("handlechange", e.target.value, state)
    }

    const _genres = state.checkbox.map(genre =>
        <li  key={genre.id} >
        <input 
            value={genre.genre}
            name="Genre"
            type="checkbox"
            checked={genre.checked}
            onChange={handleCheckboxChange}
        >
        </input>
        <label>
            {`${genre.genre}`}
        </label>
        </li>
        )

    return (
        <Fragment>
            <div className="filterbox">
                <p>{`Your selected city is: ${selectedCity}`}</p>
                <p>{`Your coordinates are:`}</p>
                <p> {`lat ${latitude}, long ${longitude}`}</p>
                <label>
            Select Genre: 
            <ul>
            {_genres}
            </ul>
            </label>
            </div>

        </Fragment>
    )
}


export default FilterBox;