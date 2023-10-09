import React, {useState} from 'react'
import DevicesPlus7 from './DevicesPlus7';
import DevicesFullList from './DevicesFullList';

function DevicesMain(props){

    const [filterDate, setFilterDate] = useState({start: 0, end: 999})

    return(
        <div className="devicesMain">
            <DevicesPlus7 devices={props.devices} filterDate={(dates) => setFilterDate({start: dates.start, end: dates.end})}/>
            <DevicesFullList devices={props.devices} filterDate={filterDate}/>
        </div>
    )
}

export default DevicesMain;