import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand bg-body-tertiary bg-dark px-3" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand text-light" to="/">Navbar</Link>
                <Link className="navbar-link text-light" to="/">Login</Link>
                <Link className="navbar-link text-light" to="/signup">Sign Up</Link>
            </div>
        </nav>

        
    )
}
