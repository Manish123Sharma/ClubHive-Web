import React, { useEffect, useState, useRef } from 'react';
import { FaSearch, FaChevronDown, FaBook, FaHeart, FaSignOutAlt } from "react-icons/fa";
// import { MdLocationOn } from "react-icons/md";
import './Header.css';
import logo from '../../assets/logo.png';
import { logout, getUserbyId } from "../../redux/slices/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from '../Loader/Loader.jsx';
import profile from '../../assets/profile.png';
import { getEventbyName } from '../../redux/slices/eventSlics.js';

const Header = () => {
    // const cities = ["Online",];
    // const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    // const [searchCity, setSearchCity] = useState("");
    // const [selectedCity, setSelectedCity] = useState("India");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading } = useSelector((state) => state.auth);

    const dropdownRef = useRef(null);
    const profileRef = useRef(null);

    // Fetch user once
    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser?._id) {
            dispatch(getUserbyId(savedUser._id));
        }
    }, [dispatch]);

    useEffect(() => {
        if (searchTerm.trim() === "") return;

        const delayDebounce = setTimeout(() => {
            dispatch(getEventbyName(searchTerm)).then((action) => {
                if (action.payload && Array.isArray(action.payload)) {
                    const ids = action.payload.map(ev => ev._id);
                    console.log("Fetched Event IDs:", ids);
                }
            });
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm, dispatch]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && searchTerm.trim() !== "") {
            navigate(`/allevents?name=${encodeURIComponent(searchTerm)}`);
        }
    };

    // Click outside handler
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                // setDropdownOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // const toggleDropdown = () => setDropdownOpen((prev) => !prev);
    const toggleProfile = () => setProfileOpen((prev) => !prev);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    // const handleCitySelect = (city) => {
    //     setSelectedCity(city);
    //     setDropdownOpen(false);
    //     setSearchCity("");
    // };

    // const filteredCities = cities.filter(city =>
    //     city.toLowerCase().includes(searchCity.toLowerCase())
    // );

    const handleViewEdit = () => {
        console.log('Editing');
        navigate('/profile');
    };

    return (
        <div className='navbar'>
            {loading && <Loader />}

            {/* Logo */}
            <div className="logo">
                <a href="/home"><img src={logo} alt="ClubHive Logo" /></a>
            </div>

            {/* Search + Location */}
            <div className="loc_search">
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search for events, interests or activities"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                {/* Location Dropdown */}
                {/* <div className="location-dropdown" ref={dropdownRef}>
                    <div className="location-trigger" onClick={toggleDropdown}>
                        <MdLocationOn className="location-icon" />
                        <span>{selectedCity}</span>
                        <FaChevronDown className={`arrow-icon ${dropdownOpen ? "rotate" : ""}`} />
                    </div>

                    <div className={`dropdown-menu ${dropdownOpen ? "open" : "closed"}`}>
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
                </div> */}
            </div>

            {/* Right Section */}
            <div className="header-right" ref={profileRef}>
                <div className="profile" onClick={toggleProfile}>
                    <img src={user?.profilePic || profile} alt="profile" />
                </div>

                {/* Profile Dropdown */}
                <div className={`profile-dropdown ${profileOpen ? "open" : "closed"}`}>
                    <div className="profile-header">
                        <img src={user?.profilePic || profile} alt="profile" />
                        <div>
                            <h4>{user?.fullName || "Guest User"}</h4>
                            <span className="edit-profile" onClick={handleViewEdit}>
                                View and edit profile
                            </span>
                        </div>
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
            </div>
        </div>
    );
};

export default Header;
