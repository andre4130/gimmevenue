import React, { Fragment } from 'react'


function FilterBox({ selectedCity, latitude, longitude, onChange, onClick, state}) {

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
                    className="button"
                    type="button" 
                    onClick={onClick}
                    value="Select All"
                    name="selectAll"
                >Select All</button>
                <button
                className="button"
                type="button"
                onClick={onClick}
                value="Clear All"
                name="clearAll">
                    Clear All
                </button>
            </div>
        </Fragment>
    )
}

export default FilterBox;