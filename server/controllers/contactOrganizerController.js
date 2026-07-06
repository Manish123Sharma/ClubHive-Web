const User = require('../models/User');
const Admin = require('../models/Admin');
const Query = require('../models/Query');
const fs = require('fs');
const nodemailer = require('nodemailer');

exports.contactOrganizer = async (req, res) => {
    try {

        const {
            userId,
            adminId,
            fullName,
            email,
            phoneNumer,
            message,
            enquiryType
        } = req.body;

        if (!fullName || !email || !phoneNumer || !enquiryType || !message) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        if (!adminId) {
            return res.status(400).json({ message: "userId is required" });
        }

        

        const admin = await Admin.findById(adminId);
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        const query = await Query.create({
            organizer_id: adminId,
            user_id: userId,
            fullName,
            email,
            phoneNumer,
            enquiryType,
            message,
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.CONTACT_EMAIL,
                pass: process.env.CONTACT_EMAIL_PASS,
            },
        });

        const mailOptions = {
            to: admin.email,
            from: process.env.CONTACT_EMAIL,
            subject: `New ${enquiryType} enquiry from ${fullName}`,
            html: `
                <h3>New Contact Message</h3>
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Contact Number:</strong> ${contactNumber}</p>
                <p><strong>Enquiry Type:</strong> ${enquiryType}</p>09-
                <p><strong>Message:</strong><br>${message}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "Message sent successfully and saved in database.",
            data: query,
        });

        res.status(401).json({
            success: false,
            message: "Message not send. Error!!!",
            data: query
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};