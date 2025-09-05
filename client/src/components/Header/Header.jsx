import React from 'react';
import { FaSearch, FaGlobe } from "react-icons/fa";
import './Header.css';
import logo from '../../assets/logo.png';

const Header = () => {
    return (
        <div className='navbar'>
            <div className="logo">
                <a href="/home"><img src={logo} alt="ClubHive Logo" /></a>
            </div>
            <div className="search-bar">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search for events, interests or activities"
                />
            </div>
            <div className="header-right">
                <div className="dropdown">
                    <FaGlobe className="globe-icon" />
                    <span>Online</span>
                </div>
                <div className="profile">
                    <img
                        src="https://i.pravatar.cc/40" // replace with user profile img
                        alt="profile"
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;