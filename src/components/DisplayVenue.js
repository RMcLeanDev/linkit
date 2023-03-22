import react, {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

function DisplayVenue(props){

    const navigate = useNavigate();
    const {id} = useParams();
    const [nav, setNav] = useState("info")

    let venue = props.venue[id];
    console.log(venue)

    return(
        <div className="displayVenue">
            <div>
                <p style={{marginBottom: "10px", fontWeight: "bold"}}>{venue.venueName}</p>
                <div className="venueNavContainer">
                    <div className="venueNav">
                        <p style={{backgroundColor: nav === "info" ? "rgba(197,77,255,0.5)":null}} onClick={() => setNav("info")}>Info</p>
                        <span style={{backgroundColor: "black"}}/>
                        <p style={{backgroundColor: nav === "docs" ? "rgba(197,77,255,0.5)":null}} onClick={() => setNav("docs")}>Docs</p>
                    </div>
                </div>
                {nav === "info" ? 
                <div>
                    <p>info</p>
                </div>:
                <div>
                    <p>docs</p>
                </div>}
            </div>
            <button onClick={() => navigate("/venues")}>go back</button>
        </div>
    )
}

export default DisplayVenue;