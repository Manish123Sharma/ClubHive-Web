import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./UpdateCoverPic.module.css";
import { FaEdit } from "react-icons/fa";
import profile from "../../../assets/profile.png";
import { useDispatch } from "react-redux";
import { coverPic } from "../../../redux/slices/authSlice";
import { toast } from "react-toastify";

const UpdateCoverPic = ({ onclose }) => {
    const dispatch = useDispatch();

    // Load current user data
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userId = currentUser?._id;

    // Initialize preview image
    const [previewImage, setPreviewImage] = useState(
        currentUser?.cover_pic || profile
    );
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    // Handle image selection + preview
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewImage(URL.createObjectURL(selectedFile));
        }
    };

    // Handle save button (trigger API)
    const handleSave = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error("Please select an image before saving!");
            return;
        }

        setIsUploading(true);
        try {
            await dispatch(coverPic({ userId, file })).unwrap();
            toast.success("Cover picture updated successfully!");
            onclose(); // close modal on success
        } catch (err) {
            console.error("Cover pic update failed:", err);
            toast.error("Failed to update cover picture!");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className={styles.updateProfileContainer}>
            <form className={styles.updateForm} onSubmit={handleSave}>
                <div className={styles.profileImageSection}>
                    <div className={styles.profilePicWrapper}>
                        <img
                            src={previewImage || profile}
                            alt="Cover"
                            className={styles.profilePic}
                        />
                        <label htmlFor="coverPicUpload" className={styles.editIcon}>
                            <FaEdit />
                        </label>
                        <input
                            type="file"
                            id="coverPicUpload"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                        />
                    </div>
                </div>

                <div className={styles.formActions}>
                    <button
                        type="submit"
                        className={styles.saveBtn}
                        disabled={isUploading}
                    >
                        {isUploading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                        type="button"
                        onClick={onclose}
                        className={styles.cancelBtn}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

UpdateCoverPic.propTypes = {
    onclose: PropTypes.func.isRequired,
};

export default UpdateCoverPic;
