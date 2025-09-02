const User = require('../models/User');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

exports.registerUser = async (req, res) => {
    try {
        const {
            fullName,
            password,
            email,
            city,
            state,
            gender,
            phoneNumber,
            primarySport,
            dateOfBirth,
        } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await User.create({
            fullName,
            password,
            email,
            city,
            state,
            gender,
            phoneNumber,
            primarySport,
            dateOfBirth
        });
        res.status(201).json({
            _id: user.id,
            fullName: user.fullName,
            email: user.email,
            city: user.city,
            state: user.state,
            phoneNumber: user.phoneNumber,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email
        });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                fullName: user.fullName,
                email: user.email,
                token: generateToken(user.id)
            });
        } else {
            res.status(401).json({
                message: 'Invalid email or password'
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const passMatch = await user.matchPassword(oldPassword);
        if (!passMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }
        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.registerAdmin = async (req, res) => {
    try {
        const {
            fullName,
            password,
            email,
            city,
            state,
            gender,
            phoneNumber,
            primarySport,
            dateOfBirth,
        } = req.body;
        const adminExists = await Admin.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ message: "Admin already exists" });
        }
        const admin = await Admin.create({
            fullName,
            password,
            email,
            city,
            state,
            gender,
            phoneNumber,
            primarySport,
            dateOfBirth
        });
        res.status(201).json({
            _id: admin.id,
            fullName: admin.fullName,
            email: admin.email,
            city: admin.city,
            state: admin.state,
            phoneNumber: admin.phoneNumber,
            dateOfBirth: admin.dateOfBirth,
            gender: admin.gender
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({
            email
        });
        if (admin && (await admin.matchPassword(password))) {
            res.json({
                _id: admin.id,
                fullName: admin.fullName,
                email: admin.email,
                token: generateToken(admin.id)
            });
        } else {
            res.status(401).json({
                message: 'Invalid email or password'
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

exports.updatePasswordAdmin = async (req, res) => {
    try {
        const { adminId, oldPassword, newPassword } = req.body;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        const passMatch = await admin.matchPassword(oldPassword);
        if (!passMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }
        admin.password = newPassword;
        await admin.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};