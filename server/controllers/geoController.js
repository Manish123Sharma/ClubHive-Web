const { seedGeoData } = require('../services/geoServices');

exports.updateAll = async (req, res) => {
    try {
        await seedGeoData();
    } catch (error) {
        console.error('GeoController Error:', error);
        res.status(500).json({ error: 'Failed to update geo data' });
    }
};