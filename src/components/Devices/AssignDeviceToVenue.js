import React, {useState} from 'react';
import Select from 'react-select';
import firebase from 'firebase/compat/app';
import "firebase/compat/database";

function AssignDeviceToVenue(props){
    
    const[venueValue, setVenueValue] = useState(null);

    function assignDevice(){
        if(venueValue !== null){
            firebase.database().ref(`venues/${venueValue}/devices`).update({[props.deviceUUID]:props.devices[props.deviceUUID].deviceName}).then(() => {
                firebase.database().ref(`devices/${props.deviceUUID}`).update({assigned: true})
            }).then(() => {
                props.close()
            })
        }
    }

    return(
        <div className="assignDeviceToVenue">
            <div className="assignDevice">
                <Select options={props.options} onChange={(e) => setVenueValue(e.value)}/>
                <button className="submit" onClick={() => assignDevice()}>Submit</button>
                <button onClick={props.close} className="cancel">Cancel</button>
            </div>
        </div>
    )
}

export default AssignDeviceToVenue;