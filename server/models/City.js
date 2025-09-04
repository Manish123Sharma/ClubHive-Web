const mongoose = require('../db/connect');
const { Schema, SchemaTypes } = mongoose;
const { v4: uuidv4 } = require('uuid');

const CitySchema = new Schema({
    city_id: {
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
    },
    population: {
        type: Number
    },
    timezone: {
        type: String
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