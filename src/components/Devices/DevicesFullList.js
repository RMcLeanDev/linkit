import react, {useState} from 'react';
import moment from 'moment';
import {FiSettings} from 'react-icons/fi'
import {IoIosArrowDropdown, IoIosArrowDropup, IoIosArrowDropdownCircle, IoIosArrowDropupCircle} from 'react-icons/io';
import AssignDeviceToVenue from './AssignDeviceToVenue';

function DevicesFullList(props){

    const [search, setSearch] = useState("")
    const [selectSort, setSelectSort] = useState({name: true, ascend: true})
    const [assignDevice, setAssignDevice] = useState(false);

    let deviceSort;

    if(props.devices){
        if(selectSort.name){
            if(selectSort.ascend){
                deviceSort = Object.entries(props.devices).sort((a,b) => {
                    let id1 = a[1]["deviceName"]
                    let id2 = b[1]["deviceName"]
                    if(id1<id2){
                        return -1
                    } else if (id1>id2){
                        return 1
                    } else {
                        return 0
                    }
                })
            } else {
                deviceSort = Object.entries(props.devices).sort((a,b) => {
                    let id1 = a[1]["deviceName"]
                    let id2 = b[1]["deviceName"]
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
            if(selectSort.ascend){
                deviceSort = Object.entries(props.devices).sort((a,b) => {
                    let id1 = a[1]["lastHeartBeat"]
                    let id2 = b[1]["lastHeartBeat"]
                    if(id1<id2){
                        return -1
                    } else if (id1>id2){
                        return 1
                    } else {
                        return 0
                    }
                })
            } else {
                deviceSort = Object.entries(props.devices).sort((a,b) => {
                    let id1 = a[1]["lastHeartBeat"]
                    let id2 = b[1]["lastHeartBeat"]
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

    let deviceSortArry = [];

    if(deviceSort){
        Object.keys(deviceSort).map((items) => {
            let device = deviceSort[items][1]
            if(device.deviceName && device.deviceName.toLowerCase().includes(search) && Math.round((Date.now() - device.lastHeartBeat) / (1000 * 60 * 60 * 24)) >= props.filterDate.start && Math.round((Date.now() - device.lastHeartBeat) / (1000 * 60 * 60 * 24)) < props.filterDate.end){
                return deviceSortArry.push(device)
            }
        })
    }

    return(
        <div className="deviceFullContainer">
            {assignDevice ? <AssignDeviceToVenue options={props.options} deviceUUID={assignDevice} devices={props.devices} close={() => setAssignDevice(false)}/> : null}
            {deviceSort !== false ? 
            <div>
                <div className="deviceFullHeader">
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"/>
                </div>
                <p>{deviceSortArry.length > 0 ? deviceSortArry.length === 1 ? `Displaying: ${deviceSortArry.length} result`: `Displaying: ${deviceSortArry.length} results`: "No Results Found"}</p>
                <div className="deviceFullSearchSettings">
                    <div onClick={() => setSelectSort({name: true, ascend: !selectSort.ascend})} style={{marginLeft: "25px"}}>
                        <p>Name</p>
                        {selectSort.name ? selectSort.ascend ? <IoIosArrowDropdownCircle size={28}/> : <IoIosArrowDropupCircle size={28}/> : <IoIosArrowDropdown size={28}/>}
                    </div>
                    <div onClick={() => setSelectSort({name: false, ascend: !selectSort.ascend})} style={{justifySelf:"end", marginRight: "25px"}}>
                        <p>Last Heart Beat</p>
                        {selectSort.name === false ? selectSort.ascend ? <IoIosArrowDropdownCircle size={28}/> : <IoIosArrowDropupCircle size={28}/> : <IoIosArrowDropdown size={28}/>}
                    </div>
                </div>
                {Object.keys(deviceSortArry).map((devices) => {
                    let device = deviceSortArry[devices]
                    return <div className="displayFullDeviceList">
                        <p className="deviceName">{device.deviceName}</p>
                        <p className="deviceHeart">{moment(device.lastHeartBeat).fromNow()}</p>
                        {device.assigned ? null:<button onClick={() => setAssignDevice(device.UUID)}>assign</button>}
                    </div>
                })}
            </div>
            : "loading" }
        </div>
    )
}

export default DevicesFullList;