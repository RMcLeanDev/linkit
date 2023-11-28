import React,{useState} from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import {IoIosArrowDropdown, IoIosArrowDropup, IoIosArrowDropdownCircle, IoIosArrowDropupCircle} from 'react-icons/io';
import VenueHeader from './VenueHeader';

function VenuesMain(props){

    const [venueForm, setVenueForm] = useState(false);
    const [search, setSearch] = useState('');
    const [sortSettings, setSortSettings] = useState({name:"name", ascending: true});
    //{venueForm ? (disableBodyScroll(document), <AddVenueForm closeWindow={() => setVenueForm(false)}/>):(enableBodyScroll(document), null)}

    return(
        <div>
            <VenueHeader />
            test
        </div>
    )
}

export default VenuesMain