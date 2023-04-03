import React from 'react';

function VenuesToDoList(props){

    let venue = props.venue
    console.log(venue)
    return(
        <div>
            <div className="displayVenue2">
                <p>Paperwork:</p>
                <select>
                    <option>Complete</option>
                    <option>Pending</option>
                    <option>Not Started</option>
                </select>
            </div>
            <div className="displayVenue2">
                <p>Artwork:</p>
                <select>
                    <option>Complete</option>
                    <option>Pending</option>
                    <option>Not Started</option>
                </select>
            </div>
            {   venue.toDo.wifiInfo ? <div>
                    <div className="displayVenue2">
                        <p>Wifi Information</p>
                        <p>Complete</p>
                    </div>
                </div>
                :
                <div><p>Wifi Info:</p>
                <div className="displayVenue2">
                    <input placeHolder="Wifi Name"/>
                    <input placeHolder="Wifi Password"/>
                </div>
                </div>
            }
            <div className="displayVenue2">
                <p>Order TV's:</p>
                <select>
                    <option>Complete</option>
                    <option>Pending</option>
                    <option>Not Started</option>
                </select>
            </div>
            <div className="displayVenue2">
                <p>Send Firesticks:</p>
                <select>
                    <option>Complete</option>
                    <option>Pending</option>
                    <option>Not Started</option>
                </select>
            </div>
            <div className="displayVenue2">
                <p>Schedule Install:</p>
                <select>
                    <option>Complete</option>
                    <option>Pending</option>
                    <option>Not Started</option>
                </select>
            </div>
        </div>
    )
}

export default VenuesToDoList;