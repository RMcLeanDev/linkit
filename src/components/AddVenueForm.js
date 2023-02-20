import React from 'react';

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
                <input placeholder="Business Name"/>
                <p>Booking rep</p>
                <p>Business Contact Name</p>
                <p>Contact Number</p>
                <p>Contact Email</p>
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