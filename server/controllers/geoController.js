const City = require('../models/City');
const Country = require('../models/Country');
const State = require('../models/State');
const { seedGeoData } = require('../services/geoServices');

exports.updateAll = async (req, res) => {
    try {
        await seedGeoData();
        res.status(200).json({
            message: "Updated Successfully"
        });
    } catch (error) {
        console.error('GeoController Error:', error);
        res.status(500).json({ error: 'Failed to update geo data' });
    }
};



exports.getAllCountry = async (req, res) => {
    try {
        const country = await Country.find();
        res.status(200).json(country);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getAllState = async (req, res) => {
    try {
        const state = await State.find();
        res.status(200).json(state);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllCity = async (req, res) => {
    try {
        const city = await City.find();
        res.status(200).json(city);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getStatebyCountry = async (req, res) => {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).json({ message: "Query is required" });
        }

        const state = await State.find({
            $or: [
                { country_id: { $regex: query, $options: "i" } }
            ]
        });

        res.json(state);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCitybyState = async (req, res) => {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).json({ message: "Query is required" });
        }

        const city = await City.find({
            $or: [
                { state_id: { $regex: query, $options: "i" } }
            ]
        });

        res.json(city);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};