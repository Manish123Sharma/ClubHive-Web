const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
require('./db/connect');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));