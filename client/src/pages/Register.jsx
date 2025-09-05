import React, { useState } from 'react';
import './styles/Register.css';
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const Register = () => {

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const [fullName, setfullName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [primarySport, setPrimarySport] = useState('');
    const [dob, setDOB] = useState('');

    const handleName = (e) => {
        setfullName(e.target.value);
        console.log(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handlePhone = (e) => {
        setPhoneNumber(e.target.value);
        console.log(e.target.value);
    };

    const handlePrimary = (e) => {
        setPrimarySport(e.target.value);
    };

    const handleDOB = (e) => {
        setDOB(e.target.value);
        console.log(e.target.value);
    };

    const handleCountry = (e) => {
        setCountry(e.target.value);
        console.log(e.target.value);
    };

    const handleState = (e) => {
        setState(e.target.value);
        console.log(e.target.value);
    };

    const handleCity = (e) => {
        setCity(e.target.value);
        console.log(e.target.value);
    };

    const handleGender = (e) => {
        setGender(e.target.value);
        console.log(e.target.value);
    };

    const resetFields = () => {
        setfullName('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
        setCity('');
        setCountry('');
        setPrimarySport('');
        setDOB('');
        setState('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fullName || !email || !password || !phoneNumber || !primarySport || !dob || !country || !state || !city || !gender) {
            toast.error('Please fill all the fields..');
            return;
        }
        const userData = {
            fullName,
            password,
            email,
            phoneNumber,
            primarySport,
            dateOfBirth: dob,
            country,
            state,
            city,
            gender,
        };
        const result = await dispatch(register(userData));

        if (result.meta.requestStatus === "fulfilled") {
            toast.success("Registration Successful!");
            resetFields();
        } else {
            toast.error(result.payload?.message || "Registration failed");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-left">
                <h1 className="signup-heading">
                    ClubHive <br />
                    <span>buzzing with events & groups</span>
                </h1>
                <p className="signup-text">
                    A dynamic platform for managing events and clubs. Users can create and join events like cycling rides, tech talks, or meetups, RSVP, track attendees, and chat in event-specific groups. Integrated with Google Maps for easy location discovery. Built on the MERN stack, it highlights real-time chat, notifications, and event management—ideal for student clubs, sports teams, and community groups.
                </p>
            </div>

            <div className="signup-right">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>

                <div className="signup-card">
                    <form onSubmit={handleSubmit}>
                        {/* <div className="form-row"> */}
                        <input type="text" placeholder='Full Name' value={fullName} onChange={handleName} />
                        {/* </div> */}
                        <input type="email" placeholder='Email' value={email} onChange={handleEmail} />
                        <input type="password" placeholder="Password" value={password} onChange={handlePassword} />
                        <input type="number" placeholder='Phone Number' value={phoneNumber} onChange={handlePhone} />
                        <input type="text" placeholder='Primary Sport' value={primarySport} onChange={handlePrimary} />
                        <input type="date" value={dob} onChange={handleDOB} />
                        <div className="form-row">
                            <select value={country} onChange={handleCountry}>
                                <option value="">Select Country</option>
                                <option value="india">India</option>
                                <option value="usa">USA</option>
                                <option value="uk">UK</option>
                            </select>
                            <select value={state} onChange={handleState}>
                                <option value="">Select State</option>
                                <option value="hr">Haryana</option>
                                <option value="delhi">Delhi</option>
                                <option value="up">Uttar Pardesh</option>
                            </select>
                        </div>
                        <div className="form-row">
                            <select value={city} onChange={handleCity}>
                                <option value="">Select City</option>
                                <option value="rewari">Rewari</option>
                                <option value="gurgaon">Gurgaon</option>
                                <option value="noida">Noida</option>
                            </select>
                            <select value={gender} onChange={handleGender}>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <button type="submit" className="signup-btn" disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </button>

                    </form>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div className="social-section">
                        <p>or sign up with:</p>
                        <div className="social-icons">
                            <a href="#" className="social-icon facebook"><FaFacebookF /></a>
                            <a href="#" className="social-icon google"><FaGoogle /></a>
                            <a href="#" className="social-icon github"><FaGithub /></a>
                        </div>
                    </div>

                    <p className="login-text">
                        Already have an account?{" "}
                        <Link to="/" className="link-danger">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;