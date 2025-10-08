import React, { useEffect, useState } from 'react';
import './styles/Login.css';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, token } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please fill all the fields..');
            return;
        }
        const credentials = {
            email,
            password,
        };
        const result = await dispatch(login(credentials));

        if (result.meta.requestStatus === "fulfilled") {
            localStorage.setItem("token", result.payload.token);
            localStorage.setItem("user", JSON.stringify({
                _id: result.payload._id,
                // fullName: result.payload.fullName,
                // email: result.payload.email
            }));
            toast.success("Login Successful!");
            resetFields();
            navigate("/home");
        } else {
            toast.error(result.payload?.message || "Registration failed");
        }

    };

    useEffect(() => {
        if (token) {
            navigate("/home");
        }
    }, [token, navigate]);

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

                    <button type="submit" className="signup-btn" disabled={loading}>
                        {loading ? "Logging..." : "Login"}
                    </button>
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}
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
