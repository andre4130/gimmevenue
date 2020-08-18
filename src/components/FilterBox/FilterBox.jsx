import React, { Fragment } from 'react'


function FilterBox({ selectedCity, latitude, longitude, onChange, onClick, state, select }) {

    const _genres = state.checkbox.map(genre =>
        <li key={genre.id} >
            <input
                value={genre.genre}
                name="Genre"
                type="checkbox"
                checked={genre.checked}
                onChange={onChange}
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
                <br/>
                <button
                    type="button" 
                    onClick={onClick}
                    value="Select All"
                    name={select.select}
                >{select.select}</button>
            </div>
        </Fragment>
    )
}

export default FilterBox;