import puppeteer from 'puppeteer';
import { saveProspectToMongoDB } from '../schema/schema';

const env = require('dotenv').config().parsed;

// Configuration
const prospectList = [
  {
    name: 'Rajia Abdelaziz',
    linkedin: 'https://www.linkedin.com/in/rajiaabdelaziz'
  },
  // Add the remaining prospect information here
];

const loginEmail = env.LINKEDIN_EMAIL;
const loginPassword = env.LINKEDIN_PASSWORD;

// Puppeteer login and scraping function
export async function scrapeLinkedin() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  try {
    // Login to LinkedIn
    // await page.goto('https://www.linkedin.com/login');
    // await page.type('#username', loginEmail);
    // await page.type('#password', loginPassword);
    // await page.click('button[type="submit"]');
    // console.log("loging in...")
    // await page.waitForNavigation({ timeout: 0 });
    // console.log("Login successful")

    //   // Scrape prospect information
    // Scrape prospect information
    for (const prospect of prospectList) {
      await page.goto(prospect.linkedin);
      await page.waitForSelector('.pv-top-card__photo', { timeout: 0 }); // Increase the timeout duration

      // Extract prospect information
      const name = await page.$eval('.pv-top-card--list > li:first-child', (el) => el.textContent?.trim());
      const lastName = name?.split(' ')[1];
      const profilePicture = await page.$eval('.pv-top-card__photo', (el) => el.getAttribute('src') || '');

      // Save prospect information to MongoDB
      const prospectData = {
        name,
        lastName,
        profilePicture: profilePicture || null,
      };
      console.log(prospectData);
      await saveProspectToMongoDB(prospectData);
      console.log(`Saved prospect: ${name}`);
    }

  } catch (error) {
    console.error('An error occurred during scraping:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
}
