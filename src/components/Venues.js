import React,{useState} from 'react';
import AddVenueForm from './AddVenueForm';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

function Venues(props){

    const [venueForm, setVenueForm] = useState(false);
    console.log(props)
    return(
        <div className="venuesContainer">
            {venueForm ? (disableBodyScroll(document), <AddVenueForm closeWindow={() => setVenueForm(false)}/>):(enableBodyScroll(document), null)}
            <input className="searchBar" placeholder="SEARCH" />
            <i className="fa-solid fa-plus addNewTicketButton" style={{color: "#c54dff"}} onClick={() => setVenueForm(true)}/>
            <div>
                {props.venues ? Object.keys(props.venues).map(venues => {
                    let venue = props.venues[venues]
                    return(
                        <div key={venues}>
                            <h1>{venue.venueName}</h1>
                        </div>
                    )
                }) : "loading..."}
            </div>
        </div>
    )
}

export default Venues