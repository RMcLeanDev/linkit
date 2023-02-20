import React, {useState} from 'react';
import LogoutConfirmation from './LogoutConfirmation';
import { useNavigate } from 'react-router-dom';
import {FiBookOpen} from 'react-icons/fi';
import {GiExitDoor} from 'react-icons/gi';
import {AiOutlineQuestionCircle} from 'react-icons/ai';


function MobileFooter(){

    const [logoutConfirmationScreen, setLogoutConfirmationScreen] = useState(false);
    const navigate = useNavigate();

    return(
        <div className="mobileFooter">
            {logoutConfirmationScreen ? <LogoutConfirmation closeWindow={() => setLogoutConfirmationScreen(false)} />: null}
            <div className="footerOption" onClick={() => navigate('/')}>
                <img className="footerLogo" src={require('../assets/logoNoText.png')}/>
            </div>
            <div className="footerOption" onClick={() => navigate('/venues')}>
                <FiBookOpen size={25}/>
                <p>Venues</p>
            </div>
            <div className="footerOption" onClick={() => navigate('/supportRequest')}>
                <AiOutlineQuestionCircle size={25}/>
                <p>Support</p>
            </div>
            <div className="footerOption" onClick={() => setLogoutConfirmationScreen(true)}>
                <GiExitDoor size={25}/>
                <p>Logout</p>
            </div>
        </div>
    )
}

export default MobileFooter;