const mongoose = require('../db/connect');
const { Schema, SchemaTypes } = mongoose;
const { v4: uuidv4 } = require('uuid');

const CitySchema = new Schema({
    city_id: {
        type: SchemaTypes.String,
        unique: true,
        index: true,
        default: uuidv4
    },
    id: {
        type: SchemaTypes.Number,
    },
    name: {
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
    state_id: {   // 👈 Foreign key (UUID from State)
        type: SchemaTypes.String,
        required: true,
        index: true
    },
    country_id: {  // 👈 Foreign key (UUID from Country)
        type: SchemaTypes.String,
        required: true,
        index: true
    }
},
    {
        timestamps: true
    }
);

CitySchema.pre('save', async function (next) {
    if (!this.city_id) {
        this.city_id = uuidv4();
    }

    next();
});

const City = mongoose.model('City', CitySchema);

module.exports = City;