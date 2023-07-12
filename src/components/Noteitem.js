import React,{useContext} from 'react'
import NoteContext from '../context/Notes/notecontext'

const Noteitem = (props) => {
    const context = useContext(NoteContext)
    const { note ,updatenote} = props
    const { deleteNote,showAlert } = context
    //delete the note 
    const deleteNotes = ()=>
    {
        deleteNote(note._id)
        showAlert("Note Successfully Deleted" , "success")
    }
    return (

        //generate notes block

        <div className="col-md-3" key={note._id} >
            <div className="card my-3" >
                <div className="card-body">
                    <div className='d-flex align-item-center'><h5 className="card-title">{note.title}</h5>
                        <i className="fa-sharp fa-solid fa-trash my-1 mx-3" onClick={deleteNotes}></i>
                        <i className="fa fa-edit my-1 mx-2" onClick={()=>{updatenote(note)}}></i></div>
                    <p className="card-text"> {note.decription}</p>
                </div>
                <div className='card-body'>{note.tag} &nbsp;  {note.Date} </div>
            </div>
        </div>
    )
}

export default Noteitem
