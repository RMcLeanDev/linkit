import React from 'react'
import DevicesPlus7 from './DevicesPlus7';
import DevicesFullList from './DevicesFullList';

function DevicesMain(props){
    return(
        <div className="devicesMain">
            <DevicesPlus7 devices={props.devices}/>
            <DevicesFullList devices={props.devices}/>
        </div>
    )
}

export default DevicesMain;