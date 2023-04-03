import React from 'react'
import {store} from  '../../index';
import { updateOnlineStatus } from '../../actions';

function VenueGeneralInfo(props){

    let venue = props.venue;

    return(
        <div>
            <div className="displayVenue2">
                <p>Contact Name:</p>
                <p>{venue.venueContactName}</p>
            </div>
            <div className="displayVenue2">
                <p>Contact Number:</p>
                <a style={{color: "black"}}href={"tel:"+venue.contactNumber}>{venue.contactNumber}</a>
            </div>
            <div className="displayVenue2">
                <p>Contact Email:</p>
                <a style={{color: "black"}}href={"emailto:"+venue.contactEmail}>{venue.contactEmail}</a>
            </div>
            <div className="displayVenue2">
                <p>Contact Address:</p>
                <a style={{color: "black"}}href={"http://maps.google.com/?q="+venue.address} target="_blank">{venue.address}</a>
            </div>
            <div className="displayVenue2">
                <p>Online Status:</p>
                <select value={venue.online} onChange={(e) => store.dispatch(updateOnlineStatus({newStatus: JSON.parse(e.target.value), venue: venue}))}>
                    <option value="false">Offline</option>
                    <option value="true">Online</option>
                </select>
            </div>
        </div>
    )
}

export default VenueGeneralInfo;