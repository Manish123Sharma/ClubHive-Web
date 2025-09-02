const mongoose = require('../db/connect');
const { Schema, SchemaTypes } = mongoose;
const { v4: uuidv4 } = require('uuid');

const EventSchema = new Schema({
    event_id: {
        type: SchemaTypes.String,
        unique: true,
        index: true
    },
    name: {
        type: SchemaTypes.String,
        required: true
    },
    category: {
        type: SchemaTypes.String,
        required: true
    }
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