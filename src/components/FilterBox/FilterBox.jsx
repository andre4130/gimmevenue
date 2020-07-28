import React, { Fragment } from 'react'


function FilterBox({ selectedCity, latitude, longitude, onChange, state }) {

    //checked function

    // const [state, setChecked] = useState({
    //     checkbox: genres
    // })

    // const handleCheckboxChange = e => {
    //     setChecked({
    //         checkbox: state.checkbox.map(genre => {
    //             return (e.target.value !== genre.genre) ?
    //                 genre : { ...genre, checked: !genre.checked }

    //         })        
    //     })
    // }

    // console.log(state)

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
            </div>
        </Fragment>
    )
}

export default FilterBox;