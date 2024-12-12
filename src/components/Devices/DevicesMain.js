import React, {useState} from 'react'
import DevicesPlus7 from './DevicesPlus7';
import DevicesFullList from './DevicesFullList';
import { connect } from "react-redux";


function DevicesMain({devices}){

    const [filterDate, setFilterDate] = useState({start: 0, end: 999})
    console.log(devices)
    let venueSort;
    let options = []
    // if(devices){
    //     venueSort = Object.entries(devices).sort((a,b) => {
    //         let id1 = a[1]["venueName"]
    //         let id2 = b[1]["venueName"]
    //         if(id1<id2){
    //             return -1
    //         } else if (id1>id2){
    //             return 1
    //         } else {
    //             return 0
    //         }
    //     })
    // }

    // for(let i = 0; i<venueSort.length; i++){
    //     options.push({value: venueSort[i][1].id, label: venueSort[i][1].venueName})
    // }

    return(
        <div className="devicesMain">
            {devices ? <div>
                <DevicesPlus7 devices={devices} filterDate={(dates) => setFilterDate({start: dates.start, end: dates.end})}/>
            <DevicesFullList devices={devices} filterDate={filterDate} options={options} user={"test"}/>
                </div> : "loading"}
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    devices: state.devices,
  });
  
  export default connect(mapStateToProps)(DevicesMain);