const express = require('express');const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');

const app = express();
const PORT = process.env.PORT || 3000;



// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);  // User authentication
app.use('/api/jobs', jobRoutes);    // Print job management


// MongoDB connection
mongoose.connect('mongodb://0.0.0.0:27017/print_agent', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });