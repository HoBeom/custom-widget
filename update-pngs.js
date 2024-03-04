const fs = require('fs').promises;
const path = require('path');
const nodeHtmlToImage = require('node-html-to-image');

const widgetsDir = './widgets'; // Your widgets directory

const convertHtmlToImage = async (htmlFilePath, outputImagePath) => {
  const html = await fs.readFile(htmlFilePath, 'utf-8');
  await nodeHtmlToImage({
    output: outputImagePath,
    html,
  });
};

const main = async () => {
  const widgetFolders = await fs.readdir(widgetsDir);

  for (const folder of widgetFolders) {
    const folderPath = path.join(widgetsDir, folder);
    const htmlFilePath = path.join(folderPath, 'index.html');
    const outputImagePath = path.join(folderPath, 'widget.png');

    // Check if index.html exists
    if (fs.existsSync(htmlFilePath)) {
      console.log(`Converting ${htmlFilePath} to image...`);
      await convertHtmlToImage(htmlFilePath, outputImagePath);
    }
  }
};

main().catch(console.error);
