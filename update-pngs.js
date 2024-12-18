const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs').promises;

async function screenshotHTML(dir) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        // Skip node_modules directory
        if (entry.isDirectory() && entry.name === 'node_modules') {
            continue;
        }

        if (entry.isDirectory()) {
            // Recursive call for subdirectories
            await screenshotHTML(path.join(dir, entry.name));
        } else if (
            entry.name === 'index.html' || 
            entry.name === 'widget34.html' || 
            entry.name === 'widget43.html'
        ) {
            const htmlPath = path.join(dir, entry.name);
            let outputName;

            // Determine output PNG file name based on HTML file
            if (entry.name === 'index.html') {
                outputName = 'widget.png';
            } else if (entry.name === 'widget34.html') {
                outputName = 'widget34.png';
            } else if (entry.name === 'widget43.html') {
                outputName = 'widget43.png';
            }

            const outputPath = path.join(dir, outputName);

            // Correcting file path for Windows compatibility
            const filePath = `file://${path.resolve(htmlPath)}`;
            await page.goto(filePath, { waitUntil: 'networkidle2' });
            console.log('Current URL:', page.url());

            // Wait for the widget to render
            await page.waitForTimeout(5000);

            // Capture the widget element by its ID
            const clip = await page.evaluate(() => {
                const element = document.querySelector('#widget');
                if (!element) {
                    throw new Error("Element with ID 'widget' not found");
                }
                const { top, left, width, height } = element.getBoundingClientRect();
                return { x: left, y: top, width, height };
            });

            // Take a screenshot of the specified clip
            await page.screenshot({ path: outputPath, clip });
            console.log(`Saved PNG image to: ${outputPath}`);
        }
    }

    await browser.close();
}

screenshotHTML('./').catch(console.error);
