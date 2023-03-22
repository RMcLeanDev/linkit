import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function SortVenues(props){

    let sorted = false;
    const navigate =  useNavigate();

    if(props.venues){
        if(props.sortSettings.name === "name"){
            if(props.sortSettings.ascending){
                sorted = Object.entries(props.venues).sort((a,b) => {
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
                sorted = Object.entries(props.venues).sort((a,b) => {
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
        } else if(props.sortSettings.name === "status"){
            if(props.sortSettings.ascending){
                sorted = Object.entries(props.venues).sort((a,b) => {
                    let id1 = a[1]["status"]
                    let id2 = b[1]["status"]
                    if(id1<id2){
                        return -1
                    } else if (id1>id2){
                        return 1
                    } else {
                        return 0
                    }
                })
            } else {
                sorted = Object.entries(props.venues).sort((a,b) => {
                    let id1 = a[1]["status"]
                    let id2 = b[1]["status"]
                    if(id1>id2){
                        return -1
                    } else if (id1<id2){
                        return 1
                    } else {
                        return 0
                    }
                })
            }
        }
    }

    let newarry = [];

    if(sorted){
        Object.keys(sorted).map((items) => {
            let venue = sorted[items]
            if(venue[1].venueName.toLowerCase().includes(props.search) || venue[1].status.includes(props.search) || venue[1].online.toString() === props.search){
                return newarry.push(venue)
            }
        })
    }

    return(
        <div className="mobileSortVenuesContainer">
            {props.venues ? Object.keys(newarry).map(venues => {
                    let venue = newarry[venues]
                    return(
                        <div key={venues} className="mobileSortVenues pcSortVenues">
                            <p style={{width: "10px", height: "10px", backgroundColor: venue[1].online ? "limegreen":"red", borderRadius:"10px", alignSelf: "center", marginLeft:"3px"}}></p>
                            <p onClick={() => navigate(`${venue[1].id}`)} style={{cursor: "pointer"}}>{venue[1].venueName}</p>
                            <p className="venueMobile">{venue[1].contactNumber}</p>
                            <p>{venue[1].status}</p>
                        </div>
                    )
                }) : "loading..."}
                <p>{newarry.length > 0 ? `Displaying: ${newarry.length} venues`: "No Results Found"}</p>
        </div>
    )
}

export default SortVenues;