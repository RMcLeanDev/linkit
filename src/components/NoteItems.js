import React, {useState} from 'react';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";

function NoteItems(props){

    const [noteForm, setNoteForm] = useState(true);
    const [textArea, setTextArea] = useState('')
    
    firebase.auth()

    function submitNote(){
        let obj = {[Date.now()]: {userSubmited: firebase.auth().currentUser.uid, dateSubmited: Date.now(), note: textArea}};
        console.log(obj)
        if(props.info.venueName){
            firebase.database().ref(`venues/${props.info.id}/notes`).update(obj)
        } else {
            console.log("no")
        }
    }

    return(
        <div className="notesContainer">
            <h1>Notes</h1>
            <button className="newNote" onClick={() => setNoteForm(!noteForm)}>New Note +</button>
            <hr/>
            {noteForm ? <div className={noteForm ? "showGeneral":"hideGeneral"}>
                <textarea style={{width: "99%", height: "100px"}} value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
                <button onClick={submitNote}>Submit</button>
                <hr/>
            </div>:null}
            {props.info.notes ? <div>
                <p>hhello</p>
            </div>:"No Notes have been created"}
        </div>
    )
}

export default NoteItems;