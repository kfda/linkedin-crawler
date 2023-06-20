import puppeteer from 'puppeteer';
import { saveProspectToMongoDB } from '../schema/schema';

// Configuration
const prospectList = [
  {
    name: 'Rajia Abdelaziz',
    linkedin: 'https://www.linkedin.com/in/rajiaabdelaziz'
  },
  // Add the remaining prospect information here
];

const loginEmail = 'your_linkedin_email@example.com';
const loginPassword = 'your_linkedin_password';

// Puppeteer login and scraping function
export async function scrapeLinkedin() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Login to LinkedIn
    await page.goto('https://www.linkedin.com/login');
    await page.type('#username', loginEmail);
    await page.type('#password', loginPassword);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    // Scrape prospect information
    for (const prospect of prospectList) {
      await page.goto(prospect.linkedin);
      await page.waitForSelector('.pv-top-card__photo');

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
