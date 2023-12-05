import React, {useState} from 'react';
import Select from 'react-select';

function AssignDeviceToVenue(props){
    
    const[venueValue, setVenueValue] = useState(null);

    console.log(venueValue)

    return(
        <div>
            <Select options={props.options} onChange={(e) => setVenueValue(e.value)}/>
            <button onClick={props.close}>Cancel</button>
        </div>
    )
}

export default AssignDeviceToVenue;