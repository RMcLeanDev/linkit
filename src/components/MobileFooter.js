import React, { useState } from "react";
import LogoutConfirmation from "./LogoutConfirmation";
import { useNavigate } from "react-router-dom";
import { FiBookOpen } from "react-icons/fi";
import { GiExitDoor } from "react-icons/gi";
import { GrDevice } from "react-icons/gr";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdTv } from "react-icons/md"; // Icon for Screens tab
import { BsMusicNoteList } from "react-icons/bs"; // Icon for Playlist tab
import Alerts from "./Alerts";

function MobileFooter(props) {
  const [alertComponent, setAlertComponent] = useState(true);
  const [logoutConfirmationScreen, setLogoutConfirmationScreen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="mobileFooter">
      <div style={{ position: "fixed", top: "10px", right: "5px" }}>
        {alertComponent ? (
          <Alerts
            changeLog={props.changeLog}
            closeAlerts={() => setAlertComponent(false)}
          />
        ) : null}
      </div>
      {logoutConfirmationScreen ? (
        <LogoutConfirmation closeWindow={() => setLogoutConfirmationScreen(false)} />
      ) : null}
      <div className="footerOption" onClick={() => navigate("/")}>
        <img className="footerLogo" src={require("../assets/logoNoText.png")} />
      </div>
      <div className="footerOption" onClick={() => navigate("/devices")}>
        <GrDevice size={25} />
        <p>Devices</p>
      </div>
      <div className="footerOption" onClick={() => navigate("/venues")}>
        <FiBookOpen size={25} />
        <p>Venues</p>
      </div>
      <div className="footerOption" onClick={() => navigate("/playlists")}>
        <BsMusicNoteList size={25} />
        <p>Playlist</p>
      </div>
      <div className="footerOption" onClick={() => navigate("/screens")}>
        <MdTv size={25} />
        <p>Screens</p>
      </div>
      <div className="footerOption" onClick={() => navigate("/supportRequest")}>
        <AiOutlineQuestionCircle size={25} />
        <p>Support</p>
      </div>
      <div className="footerOption" onClick={() => setLogoutConfirmationScreen(true)}>
        <GiExitDoor size={25} />
        <p>Logout</p>
      </div>
    </div>
  );
}

export default MobileFooter;
