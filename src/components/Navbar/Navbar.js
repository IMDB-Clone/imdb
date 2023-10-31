import React from 'react';
import './Navbar.css';
import logo from '../../assets/IMDB_Logo.png';

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">
                <img src={logo} alt="IMDb Logo" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenu" role="button" data-toggle="dropdown">
                            All
                        </a>
                        <div className="dropdown-menu">
                            {/* Dropdown items go here */}
                        </div>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search IMDb" />
                </form>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/pro">IMDbPro</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/watchlist">Watchlist</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/sign-in">Sign In</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarLanguageDropdown" role="button" data-toggle="dropdown">
                            EN
                        </a>
                        <div className="dropdown-menu">
                            {/* Language options go here */}
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}


export default Navbar;