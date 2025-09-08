const Event = require('../models/Event');
const fs = require('fs');
const multer = require("multer");
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY_EVENT,
    api_secret: process.env.CLOUDINARY_API_SECRET_EVENT,
});

const upload = multer({ dest: "uploads/" });

exports.createEvent = [
    upload.array("photos", 5),
    async (req, res) => {
        try {
            const {
                organizer_id,
                name,
                category,
                description,
                eventDate,
                eventTime,
                registrationStart,
                registrationEnd,
                registrationEndTime,
                city,
                state,
                country,
                price
            } = req.body;

            let photoUrls = [];
            if (req.files && req.files.length > 0) {
                for (const file of req.files) {
                    const result = await cloudinary.uploader.upload(file.path, {
                        folder: "photos",
                    });
                    photoUrls.push(result.secure_url);
                    fs.unlink(file.path, err => {
                        if (err) console.error("Failed to delete local file:", err);
                    });
                }
            }

            const event = await Event.create({
                organizer_id,
                city,
                state,
                country,
                name,
                category,
                description,
                eventDate,
                eventTime,
                registrationStart,
                registrationEnd,
                registrationEndTime,
                photos: photoUrls,
                price
            });

            await event.save();

            res.status(201).json({
                _id: event.id,
                name: event.name
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
];

exports.deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.body;
        const event = await Event.deleteOne({ _id: eventId });
        if (event.deletedCount === 0) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(201).json({
            "message": "Deleted Successfully"
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateEvent = [
    upload.array("photos", 5),
    async (req, res) => {
        try {
            const { eventId } = req.body;
            const {
                name,
                category,
                description,
                eventDate,
                eventTime,
                registrationEnd,
                registrationEndTime,
                deletePhotos
            } = req.body;

            const event = await Event.findById(eventId);
            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }

            // Update fields
            if (name) event.name = name;
            if (category) event.category = category;
            if (description) event.description = description;
            if (eventDate) event.eventDate = eventDate;
            if (eventTime) event.eventTime = eventTime;
            if (registrationEnd) event.registrationEnd = registrationEnd;
            if (registrationEndTime) event.registrationEndTime = registrationEndTime;

            // Handle photo deletions
            if (deletePhotos && Array.isArray(deletePhotos)) {
                for (const photoUrl of deletePhotos) {
                    // remove from cloudinary
                    const publicId = photoUrl.split("/").slice(-2).join("/").split(".")[0];
                    try {
                        await cloudinary.uploader.destroy(publicId);
                    } catch (err) {
                        console.error("Failed to delete from Cloudinary:", err);
                    }
                    // remove from event.photos
                    event.photos = event.photos.filter(p => p !== photoUrl);
                }
            }

            // Handle new photo uploads
            if (req.files && req.files.length > 0) {
                for (const file of req.files) {
                    const result = await cloudinary.uploader.upload(file.path, {
                        folder: "photos",
                    });
                    event.photos.push(result.secure_url);

                    // delete local file
                    fs.unlink(file.path, err => {
                        if (err) console.error("Failed to delete local file:", err);
                    });
                }
            }

            await event.save();

            res.status(200).json({
                message: "Event updated successfully",
                event
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
];

exports.getAll = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getEventbyName = async (req, res) => {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).json({ message: "Query is required" });
        }

        const events = await Event.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
                { city: { $regex: query, $options: "i" } },
                { country: { $regex: query, $options: "i" } }
            ]
        });

        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getEventbyCity = async (req, res) => {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).json({ message: "Query is required" });
        }

        const events = await Event.find({
            $or: [
                { city: { $regex: query, $options: "i" } }
            ]
        });

        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getEventbyCountry = async (req, res) => {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).json({ message: "Query is required" });
        }

        const events = await Event.find({
            $or: [
                { country: { $regex: query, $options: "i" } }
            ]
        });

        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getEventbyState = async (req, res) => {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).json({ message: "Query is required" });
        }

        const events = await Event.find({
            $or: [
                { state: { $regex: query, $options: "i" } }
            ]
        });

        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getEventbyId = async (req, res) => {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).json({ message: "Query is required" });
        }
        const event = await Event.findById(query);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};