import React, {useState} from 'react'
import DevicesPlus7 from './DevicesPlus7';
import DevicesFullList from './DevicesFullList';

function DevicesMain(props){

    const [filterDate, setFilterDate] = useState({start: 0, end: 999})

    let venueSort;
    let options = []
    if(props.venues){
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
    }

    for(let i = 0; i<venueSort.length; i++){
        options.push({value: venueSort[i][1].id, label: venueSort[i][1].venueName})
    }

    return(
        <div className="devicesMain">
            <DevicesPlus7 devices={props.devices} filterDate={(dates) => setFilterDate({start: dates.start, end: dates.end})}/>
            <DevicesFullList devices={props.devices} filterDate={filterDate} options={options} user={props.user}/>
        </div>
    )
}

export default DevicesMain;