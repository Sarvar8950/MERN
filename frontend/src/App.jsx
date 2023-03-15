import { Route, Routes } from 'react-router-dom';
import './App.css';
import "./Notify.css"
import Authhome from './auth/Authhome';
import ForgetPassword from './auth/ForgetPassword';
import Login from './auth/Login';
import Signup from './auth/Signup';
import { useEffect, useState } from 'react';

function App() {
  const [ isLogedin, setIsLogedIn ] = useState()
  const [ verifyUser, setverifyUser ] = useState(false)
  useEffect(() => {
    const logedInDetails = JSON.parse(sessionStorage.getItem('userDetails'))
    console.log(logedInDetails)
    setIsLogedIn(logedInDetails)
    if (isLogedin) {
      fetch(`http://localhost:8000/validateToken`, {
        method: "POST",
        body: JSON.stringify({
          token: logedInDetails.token
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
        .then(res => {
          console.log(res)
          if (res.responseStatus === "SUCCESS") {
            setverifyUser(true)
          } else {
            setverifyUser(false)
          }
        }).catch(error => {
          setverifyUser(false)
          console.log(error)
        })
    }
  }, [])
  return (
    <>
      <ul className="notifications" style={{ position: 'absolute', left: 0, top: 0, zIndex: -1 }}></ul>
      <Authhome />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Routes>
    </>
  );
}

export default App;
