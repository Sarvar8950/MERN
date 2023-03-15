import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import { Notify } from '../Notify.service'

export default function Signup() {

    const [registerform, setregisterform] = useState({
        password: '',
        firstName: '',
        lastName: '',
        securityQuestion: 'What is your favourite Book?',
        securityAnswer: '',
        email: '',
        confirmpassword: ''
    })

    function inputCredentials(e) {
        let data = { ...registerform }
        data[e.target.name] = e.target.value
        setregisterform(data)
    }

    function signup(e) {
        e.preventDefault()
        console.log(registerform)
        if (!registerform.firstName || !registerform.email || !registerform.securityAnswer || !registerform.securityQuestion) {
            console.log("All fields are required")
            // Info("Please fill mandetory fields")
            return (
                <></>
                // <Notify type='Info' msg={"Please fill mandetory fields"} bgcolor={"yellow"} />
            )
        } else if (registerform.password.length < 6) {
            console.log("Password should not be less than 6 character")
            // Info("Password should not be less than 6 character")
            return (
                <></>
                // <Notify type='Info' msg={"Password should not be less than 6 character"} bgcolor={"yellow"} />
            )
        } else if (registerform.password !== registerform.confirmpassword) {
            console.log("Confirm Password do not match to Password")
            // Error("Confirm Password do not match to Password")
            return (
                <></>
                // <Notify type='Error' msg={"Confirm Password do not match to Password"} bgcolor={"red"} />
            )
        }
        fetch('http://localhost:8000/register', {
            method: "POST",
            body: JSON.stringify(registerform),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                return (
                    <></>
                    // <Notify type='Success' msg={"User Registered Successfully"} bgcolor={"green"} />
                )
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
    }

    function selectSecurityQuestion(event) {
        console.log(event.target.value)
    }


    return (
        <div className="container">
            <form className="px- py-3">
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" name='firstName' className="form-control" placeholder="First Name" value={registerform.firstName} onChange={(e) => inputCredentials(e)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" name='lastName' className="form-control" placeholder="Last Name" value={registerform.lastName} onChange={(e) => inputCredentials(e)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" name='email' className="form-control" placeholder="email@example.com" value={registerform.email} onChange={(e) => inputCredentials(e)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" placeholder="Password" value={registerform.password} onChange={(e) => inputCredentials(e)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" name='confirmpassword' className="form-control" placeholder="Confirm Password" value={registerform.confirmpassword} onChange={(e) => inputCredentials(e)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Select Security Question</label>
                    <select className="form-select" id="floatingSelectGrid" onChange={(e) => selectSecurityQuestion(e)}>
                        <option value="What is your favourite Book?">What is your favourite Book?</option>
                        <option value="What is your faourite food?">What is your faourite food?</option>
                        <option value="What is your favourite game?">What is your favourite game?</option>
                    </select>

                </div>
                <div className="mb-3">
                    <label className="form-label">Security Answer</label>
                    <input type="password" name='securityAnswer' className="form-control" placeholder="Security Answer" value={registerform.securityAnswer} onChange={(e) => inputCredentials(e)} />
                </div>
                <button type='button' className="btn btn-primary" onClick={signup} >Sign Up</button>
            </form>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" to="/">Back to Login</Link>
        </div>
    )
}
