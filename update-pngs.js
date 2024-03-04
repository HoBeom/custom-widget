const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs').promises;

async function screenshotHTML(dir) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    const entries = await fs.readdir(dir, {withFileTypes: true});
    
    for (const entry of entries) {
        // Skip node_modules directory
        if (entry.isDirectory() && entry.name === 'node_modules') {
            continue;
        }

        if (entry.isDirectory()) {
            await screenshotHTML(path.join(dir, entry.name)); // Recursive call for subdirectories
        } else if (entry.name === 'index.html') {
            const htmlPath = path.join(dir, entry.name);
            const outputPath = path.join(dir, 'widget.png');
            // Correcting file path for Windows compatibility
            const filePath = `file://${path.resolve(htmlPath)}`;
            await page.goto(filePath, {waitUntil: 'networkidle2'});
            console.log('Current URL:', page.url());
            await page.waitForTimeout(5000); 
            const clip = await page.evaluate(() => {
                const element = document.querySelector('#widget');
                const { top, left, width, height } = element.getBoundingClientRect();
                return { x: left, y: top, width, height };
              });
            await page.screenshot({path: outputPath, clip});
            console.log('Save png image to:', outputPath);
        }
    }

    await browser.close();
}

screenshotHTML('./').catch(console.error);
