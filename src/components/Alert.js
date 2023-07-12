import React, { useContext } from 'react'
import NoteContext from '../context/Notes/notecontext'
const Alert = () => {
  //context api
  const context = useContext(NoteContext)
  const {alert} = context
  return (
    <div>
      {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show `} role="alert">
        <strong>{alert.type}</strong>:{alert.msg}
      </div>}
    </div>
  )
}

export default Alert
