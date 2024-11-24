const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtProvider = require('../config/jwtProvider');

exports.signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = await User.create({ username, password, role });
    const token = jwtProvider.generateToken(user._id);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
  
      const token = jwtProvider.generateToken(user._id);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  