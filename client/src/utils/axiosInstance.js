import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000", // adjust to your backend
});

// Add token automatically to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
