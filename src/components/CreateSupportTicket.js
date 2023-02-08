import React from 'react'

function CreateSupportTicket(){

    function submitNewTicket(e){
        e.preventDefault();
    }

    return(
        <div className="createTicketContainer">
            <form onSubmit={submitNewTicket} className="createTicketInfo">
                <i class="fa-solid fa-x close"></i>
                <h1>Create support ticket</h1>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default CreateSupportTicket;