const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const eventRoutes = require('./routes/eventRoutes');
const geoRoutes = require('./routes/geoRoutes');
const cors = require('cors'); 

dotenv.config();
require('./db/connect');

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true, // allow cookies/auth headers
}));


app.use(express.json());
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/event', eventRoutes);
app.use('/geo', geoRoutes);

// require('./services/geoServices');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));