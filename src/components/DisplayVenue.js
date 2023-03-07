import react from 'react';
import {useParams, useNavigate} from 'react-router-dom';

function DisplayVenue(props){

    const navigate = useNavigate();
    const {id} = useParams();

    return(
        <div>
            <h1>displaying venue here</h1>
            <button onClick={() => navigate("/venues")}>go back</button>
        </div>
    )
}

export default DisplayVenue;