import React, { Fragment } from 'react'

//styled components
import Button from '../../styles/styledComponents/Button'

function FilterBox({ selectedCity, latitude, longitude, onChange, onClick, state}) {

    const _genres = state.checkbox.map(genre =>
        <li key={genre.id} >
            <input
                className='checkbox'
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
                <div>
                <Button
                    className="btn"
                    type="button" 
                    onClick={onClick}
                    value="Select All"
                    name="selectAll"
                >Select All</Button>
                <Button
                className="btn"
                type="button"
                onClick={onClick}
                value="Clear All"
                name="clearAll">
                    Clear All
                </Button>
                </div>
                
            </div>
        </Fragment>
    )
}

export default FilterBox;