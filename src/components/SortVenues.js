import React, {useState} from 'react';

function SortVenues(props){

    let sorted;


    return(
        <div>
            {props.venues ? Object.keys(props.venues).map(venues => {
                    let venue = props.venues[venues]
                    return(
                        venue.venueName.includes(props.search) ? 
                        <div key={venues}>
                            <p>{venue.venueName}</p>
                        </div> : null
                    )
                }) : "loading..."}
        </div>
    )
}

export default SortVenues;