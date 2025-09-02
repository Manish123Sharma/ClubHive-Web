const mongoose = require('../db/connect');
const { Schema, SchemaTypes } = mongoose;
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const AdminSchema = new Schema({
    admin_id: {
        type: SchemaTypes.String,
        unique: true,
        index: true
    },
    fullName: {
        type: SchemaTypes.String,
        required: true,
        index: true,
        trim: true
    },
    password: {
        type: SchemaTypes.String,
        required: true,
        minlength: 6,
        index: true,
    },
    email: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
        match: /.+@.+\..+/,
        index: true,
        lowercase: true
    },
    profile_pic: {
        type: SchemaTypes.String,
        default: ''
    },
    city: {
        type: SchemaTypes.String,
        required: true,
    },
    state: {
        type: SchemaTypes.String,
        required: true,
    },
    gender: {
        type: SchemaTypes.String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    two_factor_auth: {
        type: SchemaTypes.Number,
        required: true,
        default: false
    },
    phoneNumber: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
        index: true
    },
    dateOfBirth: {
        type: SchemaTypes.Date,
        required: true
    },
    eventsParticipated: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Events'
        }
    ]
},
    {
        timestamps: true
    }
);

AdminSchema.pre('save', async function (next) {
    // Generate unique admin_id if not present
    if (!this.admin_id) {
        this.admin_id = uuidv4();
    }

    // Trim and clean name
    if (this.fullName) {
        this.fullName = this.fullName.trim();
    }

    if (!this.isModified("password")) { return next(); }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

// Compare entered password with hashed password
AdminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;