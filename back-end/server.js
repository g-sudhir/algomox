require('dotenv').config({path : "./config.env"});
const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();


app.use(express.json());
app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);


connectDB();
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
