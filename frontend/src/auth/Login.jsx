import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createToast } from "../Notify.module"

export default function Login({setIsLogedIn}) {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        // createToast({
        //     type : 'success',
        //     message : 'Success Message',
        //     position : 'top-right',
        //     timer : 3000
        // })
    }, [])

    function inputCredentials(e) {
        let data = { ...loginForm }
        data[e.target.name] = e.target.value
        setLoginForm(data)
    }

    function login(e) {
        e.preventDefault()
        console.log(loginForm)
        fetch(`http://localhost:8000/login`, {
            method: "POST",
            body: JSON.stringify(loginForm),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                res.data['token'] = res.token
                setIsLogedIn(res.data)
                sessionStorage.setItem("userDetails", JSON.stringify(res.data))
            }).catch(error => console.log(error))
    }

    return (
        <div className="container">
            <form className="px- py-3">
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" name='email' className="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" value={loginForm.name} onChange={(e) => inputCredentials(e)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="exampleDropdownFormPassword1" placeholder="Password" value={loginForm.password} onChange={(e) => inputCredentials(e)} />
                </div>
                <button type='button' className="btn btn-primary" onClick={login} >Sign in</button>
            </form>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" to="/signup">New around here? Sign up</Link>
            <Link className="dropdown-item" to="/forgetpassword">Forgot password?</Link>
        </div>
    )
}
