const cron = require('node-cron');
const geoController = require('../controllers/geoController');
const Country = require('../models/Country');


// Utility: check if last update was older than X months
function needsUpdate(lastUpdated, months) {
    if (!lastUpdated) return true; // never updated
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - months);
    return lastUpdated < cutoff;
}

/**
 * 1. Update Countries every 6 months
 * Runs: Jan 1 & Jul 1 @ midnight
 */
cron.schedule('0 0 1 1,7 *', async () => {
    console.log('🌍 Running 6-monthly GeoNames Country update...');
    try {
        const sample = await Country.findOne({});
        if (needsUpdate(sample?.updatedAt, 6)) {
            await geoController.updateCountries(
                { query: {} },
                { json: (msg) => console.log(msg) }
            );
            console.log('✅ Countries updated!');
        } else {
            console.log('⏭ Skipping country update (data is fresh).');
        }
    } catch (err) {
        console.error('❌ Country update failed:', err.message);
    }
});

/**
 * 2. Update States & Cities every 6 months
 * Runs: Feb 1 & Aug 1 @ midnight
 */
cron.schedule('0 0 1 2,8 *', async () => {
    console.log('🌍 Running 6-monthly GeoNames States & Cities update...');
    try {
        const countries = await Country.find({});
        for (const country of countries) {
            console.log(`➡️ Checking ${country.name} (${country.countryCode})`);

            // Check if this country's states/cities need refreshing
            const state = await State.findOne({ countryCode: country.countryCode });
            const city = await City.findOne({ countryCode: country.countryCode });

            if (
                needsUpdate(state?.updatedAt, 6) ||
                needsUpdate(city?.updatedAt, 6)
            ) {
                console.log(`🔄 Updating states & cities for ${country.name}...`);

                try {
                    await geoController.updateStates(
                        { query: { countryCode: country.countryCode } },
                        {
                            json: (msg) =>
                                console.log(`States updated for ${country.countryCode}:`, msg)
                        }
                    );

                    await geoController.updateCities(
                        { query: { countryCode: country.countryCode } },
                        {
                            json: (msg) =>
                                console.log(`Cities updated for ${country.countryCode}:`, msg)
                        }
                    );
                } catch (err) {
                    console.error(
                        `❌ Failed updating ${country.name} (${country.countryCode}):`,
                        err.message
                    );
                }
            } else {
                console.log(`⏭ Skipping ${country.name}, data is fresh.`);
            }
        }
        console.log('✅ States & Cities update job completed!');
    } catch (err) {
        console.error('❌ States & Cities update failed:', err.message);
    }
});
