import { scrapeLinkedin } from './services/puppeteer';
import mongoose from 'mongoose';

const env = require('dotenv').config().parsed;

// Run the scraper every 4 minutes
setInterval(scrapeLinkedin, 4 * 60 * 1000); 