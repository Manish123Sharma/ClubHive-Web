const mongoose = require('../db/connect');
const { Schema, SchemaTypes } = mongoose;
const { v4: uuidv4 } = require('uuid');

const QuerySchema = new Schema({
    query_id: {
        type: SchemaTypes.String,
        index: true
    },
    organizer_id: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: 'Admin'
    },
    user_id: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },
    fullName: {
        type: SchemaTypes.String,
        required: true,
        index: true,
        trim: true
    },
    email: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
        match: /.+@.+\..+/,
        index: true,
        lowercase: true
    },
    phoneNumber: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
        index: true
    },
    message: {
        type: SchemaTypes.String,
        required: true,
    },
    enquiryType: {
        type: SchemaTypes.String,
        required: true,
        enum: ["Event", "My Booking"]
    }
},
    {
        timestamps: true
    }
);

QuerySchema.pre('save', async function (next) {

    if (!this.user_id) {
        this.user_id = uuidv4();
    }

    next();

});

const Query = mongoose.model('Queries', QuerySchema);

module.exports = Query;