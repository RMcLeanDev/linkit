import React,{useState} from 'react';
import AddVenueForm from './AddVenueForm';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import SortVenues from './SortVenues';
import {IoIosArrowDropdown, IoIosArrowDropup, IoIosArrowDropdownCircle, IoIosArrowDropupCircle} from 'react-icons/io';

function Venues(props){

    const [venueForm, setVenueForm] = useState(false);
    const [search, setSearch] = useState('');
    const [sortSettings, setSortSettings] = useState({name:"name", ascending: true});
    console.log(sortSettings.ascending)
    return(
        <div className="venuesContainer">
            {venueForm ? (disableBodyScroll(document), <AddVenueForm closeWindow={() => setVenueForm(false)}/>):(enableBodyScroll(document), null)}
            <input className="searchBar" placeholder="SEARCH" onChange={e => setSearch(e.target.value)}/>
            <i className="fa-solid fa-plus addNewTicketButton" style={{color: "#c54dff"}} onClick={() => setVenueForm(true)}/>
            <div className="venueItems">
                <div className="venueSort" onClick={()=>setSortSettings({name: "name", ascending: !sortSettings.ascending})}>
                    <h3>Name</h3>
                    {sortSettings.name === "name" ? sortSettings.ascending ? <IoIosArrowDropdownCircle size={25}/>:<IoIosArrowDropupCircle size={25} />:<IoIosArrowDropup size={25}/>}
                </div>
                <div className="venueSort" onClick={()=>setSortSettings({name: "status", ascending: !sortSettings.ascending})}>
                    <h3>Status</h3>
                    {sortSettings.name === "status" ? sortSettings.ascending ? <IoIosArrowDropdownCircle size={25}/>:<IoIosArrowDropupCircle size={25} />:<IoIosArrowDropup size={25}/>}
                </div>
            </div>
            <SortVenues venues={props.venues} search={search}/>
        </div>
    )
}

export default Venues