import React, {useState} from 'react';
import Select from 'react-select';

function AssignDeviceToVenue(props){
    
    console.log(props)
    const[venueValue, setVenueValue] = useState(null);

    return(
        <div>
            <Select options={props.options} onChange={(e) => console.log(e)}/>
            <button onClick={props.close}>Cancel</button>
        </div>
    )
}

export default AssignDeviceToVenue;