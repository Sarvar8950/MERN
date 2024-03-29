import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header({ setIsLogedIn }) {
    const [userDetails, setUserDetails] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        setUserDetails(JSON.parse(sessionStorage.getItem("userDetails")))
    }, [])

    function logout() {
        sessionStorage.clear()
        setIsLogedIn(false)
        navigate("/")
    }
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Todos
                            </a>
                            <ul className="dropdown-menu">
                                <li> <Link className="dropdown-item" to="/addItem">Add Todos</Link></li>
                                <li><Link className="dropdown-item" to="/listItem">List Todos</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/chat">Chat Page</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/graph">Charts</Link>
                        </li>
                    </ul>
                    <span className="navbar-text me-3">
                        {userDetails?.firstName} {userDetails?.lastName}
                    </span>
                    <button className='btn btn-dark' onClick={logout}>Logout</button>
                </div>
            </div>
        </nav>
    )
}
