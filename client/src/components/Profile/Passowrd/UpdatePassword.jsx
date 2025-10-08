import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './UpdatePassword.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updatePass } from '../../../redux/slices/authSlice';

const UpdatePassword = ({ onclose }) => {

    const dispatch = useDispatch();
    const { user, loading, error, success } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        oldpassword: '',
        newpassword: '',
        confirmnewpassword: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newpassword !== formData.confirmnewpassword) {
            alert("New passwords do not match");
            return;
        }

        const userId = user?._id;
        if (!userId) {
            alert("User not found");
            return;
        }

        try {
            const res = await dispatch(
                updatePass({
                    userId,
                    oldPassword: formData.oldpassword,
                    newPassword: formData.newpassword,
                })
            ).unwrap();

            alert(res.message || "Password updated successfully");
            onclose(); // close modal after success
        } catch (err) {
            alert(err?.message || "Password update failed");
        }
    };

    return (
        <div className={styles.updatePasswordContainer}>
            <form onSubmit={handleSubmit} className={styles.updateForm}>
                <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                        <label htmlFor="oldpassword">Old Password</label>
                        <input
                            type="password"
                            name="oldpassword"
                            id='oldpassword'
                            value={formData.oldpassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="newpassword">New Password</label>
                        <input
                            type="password"
                            name="newpassword"
                            id='newpassword'
                            value={formData.newpassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="confirmnewpassword">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmnewpassword"
                            id='confirmnewpassword'
                            value={formData.confirmnewpassword}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className={styles.formActions}>
                    <button type="submit" className={styles.saveBtn} disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                    <button onClick={onclose} type="button" className={styles.cancelBtn}>Cancel</button>
                </div>
                {error && <p className={styles.errorMsg}>{error}</p>}
                {success && <p className={styles.successMsg}>{success}</p>}
            </form>
        </div>
    );
}
UpdatePassword.propTypes = {
    onclose: PropTypes.func.isRequired,
};

export default UpdatePassword;
