import React, { useState } from 'react';
import LogoutConfirmation from './LogoutConfirmation';
import { useNavigate } from 'react-router-dom';
import { FiBookOpen } from 'react-icons/fi';
import { GiExitDoor } from 'react-icons/gi';
import { GrDevice } from 'react-icons/gr';
import { GiNotebook } from 'react-icons/gi';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { MdPlaylistPlay } from 'react-icons/md'; // Playlist icon
import Alerts from './Alerts';

function MobileFooter(props) {
    const [alertComponent, setAlertComponent] = useState(true);
    const [logoutConfirmationScreen, setLogoutConfirmationScreen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="mobileFooter">
            <div style={{ position: "fixed", top: "10px", right: "5px" }}>
                <GiNotebook
                    size={35}
                    style={{ position: "relative", cursor: "pointer" }}
                    onClick={() => setAlertComponent(true)}
                />
                {alertComponent ? (
                    <Alerts
                        changeLog={props.changeLog}
                        closeAlerts={() => setAlertComponent(false)}
                    />
                ) : null}
            </div>
            {logoutConfirmationScreen ? (
                <LogoutConfirmation
                    closeWindow={() => setLogoutConfirmationScreen(false)}
                />
            ) : null}
            <div className="footerOption" onClick={() => navigate('/')}>
                <img
                    className="footerLogo"
                    src={require('../assets/logoNoText.png')}
                    alt="Home"
                />
            </div>
            <div className="footerOption" onClick={() => navigate('/devices')}>
                <GrDevice size={25} />
                <p>Devices</p>
            </div>
            <div className="footerOption" onClick={() => navigate('/venues')}>
                <FiBookOpen size={25} />
                <p>Venues</p>
            </div>
            <div className="footerOption" onClick={() => navigate('/playlist')}>
                <MdPlaylistPlay size={25} />
                <p>Playlist</p>
            </div>
            <div
                className="footerOption"
                onClick={() => navigate('/supportRequest')}
            >
                <AiOutlineQuestionCircle size={25} />
                <p>Support</p>
            </div>
            <div
                className="footerOption"
                onClick={() => setLogoutConfirmationScreen(true)}
            >
                <GiExitDoor size={25} />
                <p>Logout</p>
            </div>
        </div>
    );
}

export default MobileFooter;
