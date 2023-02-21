import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authhome from './auth/Authhome';
import ForgetPassword from './auth/ForgetPassword';
import Login from './auth/Login';
import Signup from './auth/Signup';
import { Notify } from './Notify.service';

function App() {
  return (
    <>
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
