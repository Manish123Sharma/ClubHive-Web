const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const Country = require('../models/Country');
const State = require('../models/State');
const City = require('../models/City');

async function seedGeoData() {
    try {
        const url = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/refs/heads/master/json/countries%2Bstates%2Bcities.json';
        const { data } = await axios.get(url);

        for (const country of data) {

            const countryDoc = await Country.findOneAndUpdate(
                { iso2: country.iso2 },
                {
                    country_id: uuidv4(),
                    id: country.id,
                    name: country.name,
                    iso3: country.iso3,
                    iso2: country.iso2,
                    numeric_code: country.numeric_code,
                    phonecode: country.phonecode,
                    capital: country.capital,
                    currency: country.currency,
                    currency_name: country.currency_name,
                    currency_symbol: country.currency_symbol,
                    tld: country.tld,
                    native: country.native,
                    region: country.region,
                    region_id: country.region_id,
                    subregion: country.subregion,
                    subregion_id: country.subregion_id,
                    nationality: country.nationality,
                    latitude: country.latitude,
                    longitude: country.longitude,
                    emoji: country.emoji,
                    emojiU: country.emojiU,
                },
                { new: true, upsert: true }
            );

            for (const state of country.states) {
                const stateDoc = await State.findOneAndUpdate(
                    { iso2: state.iso2, country_id: countryDoc.country_id },
                    {
                        state_id: uuidv4(),
                        name: state.name,
                        iso2: state.iso2,
                        latitude: state.latitude,
                        longitude: state.longitude,
                        country_id: countryDoc.country_id,
                    },
                    { new: true, upsert: true }
                );

                for (const city of state.cities) {
                    await City.findOneAndUpdate(
                        { name: city.name, state_id: stateDoc.state_id },
                        {
                            city_id: uuidv4(),
                            name: city.name,
                            latitude: city.latitude,
                            longitude: city.longitude,
                            state_id: stateDoc.state_id,
                            country_id: countryDoc.country_id,
                        },
                        { new: true, upsert: true }
                    );
                }
            }
        }

        console.log('🌍 Countries, States, and Cities seeded successfully!');
    } catch (error) {
        console.error('❌ Error seeding geo data:', error);
    }
}

module.exports = { seedGeoData };
