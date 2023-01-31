import React from 'react';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import { useNavigate } from 'react-router-dom';

function LogoutConfirmation(props){

    const navigate = useNavigate();
    function signout(){
        firebase.auth().signOut();
        navigate('/')
    }
    return(
        <div className="logoutConfirmation">
            <div className="logoutConfirmationContainer">
                <p>Please confirm you want to sign out.</p>
                <hr/>
                <button className="logout" onClick={signout}>Logout</button>
                <br/>
                <button onClick={props.closeWindow}>Cancel</button>
            </div>
        </div>
    )
}

export default LogoutConfirmation;