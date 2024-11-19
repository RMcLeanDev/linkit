import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import NoteItems from '../NoteItems';
import moment from 'moment';
import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";
import "firebase/compat/database";


function DisplayVenue(props){

    let venue = props.venues[useParams().id]
    const [generalDisplay, setGeneralDisplay] = useState(true);
    const [date,  setDate] = useState('');
    const [status, setStatus] = useState(venue.status);
    let totalDevices = 0;
    let totalOnline = 0;

    function submitDate(){
        let endDate = new Date(moment(date).add(2, 'y')).getTime();
        let obj = {"liveDate": new Date(moment(date)).getTime(), "online": true, "status":"live", "endDate": endDate};
        firebase.database().ref(`venues/${venue.id}`).update(obj)
    }

    function updateStatus(){
        if(venue.status === status){
            alert("Status is the same");
        } else {
            let newObj = {status: status};
            firebase.database().ref(`venues/${venue.id}`).update(newObj)
            firebase.database().ref(`changeLog/${Date.now()}`).set({user: firebase.auth().currentUser.uid, note: status, dateSubmited: Date.now(), type: `has updated the status to ${status}`, account: venue.id, venueSponsor:"venue"})
        }
    }

    return(
        <div>
            <div className="displayVenueContainer">
                <h1>{venue.venueName}</h1>
                <hr/>
                <h2 onClick={() => setGeneralDisplay(!generalDisplay)}>General Information: <i className={!generalDisplay ? "far fa-eye-slash": "far fa-eye"}></i></h2>
                <div className={generalDisplay ? "displayVenueItemContainer showGeneral":"displayVenueItemContainer hideGeneral"}>
                    <div className="displayVenueItems">
                        <h3>Devices</h3>
                        {venue.devices? 
                            Object.keys(venue.devices).map((devices) => {
                                if(props.devices[devices]){
                                    let trueFalse;
                                    if(Math.round((Date.now() - props.devices[devices].lastHeartBeat) / (1000 * 60 * 60 * 24))<= 3){
                                        trueFalse=true;
                                    } else {
                                        trueFalse=false;
                                    }
                                    return <div style={{display: "grid", gridTemplateColumns:"10px 1fr", alignItems: "center", borderBottom: "1px solid lightgray", margin: "5px 0"}}>
                                        <p style={{width: "10px", height: "10px", backgroundColor:`${trueFalse ? "green" : "red"}`, borderRadius:"10px", marginLeft: "25px"}}/>
                                        <p>{props.devices[devices].deviceName}</p>
                                        </div>
                                }
                            }):"No Devices Assigned!"}
                    </div>
                    <div className="displayVenueItems">
                        <h3>Address</h3>
                        <p style={{fontSize: "20px"}}onClick={() => navigator.clipboard.writeText(venue.address)}>{venue.address}</p>
                    </div>
                    <div className="displayVenueItems">
                        <h3>Email</h3>
                        <p style={{fontSize: "20px"}}onClick={() => navigator.clipboard.writeText(venue.contactEmail)}>{venue.contactEmail}</p>
                    </div>
                    <div className="displayVenueItems">
                        <h3>Phone Number</h3>
                        <p style={{fontSize: "20px"}}onClick={() => navigator.clipboard.writeText(venue.contactNumber)}>{venue.contactNumber}</p>
                    </div>
                    <div className="displayVenueItems">
                        <h3>Live Date</h3>
                        <p style={{fontSize: "20px"}}>{venue.liveDate ? <p>{moment(venue.liveDate).format('MMMM Do YYYY')}</p>: <div><p>Not Date Set! Please set below.</p><input type="date" value={date} onChange={e => setDate(e.target.value)}/><button onClick={submitDate}>Submit</button></div>}</p>
                    </div>
                    <div className="displayVenueItems">
                        <h3>Current Status</h3>
                        <p>{venue.status}</p>
                    </div>
                </div>
            </div>
            <NoteItems info={venue}/>
        </div>
    )
}

export default DisplayVenue;