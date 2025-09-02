const User = require('../models/User');
const fs = require('fs');
const multer = require("multer");
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ dest: "uploads/" });


exports.updateProfile = async (req, res) => {
    try {
        const {
            userId,
            ...updateFields
        } = req.body;
        const allowedUpdates = [
            "fullName",
            "email",
            "bio",
            "city",
            "state",
            "gender",
            "primarySport",
            "dateOfBirth",
            "phoneNumber"
        ];
        const safeUpdates = {};
        for (let key of allowedUpdates) {
            if (updateFields[key] !== undefined) {
                safeUpdates[key] = updateFields[key];
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: safeUpdates },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.uploadProfilePic = [
    upload.single("profile_pic"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ success: false, message: "No file uploaded" });
            }
            const filePath = req.file.path;

            // upload to cloudinary
            const result = await cloudinary.uploader.upload(filePath, {
                folder: "profile_pics",
            });

            // delete local file after upload
            // fs.unlinkSync(filePath);
            fs.unlink(filePath, err => {
                if (err) console.error("Failed to delete local file:", err);
            });

            // update user profile with Cloudinary URL
            const user = await User.findByIdAndUpdate(
                req.body.userId,
                { profile_pic: result.secure_url },
                { new: true }
            );

            res.json({ success: true, user });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
];