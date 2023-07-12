import React, { useState } from "react";
import NoteContext from "./notecontext";

const NoteState = (props) => {
  const host = "http://localhost:5000"

  const noteInitial = []

  //creating state
  const [notes, setNotes] = useState(noteInitial)


  //get notes note
  const Getnote = async () => {
    //Api Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":authtoken.authtoken
       "auth-token": localStorage.getItem('token')
      }

    });
    const json = await response.json()
    setNotes(json)
  }

  //add new note
  const addNote = async (title, decription, tag) => {

    //Api Call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },

      body: JSON.stringify({ title, decription, tag })
    });
    const note = await response.json()
    setNotes(notes.concat(note))



  }




  //delete  note
  const deleteNote = async (id) => {
    //Api call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }

    });

    //delete notes on client side
    const NewNote = notes.filter((note) => { return note._id !== id })
    setNotes(NewNote)
  }


  //update note
  const editNote = async (id, title, decription, tag) => {
    //by api call for backend
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, decription, tag })
    });
    const json = await response.json()

    //create a copy of note for updating on client side
    let newNote = JSON.parse(JSON.stringify(notes))

    //from client side 
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        element.title = title
        element.decription = decription
        element.tag = tag

        break;
      }

    }
    //update notes after updating the value by using id of note
    setNotes(newNote)
  }

  //for change the alert message and type 
  const [alert, setAlert] = useState(null)
  //change the value of alert
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }

  return (

    //creating context api and pass value as state and function or etc..
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, Getnote,showAlert ,alert}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
















//how to create context api data and how to pass it

// const s1 = {"name":"devesh","class":"A1"}
// const [State,setState] = useState(s1)
// const update = ()=>{
//     setTimeout(() => {
//         setState({"name":"suraj","class":"A5"})
//     }, 1000);
// }