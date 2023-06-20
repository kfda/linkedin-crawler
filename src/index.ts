import { scrapeLinkedin } from './services/puppeteer';

// Run the scraper every 4 minutes
setInterval(scrapeLinkedin, 4 * 60 * 1000);