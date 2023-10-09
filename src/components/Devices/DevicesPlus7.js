import React from 'react';
import moment from 'moment';

function DevicesPlus7(props){

    let obj = {"plus30": 0, "plus15": 0, "online": 0, total: 0}

    Object.keys(props.devices).map(devices => {
        let device = props.devices[devices]
        let date = Math.round((Date.now() - device.lastHeartBeat) / (1000 * 60 * 60 * 24))
        if(device.UUID){
            if(date > 31){
                obj["plus30"] += 1
            } else if (date >=3 && date < 32){
                obj["plus15"] += 1;
            } else {
                obj["online"] += 1;
            }
            obj["total"] += 1;
        }
    })

    return(
        <div>
            {props.devices ? 
            <div className="devicePlus">
                <div className="devicePlusItem" onClick={() => props.filterDate({start: 0, end: 9999})}>
                    <p>Total Devices</p>
                    {obj.total}
                </div>
                <div className="devicePlusItem" onClick={() => props.filterDate({start: 0, end: 3})}> 
                    <p>Devices Online</p>
                    {obj.online}
                </div>
                <div className="devicePlusItem" onClick={() => props.filterDate({start: 3, end: 32})}> 
                    <p>Devices offline 3-31 Days</p>
                    {obj.plus15}
                </div>
                <div className="devicePlusItem" onClick={() => props.filterDate({start: 32, end: 9999})}> 
                    <p>Devices Offline +30 days</p>
                    {obj.plus30}
                </div>
            </div> 
            : <h1>loading</h1>}
        </div>
    )
}

export default DevicesPlus7;