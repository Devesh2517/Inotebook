import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/Notes/notecontext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'
const Notes = () => {

  //navigator for redirect to the page
  let navigate=useNavigate();
  //creating context using usecontext 

  const context = useContext(NoteContext)
  const { notes, Getnote, editNote ,showAlert} = context

  //take a state of notes initialy blank
  const [note, setNote] = useState({id:"", etitle: "", edecription: "", etag: "" })

  //fetch the notes initialy
  useEffect(() => {
    if(localStorage.getItem("token"))
    {
      Getnote()
    }
    else
    {
     navigate("/login")
    }
    // eslint-disable-next-line 
  }, [])

  //useref for model button
  const ref = useRef(null)

  //for close button
  const refclose = useRef(null)

  //when click the edit icon toggle the model
  const updatenote = (currentNote) => {
    ref.current.click()
    setNote({id:currentNote._id,etitle:currentNote.title,edecription:currentNote.decription,etag:currentNote.tag})
  }


  //update the note in backend and also in front end
  const unote = (e) => {
     editNote(note.id,note.etitle,note.edecription,note.etag)
     showAlert("Notes successfully updated","success")
    refclose.current.click()
}

//change the note state
const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
}
  return (

    <>
      <AddNote />

      <button type="button" ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Notes</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3' style={{ maxWidth: "auto" }}>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" minLength={5} required className="form-control" value={note.etitle} id="etitle" name='etitle' onChange={onchange} aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                  <label htmlFor="edecription" className="form-label">Decription</label>
                  <input type="text" minLength={5} required onChange={onchange} className="form-control" name='edecription' value={note.edecription} id="edecription" />
                </div>

                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" onChange={onchange} className="form-control" name='etag' value={note.etag} id="etag" />
                </div>

               
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 ||note.edecription.length<5?true:false} type="button" className="btn btn-primary" onClick={unote}>Update changes</button>
            </div>
          </div>
        </div>
      </div>

      {/* return the block of notes */}
      <div className="container my-3">
        <h3>Your note</h3>
        <div className="row my-3">
          {notes.map((note) => {
            return <Noteitem key={note._id} updatenote={updatenote} note={note} />
          })}
        </div>
      </div>
    </>
  )
}

export default Notes
