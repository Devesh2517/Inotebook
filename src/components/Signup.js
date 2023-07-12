import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from '../context/Notes/notecontext'

const Signup = () => {
 //for alert the context api
 const context = useContext(NoteContext)
 const {showAlert} = context

  //let make a navigator
  let navigate = useNavigate()

  //intial value of the sign up form
  const [auth, setAuth] = useState({ name: "", email: "", password: "", cpassword: "" })

  //api call url
  let host = "http://localhost:5000/";

  //sign up function that create new user
  const handlesignup = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: auth.name, Email: auth.email, Password: auth.password })

    });
    const json = await response.json()
    console.log(json)
    if (json.success) {
      //save the token 
      localStorage.setItem("token", json.authtoken)

      showAlert("welcome on our Inotebook "+auth.email,"success")  //login alert successfull

      //redirect
      navigate("/")

      setAuth({ name: "", email: "", password: "", cpassword: "" })
    }
    else {
      showAlert("Username Alerady Exists","danger")  //login alert rejected
    }
  }
  const onchange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value })
  }
  return (
    <div className='container mt-3'>
      <form onSubmit={handlesignup}>
        <legend>Sign UP</legend>
        <div className="mb-3 mt-1">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' value={auth.name} onChange={onchange} aria-describedby="emailHelp" required minLength={3} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' value={auth.email} onChange={onchange} aria-describedby="emailHelp" required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' value={auth.password} onChange={onchange} id="password" required minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">confirm Password</label>
          <input type="password" className="form-control" name='cpassword' value={auth.cpassword} onChange={onchange} id="cpassword" required minLength={5} />
        </div>
        <button disabled={auth.password !== auth.cpassword} type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup
