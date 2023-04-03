import react, {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import VenuesToDoList from './VenuesToDoList';
import VenueGeneralInfo from './VenueGeneralInfo';
import VenueAlternateinfo from './VenueAlternateInfo';

function DisplayVenue(props){

    const navigate = useNavigate();
    const {id} = useParams();
    const [nav, setNav] = useState("info")
    const [displayGeneral, setDisplayGeneral] = useState(true);
    const [displayAlternate, setDisplayAlternate] = useState(false);
    const [venueToDoList, setVenueToDoList] = useState(true);

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
                    { displayGeneral ? <VenueGeneralInfo venue={venue}/>: null}
                    <div style={{position: "relative", width: "90%", margin:"auto"}}>
                        <h2>Alternate Info:</h2>
                        <i style={{position: "absolute", right: "-10px", bottom:"5px"}} className={displayAlternate ? "far fa-eye": "far fa-eye-slash"} id={displayAlternate ? "natogglePassword" : "togglePassword"} onClick={() => setDisplayAlternate(!displayAlternate)}></i>
                    </div>
                    <span style={{height: "1px", backgroundColor: "#0f95f9", width: "90vw", margin: "auto", marginBottom: "10px"}}/>
                    { displayAlternate ? <VenueAlternateinfo venue={venue} />:null}
                    <div style={{position: "relative", width: "90%", margin:"auto"}}>
                        <h2>Venue To Do List:</h2>
                        <i style={{position: "absolute", right: "-10px", bottom:"5px"}} className={venueToDoList ? "far fa-eye": "far fa-eye-slash"} id={venueToDoList ? "natogglePassword" : "togglePassword"} onClick={() => setVenueToDoList(!venueToDoList)}></i>
                    </div>
                    <span style={{height: "1px", backgroundColor: "#0f95f9", width: "90vw", margin: "auto", marginBottom: "10px"}}/>
                    { venueToDoList ? <VenuesToDoList venue={venue} />:null}
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