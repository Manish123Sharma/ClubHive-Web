const mongoose = require('../db/connect');
const { Schema, SchemaTypes } = mongoose;
const { v4: uuidv4 } = require('uuid');

const StateSchema = new Schema({
    state_id: {
        type: SchemaTypes.String,
        unique: true,
        index: true
    },
    geonameId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });

StateSchema.pre('save', async function (next) {
    if (!this.state_id) {
        this.state_id = uuidv4();
    }

    next();
});

const State = mongoose.model('State', StateSchema);

module.exports = State;