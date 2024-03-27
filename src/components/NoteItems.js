import React, {useState} from 'react';
import firebase from 'firebase/compat/app';
import {connect} from 'react-redux';
import moment from 'moment';
import "firebase/compat/auth";
import "firebase/compat/database";

function NoteItems(props){

    const [noteForm, setNoteForm] = useState(false);
    const [textArea, setTextArea] = useState('')
    let sorted;

    function submitNote(){
        if(textArea !== ""){
            let obj = {[Date.now()]: {userSubmited: firebase.auth().currentUser.uid, dateSubmited: Date.now(), note: textArea}};
            if(props.info.venueName){
                firebase.database().ref(`venues/${props.info.id}/notes`).update(obj)
            } else {
                console.log("no")
            }
        }
    }

    if(props.info.notes){
        sorted = Object.entries(props.info.notes).sort((a,b) => {
            let id1 = a[1]["dateSubmited"]
            let id2 = b[1]["dateSubmited"]
            if(id1<id2){
                return 1
            } else if (id1>id2){
                return -1
            } else {
                return 0
            }
        })
    }

    return(
        <div className="notesContainer">
            <h1>Notes</h1>
            <button className="newNote" onClick={() => setNoteForm(!noteForm)}>New Note +</button>
            <hr/>
            {noteForm ? <div className={noteForm ? "showGeneral":"hideGeneral"}>
                <textarea style={{width: "99%", height: "100px"}} value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
                <button onClick={submitNote}>Submit</button>
            </div>:null}
            {props.info.notes ? Object.keys(sorted).map((notes) => {
                let note = sorted[notes][1];
                return <div style={{borderBottom: "1px solid lightgray"}} className="notes">
                    <p style={{fontSize: "20px"}}>{note.note}</p>
                    <div style={{display: "flex", width: "90%", justifyContent:"space-between", margin: "auto", marginTop:"5px"}}>
                        <p style={{fontSize: "15px"}}>Date Added: {moment(new Date(note.dateSubmited).toString()).format("MMM Do YYYY, h:mm a")}</p>
                        <p>Submited By: {props.db.users[note.userSubmited]}</p>
                    </div>
                </div>
            }):"No Notes have been created"}
        </div>
    )
}

const mapStateToProps = state => ({
    db: state.dbState
  })

export default connect(mapStateToProps)(NoteItems);