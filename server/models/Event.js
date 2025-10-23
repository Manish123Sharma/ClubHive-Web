const mongoose = require('../db/connect');
const { Schema, SchemaTypes } = mongoose;
const { v4: uuidv4 } = require('uuid');

const EventSchema = new Schema({
    event_id: {
        type: SchemaTypes.String,
        index: true
    },
    organizer_id: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: 'Admin'
    },
    city: {
        type: SchemaTypes.String,
        required: true
    },
    state: {
        type: SchemaTypes.String,
        required: true
    },
    country: {
        type: SchemaTypes.String,
        required: true
    },
    name: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },
    category: {
        type: SchemaTypes.String,
        required: true
    },
    description: {
        type: SchemaTypes.String,
        required: true
    },
    eventDate: {
        type: SchemaTypes.Date,
        required: true
    },
    eventTime: {
        type: SchemaTypes.String,
        required: true,
        match: /^\d{2}:[0-5]\d:[0-5]\d$/,
        default: '00:00:00'
    },
    registrationStart: {
        type: SchemaTypes.Date,
        required: true
    },
    registrationEnd: {
        type: SchemaTypes.Date,
        required: true
    },
    registrationEndTime: {
        type: SchemaTypes.String,
        required: true,
        match: /^\d{2}:[0-5]\d:[0-5]\d$/,
        default: '00:00:00'
    },
    price: {
        type: SchemaTypes.String,
        required: true
    },
    photos: [
        {
            type: SchemaTypes.String,
            default: ''
        }
    ]
},
    {
        timestamps: true
    }
);

EventSchema.pre('save', async function (next) {
    // Generate unique event_id if not present
    if (!this.event_id) {
        this.event_id = uuidv4();
    }

    next();
});

const Event = mongoose.model('Events', EventSchema);

module.exports = Event;