const User = require('../models/User');
const Admin = require('../models/Admin');
const Events = require('../models/Event');
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

        const { password: _, ...userWithoutPass } = updatedUser.toObject();

        res.json(userWithoutPass);
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


            const result = await cloudinary.uploader.upload(filePath, {
                folder: "profile_pic",
            });

            fs.unlink(filePath, err => {
                if (err) console.error("Failed to delete local file:", err);
            });


            const user = await User.findByIdAndUpdate(
                req.body.userId,
                { profile_pic: result.secure_url },
                { new: true }
            );

            const { password: _, ...userWithoutPass } = user.toObject();

            res.json({ success: true, userWithoutPass });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
];


exports.uploadCoverPic = [
    upload.single("cover_pic"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ success: false, message: "No file uploaded" });
            }
            const filePath = req.file.path;


            const result = await cloudinary.uploader.upload(filePath, {
                folder: "cover_pic",
            });

            fs.unlink(filePath, err => {
                if (err) console.error("Failed to delete local file:", err);
            });


            const user = await User.findByIdAndUpdate(
                req.body.userId,
                { cover_pic: result.secure_url },
                { new: true }
            );

            const { password: _, ...userWithoutPass } = user.toObject();

            res.json({ success: true, userWithoutPass });

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
];


exports.updateFollwing = async (req, res) => {
    try {
        const { userId, adminId } = req.body;

        if (!userId || !adminId) {
            return res.status(400).json({ message: "userId and adminId are required" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const admin = await Admin.findById(adminId);
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        const isFollowing = user.following.some(
            (id) => id.toString() === admin._id.toString()
        );

        if (isFollowing) {
            // Unfollow
            user.following = user.following.filter(
                (id) => id.toString() !== admin._id.toString()
            );
            await user.save();

            return res.status(200).json({
                message: "Unfollowed successfully"
            });
        } else {
            // Follow
            user.following.push(admin._id); // ✅ only push the ID
            await user.save();

            return res.status(200).json({
                message: "Followed successfully"
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateEventParticipate = async (req, res) => {
    try {

        const { userId, eventId } = req.body;

        // Validate input
        if (!userId || !eventId) {
            return res.status(400).json({ message: "userId and eventId are required" });
        }

        // Find user and event
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const event = await Events.findById(eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });

        // Check if already participated
        const alreadyParticipated = user.eventsParticipated.includes(event._id);
        if (alreadyParticipated) {
            return res.status(400).json({ message: "User already participated in this event" });
        }

        // Add event to user's participated list
        user.eventsParticipated.push(event._id);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Event participation updated successfully"
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateFavourites = async (req, res) => {};