import React from 'react';
import moment from 'moment';

function DevicesPlus7(props){

    let obj = {"plus30": 0, "plus15": 0, "online": 0}

    Object.keys(props.devices).map(devices => {
        let device = props.devices[devices]
        let date = Math.ceil(moment(device.lastHeartBeat).diff(moment(Date.now())) / (1000 * 3600 * 24))
        if(device.UUID){
            if(date < -32){
                obj["plus30"] += 1
            } else if (date <= -2 && date >= -31){
                obj["plus15"] += 1;
            } else {
                obj["online"] += 1;
            }
        }
    })

    return(
        <div>
            {props.devices ? 
            <div className="devicePlus">
                <div className="devicePlusItem"> 
                    <p>Devices Online</p>
                    {obj.online}
                </div>
                <div className="devicePlusItem"> 
                    <p>Devices offline 3-30 Days</p>
                    {obj.plus15}
                </div>
                <div className="devicePlusItem"> 
                    <p>Devices Offline +30 days</p>
                    {obj.plus30}
                </div>
            </div> 
            : <h1>loading</h1>}
        </div>
    )
}

export default DevicesPlus7;