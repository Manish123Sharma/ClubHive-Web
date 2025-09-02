const Admin = require('../models/Admin');
const fs = require('fs');
const multer = require("multer");
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY_ADMIN,
    api_secret: process.env.CLOUDINARY_API_SECRET_ADMIN,
});

const upload = multer({ dest: "uploads/" });

exports.updateProfileAdmin = async (req, res) => {
    try {
        const {
            adminId,
            ...updateFields
        } = req.body;
        const allowedUpdates = [
            "fullName",
            "email",
            "city",
            "state",
            "gender",
            "dateOfBirth",
            "phoneNumber"
        ];
        const safeUpdates = {};
        for (let key of allowedUpdates) {
            if (updateFields[key] !== undefined) {
                safeUpdates[key] = updateFields[key];
            }
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(
            adminId,
            { $set: safeUpdates },
            { new: true, runValidators: true }
        );

        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.json(updatedAdmin);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



exports.uploadProfilePicAdmin = [
    upload.single("profile_pic"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ success: false, message: "No file uploaded" });
            }
            const filePath = req.file.path;

            // upload to cloudinary
            const result = await cloudinary.uploader.upload(filePath, {
                folder: "profile_pic",
            });
            

            // delete local file after upload
            // fs.unlinkSync(filePath);
            fs.unlink(filePath, err => {
                if (err) console.error("Failed to delete local file:", err);
            });

            // update admin profile with Cloudinary URL
            const admin = await Admin.findByIdAndUpdate(
                req.body.adminId,
                { profile_pic: result.secure_url },
                { new: true }
            );

            res.json({ success: true, admin });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
];