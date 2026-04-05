const puppeteer = require('puppeteer');
const path = require('path');

const urls = [
  { url: 'https://lusion.co/', name: 'lusion.png' },
  { url: 'https://buzzworthystudio.com/', name: 'buzzworthy.png' },
  { url: 'https://www.e-t.studio/', name: 'etstudio.png' },
  { url: 'https://everything-you-need-minecraft-hub-d-nu.vercel.app/', name: 'minecraft.png' }
];

const dest = path.join(__dirname, '../frontend/public');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  for (let site of urls) {
    try {
      console.log(`Starting ${site.name}...`);
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 30000 });
      // wait a bit for any entry animations
      await new Promise(r => setTimeout(r, 4000));
      await page.screenshot({ path: path.join(dest, site.name) });
      console.log(`Saved ${site.name}`);
      await page.close();
    } catch (e) {
      console.error(`Failed for ${site.url}`, e);
    }
  }
  await browser.close();
  console.log('Screenshots done.');
})();
