const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const router = express.Router();

//secret key
const SECRET_KEY = 'my_secret_key';



// Register a new user
router.post('/register', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'User already exists' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'User registered' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });




  
// User login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  module.exports = router;