import React, {useState} from 'react';

function SortVenues(props){

    let sorted = false;

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

    return(
        <div className="mobileSortVenuesContainer">
            {props.venues ? Object.keys(sorted).map(venues => {
                    let venue = sorted[venues]
                    return(
                        venue[1].venueName.includes(props.search) || venue[1].status.includes(props.search) ? 
                        <div key={venues} className="mobileSortVenues pcSortVenues">
                            <p>{venue[1].venueName}</p>
                            <p className="venueMobile">{venue[1].contactNumber}</p>
                            <p>{venue[1].status}</p>
                        </div> : null
                    )
                }) : "loading..."}
        </div>
    )
}

export default SortVenues;