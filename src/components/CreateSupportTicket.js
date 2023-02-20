import React from 'react'

function CreateSupportTicket(props){

    function submitNewTicket(e){
        e.preventDefault();
    }

    return(
        <div className="formContainer">
            <form onSubmit={submitNewTicket} className="formBox">
                <i class="fa-solid fa-x close" onClick={props.closeWindow} />
                <h1>Create support ticket</h1>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default CreateSupportTicket;