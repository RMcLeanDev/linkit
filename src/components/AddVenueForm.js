import React, {useState} from 'react';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";
import {v4 as uuidv4} from 'uuid';

function AddVenueForm(props){

    const [venueName, setVenueName] = useState('');
    const [venueContactName, setVenueContactName] = useState('')
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
        let newId = uuidv4();
        let pushInfo = {venueName: venueName, venueName: venueContactName, contactNumber: contactNumber, contactEmail: contactEmail, address: address, altContact: `${altContact ? altContact:"none given"}`, altNumber: `${altNumber ? altNumber:"none given"}`, altEmail: `${altEmail ? altEmail:"none given"}`, petFriendly: petFriendly, familyFriendly: familyFriendly, servesFood: servesFood, wifiName: `${wifiName ? wifiName : "none given"}`, wifiPassword: `${wifiPassword ? wifiPassword:"none given"}`, repName: repName, dateCreated: Date.now(), id: newId, status:"new"};
        console.log(pushInfo)
        firebase.database().ref(`venues/${newId}`).set(pushInfo).then(() => {
            props.closeWindow()
        }).catch(error => {
            console.log(error)
        });
        
    }

    return(
        <div>
            <div className="formContainer">
            <form onSubmit={submitNewVenue} className="formBox">
                <i class="fa-solid fa-x close" onClick={props.closeWindow} />
                <h1>Add Venue</h1>
                <p>Basic Information:</p>
                <div className="formItem">
                    <input required placeholder="Venue Name" onChange={e => setVenueName(e.target.value)}/>
                    <input required placeholder="Venue Contact Name" onChange={e => setVenueContactName(e.target.value)}/>
                </div>
                <div className="formItem">
                    <input required placeholder="Contact Number" onChange={e => setContactNumber(e.target.value)}/>
                    <input required type="email" placeholder="Contact Email" onChange={e => setContactEmail(e.target.value)}/>
                </div>
                <input required className="singleLine" placeHolder="Address" onChange={e => setAddress(e.target.value)}/>
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
                    <input placeholder="Wifi Name (Optional)" onChange={e => setWifiName(e.target.value)}/>
                    <input placeholder="Wifi Password (Optional)" onChange={e => setWifiPassword(e.target.value)}/>
                </div>
                <input required className="singleLine" placeHolder="Rep Name" onChange={e => setRepName(e.target.value)}/>
                <button className="submitVenue" type="submit">Submit</button>
            </form>
        </div>
        </div>
    )
}

export default AddVenueForm;