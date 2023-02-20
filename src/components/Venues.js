import React,{useState} from 'react';
import AddVenueForm from './AddVenueForm';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

function Venues(){

    const [venueForm, setVenueForm] = useState(false);

    return(
        <div className="venuesContainer">
            {venueForm ? (disableBodyScroll(document), <AddVenueForm closeWindow={() => setVenueForm(false)}/>):(enableBodyScroll(document), null)}
            <input className="searchBar" placeholder="SEARCH" />
            <i className="fa-solid fa-plus addNewTicketButton" style={{color: "#c54dff"}} onClick={() => setVenueForm(true)}/>
            <div>
                <p>info here</p>
            </div>
        </div>
    )
}

export default Venues