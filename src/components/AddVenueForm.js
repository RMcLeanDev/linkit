import React, {useState} from 'react';

function AddVenueForm(props){
    
    function submitNewVenue(e){
        e.preventDefault();
    }

    return(
        <div>
            <div className="formContainer">
            <form onSubmit={submitNewVenue} className="formBox">
                <i class="fa-solid fa-x close" onClick={props.closeWindow} />
                <h1>Add Venue</h1>
                <p>Basic Information:</p>
                <div className="formItem">
                    <input placeholder="Business Name"/>
                    <input placeholder="Business Contact Name"/>
                </div>
                <div className="formItem">
                    <input placeholder="Contact Number"/>
                    <input placeholder="Contact Email"/>
                </div>
                <input className="singleLine" placeHolder="Address"/>
                <div style={{"marginBottom":"10px"}}></div>
                <p>Alternate Contact Info: (optional)</p>
                <input className="singleLine" placeHolder="Alt Contact"/>
                <div className="formItem">
                    <input placeholder="Alt Number"/>
                    <input placeholder="Alt Email"/>
                </div>
                <div style={{"marginBottom":"10px"}}></div>
                <p>Additional Info:</p>
                <div style={{"marginBottom":"5px"}}></div>
                <div className="formItem">
                    <p style={{"justifySelf":"flex-start"}}>Pet Friendly?</p>
                    <select>
                        <option>Select one:</option>
                        <option>Yes</option>
                        <option>No</option>
                        <option>Unknown</option>
                    </select>
                </div>
                <div className="formItem">
                    <p style={{"justifySelf":"flex-start"}}>Family Friendly?</p>
                    <select>
                        <option>Select one:</option>
                        <option>Yes</option>
                        <option>No</option>
                        <option>Unknown</option>
                    </select>
                </div>
                <div className="formItem">
                    <p style={{"justifySelf":"flex-start"}}>Serves Food?</p>
                    <select>
                        <option>Select one:</option>
                        <option>Yes</option>
                        <option>No</option>
                        <option>Unknown</option>
                    </select>
                </div>
                <p style={{"marginTop": "10px"}}>Internal Items:</p>
                <div style={{"marginBottom":"5px"}}></div>
                <div className="formItem">
                    <input placeholder="Wifi Name"/>
                    <input placeholder="Wifi Password"/>
                </div>
                <input className="singleLine" placeHolder="Rep Name"/>
                <button className="submitVenue" type="submit">Submit</button>
            </form>
        </div>
        </div>
    )
}

export default AddVenueForm;