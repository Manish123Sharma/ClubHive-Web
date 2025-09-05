import React from 'react';
import { FaSearch } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import './Header.css';
import logo from '../../assets/logo.png';

const Header = () => {
    return (
        <div className='navbar'>
            {/* Logo */}
            <div className="logo">
                <a  href="/home"><img src={logo} alt="ClubHive Logo" /></a>
            </div>

            {/* Search Bar */}
            <div className="loc_search">
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search for events, interests or activities"
                    />

                </div>
                <div className="location">
                    <MdLocationOn className="location-icon" />
                    <span>India</span>
                </div>
            </div>


            {/* Right Section */}
            <div className="header-right">
                <div className="profile">
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="profile"
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
