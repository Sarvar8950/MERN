import { Route, Routes } from 'react-router-dom';
import './App.css';
import "./Notify.css"
import Authhome from './auth/Authhome';
import ForgetPassword from './auth/ForgetPassword';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Header from './Component/Header';
import { useEffect, useState } from 'react';
import Home from './Component/Home';
import About from './Component/About';
import Form from './Component/Form/Form';
import ListItem from './Component/Form/ListItem';
import Chat from './Component/Chating App/Chat';
import Graph from './Component/graph/Graph';


function App() {
  const [isLogedin, setIsLogedIn] = useState(false)
  useEffect(() => {
    const logedInDetails = JSON.parse(sessionStorage.getItem('userDetails'))
    // console.log(logedInDetails)
    setIsLogedIn(logedInDetails)
    
  }, [])
  return (
    <>
      <ul className="notifications" style={{ position: 'absolute', left: 0, top: 0, zIndex: -1 }}></ul>
      {
        !isLogedin ?
          <>
            <Authhome />
            <Routes>
              <Route path="/" element={<Login setIsLogedIn={setIsLogedIn} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgetpassword" element={<ForgetPassword />} />
            </Routes>
          </>
          :
          <>
            <Header setIsLogedIn={setIsLogedIn} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/addItem" element={<Form />} />
              <Route path="/listItem" element={<ListItem />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/graph" element={<Graph />} />
            </Routes>
          </>
      }
    </>
  );
}

export default App;
