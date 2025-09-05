import React, { useEffect, useState } from 'react';
import './styles/Register.css';
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { fetchCountries, fetchStates, fetchCities } from "../utils/dropdownApis";

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

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [countryId, setCountryId] = useState('');
    const [stateId, setStateId] = useState('');
    // const [cityId, setCityId] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const countryData = await fetchCountries();
                setCountries(countryData);
            } catch (err) {
                toast.error("Failed to load dropdown data");
                console.log(err);

            }
        };
        loadData();
    }, []);

    useEffect(() => {
        if (countryId) {
            console.log('Country', countryId);
            const loadStates = async () => {
                const stateData = await fetchStates(countryId);
                setStates(stateData);
                setCities([]); // reset cities
                setState('');
                setCity('');
            };
            loadStates();
        }
    }, [countryId]);

    useEffect(() => {
        if (stateId) {
            const loadCities = async () => {
                const cityData = await fetchCities(stateId);
                setCities(cityData);
                setCity('');
            };
            loadCities();
        }
    }, [stateId]);

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
        const selectedValue = e.target.value;
        // console.log('Sected Value', e.target.value);
          // this is country id
        setCountry(selectedValue);
        // console.log('Country Selcted', selectedValue);
        

        // Find the country object to extract its id
        const selectedCountry = countries.find(c => c.name.toString() === selectedValue);
        if (selectedCountry) {
            // setCountry(selectedCountry.name);
            setCountryId(selectedCountry.country_id);
        }
        // console.log("Selected countryId:", selectedValue);
    };

    const handleState = (e) => {
        const selectedValue = e.target.value; // state id
        setState(selectedValue);

        const selectedState = states.find(s => s.name.toString() === selectedValue);
        if (selectedState) {
            // setState(selectedState.name);
            setStateId(selectedState.state_id);
        }
        // console.log("Selected stateId:", selectedValue);
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
                                {countries.map((c) => (
                                    <option key={c.name} value={c.name}>{c.name}</option>
                                ))}
                            </select>
                            <select value={state} onChange={handleState}>
                                <option value="">Select State</option>
                                {states.map((s) => (
                                    <option key={s.name} value={s.name}>{s.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-row">
                            <select value={city} onChange={handleCity}>
                                <option value="">Select City</option>
                                {cities.map((c) => (
                                    <option key={c.city_id} value={c.name}>{c.name}</option>
                                ))}
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