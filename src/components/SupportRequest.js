import React, {useState} from 'react'
import CreateSupportTicket from './CreateSupportTicket';

function SupportRequest(){

    const [ticketForm, setTicketForm] = useState(false);

    return(
        <div className="supportRequestContainer">
            {ticketForm ? <CreateSupportTicket closeWindow={() => setTicketForm(false)}/>:null}
            <h1>Current Requests:</h1>
            <div className="ticketsContainer">
                <i className="fa-solid fa-plus addNewTicketButton" onClick={() => setTicketForm(true)}/>
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