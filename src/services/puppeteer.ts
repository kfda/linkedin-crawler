import puppeteer from 'puppeteer';
import { saveProspectToMongoDB } from '../schema/schema';

const env = require('dotenv').config().parsed;

const prospectList = [
  {
    name: 'Rajia Abdelaziz',
    linkedin: 'https://www.linkedin.com/in/rajiaabdelaziz'
  },
  // Add the remaining prospect information here
];

const loginEmail = env.LINKEDIN_EMAIL;
const loginPassword = env.LINKEDIN_PASSWORD;

export async function scrapeLinkedin() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  try {
    await page.goto('https://www.linkedin.com/login');
    await page.type('#username', loginEmail);
    await page.type('#password', loginPassword);
    await page.click('button[type="submit"]');
    console.log("loging in...")
    await page.waitForNavigation({ timeout: 0 });
    console.log("Login successful")

    for (const prospect of prospectList) {
      await page.goto(prospect.linkedin);
      await page.waitForSelector('.pv-top-card__photo', { timeout: 0 }); // Wait for the profile picture to load

      // Extract prospect information
      const name = await page.$eval('.pv-top-card--list > li:first-child', (el) => el.textContent?.trim());
      const lastName = name?.split(' ')[1];
      const profilePicture = await page.$eval('.pv-top-card__photo', (el) => el.getAttribute('src') || '');

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
    await browser.close();
  }
}
