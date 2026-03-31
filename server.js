import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import chalk from 'chalk';
import dns from 'node:dns'


dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config();

const app = express();
app.use(express.json()); // Allows Express to parse JSON bodies from Postman

// 1. Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error(chalk.red('Database connection error:', err)));

// 2. A simple Test Route
app.get('/', (req, res) => {
  res.send('Server is running and connected!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log( chalk.blue(`Server running on http://localhost:${PORT}`) );
});