import React, {useState} from 'react'
import {store} from  '../../index';
import { updateOnlineStatus, updateVenueStatus } from '../../actions';

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
                <select value={venue.online} onChange={(e) => store.dispatch(updateOnlineStatus({newStatus: JSON.parse(e.target.value), venue: venue}))} style={{width: "100px"}}>
                    <option value="false">Offline</option>
                    <option value="true">Online</option>
                </select>
            </div>
            <div className="displayVenue2">
                <p>Current Status:</p>
                <input value={venue.status} onChange={(e) => store.dispatch(updateVenueStatus({venue:venue, text: e.target.value}))} style={{width: "96%"}}/>
            </div>
        </div>
    )
}

export default VenueGeneralInfo;