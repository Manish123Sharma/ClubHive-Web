const mongoose = require('../db/connect');
const { Schema, SchemaTypes } = mongoose;
const { v4: uuidv4 } = require('uuid');

const StateSchema = new Schema({
    state_id: {
        type: SchemaTypes.String,
        unique: true,
        index: true,
        default: uuidv4
    },
    id: {
        type: SchemaTypes.Number,
        // required: true,
        // unique: true
    },
    name: {
        type: SchemaTypes.String,
        required: true
    },
    iso2: {
        type: SchemaTypes.String,
        required: true
    },
    iso3166_2: {
        type: SchemaTypes.String,
        required: true
    },
    latitude: {
        type: SchemaTypes.String,
        required: true
    },
    longitude: {
        type: SchemaTypes.String,
        required: true
    },
    type: {
        type: SchemaTypes.String,
        // required: true
    },
    country_id: {
        type: SchemaTypes.String,
        required: true,
        index: true
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