import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from '../context/Notes/notecontext'

const Login = () => {

    //for alert the context api
    const context = useContext(NoteContext)
    const {showAlert} = context

    //make history variable
    let navigate = useNavigate()
    const [auth, setAuth] = useState({ email: "", password: "" })
    let host = "http://localhost:5000/";
    //api call for login user
    const handlelogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Email: auth.email, Password: auth.password })

        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            //save the token 
            localStorage.setItem("token", json.authtoken)

            showAlert("welcome on our Inotebook "+auth.email,"success")  //login alert successfully

            //redirect
            navigate("/")
            setAuth({ email: "", password: "" })
        }
        else {
            showAlert("Incorrect Username and Password","danger")  //login alert rejected
        }

    }

    //change the note state
    const onchange = (e) => {
        setAuth({ ...auth, [e.target.name]: e.target.value })
    }
    return (
        <div className='container mt-3 ml-4'>

            <form onSubmit={handlelogin}>
               <legend> Login  </legend>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={auth.email} onChange={onchange} className="form-control" id="email" name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={auth.password} onChange={onchange} className="form-control" id="password" name='password' />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
              
            </form> 
        </div>
    )
}

export default Login
