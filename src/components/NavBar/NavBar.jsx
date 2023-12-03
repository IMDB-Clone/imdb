import React, { useContext } from 'react';
import { UserContext } from '../../services/usercontext';
import './NavBar.css';

const NavBar = () => {
    const { user, logout } = useContext(UserContext);

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        window.location.href = '/';
    };

    return (
        <div className="navbar">
            {user && (
                <div className="user-info">
                    <img src={user.photoURL} alt={user.username} className="user-photo" />
                    <span className="username">{user.username}</span>
                    <div className="dropdown-menu">
                        <a href="/profile">Profile</a>
                        <a href="/" onClick={handleLogout}>Logout</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;
