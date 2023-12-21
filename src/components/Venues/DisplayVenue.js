import React, {useState} from 'react'
import { useParams } from 'react-router-dom';

function DisplayVenue(props){

    let venue = props.venues[useParams().id]
    const [generalDisplay, setGeneralDisplay] = useState(true);
    let totalDevices = 0;
    let totalOnline = 0;
    console.log(venue)

    return(
        <div className={`displayVenueContainer`}>
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
                                return <div style={{display: "grid", gridTemplateColumns:"10px 1fr", alignItems: "center"}}>
                                    <p style={{width: "10px", height: "10px", backgroundColor:`${venue ? "green" : "red"}`, borderRadius:"10px", marginLeft: "25px"}}/>
                                    <p>{props.devices[devices].deviceName}</p>
                                    </div>
                            }
                        }):null}
                </div>
                <div className="displayVenueItems">
                    <h3>Address</h3>
                    <p onClick={() => navigator.clipboard.writeText(venue.address)}>{venue.address}</p>
                </div>
            </div>
        </div>
    )
}

export default DisplayVenue;