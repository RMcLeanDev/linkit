import React from 'react'

function SupportRequest(){
    return(
        <div className="supportRequestContainer">
            <h1>Current Requests:</h1>
            <div className="ticketsContainer">
            <i class="fa-solid fa-plus addNewTicket"></i>
                <div className="currentTickets">
                    <div className="supportItem">
                        <p>name</p>
                        <p>severity</p>
                        <p>status</p>
                    </div>
                    <div className="supportItem">
                        <p>Ryan</p>
                        <p>low</p>
                        <p>ongoing</p>
                    </div>
                    <div className="supportItem">
                        <p>Ryan</p>
                        <p>low</p>
                        <p>ongoing</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SupportRequest;