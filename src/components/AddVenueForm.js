import React, {useState} from 'react';

function AddVenueForm(props){

    const [businessName, setBusinessName] = useState('');
    const [businessContactName, setBusinessContactName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [contactEmail, setContactEmail] = useState('')
    const [address, setAddress] = useState('')
    const [altContact, setAltContact] = useState('')
    const [altNumber, setAltNumber] = useState('')
    const [altEmail, setAltEmail] = useState('')
    const [petFriendly, setPetFriendly] = useState('select')
    const [familyFriendly, setFamilyFriendly] = useState('select')
    const [servesFood, setServesFood] = useState('select')
    const [wifiName, setWifiName] = useState('')
    const [wifiPassword, setWifiPassword] = useState('')
    const [repName, setRepName] = useState('')

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
                    <input placeholder="Business Name" onChange={e => setBusinessName(e.target.value)}/>
                    <input placeholder="Business Contact Name" onChange={e => setBusinessContactName(e.target.value)}/>
                </div>
                <div className="formItem">
                    <input placeholder="Contact Number" onChange={e => setContactNumber(e.target.value)}/>
                    <input placeholder="Contact Email" onChange={e => setContactEmail(e.target.value)}/>
                </div>
                <input className="singleLine" placeHolder="Address" onChange={e => setAddress(e.target.value)}/>
                <div style={{"marginBottom":"10px"}}></div>
                <p>Alternate Contact Info: (optional)</p>
                <input className="singleLine" placeHolder="Alt Contact" onChange={e => setAltContact(e.target.value)}/>
                <div className="formItem">
                    <input placeholder="Alt Number" onChange={e => setAltNumber(e.target.value)}/>
                    <input placeholder="Alt Email" onChange={e => setAltEmail(e.target.value)}/>
                </div>
                <div style={{"marginBottom":"10px"}}></div>
                <p>Additional Info:</p>
                <div style={{"marginBottom":"5px"}}></div>
                <div className="formItem">
                    <p style={{"justifySelf":"flex-start"}}>Pet Friendly?</p>
                    <select value={petFriendly} onChange={e => setPetFriendly(e.target.value)}>
                        <option value="select">Select one:</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="unknown">Unknown</option>
                    </select>
                </div>
                <div className="formItem">
                    <p style={{"justifySelf":"flex-start"}}>Family Friendly?</p>
                    <select value={familyFriendly} onChange={e => setFamilyFriendly(e.target.value)}>
                        <option value="select">Select one:</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="unknown">Unknown</option>
                    </select>
                </div>
                <div className="formItem">
                    <p style={{"justifySelf":"flex-start"}}>Serves Food?</p>
                    <select value={servesFood} onChange={e => setServesFood(e.target.value)}>
                        <option value="select">Select one:</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="unknown">Unknown</option>
                    </select>
                </div>
                <p style={{"marginTop": "10px"}}>Internal Items:</p>
                <div style={{"marginBottom":"5px"}}></div>
                <div className="formItem">
                    <input placeholder="Wifi Name" onChange={e => setWifiName(e.target.value)}/>
                    <input placeholder="Wifi Password" onChange={e => setWifiPassword(e.target.value)}/>
                </div>
                <input className="singleLine" placeHolder="Rep Name" onChange={e => setRepName(e.target.value)}/>
                <button className="submitVenue" type="submit">Submit</button>
            </form>
        </div>
        </div>
    )
}

export default AddVenueForm;