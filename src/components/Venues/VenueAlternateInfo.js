import React from 'react'

function VenueAlternateInfo(props){

    let venue = props.venue

    return (
        <div>
            <div className="displayVenue2">
                <p>Contact Name:</p>
                <p>{venue.altContact}</p>
            </div>
            <div className="displayVenue2">
                <p>Contact Number:</p>
                <a style={{color: "black"}}href={"tel:"+venue.contactNumber}>{venue.altNumber}</a>
            </div>
            <div className="displayVenue2">
                <p>Contact Email:</p>
                <a style={{color: "black"}}href={"emailto:"+venue.contactEmail}>{venue.altEmail}</a>
            </div>
        </div>
    )
}

export default VenueAlternateInfo;