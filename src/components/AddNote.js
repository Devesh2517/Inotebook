import React, { useContext, useState } from 'react'
import NoteContext from '../context/Notes/notecontext'

const AddNote = () => {

    //context api
    const context = useContext(NoteContext)
    const { addNote,showAlert } = context

    //note state initialy empty
    const [note, setNote] = useState({ "title": "", "decription": "", "tag": "" })

    //onclick function for adding notes in backend and also in front end
    const noteadd = (e) => {
        e.preventDefault();
        addNote(note.title, note.decription, note.tag)
        showAlert("Notes successfully added","success")
        setNote({ "title": "", "decription": "", "tag": "" })
    }
    
    //adding the value of all element in the note state

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className='container my-3'>
                <h2>Add note</h2>
                <form className='my-3' style={{ maxWidth: "300px" }}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" minLength={5} required className="form-control" value={note.title} id="title" name='title' onChange={onchange} aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="decription" className="form-label">Decription</label>
                        <input type="text" minLength={5} required onChange={onchange} className="form-control" name='decription' value={note.decription} id="decription" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" onChange={onchange} className="form-control" name='tag' value={note.tag} id="tag" />
                    </div>

                    <button disabled={note.title.length < 5 || note.decription.length < 5 ? true : false} type="submit" className="btn btn-primary" onClick={noteadd}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
