import React, { useEffect, useState } from 'react';
import styles from './UpdateProfile.module.css';

const UpdateProfile = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        city: '',
        state: '',
        gender: '',
        dateOfBirth: '',
        phoneNumber: '',
        bio: '',
        country: '',
        primarySport: '',
    });

    // Load user from localStorage
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
            setFormData({
                fullName: currentUser.fullName || '',
                email: currentUser.email || '',
                city: currentUser.city || '',
                state: currentUser.state || '',
                gender: currentUser.gender || '',
                dateOfBirth: currentUser.dateOfBirth
                    ? currentUser.dateOfBirth.split('T')[0]
                    : '',
                phoneNumber: currentUser.phoneNumber || '',
                bio: currentUser.bio || '',
                country: currentUser.country || '',
                primarySport: currentUser.primarySport || '',
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Profile Data:", formData);
        // You can dispatch an update API call here later
    };

    return (
        <div className={styles.updateProfileContainer}>
            <form onSubmit={handleSubmit} className={styles.updateForm}>
                <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="primarySport">Primary Sport</label>
                        <input
                            type="text"
                            id="primarySport"
                            name="primarySport"
                            value={formData.primarySport}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                        <label>Bio</label>
                        <textarea
                            name="bio"
                            rows="3"
                            value={formData.bio}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className={styles.formActions}>
                    <button type="submit" className={styles.saveBtn}>Save Changes</button>
                    <button type="button" className={styles.cancelBtn}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;
