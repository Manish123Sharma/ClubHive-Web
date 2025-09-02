const User = require('../models/User');
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