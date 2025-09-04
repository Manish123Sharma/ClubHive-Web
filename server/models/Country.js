const mongoose = require('../db/connect');
const { Schema, SchemaTypes } = mongoose;
const { v4: uuidv4 } = require('uuid');

const CountrySchema = new Schema({
    country_id: {
        type: SchemaTypes.String,
        unique: true,
        index: true
    },
    geonameId: {
        type: Number,
        required: true,
        unique: true
    },
    countryCode: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    population: {
        type: Number
    },
    areaInSqKm: {
        type: Number
    },
    continent: {
        type: String
    }
},
    {
        timestamps: true
    }
);

CountrySchema.pre('save', async function (next) {
    if (!this.country_id) {
        this.country_id = uuidv4();
    }

    next();
});

const Country = mongoose.model('Country', CountrySchema);

module.exports = Country;