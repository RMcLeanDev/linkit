import React from "react";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function Alerts(props){
    
    let alertSort;
    const navigate = useNavigate();

    if(props.changeLog.changeLog){
        alertSort = Object.entries(props.changeLog.changeLog).sort((a,b) => {
            let id1 = a[parseInt(0)]
            let id2 = b[parseInt(0)]
            if(id1>id2){
                return -1
            } else if (id1<id2){
                return 1
            } else {
                return 0
            }
        })
    }
    
    return(
        <div className="alertComponent">
            <p className="alertCloseButton" onClick={props.closeAlerts}>X</p>
            <div className="alertContainer">
                <h1>Recent Changes</h1>
                <hr/>
                <div className="recentChangeMessages">
                    {Object.keys(alertSort).map((items) => {
                        let item = alertSort[items][1];
                        let account;
                        if(item.venueSponsor === "venue"){
                            account = <span style ={{fontWeight: "bold", cursor: "pointer"}} onClick={() => navigate(`/venues/${item.account}`)}>{props.changeLog.venues[item.account].venueName}</span>
                        } else {
                            account = "coming soon"
                        }
                        return <div className="changeItems">
                            <p><span style ={{fontWeight: "bold"}}>{props.changeLog.users[item.user].name}</span> {item.type} to {account} <br/> on: {moment(item.dateSubmited).format("MMMM Do YYYY, h:mm a")}</p>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Alerts;