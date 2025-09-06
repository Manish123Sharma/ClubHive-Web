import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import './Header.css';
import logo from '../../assets/logo.png';
import { FaChevronDown } from "react-icons/fa";
import { MdEvent, MdPayment, MdAssessment, MdCampaign } from "react-icons/md";
import { FaBook, FaHeart, FaSignOutAlt } from "react-icons/fa";
import { logout } from "../../redux/slices/authSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const cities = ["Online", "Bengaluru", "Chennai", "Delhi", "Hyderabad", "Mumbai", "Pune"];
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchCity, setSearchCity] = useState("");
    const [selectedCity, setSelectedCity] = useState("India");
    const [profileOpen, setProfileOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggleProfile = () => setProfileOpen(!profileOpen);

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };


    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setDropdownOpen(false);
        setSearchCity(""); // reset search
    };

    const filteredCities = cities.filter(city =>
        city.toLowerCase().includes(searchCity.toLowerCase())
    );

    return (
        <div className='navbar'>
            {/* Logo */}
            <div className="logo">
                <a href="/home"><img src={logo} alt="ClubHive Logo" /></a>
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
                <div className="location-dropdown">
                    <div className="location-trigger" onClick={toggleDropdown}>
                        <MdLocationOn className="location-icon" />
                        <span>{selectedCity}</span>
                        <FaChevronDown className="arrow-icon" />
                    </div>

                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <div className="dropdown-search">
                                <FaSearch className="dropdown-search-icon" />
                                <input
                                    type="text"
                                    placeholder="Browse events..."
                                    value={searchCity}
                                    onChange={(e) => setSearchCity(e.target.value)}
                                />
                            </div>
                            <ul>
                                {filteredCities.map((city, index) => (
                                    <li key={index} onClick={() => handleCitySelect(city)}>
                                        <MdLocationOn className="city-icon" />
                                        {city}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>


            {/* Right Section */}
            <div className="header-right">
                <div className="profile" onClick={toggleProfile}>
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="profile"
                    />
                </div>

                {/* Profile Dropdown */}
                {profileOpen && (
                    <div className="profile-dropdown">
                        <div className="profile-header">
                            <img src="https://i.pravatar.cc/50" alt="profile" />
                            <div>
                                <h4>Manish Sharma</h4>
                                <span>View and edit profile</span>
                            </div>
                        </div>
                        <div className="profile-section">
                            <p>Organizing Events</p>
                            <ul>
                                <li><MdEvent /> Manage Events</li>
                                <li><MdPayment /> Billing</li>
                                <li><MdAssessment /> Reports</li>
                                <li><MdCampaign /> Promotions</li>
                            </ul>
                        </div>
                        <div className="profile-section">
                            <p>Attending Events</p>
                            <ul>
                                <li><FaBook /> My Bookings</li>
                                <li><FaHeart /> Following</li>
                            </ul>
                        </div>
                        <div className="profile-section logout">
                            <ul>
                                <li onClick={handleLogout}><FaSignOutAlt /> Logout</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
