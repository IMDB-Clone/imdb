import React, { useContext } from 'react';
import { UserContext } from '../../services/usercontext';
import './NavBar.css';

const NavBar = () => {
    const { logout } = useContext(UserContext);

    const handleLogout = (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        logout(); // Call logout from context
        window.location.href = '/'; // Navigate to home
    };

    return (
        <div className="navbar">
            <a href="/profile">
                <button>Profile</button>
            </a>
            <a href="/" onClick={handleLogout}>
                <button>Logout</button>
            </a>
        </div>
    );
};

export default NavBar;
