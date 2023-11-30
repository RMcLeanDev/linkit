import React from 'react';

function VenueFullList(props){
    return(
        <div>
            venue full list
            <button onClick={props.addVenue}>Add Venue</button>
        </div>
    )
}

export default VenueFullList