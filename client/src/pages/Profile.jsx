import React, { useEffect, useRef, useState } from 'react';
import styles from './styles/Profile.module.css';
import clubhive from '../assets/logo.png';
import { FaFacebook, FaTwitter, FaInstagram, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, getUserbyId } from '../redux/slices/authSlice';
import profile from '../assets/profile.png';
import UpdateProfile from '../components/Profile/Account/UpdateProfile';
import UpdatePassword from '../components/Profile/Passowrd/UpdatePassword';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const [updateProfilereq, setUpdateProfilereq] = useState(false);
    const [updatePassword, setUpdatePassword] = useState(false);

    const toggleProfile = () => setProfileOpen((prev) => !prev);
    const toggleProfileEdit = () => setUpdateProfilereq((prev) => !prev);
    const togglePasswordEdit = () => setUpdatePassword((prev) => !prev);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser?._id) {
            dispatch(getUserbyId(savedUser._id)).then((res) => {
                if (res?.payload) {
                    localStorage.setItem("currentUser", JSON.stringify(res.payload));
                }
            });
        }

        // Remove current user when leaving profile page
        return () => {
            localStorage.removeItem("currentUser");
        };
    }, [dispatch]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className={styles.profilePage}>
            {/* Navbar */}
            <div className={styles.navbar}>
                <div className={styles.logo}>
                    <a href="/home">
                        <img src={clubhive} alt="logo" className={styles.logoImg} />
                    </a>
                </div>

                <div className={styles.nav_right} ref={profileRef}>
                    <div className={styles.userAvatar} onClick={toggleProfile}>
                        <img
                            src={user?.profile_pic || profile}
                            alt="user avatar"
                            className={styles.avatarImg}
                        />
                    </div>

                    {profileOpen && (
                        <div className={styles.profileDropdown}>
                            <ul className={styles.dropdownList}>
                                <li onClick={handleLogout}>
                                    <FaSignOutAlt /> Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Profile Section */}
            <div className={styles.profileSection}>
                <div className={styles.main_profile}>
                    <div className={styles.userInfo}>
                        <div className={styles.profile}>
                            <img
                                src={user?.profile_pic || profile}
                                alt="profile"
                                className={styles.profilePic}
                            />
                            <div>
                                <h2>{user?.fullName || "Unknown User"}</h2>
                                <p>{user?.email || "No Email"}</p>
                            </div>
                        </div>
                        <button onClick={toggleProfileEdit} className={styles.outlineBtn}>✎ Edit</button>
                    </div>
                    {updateProfilereq && (
                        <UpdateProfile onClose={() => setUpdateProfilereq(false)} />
                    )}
                </div>


                <hr className={styles.divider} />

                <div className={styles.accountSettings}>
                    <h3>Account Settings</h3>
                    {/* <div className={styles.settingsRow}> */}
                    <div className={styles.changePass}>
                        <p>Change Password</p>
                        <button onClick={togglePasswordEdit} className={styles.outlineBtn}>Change Password</button>
                    </div>
                    {updatePassword && (
                        <UpdatePassword onclose={() => setUpdatePassword(false)} />
                    )}
                    {/* <div>
                            <p>Timezone</p>
                            <span>Asia/Calcutta</span>
                        </div> */}
                    {/* </div> */}
                    <div className={styles.coverPicture}>
                        <p>
                            Cover Picture{" "}
                            <span className={styles.muted}>
                                (Min Size: 1920px x 738px)
                            </span>
                        </p>
                        <button className={styles.outlineBtn}>Upload Cover Image</button>
                    </div>
                </div>

                <hr className={styles.divider} />

                <div className={styles.socialMedia}>
                    <h3>Social Media Accounts</h3>
                    <div className={styles.socialLinks}>
                        <div className={styles.socialCard}>
                            <FaFacebook className={styles.icon} />
                            <p>Facebook</p>
                            <span>NA</span>
                        </div>
                        <div className={styles.socialCard}>
                            <FaTwitter className={styles.icon} />
                            <p>Twitter</p>
                            <span>NA</span>
                        </div>
                        <div className={styles.socialCard}>
                            <FaInstagram className={styles.icon} />
                            <p>Instagram</p>
                            <span>NA</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
