import react, {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {store} from  '../../index';
import { updateOnlineStatus } from '../../actions';
import VenuesToDoList from './VenuesToDoList';

function DisplayVenue(props){

    const navigate = useNavigate();
    const {id} = useParams();
    const [nav, setNav] = useState("info")
    const [displayGeneral, setDisplayGeneral] = useState(true);

    let venue;

    if(props.venue){
        venue = props.venue[id];
    }

    return(
        <div className="displayVenue">
            { venue ? 
                <div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <div style={{width: "10px", height: "10px", backgroundColor: venue.online ? "limegreen":"red", borderRadius:"10px", marginRight:"5px"}}/>
                        <p style={{fontWeight: "bold"}}>{venue.venueName}</p>
                    </div>
                <div className="venueNavContainer">
                    <div className="venueNav">
                        <p style={{backgroundColor: nav === "info" ? "rgba(197,77,255,0.5)":null}} onClick={() => setNav("info")}>Info</p>
                        <span style={{backgroundColor: "black"}}/>
                        <p style={{backgroundColor: nav === "docs" ? "rgba(197,77,255,0.5)":null}} onClick={() => setNav("docs")}>Docs</p>
                    </div>
                </div>
                {nav === "info" ? 
                <div className="displayVenueContainer">
                    <div style={{position: "relative", width: "90%", margin:"auto"}}>
                        <h2>General Info:</h2>
                        <i style={{position: "absolute", right: "-10px", bottom:"5px"}} className={displayGeneral ? "far fa-eye": "far fa-eye-slash"} id={displayGeneral ? "natogglePassword" : "togglePassword"} onClick={() => setDisplayGeneral(!displayGeneral)}></i>
                    </div>
                    <span style={{height: "1px", backgroundColor: "#0f95f9", width: "90vw", margin: "auto", marginBottom: "10px"}}/>
                    {
                        displayGeneral ? 
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
                                <select value={venue.online} onChange={(e) => store.dispatch(updateOnlineStatus({newStatus: JSON.parse(e.target.value), venue: venue}))}>
                                    <option value="false">Offline</option>
                                    <option value="true">Online</option>
                                </select>
                            </div>
                        </div>: null
                    }
                    {venue  ?  <VenuesToDoList />:null}
                </div>:
                <div>
                    <p>docs</p>
                </div>}
            </div> : "loading..."
            }
            <button onClick={() => navigate("/venues")}>go back</button>
        </div>
    )
}

export default DisplayVenue;