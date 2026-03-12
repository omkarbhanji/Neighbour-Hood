const express = require('express'); 
const mongoose = require('mongoose');
const cors = require("cors");

const areaRoutes = require('./routes/areaRoutes');
const authRoutes = require('./routes/authRoutes');
const issueRoutes = require('./routes/issueRoutes');
const voteRoutes = require('./routes/voteRoutes');
const { protect } = require('./middleware/authMiddleware');


const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/area', areaRoutes);
app.use('/api/issue', protect, issueRoutes);
app.use('/api/vote', protect, voteRoutes);

app.use('/api', authRoutes);

module.exports = app;