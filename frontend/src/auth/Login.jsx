import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    })

    function inputCredentials(e) {
        let data = {...loginForm}
        data[e.target.name] = e.target.value
        setLoginForm(data)
    }

    function login(e) {
        e.preventDefault()
        console.log(loginForm)
    }

    return (
            <div className="container">
                <form className="px- py-3">
                    <div className="mb-3">
                        <label  className="form-label">Email address</label>
                        <input type="email" name='email' className="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" value={loginForm.name} onChange={(e) => inputCredentials(e)}  />
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Password</label>
                        <input type="password" name='password' className="form-control" id="exampleDropdownFormPassword1" placeholder="Password" value={loginForm.password} onChange={(e) => inputCredentials(e)}  />
                    </div>
                    <button type='button' className="btn btn-primary" onClick={login} >Sign in</button>
                </form>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/signup">New around here? Sign up</Link>
                <Link className="dropdown-item" to="/forgetpassword">Forgot password?</Link>
            </div>
    )
}
