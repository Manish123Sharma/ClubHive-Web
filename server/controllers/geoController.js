const Country = require('../models/Country');
const City = require('../models/City');
const State = require('../models/State');
const axios = require('axios');

const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;

// 1. Update Countries
exports.updateCountries = async (req, res) => {
    try {
        const response = await axios.get(
            `http://api.geonames.org/countryInfoJSON?username=${GEONAMES_USERNAME}`
        );

        const countries = response.data.geonames;

        for (const c of countries) {
            await Country.findOneAndUpdate(
                { countryCode: c.countryCode },
                {
                    geonameId: c.geonameId,
                    name: c.countryName,
                    population: c.population,
                    areaInSqKm: c.areaInSqKm,
                    continent: c.continent
                },
                { upsert: true, new: true }
            );
        }

        res.json({ message: 'Countries updated successfully', count: countries.length });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update countries' });
    }
};

// 2. Update States (using children hierarchy API)
exports.updateStates = async (req, res) => {
    try {
        const { countryCode } = req.query; // ?countryCode=IN

        // 1. Find country in DB
        const country = await Country.findOne({ countryCode });
        if (!country) {
            return res.status(404).json({ error: 'Country not found in DB, update countries first' });
        }

        // 2. Use GeoNameId of country (NOT countryCode)
        const response = await axios.get(
            `http://api.geonames.org/childrenJSON?geonameId=${country.geonameId}&username=${GEONAMES_USERNAME}`
        );

        const states = response.data.geonames;

        for (const s of states) {
            await State.findOneAndUpdate(
                { geonameId: s.geonameId },
                {
                    name: s.name,
                    countryCode: s.countryCode
                },
                { upsert: true, new: true }
            );
        }

        res.json({ message: 'States updated successfully', count: states.length });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update states' });
    }
};


// 3. Update Cities
exports.updateCities = async (req, res) => {
    try {
        const { countryCode } = req.query; // pass ?countryCode=IN for India

        const response = await axios.get(
            `http://api.geonames.org/searchJSON?country=${countryCode}&featureClass=P&maxRows=1000&username=${GEONAMES_USERNAME}`
        );

        const cities = response.data.geonames;

        for (const c of cities) {
            await City.findOneAndUpdate(
                { geonameId: c.geonameId },
                {
                    name: c.name,
                    countryCode: c.countryCode,
                    population: c.population,
                    timezone: c.timezone
                },
                { upsert: true, new: true }
            );
        }

        res.json({ message: 'Cities updated successfully', count: cities.length });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update cities' });
    }
};