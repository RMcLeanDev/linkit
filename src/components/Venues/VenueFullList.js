import React, {useState} from 'react';
import moment from 'moment';
import {IoIosArrowDropdown, IoIosArrowDropup, IoIosArrowDropdownCircle, IoIosArrowDropupCircle} from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function VenueFullList(props){

    const [search, setSearch] = useState("")
    const [selectSort, setSelectSort] = useState({name: true, ascend: true})
    const navigate = useNavigate();
    let venueSort;

    if(props.venues){
        if(selectSort.name){
            if(selectSort.ascend){
                venueSort = Object.entries(props.venues).sort((a,b) => {
                    let id1 = a[1]["venueName"]
                    let id2 = b[1]["venueName"]
                    if(id1<id2){
                        return -1
                    } else if (id1>id2){
                        return 1
                    } else {
                        return 0
                    }
                })
            } else {
                venueSort = Object.entries(props.venues).sort((a,b) => {
                    let id1 = a[1]["venueName"]
                    let id2 = b[1]["venueName"]
                    if(id1>id2){
                        return -1
                    } else if (id1<id2){
                        return 1
                    } else {
                        return 0
                    }
                })
            }
        } else {

        }
    }

    let venueSortArray = [];

    if(venueSort){
        Object.keys(venueSort).map((items) => {
            let venue = venueSort[items][1]
            if(venue.venueName.toLowerCase().includes(search)){
                return venueSortArray.push(venue)
            }
        })
    }

    return(
        <div>
            <button onClick={props.addVenue}>Add Venue</button>
            <div className="deviceFullContainer">
            {venueSort !== false? 
            <div>
                <div className="deviceFullHeader">
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"/>
                </div>
                <p>{venueSortArray.length > 0 ? venueSortArray.length === 1 ? `Displaying: ${venueSortArray.length} result`: `Displaying: ${venueSortArray.length} results`: "No Results Found"}</p>
                <div className="venueFullSearchSettings">
                    <div onClick={() => setSelectSort({name: true, ascend: !selectSort.ascend})} style={{marginLeft: "25px"}}>
                        <p>Name</p>
                        {selectSort.name ? selectSort.ascend ? <IoIosArrowDropdownCircle size={28}/> : <IoIosArrowDropupCircle size={28}/> : <IoIosArrowDropdown size={28}/>}
                    </div>
                    <div onClick={() => setSelectSort({name: true, ascend: !selectSort.ascend})} style={{justifySelf:"center"}}>
                        <p>Online Devices</p>
                    </div>
                    <div onClick={() => setSelectSort({name: true, ascend: !selectSort.ascend})} style={{justifySelf:"center"}}>
                        <p>Contract End</p>
                        {selectSort.name ? selectSort.ascend ? <IoIosArrowDropdownCircle size={28}/> : <IoIosArrowDropupCircle size={28}/> : <IoIosArrowDropdown size={28}/>}
                    </div> 
                    <div onClick={() => setSelectSort({name: true, ascend: !selectSort.ascend})} style={{justifySelf:"end", marginRight:"25px"}}>
                        <p>Total Sponsors</p>
                    </div> 
                </div>
                {Object.keys(venueSortArray).map((venues) => {
                    let venue = venueSortArray[venues]
                    let totalDevices = 0;
                    let totalOnline = 0;
                    let timeLeft;
                    if(venue.liveDate && venue.endDate){
                        let time = Math.ceil(Math.abs(new Date(venue.endDate) - new Date(Date.now())) / (1000 * 60 * 60 * 24))
                        if(time > 31){
                            timeLeft = Math.round(time / 365 * 12) + " Months"
                        } else {
                            timeLeft = time + " Days"
                        }
                    }
                    if(venue.devices){
                        Object.keys(venue.devices).map((devices) => {
                            if(props.devices[devices]){
                                totalDevices += 1;
                                if(Math.round((Date.now() - props.devices[devices].lastHeartBeat) / (1000 * 60 * 60 * 24))<= 3){
                                    totalOnline += 1
                                }
                            }
                        })
                    }
                    return <div className="venueFullVenueList">
                        <span style={{width: "10px", height: "10px", backgroundColor:`${venue.online ? "green" : "red"}`, margin:"auto", borderRadius:"10px", marginLeft: "5px"}}/>
                        <p style={{cursor: "pointer"}} className="deviceName" onClick={() => navigate(`/venues/${venue.id}`)}>{venue.venueName}</p>
                        {venue.devices ? <p>{totalOnline}/{totalDevices}</p>:<p>"No Devices Assigned"</p>}
                        {venue.liveDate ? <p>{timeLeft}</p>:<p>No Live Date Set</p>}
                    </div>
                })}
            </div>
            : "loading" }
        </div>
        </div>
    )
}

export default VenueFullList