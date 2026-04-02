import express from 'express'
import dotenv from 'dotenv'
import chalk from 'chalk';
import dns from 'node:dns'
import { connectDB } from './config/db.js';

dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config();

const app = express();

app.use(express.json())

// For Routes
const PORT = process.env.PORT || 5000;

const startServer = async () => {

  await connectDB();
  
  app.listen(PORT, () => {
    console.log( chalk.blue(`Server running on http://localhost:${PORT}`) );
  });
};

startServer();