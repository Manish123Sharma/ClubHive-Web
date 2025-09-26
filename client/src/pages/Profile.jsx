import React, { useState } from 'react';
import styles from './styles/Profile.module.css';
import clubhive from '../assets/logo.png';

const Profile = () => {
    // const [name, setName] = useState('');
    return (
        <div className={styles.profilePage}>
            {/* Top Navbar */}
            <div className={styles.navbar}>
                <div className={styles.logo}>
                    <img src={clubhive} alt="logo" className={styles.logoImg} />
                </div>
                <div className={styles.userAvatar}>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTp2uVL_20SWV4DLCWNLZGl4ndAmxA0DxRcw&s"
                        alt="user avatar"
                        className={styles.avatarImg}
                    />
                </div>
            </div>

            {/* Profile Section */}
            <div className={styles.profileSection}>
                <div className={styles.userInfo}>
                    <div className={styles.profile}>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTp2uVL_20SWV4DLCWNLZGl4ndAmxA0DxRcw&s"
                            alt="profile"
                            className={styles.profilePic}
                        />
                        <div>
                            <h2>Manish Sharma</h2>
                            <p>mks595275@gmail.com</p>
                            <p className={styles.phone}></p>
                        </div>
                    </div>
                    <button className={styles.editBtn}>✎ Edit</button>
                </div>

                <hr className={styles.divider} />

                {/* Account Settings */}
                <div className={styles.accountSettings}>
                    <h3>Account Settings</h3>
                    <div className={styles.settingsRow}>
                        <div>
                            <p>Password</p>
                            <button className={styles.outlineBtn}>Change Password</button>
                        </div>
                        <div>
                            <p>Timezone</p>
                            <span>Asia/Calcutta</span>
                        </div>
                    </div>

                    {/* Cover Picture */}
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

                {/* Social Media */}
                <div className={styles.socialMedia}>
                    <h3>Social Media Accounts</h3>
                    <div className={styles.socialLinks}>
                        <div>
                            <p>Facebook Page Link</p>
                            <span>NA</span>
                        </div>
                        <div>
                            <p>Twitter Profile Link</p>
                            <span>NA</span>
                        </div>
                        <div>
                            <p>LinkedIn Profile Link</p>
                            <span>NA</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
