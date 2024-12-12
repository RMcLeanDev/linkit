import React, { useState } from "react";
import LogoutConfirmation from "./LogoutConfirmation";
import { useNavigate } from "react-router-dom";
import { FiBookOpen } from "react-icons/fi";
import { GiExitDoor } from "react-icons/gi";
import { GrDevice } from "react-icons/gr";
import { SiFiles } from "react-icons/si";
import { BsFillFileSlidesFill } from "react-icons/bs";
import { IoIosTv } from "react-icons/io";
import { MdTv } from "react-icons/md";

function MobileFooter(props) {
  const [logoutConfirmationScreen, setLogoutConfirmationScreen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="mobileFooter">
      {logoutConfirmationScreen ? (
        <LogoutConfirmation closeWindow={() => setLogoutConfirmationScreen(false)} />
      ) : null}
      <div className="footerOption" onClick={() => navigate("/")}>
        <img className="footerLogo" src={require("../assets/logoNoText.png")} />
      </div>
      <div className="footerOption" onClick={() => navigate("/screens")}>
        <IoIosTv size={25} />
        <p>Screens</p>
      </div>
      <div className="footerOption" onClick={() => navigate("/files")}>
        <SiFiles size={25} />
        <p>Files/Assets</p>
      </div>
      <div className="footerOption" onClick={() => navigate("/playlists")}>
        <BsFillFileSlidesFill size={25} />
        <p>Playlist</p>
      </div>
      <div className="footerOption" onClick={() => navigate("/devices")}>
        <GrDevice size={25} />
        <p>Devices</p>
      </div>
      <div className="footerOption" onClick={() => navigate("/venues")}>
        <FiBookOpen size={25} />
        <p>Venues</p>
      </div>
      <div className="footerOption" onClick={() => setLogoutConfirmationScreen(true)}>
        <GiExitDoor size={25} />
        <p>Logout</p>
      </div>
    </div>
  );
}

export default MobileFooter;
