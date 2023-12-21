import React from 'react'
import { useParams } from 'react-router-dom';

function DisplayVenue(props){

    let venue = props.venues[useParams().id]

    console.log(venue)

    return(
        <div>
            <h1>{venue.venueName}</h1>
            <div className="displayVenueContainer">
                <div>
                    <h3>Address</h3>
                    <p onClick={() => navigator.clipboard.writeText(venue.address)}>{venue.address}</p>
                </div>
            </div>
        </div>
    )
}

export default DisplayVenue;