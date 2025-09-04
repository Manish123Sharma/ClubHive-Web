import React, { useState } from 'react';
import './styles/Register.css';

const Register = () => {

    const [fullName, setfullName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    // const[city, setCity] = useState('');
    // const[state, setState] = useState('');
    // const[country, setCountry] = useState('');
    // const[gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [primarySport, setPrimarySport] = useState('');
    const [dob, setDOB] = useState('')

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
                    <form>
                        {/* <div className="form-row"> */}
                        <input type="text" placeholder='Full Name' value={fullName} onChange={(e) => {
                            setfullName(e.target.value);
                        }} />
                        {/* </div> */}
                        <input type="email" placeholder='Email' value={email} onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="number" placeholder='Phone Number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        <input type="text" placeholder='Primary Sport' value={primarySport} onChange={(e) => setPrimarySport(e.target.value)} />
                        <input type="date" value={dob} onChange={(e) => {
                            setDOB(e.target.value);
                            console.log(dob);
                        }} />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
