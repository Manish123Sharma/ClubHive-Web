import React, { useState } from 'react';
import './styles/Login.css';
import emailLogin from '../utils/emailLogin';
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const resetFields = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        emailLogin({
            email,
            password,
            setLoading,
            resetFields
        });
    };

    return (
        <div className="login-container">
            <div className="login-image">
                <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    alt="Sample illustration"
                />
            </div>

            <div className="login-form">
                <h1 className='heading'>Login</h1>

                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email address" value={email} onChange={handleEmail} className="input-field" />
                    <input type="password" placeholder="Password" value={password} onChange={handlePassword} className="input-field" />

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#">Forgot password?</a>
                    </div>

                    {loading
                        ?
                        <button disabled type="submit" className="signup-btn">
                            Loading...
                        </button>
                        :
                        <button type="submit" className="signup-btn">
                            Login
                        </button>
                    }
                </form>
                <div className="divider">
                    <span>Or</span>
                </div>

                <div className="social-login">
                    <p>Sign in with</p>
                    <div className="social-icons-login">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaGoogle /></a>
                        <a href="#"><FaGithub /></a>
                    </div>
                </div>

                <p className="signup-text-login">
                    Don't have an account?{" "}
                    <Link to="/register" className="link-danger-login">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
