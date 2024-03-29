import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

export default function ForgetPassword() {
    const navigate = useNavigate();
    const [emailiserror, setemailiserror] = useState('')
    const [iserror, setiserror] = useState('')
    const [securityQuestion, setsecurityQuestion] = useState('')
    const [isemailForSecurityAnswer, setisemailForSecurityAnswer] = useState(false)
    const [isCorrectSecurityAnswer, setisCorrectSecurityAnswer] = useState(false)
    const [forgetPasswordForm, setforgetPasswordForm] = useState({
        email: "",
        securityAnswer: "",
        password: "",
        confirmpassword: ""
    })

    function inputCredentials(e) {
        let data = { ...forgetPasswordForm }
        data[e.target.name] = e.target.value
        setforgetPasswordForm(data)
        let emailregex = data.email.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)

        if (!emailregex) {
            setemailiserror("Please add valid email")
            return;
        }
         else if (data.password.length < 6) {
            setemailiserror("")
            setiserror("Pasword should be atleast 6 character")
            return;
        } else if (data.password !== data.confirmpassword) {
            setemailiserror("")
            setiserror("confirm Password in not same as Password")
            return;
        } 
        else {
            setemailiserror("")
            setiserror('')
            return;
        }
    }

    function forgetPasswordBtn(e) {
        e.preventDefault()

        let emailregex = forgetPasswordForm.email.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)

        if (!emailregex) {
            setemailiserror("Please add valid email")
            return;
        } else if (forgetPasswordForm.password.length < 6) {
            setemailiserror("")
            setiserror("Pasword should be atleast 6 character")
            return;
        } else if (forgetPasswordForm.password !== forgetPasswordForm.confirmpassword) {
            setemailiserror("")
            setiserror("confirm Password in not same as Password")
            return;
        } else {
            setemailiserror("")
            setiserror('')
        }
        console.log(forgetPasswordForm)
        let payload = {
            email: forgetPasswordForm.email,
            password : forgetPasswordForm.password
        }

        fetch('http://localhost:8000/changePassword', {
            method: "PATCH",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                if(res.responseStatus === "SUCCESS") {
                    cancelforgetPasswordBtn()
                } else {
                    console.log('error')
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    function cancelforgetPasswordBtn() {
        navigate("/")
    }

    function CheckMailForSecurityQuestion() {
        let payload = {
            email: forgetPasswordForm.email
        }

        fetch('http://localhost:8000/getSecurityQuestion', {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                if(res.responseStatus === "SUCCESS") {
                    setisemailForSecurityAnswer(true)
                    setsecurityQuestion(res.data.securityQuestion)
                } else {
                    setisemailForSecurityAnswer(false)
                    setsecurityQuestion('')
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    function CheckSecurityQuestionAnswer() {
        let payload = {
            email: forgetPasswordForm.email,
            securityAnswer: forgetPasswordForm.securityAnswer
        }

        fetch('http://localhost:8000/checkSecurityAnswer', {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                if(res.responseStatus === "SUCCESS") {
                    setisCorrectSecurityAnswer(true)
                } else {
                    setisCorrectSecurityAnswer(false)
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="container">
            <form className="px-4 py-3">
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' placeholder="email@example.com" onChange={(e) => inputCredentials(e)} />
                    {
                        emailiserror &&
                        <div className='badge bg-danger my-2'>{emailiserror}</div>
                    }
                </div>
                {
                    isemailForSecurityAnswer &&
                    <div className="mb-3">
                        <label className="form-label">{securityQuestion}</label>
                        <input type="password" className="form-control" name='securityAnswer' placeholder="Security Answer" onChange={(e) => inputCredentials(e)} />
                        {/* {
                            emailiserror &&
                            <div className='badge bg-danger my-2'>{emailiserror}</div>
                        } */}
                    </div>
                }
                {isCorrectSecurityAnswer && <>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' placeholder="Password" onChange={(e) => inputCredentials(e)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" name='confirmpassword' placeholder="Confirm Password" onChange={(e) => inputCredentials(e)} />
                        {
                            iserror &&
                            <div className='badge bg-danger my-2'>{iserror}</div>
                        }
                    </div>
                    <button type="button" className="btn btn-primary" onClick={forgetPasswordBtn}>Change Password</button>
                    <button type="button" className="btn btn-danger mx-2" onClick={cancelforgetPasswordBtn}>Cancel</button>
                </>}
                {
                    !isemailForSecurityAnswer && !isCorrectSecurityAnswer &&
                    <button type="button" className="btn btn-primary" onClick={CheckMailForSecurityQuestion}>Submit</button>
                }
                {
                    (!isCorrectSecurityAnswer && isemailForSecurityAnswer) &&
                    <button type="button" className="btn btn-primary" onClick={CheckSecurityQuestionAnswer}>Submit</button>
                }
            </form>
            <div className="dropdown-divider"></div>
        </div>
    )
}
