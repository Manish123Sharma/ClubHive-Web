const mongoose = require('../db/connect');
const { Schema, SchemaTypes } = mongoose;
const { v4: uuidv4 } = require('uuid');

const CountrySchema = new Schema({
    country_id: {
        type: SchemaTypes.String,
        unique: true,
        index: true,
        default: uuidv4
    },
    id: {
        type: SchemaTypes.Number,
        // unique: true,
        // required: true
    },
    name: {
        type: SchemaTypes.String,
        required: true
    },
    iso3: {
        type: SchemaTypes.String,
        required: true
    },
    iso2: {
        type: SchemaTypes.String,
        required: true
    },
    numeric_code: {
        type: SchemaTypes.String,
        required: true
    },
    phonecode: {
        type: SchemaTypes.String,
        required: true
    },
    capital: {
        type: SchemaTypes.String,
        required: true
    },
    currency: {
        type: SchemaTypes.String,
        required: true,
        // unique: true
    },
    currency_name: {
        type: SchemaTypes.String,
        required: true,
        // unique: true
    },
    currency_symbol: {
        type: SchemaTypes.String,
        required: true,
        // unique: true
    },
    tld: {
        type: SchemaTypes.String,
        // required: true
    },
    native: {
        type: SchemaTypes.String,
        // required: true
    },
    region: {
        type: SchemaTypes.String,
        required: true
    },
    region_id: {
        type: SchemaTypes.String,
        required: true
    },
    subregion: {
        type: SchemaTypes.String,
        required: true
    },
    subregion_id: {
        type: SchemaTypes.String,
        required: true,
    },
    nationality: {
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
    emoji: {
        type: SchemaTypes.String,
        // required: true
    },
    emojiU: {
        type: SchemaTypes.String,
        // required: true
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