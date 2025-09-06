import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
// import axios from "axios";


const API_URL = "/auth";

const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        if (!decoded.exp) return false;
        const currentTime = Date.now() / 1000; // in seconds
        return decoded.exp < currentTime;
    } catch (err) {
        console.log(err);

        return true; // if invalid token, treat as expired
    }
};

// Register
export const register = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            const res = await API.post(`${API_URL}/register`, userData);
            console.log("REGISTER RESPONSE:", res.data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify({
                _id: res.data._id,
                fullName: res.data.fullName,
                email: res.data.email
            }));
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Login
export const login = createAsyncThunk(
    "auth/login",
    async (credentials, thunkAPI) => {
        try {
            const res = await API.post(`${API_URL}/login`, credentials);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify({
                _id: res.data._id,
                fullName: res.data.fullName,
                email: res.data.email
            }));

            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const getUserbyId = createAsyncThunk(
    'auth/getUserbyId',
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const res = await API.get(`${API_URL}/getUserbyId?query=${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch user");
        }
    }
);

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

if (token && isTokenExpired(token)) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: user ? JSON.parse(user) : null,
        token: !isTokenExpired(token) ? token : null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = {
                    _id: action.payload._id,
                    fullName: action.payload.fullName,
                    email: action.payload.email
                };
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Login Failed";
            })
            // register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = {
                    _id: action.payload._id,
                    fullName: action.payload.fullName,
                    email: action.payload.email
                };
                state.token = action.payload.token;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Register Failed";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
