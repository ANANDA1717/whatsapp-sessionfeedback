const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const sessionRoutes = require('./routes/session');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/session', sessionRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
