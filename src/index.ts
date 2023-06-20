import { scrapeLinkedin } from './services/puppeteer';
import mongoose from 'mongoose';

const env = require('dotenv').config().parsed;


// Connect to MongoDB using Mongoose
// mongoose.connect(env.DATABASE_URL);
 
// const db = mongoose.connection; 

// // Check for DB connection 
// db.on('error', () => {
//   console.error.bind(console, 'MongoDB connection error:') 
//   process.exit(1);
// });
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });


// Run the scraper every 4 minutes
// setInterval(scrapeLinkedin, 4 * 60 * 1000); 
scrapeLinkedin();