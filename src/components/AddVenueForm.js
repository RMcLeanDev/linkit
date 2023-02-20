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
                <div style={{"marginBottom":"10px"}}></div>
                <p>Alternate Contact Info: (optional)</p>
                <input placeHolder="Alt Contact"/>
                <p>Rep name</p>
                <p>Alt Contact</p>
                <p>Alt Number</p>
                <p>Alt email</p>
                <p>Address</p>
                <p>pet friendly</p>
                <p>family friendly</p>
                <p>serves food?</p>
                <p>wifi name</p>
                <p>wifi password</p>
                <button>Submit</button>
            </form>
        </div>
        </div>
    )
}

export default AddVenueForm;