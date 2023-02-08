import React, {useState} from 'react';
import LogoutConfirmation from './LogoutConfirmation';
import { useNavigate } from 'react-router-dom';

function MobileFooter(){

    const [logoutConfirmationScreen, setLogoutConfirmationScreen] = useState(false);
    const navigate = useNavigate();

    return(
        <div className="mobileFooter">
            {logoutConfirmationScreen ? <LogoutConfirmation closeWindow={() => setLogoutConfirmationScreen(false)} />: null}
            <div className="footerOption" onClick={() => navigate('/')}>
                <img className="footerLogo" src={require('../assets/logoNoText.png')}/>
            </div>
            <div className="footerOption" onClick={() => navigate('/supportRequest')}>
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