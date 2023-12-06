import React,{useState} from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import {IoIosArrowDropdown, IoIosArrowDropup, IoIosArrowDropdownCircle, IoIosArrowDropupCircle} from 'react-icons/io';
import VenueHeader from './VenueHeader';
import AddVenueForm from './AddVenueForm';
import VenueFullList from './VenueFullList';

function VenuesMain(props){

    const [venueForm, setVenueForm] = useState(false);
    const [search, setSearch] = useState('');
    const [sortSettings, setSortSettings] = useState({name:"name", ascending: true});

    return(
        <div className="devicesMain">
            {venueForm ? (disableBodyScroll(document), <AddVenueForm closeWindow={() => setVenueForm(false)}/>):(enableBodyScroll(document), null)}
            <VenueHeader />
            <VenueFullList addVenue={() => setVenueForm(true)} venues={props.venues} devices={props.devices}/>
        </div>
    )
}

export default VenuesMain