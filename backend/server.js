// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes'); // Import the fileRoutes module
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/custom_app');

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Use the fileRoutes for file-related routes
app.use('/files', fileRoutes);

// Use the userRoutes for user-related routes
app.use('/users', userRoutes);

app.use('/appointments', appointmentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
