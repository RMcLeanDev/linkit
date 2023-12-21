import React from 'react';

function NoteItems(props){

    console.log(props)
    return(
        <div className="notesContainer">
            <h1>Notes</h1>
            <button>New Note +</button>
            <hr/>
            {props.info.notes ? <div>
                <p>hhello</p>
            </div>:"No Notes have been created"}
        </div>
    )
}

export default NoteItems;