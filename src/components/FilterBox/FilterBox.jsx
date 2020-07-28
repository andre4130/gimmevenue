import React, { Fragment, } from 'react'

function FilterBox ({selectedCity}){

    console.log(selectedCity)

    return(
        <Fragment>
            <div className="FilterBox">
                {selectedCity}
            </div>
        </Fragment>
    )     
}


export default FilterBox;