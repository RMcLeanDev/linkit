import React, {useState} from 'react';
import LogoutConfirmation from './LogoutConfirmation';

function MobileFooter(){

    const [logoutConfirmationScreen, setLogoutConfirmationScreen] = useState(false);

    function closeWindow(){
        setLogoutConfirmationScreen(false);
    }

    return(
        <div className="mobileFooter">
            {logoutConfirmationScreen ? <LogoutConfirmation closeWindow={closeWindow}/>: null}
            <h1>logo</h1>
            <div className="footerOption">
                <i class="fa-regular fa-circle-question"></i>
                <p>Support</p>
            </div>
            <div className="footerOption" onClick={() => setLogoutConfirmationScreen(true)}>
                <i class="fa-sharp fa-solid fa-arrow-right-from-bracket"></i>
                <p>Logout</p>
            </div>
        </div>
    )
}

export default MobileFooter;