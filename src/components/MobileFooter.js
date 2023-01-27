import React from 'react';

function MobileFooter(){
    return(
        <div className="mobileFooter">
            <h1>logo</h1>
            <div className="footerOption">
                <img className="supportIcon" src={require('../assets/supportIcon.png')}/>
                <p>Support</p>
            </div>
        </div>
    )
}

export default MobileFooter;