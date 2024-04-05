import React, {useState} from 'react';
import moment from 'moment';
import {IoIosArrowDropdown, IoIosArrowDropup, IoIosArrowDropdownCircle, IoIosArrowDropupCircle} from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import "firebase/compat/database";

function VenueFullList(props){

    const [search, setSearch] = useState("")
    const [selectSort, setSelectSort] = useState({name: true, ascend: true})
    const [contractEndFilter, setContractEndFilter] = useState(true);
    const [liveFilter, setLiveFilter] = useState(true)
    const [onboardingFilter, setOnboardingFilter] = useState(true);
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

    let venueSortArray = {};

    if(venueSort){
        Object.keys(venueSort).map((items) => {
            let venue = venueSort[items][1]
            if (venue.venueName.toLowerCase().includes(search)){
                if(liveFilter){
                    if(venue.status === "live"){
                        venueSortArray[venue.id] = venue
                    }
                } else {
                    if(venue.status === "live"){
                        delete venueSortArray[venue.id]
                    }
                }
                if(contractEndFilter){
                    if(venue.status === "contractEnded"){
                        venueSortArray[venue.id] = venue
                    }
                } else {
                    if(venue.status === "contractEnded"){
                        delete venueSortArray[venue.id]
                    }
                }
                if(onboardingFilter){
                    if(venue.status === "new"){
                        venueSortArray[venue.id] = venue
                    }
                } else {
                    if(venue.status === "new"){
                        delete venueSortArray[venue.id]
                    }
                }
            }
        })
    }

    let length = Object.keys(venueSortArray).length

    return(
        <div>
            <button onClick={props.addVenue}>Add Venue</button>
            <div className="deviceFullContainer">
            <div>
                <input type="checkbox" value={liveFilter} checked={liveFilter} onChange={() => setLiveFilter(!liveFilter)}/>
                <label>Live</label>
                <input type="checkbox" checked={contractEndFilter} value={contractEndFilter} onChange={() => setContractEndFilter(!contractEndFilter)}/>
                <label>Contracts Ended</label>
                <input type="checkbox" value={onboardingFilter} checked={onboardingFilter} onChange={() => setOnboardingFilter(!onboardingFilter)}/>
                <label>Onboarding</label>
            </div>
            {venueSort !== false? 
            <div>
                <div className="deviceFullHeader">
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"/>
                </div>
                <p>{length > 0 ? Object.entries(venueSortArray).length === 1 ? `Displaying: ${length} result`: `Displaying: ${length} results`: "No Results Found"}</p>
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
                    let lastNote;
                    if(venue.liveDate && venue.endDate){
                        if(venue.endDate < Date.now()){
                            timeLeft = "Contract Ended"
                        } else {
                            let time = Math.ceil(Math.abs(new Date(venue.endDate) - new Date(Date.now())) / (1000 * 60 * 60 * 24))
                            if(time > 31){
                                timeLeft = Math.round(time / 365 * 12) + " Months"
                            } else {
                                timeLeft = time + " Days"
                            }
                        }
                    }
                    if(venue.notes){
                        let key = Object.keys(venue.notes)[Object.keys(venue.notes).length-1]
                        lastNote = venue.notes[key].note
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
                    return <div className="venueFullVenueList" style={timeLeft === "Contract Ended" ? {backgroundColor: "red"}: null}>
                        <span style={timeLeft !== "Contract Ended" ? {width: "10px", height: "10px", backgroundColor:`${venue.online ? "green" : "red"}`, margin:"auto", borderRadius:"10px", marginLeft: "5px"}:{width: "0px", height:"0px"}}/>
                        <p style={{cursor: "pointer", textAlign: "left"}} className="deviceName" onClick={() => navigate(`/venues/${venue.id}`)}>{venue.venueName}</p>
                        {venue.devices ? <p>{totalOnline}/{totalDevices}</p>: <p/>}
                        {venue.liveDate ? <p>{timeLeft}</p>:<p/>}
                        <p style={{justifySelf:"flex-end", marginRight:"25px"}}>coming soon</p>
                        <p style={{"width": "81vw"}}>{venue.notes ? <p style={{"padding":"5px 0px", "fontSize": "15px"}}> Recent Note: {lastNote}</p> : null}</p>
                    </div>
                })}
            </div>
            : "loading" }
        </div>
        </div>
    )
}

export default VenueFullList