import axios from "axios";

const BASE_URL = "http://localhost:3000/geo";

export const fetchCountries = async () => {
    const res = await axios.get(`${BASE_URL}/getAllCountry`);
    return res.data;
};

export const fetchStates = async (countryId) => {
    const res = await axios.get(`${BASE_URL}/getStatebyCountry?query=${countryId}`);
    return res.data;
};

export const fetchCities = async (stateId) => {
    const res = await axios.get(`${BASE_URL}/getCitybyState?query=${stateId}`);
    return res.data;
};