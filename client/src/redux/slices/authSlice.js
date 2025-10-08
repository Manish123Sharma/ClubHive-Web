import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
// import axios from "axios";


const API_URL = "/auth";


const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        if (!decoded.exp) return false;
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (err) {
        console.log(err);

        return true;
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
                // fullName: res.data.fullName,
                // email: res.data.email
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
                // fullName: res.data.fullName,
                // email: res.data.email
            }));

            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);


//Get User By ID
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
            console.log(res.data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch user");
        }
    }
);


//Get Admin By ID
export const getAdminbyId = createAsyncThunk(
    'auth/getAdminbyId',
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const res = await API.get(`${API_URL}/getAdminbyId?query=${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch Admin");
        }
    }
);

//Update User Info
export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async (formData, { rejectWithValue }) => {
        try {
            // const token = localStorage.getItem("token");
            console.log(formData);
            const res = await API.post(`/profile/updateProfile`, formData);
            console.log(res);

            // Update user info in localStorage
            localStorage.setItem("currentUser", JSON.stringify(res.data));

            return res.data;
        } catch (err) {
            console.log(err);

            return rejectWithValue(err.response?.data || "Profile update failed");
        }
    }
);

//Update User Profile Pic
export const profilePic = createAsyncThunk(
    'profile/profilePic',
    async ({ userId, file }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('profile_pic', file);

            const token = localStorage.getItem("token");
            const res = await API.post(`/profile/profilePic`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            // Update localStorage with new user data
            localStorage.setItem("currentUser", JSON.stringify(res.data.user));

            return res.data.user;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Profile pic upload failed");
        }
    }
);

let token = localStorage.getItem("token");
let user = localStorage.getItem("user");

if (token && isTokenExpired(token)) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    token = null;
    user = null;
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: user ? JSON.parse(user) : null,
        token: !isTokenExpired(token) ? token : null,
        loading: false,
        error: null,
        admin: null,
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
            }).addCase(getUserbyId.pending, (state) => {
                state.loading = true;
                state.error = null;
            }).addCase(getUserbyId.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            }).addCase(getUserbyId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'User Fetching Failed'
            }).addCase(getAdminbyId.pending, (state) => {
                state.loading = true;
                state.error = null;
            }).addCase(getAdminbyId.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload;
            }).addCase(getAdminbyId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Admin Fetching Failed'
            }).addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.success = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.success = "Profile updated successfully";
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Upload Profile Picture
            .addCase(profilePic.pending, (state) => {
                state.loading = true;
                state.success = null;
            })
            .addCase(profilePic.fulfilled, (state, action) => {
                state.loading = false;
                state.user = { ...state.user, profile_pic: action.payload.profile_pic };
                state.success = "Profile picture updated successfully";
            })
            .addCase(profilePic.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
